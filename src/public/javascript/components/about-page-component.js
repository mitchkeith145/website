import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { slideInLeft, slideOutLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import AboutElementComponent from './about-element-component';
import SwitchButton from 'lyef-switch-button';
import getContent from './about-content.js';

export default class AboutPageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.props = props;
        this.about = getContent();

        this.state = {
            left: {
                expanded: false,
                expansionDetails: {}
            },
            right: {
                expanded: false,
                expansionDetails: {}
            },
            mobile: {
                activePanel: 0,
                leftActive: true
            }
        }

        this.expandPanel = this.expandPanel.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
	}

    expandPanel(side, details) {
        if (side === 0) {
            this.setState({
                left: {
                    expanded: true,
                    expansionDetails: details
                }
            });  
        } else if (side === 1) {
            this.setState({
                right: {
                    expanded: true,
                    expansionDetails: details
                }
            });
        }
        
    }

    togglePanel() {
        this.setState({ mobile: { leftActive: !this.state.mobile.leftActive } });
    }

	render() {

        var leftColumnContent, rightColumnContent;
        if (this.state.left.expanded) {
            leftColumnContent = <span >{ this.state.left.expansionDetails.long }</span>
                                    
            
        } else {
            leftColumnContent = <div className="full-width full-height" >
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.ohio_state } expand={ this.expandPanel } side={ 0 } />
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.morningstar } expand={ this.expandPanel } side={ 0 } />
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.cisco } expand={ this.expandPanel } side={ 0 } />        
                                </div>
        }

        if (this.state.right.expanded) {
            rightColumnContent = <span>{ this.state.right.expansionDetails.long }</span>
        } else {
            rightColumnContent = <div className="full-width full-height" >
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.hiking } expand={ this.expandPanel } side={ 1 } />
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.climbing } expand={ this.expandPanel } side={ 1 } />
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.reading } expand={ this.expandPanel } side={ 1 } />
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.television }  expand={ this.expandPanel } side={ 1 } />
                                    <AboutElementComponent mobile={ this.props.mobile } details={ this.about.music }  expand={ this.expandPanel } side={ 1 } />
                                 </div>
        }

        var panelContent;

        if (this.props.mobile) {

            if (this.state.mobile.leftActive) {
                panelContent = <div className={ this.props.mobile ? "full-height full-width" : "left-half" }>
                                    
                                    <div className={ this.props.mobile ? "column-content mobile-font" : "column-content regular-font" }>
                                        { leftColumnContent}
                                    </div>
                                </div>
            } else {
                panelContent = <div className={ this.props.mobile ? "full-height full-width" : "left-half" }>
                                    
                                    <div className={ this.props.mobile ? "column-content mobile-font" : "column-content regular-font" }>
                                        { rightColumnContent}
                                    </div>
                                </div>
            }
        } else {
            panelContent = <div className="full-width full-height">
                                <div className={ this.props.mobile ? "full-height full-width" : "left-half" }>
                                    <div className="column-header">...the developer &nbsp; &nbsp; &nbsp;</div>
                                    <div className={ this.props.mobile ? "column-content mobile-font" : "column-content regular-font" }>
                                        { leftColumnContent}
                                    </div>
                                </div>
                                <div className={ this.props.mobile ? "full-height full-width" : "right-half" }>
                                    <div className="column-header">...the person &nbsp; &nbsp; &nbsp;</div>
                                    <div className={ this.props.mobile ? "column-content mobile-font" : "column-content regular-font" }>
                                        { rightColumnContent }
                                    </div>
                                </div>
                            </div>
        }

		return(
			<div className={ this.props.mobile ? "full-height full-width relative-position" : "column-container relative-position" }>
                <div className={ this.props.mobile ? "radio-select-panel-container" : "hide"}>
                    
                    <SwitchButton
                        id="switch-about-panel"
                        labelLeft="developer"
                        labelRight="person"
                        action={ this.togglePanel }
                    />
                </div>
                { panelContent }
            </div> 
		)
	}
}