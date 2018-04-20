import React from 'react';
import { ReactDOM, render } from 'react-dom';
import GalleryWrapperComponent from './gallery-wrapper-component';

var previousState = {
	"object": null,
	"parks": []
}

var mapInteraction = {
	"park": {
		"name": "Click on a park to view pictures!",
		"code": null
	}
};

var enableHiding = true;

function initializeAllParks(parks) {
	console.log("Initializing " + parks.length + " parks.");
	addMouseOverEventsToParks(parks);
	hideParks(parks);
}

function hideParks(parks) {
	parks.forEach(function(park) {
		setStyleToObject(park, { "opacity": 0.0, "fill": "#00D400" });
	});	
}

function setStyleToObjects(objects, styleMap) {
	objects.forEach(function(object) {
		setStyleToObject(object.object, styleMap);
	});
}

function setStyleToObject(object, style) {
	object.attr(style);
}

function addMouseOverEventsToParks(parks) {
	var left, right;
	var i = 0;
	parks.forEach(function(park) {

		console.log("Adding Mouse Over Event to " + park.data('id'));
		console.log(park);
		i++;
		addMouseOverEventToObject(park);

	});

	console.log("Added " + i + " events.");
}

function addMouseOverEventsToProvinces(provinces, parkMap) {
	provinces.forEach(function(province) {
		addMouseOverEventToPath(province, parkMap);
	});
}

function addMouseOverEventsToStates(states, parkMap) {
	states.forEach(function(state) {
		addMouseOverEventToPath(state, parkMap);
	});
}

function addMouseOverEventToStateWithStyle(object, style) {
	object.mouseover(function(e) {
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		this.node.attr(style);

	});
}

function addMouseOverEventToPath(path, parkMap) {
	path.mouseover(function(e) {

		this.node.style.fill = "#929494";
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');		
		
		console.log("made " + code + " green.");

		// mouse over state with parks.
		if (typeof parkMap[code] !== "undefined") {
		
			setStyleToObjects(parkMap[code].parks, { "opacity": 1.0 });

			if (previousState.object != null && previousState.code != code && enableHiding) {

				previousState.object.style.fill = "#d3d3d3";
				console.log("made " + previousState.code + " default");
				setStyleToObjects(previousState.parks, { "opacity": 0.0 });	
			}


			previousState = {
				"object": this.node,
				"parks": parkMap[code].parks,
				"code": code
			}
		} else { 
			previousState.object.style.fill = "#d3d3d3";
			setStyleToObjects(previousState.parks, { "opacity": 0.0 });	
		}
		
	})

	path.mouseout(function(e) {
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		if (typeof parkMap[code] === "undefined") {
			this.node.style.fill = "#d3d3d3";
			console.log("made " + code + " default");
		}
	});
}

function addMouseOverEventToObject(object) {
	

	object.mouseover(function(e) {

		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');

		this.node.style.fill = "#217821";
		this.node.style.cursor = "pointer";
	});

	object.mouseout(function(e){
	    this.node.style.fill = "#00D400";
	});

	object.mouseup(function(e) {
		

		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		
		console.log("HTTP GET mitchkeith.com/photos/" + code);	

		fetch("/photos/" + code).then(results => {
			return results.json();
		}).then(data => {

			mapInteraction = {
				"park": {
					"name": data.name,
					"code": data.code,
					"photos": data.photos
				}
			}

			renderGallery(data);
		});
	});
}

function renderGallery(park) {

	var images = [];
	park.photos.forEach(photo => {
		images.push({
			original: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
			thumbnail: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name
		})
	})

	park.photos = images;
	render(<GalleryWrapperComponent park={ park } />, document.getElementById("gallery-container"));
}


module.exports = {
	initializeAllParks: initializeAllParks,
	addMouseOverEventsToStates: addMouseOverEventsToStates,
	addMouseOverEventsToProvinces: addMouseOverEventsToProvinces
}





