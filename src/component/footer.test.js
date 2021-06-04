//import { render, screen } from '@testing-library/react';
import Footer from './footer';
import {shallow} from 'enzyme';
import {findTestAttr} from './../test.util';

describe('Footer', ()=>{

 // const { state, dispatch } = useContext(ProductContext);
  let component;

  beforeEach(()=>{
    component = shallow(<Footer /> );
  })

  it("Check Header component", (attr = "footer")=>{
    const wrapper = findTestAttr(component, "footer");
    expect(wrapper.length).toBe(1);
  });

});