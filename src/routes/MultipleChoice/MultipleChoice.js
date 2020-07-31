import React from "react";
import fileContext from "../../contexts/fileContext";
import LanguageApiService from "../../services/language-service";
import Results from "../../components/Results/Results";
import "./MultipleChoice.css";

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

  getOptions() {
    let correctAnswer = this.context.words.find(
      (word) => word.original === this.state.nextWord
    ).translation;
    let options = [correctAnswer];
    while (options.length !== 4) {
      let index = Math.floor(Math.random() * this.context.words.length);
      options.push(this.context.words[index].translation);
      options = [...new Set(options)];
    }
    this.setState({
      options: options,
    });
  }

  updateGuess = (e) => {
    this.setState({
      guessTerm: e.target.value,
    });
  };

  handleSpeech = () => {
    console.log("running speech");
  };

  handleSubmit = () => {
    const guess = this.state.guessTerm;
    console.log(guess);

    const guessBody = {
      guess,
    };

    LanguageApiService.postGuess(guessBody).then((summary) => {
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
        guessBool: true,
        guessTerm: "",
      });
    });
  };

  handleNextWord = (event) => {
    event.preventDefault();
    console.log("handleNextWord ran");
    LanguageApiService.getHead()
      .then((head) => {
        this.setState({
          wordIncorrectCount: head.wordIncorrectCount,
          wordCorrectCount: head.wordCorrectCount,
          guessBool: false,
        });
      })
      .then(() => {
        this.getOptions();
      });
  };

  MultipleChoiceForm = () => {
    return (
      <div id="mc_options_box">
        {this.state.options.map((option) => {
          if (this.state.guessTerm === option) {
            return (
              <button
                className="mc_option_selected"
                type="button"
                key={option}
                value={option}
              >
                {option}
              </button>
            );
          } else {
            return (
              <button
                className="mc_option"
                type="button"
                key={option}
                value={option}
                onClick={(e) => this.updateGuess(e)}
              >
                {option}
              </button>
            );
          }
        })}
        <div id="speech_to_text_box">
          <button id="speech_button" type="button" onClick={this.handleSpeech}>
            Push to speak
          </button>
        </div>
        <button id="submit_button" type="button" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  };

  render() {
    let headerText = "Translate the word:";
    if (this.state.isCorrect && this.state.guessBool) {
      headerText = "You were correct! :D";
    }
    if (!this.state.isCorrect && this.state.guessBool) {
      headerText = "Good try, but not quite right :(";
    }
    return (
      <div id="mc_container">
        {!this.state.loading && (
          <>
            <h2>{headerText}</h2>
            <span>{this.state.nextWord}</span>
          </>
        )}

        {!this.state.guessBool ? this.MultipleChoiceForm() : ""}

        {this.state.guessBool && (
          <Results
            isCorrect={this.state.isCorrect}
            totalScore={this.state.totalScore}
            guess={this.state.guessTerm}
            answer={this.state.answer}
            original={this.state.nextWord}
            onNextWordClick={this.handleNextWord}
          />
        )}
      </div>
    );
  }
}
