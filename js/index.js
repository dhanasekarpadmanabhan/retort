/*
 *author=Dhanasekar
 *when check function execute it will
 *load name and password values
 *this value will be check and authenticated will be send to main.js as ipcMain to receive the paricular 'addwindow'
 *if he is valid user sent the value to the main.js file
 *if he is not valid print into the command prompt this not granted
 */
const {
    ipcRenderer
} = require('electron')
const $ = require('jquery')

function check() {
    var name = $("#name").val();
    var password = $("#password").val();

    if ((name == "Admin") & (password == "1234a")) {
        //ipcRenderer will communicate with main.js file of ipcMain of addwindow with value of 1
        ipcRenderer.send('addWindow', 1)
    } else {
        console.log("not granted")
    }
}

function samplecheck() {
    var name = $("#name").val();
    var password = $("#password").val();
var industry=$("#industry").val()
    if ((name == "Admin") & (password == "1234a")) {
        //ipcRenderer will communicate with main.js file of ipcMain of addwindow with value of 1

      ipcRenderer.send('addSampleWindow', industry)
    } else {
        console.log("not granted")
    }
}
