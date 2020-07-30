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
      loading: true,
      guessTerm: null,
    };
  }


  handleSendGuess = (e) => {
    e.preventDefault();
    const guess = this.state.guessTerm;
    console.log(guess);

    const guessBody = {
      guess
    }

    LanguageApiService.postGuess(guessBody)
      .then(summary => {
        console.log(summary.wordCorrectCount);
        let newCorrectScore = this.state.wordCorrect;
        let newIncorrectScore = this.state.wordIncorrect;
        if (summary.isCorrect) {
          newCorrectScore++;
        } else {
          newIncorrectScore++;
        }
        this.setState({
          // nextWord: summary.nextWord,
          totalScore: summary.totalScore,
          wordIncorrect: newIncorrectScore,
          wordCorrect: newCorrectScore,
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
        wordIncorrect: head.incorrect_count,
        wordCorrect: head.correct_count,
        guessBool: false
      })
    })

  }

  setAnswer = (val) => {
    console.log(val.target.value)
    this.setState({
      guessTerm: val.target.value
    })
  }

  componentDidMount() {
    LanguageApiService.getHead()
      .then(head => {
        this.setState({
          head,
          wordIncorrect: head.incorrect_count,
          wordCorrect: head.correct_count,
          totalScore: head.totalScore,
          loading: false,
        })
      })
  }

  render() {
    return (
      <section className="learning-container">
        {!this.state.loading && <h2>Translate the word:<span>{this.state.head.original}</span></h2>}
        <form id="learning-form" onSubmit={this.handleSendGuess}>

          {/* {!this.state.guessBool && <Question handleSendGuess={this.handleSendGuess} />} */}

          {!this.state.guessBool && <Label htmlFor='learn-guess-input' className="text-center">
            What's the translation for this word?
          </Label>}
          {!this.state.guessBool && <Input
            id='learn-guess-input'
            name='answer'
            className="center"
            required
            onChange={e => this.setAnswer(e)}
          />}
          {!this.state.guessBool && <button type="submit">
            Submit your answer
          </button>}

          {this.state.guessBool && <Results isCorrect={this.state.isCorrect} answer={this.state.answer} onNextWordClick={this.handleNextWord} />}

        </form>

        <div className="results-container center">
          <p>You have answered this word correctly {this.state.wordCorrect} times.</p>
          <p>You have answered this word incorrectly {this.state.wordIncorrect} times.</p>
          <p>Total Language Score: {this.state.totalScore}</p>
        </div>

      </section>
    );
  }
}

export default LearningRoute
