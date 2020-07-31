import React from 'react';
import Button from '../Button/Button';
import './Results.css'

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        
        let resultRender = <p className="results-p">Correct!</p>;
        if(!this.props.isCorrect) {
            resultRender = <p className="results-p">Incorrect :(</p>;
        } 
        

        return (
            <div className="DisplayFeedback">
                <p className="results-p">The correct translation for <span className='word-strong'>{this.props.original}</span> was <span className='word-strong'>{this.props.answer}</span> and you chose <span className='word-strong'>{this.props.guess}</span>!</p>
                <Button className='nextword-button' onClick={this.props.onNextWordClick}>
                Try another word!
                </Button>
            </div>
        )
    }
}

export default Results;