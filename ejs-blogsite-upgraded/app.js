//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash/string");
const mongoose = require("mongoose");
const url = require("url");

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => console.log(error));

const aboutContent = "Waistcoat biodiesel coloring book jianbing, pickled fanny pack selvage you probably haven't heard of them typewriter. Man bun listicle palo santo, knausgaard poutine offal tbh sriracha irony chartreuse 3 wolf moon banh mi. Deep v swag taxidermy unicorn. Listicle occupy scenester dreamcatcher viral distillery umami. Semiotics leggings master cleanse polaroid typewriter meh YOLO vinyl tumblr keffiyeh tousled sustainable wayfarers. Squid fixie prism enamel pin four dollar toast paleo letterpress poutine vegan sustainable retro. Keytar typewriter pickled ennui VHS before they sold out semiotics ramps sriracha iPhone organic subway tile woke banh mi irony.";
const contactContent = "Intelligentsia bitters truffaut, typewriter man bun tumblr actually hella master cleanse gluten-free meggings cliche letterpress edison bulb. Shoreditch tbh live-edge biodiesel godard 90's austin crucifix. Leggings kitsch chambray cold-pressed fam polaroid artisan, copper mug 8-bit vinyl succulents. Fingerstache banjo YOLO, 90's pinterest pabst chia iPhone gochujang austin occupy disrupt craft beer lyft. XOXO chartreuse pork belly four dollar toast 90's pok pok PBR&B affogato health goth portland banh mi lo-fi poutine bicycle rights tumeric.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Mongoose Schemas

postSchema = {
  date: Date,
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

// Routers

app.get("/:pageNumber([0-9]*)?", function(req, res){
  Post.find().collation({locale: "en" }).sort({date: -1}).exec(function(err, posts){
    const pageRequested = parseInt(req.params.pageNumber);
    const postCount = posts.length;
    const postsPerPage = 4;
    const pages = Math.ceil(postCount / postsPerPage);
    let firstPost = 0;

    console.log(pageRequested);

    firstPost = ((pageRequested - 1) * postsPerPage);  //
    firstPost = firstPost || 0;   // convert root node requests to 0
    const lastPost = firstPost + postsPerPage;

    res.render("home",
      {
        allPosts:posts.slice(firstPost, lastPost),
        postCount:postCount,
        pages:pages,
        pageRequested:pageRequested
      });
  });
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
  console.log(req.body);

  // create new Post object
  const blogPost = new Post ({
    "date": Date.now(),
    "title": req.body.postTitle,
    "content": req.body.postText
  });

  blogPost.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res) {

  const requestedPostId = req.params.postId;
  Post.findOne({"_id": requestedPostId}, function(err, post){
    res.render("post", {
      postTitle: post.title,
      postText: post.content
    });
    }
  );
});

// Listeners

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

mongoose.connection.on('error', err => {
  console.log(err);
});
