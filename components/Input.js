import { Component } from "react";
import { connect } from "react-redux";

class Input extends Component {
  render() {
    const { success } = this.props;
    return (
      <div data-test="component-input">
        {!success && (
          <form className="form-inline">
            <input
              type="text"
              data-test="input-box"
              className="mb-2 mx-sm-3"
              placeholder="enter guess"
            />
            <button
              type="submit"
              data-test="submit-button"
              className="btn btn-primary mb-2"
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

export default connect(mapStateToProps)(Input);
