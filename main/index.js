const isDev = require('electron-is-dev')
const {app, BrowserWindow} = require('electron')

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 700,
    minWidth: 1000, minHeight: 700,
    frame: false, titleBarStyle: 'hidden',
    // backgroundColor: '#C9C9C9'
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:8080')
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(() => mainWindow.webContents.openDevTools())
  }
  else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../ui/build', 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})