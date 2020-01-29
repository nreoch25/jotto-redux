import { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "../redux/actions";

export class UnConnectedInput extends Component {
  state = {
    currentGuess: ""
  };
  onInputChange = ({ target: { value } }) => {
    this.setState({ currentGuess: value });
  };
  submitGuessedWord = evt => {
    evt.preventDefault();
    const { currentGuess } = this.state;
    const { guessWord } = this.props;
    if (currentGuess && currentGuess.length > 0) {
      guessWord(currentGuess);
    }
    this.setState({ currentGuess: "" });
  };
  render() {
    const { success } = this.props;
    const { currentGuess } = this.state;

    return (
      <div data-test="component-input">
        {!success && (
          <form className="form-inline">
            <input
              type="text"
              data-test="input-box"
              className="mb-2 mx-sm-3"
              placeholder="enter guess"
              onChange={this.onInputChange}
              value={currentGuess}
            />
            <button
              type="submit"
              data-test="submit-button"
              className="btn btn-primary mb-2"
              onClick={this.submitGuessedWord}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(mapStateToProps, { guessWord })(UnConnectedInput);
