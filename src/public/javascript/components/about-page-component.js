import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { slideInLeft, slideOutLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import AboutElementComponent from './about-element-component';

export default class AboutPageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
        this.about = {
            'hiking': {
                'src': 'images/trekking.png',
                'short': <span>hiking & backpacking</span>,
                'long': <span>
                            Hiking brings out the best in you. The further away your car you tread, and the longer 
                            you linger, the more you can learn. The trail can be demanding. Getting to the end, 
                            or to the top, will often be so endlessly long and gruesome that you may ask yourself 
                            whether you will make it. But, you will make it, and when you do, it is always worth it.
                        </span>
            },
            'climbing': {
                'src': 'images/climbing.png',
                'short': <span>rock climbing (bouldering)</span>,
                'long': <span>
                            My newest hobby is climbing (okay, bouldering to be specific). While I haven&#39;t been 
                            scaling those indoor walls too long, I have taken to it pretty hard. I&#39;ve learned 
                            that climbing is akin to solving a puzzle. You have to look at the route, read the 
                            hand &amp foot holds, and decipher the combination of moves that will get you to the top.
                        </span>
            },
            'reading': {
                'src': 'images/books.png',
                'short': 'books',
                'long': <span>
                            When I lived in Chicago, I fell in love with reading. Riding to and from work on the L 
                            gave me an hour of time with which I could use for consuming meaningless content on my phone
                            or for entering the fictional lives of characters in stories. I opted for reading, 
                            and ended up reading some 30 or 40 novels in the two years I spent commuting into the city.
                            <br></br><br></br>
                            Currently reading: The Illustrated Man by Ray Bradbury
                            <br></br><br></br>
                            Just finished: Dune by Frank Herbert
                            <br></br><br></br>
                            Past favorites:<br></br>
                            Hyperion by Dan Simmons<br></br>
                            The Hitchhiker&#39;s Guide to the Galaxy by Douglas Adams<br></br>
                            Neverwhere by Neil Gaiman<br></br>
                            The Art of Fielding by Chad Harbach
                        </span>
            },
            'television': {
                'src': 'images/tv.png',
                'short': <span>television shows</span>,
                'long': <span>
                            My love for fictional universes and places and stories does not end on the final page of a book. 
                            It extends onto the television screen. Ever since my dad and I started watching Lost back in 2007, 
                            and we had our first ever binge session, I&#39;ve been a fiend for good television. 
                            Luckily, I&#39;m far from the only one, and there is so much good TV these days. 
                            From Game of Thrones to Seinfeld, I&#39;m a TV show guy through and through.
                        </span>
            },
            'ohio_state': {
                'src': 'images/ohio_state.png',
                'short': <span>
                            Ohio State University (Columbus, OH)<br></br>
                            B.S. Computer Science & Engineering <br></br>
                            May, 2015
                        </span>,
                'long': <span>This will be a longer description of my time at Ohio State.</span>
            },
            'morningstar': {
                'src': 'images/morningstar.png',
                'short': <span>
                            Morningstar (Chicago, IL) <br></br>
                            Associate Engineer <br></br>
                            July 2015 to July 2017
                        </span>,
                'long': <span>This will be a longer description of my time at Morningstar.</span>
            },
            'cisco': {
                'src': 'images/cisco.png',
                'short': <span>
                            Cisco, Systems (San Jose, CA)<br></br>
                            Intern - Software Engineering<br></br>
                            June - August, 2012 - 2014
                        </span>,
                'long': <span>This will be a longer description of my time at Cisco.</span>
            }
        }
        this.expandPanel = this.expandPanel.bind(this);
        this.state = {
            left: {
                expanded: false,
                expansionDetails: {}
            },
            right: {
                expanded: false,
                expansionDetails: {}
            }
        }

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

	render() {
        console.log("Does it rerender?");

        var leftColumnContent, rightColumnContent;
        if (this.state.left.expanded) {
            leftColumnContent = <span >{ this.state.left.expansionDetails.long }</span>
                                    
            
        } else {
            leftColumnContent = <div className="full-width full-height" >
                                    <AboutElementComponent details={ this.about.ohio_state } expand={ this.expandPanel } side={ 0 } />
                                    <AboutElementComponent details={ this.about.morningstar } expand={ this.expandPanel } side={ 0 } />
                                    <AboutElementComponent details={ this.about.cisco } expand={ this.expandPanel } side={ 0 } />        
                                </div>
        }

        if (this.state.right.expanded) {
            rightColumnContent = <span>{ this.state.right.expansionDetails.long }</span>
        } else {
            rightColumnContent = <div className="full-width full-height" >
                                    <AboutElementComponent details={ this.about.hiking } expand={ this.expandPanel } side={ 1 } />
                                    <AboutElementComponent details={ this.about.climbing } expand={ this.expandPanel } side={ 1 } />
                                    <AboutElementComponent details={ this.about.reading } expand={ this.expandPanel } side={ 1 } />
                                    <AboutElementComponent details={ this.about.television }  expand={ this.expandPanel } side={ 1 } />
                                 </div>
        }

		return(
			<div className="column-container">
                <div className="left-half">
                    <div className="column-header">...the developer &nbsp; &nbsp; &nbsp;</div>
                    <div className="column-content content-table">
                        { leftColumnContent}
                    </div>
                </div>
                <div className="right-half">
                    <div className="column-header">...the person &nbsp; &nbsp; &nbsp;</div>
                    <div className="column-content content-table">
                        { rightColumnContent }
                    </div>
                    
                </div>
            </div> 
		)
	}
}