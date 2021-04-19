const electron = require("electron");
const fs = require("fs");
const menuTemplate = require("./menu");
const listners = require("./listeners");

const { app, BrowserWindow, ipcMain, Menu } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 885,
    resizable: false,
    frame: false,
    backgroundColor: "#1e1e1e",
    movable: true,
    minimizable: true,
    maximizable: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: __dirname + "/preload.js"
    }
  });

  mainWindow.loadURL("http://localhost:9001");
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    app.quit();
    mainWindow = null;
  });

  listners.listeners(mainWindow);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
