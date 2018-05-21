var AWS = require("aws-sdk");

var fs = require('fs');
var sizeOf = require('image-size');

var codeNameMap = {
	"REDW": "Redwood National Park",
	"LAVO": "Lassen Volcanic National Park",
	"PINN": "Pinnacles National Park",
	"SEQU": "Sequoia National Park",
	"DEVA": "Death Valley National Park",
	"YOSE": "Yosemite National Park",
	"KICA": "Kings Canyon National Park",
	"CHIS": "Channel Islands National Park",
	"JOTR": "Joshua Tree National Park",
	"CRLA": "Crater Lake National Park",
	"ZION": "Zion National Park",
	"OLYM": "Olympic National Park",
	"NOCA": "North Cascades National Park",
	"MORA": "Mount Rainier National Park",
	"GLAC": "Glacier National Park",
	"YELL": "Yellowstone National Park",
	"GRTE": "Grand Tetons National Park",
	"WICA": "Wind Cave National Park",
	"BADL": "Badlands National Park",
	"THRO": "Theodore Roosevelt National Park",
	"CUVA": "Cuyahoga Valley National Park",
	"ACAD": "Acadia National Park",
	"FORILLON": "Le Parc National de Forillon",
	"GASPESIE": "Le Parc National de la Gaspésie",
	"JQNP": "Le Parc National de la Jacques Cartier",
	"GRBA": "Great Basin National Park",
	"BRCA": "Bryce Canyon National Park",
	"CANY": "Canyonlands National Park",
	"CARE": "Capitol Reef National Park",
	"ARCH": "Arches National Park",
	"MEVE": "Mesa Verde National Park",
	"BLCA": "Black Canyon of the Gunnison National Park",
	"GRSA": "Great Sand Dunes National Park and Preserve",
	"ROMO": "Rocky Mountain National Park",
	"GRCA": "Grand Canyon National Park",
	"PEFO": "Petrified Forest National Park",
	"SAGU": "Saguaro National Park",
	"CAVE": "Carlsbad Caverns National Park",
	"GUMO": "Guadalupe Mountains National Park",
	"BIBE": "Big Bend National Park",
	"HOSP": "Hot Springs National Park",
	"MACA": "Mammoth Cave National Park",
	"CONG": "Congaree National Park",
	"EVER": "Everglads National Park",
	"GRSM": "Great Smoky Mountains National Park",
	"SHEN": "Shenandoah National Park",
	"DRTO": "Dry Tortugas National Park",
	"BISC": "Biscayne National Park",
	"VOYA": "Voyageurs National Park",
	"ISRO": "Isle Royale National Park",
	"ALLE": "Allegheney National Forest",
	"BAXT": "Baxter State Park",
	"CLCA": "Club Campbell",
	"COFA": "Copper Falls State Park",
	"HIPE": "Adirondack High Peaks Wilderness",
	"LAWE": "Lake Wenatchess State Park",
	"MOHO": "Mount Hood National Forest",
	"QUVI": "Queen Victoria Park",
	"SLMO": "Slide Mountain Wilderness",
	"TONT": "Tonto National Forest",
	"WHMO": "White Mountain National Forest",
	"WAPO": "Walden Pond",
	"PIRO": "Pictured Rocks National Lakeshore"
}


AWS.config.update({
  region: "us-west-2",
  endpoint: "dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

fs.readdir("/Users/mitch/Desktop/tmp/", (err, directories) => {
	var parks = [];
	if (err) {
		console.log("Could not read tmp.");
		console.log(err);
	} else {
		directories.forEach(directory => {
		
			fs.readdir("/Users/mitch/Desktop/tmp/" + directory, (err, images) => {
				
				if (err) {
					console.log("Could not read tmp/" + directory);
					console.log(err);
				} else {
					var park = {
						"symbol": directory,
						"name": codeNameMap[directory],
						"photos": []
					}

					if (! codeNameMap[directory]) {
						console.log("Directory " + directory + " Not Found.");
					}

					if (images.length === 0) {
						var params = {
							TableName: "PhotoAlbum",
							Item: {
								"symbol": park.symbol,
								"name": park.name,
								"photos": park.photos
							}
						}
						docClient.put(params, function(err, data) {
							if (err) {
								console.error("Unable to add park", park.symbol, ". Error JSON:", JSON.stringify(err, null, 2));
							} else {
								console.log("PutItem succeeded:", park.symbol);
							}
					    });
					} else {

						var imagesTrimmed = images.indexOf(".DS_Store") > -1 ? images.splice(images.indexOf(".DS_Store"), 1): images;
					
						// console.log(images);

						if (images.length === 4) {
							console.log(park.symbol);
							console.log(images);
						}
					}
				}
			});
		});
	}
});

var dynamodb = new AWS.DynamoDB();

