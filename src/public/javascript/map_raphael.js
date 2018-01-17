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

var paths = initializeMap("map-container", "832", "522.23389");

console.log("Paths initialized, count = " + paths.length);

var albumBoolean = true;

addMouseOverEvents(paths);

function renderModal(code) {
	console.log("Let's try to render modal for : " + code);


	//render(<ModalComponent code={code} album={albumBoolean} />, document.getElementById("modal-component"));
	render(<GalleryComponent code={code} album={albumBoolean} />, document.getElementById("modal-component"));
//GalleryComponent
	albumBoolean = !albumBoolean;
}


function addMouseOverEvents(states) {
	states.forEach(function(state) {
		addMouseOverEventToState(state);
	});
}

function addMouseOverEventToState(state) {
	

	state.mouseover(function(e) {

		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		// const element = <h1>{ stateName }</h1>;
		// ReactDOM.render(
		//   element,
		//   document.getElementById('react-test')
		// );
		// renderModal(code);

		this.node.style.opacity = 0.7;
	});

	state.mouseout(function(e){
	    this.node.style.opacity = 1;
	});

	state.click(function(e) {
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		renderModal(code)
	});
}

class ModalComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		console.log("Got props");
		console.log(props);
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
    	unmountComponentAtNode(document.getElementById("modal-component"));
  	}

  	componentWillReceiveProps(nextProps) {
  		console.log("Receiving new event?");
  		console.log(nextProps);
    	this.setState({
      		modalIsOpen: true
    	});
  	}
  			// <Modal
     //      		isOpen={this.state.modalIsOpen}
	    //       	onAfterOpen={this.afterOpenModal}
	    //     	onRequestClose={this.closeModal}
		   //      style={customStyles}
		   //      contentLabel={ this.props.code } >

	    //       	<GalleryComponent code={ this.props.code } album={ this.props.album } />
	    //     </Modal>

  	render() {
	    return (
	    	<GalleryComponent code={ this.props.code } album={ this.props.album } />
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

	    console.log("Gallery has props>");
	    console.log(props);
	    if (typeof this.props != "undefined" && this.props.album) {
	    	photos = photos1;
	    } else if (typeof this.props != "undefined" && !this.props.album) {
	    	photos = photos2;
	    } 

	    this.state = { currentImage: 0, lightboxIsOpen: true };
	    this.closeLightbox = this.closeLightbox.bind(this);
	    this.openLightbox = this.openLightbox.bind(this);
	    this.gotoNext = this.gotoNext.bind(this);
	    this.gotoPrevious = this.gotoPrevious.bind(this);
  	}

  	openLightbox(event, obj) {
  		console.log("Open lightbox?");
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
			lightboxIsOpen: true
  		});
  	}

	componentWillReceiveProps(nextProps) {
		console.log("Receiving new event?");
		console.log(nextProps);
		this.setState({
			lightboxIsOpen: true
		});
	}

  	render() {
	  	console.log("Re render gallery? " + this.props.code);
	  	//<Gallery photos={stateImageMap[this.props.code]} onClick={this.openLightbox} />
	  	
	    return (
	      <div>
	        
	        <Lightbox images={stateImageMap[this.props.code]}
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

// render(<GalleryComponent code="LOAF" />, document.getElementById('react-test'));

export { paths };
		