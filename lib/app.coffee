express  = require 'express'
engine   = require 'ejs-locals'
socketio = require 'socket.io'
http     = require 'http'

###
 App Config
###
app = express()

app.configure ->
  app.set 'port', process.env.PORT || 8080
  app.set 'views', __dirname + '/../views'
  app.set 'view engine', 'ejs'
  app.set 'template_engine', 'ejs'
  app.engine 'ejs', engine
  app.use express.favicon()
  app.use express.logger 'dev'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static __dirname + '/../public'

app.configure 'development', ->
  app.use express.errorHandler()

###
 App Routes
###
app.get '/', (req, res)->
  res.render 'chat'

###
 Sockets
###
server = http.createServer app
io = require('socket.io').listen(server)

io.configure ->
  io.set "transports", ["xhr-polling"]
  io.set "polling duration", 10

io.sockets.on 'connection', (client)->
  console.log 'Client connected...'

  client.on 'send', (data)->
    html = "<p>"
    html +=   "<span class='name'>"
    html +=     data.name
    html +=   "</span>"
    html +=    data.message
    html += "</p>"
    io.sockets.emit 'message', { content: html }

###
 Start the Server
###
server.listen app.get('port'), ->
  console.log "Express server listening on port " + app.get 'port'
