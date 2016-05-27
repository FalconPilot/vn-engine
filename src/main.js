const remote      = require('electron').remote

const frame       = document.getElementById('frame')

let mainwindow = remote.getCurrentWindow()
let data = mainwindow.rendererSideName

// Initialize window

function initialize() {
  frame.style.width = data.params.width.toString() + "px"
  frame.style.height = data.params.height.toString() + "px"
}
