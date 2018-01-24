import React from 'react';
import { ReactDOM, render } from 'react-dom';
import NavigationElementComponent from './navigation-element-component';

export default class NavigationComponent extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return(
			<div className="dropdown">
				<div className="dropbtn">
					<div className="toc-bar"></div>
					<div className="toc-bar"></div>
					<div className="toc-bar"></div>
				</div>
				<div className="dropdown-content">
					<NavigationElementComponent displayText={ "about" } pageNumber={ 0 }/>
					<NavigationElementComponent displayText={ "travel & photography" } pageNumber={ 1 }/>
				</div>
            </div>
		)
	}

}