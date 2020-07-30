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
    //const {answer} = e.target;
    const guess = this.state.guessTerm;
    console.log(guess);
    //Sanswer.value = '';

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
          nextWord: summary.nextWord,
          totalScore: summary.totalScore,
          wordIncorrect: newIncorrectScore,
          wordCorrect: newCorrectScore,
          answer: summary.answer,
          isCorrect: summary.isCorrect,
          guessBool: true
        })
      })

  }

  handleNextWord = (event) => {
    event.preventDefault();
    console.log('handleNextWord ran');
    LanguageApiService.getHead()
      .then(head => {
        this.setState({
          wordIncorrectCount: head.wordIncorrectCount,
          wordCorrectCount: head.wordCorrectCount,
          
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
    let headerText = 'Translate the word:'
    if (this.state.isCorrect && this.state.guessBool) {
      headerText = 'You were correct! :D'
    }
    if (!this.state.isCorrect && this.state.guessBool) {
      headerText = 'Good try, but not quite right :('
    } 

    return (
      <section className="learning-container">
        {!this.state.loading && <><h2>{headerText}</h2><span>{this.state.nextWord}</span></>}
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

          {this.state.guessBool && <Results isCorrect={this.state.isCorrect} totalScore={this.state.totalScore} guess={this.state.guessTerm} answer={this.state.answer} original={this.state.nextWord} onNextWordClick={this.handleNextWord} />}

        </form>

        <div className="results-container center DisplayScore">
          <p>Your total score is: {this.state.totalScore}</p>
        </div>    

        <div className="results-container center">
          <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
        </div>

      </section>
    );
  }
}

export default LearningRoute
