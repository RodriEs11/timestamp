// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



// SI NO SE ENVIA NINGUN PARAMETRO, SE MUESTRA LA HORA ACTUAL
app.route("/api")
.get((req, res) => {

  res.json({
     unix: Date.now(),
     utc: Date()  
  });
});



app.route("/api/:date")
.get((req, res) => {

  const params = req.params.date;

  console.log(req.params);

  let fecha; 

  // VERIFICA SI HAY UNA LETRA O SI EXISTE ALGUN GUION DENTRO DE LOS PARAMETROS
  // EJEMPLO -> 2015-12-25 OR 05 OCTOBER 2011, GMT
  const regex = /[a-zA-Z]/;
  if(regex.test(params) || params.search('-') != -1){
    
    fecha = new Date(Date.parse(params));
    
  }    
  else{
  
    fecha = new Date(parseInt(params));
  }1
  console.log(fecha);

  
   if(fecha == "Invalid Date"){
    res.json({error: "Invalid Date"});
    
  }else{
    res.json({
      unix: fecha.getTime(),
      utc: fecha.toUTCString()   
    });
   }

  
  
});