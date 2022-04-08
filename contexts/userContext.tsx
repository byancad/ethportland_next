import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer
} from "react";

// state
type State = {
  address?: string;
  session?: boolean;
  rally?: any;
};

const initialState: State = {
  address: undefined,
  session: false,
  rally: {}
};

// actions
enum ActionTypes {
  UPDATE_USER_SESSION,
  CLEAR_USER_SESSION,
  UPDATE_RALLY_USER
}

// action creator types
type Actions = ReducerActions<{
  [ActionTypes.UPDATE_USER_SESSION]: State;
  [ActionTypes.CLEAR_USER_SESSION]: undefined;
  [ActionTypes.UPDATE_RALLY_USER]: { username: string; rnbUserId: string };
}>;

// reducer
const reducer: Reducer<State, Actions> = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_SESSION:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.UPDATE_RALLY_USER:
      return {
        ...state,
        rally: action.payload
      };
    case ActionTypes.CLEAR_USER_SESSION:
      return initialState;
    default:
      return state;
  }
};

// context
type IContext = {
  state: State;
  dispatch: Dispatch<Actions>;
};

const Context = createContext<IContext>({} as IContext);

// context provider
export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};

// hook
export const useUserDispatch = (dispatch: Dispatch<Actions>) => {
  const updateUserSession = (session: State) => {
    dispatch({ type: ActionTypes.UPDATE_USER_SESSION, payload: session });
  };

  const clearUserSession = () => {
    dispatch({ type: ActionTypes.CLEAR_USER_SESSION });
  };

  const updateRally = (data: { username: string; rnbUserId: string }) => {
    dispatch({ type: ActionTypes.UPDATE_RALLY_USER, payload: data });
  };

  return { updateUserSession, clearUserSession, updateRally };
};

export const useUserContext = () => {
  const { state, dispatch } = useContext(Context);
  const dispatchActions = useUserDispatch(dispatch);
  return { ...state, ...dispatchActions };
};
