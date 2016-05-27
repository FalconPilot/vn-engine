const remote      = require('electron').remote
const main        = remote.require('./app.js')

const frame       = document.getElementById('frame')
const button      = document.getElementById('clickme')

let mainwindow = remote.getCurrentWindow()
let data = mainwindow.rendererSideName

// Initialize window

function initialize() {
  resizeFrame(data.params.width, data.params.height)
  button.addEventListener('click', function() {
    main.changeSize(1400, 850)
    resizeFrame(1400, 850)
  })
}

// Resize frame

function resizeFrame(width, height) {
  frame.style.width = width.toString() + "px"
  frame.style.height = height.toString() + "px"
}
