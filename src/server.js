const express = require('express')
const app = express()
const cors = require('cors');
const process = require('process'), path = require('path');
const fs = require('fs');
const photoController = require('./photoController');
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "local";

app.get('/', (req, res) => res.sendFile(path.join(process.cwd(), 'src/html/home.html')));
app.use(express.static('src/public'));

app.listen(PORT, () => console.log('Example app listening on port ' + PORT + '!'));

// app.options('/photos/:code', cors());

// var whitelist = ['http://localhost:3000', 'http://www.mitchkeith.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.get('/photos/:code', function(request, response) {
	var code = request.params.code;

	photoController.getPhotos(code, request, response);
});