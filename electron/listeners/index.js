const electron = require("electron");
const header = require("./header/header");
const { ipcMain } = electron;

const listeners = mainWindow => {
  header(mainWindow);
  ipcMain.on("ping", (e, data) => console.log(data));
};

module.exports.listeners = listeners;
