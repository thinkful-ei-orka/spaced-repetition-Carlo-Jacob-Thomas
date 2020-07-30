import React from 'react';
import Button from '../Button/Button';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

<<<<<<< HEAD
        
        let resultRender = <p className="results-p">Correct!</p>;
=======
        let resultRender = <p className="results-p">Your total score is: {this.props.totalScore}</p>;
>>>>>>> 46991f449149f0980e3c0530829aa79647d91581
        if(!this.props.isCorrect) {
            resultRender = <p className="results-p">Incorrect :(</p>;
        } 
        

        return (
            <>
                <p>Your total score is: {this.props.totalScore}</p>
                {resultRender}
<<<<<<< HEAD
                <p className="results-p">The word is {this.props.answer}</p>
                <button onClick={this.props.onNextWordClick}>
=======
                <p className="results-p">The word is </p><span>{this.props.answer}</span>
                {/* <p>Your total score is: {this.props.totalScore}</p> */}
                <Button onClick={this.props.onNextWordClick}>
>>>>>>> 46991f449149f0980e3c0530829aa79647d91581
                    Next Word
                </button>
            </>
        )
    }
}

export default Results;