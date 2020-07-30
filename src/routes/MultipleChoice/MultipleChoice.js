import React from "react";
import { Redirect } from "react-router-dom";
import fileContext from "../../contexts/fileContext";
import LanguageApiService from "../../services/language-service";

export default class MultipleChoice extends React.Component {
  static contextType = fileContext;

  constructor(props) {
    super(props);
    this.state = {
      options: [],
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
  componentDidMount() {
    console.log(this.context.words);
    
      LanguageApiService.getWords()
        .then((res) => this.context.setLangAndWords(res))
        .then(() => LanguageApiService.getHead())
        .then((head) => {
          this.setState({
            nextWord: head.nextWord,
            wordIncorrectCount: head.wordIncorrectCount,
            wordCorrectCount: head.wordCorrectCount,
            totalScore: head.totalScore,
            loading: false,
          });
        })
        .then(() => {
            this.getOptions();
        })
        .catch((error) => this.setState({ error: error }));
  }

  getOptions () {
    let correctAnswer = this.context.words.find(word => word.original === this.state.nextWord).translation;
    let options = [correctAnswer];
    while(options.length !== 4) {
        let index = Math.floor(Math.random() * this.context.words.length);
        if(this.context.words[index].translation !== correctAnswer) {
            options.push(this.context.words[index].translation);
        }
    }
    this.setState({
        options: options
    })
  };

  render() {
    return (
      <div id="mc_container">
        <h2>Translate the word: {this.state.nextWord}</h2>
        <div id="mc_options_box">
            {this.state.options !== []
            ? this.state.options.map(option => {
                return <button type="button" onClick={this.updateGuess}>{option}</button>
            })
            :''}
        </div>
      </div>
    );
  }
}
