/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalButton from '../../../main/component/Modal/ModalButton';

configure({ adapter: new Adapter() });

describe('Basic tests', () => {
  it('should do math', () => {
    const x = 1 + 2;
    expect(x).toBe(3);
  });
});

describe('ModalButton component tests', () => {
  it('should show the button green button', () => {
    const { queryByTestId } = render(
      <ModalButton />,
    );

    expect(queryByTestId('ModBut')).toBeTruthy();
  });

  it('should run onclick function when button is pressed in DOM', () => {
    const mockHandleOnClick = jest.fn();
    const wrapper = shallow(<ModalButton handleOnClick={mockHandleOnClick} />);
    wrapper.find('button').at(0).simulate('click');
    expect(mockHandleOnClick).toHaveBeenCalled();
  });
});
