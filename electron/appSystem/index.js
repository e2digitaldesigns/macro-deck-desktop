const appRoot = require("app-root-path");
const fs = require("fs");
const ip = require("ip");
const SETTINGS = require("../settings/system.json");

console.log(SETTINGS);

const databasePath = `${appRoot.path}\\database.json`;

const saveIpAddress = () => {
  try {
    const ipAddress = ip.address();
    if (!ipAddress) return;
    const fileData = fs.readFileSync(databasePath);
    const theData = JSON.parse(fileData);
    theData.settings.ipAddress = ipAddress;
    theData.settings.port = theData?.settings?.port || SETTINGS.DEFAULT_PORT;
    fs.writeFileSync(databasePath, JSON.stringify(theData, null, 2));
  } catch (error) {
    console.log("ipAddress save error", error);
  }
};

module.exports = saveIpAddress;
