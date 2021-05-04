const electron = require("electron");
const { ipcMain, ipcRenderer } = electron;
const fs = require("fs");
const appRoot = require("app-root-path");

const databasePath = `${appRoot.path}\\database.json`;

const database = mainWindow => {
  ipcMain.on("database", (event, data) => {
    const actions = {
      loadAppData: () => {
        try {
          const fileData = fs.readFileSync(databasePath);
          event.reply("database:return", JSON.parse(fileData));
        } catch (err) {
          console.error(err);
          return false;
        }
      },

      saveAppData: () => {
        try {
          fs.writeFileSync(databasePath, JSON.stringify(data.data, null, 2));
          console.log("file written successfully");
        } catch (err) {
          console.error(err);
        }
      },
    };

    actions[data.action] && actions[data.action]();
  });
};

module.exports = database;
