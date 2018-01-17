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

var mapObjects = (0, _mapWithParks2.default)("map-container", "832", "522.23389");
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
			renderModal(data.photos);
		});

		// renderModal(code)
	});
}

function renderPhotoAlbum(photos) {
	var gallery = [];
	photos.forEach(function (photo) {
		gallery.push({
			src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});
	(0, _reactDom.render)(_react2.default.createElement(GalleryComponent, { gallery: gallery }), document.getElementById("modal-component"));
}

function renderModal(photos) {
	var gallery = [];
	photos.forEach(function (photo) {
		gallery.push({
			src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/all/' + photo.name,
			width: photo.width,
			height: photo.height
		});
	});

	(0, _reactDom.render)(_react2.default.createElement(ModalComponent, { gallery: gallery }), document.getElementById("modal-component"));
	// render(<GalleryComponent gallery={ gallery }  />, document.getElementById("modal-component"));
}

var ModalComponent = function (_React$Component) {
	_inherits(ModalComponent, _React$Component);

	function ModalComponent(props) {
		_classCallCheck(this, ModalComponent);

		var _this = _possibleConstructorReturn(this, (ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).call(this, props));

		_this.props = props;
		_this.state = {
			modalIsOpen: true
		};

		_this.openModal = _this.openModal.bind(_this);
		_this.afterOpenModal = _this.afterOpenModal.bind(_this);
		_this.closeModal = _this.closeModal.bind(_this);
		return _this;
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


var stateImageMap = {
	"USUT": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }],
	"USOR": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3675.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3686.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3841.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3893.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3925.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3936.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3963.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3985.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4005.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4014.jpg', width: 3936, height: 2216 }],
	"CRLA": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3841.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3893.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3925.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3936.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3963.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3985.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4005.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4014.jpg', width: 3936, height: 2216 }],
	"ZION": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }]
};

var photos;
var photos1 = [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }];

var photos2 = [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }];

var GalleryComponent = function (_React$Component2) {
	_inherits(GalleryComponent, _React$Component2);

	function GalleryComponent(props) {
		_classCallCheck(this, GalleryComponent);

		var _this2 = _possibleConstructorReturn(this, (GalleryComponent.__proto__ || Object.getPrototypeOf(GalleryComponent)).call(this, props));

		_this2.props = props;

		console.log("Trying to render lightbox.");
		console.log(_this2.props.gallery);

		_this2.state = { currentImage: 0, lightboxIsOpen: true };
		_this2.closeLightbox = _this2.closeLightbox.bind(_this2);
		_this2.openLightbox = _this2.openLightbox.bind(_this2);
		_this2.gotoNext = _this2.gotoNext.bind(_this2);
		_this2.gotoPrevious = _this2.gotoPrevious.bind(_this2);
		return _this2;
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