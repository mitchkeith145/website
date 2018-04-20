import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { slideInLeft, slideOutLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import AboutElementComponent from './about-element-component';
// import SwitchButton from 'react-switch-button';
import SwitchButton from 'lyef-switch-button';


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
                            <br></br>
                            I&#39;ve hiked and camped in tons of places across the states. I&#39;ve backpacked in the Appalachian mountains
                            in North Carolina and hiked all around the Yosemite Valley. Check out the travel page to see 
                            some of the places I&#39;ve crossed off my bucket list and see some of the pictures I&#39;ve taken along the way.
                        </span>
            },
            'climbing': {
                'src': 'images/climbing.png',
                'short': <span>rock climbing (bouldering)</span>,
                'long': <span>
                            My newest hobby is climbing (okay, bouldering to be specific). While I haven&#39;t been 
                            scaling those indoor walls too long, I have taken to it pretty hard. I&#39;ve learned 
                            that climbing is akin to solving a puzzle. You have to look at the route, read the 
                            hand & foot holds, and decipher the combination of moves that will get you to the top.
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
                            Currently reading: <a href="https://en.wikipedia.org/wiki/The_Illustrated_Man" target="_blank" tabindex="-1">The Illustrated Man by Ray Bradbury</a>
                            <br></br><br></br>
                            Just finished: <a href="https://en.wikipedia.org/wiki/Dune_(novel)" target="_blank" tabindex="-1">Dune by Frank Herbert</a>
                            <br></br><br></br>
                            Past favorites:<br></br>
                            <a href="https://en.wikipedia.org/wiki/Hyperion_(Simmons_novel)" target="_blank" tabindex="-1">Hyperion by Dan Simmons</a><br></br>
                            <a href="https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy_(novel)" target="_blank" tabindex="-1">The Hitchhiker&#39;s Guide to the Galaxy by Douglas Adams</a><br></br>
                            <a href="https://en.wikipedia.org/wiki/Neverwhere_(novel)" target="_blank" tabindex="-1">Neverwhere by Neil Gaiman</a><br></br>
                            <a href="https://en.wikipedia.org/wiki/The_Art_of_Fielding" target="_blank" tabindex="-1">The Art of Fielding by Chad Harbach</a>
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
                            <br></br><br></br>
                            Currently binging: <a href="https://en.wikipedia.org/wiki/The_Path_(TV_series)" target="_blank" tabindex="-1">The Path</a>
                        </span>
            },
            'music': {
                'src': 'images/record.png',
                'short': <span>music</span>,
                'long': <span>
                            No matter where I go, I&#39;ll be traveling with my headphones on and the music up loud.
                            Thanks to all my time on those Chi-town trains, I shelled out for a pair of Bose noise-canceling
                            headphones - totally worth it. I play a little bit of guitar, though I don&#39;t think that I have yet made the 
                            jump from someone who "plays guitar" to someone you might call a "guitarist."
                            <br></br><br></br>
                            Since 2011, I&#39;ve kept track of most of the music that I listened to. In total, I&#39;ve "scrobbled"
                            over 62,000 songs from more than 2,500 artists on LastFM. To get a sense for my musical tastes, check out 
                            my <a href="https://www.last.fm/user/mitchkeith145" target="_blank" tabindex="-1">last.fm</a> or
                            my <a href="https://open.spotify.com/user/123411257" target="_blank" tabindex="-1">spotify</a>
                        </span>
            },
            'ohio_state': {
                'src': 'images/ohio_state.png',
                'short': <span>
                            Ohio State University (Columbus, OH)<br></br>
                            B.S. Computer Science & Engineering <br></br>
                            May, 2015
                        </span>,
                'long': <span>
                            I learned a lot in my five glorious years at Ohio State. I learned about life outside of my hometown
                            in Suburban Cleveland. I learned the importance of routine and habit. I made friends, whom I hope to hang
                            on to, and joined a fraternity (Delta Tau Delta). I watched our Buckeye basketball team blow a double-digit half time lead in the final four, and 
                            I rejoiced when our beloved football team won the first ever College Football playoffs. I survived a grueling schedule of 
                            software engineering courses. College was a busy time, complete with development of all kinds. 
                        </span>
            },
            'morningstar': {
                'src': 'images/morningstar.png',
                'short': <span>
                            Morningstar (Chicago, IL) <br></br>
                            Associate Engineer <br></br>
                            July 2015 to July 2017
                        </span>,
                'long': <div>
                            I joined Morningstar a few months after graduating college, and went into their Technological Development Program. 
                            This rotational program allowed me to spend time on several different teams, working on a variety of software 
                            projects with a breadth of different technologies. 
                            <ul>
                                <li>Back End development in Java using Spring, Play frameworks</li>
                                <li>Back End development in Javascript using NodeJS + Express</li>
                                <li>Front End development using AngularJS, EmberJS frameworks</li>
                                <li>Created a customized data ETL (extract-transform-load) framework in Java on top of Spring and Kafka.</li>
                                <li>Exposure to AWS (EC2, S3, CloudFront, DynamoDB)</li>
                                <li>Automated unit testing experience</li>
                            </ul>
                        </div>
            },
            'cisco': {
                'src': 'images/cisco.png',
                'short': <span>
                            Cisco, Systems (San Jose, CA)<br></br>
                            Intern - Software Engineering<br></br>
                            June - August, 2012 - 2014
                        </span>,
                'long': <span>
                            I was lucky enough to score a big internship the summer after my second year at Ohio State. I was given the chance to 
                            live in sunny San Jose, California and work for Cisco. I had such a great experience, I interned two more times. In my three 
                            summers there, I worked on an automated testing suite (Python) and an Android application with network health status visuals.
                        </span>
            },
            'personal': {
                'src': '',
                'short':    <span>
                                Personal Projects <br></br>
                                These are projects I have worked on, in my own time, usually in an attempt to
                                learn something or create something new.
                            </span>,
                'long':     <span>
                                This will be a longer description of my personal projects.
                            </span>
            }
        }

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
        // this.state.mobile.activePanel === 0 ? this.setState({ mobile: { activePanel: 1 } }) : this.setState({ mobile: { activePanel: 0 } });
        console.log("Toggling...");
        this.setState({ mobile: { leftActive: !this.state.mobile.leftActive } });
    }

	render() {
        console.log("Does it rerender?");

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
            // if (this.state.mobile.activePanel === 0) {
            //     panelContent = <div className={ this.props.mobile ? "full-height full-width" : "left-half" }>
            //                         <div className="column-header">...the developer &nbsp; &nbsp; &nbsp;</div>
            //                         <div className={ this.props.mobile ? "column-content mobile-font" : "column-content regular-font" }>
            //                             { leftColumnContent}
            //                         </div>
            //                     </div>
            // } else {
            //     panelContent = <div className={ this.props.mobile ? "full-height full-width" : "left-half" }>
            //                         <div className="column-header">...the developer &nbsp; &nbsp; &nbsp;</div>
            //                         <div className={ this.props.mobile ? "column-content mobile-font" : "column-content regular-font" }>
            //                             { rightColumnContent}
            //                         </div>
            //                     </div>
            // }

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
        //<SwitchButton name="switch-1t" theme="rsbc-switch-button-flat-square" checked={ this.state.mobile.leftActive } />
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