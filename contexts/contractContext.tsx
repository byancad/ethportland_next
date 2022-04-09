import { Contract } from "ethers";
import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from "react";

// state
type State = {
  [address: string]: Contract;
};

const initialState: State = {};

// actions
enum ActionTypes {
  ADD_CONTRACT,
}

// action creator types
type Actions = ReducerActions<{
  [ActionTypes.ADD_CONTRACT]: { address: string; contract: Contract };
}>;

// reducer
const reducer: Reducer<State, Actions> = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD_CONTRACT:
      const { address, contract } = action.payload;
      let newContracts: State = {};
      newContracts[address] = contract;
      return {
        ...state,
        ...newContracts,
      };

    default:
      return state;
  }
};

// context
type IContext = {
  state: State;
  dispatch: Dispatch<Actions>;
  addContract: (address: string, contract: Contract) => void;
};

const Context = createContext<IContext>({} as IContext);

// context provider
export const Provider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addContract = (address: string, contract: Contract) => {
    dispatch({
      type: ActionTypes.ADD_CONTRACT,
      payload: { address, contract },
    });
  };

  return (
    <Context.Provider value={{ state, dispatch, addContract }}>
      {children}
    </Context.Provider>
  );
};

// hook
export const useContractContext = () => {
  const { state, addContract } = useContext(Context);
  return { state, addContract };
};
