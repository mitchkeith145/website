'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactPhotoGallery = require('react-photo-gallery');

var _reactPhotoGallery2 = _interopRequireDefault(_reactPhotoGallery);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _mapWithParks = require('./map-with-parks');

var _mapWithParks2 = _interopRequireDefault(_mapWithParks);

var _reactImageGallery = require('react-image-gallery');

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               TODO:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               1. make all components of multi-path states (ie CA, MI, VA) react when any of the paths are moused over / out.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               2. color code national parks visited vs not visisted
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               3. add state parks, misc recreation areas
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	i. color code those differently
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               4. upload images to aws, enable in light book.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               5. figure out hosting, domain
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               6. automate deployment of static content to ec2 host
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// import "react-image-gallery/styles/css/image-gallery.css";

_reactModal2.default.setAppElement('body');

var customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		maxWidth: '1075px',
		maxHeight: '500px'
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
};

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
	parks.forEach(function (park) {
		setStyleToObject(park, { "opacity": 0.0 });
	});
}

function setStyleToObjects(objects, styleMap) {
	objects.forEach(function (object) {
		setStyleToObject(object.object, styleMap);
	});
}

function setStyleToObject(object, style) {
	object.attr(style);
}

function addMouseOverEventsToParks(parks) {
	var left, right;
	var i = 0;
	parks.forEach(function (park) {

		console.log("Adding Mouse Over Event to " + park.data('id'));
		console.log(park);
		i++;
		addMouseOverEventToObject(park);
	});

	console.log("Added " + i + " events.");
}

function addMouseOverEventsToProvinces(provinces, parkMap) {
	provinces.forEach(function (province) {
		addMouseOverEventToPath(province, parkMap);
	});
}

function addMouseOverEventsToStates(states, parkMap) {
	states.forEach(function (state) {
		addMouseOverEventToPath(state, parkMap);
	});
}

function addMouseOverEventToStateWithStyle(object, style) {
	object.mouseover(function (e) {
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		this.node.attr(style);
	});
}

function addMouseOverEventToPath(path, parkMap) {
	path.mouseover(function (e) {

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
			};
		} else {
			// mousing over state without parks
			previousState.object.style.fill = "#d3d3d3";
			setStyleToObjects(previousState.parks, { "opacity": 0.0 });
		}
	});

	path.mouseout(function (e) {
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

	object.mouseover(function (e) {

		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		// const element = <h1>{ stateName }</h1>;
		// ReactDOM.render(
		//   element,
		//   document.getElementById('react-test')
		// );
		// renderModal(code);

		this.node.style.fill = "#217821";
	});

	object.mouseout(function (e) {
		this.node.style.fill = "#00D400";
	});

	object.mouseup(function (e) {

		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');

		console.log("HTTP GET mitchkeith.com/photos/" + code);

		fetch("/photos/" + code).then(function (results) {
			return results.json();
		}).then(function (data) {

			mapInteraction = {
				"park": {
					"name": data.name,
					"code": data.code,
					"photos": data.photos
				}
			};

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
	photos.forEach(function (photo) {
		gallery.push({
			src: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});
	(0, _reactDom.render)(_react2.default.createElement(GalleryComponent, { gallery: gallery }), document.getElementById("modal-component"));
}

function setMaxWidth(photo, maxWidth) {
	var ratio = photo.width / photo.height;
	if (photo.width > maxWidth) {
		photo.width = maxWidth;
		photo.height = 1 / ratio * photo.height;
	}
}

function renderModal(photos) {
	var gallery = [];
	photos.forEach(function (photo) {
		setMaxWidth(photo, 3936);
		gallery.push({
			src: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});

	(0, _reactDom.render)(_react2.default.createElement(ModalComponent, { gallery: gallery }), document.getElementById("modal-component"));
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
	park.photos.forEach(function (photo) {
		images.push({
			original: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name,
			thumbnail: 'https://dg5blws9md5i8.cloudfront.net/all/' + photo.name
		});
	});

	park.photos = images;
	(0, _reactDom.render)(_react2.default.createElement(GalleryWrapper, { park: park }), document.getElementById("gallery-container"));
}

var GalleryWrapper = function (_React$Component) {
	_inherits(GalleryWrapper, _React$Component);

	function GalleryWrapper(props) {
		_classCallCheck(this, GalleryWrapper);

		var _this = _possibleConstructorReturn(this, (GalleryWrapper.__proto__ || Object.getPrototypeOf(GalleryWrapper)).call(this, props));

		_this.props = props;
		return _this;
	}

	_createClass(GalleryWrapper, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'gallery-component-wrapper' },
				_react2.default.createElement(
					'div',
					{ id: 'gallery-header' },
					this.props.park.name,
					' (',
					this.props.park.code,
					')'
				),
				_react2.default.createElement(
					'div',
					{ id: 'gallery-wrapper' },
					_react2.default.createElement(_reactImageGallery2.default, { items: this.props.park.photos })
				)
			);
		}
	}]);

	return GalleryWrapper;
}(_react2.default.Component);

var NavigationComponent = function (_React$Component2) {
	_inherits(NavigationComponent, _React$Component2);

	function NavigationComponent(props) {
		_classCallCheck(this, NavigationComponent);

		var _this2 = _possibleConstructorReturn(this, (NavigationComponent.__proto__ || Object.getPrototypeOf(NavigationComponent)).call(this, props));

		_this2.props = props;
		return _this2;
	}

	_createClass(NavigationComponent, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'dropdown full-height full-width' },
				_react2.default.createElement(
					'div',
					{ className: 'dropbtn' },
					_react2.default.createElement('div', { className: 'toc-bar' }),
					_react2.default.createElement('div', { className: 'toc-bar' }),
					_react2.default.createElement('div', { className: 'toc-bar' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'dropdown-content' },
					_react2.default.createElement(NavigationElement, { displayText: "about", pageNumber: 0 }),
					_react2.default.createElement(NavigationElement, { displayText: "travel & photography", pageNumber: 1 })
				)
			);
		}
	}]);

	return NavigationComponent;
}(_react2.default.Component);

