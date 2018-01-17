import React from 'react';
import { ReactDOM, render } from 'react-dom';

import MapSvg from './map-component';

class Map extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		console.log(MapSvg);


		return(
			<MapSvg width="832" height="522.23389" />
		)
	}
}


render(<Map />, document.getElementById('map-container'));

