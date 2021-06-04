//import { render, screen } from '@testing-library/react';
import React from 'react';
import Nav from './nav';
import {mount} from 'enzyme';
import {ProductContext} from './productContext';
import {BrowserRouter as Router} from 'react-router-dom';
import rootReducer from './rootReducer';
import {findTestAttr} from './../test.util';

describe('Nav', ()=>{
  const state= {
    token: 0,
    userName:"Manivel",
    data: [
      {
        "product": "Camera",
        "cid": 1,
        "products": [
          {
            "id": 101,
            "name": "DSLR-100"
          },
          {
            "id": 102,
            "name": "DSLR-120"
          },
          {
            "id": 103,
            "name": "DSLR-200"
          },
          {
            "id": 104,
            "name": "DSLR-90"
          }
        ]}],
    isAuth: false,
    searchKey:"",
    selectedCategoryId:0
};

const dispatch = jest.fn(); 

const NavComponent = () => (
      <ProductContext.Provider value={{state, dispatch}}>
        <Router>
          <Nav />
        </Router>
      </ProductContext.Provider>);

const element = mount(<NavComponent />);
let component;

  beforeEach(()=>{
      component = element.find(Nav);
  });

  //Nav header exists
  it("Check Nav component with header tag", ()=>{
    //console.log(element.debug());
    const wrapper = findTestAttr(component, "header");
    expect(wrapper.length).toBe(1);
    expect(wrapper.exists()).toBeTruthy();
  });

  //Brand availability with Link
  it("Check Logo component in header tag", ()=>{
    const wrapper = findTestAttr(component, "brand");
    expect(wrapper.length).toBe(3);
  });

  //Search function test WRT Product keyword
  it('Should change value when search input onChange was called', () => {
    const wrapper = findTestAttr(component, "search");
    const event = {target: {name: "search", value: "dslr"}};
    const updatedAction = {type:"SEARCHKEY", payload:"dslr"};
    const updatedState = rootReducer(state, updatedAction);

    wrapper.simulate('change', event);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({type:"SEARCHKEY", payload:"dslr"});
    expect(updatedState.searchKey).toBe("dslr");
  });

  // Login button test
  it("Login button availability", ()=>{
    const loginWrapper = findTestAttr(component, "login");
    expect(loginWrapper.length).toBe(1);
  });

  const logoinAction = {type:"UPDATEAUTH", payload:true};
  const updatedState = rootReducer(state, logoinAction);
  it('Should Login when login called', () => {
    const loginWrapper = findTestAttr(component, "login");
    loginWrapper.simulate('click');
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(logoinAction);
    expect(updatedState.isAuth).toBe(true);

    expect(findTestAttr(component, "logout").exists()).toBeFalsy();
  })
 
  //Logout test
  // it("Logout button availability", ()=>{
  //   const logoutWrapper = findTestAttr(component, "logout");
  //   expect(logoutWrapper.length).toBe(1);
  // });

  // const logoutAction = {type:"UPDATEAUTH", payload:false};
  // const updateState = rootReducer(updatedState, logoutAction);
  // it('Should Logout when logout called', () => {
  //   const logoutWrapper = findTestAttr(component, "logout");
  //   logoutWrapper.simulate('click');
  //   expect(dispatch).toBeCalledTimes(1);
  //   expect(dispatch).toHaveBeenCalledWith(logoutAction);
  //   expect(updateState.isAuth).toBe(false);

  //   expect(findTestAttr(component, "login").exists()).toBeFalsy();
  // })




  //Menu select - Category
  // Validate based on first category and its id only
  // category id (CID: 1 )
  it("Check Category menu link", ()=>{
    const wrapper = findTestAttr(component, "category");
    expect(wrapper.length).toBe(1);
  });

  it('Product Category on click event from Menu bar', () => {
    const wrapper = findTestAttr(component, "category");
    const updatedAction = {type:"SETCATEGORY", payload: 1 };
    const updatedState = rootReducer(state, updatedAction);

    wrapper.first().simulate('click', state.data.cid);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(updatedAction);
    expect(updatedState.selectedCategoryId).toBe(1);
  })

  //Product link test
  it("Check Product menu link", ()=>{
    const wrapper = findTestAttr(component, "product");
    expect(wrapper.exists()).toBeTruthy();
  });

  


 
});