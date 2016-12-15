// Code by Katya Gurina Robinson
var quote;
var author;
var getQuote = function() {
  $.ajax({
    url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    success: function(data) {
      var post = data.shift();
      var rawQuote = post.content;
      quote = stripTags(rawQuote);
      var words = countWords(quote);
      if (words > 30){
        // if quote is too lond -> get a new quote
        getQuote();
      }else{

      author = post.title;
      $("#quote").html(quote);

      $("#author").html(author);
     $("#tweet-btn").attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent( + quote  + author));
     }
    },
    cache: false
  });
};

function stripTags(string){
  var newSring;
  newString = string.replace("<p>", "");
  newString = newString.replace("</p>", "");
  newString = newString.replace("<br />", "");
  return newString;
}

function countWords(str) {
  return str.split(/\s+/).length;
}


 $(document).ready(function() {
 getQuote();
  $("#next-btn").on('click', getQuote);
	$('#tweet-btn').click(function(){
  window.open('https://twitter.com/intent/tweet?text=' + quote + " " + author, 'Share this quote', 'taget:_blank');
});
});


