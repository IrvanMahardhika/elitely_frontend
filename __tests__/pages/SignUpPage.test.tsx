import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import SignUpPage from '../../src/pages/SignUp';

const component = (
  <BrowserRouter>
    <SignUpPage />
  </BrowserRouter>
);

describe('SignUp page', () => {
  it('Renders correctly', () => {
    render(component);

    const inputFirstName = screen.getByLabelText('input-first-name');
    expect(inputFirstName).toBeTruthy();

    const inputLastName = screen.getByLabelText('input-last-name');
    expect(inputLastName).toBeTruthy();

    const inputAddress = screen.getByLabelText('input-address');
    expect(inputAddress).toBeTruthy();

    const signUpButtonText = screen.getByLabelText('signUp-button-text');
    expect(signUpButtonText).toBeTruthy();
    expect(signUpButtonText?.innerHTML).toEqual('Sign Up');
  });

  it('Signing up user', () => {
    render(component);

    const firstName = 'test first name';
    const lastName = 'test last name';
    const address = 'test address';

    let circularProgress = screen.queryByLabelText('circular-progress');
    expect(circularProgress).toBeFalsy();

    const inputFirstName = screen.getByLabelText('input-first-name');
    fireEvent.change(inputFirstName, { target: { value: firstName } });

    const inputLastName = screen.getByLabelText('input-last-name');
    fireEvent.change(inputLastName, { target: { value: lastName } });

    const inputAddress = screen.getByLabelText('input-address');
    fireEvent.change(inputAddress, { target: { value: address } });

    const signUpButton = screen.getByLabelText('signUp-button');
    fireEvent.click(signUpButton);

    circularProgress = screen.queryByLabelText('circular-progress');
    expect(circularProgress).toBeTruthy();
  });
});
