/*

TODO:

1. make all components of multi-path states (ie CA, MI, VA) react when any of the paths are moused over / out.
2. color code national parks visited vs not visisted
3. add state parks, misc recreation areas (DONE)
	i. color code those differently 
4. Change about right pane to follow similar design as left pane. Have logos for types of activities with text description
	ex) 




*/

import React from 'react';
import { ReactDOM, render, unmountComponentAtNode } from 'react-dom';
import NavigationComponent from './navigation-component';
import AboutPageComponent from './about-page-component';

function initializeComponents() {
	render(<NavigationComponent />, document.getElementById("toc"));
	render(<AboutPageComponent />, document.getElementById("about-content"));
}

initializeComponents();












		