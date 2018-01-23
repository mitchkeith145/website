import React from 'react';
import { ReactDOM, render } from 'react-dom';
import GalleryWrapperComponent from './gallery-wrapper-component';
import initializeMap from './map-with-parks';
import { initializeAllParks, addMouseOverEventsToStates, addMouseOverEventsToProvinces } from './travel-page-util';


export default class TravelPageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;

		this.previousState = {
			"object": null,
			"parks": []
		}
	}

	componentDidMount() {
		var mapObjects = initializeMap("map-container", "832", "500");
		this.mapObjects = mapObjects;
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