import React from 'react';
import { ReactDOM, render } from 'react-dom';
import ImageGallery from 'react-image-gallery';

export default class GalleryWrapperComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		var gallery = this.props.park.photos.length ? 
							(<ImageGallery items={ this.props.park.photos } />) : 
							(<span>I have not visited { this.props.park.name } yet, but plan to.</span>);

		return(
			<div id="gallery-component-wrapper">
				<div id="gallery-header">
					{this.props.park.name} ({this.props.park.code})
				</div>
				<div id="gallery-wrapper">
					{gallery}
				</div>
			</div>
		)
	}
}
