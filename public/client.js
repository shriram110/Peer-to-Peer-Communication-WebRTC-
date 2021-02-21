
const socket = io()

let name;

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message__area')

let videoCall = document.querySelector('#video_call')

let voiceCall = document.querySelector('#voice_call')

let screenShare = document.querySelector('#screen_share')

let fileTransfer = document.querySelector("#file_transfer")

do {
  name = prompt("Please enter ur name : ")
}while(!name)

textarea.addEventListener('keyup', (e) => {
  if(e.key == 'Enter'){
    sendMessage(e.target.value,1)
  }
})
voiceCall.addEventListener('click' ,() => {
  sendMessage("http://localhost:3000/voicecall/"+ROOM_ID,0)
})

videoCall.addEventListener('click', () => {
  sendMessage("http://localhost:3000/"+ROOM_ID,0)
})

screenShare.addEventListener('click', () => {
  sendMessage("http://localhost:3000/screensharing/"+ROOM_ID,0)
})

fileTransfer.addEventListener('click', () => {
  sendMessage("http://localhost:3000/filetransfer/"+ROOM_ID,0)
})

 function sendMessage(message,num){
  let msg={
    user: name,
    message: message.trim()
  }
  appendMessage(msg, 'outgoing',num)
  textarea.value=''
  //send to server
  socket.emit('message',msg,num)
}



function appendMessage(msg,type,num){

  let mainDiv = document.createElement('div')
  let className = type
  let markup
  mainDiv.classList.add(className,'message',)
  if(num){
    markup = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
  `
    mainDiv.innerHTML = markup
  }
  else{
    var h4tag = document.createElement('h4')
    h4tag.innerText = msg.user
    var atag = document.createElement('a')
    atag.setAttribute('href',msg.message)
    atag.setAttribute('target','_blank')
    atag.innerText = "click here to join the room"
    mainDiv.appendChild(h4tag)
    mainDiv.appendChild(atag)
  }
  messageArea.appendChild(mainDiv)
}

//receive msg
socket.on('message', (msg,num) => {
  appendMessage(msg,'incoming',num)
})
