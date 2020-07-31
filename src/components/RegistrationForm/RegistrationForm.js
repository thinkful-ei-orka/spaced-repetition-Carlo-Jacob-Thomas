import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import Button from "../Button/Button";
import "./RegistrationForm.css";
import LanguageApiService from "../../services/language-service";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = {
    languages: null,
    selectedLanguage: '',
    error: null,
  };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = "";
        username.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  getLanguages = () => {
    LanguageApiService.getLanguages().then((res) => {
      this.setState({
        languages: res.languages,
      });
    });
  };

  setLangSelection = (e) => {
    this.setState({
      selectedLanguage: e.target.value,
    });
  };

  render() {
    const { error } = this.state;
    if (this.state.languages === null) {
      this.getLanguages();
    }
    return (
      <>
        <form className="main-form center" onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p>{error}</p>}</div>
          <div>
            <Label htmlFor="registration-name-input">
              Enter your name
              <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id="registration-name-input"
              name="name"
              required
            />
          </div>
          <div>
            <Label htmlFor="registration-username-input">
              Choose a username
              <Required />
            </Label>
            <Input id="registration-username-input" name="username" required />
          </div>
          <div>
            <Label htmlFor="registration-password-input">
              Choose a password
              <Required />
            </Label>
            <Input
              id="registration-password-input"
              name="password"
              type="password"
              required
            />
          </div>
          <div>
          <select
            value={this.state.selectedLanguage}
            key='select_box'
            id="language_select"
            onChange={this.setLangSelection}
          >
            {this.state.languages
              ? this.state.languages.map((language, index) => {
                  return (
                    <option
                      key={index}
                      value={language.name}
                      className="lang_option"
                    >
                      {language.name}
                    </option>
                  );
                })
              : ""}
          </select>
          </div>
          <footer className="center">
            <Button type="submit">Sign up</Button>{" "}
            <Link to="/login">Already have an account?</Link>
          </footer>
        </form>
      </>
    );
  }
}

export default RegistrationForm;
