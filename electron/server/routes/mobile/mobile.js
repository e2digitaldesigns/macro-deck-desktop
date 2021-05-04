const express = require("express");
const router = express.Router();
const _filter = require("lodash/filter");
const _sortBy = require("lodash/sortBy");
const fs = require("fs");

const getPages = (data, profileId) => {
  return _filter(data, f => f.profileId === profileId);
};

const getButtons = (data, pageId) => {
  return _filter(data, f => f.pageId === pageId);
};

router.get("/start", async (req, res) => {
  try {
    const db = [];
    fs.readFile("database.json", (err, theData) => {
      if (err) throw err;
      const data = JSON.parse(theData);

      for (let i = 0; i < data.profiles.length; i++) {
        data.profiles[i].pages = getPages(data.pages, data.profiles[i]._id);
        data.profiles[i].pages = _sortBy(data.profiles[i].pages, "order");

        for (let x = 0; x < data.profiles[i].pages.length; x++) {
          data.profiles[i].pages[x].buttonPads = getButtons(
            data.buttonPads,
            data.profiles[i].pages[x]._id
          );
        }

        db.push(data.profiles[i]);
      }

      res.json(db);
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
