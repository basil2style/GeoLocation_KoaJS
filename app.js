var koa = require('koa');
var request = require('koa-request');
var app = new koa();

app.use(function * () {
    
    var options = {
    	url: 'http://ip-api.com/json',
	    headers: { 'User-Agent': 'request' }
	};

	var response = yield request(options); //Yay, HTTP requests with no callbacks!
	var info = JSON.parse(response.body);
    this.lat = info.lat;
    this.lon = info.lon;
    //this.body = 'My city is :' + info.city + ' & ' + 'country is: ' + info.country;
    //console.log(info);

    var weatherUrl = {
        url: 'http://api.openweathermap.org/data/2.5/weather?lat='+info.lat+'&lon='+info.lon+'&cnt=10&APPID=bd12f9c41a85e844d4a853a020eb62a5',
	    headers: { 'User-Agent': 'request' }
	};
   response = yield request(weatherUrl);
   var weatherValue = JSON.parse(response.body);
   this.temp = weatherValue.main['temp']
   this.weatherCode = weatherValue.id

 //  console.log(weatherValue.main['temp'])
   this.body = 'My city is :' + info.city + ' & ' + 'country is: ' + 
                info.country + ', Temperature : ' + this.temp + ' &Weather ID : ' + this.weatherCode;
   
});

app.listen(process.env.PORT || 8080);
console.log("Server listening on localhost:8080 ...");

