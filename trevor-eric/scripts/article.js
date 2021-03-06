'use strict';

var articles = [];


// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It is capitalized because it is a constructor function.  The purpose of the function is

function Article (rawDataObj) {
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function() {

  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // It takes a deep copy of the structure of the article so you can reuse that structure.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');

  $newArticle.attr('data-category', this.category);
  $newArticle.find('.by-line a').html(this.author);
  $newArticle.find('.by-line a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').html(this.title);
  $newArticle.find( '.article-body' ).html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);


  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

//for(let i = 0; i < rawData.length; i++) {
//  articles.push(new Article(rawData[i]));
//}
rawData.forEach(function(article){
  articles.push(new Article(article))
});

//for(let i = 0; i < articles.length; i++) {
//  $('#articles').append(articles[i].toHtml());
//}
articles.forEach(function(article){
  $('#articles').append(article.toHtml());
});
