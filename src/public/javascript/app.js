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
import { UserAgent } from 'react-useragent';

var mobileFlag;

function clearUserAgent() {
	console.log("clearing user agent...");
	render(<span></span>, document.getElementById("user-agent-container"));
}

function setMobileFlag(flag) {
	console.log("set mobile flag invocation w/" + flag);
	mobileFlag = flag;
	// clearUserAgent();
}

function initializeComponents() {
	render(<UserAgentInitializer callback={ setMobileFlag }/>, document.getElementById("user-agent-container"));
	// console.log("now it's time to init the rest w/" + mobileFlag);
	// render(<NavigationComponent mobile={ mobileFlag }/>, document.getElementById("toc"));
	// render(<AboutPageComponent mobile={ mobileFlag }/>, document.getElementById("content-placeholder"));
	render(<AppComponent mobile={ mobileFlag } />, document.getElementById("app-container"));
}

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<div className="full-width full-height">
				<div className="main-header">
		            <div id="toc">
		            	<NavigationComponent mobile={ mobileFlag }/>
		            </div>
		            <div className="name-placeholder">
		                <div>Mitchell<br></br>Keith</div>
		            </div>
		        </div>
				<div className={ this.props.mobile ? "main-scrollable-pane main-background" : "main-scrollable-pane main-background non-mobile" }>
		            <div className="full-width full-height">

		                <div id="content-placeholder" className="content-block full-width full-height main-background">                 
		                	<AboutPageComponent mobile={ this.props.mobile }/>
		                </div>

		            </div>
		        </div> 
	        </div>
        )
	}
}

class UserAgentInitializer extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	flagDeviceType(val) {
		if (typeof this.props.callback === "function") {
			console.log("user agent inner callback invocation.");
			this.props.callback(val === null ? false : true);
		}
	}

	  render() {
	  	return (
	  		<div className="hide">
				<UserAgent render={({ ua }) => {
					this.flagDeviceType(ua.mobile);
					return ua.mobile ? "MOBILE" : "NOT MOBILE";
				}} />
		    </div>
		)
	  }
}





initializeComponents();












		