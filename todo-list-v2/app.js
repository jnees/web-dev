//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

//Mongoose Setup
mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0-p2qug.mongodb.net/test?retryWrites=true&w=majority/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

// Create demo items.
const demo1 = new Item({
  name: "List what you need to do today."
});

const demo2 = new Item({
  name: "And when you are done,"
});

const demo3 = new Item({
  name: "<--- Smash the checkbox!"
});

const demoItems = [demo1, demo2, demo3];

// Create List Schema and Model.
const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

// Routing - Main List
app.get("/", function(req, res){

  Item.find({}, function(err, foundItems){
      if (foundItems.length === 0) {
        Item.insertMany(demoItems, function(err){
          if (err){
            console.log(err);
          } else {
            console.log("Demo items loaded.");
          }
        });
      }

      res.render('list', {listTitle: "Today", items: foundItems});
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/lists/" + listName);
    });
  }

});

// Routing - Custom Lists ("__dirname/lists/<anything>")
app.get("/lists/:customListName", function(req, res){
  const listRequested = _.capitalize(req.params.customListName);

  List.findOne({"name":listRequested}, function(err, foundList){
    if (!err) {
      if (!foundList) {
        // Create New List
        const customList = new List({
          name: listRequested,
          items: demoItems
        });

        customList.save();
        res.redirect("/lists/" + customList.name);

      } else {
        // Show and existing List
        const listName = _.capitalize(foundList.name);
        res.render("list", {listTitle: listName, items: foundList.items});
      }
    }
  });
});

// Delete Items from Main or Custom List
app.post("/delete", function(req, res){
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today"){
    Item.findByIdAndRemove(checkedItem, function(err){
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
  } else {
    //findOneAndUpdate({name: listName})
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItem}}}, function(err, foundLiist) {
      if (!err) {
        res.redirect("/lists/" + listName);
      }
    });
  }

});

// About Page
app.get("/about", function(req, res){
  res.render("about");
});

// Listener - Heroku env port or localhost default if running locally.
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has started.");
});
