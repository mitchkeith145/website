/*

TODO:

1. make all components of multi-path states (ie CA, MI, VA) react when any of the paths are moused over / out.
2. color code national parks visited vs not visisted
3. add state parks, misc recreation areas
	i. color code those differently
4. upload images to aws, enable in light book.
5. figure out hosting, domain
6. automate deployment of static content to ec2 host






*/





import React from 'react';
import { ReactDOM, render, unmountComponentAtNode } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Modal from 'react-modal';
import initializeMap from './map-with-parks';
Modal.setAppElement('body');

const customStyles = {
	content : {
		top: 			'50%',
		left: 			'50%',
		right: 			'auto',
		bottom: 	  	'auto',
		marginRight:  	'-50%',
		transform :   	'translate(-50%, -50%)',
		maxWidth: 			'1075px',
		maxHeight: 		'500px'
	}
};

var mapObjects = initializeMap("map-container", "832", "522.23389");
// return { 
// 	"states": states,
// 	"provinces": [ CAQC, CAON],
// 	"parkList": layer1,
// 	"parkMap": statesToParksMap
// }

var enableHiding = true;

var previousState = {
	"object": null,
	"parks": []
}

initializeAllParks(mapObjects.parkList);

addMouseOverEventsToStates(mapObjects.states, mapObjects.parkMap);

addMouseOverEventsToProvinces(mapObjects.provinces, mapObjects.parkMap);

// addMouseOverEventsToParks(mapObjects.parkList);


function initializeAllParks(parks) {
	console.log("Initializing " + parks.length + " parks.");
	addMouseOverEventsToParks(parks);
	hideParks(parks);
}

function hideParks(parks) {
	parks.forEach(function(park) {
		setStyleToObject(park, { "opacity": 0.0 });
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

///#d3d3d3
		this.node.style.fill = "#929494";
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');		
		
		console.log("made " + code + " green.");

		// mouse over state with parks.
		if (typeof parkMap[code] !== "undefined") {
		
			setStyleToObjects(parkMap[code].parks, { "opacity": 1.0 });

			if (previousState.object != null && previousState.code != code && enableHiding) {
				// setStyleToObject(previousState.object, { "fill": "#d3d3d3" });
				previousState.object.style.fill = "#d3d3d3";
				console.log("made " + previousState.code + " default");
				setStyleToObjects(previousState.parks, { "opacity": 0.0 });	
			}

			// // previousState.object = path;
			// // previousState.parks = parkMap[code].parks;

			previousState = {
				"object": this.node,
				"parks": parkMap[code].parks,
				"code": code
			}
		} else { // mousing over state without parks
			previousState.object.style.fill = "#d3d3d3";
			setStyleToObjects(previousState.parks, { "opacity": 0.0 });	
		}
		
	})

	path.mouseout(function(e) {
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		if (typeof parkMap[code] === "undefined") {
			this.node.style.fill = "#d3d3d3";
			console.log("made " + code + " default");
			// 
		 //    setStyleToObjects(parkMap[code].parks, { "opacity": 0.0 });	
		}
	});
}


function addMouseOverEventToObject(object) {
	

	object.mouseover(function(e) {

		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		// const element = <h1>{ stateName }</h1>;
		// ReactDOM.render(
		//   element,
		//   document.getElementById('react-test')
		// );
		// renderModal(code);

		this.node.style.fill = "#217821";
		
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
			renderModal(data.photos);
		});
		

		// renderModal(code)
	});
}

function renderPhotoAlbum(photos) {
	var gallery = [];
	photos.forEach(photo => {
		gallery.push({
			src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});
	render(<GalleryComponent gallery={gallery} />, document.getElementById("modal-component"));
}

function renderModal(photos) {
	var gallery = [];
	photos.forEach(photo => {
		gallery.push({
			src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});

	render(<ModalComponent gallery={ gallery } />, document.getElementById("modal-component"));
	// render(<GalleryComponent gallery={ gallery }  />, document.getElementById("modal-component"));
}

class ModalComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			modalIsOpen: true
		};		

		this.openModal = this.openModal.bind(this);
	    this.afterOpenModal = this.afterOpenModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	}

	openModal(code) {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal() {
	    // references are now sync'd and can be accessed.
	    //this.subtitle.style.color = '#f00';
  	}

  	closeModal() {
    	this.setState({modalIsOpen: false});
    	// unmountComponentAtNode(document.getElementById("modal-component"));
  	}

  	componentWillReceiveProps(nextProps) {
    	this.setState({
      		modalIsOpen: true
    	});
  	}
  			

  	render() {
	    return (
	    	<Modal
          		isOpen={this.state.modalIsOpen}
	          	onAfterOpen={this.afterOpenModal}
	        	onRequestClose={this.closeModal}
		        style={customStyles}
		        contentLabel={ this.props.code } >

	          	<GalleryComponent gallery={ this.props.gallery } />
	        </Modal>
	    );
  	}

}

// render(<MapComponent />, document.getElementById("map-container"));




var stateImageMap = {
	"USUT": [
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }
	],
	"USOR": [
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3675.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3686.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3841.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3893.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3925.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3936.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3963.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3985.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4005.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4014.jpg', width: 3936, height: 2216 },
	],
	"CRLA": [
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3841.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3893.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3925.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3936.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3963.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3985.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4005.jpg', width: 3936, height: 2216 },
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4014.jpg', width: 3936, height: 2216 }
	],
	"ZION": [
		{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 },
	  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }
	]
}



var photos;
const photos1 = [
  { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 },
  { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 },
  { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 },
  { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 },
  { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 },
  { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }
];

const photos2 = [
	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 },
  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 },
  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 },
  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 },
  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 },
  	{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }
];



class GalleryComponent extends React.Component {
  	constructor(props) {
  	
	    super(props);
	    this.props = props;

	    console.log("Trying to render lightbox.");
	    console.log(this.props.gallery);

	    this.state = { currentImage: 0, lightboxIsOpen: true };
	    this.closeLightbox = this.closeLightbox.bind(this);
	    this.openLightbox = this.openLightbox.bind(this);
	    this.gotoNext = this.gotoNext.bind(this);
	    this.gotoPrevious = this.gotoPrevious.bind(this);
  	}

  	openLightbox(event, obj) {
  		
    	this.setState({
      		currentImage: obj.index,
      		lightboxIsOpen: true,
    	});
  	}

  	closeLightbox() {
    	this.setState({
      		currentImage: 0,
      		lightboxIsOpen: false,
    	});
  	}

  	gotoPrevious() {
    	this.setState({
      		currentImage: this.state.currentImage - 1,
    	});
  	}

  	gotoNext() {
    	this.setState({
      		currentImage: this.state.currentImage + 1,
    	});
  	}

  	componentWillMount() {
  		console.log("Component will mount?");
  		this.setState({
			lightboxIsOpen: false
  		});
  	}

	componentWillReceiveProps(nextProps) {
		console.log("Receiving new event?");
		console.log(nextProps);
		this.setState({
			lightboxIsOpen: false
		});
	}

  	render() {
	  	console.log("Re render gallery? ");
	  	console.log(this.props.gallery);
	  	
	  	
	    return (
	      <div>
	        <Gallery photos={ this.props.gallery } onClick={this.openLightbox} />
	        <Lightbox images={ this.props.gallery }
	          onClose={this.closeLightbox}
	          onClickPrev={this.gotoPrevious}
	          onClickNext={this.gotoNext}
	          currentImage={this.state.currentImage}
	          isOpen={this.state.lightboxIsOpen}
	        />
	      </div>
	    )
  	}
}
		