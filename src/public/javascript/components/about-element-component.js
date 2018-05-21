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

		this.setState({
			expanded: !this.state.expanded,
			width: !this.state.expanded ? "75px" : "300px"
		});
	}

	hoverContent(val) {
		this.setState({
			contentHovered: val
		});
	}

	hoverExpand(val) {
		this.setState({
			expandHovered: val
		});
	}

	render() {
		var cellClassName;



		return(
			<div className="content-table-row" onMouseEnter={ () => this.hoverContent(true) } onMouseLeave={ () => this.hoverContent(false) }>
                <div className={[(this.state.contentHovered || this.state.expanded) && "about-content-hover", this.props.mobile && "content-table-cell-mobile", !this.props.mobile && "content-table-cell", !this.state.expanded && "about-content-default"].join(" ") }>
                	<div className={['content-transition', this.state.expanded && 'content-expanded'].join(' ')}>
                		<div className="content-stable-height">
	            			<div className="logo-placeholder">
		                        <img src={this.props.details.src} className="logo"></img>
		                    </div>
		                    <div className={ this.props.mobile ? "expand-button-container-mobile" : "expand-button-container" } onClick={ this.expand }  onMouseEnter={ () => this.hoverExpand(true) } onMouseLeave={ () => this.hoverExpand(false) }>
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
	                    <div className={ this.state.expanded ? "expanded-content-container" : "expanded-content-container" }>
	                    	{ this.props.details.long }
	                    </div>
                	</div>
                	
                </div>
            </div>
		)
	}

}

