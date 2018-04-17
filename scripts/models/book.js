const ENV = {};

ENV.isProduction = window.location.protocol === 'https';
ENV.productionApiUrl = 'https://james-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }
  function Book(bookObject){
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#task-template').text());
    return template(this);
  }
  Book.all = [];
  Book.LoadAll = rows => {
    Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  }
  Book.fetchAll = callback => 
    $.get(`${ENV.apiUrl}/Books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  module.Book = Book;
})(app);
