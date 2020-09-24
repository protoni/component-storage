/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import downloadjs from 'downloadjs';

class StorageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      componentData: [],
      files: [],
    };
    this.filesFetched = false;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });
    console.log(`id: ${id}`);
    this.loadComponentData(id);
    this.getFileHeaders(id);
    console.log("filesFetched: " + this.filesNotFetched);
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
      console.log(`data: ${data}`);
      if (data !== false) {
        const currentData = this.state.componentData;
        for (let i = 0; i < data.length; i += 1) {
          currentData.push(data[i]);
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
    console.log("file clicked! file: " + e.target.id);
    this.handleDownload(e.target.id);
  }

  generateFileView = () => {
    if (this.state.componentData.length > 0) {
      this.fileView = (
        <div>
          {this.state.files.map((file) => (
            <div id={file} onClick={this.fileClicked}>
              {file}
            </div>
          ))}
        </div>
      );
    } else {
      this.fileView = (<div><b>NO FILES</b></div>);
    }
  }

  generateView() {
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

  render() {
    this.generateView();
    this.generateFileView();

    return (
      <div>
        <h2>
          Item
          {' '}
          {this.state.id}
          <Button variant="primary" onClick={this.onDownloadButtonClick}>
            Download
          </Button>
        </h2>
        {this.table}
        <b>Files:</b>
        {this.fileView}
      </div>
    );
  }
}

export default StorageItem;
