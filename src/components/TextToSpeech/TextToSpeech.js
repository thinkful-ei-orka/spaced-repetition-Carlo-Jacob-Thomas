import React from 'react';


var msg = new SpeechSynthesisUtterance();
msg.text = "bien y tu como estas";
msg.lang = "es-mx";

export default class TextToSpeech extends React.Component {

    playSound = () => {
        window.speechSynthesis.speak(msg);
        console.log(msg);
    }
    componentDidMount() {
        
    }
    render () {
        return (
            <button onClick={this.playSound}>hello</button>
        )
    }
}