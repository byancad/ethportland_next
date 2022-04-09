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
  addressMap: {
    [address: string]: Contract;
  };
  idMap: {
    [id: number]: Contract;
  };
};

const initialState: State = { addressMap: {}, idMap: {} };

// actions
enum ActionTypes {
  ADD_CONTRACT,
  ADD_CONTRACT_BY_ID,
}

// action creator types
type Actions = ReducerActions<{
  [ActionTypes.ADD_CONTRACT]: { address: string; contract: Contract };
  [ActionTypes.ADD_CONTRACT_BY_ID]: { id: number; contract: Contract };
}>;

// reducer
const reducer: Reducer<State, Actions> = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD_CONTRACT:
      const originalAddressMap = state.addressMap;
      const { address, contract } = action.payload;
      let newContract: { [address: string]: Contract } = {};
      newContract[address] = contract;
      return {
        ...state,
        addressMap: {
          ...originalAddressMap,
          ...newContract,
        },
      };

    case ActionTypes.ADD_CONTRACT_BY_ID:
      const originalIdMap = state.idMap;
      const { id, contract: contractInstance } = action.payload;
      let newState: { [id: number]: Contract } = {};
      newState[id] = contractInstance;
      return {
        ...state,
        idMap: {
          ...originalIdMap,
          ...newState,
        },
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
  addContractById: (id: number, contract: Contract) => void;
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

  const addContractById = (id: number, contract: Contract) => {
    dispatch({
      type: ActionTypes.ADD_CONTRACT_BY_ID,
      payload: { id, contract },
    });
  };

  return (
    <Context.Provider value={{ state, dispatch, addContract, addContractById }}>
      {children}
    </Context.Provider>
  );
};

// hook
export const useContractContext = () => {
  const { state, addContract, addContractById } = useContext(Context);
  return { state, addContract, addContractById };
};
