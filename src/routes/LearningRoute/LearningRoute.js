import React, { Component } from 'react';
import LanguageApiService from '../../services/language-service';
import './LearningRoute.css';
import { Input, Required, Label } from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Results from '../../components/Results/Results';
import Question from '../../components/Question/Question';

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      head: null,
      nextWord: null,
      totalScore: null,
      wordIncorrect: null,
      wordCorrect: null,
      answer: null,
      isCorrect: null,
      guessBool: false,
      loading: true
    };

    this.guessTerm = React.createRef();
  }


  handleSendGuess = (e) => {
    e.preventDefault();
    const guess = this.guessTerm.current.value;
    console.log(guess);

    const guessBody = {
      guess
    }

    LanguageApiService.postGuess(guessBody)
      .then(summary => {
        console.log(summary.wordCorrectCount);
        this.setState({
          nextWord: summary.nextWord,
          totalScore: summary.totalScore,
          wordIncorrect: summary.wordIncorrectCount,
          wordCorrect: summary.wordCorrectCount,
          answer: summary.answer,
          isCorrect: summary.isCorrect,
          guessBool: true
        })
      })

  }

  handleNextWord = () => {
    console.log('handleNextWord ran');
    LanguageApiService.getHead()
    .then(head => {
      this.setState({
        head,
        guessBool: false
      })
    })

  }

  componentDidMount() {
    LanguageApiService.getHead()
      .then(head => {
        this.setState({
          head,
          loading: false,
        })
      })
  }

  render() {

    console.log(this.state.wordCorrect);
    return (
      <section className="learning-container">
        {!this.state.loading && <h2>Translate the word: {this.state.head.original}</h2>}
        <form id="learning-form">

          {/* {!this.state.guessBool && <Question handleSendGuess={this.handleSendGuess} />} */}

          {!this.state.guessBool && <Label htmlFor='learning-input' className="text-center">
            What's the translation for this word?<Required />
          </Label>}
          {!this.state.guessBool && <Input
            id='learning-input'
            name='answer'
            className="center"
            required
            ref={this.guessTerm}
          />}
          {!this.state.guessBool && <Button onClick={e => this.handleSendGuess(e)}>
            Submit your answer
          </Button>}

          {this.state.guessBool && <Results isCorrect={this.state.isCorrect} answer={this.state.answer} onNextWordClick={this.handleNextWord} />}

        </form>

        <div className="results-container center">
          <p>You have answered this word correctly {this.state.wordCorrect} times.</p>
          <p>You have answered this word incorrectly {this.state.wordIncorrect} times.</p>
          <p>You have answered this word correctly {this.state.wordCorrect} times.</p>
          <p>Total Language Score: {this.state.totalScore}</p>
        </div>

      </section>
    );
  }
}

export default LearningRoute
