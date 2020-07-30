import React from 'react';
import Button from '../Button/Button';
import { Input, Label, Required } from '../Form/Form';

class Question extends React.Component {
    render() {
        return (
            <>
                <Label htmlFor='learning-input' className="text-center">
                    What's the translation for this word?<Required />
                </Label>
                <Input
                    id='learning-input'
                    name='answer'
                    className="center"
                    required
                    ref={this.guessTerm}
                />
                <Button onClick={this.props.handleSendGuess}>
                    Submit your answer
                </Button>
            </>
        )
    }
}

export default Question;