import React from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
// recognition.lang = 'es-MX';

class Speech extends React.Component {
    constructor() {
        super()
        this.state = {
            listening: false
        }
    }

    handleListen = () => {
        recognition.start();
        
        recognition.onstart = () => {
            console.log('Voice activated');
        }

        recognition.onresult = (e) => {
            let current = e.resultIndex;

            let transcript = e.results[current][0].transcript;

            console.log(transcript);
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleListen}>Click me to talk!</button>
            </div>
        )
    }
}

export default Speech;

