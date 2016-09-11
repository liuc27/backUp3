express = require "express"
http = require "http"
fs = require "fs"
compression = require "compression"
bodyParser = require "body-parser"
moment = require "moment"
helmet = require "helmet"

multer  = require "multer"
upload = multer({ dest: 'public/images/' })

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

app.post '/api/cloudvision', upload.array('files'), (req, res) ->
  request = require('request')
  image = undefined
  reuestOption = undefined
  base64_image = undefined
  req.files.forEach (elem) ->
    base64_image = new Buffer(fs.readFileSync(elem.path)).toString('base64')
    return
  #base64_image = req.body.image.match(/base64,(.*)$/)[1];
  reuestOption =
    uri: 'https://vision.googleapis.com/v1/images:annotate?key=' + config.google_vision_key
    headers: 'Content-Type': 'application/json'
    json: 'requests': [ {
      'image': 'content': base64_image
      'features': [ {
        'type': 'TEXT_DETECTION'
        'maxResults': 5
      } ]
    } ]
  request.post reuestOption, (error, response, body) ->
    if !error and response.statusCode == 200
      res.status(200).json body.responses
    else
      res.status(200).json status: 'err'
    return
  return

server.listen app.get("port"), ->
  console.log "Server listen
    on port #{app.get('port')}
    at #{moment().format('YYYY/MM/DD HH:mm:SS')}"
  return
