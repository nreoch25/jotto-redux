import successReducer from "../redux/reducers/successReducer";
import { actionTypes } from "../redux/actions";

describe("successReducer", () => {
  test("returns default state of false when no action is passed", () => {
    const state = successReducer(undefined, {});
    expect(state).toBe(false);
  });
  test("returns true when type CORRECT_GUESS is passed", () => {
    const state = successReducer(undefined, {
      type: actionTypes.CORRECT_GUESS
    });
    expect(state).toBe(true);
  });
});
