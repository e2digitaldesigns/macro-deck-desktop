const electron = require("electron");
const database = require("./database/database");
const header = require("./header/header");
const { ipcMain } = electron;

const listeners = mainWindow => {
  database(mainWindow);
  header(mainWindow);
  ipcMain.on("ping", (e, data) => console.log(data));
};

module.exports.listeners = listeners;
