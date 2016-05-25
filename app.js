const electron    = require('electron')
const fs          = require('fs')
const path        = require('path')
const package     = require('./package.json')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainwindow

// Create window

function createWindow() {
  mainwindow = new BrowserWindow({
    fullscreen: true,
    title: package.productName
  })
  mainwindow.loadURL('file://' + __dirname + '/index.html')
  mainwindow.webContents.openDevTools()
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