var NavigationElement = function (_React$Component3) {
	_inherits(NavigationElement, _React$Component3);

	function NavigationElement(props) {
		_classCallCheck(this, NavigationElement);

		var _this3 = _possibleConstructorReturn(this, (NavigationElement.__proto__ || Object.getPrototypeOf(NavigationElement)).call(this, props));

		_this3.props = props;

		_this3.navigate = _this3.navigate.bind(_this3);
		console.log("Constructing...");
		console.log(_this3.props);
		return _this3;
	}

	_createClass(NavigationElement, [{
		key: 'navigate',
		value: function navigate() {

			if (this.props.pageNumber === 0) {
				(0, _reactDom.render)(_react2.default.createElement(AboutPage, null), document.getElementById("about-content"));
			} else {
				(0, _reactDom.render)(_react2.default.createElement(TravelPage, null), document.getElementById("about-content"));
			}

			console.log('nagivating from ');
			console.log(this.props);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'a',
				{ href: '#', onClick: this.navigate },
				this.props.displayText
			);
		}
	}]);

	return NavigationElement;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(NavigationComponent, null), document.getElementById("toc"));

var TestComponent = function (_React$Component4) {
	_inherits(TestComponent, _React$Component4);

	function TestComponent(props) {
		_classCallCheck(this, TestComponent);

		var _this4 = _possibleConstructorReturn(this, (TestComponent.__proto__ || Object.getPrototypeOf(TestComponent)).call(this, props));

		_this4.props = props;
		return _this4;
	}

	// componentWillReceiveProps(nextProps) {
	//    	this.setState({
	//      		modalIsOpen: true
	//    	});
	//  	}

	_createClass(TestComponent, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.park.name
			);
		}
	}]);

	return TestComponent;
}(_react2.default.Component);

var ModalComponent = function (_React$Component5) {
	_inherits(ModalComponent, _React$Component5);

	function ModalComponent(props) {
		_classCallCheck(this, ModalComponent);

		var _this5 = _possibleConstructorReturn(this, (ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).call(this, props));

		_this5.props = props;
		_this5.state = {
			modalIsOpen: true
		};

		_this5.openModal = _this5.openModal.bind(_this5);
		_this5.afterOpenModal = _this5.afterOpenModal.bind(_this5);
		_this5.closeModal = _this5.closeModal.bind(_this5);
		return _this5;
	}

	_createClass(ModalComponent, [{
		key: 'openModal',
		value: function openModal(code) {
			this.setState({ modalIsOpen: true });
		}
	}, {
		key: 'afterOpenModal',
		value: function afterOpenModal() {
			// references are now sync'd and can be accessed.
			//this.subtitle.style.color = '#f00';
		}
	}, {
		key: 'closeModal',
		value: function closeModal() {
			this.setState({ modalIsOpen: false });
			// unmountComponentAtNode(document.getElementById("modal-component"));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				modalIsOpen: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactModal2.default,
				{
					isOpen: this.state.modalIsOpen,
					onAfterOpen: this.afterOpenModal,
					onRequestClose: this.closeModal,
					style: customStyles,
					contentLabel: this.props.code },
				_react2.default.createElement(GalleryComponent, { gallery: this.props.gallery })
			);
		}
	}]);

	return ModalComponent;
}(_react2.default.Component);

