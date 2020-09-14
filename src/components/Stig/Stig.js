import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Stig.css';

class Stig extends Component {
    render(){
        return <div className="stig">
                <img id="stig-one" src='https://cdn.quotesgram.com/img/15/21/18291064-the-stig.gif' alt="404 Not FOUND"/>
            <section className='stig-display'>
                    <h1 className="first-title">SOME SAY....</h1>
                    <li>Some say he never blinks, and that he roams around the woods at night foraging for wolves.</li>
                    <li>Some say hes wanted by the CIA and that he sleeps upside down like bat.</li>
                    <li>Some say he is illegal in 17 US states, and that he blinks sideways.</li>
                    <li>Some say that he naturally faces magnetic north, and that ALL his legs are hydraulic.</li>
                    <li>Some say that he lives in a tree, and that his sweat can be used to clean precious metals.</li>
                    <li>Some say that his voice can only be heard by cats, and that he has two sets of knees.</li>
                    <li>Some say his skin has the texture of a dolphin’s, and that wherever you are in the world, if you turn your radio to 88.4 you can actually hear his thoughts. </li>
                    <h2 className="second-title">ALL WE KNOW IS.....HE'S CALLED THE STIG!!</h2>
                </section>
                <section className="video-box">
                    <h1>FUN STIG</h1>
                    <ReactPlayer className='videos' url="https://youtu.be/Xe5ldu2jB2E" />
                    <ReactPlayer className='videos' url="https://youtu.be/9HD5vDs0RBY" />
                    <ReactPlayer className='videos' url="https://youtu.be/Vyau3VUVVtI" />
                </section>
            </div>
}
}

export default Stig;

