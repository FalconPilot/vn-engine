const remote      = require('electron').remote

let mainwindow = remote.getCurrentWindow()
let data = mainwindow.rendererSideName

// Initialize window

function initialize() {
  console.log(data.params.height)
}
