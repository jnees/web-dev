// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static("public"));

articleSchema = {
  title: String,
  content: String
};

const Article = new mongoose.model('Article', articleSchema);

// Routing Requests - All Articles
app.route("/articles")

  .get(function(req, res){
    Article.find({}).exec(function(err, articles){
      if(!err){
        res.send(articles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res){
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const newArticle = new Article({
      title: newTitle,
      content: newContent
    });
    newArticle.save(function(err){
      if(!err){
        res.send("Article added successfully.");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res){
    Article.deleteMany({}, function(err){
      if(!err){
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

// Routing Requests- Specific Article
app.route("/articles/:articleTitle")

  .get(function(req, res){
    const requestedArticle = req.params.articleTitle;
    console.log(requestedArticle);
    Article.findOne({title: requestedArticle}, function(err, foundArticle){
      res.send(foundArticle);
    });
  })

  .put(function(req, res){
    Article.findOneAndUpdate(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      function(err){
        if(!err){
          res.send("Successfully updated article");
        } else {
          res.send(err);
        }
    });
  })

  .patch(function(req, res){
    Article.findOneAndUpdate(
      {title: req.params.articleTitle},
      {$set: req.body},
      function(err){
        if(!err){
          res.send("Successfully updated article");
        } else {
          res.send(err);
        }
    });
  })

  .delete(function(req, res){
    Article.deleteOne({title: req.params.articleTitle}, function(err){
      if(!err){
        res.send("Article successfully deleted");
      } else {
        res.send(err);
      }
    });
  });


app.listen(3000, function(){
  console.log("Server running on port 3000");
});
