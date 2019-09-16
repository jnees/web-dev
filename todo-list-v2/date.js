//jshint esversion:6

exports.getDate = function() {
  let today = new Date();
  let currentDay = today.getDay();
  let dateOptions = {weekday: "long", day: "numeric", month: "long"};
  return today.toLocaleDateString("en-US", dateOptions);
};

exports.getDay = function(){
  let today = new Date();
  let currentDay = today.getDay();
  let dateOptions = {weekday: "long"};
  return today.toLocaleDateString("en-US", dateOptions);
};
