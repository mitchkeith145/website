import React from 'react';
import { ReactDOM, render } from 'react-dom';

export default class AboutElementComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.expand = this.expand.bind(this);
		this.state = {
			contentHovered: false,
			expandHovered: false,
			expanded: false
		}
	}
	
	expand() {
		console.log("Attempting expansion.");
		if (typeof this.props.expand === 'function') {
			// prevent bubbling back to parent; not liking where that's going.
			// this.props.expand(this.props.side, this.props.details);
		}

		this.setState({
			expanded: !this.state.expanded,
			width: !this.state.expanded ? "75px" : "300px"
		});
	}

	hoverContent(val) {
		console.log(val ? "mouseEnter" : "mouseLeave");
		// this.state.expanded = val;
		this.setState({
			contentHovered: val
		});
	}

	hoverExpand(val) {
		this.setState({
			expandHovered: val
		});
	}
//<div className="expand-button-horizontal-part black-background"></div>
//<div className="expand-button-vertical-part black-background"></div>

	render() {
		return(
			<div className="content-table-row" onMouseEnter={ () => this.hoverContent(true) } onMouseLeave={ () => this.hoverContent(false) }>
                <div className={ this.state.contentHovered ? "about-content-hover content-table-cell" : (this.state.expanded ? "about-content-hover content-table-cell" : "content-table-cell about-content-default") }>
                	<div className={['content-transition', this.state.expanded && 'content-expanded'].join(' ')}>
                		<div className="content-stable-height">
	            			<div className="logo-placeholder">
		                        <img src={this.props.details.src} className="logo"></img>
		                    </div>
		                    <div className="expand-button-container" onClick={ this.expand }  onMouseEnter={ () => this.hoverExpand(true) } onMouseLeave={ () => this.hoverExpand(false) }>
		                        <div className={ this.state.expandHovered ? "expand-button-placeholder main-background" : "expand-button-placeholder" }>
		                        	<img src={ this.state.expanded ? "images/collapse.png" : "images/expand.png" } className={ this.state.expanded ? "collapse-image" : "full-width full-height" }></img>
		                        </div>
		                    </div>
		                    <div className="logo-description-placeholder">
		                        <div className="logo-description">
		                            <span> { this.props.details.short } </span>
		                        </div>
		                    </div>
	                    </div>
	                    <div className={ this.state.expanded ? "expanded-content-container" : "hide" }>
	                    	{ this.props.details.long }
	                    </div>
                	</div>
                	
                </div>
            </div>
		)
	}

}

