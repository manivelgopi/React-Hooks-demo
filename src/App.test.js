import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Home from './home';
import PageNotFound from './pageNotFound';
import App from './App';
import {ProductContext} from './component/productContext';
import Product from './product';
import {findTestAttr} from './test.util';

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


describe('App', ()=>{

  it('valid path should not redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(PageNotFound)).toHaveLength(0);
  });
  
  it('invalid path should redirect to 404', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/randomjjs']} initialIndex={0}>
           <App  />
        </MemoryRouter>
      );
      //console.log(wrapper.debug());
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(PageNotFound)).toHaveLength(1);
    });

    it('Nav Link - Product 101 check', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/product/id=101']}>
           <App  />
        </MemoryRouter>
      );
      
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(PageNotFound)).toHaveLength(0);
      expect(wrapper.find(Product)).toHaveLength(1);
      expect(findTestAttr(wrapper, "productpage")).toBeTruthy();
    });

    //Nav Manu product link
    it('Menu Product click and redirect check', () => {
    const wrapper = mount(
      <ProductContext.Provider value={{state, dispatch}}>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </ProductContext.Provider>
    );

    const link = findTestAttr(wrapper, "product").first();
    link.simulate('click',  { button: 0 });
    expect(wrapper.find(Product)).toHaveLength(1);
    expect(findTestAttr(wrapper, "productpage")).toBeTruthy();

    //const pageHeading = wrapper.find("h1").first().text();
    //expect(pageHeading).toEqual('DSLR-100');
  
  });

});