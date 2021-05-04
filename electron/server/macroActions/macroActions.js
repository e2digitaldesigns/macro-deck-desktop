const fs = require("fs");
const exec = require("child_process").execFile;
const _filter = require("lodash/filter");
const _findIndex = require("lodash/findIndex");
const _sortBy = require("lodash/sortBy");
const axios = require("axios");

class ActionClass {
  constructor(io, db, action) {
    this.action = action;
    this.db = db;
    this.io = io;
  }

  async api() {
    return new Promise(resolve => {
      axios.get(this.action.url);
      resolve();
    });
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, this.action.seconds));
  }

  async exe() {
    return new Promise(resolve => {
      exec(this.action.path);
      resolve();
    });
  }

  mdActions = {
    mdHome: () => {
      return { subAction: "mdHome" };
    },

    mdPage: () => {
      const pages = _filter(
        this.db.pages,
        f => f.profileId === this.action.profileId
      );
      const pageIndex = _findIndex(
        _sortBy(pages, "order"),
        f => f._id === this.action.page
      );

      console.log({ pageIndex });
      return { subAction: "mdPage", pageIndex };
    },

    mdProfile: () => {
      return { subAction: "mdProfile", profile: this.action.profile };
    },

    mdProfileSelector: () => {
      return { subAction: "mdProfileSelector" };
    },

    mdReset: () => {
      return { subAction: "mdReset" };
    },

    mdSettings: () => {
      return { subAction: "mdSettings" };
    }
  };

  async md() {
    return new Promise(resolve => {
      const data = this.mdActions[this.action.subAction];
      this.io.emit("macroDeckerSocket", { action: "md", ...data() });
      resolve();
    });
  }
}

const actionParser = (io, data) => {
  fs.readFile("database.json", async (err, theData) => {
    if (err) throw err;
    const db = JSON.parse(theData);
    const actionArray = _filter(db.actions, f => f.buttonPadId === data._id);
    if (!actionArray) return;

    for (let action of actionArray) {
      const actionClass = await new ActionClass(io, db, action);
      console.log(action.action);
      await actionClass[action.action]();
    }
  });
};

module.exports = actionParser;
