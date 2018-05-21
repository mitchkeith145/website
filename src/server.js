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

app.get('/photos/:code', function(request, response) {
	var code = request.params.code;

	photoController.getPhotos(code, request, response);
});