var exec = require("child_process").execFile;
const _filter = require("lodash/filter");
const _find = require("lodash/find");
const fs = require("fs");
const data = require("../../database.json");
const cors = require("cors");
const appRoot = require("app-root-path");

const SETTINGS = require("../settings/system.json");
const actionParser = require("./macroActions/macroActions");

const service = () => {
  const app = require("express")();
  const server = require("http").createServer(app);
  const io = require("socket.io")(server);

  app.use(cors());
  require("./routes")(app);

  app.get("/", function (req, res) {
    res.send("MACRO DECK API server is running...");
  });

  io.on("connection", socket => {
    socket.on("macroDeckerSocket", function (data) {
      actionParser(io, data);
    });
  });

  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////

  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////

  const databasePath = `${appRoot.path}\\database.json`;
  const fileData = fs.readFileSync(databasePath);
  const theData = JSON.parse(fileData);
  const PORT = theData?.settings?.port || SETTINGS.DEFAULT_PORT;

  server.listen(PORT);
  console.log({ PORT });
};

module.exports = service;
