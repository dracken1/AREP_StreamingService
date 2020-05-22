import React, { Component } from 'react'
import Hls from 'hls.js'
import './player.css'

export default class Player extends Component {

    constructor(props){
        super(props);

        this.pausePlayHandler = this.pausePlayHandler.bind(this);
    }

    //urlprueba -> https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8

    state = {
        url: 'https://arep-usea.streaming.media.azure.net//eae898ab-85d1-45dc-b477-8c180e16ea93/fdf9abab-672a-4577-aa08-9bdd4d6b8c3a.ism/manifest(format=m3u8-aapl)',
        isPaused: true,
    }    

    componentDidMount() {
        const video = this.player;
        const videoSrc = this.state.url;
        if (Hls.isSupported() && this.player) {
            console.log("Receiving data...")
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });            
        }
    }

    startStreaming() {
        const video = this.player;
        const videoSrc = this.state.url;
        if (Hls.isSupported() && this.player) {
            console.log("Receiving data...")
            console.log("url: " + this.state.url);
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        }
    }

    pausePlayHandler(){
        if(this.player.paused){
            this.player.play();
            this.setState({
                isPaused: false,
            })
        } else {
            this.player.pause();
            this.setState({
                isPaused: true,
            })
        }
    }

    handleInput = (e) =>{
        this.setState({
            url: e.target.value,
        })
        console.log("Input: " + this.state.url);        
    }

    render() {
        return (
            <div className="playercontainer">
                <div className="player">
                    {/* {this.state.url != '' && this.startStreaming()} */}                    
                    <video className="video" onClick={this.pausePlayHandler} autoPlay={true} ref={(player) => this.player = player}></video>
                </div>
                {this.state.isPaused && <div className='image'></div>}<br></br>
                <div className='label'>CLICK THE PLAYER TO PLAY/PAUSE THE STREAM</div>
                {/* <input type="text" placeholder="URL" className="urlinput" onChange={(e) => this.handleInput(e)}></input> */}
            </div>
        )
    }
}
