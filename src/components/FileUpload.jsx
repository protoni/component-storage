/* eslint-disable no-console */
import React from 'react';
import { render } from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import classNames from 'classnames';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  onDrop = (files) => {
    // POST to a test endpoint for demo purposes
    console.log("Files dropped!");

    const req = request.post('https://httpbin.org/post');

    files.forEach((file) => {
      console.log("Name: " + file.name);
      console.log(file)
      req.attach(file.name, file);
    });

    req.end();
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              className={classNames("dropzone", {
                "dropzone--isActive": isDragActive
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <p>
                  Try dropping some files here, or click to select files to
                  upload.
                </p>
              )}
            </div>
          );
        }}
      </Dropzone>
    );
  }
}

export default FileUpload;
