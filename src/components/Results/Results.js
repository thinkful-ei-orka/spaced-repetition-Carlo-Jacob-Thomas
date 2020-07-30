import React from 'react';
import Button from '../Button/Button';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let resultRender = <p className="results-p">Your total score is: {this.props.totalScore}</p>;
        if(!this.props.isCorrect) {
            resultRender = <p className="results-p">Incorrect :(</p>;
        } 
        

        return (
            <>
                {resultRender}
                <p className="results-p">The word is </p><span>{this.props.answer}</span>
                {/* <p>Your total score is: {this.props.totalScore}</p> */}
                <Button onClick={this.props.onNextWordClick}>
                    Next Word
                </Button>
            </>
        )
    }
}

export default Results;