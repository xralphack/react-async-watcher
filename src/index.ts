import { useCallback, useReducer } from "react";

type Status = "initial" | "loading" | "success" | "failure";

type State<R> = {
  status: Status;
  result: R | undefined;
  error: Error | undefined;
};

export const useAsyncWatcher = <R extends any>() => {
  const initialState: State<R> = {
    status: "initial",
    result: undefined,
    error: undefined,
  };

  const [state, dispatch] = useReducer(
    (
      state: State<R>,
      action:
        | { type: "initial" }
        | { type: "loading" }
        | { type: "success"; payload: R }
        | { type: "failure"; error: Error }
    ): typeof initialState => {
      switch (action.type) {
        case "initial":
          return initialState;
        case "loading":
          return {
            ...state,
            status: "loading",
          };
        case "success":
          return {
            ...state,
            status: "success",
            result: action.payload,
            error: undefined,
          };
        case "failure":
          return {
            ...state,
            status: "failure",
            result: undefined,
            error: action.error,
          };
        default:
          return state;
      }
    },
    initialState
  );

  const execute = useCallback(async (asyncTask: () => Promise<R>) => {
    dispatch({
      type: "loading",
    });

    try {
      const result = await asyncTask();
      dispatch({
        type: "success",
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: "failure",
        error,
      });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: "initial",
    });
  }, []);

  return {
    execute,
    reset,
    ...state,
  };
};
