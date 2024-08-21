interface UserState {
    email: string;
    password: string;
    token: string | null;
  }
  
  const initialState: UserState = {
    email: '',
    password: '',
    token: null,
  };
  
  type Action =
    | { type: 'SET_USER_INFO'; payload: { email: string; password: string } }
    | { type: 'SET_TOKEN'; payload: string };
  
  export const userReducer = (state = initialState, action: Action): UserState => {
    switch (action.type) {
      case 'SET_USER_INFO':
        return { ...state, email: action.payload.email, password: action.payload.password };
      case 'SET_TOKEN':
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };
  