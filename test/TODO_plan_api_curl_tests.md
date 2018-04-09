curl -X 'POST' http://localhost:3000/api/plan -H "Content-Type: application/json" -d '{
  "plan": {
    "name": "Test Plan",
    "type": "PAVING",
    "city": "AYER",
    "published": true,
    "timeframes": [{
      "start": "2018-03-29T19:37:48.454Z",
      "end": "2018-03-29T19:37:48.454Z",
      "segments": [{
        "road_id": 22,
        "is_segment": true,
        "is_orig_type_address": false,
        "orig": 4,
        "is_dest_type_address": false,
        "dest": 5,
        "nodes": [1,2,3],
        "custom_nodes": ""
      }]
    }]
  }
}' > tmp.html

curl -X 'GET' http://localhost:3000/api/plan/6 -H "Content-Type: application/json" > tmp.html

curl -X 'GET' http://localhost:3000/api/plan?city=AYER -H "Content-Type: application/json" > tmp.html
