//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use("/styles",express.static(__dirname + "/styles"));

symbols = {
  'USD': "&dollar;",
  "GBP": "&pound;",
  "EUR": "&euro;"
};

// Root Page: Ticker
app.listen(3000, function(){
  console.log("server is running on port 3000");
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var symbolSet = crypto + fiat;
  var amount = req.body.amount;

  var baseURL = `https://apiv2.bitcoinaverage.com/convert/global`;

  var options = {
    url: baseURL,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = new Date(data.time);

    var message = `${amount} ${crypto} = ${symbols[fiat]}${price} ${fiat}.`;

    console.log(currentDate);
    console.log(`${amount} ${crypto} = ${price} ${fiat}`);

    res.write(`<p>The current date is ${currentDate}.</p>`);
    res.write(`<h1>${message}</h1>`);
    res.send();
  });
});