// render(<MapComponent />, document.getElementById("map-container"));

// console.log("rendering test componenet...");
// console.log(mapInteraction.park);
// render(<TestComponent park={ mapInteraction.park } />, document.getElementById("gallery-container"));


var stateImageMap = {
	"USUT": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }],
	"USOR": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3675.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3686.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3841.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3893.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3925.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3936.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3963.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3985.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4005.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4014.jpg', width: 3936, height: 2216 }],
	"CRLA": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3841.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3893.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3925.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3936.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3963.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3985.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4005.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4014.jpg', width: 3936, height: 2216 }],
	"ZION": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }]
};

var photos;
var photos1 = [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }];

var photos2 = [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }];

var GalleryComponent = function (_React$Component6) {
	_inherits(GalleryComponent, _React$Component6);

	function GalleryComponent(props) {
		_classCallCheck(this, GalleryComponent);

		var _this6 = _possibleConstructorReturn(this, (GalleryComponent.__proto__ || Object.getPrototypeOf(GalleryComponent)).call(this, props));

		_this6.props = props;

		console.log("Trying to render lightbox.");
		console.log(_this6.props.gallery);

		_this6.state = { currentImage: 0, lightboxIsOpen: true };
		_this6.closeLightbox = _this6.closeLightbox.bind(_this6);
		_this6.openLightbox = _this6.openLightbox.bind(_this6);
		_this6.gotoNext = _this6.gotoNext.bind(_this6);
		_this6.gotoPrevious = _this6.gotoPrevious.bind(_this6);
		return _this6;
	}

	_createClass(GalleryComponent, [{
		key: 'openLightbox',
		value: function openLightbox(event, obj) {

			this.setState({
				currentImage: obj.index,
				lightboxIsOpen: true
			});
		}
	}, {
		key: 'closeLightbox',
		value: function closeLightbox() {
			this.setState({
				currentImage: 0,
				lightboxIsOpen: false
			});
		}
	}, {
		key: 'gotoPrevious',
		value: function gotoPrevious() {
			this.setState({
				currentImage: this.state.currentImage - 1
			});
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext() {
			this.setState({
				currentImage: this.state.currentImage + 1
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			console.log("Component will mount?");
			this.setState({
				lightboxIsOpen: false
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			console.log("Receiving new event?");
			console.log(nextProps);
			this.setState({
				lightboxIsOpen: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			console.log("Re render gallery? ");
			console.log(this.props.gallery);

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_reactPhotoGallery2.default, { photos: this.props.gallery, onClick: this.openLightbox }),
				_react2.default.createElement(_reactImages2.default, { images: this.props.gallery,
					onClose: this.closeLightbox,
					onClickPrev: this.gotoPrevious,
					onClickNext: this.gotoNext,
					currentImage: this.state.currentImage,
					isOpen: this.state.lightboxIsOpen
				})
			);
		}
	}]);

	return GalleryComponent;
}(_react2.default.Component);

var AboutPage = function (_React$Component7) {
	_inherits(AboutPage, _React$Component7);

	function AboutPage(props) {
		_classCallCheck(this, AboutPage);

		var _this7 = _possibleConstructorReturn(this, (AboutPage.__proto__ || Object.getPrototypeOf(AboutPage)).call(this, props));

		_this7.props = props;
		return _this7;
	}

	_createClass(AboutPage, [{
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'div',
				{ className: 'column-container' },
				_react2.default.createElement(
					'div',
					{ className: 'left-half' },
					_react2.default.createElement(
						'div',
						{ className: 'column-header' },
						'...the developer \xA0 \xA0 \xA0'
					),
					_react2.default.createElement(
						'div',
						{ className: 'column-content content-table' },
						_react2.default.createElement(
							'div',
							{ className: 'content-table-row' },
							_react2.default.createElement(
								'div',
								{ className: 'content-table-cell' },
								_react2.default.createElement(
									'div',
									{ className: 'logo-placeholder' },
									_react2.default.createElement('img', { src: 'images/ohio_state.png', className: 'logo' })
								),
								_react2.default.createElement(
									'div',
									{ className: 'logo-description-placeholder' },
									_react2.default.createElement(
										'div',
										{ className: 'logo-description' },
										'Ohio State University (Columbus, OH) ',
										_react2.default.createElement('br', null),
										'B.S. Computer Science &amp Engineering ',
										_react2.default.createElement('br', null),
										'May, 2015'
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'content-table-row' },
							_react2.default.createElement(
								'div',
								{ className: 'content-table-cell' },
								_react2.default.createElement(
									'div',
									{ className: 'logo-placeholder' },
									_react2.default.createElement('img', { src: 'images/morningstar.png', className: 'logo' })
								),
								_react2.default.createElement(
									'div',
									{ className: 'logo-description-placeholder' },
									_react2.default.createElement(
										'div',
										{ className: 'logo-description' },
										'Morningstar (Chicago, IL) ',
										_react2.default.createElement('br', null),
										'Associate Engineer ',
										_react2.default.createElement('br', null),
										'July 2015 to July 2017'
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'content-table-row' },
							_react2.default.createElement(
								'div',
								{ className: 'content-table-cell' },
								_react2.default.createElement(
									'div',
									{ className: 'logo-placeholder' },
									_react2.default.createElement('img', { src: 'images/cisco.png', className: 'logo' })
								),
								_react2.default.createElement(
									'div',
									{ className: 'logo-description-placeholder' },
									_react2.default.createElement(
										'div',
										{ className: 'logo-description' },
										'Cisco, Systems (San Jose, CA) ',
										_react2.default.createElement('br', null),
										'Intern - Software Engineering ',
										_react2.default.createElement('br', null),
										'June - August, 2012 - 2014'
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'right-half' },
					_react2.default.createElement(
						'div',
						{ className: 'column-header' },
						'...the person \xA0 \xA0 \xA0'
					),
					_react2.default.createElement(
						'div',
						{ className: 'column-content' },
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'div',
								{ className: 'bio-bordered-cell' },
								'My name is Mitchell. I\'m a twenty-something with a mellow predisposition and a tendency to err on the side of caution thanks to a life lived as a Cleveland sports fans. I graduated from college in 2015 and spent just over two years in the windy city, working and learning to navigate the treacherous seas of life. But as the seamen, who live for the ocean and its trials and obstacles, craves the land every so often, I, too, had to spend to spend some time off the waters, away from the ship that coasts and cruises into the future.  ',
								_react2.default.createElement('br', null),
								_react2.default.createElement('br', null),
								'So I left Chicago and took a 100-day journey across the United States (& a sliver of Canada). My Prius became my vessel; my Nemo Hornet 1-Person tent, my berth. Nearly every day, I slept in a place entirely different from where it was I awoke. Every day was different from the one previous. There\\\'s a common mantra, seen frequently on clickbait self-motivating Tumblr pages, that says \\"don\\\'t live too fast.\\" For one of the first times in my life, I listened and lived slowly and deliberately. All in all, I drove almost 23,000 miles and visited 40 American & Canadian national parks in 27 U.S. states & 2 Canadian provinces. Check out the map below to see the ground I\\\'ve covered, and to see what some of Nature\\\'s fine temples look like through my eyes (& my Sony A7 camera lens).',
								_react2.default.createElement('br', null),
								_react2.default.createElement('br', null)
							)
						)
					)
				)
			);
		}
	}]);

	return AboutPage;
}(_react2.default.Component);

var TravelPage = function (_React$Component8) {
	_inherits(TravelPage, _React$Component8);

	function TravelPage(props) {
		_classCallCheck(this, TravelPage);

		var _this8 = _possibleConstructorReturn(this, (TravelPage.__proto__ || Object.getPrototypeOf(TravelPage)).call(this, props));

		_this8.props = props;
		return _this8;
	}

	_createClass(TravelPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var mapObjects = (0, _mapWithParks2.default)("map-container", "832", "500");

			initializeAllParks(mapObjects.parkList);

			addMouseOverEventsToStates(mapObjects.states, mapObjects.parkMap);

			addMouseOverEventsToProvinces(mapObjects.provinces, mapObjects.parkMap);
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'block-header' },
					'Exploration'
				),
				_react2.default.createElement(
					'div',
					{ className: 'full-height full-width' },
					_react2.default.createElement(
						'div',
						{ id: 'travel-left-column' },
						_react2.default.createElement(
							'div',
							{ className: 'travel-pane float-right white-background' },
							_react2.default.createElement('div', { id: 'map-container' })
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'travel-right-column' },
						_react2.default.createElement(
							'div',
							{ className: 'travel-pane float-left white-background' },
							_react2.default.createElement('div', { id: 'gallery-container' })
						)
					)
				)
			);
		}
	}]);

	return TravelPage;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(AboutPage, null), document.getElementById("about-content"));