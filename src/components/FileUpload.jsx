/* eslint-disable no-console */
import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import axios from 'axios';
import request from 'superagent';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  saveFiles = (files) => {
    console.log('Saving files!');
    axios.post('/api/saveFiles', {
      data: files,
    })
      .then((response) => {
        console.log(`response:  ${response}`);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }

  onDrop = (files) => {
    // POST to a test endpoint for demo purposes
    console.log('Files dropped!');

    const req = request.post('/api/saveFiles');

    files.forEach((file) => {
      console.log(`Name: ${file.name}`);
      console.log(file);
      console.log(file.data);
      req.attach(file.name, file);
    });

    // this.saveFiles(files);

    // req.end();
  }

  upload = (files) => {
    const requests = files.map((file) => request
      .post('/api/saveFiles')
      .attach('myImage', file)
      .on('progress', (e) => {
        console.log('Percentage done: ', e.percent);
      })
      .end(((response) => {
        console.log(response);
      })));

    Promise.all(requests).then(console.log('done')).catch(console.error);
  }

  onPreviewDrop = (previewFiles) => {
    previewFiles.map((file) => {
      if (file.type.includes('image')) {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      } else {
        console.log(`File: ${file.name} not image!`);
      }
      return null;
    });

    this.setState({
      files: previewFiles,
    });

    console.log(previewFiles);

    this.upload(previewFiles);
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    return (
      <div>
        <Dropzone onDrop={this.onPreviewDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {
                'dropzone--isActive': isDragActive,
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
          )}
        </Dropzone>
        {this.state.files.length > 0 && (
        <>
          <h3>Previews</h3>
          {this.state.files.map((file) => (
            <img
              alt="Preview"
              key={file.preview}
              src={file.preview}
              style={previewStyle}
            />
          ))}
        </>
        )}
      </div>
    );
  }
}

export default FileUpload;
