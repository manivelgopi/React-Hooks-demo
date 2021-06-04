//import { render, screen } from '@testing-library/react';
import React from 'react';
import Main from './main';
import App from './../App';
import {mount} from 'enzyme';
import {ProductContext} from './productContext';
import {BrowserRouter as Router, MemoryRouter} from 'react-router-dom';
import Product from './../product';
import {findTestAttr} from './../test.util';

const noDataState= {
  token: 0,
  userName:"Manivel",
  data: [],
  isAuth: true,
  searchKey:"",
  selectedCategoryId:0
};

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
    isAuth: true,
    searchKey:"",
    selectedCategoryId:0
};

const dispatch = jest.fn(); 

describe('Main', ()=>{

  //Main component exists
  it("Main component render with product data", ()=>{
    const MainComponent = () => (
      <ProductContext.Provider value={{state, dispatch}}>
        <Router>
          <Main />
        </Router>
      </ProductContext.Provider>);

    const element = mount(<MainComponent />);
    const component = element.find(Main);

    //console.log(element.debug());
    const wrapper = findTestAttr(component, "main");
    expect(wrapper.length).toBe(1);
    expect(wrapper.exists()).toBeTruthy();

    const productcard = findTestAttr(component, "productcard");
    expect(productcard.exists()).toBeTruthy();
  });

   //Main component render with No data
   it("No data found - Main component render", ()=>{
    const MainComponent = () => (
      <ProductContext.Provider value={{state: noDataState}}>
        <Router>
          <Main />
        </Router>
      </ProductContext.Provider>);

    const element = mount(<MainComponent />);
    const component = element.find(Main);

    //console.log(element.debug());
    const wrapper = findTestAttr(component, "nodatacard");
    expect(wrapper.length).toBe(1);
    expect(wrapper.exists()).toBeTruthy();
  });

  //Home page product click and redirect to product page
  it('Home page Product click and redirect check', () => {
    const wrapper = mount(
      <ProductContext.Provider value={{state, dispatch}}>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </ProductContext.Provider>
    );

    const link = findTestAttr(wrapper, "readmore").first();
    link.simulate('click',  { button: 0 });
    expect(wrapper.find(Product)).toHaveLength(1);
    expect(findTestAttr(wrapper, "productpage")).toBeTruthy();
  //categoryClose
  });


});