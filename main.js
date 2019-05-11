const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow, dialog} = electron

let mainWindow

app.on('ready',() => {
    mainWindow = new BrowserWindow({})
    
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }))
    
    mainWindow.on('closed',() => {
        app.quit
    })
})

function uploadFile() {
    dialog.showOpenDialog({title: "load file", properties: ['openFile']},(filePath) => {
        console.log(filePath)
    })
    
}

/* TODO: 
loading metod, load last opened list
layout 
multiple lists

*/