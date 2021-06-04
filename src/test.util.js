import {shallow} from 'enzyme';

export const setUpComponent = compt =>{
    const ShallowComponent = shallow(compt);
    return ShallowComponent;
};

export const findTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-testid="${attr}"]`);
  return wrapper;
};