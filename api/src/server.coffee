express = require "express"
http = require "http"
fs = require "fs"
compression = require "compression"
bodyParser = require "body-parser"
moment = require "moment"
helmet = require "helmet"

app = express()
server = http.createServer app
app.use helmet()

# Development Config
if app.get("env") is "development"
  config = require("./config").development

# Production Config
if app.get("env") is "production"
  config = require("./config").production

app.set "port", config.port
app.use compression
  level: 1
app.use bodyParser.json()
app.use bodyParser.urlencoded
  extended: true

files = []
for val in fs.readdirSync "./app"
  if val.match ".js"
    files.push val.replace /\.js$/, ""
    
for val in files
  api = require "./app/#{val}"
  if api.index then app.get "/#{val}", api.index
  if api.create then app.post "/#{val}", api.create
  if api.show then app.get "/#{val}/:id", api.show
  if api.update then app.put "/#{val}/:id", api.update
  if api.destroy then app.delete "/#{val}/:id", api.destroy

server.listen app.get("port"), ->
  console.log "Server listen
    on port #{app.get('port')}
    at #{moment().format('YYYY/MM/DD HH:mm:SS')}"
  return
