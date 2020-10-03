/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileUpload from '../components/FileUpload.jsx';

it('renders correctly', () => {
  const partNum = '1337';
  const onUpload = jest.fn();
  const onFileDrop = jest.fn();
  const onThumbnailSelect = jest.fn();
  const onFileRemove = jest.fn();

  const { getByText } = render(

    <FileUpload
      partNum={partNum}
      addButtonClicked={false}
      onUpload={onUpload}
      onFileDrop={onFileDrop}
      onThumbnailSelect={onThumbnailSelect}
      onFileRemove={onFileRemove}
    />,
  );

  expect(getByText('Drop files here or click to upload.')).toBeInTheDocument();
});
