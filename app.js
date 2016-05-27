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
let data = new Data()

// Create window

function createWindow() {
  mainwindow = new BrowserWindow({
    width: params.width,
    height: params.height,
    fullscreen: true,
    resizable: false,
    title: package.productName
  })
  mainwindow.loadURL('file://' + __dirname + '/index.html')
  mainwindow.webContents.openDevTools()
  mainwindow.rendererSideName = data
  mainwindow.webContents.on('did-finish-load', function() {
    mainwindow.webContents.executeJavaScript('initialize()')
  })
}

// Application functions

app.on('ready', function() {
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
