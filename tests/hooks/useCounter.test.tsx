import { renderHook } from "@testing-library/react";
import useCounter from "../../src/hooks/userCounter";
import { act } from "react";

describe("test user counter", () => {
  it("should renter counter by initial value 0", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialValue: 0,
      },
    });
    expect(result.current.counter).toBe(0);
  });
  it("should render counter incremented by 1 with initial value 0", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialValue: 0,
      },
    });

    act(result.current.increase);
    expect(result.current.counter).toBe(1);
  });
  it("should render counter decremented by 1 with initial value 1", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialValue: 1,
      },
    });
    act(result.current.decrease);
    expect(result.current.counter).toBe(0);
  });
});
