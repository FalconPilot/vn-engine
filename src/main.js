const remote      = require('electron').remote
const main        = remote.require('./app.js')
const mainwindow  = remote.getCurrentWindow()

const frame       = document.getElementById('frame')
const menu        = document.getElementById('mainmenu')

let data = mainwindow.rendererSideName

// Initialize window

function initialize() {
  resizeFrame(data.params.width, data.params.height)
  defineMenu("mainmenu")
}

// Resize frame

function resizeFrame(width, height) {
  frame.style.width = width.toString() + "px"
  frame.style.height = height.toString() + "px"
  if (data.display.width == width || data.display.height == height) {
    frame.style.borderRadius = '0'
  } else {
    frame.style.borderRadius = null
  }
}

// Define menu

function defineMenu(ref) {
  mainmenu.innerHTML = ""
  contents = data.menus[ref]
  keys = Object.keys(contents)
  for (i = 0; i < keys.length; i++) {
    key = keys[i]
    block = document.createElement('p')
    block.id = key
    block.innerHTML = contents[key]
    mainmenu.appendChild(block)
  }
}
