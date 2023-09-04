import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import UserListPage from '../../src/pages/List';

import * as request from '../../src/utils/request';

const mockResponse = {
  data: [
    { id: 1, first_name: 'Claudia', last_name: 'Schiffer', address: 'address' }
  ]
};

jest.spyOn(request, 'default').mockResolvedValue(mockResponse);

const component = (
  <BrowserRouter>
    <UserListPage />
  </BrowserRouter>
);

describe('UserList page', () => {
  it('Renders correctly', async () => {
    render(component);

    const circularProgress = screen.queryByLabelText('circular-progress');
    expect(circularProgress).toBeTruthy();

    await waitFor(() => {
      const pageTitle = screen.getByLabelText('page-title');
      expect(pageTitle).toBeTruthy();
    });

    const pageTitle = screen.getByLabelText('page-title');
    expect(pageTitle.innerHTML).toEqual('List page');

    const userCard = screen.queryAllByLabelText('user-card');
    expect(userCard.length).toEqual(mockResponse.data.length);
  });
});
