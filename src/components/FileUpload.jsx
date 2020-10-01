/* eslint-disable no-console */
import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import axios from 'axios';
import request from 'superagent';
import PropTypes from 'prop-types';
import { InputGroup } from 'react-bootstrap';

import miscFile from '../assets/icons/miscFile.png';
import pdfFile from '../assets/icons/pdfFile.png';
import txtFile from '../assets/icons/txtFile.png';
import csvFile from '../assets/icons/csvFile.png';
import zipFile from '../assets/icons/zipFile.png';
import './css/FileUpload.css';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.files = [];
    this.partNum = '';
    this.addButtonClicked = false;
    this.onUploadFunc = null;
    this.onFileDropFunc = null;
    this.onThumbnailSelectFunc = null;
    this.onFileRemoveFunc = null;
    this.thumbnailFile = '';
  }

  componentDidUpdate() {
    this.shouldUpload();
    console.log('Component updated!');
  }

  shouldUpload = () => {
    if (this.addButtonClicked) {
      this.addButtonClicked = false;
      this.upload(this.state.files);
      this.informParentForUpload();
    }
  }

  informParentForUpload = () => {
    let filesObj = {};
    const files = [];

    for (let i = 0; i < this.state.files.length; i += 1) {
      filesObj = {
        name: this.state.files[i].name,
        size: this.state.files[i].size,
      };
      files.push(filesObj);
    }

    console.log("Data obj:");
    console.log(files);
    this.onUploadFunc(files);
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
  /*
  onDrop = (files) => {
    // POST to a test endpoint for demo purposes
    console.log('Files dropped!');

    const req = request.post('/api/saveFiles');

    files.forEach((file) => {
      this.files.push(file);

      console.log(`Name: ${file.name}`);
      console.log(file);
      console.log(file.data);
      req.attach(file.name, file);
    });

    // this.saveFiles(files);

    // req.end();
  }
  */

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

  isDuplicate = (file) => {
    const currentArr = this.state.files;
    for (let i = 0; i < currentArr.length; i += 1) {
      if (currentArr[i].name === file.name) {
        return true;
      }
    }

    return false;
  }

  /*
  addToList = (files) => {
    console.log("files before:");
    console.log(files);
    files.forEach((file) => {
      file.partNum = this.partNum;
      this.files.push(file);
    });
    console.log("files after:");
    console.log(this.files);
  }
  */
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

    // Update state file array
    const currentArr = this.state.files;
    for (let i = 0; i < previewFiles.length; i += 1) {
      if (!this.isDuplicate(previewFiles[i])) {
        currentArr.push(previewFiles[i]);
      } else {
        console.log(`Duplicate file! Name: ${previewFiles[i].name}`);
      }
    }

    this.setState({
      files: currentArr,
    });
    this.onFileDropFunc(currentArr.length);
    // this.files = previewFiles;

    // console.log("previewFiles:");
    // console.log(previewFiles);

    // this.upload(previewFiles);
    // this.addToList(previewFiles);
    console.log('files after:');
    console.log(this.state.files);
  }

  bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
  }

  onRadioButtonClick = (evt) => {
    console.log(`Radio button selected: ${evt.target.value}`);
    this.thumbnailFile = evt.target.value;
    this.onThumbnailSelectFunc(this.thumbnailFile);
  }

  onFileDeleteClick = (evt) => {
    console.log("File delete button clicked! File: " + evt.target.value);

    let currentFiles = this.state.files;
    const newFiles = [];
    for (let i = 0; i < currentFiles.length; i += 1) {
      if (currentFiles[i].name !== evt.target.value) {
        newFiles.push(currentFiles[i]);
      } else {
        console.log("Deleted file: " + currentFiles[i].name);
      }
    }

    this.setState({ files: newFiles });
    this.onFileRemoveFunc(newFiles);
  }

  render() {
    const {
      partNum, addButtonClicked, onUpload, onFileDrop, onThumbnailSelect, onFileRemove,
    } = this.props;
    this.partNum = partNum;
    this.addButtonClicked = addButtonClicked;
    this.onUploadFunc = onUpload;
    this.onFileDropFunc = onFileDrop;
    this.onThumbnailSelectFunc = onThumbnailSelect;
    this.onFileRemoveFunc = onFileRemove;

    console.log(`FileUpload! addButtonClicked: ${addButtonClicked}`);
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
      borderRadius: '5%',
      border: 'solid',
      borderWidth: '1px',
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
              <div>
                {isDragActive ? (
                  <p className="hoveredDropZone">Drop files here...</p>
                ) : (
                  <p className="dropZone">
                    Drop files here or click to upload.
                  </p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
        {this.state.files.length > 0 && (
        <>
          <h3>Previews</h3>
          <b>( Select thumbnail image with the radio button )</b>
            {this.state.files.map((file) => {
              console.log(`type: ${file.type}`);
              /* Create image file view */
              if (file.type.includes('image')) {
                return (
                  <div className="previewMiscFile">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Radio
                          onChange={this.onRadioButtonClick}
                          value={file.name}
                          name="thumbnailSelect"
                          aria-label="Thumbnail select"
                        />
                      </InputGroup.Prepend>
                      <div style={{ margin: '30px' }}>
                        <img
                          alt="Preview"
                          key={file.preview}
                          src={file.preview}
                          style={previewStyle}
                        />
                        <b>
                          {' '}
                          {file.name}
                          {' ( '}
                          {this.bytesToSize(file.size)}
                          {' )'}
                        </b>
                      </div>
                      <button onClick={this.onFileDeleteClick} value={file.name} className="close" />
                    </InputGroup>
                  </div>
                );
              }

              /* Create .pdf file view */
              if (file.type.includes('pdf')) {
                return (
                  <div className="previewMiscFile">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Radio disabled aria-label="Radio button for following text input" />
                      </InputGroup.Prepend>
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
                      <button onClick={this.onFileDeleteClick} value={file.name} className="close" />
                    </InputGroup>
                  </div>
                );
              }

              /* Create .zip file view */
              if (file.type.includes('zip')) {
                return (
                  <div className="previewMiscFile">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Radio disabled aria-label="Radio button for following text input" />
                      </InputGroup.Prepend>
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
                      <button onClick={this.onFileDeleteClick} value={file.name} className="close" />
                    </InputGroup>
                  </div>
                );
              }

              /* Create .csv file view */
              if (file.type.includes('excel')) {
                return (
                  <div className="previewMiscFile">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Radio disabled aria-label="Radio button for following text input" />
                      </InputGroup.Prepend>
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
                      <button onClick={this.onFileDeleteClick} value={file.name} className="close" />
                    </InputGroup>
                  </div>
                );
              }

              /* Create .txt file view */
              if (file.type.includes('text')) {
                return (
                  <div className="previewMiscFile">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Radio disabled aria-label="Radio button for following text input" />
                      </InputGroup.Prepend>
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
                      <button onClick={this.onFileDeleteClick} value={file.name} className="close" />
                    </InputGroup>
                  </div>
                );
              }

              /* Create file view for all the other unknown file types */
              return (
                <div className="previewMiscFile">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Radio disabled aria-label="Radio button for following text input" />
                    </InputGroup.Prepend>
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
                    <button onClick={this.onFileDeleteClick} value={file.name} className="close" />
                  </InputGroup>
                </div>
              );
            })}
        </>
        )}
      </div>
    );
  }
}

FileUpload.defaultProps = {
  partNum: PropTypes.string,
  addButtonClicked: PropTypes.bool,
  onUpload: PropTypes.func,
  onFileDrop: PropTypes.func,
  onThumbnailSelect: PropTypes.func,
  onFileRemove: PropTypes.func,
};

FileUpload.propTypes = {
  partNum: PropTypes.string,
  addButtonClicked: PropTypes.bool,
  onUpload: PropTypes.func,
  onFileDrop: PropTypes.func,
  onThumbnailSelect: PropTypes.func,
  onFileRemove: PropTypes.func,
};

export default FileUpload;
