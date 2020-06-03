const express = require("express");
const scraper = require("./scraper");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Post = require("./post");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Assaf:Z2am4xHkg171fqsE@cluster0-g3elr.mongodb.net/node-angular?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.get("/", (req, res) => {
  scraper.getTextForNews().then((news) => {
    res.json(news);
  });
});

//Posting news to mongo
app.post("/api/postnews", (req, res, next) => {
  scraper.getTextForNews().then((news) => {
    news.forEach(async (element) => {
      const post = new Post({
        title: element.title,
        description: element.desc,
        imagePath: element.image,
        linkToNews: element.links,
        Date: element.date,
      });
      let test = await post.save();
    });
  });

  res.status(201).json({
    message: "News added succesfully",
  });
});

//Getting news from the mongo
app.get("/api/getDBNews", (req, res, next) => {
  Post.find()
    .then((document) => {
      res.status(200).json({
        document,
      });
    })
    .catch(function (reason) {
      console.log("reason: ", reason);
    });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
//Assaf, Z2am4xHkg171fqsE
//mongodb+srv://Assaf:Z2am4xHkg171fqsE@cluster0-g3elr.mongodb.net/node-angular?retryWrites=true&w=majority
