import { shallow } from "enzyme";
import { findByTestAttribute, storeFactory } from "./utils";
import Input, { UnConnectedInput } from "../components/Input";

/**
 * Factory function to create a redux connected ShallowWrapper
 * @function setup
 * @param {object} initialState
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  // enzyme dive() allows us to get the child component
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Input render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttribute(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("renders input box", () => {
      const inputBox = findByTestAttribute(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByTestAttribute(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttribute(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttribute(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("does not render submit button", () => {
      const submitButton = findByTestAttribute(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has success state as props", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("guessWord action creator is a prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});
describe("guessWord action creator call", () => {
  let guessWordMock;
  let wrapper;
  let props;
  const guessedWord = "train";
  beforeEach(() => {
    guessWordMock = jest.fn();
    props = {
      guessWord: guessWordMock,
      success: false
    };
    wrapper = shallow(<UnConnectedInput {...props} />);
    // add value to input box
    wrapper.setState({ currentGuess: guessedWord });
    const button = findByTestAttribute(wrapper, "submit-button");
    button.simulate("click", { preventDefault() {} });
  });
  test("guessWord is called on submit button click", () => {
    expect(guessWordMock).toHaveBeenCalled();
  });
  test("guessWord is called with input value state", () => {
    expect(guessWordMock).toHaveBeenCalledWith(guessedWord);
  });
  test("clicking submit clears input", () => {
    expect(wrapper.state("currentGuess")).toBe("");
  });
});
