/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import downloadjs from 'downloadjs';

import miscFile from '../assets/icons/miscFile.png';
import pdfFile from '../assets/icons/pdfFile.png';
import txtFile from '../assets/icons/txtFile.png';
import csvFile from '../assets/icons/csvFile.png';
import zipFile from '../assets/icons/zipFile.png';
import noImage from '../assets/images/noImage.png';

class StorageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      componentData: [],
      files: [],
    };
    this.filesFetched = false;
    this.filePath = '';
    this.server = 'http://localhost:3001/';
    this.imageTypes = [
      'jpeg',
      'jpg',
      'png',
      'gif',
    ];
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });
    console.log(`id: ${id}`);
    this.loadComponentData(id);
    this.getFileHeaders(id);
    console.log(`filesFetched: ${this.filesNotFetched}`);
  }

  getFileHeaders = (id) => {
    if (!this.filesFetched) {
      axios.get(`/api/getFileHeaders/${id}`)
      // handle success
        .then((response) => {
          console.log('Loaded file headers');
          console.log(response.data.files);
          this.filesFetched = true;
          this.setState({ files: response.data.files });
          return response;
        })

      // handle error
        .catch((error) => {
          console.log(error);
        });
    }
  }

  loadComponentData = (id) => {
    this.getComponentData(id).then((data) => {
      console.log('data:');
      console.log(data.component);

      if (data.component === false) {
        console.log('data.component empty!');
        return;
      }

      this.filePath = `${data.filePath + data.component[0].productId}\\`;
      console.log(`filePath: ${this.filePath}`);
      if (data !== false) {
        const currentData = this.state.componentData;
        for (let i = 0; i < data.component.length; i += 1) {
          currentData.push(data.component[i]);
        }
        this.setState({ componentData: currentData });
        console.log(this.state.componentData);
      } else {
        console.log(`Component id: ${id} not found!`);
      }
    });
  }

  getComponentData = (id) => {
    console.log('GetComponetData!');
    const promiseComponentData = axios.get(`/api/getComponent/${id}`)
      // handle success
      .then((response) => {
        console.log('Loaded data');
        return response.data.data;
      })

      // handle error
      .catch((error) => {
        console.log(error);
      });

    console.log(`promiseComponentData: ${promiseComponentData}`);
    return promiseComponentData;
  };

  handleDownload = async (file) => {
    // const res = await fetch(`${`/api/getFile/${this.state.id}`'/'${file}`);
    const res = await fetch(`/api/getFile/${this.state.id}/${file}`);
    const blob = await res.blob();
    downloadjs(blob, file);
  }

  onDownloadButtonClick = () => {
    console.log('Btn clicked');
    this.handleDownload();
  }

  fileClicked = (e) => {
    console.log(`file clicked! file: ${e.target.id}`);
    this.handleDownload(e.target.id);
  }

  getFilePreview = (file) => {
    let filePath = miscFile;
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
      borderRadius: '5%',
      border: 'solid',
      borderWidth: '1px',
    };
    console.log(file.split('.').pop().toLowerCase());
    if (file.split('.').pop().toLowerCase() === 'zip'
        || file.split('.').pop().toLowerCase() === 'zip'
        || file.split('.').pop().toLowerCase() === '7z'
        || file.split('.').pop().toLowerCase() === 'rar'
        || file.split('.').pop().toLowerCase() === 'gz') {
      filePath = zipFile;
    } else if (file.split('.').pop().toLowerCase() === 'pdf') {
      filePath = pdfFile;
    } else if (file.split('.').pop().toLowerCase() === 'txt') {
      filePath = txtFile;
    } else if (file.split('.').pop().toLowerCase() === 'csv'
              || file.split('.').pop().toLowerCase() === 'xls'
              || file.split('.').pop().toLowerCase() === 'xlsx') {
      filePath = csvFile;
    } else {
      filePath = miscFile;
    }

    return (
      <div style={{ 'margin-bottom': '10px'}}>
        <img src={filePath} style={previewStyle} id={file} onClick={this.fileClicked} />
        <b style={{ 'margin-left': '10px' }}>{file}</b>
      </div>
    );
  }

  generateFileView = () => {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
      borderRadius: '5%',
      border: 'solid',
      borderWidth: '1px',
    };

    if (this.state.componentData.length > 0) {
      this.fileView = (
        <div style={{ 'margin-bottom': '10px' }}>
          {this.state.files.map((file) => {
            if (this.imageTypes.includes(file.split('.').pop().toLowerCase())) {
              const path = `${this.server + this.state.id}/${file}`;

              return (
                <div  style={{ 'margin-bottom': '10px' }}>
                  <img src={path} style={previewStyle} id={file} onClick={this.fileClicked} />
                  <b style={{ 'margin-left': '10px' }}>{file}</b>
                </div>
              );
            }

            // If file is not image
            return this.getFilePreview(file);
          })}
        </div>
      );
    } else {
      this.fileView = (<div><b>NO FILES</b></div>);
    }
  }

  generateView = () => {
    if (this.state.componentData.length > 0) {
      this.table = (
        <div>
          {' '}
          <b>Part number</b>
          <p>{this.state.componentData[0].productId}</p>
          {' '}
          <b>Name</b>
          <p>{this.state.componentData[0].name}</p>
          {' '}
          <b>Description</b>
          <p>{this.state.componentData[0].description}</p>
          {' '}
          <b>Manufacturer</b>
          <p>{this.state.componentData[0].manufacturer}</p>
          {' '}
          <b>Package</b>
          <p>{this.state.componentData[0].package}</p>
          {' '}
          <b>Location</b>
          <p>{this.state.componentData[0].location}</p>
          {' '}
          <b>Quantity</b>
          <p>{this.state.componentData[0].quantity}</p>
          {' '}
          <b>Created</b>
          <p>{this.state.componentData[0].created}</p>
          {' '}
        </div>
      );
    } else {
      this.table = (<div><b>NO DATA</b></div>);
    }
  }

  generateImageView = () => {
    const imageStyle = {
      display: 'inline',
      width: 200,
      height: 200,
      borderRadius: '5%',
      border: 'solid',
      borderWidth: '1px',
    };

    if (this.state.componentData.length > 0 && this.state.componentData[0].thumbnail !== '') {
      this.imageView = (
        <img style={imageStyle} src={`${this.server + this.state.id}/${this.state.componentData[0].thumbnail}`}/>
      );
    } else {
      this.imageView = (
        <img style={imageStyle} src={noImage}/>
      );
    }
  }

  /*
  generateTable = () => {
    if (this.state.componentData.length > 0) {
    const columns = Object.keys(this.state.componentData[0]).map((key, id)=>{
      console.log("key: " + key + ", id: " + id);
      return {
        Header: key,
        accessor: key
      }
    })
  }
  }
  */

  render() {
    this.generateView();
    this.generateFileView();
    this.generateImageView();
    // this.generateTable();

    return (
      <div>
        <h2 style={{'text-align':'center'}}>
          {this.state.id}
        </h2>
        <p>{' '}</p>
        <div style={{'text-align':'center'}}>
          {this.imageView}
        </div>
        <p>{' '}</p>
        {this.table}
        <b>Files:</b>
        <div style={{ margin: '10px' }}>
          {this.fileView}
        </div>
      </div>
    );
  }
}

export default StorageItem;
