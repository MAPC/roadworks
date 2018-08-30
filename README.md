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

## Testing

TODO

## Deployment

TODO
