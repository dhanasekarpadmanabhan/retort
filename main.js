/*
 *author-dhanasekar
 * when npm starts the application is execute this javascript page
 *app.on(ready) will run the creatwindow
 */
// the below variable functions modifier will call the function present in window.js
// window.js has funciton which are used to create the window
// and which maps to the required application to which it travel

var functions = require('./js/window.js')
const {app,ipcMain} = require('electron')
const $ = require('jquery')

ipcMain.on('addSampleWindow', (event, arg) => {
    global.industry = arg;
    functions.sampleWindow()
})

ipcMain.on('addWindow', (event, arg) => {
    functions.secondWindow()
})

ipcMain.on('item:invo', (event, arg) => {
    functions.third(arg, this)
})


app.on('ready', functions.createWindow)
