var AWS = require("aws-sdk");
var userConfig = require('./config.json')

var fs = require('fs');

AWS.config.update({
  region: "us-west-2",
  endpoint: "dynamodb.us-west-2.amazonaws.com",
  accessKeyId: userConfig.default.accessKey,
  secretAccessKey: userConfig.default.secretAccessKey
});

var docClient = new AWS.DynamoDB.DocumentClient();

function isEmpty(jsonObject) {
	var empty = {};

	return jsonObject === empty;
}

function getResponseObjectFromData(data) {
	if (data && data.Item) {
		return {
			"code": data.Item.symbol,
			"name": data.Item.name,
			"photos": data.Item.photos
		}
	} else {
		return {
			"code": "N/A",
			"name": "Park could not be found.",
			"photos": []
		}
	}

	
}

function getPhotosByParkCode(code, request, response) {
	var searchParams = {
		TableName: "PhotoAlbum",
		Key: {
			"symbol": code
		}
	}

	docClient.get(searchParams, function(err, data) {
	    if (err) {
	        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
	        response.status(200);
			response.end("<html><body><div>whooops</div><div>" + JSON.stringify(err) + "</div></body></html>");
	    } else {
	        response.status(200);
			response.end(JSON.stringify(getResponseObjectFromData(data)));
	    }
	});
}

module.exports = {
	getPhotos: getPhotosByParkCode
}