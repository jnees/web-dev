//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash/string");

const aboutContent = "Waistcoat biodiesel coloring book jianbing, pickled fanny pack selvage you probably haven't heard of them typewriter. Man bun listicle palo santo, knausgaard poutine offal tbh sriracha irony chartreuse 3 wolf moon banh mi. Deep v swag taxidermy unicorn. Listicle occupy scenester dreamcatcher viral distillery umami. Semiotics leggings master cleanse polaroid typewriter meh YOLO vinyl tumblr keffiyeh tousled sustainable wayfarers. Squid fixie prism enamel pin four dollar toast paleo letterpress poutine vegan sustainable retro. Keytar typewriter pickled ennui VHS before they sold out semiotics ramps sriracha iPhone organic subway tile woke banh mi irony.";
const contactContent = "Intelligentsia bitters truffaut, typewriter man bun tumblr actually hella master cleanse gluten-free meggings cliche letterpress edison bulb. Shoreditch tbh live-edge biodiesel godard 90's austin crucifix. Leggings kitsch chambray cold-pressed fam polaroid artisan, copper mug 8-bit vinyl succulents. Fingerstache banjo YOLO, 90's pinterest pabst chia iPhone gochujang austin occupy disrupt craft beer lyft. XOXO chartreuse pork belly four dollar toast 90's pok pok PBR&B affogato health goth portland banh mi lo-fi poutine bicycle rights tumeric.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Globals

const allPosts = [];

// Routers

app.get("/", function(req, res){
  res.render("home", {allPosts:allPosts});
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent:contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postText
  };

  allPosts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  allPosts.forEach(function(post){
    if(_.lowerCase(post.title) === requestedTitle){
      res.render("post", {
        postTitle: post.title,
        postText: post.content
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
