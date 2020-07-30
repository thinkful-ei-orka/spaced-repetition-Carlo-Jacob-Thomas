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
      nextWord: null,
      totalScore: null,
      wordIncorrectCount: null,
      wordCorrectCount: null,
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
        let newCorrectScore = this.state.wordCorrectCount;
        let newIncorrectScore = this.state.wordIncorrectCount;
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
          nextWord: head.nextWord,
          wordIncorrectCount: head.wordIncorrectCount,
          wordCorrectCount: head.wordCorrectCount,
          totalScore: head.totalScore,
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
          nextWord: head.nextWord,
          wordIncorrectCount: head.wordIncorrectCount,
          wordCorrectCount: head.wordCorrectCount,
          totalScore: head.totalScore,
          loading: false,
        })
      })
  }

  render() {
    return (
      <section className="learning-container">
        {!this.state.loading && <><h2>Translate the word:</h2><span>{this.state.nextWord}</span></>}
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

          {this.state.guessBool && <Results totalScore={this.state.totalScore} isCorrect={this.state.isCorrect} answer={this.state.nextWord} onNextWordClick={this.handleNextWord} />}

        </form>

        <div className="results-container center">
          <p>Your total score is: {this.state.totalScore}</p>
          <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
        </div>

      </section>
    );
  }
}

export default LearningRoute
