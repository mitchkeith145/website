import React from 'react';
import { ReactDOM, render } from 'react-dom';
import AboutPageComponent from './about-page-component';
import TravelPageComponent from './travel-page-component';

export default class NavigationElementComponent extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;

		this.navigate = this.navigate.bind(this);
		console.log("Constructing...");
		console.log(this.props);
	}

	navigate() {

		if (this.props.pageNumber === 0) {
			this.renderAboutPage();
		} else if (this.props.pageNumber === 1) {
			this.renderMapPage();
		}
	}

	renderAboutPage() {
		render(<AboutPageComponent />, document.getElementById("about-content"));
	}

	renderMapPage() {
		render(<TravelPageComponent />, document.getElementById("about-content"));
	}

	render() {
		return (
			<a href="#" onClick={ this.navigate }>
				{ this.props.displayText }
			</a>
		)
	}

}