const express = require("express");
const router = express.Router();
var Pusher = require("pusher");

var channels_client = new Pusher({
  appId: "832907",
  key: "a7f4319adef7c6a424fb",
  secret: "e7dbd34c6b96ff49aab9",
  cluster: "mt1",
  encrypted: true
});

router.get("/", (req, res) => {
  res.send("Sip dah jalan-jalan");
});

router.post("/", (req, res) => {
  channels_client.trigger("monggo-polling", "monggo-vote", {
    points: 1,
    location: req.body.location
  });
  return res.status(200).json({success: true, message: "Terimakasih atas pemilihan suaranya"})
});

module.exports = router;
