import React from 'react';
import { ReactDOM, render } from 'react-dom';

export default class AboutPageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}


	render() {

		return(
			<div className="column-container">
                <div className="left-half">
                    <div className="column-header">...the developer &nbsp; &nbsp; &nbsp;</div>
                    <div className="column-content content-table">
                        <div className="content-table-row">
                            <div className="content-table-cell">
                                <div className="logo-placeholder">
                                    <img src="images/ohio_state.png" className="logo"></img>
                                </div>
                                <div className="logo-description-placeholder">
                                    <div className="logo-description">
                                        Ohio State University (Columbus, OH) <br></br>
                                        B.S. Computer Science &amp Engineering <br></br>
                                        May, 2015
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-table-row">
                            <div className="content-table-cell">
                                <div className="logo-placeholder">
                                    <img src="images/morningstar.png" className="logo"></img>
                                </div>
                                <div className="logo-description-placeholder">
                                    <div className="logo-description">
                                        Morningstar (Chicago, IL) <br></br>
                                        Associate Engineer <br></br>
                                        July 2015 to July 2017
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-table-row">
                            <div className="content-table-cell">
                                <div className="logo-placeholder">
                                    <img src="images/cisco.png" className="logo"></img>
                                </div>
                                <div className="logo-description-placeholder">
                                    <div className="logo-description">
                                        Cisco, Systems (San Jose, CA) <br></br>
                                        Intern - Software Engineering <br></br>
                                        June - August, 2012 - 2014
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-half">
                    <div className="column-header">...the person &nbsp; &nbsp; &nbsp;</div>
                    <div className="column-content">

                        <div>
                            <div className="bio-bordered-cell">

                                My name is Mitchell. I'm a twenty-something with a mellow predisposition and a tendency to err on the side of 
                                caution thanks to a life lived as a Cleveland sports fans. I graduated from college in 2015 and spent just over 
                                two years in the windy city, working and learning to navigate the treacherous seas of life. But as the seamen, 
                                who live for the ocean and its trials and obstacles, craves the land every so often, I, too, had to spend to spend 
                                some time off the waters, away from the ship that coasts and cruises into the future.  <br></br><br></br>

                                So I left Chicago and took a 100-day journey across the United States (& a sliver of Canada). 
                                My Prius became my vessel; my Nemo Hornet 1-Person tent, my berth. Nearly every day, I slept in a place 
                                entirely different from where it was I awoke. Every day was different from the one previous. 
                                There's a common mantra, seen frequently on clickbait self-motivating Tumblr pages, that says "don't live too fast." 
                                For one of the first times in my life, I listened and lived slowly and deliberately. 
                                All in all, I drove almost 23,000 miles and visited 40 American & Canadian national parks 
                                in 27 U.S. states & 2 Canadian provinces. Check out the map below to see the ground I've covered, 
                                and to see what some of Nature's fine temples look like through my eyes (& my Sony A7 camera lens).

                                <br></br><br></br>

                                
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
		)
	}
}