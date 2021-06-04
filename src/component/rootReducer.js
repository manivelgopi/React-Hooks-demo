const rootReducer =(state,action) => {
    switch(action.type){
      case 'UPDATEAUTH':
        return {...state, isAuth: action.payload};
      case 'PRODUCT':
        return {...state, data: action.payload };
      case 'SEARCHKEY':
        return {...state, searchKey: action.payload}
      case 'SETCATEGORY':
          return {...state, selectedCategoryId: action.payload}  
      default :
        return state;
    }  
}
export default rootReducer;