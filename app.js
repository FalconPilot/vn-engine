const electron    = require('electron')
const fs          = require('fs')
const path        = require('path')
const package     = require('./package.json')
const params      = require('./data/params.json')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

// Data object

function Data() {
  this.package = package
  this.params = params
}

let mainwindow
let display
let data = new Data()

// Create window

function createWindow() {
  mainwindow = new BrowserWindow({
    width: display.size.width,
    height: display.size.height,
    fullscreen: false,
    resizable: false,
    frame: false,
    title: package.productName
  })
  mainwindow.maximize()
  mainwindow.loadURL('file://' + __dirname + '/index.html')
  mainwindow.webContents.openDevTools()
  mainwindow.rendererSideName = data
  mainwindow.webContents.on('did-finish-load', function() {
    mainwindow.webContents.executeJavaScript('initialize()')
  })
}

// Format json

function formatJson(str) {
  value = ""
  for (i = 0; i < str.length; i++) {
    // Prepend
    if (str[i] === '\}') {
      value += "\n"
    }
    if (str[i - 1] === '\{' || str[i - 1] === ',') {
      value += "  "
    }
    // Current
    value += str[i]
    // Append
    if (str[i] === '\{' || str[i] === ',') {
      value += "\n"
    }
  }
  return value
}

// Change frame size

exports.changeSize = function(width, height) {
  params.width = width
  params.height = height
  str = formatJson(JSON.stringify(params))
  fs.writeFile('./data/params.json', str, 'utf8')
}

// Application functions

app.on('ready', function() {
  const {screen: electronScreen} = require('electron')
  display = electronScreen.getPrimaryDisplay()
  createWindow()
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
