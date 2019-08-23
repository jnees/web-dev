function removeCurrent(){
  $('.currentColor' )[0].classList.remove("currentColor");
}

// click listener on color
$('.color').click(function(event){
  removeCurrent();
  this.classList.add("currentColor");
});

// click listener on SQUARES
$('.square').click(function(event){
  $(this).css("background-color", $('.currentColor' )[0].id);
});

// click listener in clear
$('#clear').click(function(){
  $('.square').css("background-color", "white");
});

// click listener in fill All
$('#fill').click(function(){
  $('.square').css("background-color", $('.currentColor')[0].id);
});
