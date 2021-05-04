const electron = require("electron");
const menuTemplate = require("./menu");
const listners = require("./listeners");
const server = require("./server/server");
require("./appSystem")();

const { app: electronApp, BrowserWindow, ipcMain, Menu, Tray } = electron;

let mainWindow;
let tray = null;
const width = 1280;
const height = 785;

console.log(__dirname);

electronApp.on("ready", () => {
  tray = new Tray(__dirname + "/icon.png");
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" }
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);

  mainWindow = new BrowserWindow({
    width: width,
    minWidth: width,
    height: height,
    minHeight: height,
    resizable: true,
    frame: false,
    backgroundColor: "#1e1e1e",
    movable: true,
    minimizable: true,
    maximizable: true,
    icon: __dirname + "/icon.png",
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
      webSecurity: false
    }
  });

  mainWindow.setAspectRatio(width / height);
  mainWindow.loadURL("http://localhost:9001");
  // mainWindow.loadURL("H:\\Macro\\Macro - Desktop\\build\\index.html");
  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("minimize", event => {
    event.preventDefault();
    // mainWindow.hide();
  });

  mainWindow.on("closed", () => {
    electronApp.quit();
    mainWindow = null;
  });

  listners.listeners(mainWindow);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

server();
