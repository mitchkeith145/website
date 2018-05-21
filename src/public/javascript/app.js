import React from 'react';
import { ReactDOM, render, unmountComponentAtNode } from 'react-dom';
import NavigationComponent from './navigation-component';
import AboutPageComponent from './about-page-component';
import { UserAgent } from 'react-useragent';

var mobileFlag;

function clearUserAgent() {
	render(<span></span>, document.getElementById("user-agent-container"));
}

function setMobileFlag(flag) {
	console.log("set mobile flag invocation w/" + flag);
	mobileFlag = flag;
}

function initializeComponents() {
	render(<UserAgentInitializer callback={ setMobileFlag }/>, document.getElementById("user-agent-container"));
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












		