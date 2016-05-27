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
    fullscreen: true,
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
