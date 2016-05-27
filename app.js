const electron    = require('electron')
const fs          = require('fs')
const path        = require('path')
const package     = require('./package.json')
const params      = require('./data/params.json')
const menus       = require('./data/menu.json')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainwindow
let display
let data

// Data object

function Data() {
  this.package = package
  this.params = params
  this.menus = menus
  this.display = display
}

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

// Change frame size

exports.changeSize = function(width, height) {
  params.width = width
  params.height = height
  str = JSON.stringify(params, null, 2)
  fs.writeFile('./data/params.json', str, 'utf8')
}

// Application functions

app.on('ready', function() {
  const {screen: electronScreen} = require('electron')
  display = electronScreen.getPrimaryDisplay()
  data = new Data()
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
