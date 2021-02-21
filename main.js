const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
var name

server.listen(3000)

app.use(express.static('public'))
app.set('view engine', 'ejs')

const randomId = uuidV4()
app.get('/', (req,res) => {
  res.render('index.ejs', { roomId: randomId })
})

app.get('/videocall', (req, res) => {
  res.redirect(`/${randomId}`)
})

app.get('/voicecall/:room', (req,res) => {
  res.render('call', { roomId: req.params.room , user: name })
})

app.get('/voicecall', (req, res) => {
  res.redirect(`/voicecall/${randomId}`)
})

app.get('/screensharing' ,(req,res) => {
  res.redirect(`/screensharing/${randomId}`)
})

app.get('/filetransfer', (req, res) => {
  res.redirect(`/filetransfer/${randomId}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

app.get('/screensharing' ,(req,res) => {
  res.redirect(`/screensharing/${randomId}`)
})

app.get('/screensharing/:room' , (req,res) => {
  res.render('screen' , {roomId: req.params.room})
})

app.get('/filetransfer/:room' , (req,res) => {
  res.render('file_transfer' , {roomId: req.params.room})
})



io.on('connection', socket => {
  socket.on('message', (msg,num) => {
    name = msg.user
    socket.broadcast.emit('message',msg,num)
  })

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.on("image", function(msg) {
      socket.broadcast.to(roomId).emit("image", msg);
    });
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})
