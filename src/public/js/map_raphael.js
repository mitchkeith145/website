'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.paths = undefined;

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var paths = (0, _mapWithParks2.default)("map-container", "832", "522.23389");

console.log("Paths initialized, count = " + paths.length);

var albumBoolean = true;

addMouseOverEvents(paths);

function renderModal(code) {
	console.log("Let's try to render modal for : " + code);

	//render(<ModalComponent code={code} album={albumBoolean} />, document.getElementById("modal-component"));
	(0, _reactDom.render)(_react2.default.createElement(GalleryComponent, { code: code, album: albumBoolean }), document.getElementById("modal-component"));
	//GalleryComponent
	albumBoolean = !albumBoolean;
}

function addMouseOverEvents(states) {
	states.forEach(function (state) {
		addMouseOverEventToState(state);
	});
}

function addMouseOverEventToState(state) {

	state.mouseover(function (e) {

		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		// const element = <h1>{ stateName }</h1>;
		// ReactDOM.render(
		//   element,
		//   document.getElementById('react-test')
		// );
		// renderModal(code);

		this.node.style.opacity = 0.7;
	});

	state.mouseout(function (e) {
		this.node.style.opacity = 1;
	});

	state.click(function (e) {
		var code = this.data('id').indexOf('path') > -1 ? this.data('code') : this.data('id');
		renderModal(code);
	});
}

var ModalComponent = function (_React$Component) {
	_inherits(ModalComponent, _React$Component);

	function ModalComponent(props) {
		_classCallCheck(this, ModalComponent);

		var _this = _possibleConstructorReturn(this, (ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).call(this, props));

		_this.props = props;
		console.log("Got props");
		console.log(props);
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
			(0, _reactDom.unmountComponentAtNode)(document.getElementById("modal-component"));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
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

	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(GalleryComponent, { code: this.props.code, album: this.props.album });
		}
	}]);

	return ModalComponent;
}(_react2.default.Component);

// render(<MapComponent />, document.getElementById("map-container"));


var stateImageMap = {
	"USUT": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6491.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6487.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6472.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6470.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6464.jpg', width: 2216, height: 3936 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC6396.jpg', width: 3936, height: 2216 }],
	"USOR": [{ src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3675.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3686.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3841.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3893.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3925.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3936.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3963.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC3985.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4005.jpg', width: 3936, height: 2216 }, { src: 'https://s3-us-west-2.amazonaws.com/loaf-personal/images/_DSC4014.jpg', width: 3936, height: 2216 }]
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

		console.log("Gallery has props>");
		console.log(props);
		if (typeof _this2.props != "undefined" && _this2.props.album) {
			photos = photos1;
		} else if (typeof _this2.props != "undefined" && !_this2.props.album) {
			photos = photos2;
		}

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
			console.log("Open lightbox?");
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
				lightboxIsOpen: true
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			console.log("Receiving new event?");
			console.log(nextProps);
			this.setState({
				lightboxIsOpen: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			console.log("Re render gallery? " + this.props.code);
			//<Gallery photos={stateImageMap[this.props.code]} onClick={this.openLightbox} />

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_reactImages2.default, { images: stateImageMap[this.props.code],
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

// render(<GalleryComponent code="LOAF" />, document.getElementById('react-test'));

exports.paths = paths;