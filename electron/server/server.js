var exec = require("child_process").execFile;
const _filter = require("lodash/filter");
const _find = require("lodash/find");
const data = require("../../database.json");
const cors = require("cors");
const actionParser = require("./macroActions/macroActions");

const service = () => {
  const app = require("express")();
  const server = require("http").createServer(app);
  const io = require("socket.io")(server);

  app.use(cors());
  require("./routes")(app);

  app.get("/", function (req, res) {
    res.send("MACRO DECK API CLIENT");
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

  server.listen(8002);
};

module.exports = service;
