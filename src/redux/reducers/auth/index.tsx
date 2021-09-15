import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

const initial: stateType = {
  isRemember: false,
  token: undefined,
  currentUser: undefined,
};

interface stateType {
  isRemember?: boolean;
  token?: string;
  currentUser?: object;
}

class Reducer extends ImmerReducer<stateType> {
  setIsRemember(isRemember: boolean) {
    this.draftState.isRemember = isRemember;
  }

  setToken(token: string) {
    this.draftState.token = token;
  }

  setCurrentUser(user: object) {
    this.draftState.currentUser = user;
  }
}

export const authAction = createActionCreators(Reducer);
export const authReducer = createReducerFunction(Reducer, initial);

export default {
  authAction,
  authReducer,
};
