const ENV = {};

ENV.isProduction = window.location.protocol === 'https';
ENV.productionApiUrl = 'https://james-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;
