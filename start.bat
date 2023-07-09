start cmd /k "serve -p 3002"
start cmd /k "json-server -w db.json -p 3001"
start chrome http://localhost:3002
start chrome http://localhost:3002/add