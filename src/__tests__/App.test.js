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
  render(<Router><App /></Router>);

  // check that we start from Home page
  expect(screen.getByTestId('Home')).toBeInTheDocument();

  // Click Storage link
  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('StorageLink'), leftClick);

  // Check that we changed to the Storage page
  expect(screen.getByTestId('ComponentStorage')).toBeInTheDocument();

  // Click Status text link
  userEvent.click(screen.getByTestId('StatusLink1'), leftClick);

  // Check that the status bar is showing
  expect(screen.getByTestId('Status')).toBeInTheDocument();

  // Click Status icon link ( Double click because it is toggled )
  userEvent.click(screen.getByTestId('StatusLink2'), leftClick);
  userEvent.click(screen.getByTestId('StatusLink2'), leftClick);

  // Check that the status bar is showing
  expect(screen.getByTestId('Status')).toBeInTheDocument();

  // Click Status text link
  userEvent.click(screen.getByTestId('SettingsLink1'), leftClick);

  // Check that the status bar is showing
  expect(screen.getByTestId('Settings')).toBeInTheDocument();

  // Click Status icon link ( Double click because it is toggled )
  userEvent.click(screen.getByTestId('SettingsLink2'), leftClick);
  userEvent.click(screen.getByTestId('SettingsLink2'), leftClick);

  // Check that the status bar is showing
  expect(screen.getByTestId('Settings')).toBeInTheDocument();

});
