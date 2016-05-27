const remote      = require('electron').remote

const frame       = document.getElementById('frame')

let mainwindow = remote.getCurrentWindow()
let data = mainwindow.rendererSideName

// Initialize window

function initialize() {
  resizeFrame(data.params.width, data.params.height)
}

// Resize frame

function resizeFrame(width, height) {
  frame.style.width = width.toString() + "px"
  frame.style.height = height.toString() + "px"
}
