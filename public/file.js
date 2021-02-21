var socket = io();

var ip = document.getElementById("input")
var op = document.getElementById("output")
var h1tag = document.getElementById("h1tag")
var atag = document.getElementById("download")
var tag = document.getElementById("tag")

var room = ROOM_ID;
socket.emit("join-room", room,0);

ip.addEventListener("change", function (event) {

  var file = event.target.files[0];
  var fileReader = new FileReader();

  fileReader.onloadend = function (event) {
    var image = event.target.result

    atag.href = ""
    op.src = image;
    op.style.width = "60%"
    socket.emit("image", image);
    h1tag.innerText ="Image sent !"
    tag.innerText = ""
  }
  fileReader.readAsDataURL(file);
})

socket.on("image", function (image) {

  atag.href = image;
  op.src = image;
  op.style.width = "60%"
  h1tag.innerText = "Image received !"
  tag.innerText = "Click on the image to download"

});
