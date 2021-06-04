import {useReducer, createContext} from 'react';
import rootReducer from './rootReducer';

const state= {
    token: 0,
    userName:"Manivel",
    data: [],
    isAuth: true,
    searchKey:"",
    selectedCategoryId:0
};
const dispatch= ()=>{};

export const ProductContext = createContext({state, dispatch});

export const ContextProvider = ({children}) => {
    const [ states, dispatchHere ] = useReducer(rootReducer, state);

   return(<ProductContext.Provider value={{state: states, dispatch: dispatchHere}}>
        {children}
    </ProductContext.Provider>)
}
