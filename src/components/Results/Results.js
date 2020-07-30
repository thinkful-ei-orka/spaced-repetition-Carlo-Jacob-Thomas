import React from 'react';
import Button from '../Button/Button';

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
                <p className="results-p">The correct translation for {this.props.original} was {this.props.answer} and you chose {this.props.guess}!</p>
                <Button onClick={this.props.onNextWordClick}>
                Try another word!
                </Button>
            </div>
        )
    }
}

export default Results;