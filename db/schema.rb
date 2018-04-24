# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180423183716) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.integer "city_code"
    t.geometry "geometry", limit: {:srid=>4326, :type=>"multi_polygon"}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "municipal_boundaries", primary_key: "gid", id: :serial, force: :cascade do |t|
    t.decimal "objectid", precision: 10
    t.string "town", limit: 21
    t.decimal "town_id", precision: 10
    t.decimal "pop1980", precision: 10
    t.decimal "pop1990", precision: 10
    t.decimal "pop2000", precision: 10
    t.decimal "popch80_90", precision: 10
    t.decimal "popch90_00", precision: 10
    t.string "municipality_type", limit: 2
    t.decimal "fourcolor", precision: 10
    t.decimal "fips_stco", precision: 10
    t.decimal "sum_acres"
    t.decimal "sum_square"
    t.decimal "pop2010", precision: 10
    t.decimal "popch00_10", precision: 10
    t.decimal "st_area_sh"
    t.decimal "st_length_"
    t.geometry "geom", limit: {:srid=>4326, :type=>"multi_polygon"}
  end

  create_table "nodes", force: :cascade do |t|
    t.geometry "geometry", limit: {:srid=>0, :type=>"st_point"}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "part_of", default: [], array: true
    t.integer "neighbors", default: [], array: true
  end

  create_table "permits", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.string "address"
    t.jsonb "payload"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "application_id"
    t.string "applicant_name"
    t.string "permit_type"
    t.string "city_name"
    t.geometry "geometry", limit: {:srid=>4326, :type=>"st_point"}
    t.jsonb "columns"
    t.jsonb "application_data"
  end

  create_table "plans", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city"
    t.boolean "published", default: false, null: false
    t.string "plan_type", null: false
    t.string "color", default: "#F44336", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_plans_on_user_id"
  end

  create_table "raw_segments", primary_key: "gid", id: :integer, default: nil, force: :cascade do |t|
    t.integer "classifica", limit: 2
    t.integer "admin_type", limit: 2
    t.string "street_nam", limit: 80
    t.string "rt_number", limit: 4
    t.string "altrtnum1", limit: 4
    t.string "altrtnum2", limit: 4
    t.string "altrtnum3", limit: 4
    t.string "altrtnum4", limit: 4
    t.integer "altrt1type"
    t.integer "rdtype"
    t.string "mgis_town", limit: 25
    t.decimal "roadinvent", precision: 10
    t.string "crn", limit: 9
    t.decimal "roadsegmen", precision: 10
    t.decimal "frommeasur"
    t.decimal "tomeasure"
    t.decimal "assignedle"
    t.integer "assigned_1"
    t.decimal "streetlist", precision: 10
    t.string "streetname", limit: 75
    t.integer "city"
    t.string "county", limit: 1
    t.integer "municipals"
    t.integer "fromendtyp"
    t.string "fromstreet", limit: 75
    t.integer "fromcity"
    t.integer "fromstate"
    t.integer "toendtype"
    t.string "tostreetna", limit: 75
    t.integer "tocity"
    t.integer "tostate"
    t.integer "mileagecou"
    t.string "routekey", limit: 20
    t.decimal "routefrom"
    t.decimal "routeto"
    t.decimal "equationro"
    t.decimal "equation_1"
    t.string "routesyste", limit: 2
    t.string "routenumbe", limit: 10
    t.string "subroute", limit: 10
    t.string "routedirec", limit: 2
    t.integer "routetype"
    t.integer "routequali"
    t.string "rpa", limit: 20
    t.string "mpo", limit: 35
    t.integer "massdothig"
    t.integer "urbantype"
    t.string "urbanizeda", limit: 5
    t.integer "functional"
    t.integer "federalfun"
    t.string "jurisdicti", limit: 1
    t.integer "truckroute"
    t.integer "nhsstatus"
    t.string "federalaid", limit: 10
    t.integer "facilityty"
    t.integer "streetoper"
    t.integer "accesscont"
    t.integer "tollroad"
    t.integer "numberofpe"
    t.integer "rightsidew"
    t.integer "rightshoul"
    t.integer "rightsho_1"
    t.integer "mediantype"
    t.integer "medianwidt"
    t.integer "leftsidewa"
    t.integer "leftshould"
    t.integer "undividedl"
    t.integer "undivide_1"
    t.integer "leftshou_1"
    t.integer "surfacetyp"
    t.integer "surfacewid"
    t.integer "rightofway"
    t.integer "numberoftr"
    t.integer "oppositenu"
    t.integer "curbs"
    t.integer "terrain"
    t.integer "speedlimit"
    t.integer "opposingdi"
    t.integer "structural"
    t.decimal "adt", precision: 10
    t.decimal "adtstation", precision: 10
    t.integer "adtderivat"
    t.integer "adtyear"
    t.integer "iri"
    t.integer "iriyear"
    t.integer "iristatus"
    t.decimal "psi"
    t.integer "psiyear"
    t.integer "hpmscode"
    t.string "hpmssample", limit: 50
    t.integer "addedroadt"
    t.date "dateactive"
    t.integer "lifecycles"
    t.decimal "item_id", precision: 10
    t.decimal "shape_len"
    t.geometry "geom", limit: {:srid=>4326, :type=>"multi_line_string"}
    t.index ["geom"], name: "streets_geom_idx", using: :gist
  end

  create_table "roads", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "nodes", default: [], array: true
    t.string "city_name"
    t.integer "city_code"
    t.integer "streetlist"
    t.integer "cross_streets", default: [], array: true
    t.geometry "geometry", limit: {:srid=>4326, :type=>"multi_line_string"}
  end

  create_table "segments", force: :cascade do |t|
    t.bigint "timeframe_id"
    t.bigint "road_id"
    t.boolean "is_segment", default: false, null: false
    t.boolean "is_orig_type_address", default: false, null: false
    t.integer "orig"
    t.boolean "is_dest_type_address", default: false, null: false
    t.integer "dest"
    t.integer "nodes", default: [], array: true
    t.json "custom_nodes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["road_id"], name: "index_segments_on_road_id"
    t.index ["timeframe_id"], name: "index_segments_on_timeframe_id"
  end

  create_table "timeframes", force: :cascade do |t|
    t.bigint "plan_id"
    t.date "start"
    t.date "end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_timeframes_on_plan_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role", default: 0
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "plans", "users"
end
