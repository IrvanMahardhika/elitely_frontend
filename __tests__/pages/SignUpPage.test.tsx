import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import SignUpPage from '../../src/pages/SignUp/index';

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

    const signUpButtonText = screen.queryByLabelText('signUp-button-text');
    expect(signUpButtonText).toBeTruthy();
    expect(signUpButtonText?.innerHTML).toEqual('Sign Up');
  });
  it('Signing up user', () => {});
});
