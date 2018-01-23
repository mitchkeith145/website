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
import ImageGallery from 'react-image-gallery';

// import "react-image-gallery/styles/css/image-gallery.css";

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

//"500", "313.842481971153846"


// var mapObjects = initializeMap("map-container", "832", "500");

// initializeAllParks(mapObjects.parkList);

// addMouseOverEventsToStates(mapObjects.states, mapObjects.parkMap);

// addMouseOverEventsToProvinces(mapObjects.provinces, mapObjects.parkMap);

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

var mapInteraction = {
	"park": {
		"name": "Click on a park to view pictures!",
		"code": null
	}
};



// addMouseOverEventsToParks(mapObjects.parkList);
var currentPageNumber = 0;

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

			mapInteraction = {
				"park": {
					"name": data.name,
					"code": data.code,
					"photos": data.photos
				}
			}

			console.log("rendering test componenet...");
			console.log(mapInteraction.park);

			renderGallery(data);
			//render(<TestComponent park={ mapInteraction.park }  />, document.getElementById("gallery-container"));

			// renderModal(data.photos);
		});
		

		// renderModal(code)
	});
}

function renderPhotoAlbum(photos) {
	var gallery = [];
	photos.forEach(photo => {
		gallery.push({
			src: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});
	render(<GalleryComponent gallery={gallery} />, document.getElementById("modal-component"));
}

function setMaxWidth(photo, maxWidth) {
	var ratio = photo.width / photo.height;
	if (photo.width > maxWidth) {
		photo.width = maxWidth;
		photo.height = (1 / ratio) * photo.height;
	}
}

function renderModal(photos) {
	var gallery = [];
	photos.forEach(photo => {
		setMaxWidth(photo, 3936);
		gallery.push({
			src: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});

	render(<ModalComponent gallery={ gallery } />, document.getElementById("modal-component"));
	// render(<GalleryComponent gallery={ gallery }  />, document.getElementById("modal-component"));
}

function renderGallery(park) {
	// var gallery = [];
	// park.photos.forEach(photo => {
	// 	gallery.push({
	// 		src: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
	// 		width: photo.width,
	// 		height: photo.height
	// 	});
	// });

	// park.photos = gallery;

	// render(<GalleryWrapper park={ park } />, document.getElementById("gallery-container"));

	var images = [];
	park.photos.forEach(photo => {
		images.push({
			original: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
			thumbnail: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name
		})
	})

	park.photos = images;
	render(<GalleryWrapper park={ park } />, document.getElementById("gallery-container"));
}

class GalleryWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return(
			<div id="gallery-component-wrapper">
				<div id="gallery-header">
					{this.props.park.name} ({this.props.park.code})
				</div>
				<div id="gallery-wrapper">
					<ImageGallery items={ this.props.park.photos } />
				</div>
			</div>
		)
	}
}



class NavigationComponent extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return(
			<div className="dropdown full-height full-width">
				<div className="dropbtn">
					<div className="toc-bar"></div>
					<div className="toc-bar"></div>
					<div className="toc-bar"></div>
				</div>
				<div className="dropdown-content">
					<NavigationElement displayText={ "about" } pageNumber={ 0 }/>
					<NavigationElement displayText={ "travel & photography" } pageNumber={ 1 }/>
				</div>
            </div>
		)
	}

}

class NavigationElement extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;


		this.navigate = this.navigate.bind(this);
		console.log("Constructing...");
		console.log(this.props);
	}

	navigate() {

		if (this.props.pageNumber === 0) {
			render(<AboutPage />, document.getElementById("about-content"));
		} else {
			render(<TravelPage />, document.getElementById("about-content"));
		}

		console.log('nagivating from ');
		console.log(this.props);
	}

	render() {
		return (
			<a href="#" onClick={ this.navigate }>
				{ this.props.displayText }
			</a>
		)
	}

}

render(<NavigationComponent />, document.getElementById("toc"));

class TestComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	// componentWillReceiveProps(nextProps) {
 //    	this.setState({
 //      		modalIsOpen: true
 //    	});
 //  	}

	render() {
		return(
			<div>{this.props.park.name}</div>
		)
	}

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

// console.log("rendering test componenet...");
// console.log(mapInteraction.park);
// render(<TestComponent park={ mapInteraction.park } />, document.getElementById("gallery-container"));


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


class AboutPage extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}


	render() {

		return(
			<div className="column-container">
                <div className="left-half">
                    <div className="column-header">...the developer &nbsp; &nbsp; &nbsp;</div>
                    <div className="column-content content-table">
                        <div className="content-table-row">
                            <div className="content-table-cell">
                                <div className="logo-placeholder">
                                    <img src="images/ohio_state.png" className="logo"></img>
                                </div>
                                <div className="logo-description-placeholder">
                                    <div className="logo-description">
                                        Ohio State University (Columbus, OH) <br></br>
                                        B.S. Computer Science &amp Engineering <br></br>
                                        May, 2015
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-table-row">
                            <div className="content-table-cell">
                                <div className="logo-placeholder">
                                    <img src="images/morningstar.png" className="logo"></img>
                                </div>
                                <div className="logo-description-placeholder">
                                    <div className="logo-description">
                                        Morningstar (Chicago, IL) <br></br>
                                        Associate Engineer <br></br>
                                        July 2015 to July 2017
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-table-row">
                            <div className="content-table-cell">
                                <div className="logo-placeholder">
                                    <img src="images/cisco.png" className="logo"></img>
                                </div>
                                <div className="logo-description-placeholder">
                                    <div className="logo-description">
                                        Cisco, Systems (San Jose, CA) <br></br>
                                        Intern - Software Engineering <br></br>
                                        June - August, 2012 - 2014
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-half">
                    <div className="column-header">...the person &nbsp; &nbsp; &nbsp;</div>
                    <div className="column-content">

                        <div>
                            <div className="bio-bordered-cell">

                                My name is Mitchell. I'm a twenty-something with a mellow predisposition and a tendency to err on the side of 
                                caution thanks to a life lived as a Cleveland sports fans. I graduated from college in 2015 and spent just over 
                                two years in the windy city, working and learning to navigate the treacherous seas of life. But as the seamen, 
                                who live for the ocean and its trials and obstacles, craves the land every so often, I, too, had to spend to spend 
                                some time off the waters, away from the ship that coasts and cruises into the future.  <br></br><br></br>

                                So I left Chicago and took a 100-day journey across the United States (& a sliver of Canada). 
                                My Prius became my vessel; my Nemo Hornet 1-Person tent, my berth. Nearly every day, I slept in a place 
                                entirely different from where it was I awoke. Every day was different from the one previous. 
                                There\'s a common mantra, seen frequently on clickbait self-motivating Tumblr pages, that says \"don\'t live too fast.\" 
                                For one of the first times in my life, I listened and lived slowly and deliberately. 
                                All in all, I drove almost 23,000 miles and visited 40 American & Canadian national parks 
                                in 27 U.S. states & 2 Canadian provinces. Check out the map below to see the ground I\'ve covered, 
                                and to see what some of Nature\'s fine temples look like through my eyes (& my Sony A7 camera lens).

                                <br></br><br></br>

                                
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
		)
	}
}


class TravelPage extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	componentDidMount() {
		var mapObjects = initializeMap("map-container", "832", "500");

		initializeAllParks(mapObjects.parkList);

		addMouseOverEventsToStates(mapObjects.states, mapObjects.parkMap);

		addMouseOverEventsToProvinces(mapObjects.provinces, mapObjects.parkMap);
	}


	render() {

		return(
			<div>
                <div className="block-header">Exploration</div>
                <div className="full-height full-width">
                    <div id="travel-left-column">
                        <div className="travel-pane float-right white-background">
                            <div id="map-container"></div>
                        </div>
                    </div>
                    <div id="travel-right-column">
                        <div className="travel-pane float-left white-background">
                            <div id="gallery-container"></div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}


render(<AboutPage />, document.getElementById("about-content"));











		