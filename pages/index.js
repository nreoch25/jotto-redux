import React, { Component } from "react";
import { connect } from "react-redux";
import { getSecretWord } from "../redux/actions";
import Congrats from "../components/Congrats";
import GuessedWords from "../components/GuessedWords";
import Input from "../components/Input";

export class UnConnectedIndexPage extends Component {
  /**
   * @method componentDidMount
   */
  componentDidMount() {
    this.props.getSecretWord();
  }
  render() {
    const { success, guessedWords } = this.props;
    return (
      <div data-test="component-index-page" className="container">
        <h1>Jotto</h1>
        <Congrats success={success} />
        <Input />
        <GuessedWords guessedWords={guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => {
  return {
    success,
    guessedWords,
    secretWord
  };
};

export default connect(mapStateToProps, { getSecretWord })(
  UnConnectedIndexPage
);
