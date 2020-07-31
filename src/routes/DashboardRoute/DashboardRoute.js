import React, { Component } from "react";
import { Link } from "react-router-dom";
import LanguageService from "../../services/language-service";
import fileContext from "../../contexts/fileContext";
import './DashboardRoute.css';

class DashboardRoute extends Component {
  state = {
    error: null,
  };

  static contextType = fileContext;
  componentDidMount() {
    LanguageService.getWords()
      .then((res) => this.context.setLangAndWords(res))
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    return (
      <section className="dashboard">
        <h2>Learn {this.context.language.name}!</h2>
        <Link to="/learn">
          <button id="learn_button">Start practicing</button>
        </Link>
        <Link to="/learn_mc">
          <button id="learn_mc_button">Multiple choice</button>
        </Link>
        <p>Total correct answers: {this.context.language.total_score}</p>
        <section className="word_list_box">
          <h3>Words to practice</h3>
          <ul className="word_list">
            {this.context.words.map((word, index) => {
              return (
                <li key={index} className="word_item">
                  <h4>{word.original}</h4>
                  <p>Correct answer count: {word.correct_count}</p>
                  <p>Incorrect answer count: {word.incorrect_count}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    );
  }
}

export default DashboardRoute;
