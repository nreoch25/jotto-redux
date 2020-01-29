import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import IndexPage, { UnConnectedIndexPage } from "../pages/index";
import { findByTestAttribute, storeFactory } from "./utils";

/**
 * Factory function to create a redux connected ShallowWrapper
 * @function setup
 * @param {object} initialState
 * @returns {ShallowWrapper}
 */
const setupWithStore = (initialState = {}) => {
  const store = storeFactory(initialState);
  // enzyme dive() allows us to get the child component
  const wrapper = shallow(<IndexPage store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Index Page", () => {
  it("matches the snapshot", () => {
    const wrapper = setupWithStore({ success: false });
    const appComponent = findByTestAttribute(wrapper, "component-index-page");
    expect(appComponent.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("redux props", () => {
  test("has success state as a prop", () => {
    const success = true;
    const wrapper = setupWithStore({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("has secretWord state as a prop", () => {
    const secretWord = "party";
    const wrapper = setupWithStore({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe("party");
  });
  test("has guessedWords state as a prop", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setupWithStore({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test("getSecretWord action creator is a prop", () => {
    const wrapper = setupWithStore();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
  test("getSecretWord is called on componentDidMount", () => {
    const getSecretWordMock = jest.fn();
    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: []
    };
    const wrapper = shallow(<UnConnectedIndexPage {...props} />);
    wrapper.instance().componentDidMount();
    expect(getSecretWordMock).toHaveBeenCalled();
  });
});
