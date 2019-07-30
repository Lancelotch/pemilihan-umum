const express = require("express");
const router = express.Router();
var Pusher = require("pusher");
const mongoose = require("mongoose");
const VoteOuting = require("../models/voteOuting");

var channels_client = new Pusher({
  appId: "832907",
  key: "a7f4319adef7c6a424fb",
  secret: "e7dbd34c6b96ff49aab9",
  cluster: "mt1",
  encrypted: true
});

router.get("/", (req, res) => {
  VoteOuting.find()
    .then(votes => res.status(200).json({ message: "success", votes: votes }))
    .catch(error => console.log(error));
});

router.post("/", (req, res) => {
  const newVote = {
    points: 1,
    location: req.body.location
  };

  new VoteOuting(newVote)
    .save()
    .then(vote => {
      channels_client.trigger("monggo-polling", "monggo-vote", {
        points: parseInt(vote.points),
        location: vote.location
      });
      return res.status(200).json({
        success: true,
        message: "Terimakasih atas pemilihan suaranya"
      });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
