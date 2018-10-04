# Department of Public Works Permit Viewer
*A project of the Digital Services Working Group at the [Metropolitan Area Planning Council](https://www.mapc.org)*

## Background

From the State of Massachusetts Efficiency and Regionalization Grant Program proposal:

> The Metropolitan Area Planning Council proposes to provide digital technical assistance to build, either in-house or through collective procurement, an online permitting platform for managing and processing street opening permits. Additionally, the team would provide consulting expertise in order to integrate this platform with existing GIS and data management processes (paper or electronic), and to develop a sustainable revenue stream for ongoing hosting costs of the new permitting platform. ... Deliverables for this work will include:
> - A common, shared data format for street opening and trench permits across the participating municipalities;
> - A reduction in administrative cost and burden to municipal staff, eliminating time consuming, paper-based or partially-electronic permitting processes;
> - Shared cost of a system that will upgrade permitting processes municipalities to a sustainable, open source, cloud-hosted system; and
> - Improved open records compliance by providing a way to quickly publish permitting records electronically

## Setup and Installation

### Redis

You will need to setup Sidekiq on your server for running background jobs. To do this on an Ubuntu server you should first install redis with `sudo apt-get install redis-server`.

### Sidekiq Service

Put the following file into `/lib/systemd/system/sidekiq-roadworks.service`:

```
#
# systemd unit file for CentOS 7, Ubuntu 15.04
#
# Customize this file based on your bundler location, app directory, etc.
# Put this in /usr/lib/systemd/system (CentOS) or /lib/systemd/system (Ubuntu).
# Run:
#   - systemctl enable sidekiq
#   - systemctl {start,stop,restart} sidekiq
#
# This file corresponds to a single Sidekiq process.  Add multiple copies
# to run multiple processes (sidekiq-1, sidekiq-2, etc).
#
# See Inspeqtor's Systemd wiki page for more detail about Systemd:
# https://github.com/mperham/inspeqtor/wiki/Systemd
#
[Unit]
Description=sidekiq
# start us only once the network and logging subsystems are available,
# consider adding redis-server.service if Redis is local and systemd-managed.
After=syslog.target network.target

# See these pages for lots of options:
# http://0pointer.de/public/systemd-man/systemd.service.html
# http://0pointer.de/public/systemd-man/systemd.exec.html
[Service]
Type=simple
WorkingDirectory=/var/www/roadworks/current
# If you use rbenv:
# ExecStart=/bin/bash -lc 'bundle exec sidekiq -e production'
# If you use the system's ruby:
ExecStart=/home/roadworks/.rvm/wrappers/default/bundle exec sidekiq -e staging
User=roadworks
Group=roadworks
UMask=0002

# if we crash, restart
RestartSec=1
Restart=on-failure

# output goes to /var/log/syslog
StandardOutput=syslog
StandardError=syslog

# This will default to "bundler" if we don't specify it
SyslogIdentifier=roadworks

[Install]
WantedBy=multi-user.target
```
Then to enable this run: `sudo systemctl enable sidekiq-roadworks` and `sudo systemctl start sidekiq-roadworks` if using Ubuntu 14.04 or `sudo service sidekiq-roadworks start` if using Ubuntu 16.04.

In development you will need to run sidekiq with `bundle exec sidekiq`.

### Cron Job

To run the permit importer cron job, run `crontab -e` as the `roadworks` user and add:

```
1  2  *  *  *  cd /var/www/roadworks/current && RAILS_ENV=production /home/roadworks/.rvm/wrappers/default/bundle exec rake import:permits
```

Be sure to update the `RAILS_ENV` depending on where the cron job will be executed.

### Secrets

Encrypted secrets can be edited with `EDITOR="vim" rails secrets:edit`. The
following encrypted secrets are required:

```
development:
  secret_key_base:

test:
  secret_key_base:

staging:
  secret_key_base:

production:
  secret_key_base:

shared:
  seamless_api_key:
  seamless_api_secret:
  ayer_seamless_api_key:
  ayer_seamless_api_secret:
```

The secret key bases are used for encrypting cookies. The SeamlessDocs API keys
and secrets allow us to pull permits from the towns using Roadworks. Currently,
Ayer is using their own separate SeamlessDocs account, hence the two separate
secret keys.

## Deployment

Deployment of Roadworks uses `cap production deploy`.

## Quirks

### Snapping permits to their nearest road

When we import permits, we geocode them, but our geocoder often returns a point
in the middle of a parcel (not on a road). To "snap" this geocoding to the
appropriate road, we rely on the magic of PostGIS in the before_save hook in the
permit model.

In the inner subquery of that SQL block, we deconstruct the road's
MultiLineString into consitutent LineStrings using `ST_Dump`. This turns one
row in the roads table (the road the permit is on) into a new subtable with
each row being a segment (usually intersection to intersection) of the road.

```
SELECT
  id,
  name,
  city_name,
  ST_Dump(geometry) as line
FROM
  roads
WHERE
  name='#{street}' and
  city_name='#{locality}'
) as dumped
```

The actual snapping occurs in the `SELECT` of the top level query.
`ST_MakePoint` and `ST_SetSRID` convert the geocoded parcel point to an object
that PostGIS can work with. `ST_LineLocatePoint` determines the percentage along
the line segment that is nearest to the point. Most of these values would be 0
or 1 indicating that the nearest segment is further along or behind on the road.
The nearest segment should have a value between 0 and 1 exclusive.
`ST_LineInterpolatePoint` turns that ratio into an actual coordinate point on
the road segment. We can then use the distance to determine the best segment
if two or more segments are competing.

### Road coloring offset

In order to prevent overlapping the colored highlights on road segments entered
into plans each layer is assigned an offset value, an integer >= 0. An offset of
0 appears in the center of the road, odd offsets appear to the "right" of the
road relative to the direction it's defined, and even offsets appear to the
"left" of the road relative to the direction it's defined. For example:
`6-4-2-0-1-3-5`.

The root of this offsetting process can be found in `generateUniqueOffsets` in
`utils/geojson.js`. `generateUniqueOffsets` takes in layer 'kits', arbitrary
packages of layer information, to make this calculation. As of this writing, a
layer kit includes:
```
{
  layerId: // String layer ID,
  color: // String layer color,
  geometry // Geojson geometry object,
  nodes // List of nodes for the road being mapped,
  roadName: // The name of the road,
  start: // Start of timeframe for this segment,
  end: // End of timeframe for this segment,
}
```
For the purposes of generating offsets, the nodes are the most important part of
this kit.

`generateUniqueOffsets` detects collisions using each layer's list of nodes. It
first creates a mapping between node IDs and lists of layers using that node.
Overlaps occur on any node with more than one layer ID. It then generates a
mapping between layer IDs and a) the IDs for layers that overlap ONCE and b) the
IDs for layers that overlap MORE THAN ONCE. Two layers that overlap exactly once
have merely crossed (like at an intersection), while two layers that overlap
more than once actually share some portion of a road and at least one must be
offset.

Finally, it iterates through all layers with more than one overlap and assigns
each one the lowest available offset value (starting with 0) for that road. For
example:
```
Condition 1: Layer A overlaps with layers B and C
Condition 2: Layer B overlaps with layer A
Condition 3: Layer C overlaps with layer A
Condition 4: Layer D overlaps with layer B
```
In this example, parsing condition 1 would assign A, B, and C offsets of 0, 1,
and 2 respectively because they must be mutually exclusive. Condition 2 and 3
wouldn't do anything because B and C have already been assigned an offset. In
condition 4, D would be assigned an offset of 0 because B only occupies offset 1
leaving 0 as the lowest available offset.

## Future Work

### Node Consistency
The road data provided by MassGIS is fairly consistent but not perfect.
Roadworks' road segment importer relies on latitude and longitude coordinates of
road interesections to be exactly the same in order to identify connecting
nodes. In each town, there are a handful of intersections that aren't quite
aligned creating intersections that Roadworks cannot path through when trying to
create road segments for infrastructure improvement plans. This is the most
frequent cause of a cross-street-to-address mapping failure. Luckily it's still
an edge case but it's difficult to detect and common enough to be annoying.
