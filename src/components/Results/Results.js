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
            <>
                {resultRender}
                <p className="results-p">The word is {this.props.answer}</p>
                <Button onClick={this.props.onNextWordClick}>
                    Next Word
                </Button>
            </>
        )
    }
}

export default Results;