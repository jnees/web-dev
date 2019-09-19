# web-dev-for-fun
A collection of web development projects that I've built for practice, tutorials, or just for fun.

9. ## [REST API starter](https://github.com/jnees/web-dev-for-fun/tree/master/API-starter) (REST API implimentation)

A basic REST API set-up using NODE.JS/Express/MongoDB which allows clients to perform CRUD operations via get/post/put/patch/delete requests. Currently configured for a DB containing just the title and body of articles, but could be easily adapated to other datasets. 

Includes the following endpoints:
 - **/articles** - (Get all articles, Delete all articles, or Post one article.)
 - **/articles/<specific_title>**  - (From a specific article: Get article, Change part of article, Change entire article, or Delete Article)
 
 (NODE.JS/Express/MongoDB)

8. ## [To Do List (Upgraded with MongoDB)](https://github.com/jnees/web-dev-for-fun/tree/master/todo-list-v2) - (Web App / MongoDB / Node.JS)

This is an upgraded version of [To Do List (v1)](https://github.com/jnees/web-dev-for-fun/tree/master/todo-list-v1). The list now uses MongoDB/Mongoose to store all of the user's custom lists and items. This project is hosted live on [Heroku](https://hidden-temple-80329.herokuapp.com/).
(HTML/CSS/NODE.JS/Express/EJS/MongoDB/Mongoose/Heroku)

7. ## [Blog Site (v1)](https://github.com/jnees/web-dev-for-fun/tree/master/ejs-blogsite) (Node.js/Express/ejs Blog Site/Web App)

This web app is a fully functioning blog site. This runs on node.js and requires express/body-parser/ejs. To add a blog post, use the hidden route "/compose". In this app, pages are generated using EJS templating. This was built for a "boss level challenge" in [this Udemy Web-Dev Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/). This project can be upgraded by adding authentication and a database. (HTML/CSS/BOOTSTRAP/NODE.JS/EXPRESS/EJS/lodash).

6. ## [To Do List (v1)](https://github.com/jnees/web-dev-for-fun/tree/master/todo-list-v1) (Node.js/Express Web Application)

This app allows the user to keep a main and a work to-do list in their browser. This is set up to run in a node.js environment and requires express, body-parser, and EJS. Listener is set to port 3000. The main to-do list is at "/" and the work list is at "/work". (HTML/CSS/NODE.JS/Express/EJS).

5. ## [Newsletter-Signup](https://github.com/jnees/web-dev-for-fun/tree/master/Newsletter-Signup) (Node.js/Express Web Application)

An app that allows users to sign up for a newsletter. I don't personally have a newsletter to send out, but now my dog does! This is a live application that is hosted [here on Heroku](https://thawing-peak-68246.herokuapp.com/) that links to MailChimp's API. Feel free to sign up for news about Ginger or copy it for your own project. You will need to add your own api_key and mail list using environmental variables.

This project was made using HTML, CSS, JS/JQUERY, Node, Express, Body-Parser, and Request with the MailChimp API for list management and Heroku for hosting. This app was inspired by a bootcamp project. [this Udemy Web-Dev Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/).

4. ## [OnePlayerPong](https://github.com/jnees/web-dev-for-fun/tree/master/OnePlayerPong) (browser game)

It's man vs. wall in this updated classic. Use your left/right keys to move the paddle. Collect cash, accrue interest, and shop for upgrades.

This project uses html/css/bootstrap/js only.

3. ## [Crypto-Converter](https://github.com/jnees/web-dev-for-fun/tree/master/Bitcoin-Ticker) (Web-application)

This web app lets you get the latest price quote for Bitcoin/Ethereum/Litecoins and convert to USD/GBP/EUR. Enter the number of coins that you want to convert and select the crypto and fiat currencies that you would like to see.

This project uses HTML/CSS/Bootstrap on the front end and JS/Node/Express on the backend. This can run locally on port 3000 and requires express, body-parser, and request packages. The app connects to the [BitcoinAverage API](https://github.com/jnees/web-dev-for-fun/tree/master/Bitcoin-Ticker). 

$npm install express body-parser request

2. ## [TinySpritePainter](https://github.com/jnees/web-dev-for-fun/tree/master/TinySpritePainter) (browswer painting app)

Create your low-res masterpiece in this 8x8 pixel art app.

This project uses **html, css/bootstrap, and javascript/jquery**. I was inspired to build this app by my two-year old son who loves both art and trying to click the trackpad on my laptop.

1. ## [Simon](https://github.com/jnees/web-dev-for-fun/tree/master/Simon) (browser game)

Are you a master of memorization? Do you have 'total recall'? You'll wish you had three brains in this classic memory challenge. Watch the computer display a series of colors, then repeat the buttons back in the same order to advance to the next level.

This project uses **html, css and javascript/jquery** and was inspired by the jquery 'boss level challenge' in [this Udemy Web-Dev Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/).



