import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders main component', () => {
  const { getByTestId } = render(<Router><App /></Router>);
  const mainElement = getByTestId("MainWrapper");
  expect(mainElement).toBeInTheDocument();
});

test('routes correctly', () => {
  const { getByTestId } = render(<Router><App /></Router>);

  // check that we start from Home page
  expect(screen.getByTestId('Home')).toBeInTheDocument();

  // Click Storage link
  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('StorageLink'), leftClick);

  // Check that we changed to the Storage page
  expect(screen.getByTestId('ComponentStorage')).toBeInTheDocument();

});
