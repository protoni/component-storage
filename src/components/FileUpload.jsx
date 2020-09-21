/* eslint-disable no-console */
import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import request from 'superagent';
import miscFile from '../assets/icons/miscFile.png';
import pdfFile from '../assets/icons/pdfFile.png';
import txtFile from '../assets/icons/txtFile.png';
import csvFile from '../assets/icons/csvFile.png';
import zipFile from '../assets/icons/zipFile.png';

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
      .attach('file', file)
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

  bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
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

            {this.state.files.map((file) => {
              console.log(`type: ${file.type}`);

              {/* Create image file view */}
              if (file.type.includes('image')) {
                return (
                  <div style={{ margin: '30px' }}>
                    <img
                      alt="Preview"
                      key={file.preview}
                      src={file.preview}
                      style={previewStyle}
                    />
                    <b>
                      {' '}{file.name}
                      {' ( '}
                      {this.bytesToSize(file.size)}
                      {' )'}
                    </b>
                  </div>
                );
              }

              {/* Create .pdf file view */}
              if (file.type.includes('pdf')) {
                return (
                  <div style={{ margin: '15px' }}>
                    <img
                      alt="Preview"
                      key={file.preview}
                      src={pdfFile}
                      style={previewStyle}
                    />
                    <b>
                      {file.name}
                      {' ( '}
                      {this.bytesToSize(file.size)}
                      {' )'}
                    </b>
                  </div>
                );
              }

              {/* Create .zip file view */}
              if (file.type.includes('zip')) {
                return (
                  <div style={{ margin: '15px' }}>
                    <img
                      alt="Preview"
                      key={file.preview}
                      src={zipFile}
                      style={previewStyle}
                    />
                    <b>
                      {file.name}
                      {' ( '}
                      {this.bytesToSize(file.size)}
                      {' )'}
                    </b>
                  </div>
                );
              }

              {/* Create .csv file view */}
              if (file.type.includes('excel')) {
                return (
                  <div style={{ margin: '15px' }}>
                    <img
                      alt="Preview"
                      key={file.preview}
                      src={csvFile}
                      style={previewStyle}
                    />
                    <b>
                      {file.name}
                      {' ( '}
                      {this.bytesToSize(file.size)}
                      {' )'}
                    </b>
                  </div>
                );
              }

              {/* Create .txt file view */}
              if (file.type.includes('text')) {
                return (
                  <div style={{ margin: '15px' }}>
                    <img
                      alt="Preview"
                      key={file.preview}
                      src={txtFile}
                      style={previewStyle}
                    />
                    <b>
                      {file.name}
                      {' ( '}
                      {this.bytesToSize(file.size)}
                      {' )'}
                    </b>
                  </div>
                );
              }

              {/* Create file view for all the other unknown file types*/}
              return (
                <div style={{ margin: '15px' }}>
                  <img
                    alt="Preview"
                    key={file.preview}
                    src={miscFile}
                    style={previewStyle}
                  />
                  <b>
                    {file.name}
                    {' ( '}
                    {this.bytesToSize(file.size)}
                    {' )'}
                  </b>
                </div>
              );
            })}

        </>
        )}
      </div>
    );
  }
}

export default FileUpload;
