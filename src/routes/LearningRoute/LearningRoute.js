import React, { Component } from 'react';
import LanguageApiService from '../../services/language-service';
import './LearningRoute.css';
import { Input, Required, Label } from '../../components/Form/Form';
import { CSSTransition } from 'react-transition-group';
import Button from '../../components/Button/Button';
import Results from '../../components/Results/Results';
import Question from '../../components/Question/Question';
import fileContext from '../../contexts/fileContext';
import ISOStore from '../../components/TextToSpeech/ISOStore';
var msg = new SpeechSynthesisUtterance();
msg.text = "bien y tu como estas";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
// recognition.lang = 'es-MX';

class LearningRoute extends Component {
  static contextType = fileContext;
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
      guessTerm: '',
      speechBool: false,
      listening: false,
    };
  }

  handleSpeech = () => {
    this.setState({
      guessTerm: '',
      listening: true,
    })

    recognition.start();

    recognition.onstart = () => {
      console.log('Voice activated');
    }

    recognition.onresult = (e) => {
      let current = e.resultIndex;

      let transcript = e.results[current][0].transcript;

      this.setState({
        guessTerm: transcript.toLowerCase(),
        listening: false,
      })

    }
  };

  handleSendGuess = (e) => {
    e.preventDefault();
    //const {answer} = e.target;
    const guess = this.state.guessTerm;
    //Sanswer.value = '';

    const guessBody = {
      guess
    }

    LanguageApiService.postGuess(guessBody)
      .then(summary => {
        let newCorrectScore = this.state.wordCorrectCount;
        let newIncorrectScore = this.state.wordIncorrectCount;
        if (summary.isCorrect) {
          newCorrectScore++;
        } else {
          newIncorrectScore++;
        }
        this.setState({
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
    LanguageApiService.getHead()
      .then(head => {
        this.setState({
          nextWord: head.nextWord,
          wordIncorrectCount: head.wordIncorrectCount,
          wordCorrectCount: head.wordCorrectCount,
          guessBool: false,
          guessTerm: ''
        })
      })

  }

  setAnswer = (val) => {
    this.setState({
      guessTerm: val.target.value
    })
  }

  componentDidMount() {
    if(this.context.language === "") {
      LanguageApiService.getWords()
      .then((res) => this.context.setLangAndWords(res))
      .catch((error) => this.setState({ error: error }));
    }
    LanguageApiService.getHead()
      .then(head => {
        console.log(this.context.language)
        let lang = Object.keys(ISOStore).find(key => ISOStore[key] === this.context.language.name)
        msg.lang = lang;
        this.setState({
          nextWord: head.nextWord,
          wordIncorrectCount: head.wordIncorrectCount,
          wordCorrectCount: head.wordCorrectCount,
          totalScore: head.totalScore,
          loading: false,
          guessTerm: ''
        })
      })
  }

  playSound = () => {
    msg.text = this.state.nextWord;
    window.speechSynthesis.speak(msg);
  }

  render() {
    console.log(this.state.nextWord);
    let headerText = 'Translate the word:'
    if (this.state.isCorrect && this.state.guessBool) {
      headerText = 'You were correct! :D'
    }
    if (!this.state.isCorrect && this.state.guessBool) {
      headerText = 'Good try, but not quite right :('
    }

    return (
      <CSSTransition
        in={!this.state.loading}
        timeout={200}
        classNames='guess-anim'
        unmountOnExit>
        <section className="learning-container">
          {!this.state.loading && <><h2>{headerText}</h2><span className='word-translate'>{this.state.nextWord}{'  '}<button onClick={this.playSound}><i class="fas fa-volume-up"></i></button></span></>}
          <form id="learning-form" onSubmit={this.handleSendGuess}>

            {/* {!this.state.guessBool && <Question handleSendGuess={this.handleSendGuess} />} */}

            {!this.state.guessBool && <><Label htmlFor='learn-guess-input' className="text-center">
              What's the translation for this word?
          </Label></>}
          
            {!this.state.guessBool && <div id="speech_to_text_box">
              <button id="speech_button" type="button" onClick={this.handleSpeech}>
                <i className="fas fa-microphone"></i>
              </button>
            </div>}
            
            {!this.state.guessBool && <Input
              id='learn-guess-input'
              name='answer'
              className="center"
              value={this.state.guessTerm}
              required
              onChange={e => this.setAnswer(e)}
            />}
            
            {this.state.listening && <p>Listening...</p>}
          
            {!this.state.guessBool && <button className="guess-submit" type="submit">
              Submit your answer
          </button>}
            <CSSTransition
              in={this.state.guessBool}
              timeout={500}
              classNames='guess-anim'
              unmountOnExit>
              <Results
                isCorrect={this.state.isCorrect}
                totalScore={this.state.totalScore}
                guess={this.state.guessTerm}
                answer={this.state.answer}
                original={this.state.nextWord}
                onNextWordClick={this.handleNextWord} />
            </CSSTransition>

          </form>


          <div className="results-container center DisplayScore">
            <p>Your total score is: {this.state.totalScore}</p>
          </div>

          <div className="results-container center">
            <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
            <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
          </div>

        </section>
      </CSSTransition>
    );
  }
}

export default LearningRoute
