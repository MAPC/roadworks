# require 'pry-byebug'

def adj_nodes_from_line(line)
end

namespace :data do
  desc "Reorganize MassGIS data for e-permitting analysis"

  task parse_raw_segments: :environment do
    raw_segments = RawSegment.where("geom is not null").order("gid")
    # Psuedo tables
    road_map_by_streetlist = Hash.new
    node_map_by_geom = Hash.new
    # ID counters
    next_road_id = 1
    next_node_id = 1
    # Iterate over segments
    puts "Parsing road segments"
    raw_segments.each do |segment|
      if segment.gid % 1000 == 0
        puts "#{segment.gid}: #{segment.street_name}"
      end
      road = road_map_by_streetlist[segment.streetlist]
      unless road
        road = Road.new
        road.id = next_road_id
        next_road_id += 1
        road.streetlist = segment.streetlist
        road.name = segment.street_name
        road.city = segment.city
        road.mgis_town = segment.mgis_town
      end
      unless road.name
        road.name = segment.street_name
      end
      node_ids_for_segment = Array.new
      segment.geometry.each do |line|
        nodes = Array.new
        for i in 0..(line.num_points() - 1)
          # Find or create all of the nodes used by this line
          current_point = line.point_n(i)
          geo_id = "POINT(#{current_point.y} #{current_point.x})"
          node = node_map_by_geom[geo_id]
          unless node
            node = Node.new
            node.id = next_node_id
            next_node_id += 1
            node.geometry = current_point
            node_map_by_geom[geo_id] = node
          end
          node_ids_for_segment.push(node.id)
          nodes.push(node)
        end
        for i in 0..(nodes.length() - 1)
          # Assign adjacent nodes from the same polyline
          neighbor_ids = Array.new
          node = nodes[i]
          left_neighbor = i - 1 >= 0 ? nodes[i - 1] : nil
          right_neighbor = i + 1 < nodes.length() ? nodes[i + 1] : nil
          if i == 0 && nodes.first.geometry.equals?(nodes.last.geometry) && nodes.length() > 2
            # If the line is a loop
            left_neighbor = nodes[-2]
          end
          if left_neighbor && left_neighbor.id != node.id
            neighbor_ids.push(left_neighbor.id)
          end
          if right_neighbor && right_neighbor.id != node.id
            neighbor_ids.push(right_neighbor.id)
          end
          node.neighbors |= neighbor_ids
          node.part_of |= [road.id]
          node_map_by_geom["POINT(#{node.geometry.y} #{node.geometry.x})"] = node
        end
      end
      road.nodes |= node_ids_for_segment
      road_map_by_streetlist[road.streetlist] = road
    end

    # Save all roads
    road_columns = [:id, :name, :nodes, :mgis_town, :city, :streetlist]
    all_roads = road_map_by_streetlist.values
    puts "Saving #{all_roads.length()} roads"
    all_roads.in_groups_of(10000, false) do |roads|
      as_arrays = Array.new(roads.length())
      roads.each.with_index do |road, index|
        as_arrays[index] = [road.id, road.name, road.nodes, road.mgis_town, road.city, road.streetlist]
      end
      Road.import(road_columns, as_arrays, validate: false)
    end

    # Save all nodes
    node_columns = [:id, :geometry, :part_of, :neighbors]
    all_nodes = node_map_by_geom.values
    puts "Saving #{all_nodes.length()} nodes"
    all_nodes.in_groups_of(10000, false) do |nodes|
      as_arrays = Array.new(nodes.length())
      nodes.each.with_index do |node, index|
        as_arrays[index] = [node.id, node.geometry, node.part_of, node.neighbors]
      end
      Node.import(node_columns, as_arrays, validate: false)
    end
  end

  task generate_cross_streets: :environment do
    Road.where("name != '' and name is not null").find_each do |road|
      if road.id % 1000 == 0
        puts road.id
      end
      nodes = Node.find(road.nodes)
      cross_street_ids = Array.new
      cross_street_to_node = Hash.new

      node_map = Hash.new
      nodes.each do |node|
        node_map[node.id] = node
        cross_street_ids |= node.part_of
        node.part_of.each do |road_id|
          cross_street_to_node[road_id] = node.id
        end
      end
      cross_street_ids.delete(road.id)
      road.cross_streets = cross_street_ids
      road.save
    end
  end

  task generate_road_geometry: :environment do
    all_roads = Road.all
    road_map_by_streetlist = Hash.new
    # Generate road hash table
    puts "Generating road hash table"
    all_roads.each do |road|
      road.geometry = nil
      road_map_by_streetlist[road.streetlist] = road
    end
    # Collect MultiLineString geometries for all roads
    puts "Collect geometries for all roads"
    raw_segments = RawSegment.where("geom is not null").order("gid")
    raw_segments.each do |segment|
      if segment.gid % 1000 == 0
        puts segment.gid
      end
      road = road_map_by_streetlist[segment.streetlist]
      if road.geometry.nil?
        road.geometry = segment.geometry
      else
        road.geometry = road.geometry.union(segment.geometry)
      end
    end
    # Update all roads
    puts "Updating all roads"
    road_map_by_streetlist.values.each do |road|
      if road.id % 1000 == 0
        puts road.id
      end
      road.save
    end
  end

  task test_get_segment: :environment do
    road_name = "TREMONT STREET"
    city_name = "BOSTON"
    temple_place = Road.where(name: road_name, mgis_town: city_name).first
    nodes = Node.find(temple_place.nodes)
    cross_street_ids = Array.new
    cross_street_to_node = Hash.new
    node_map = Hash.new
    nodes.each do |node|
      node_map[node.id] = node
      cross_street_ids |= node.part_of
      node.part_of.each do |road_id|
        cross_street_to_node[road_id] = node.id
      end
    end
    cross_street_ids.delete(temple_place.id)
    cross_streets = Road.find(cross_street_ids)
    # puts cross_streets
    # select cross_streets # Public alley 401
    binding.pry
    start_cross_street = cross_streets[2]
    puts cross_streets[2]
    end_cross_street = cross_streets[6]
    puts cross_streets[6]
    # binding.pry
    # get orig and dest nodes
    start_node_id = cross_street_to_node[start_cross_street.id]
    end_node_id = cross_street_to_node[end_cross_street.id]


    def path(orig_id, dest_id, node_map)
      # puts orig_id, dest_id, node_map
      node_stack = [orig_id]
      visited = []
      parents = Hash.new
      previous_node = nil
      current_node = nil
      loop do
        visited.push(current_node)
        previous_node = current_node
        current_node = node_stack.pop
        if previous_node
          parents[current_node] = parents[previous_node] + [previous_node]
        else
          parents[current_node] = []
        end
        return parents[current_node] + [current_node] if current_node == dest_id
        # binding.pry
        children = node_map[current_node].neighbors.select { |node_id| !visited.include?(node_id) && node_map.key?(node_id) }
        node_stack = node_stack + children
      end
    end

    def node_list_to_geojson(node_list, node_map)
      factory = RGeo::Geographic.spherical_factory(:srid => 4326)
      points = node_list.map { |node| node_map[node].geometry }
      line_string = factory.line_string(points)
      return RGeo::GeoJSON.encode(line_string)
    end

    node_list = path(start_node_id, end_node_id, node_map)
    geojson = node_list_to_geojson(node_list, node_map)
    puts geojson.to_json
    # choose X streets
    # find nodes at X streets
    # path between the nodes
    # generate geometry
    # save as slice
    # assign slice to plan

    # OR

    # Choose addresses
    # snap addresses to line as special node
    # path between nodes
    # generate geometry
    # save as slice
    # assign slice to plan
  end
end
