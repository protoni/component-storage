/* eslint-disable no-console */
import React from 'react';
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import FileUpload from './FileUpload.jsx'

// ( seconds )
var FILE_UPLOAD_TIMEOUT = 60;

class ComponentAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      idValue: '',
      nameValue: '',
      descValue: '',
      manufValue: '',
      quantityValue: '',
      packageValue: '',
      locationValue: '',
      addButtonClicked: false,
    };
    this.addButtonClicked = false;
    this.files = [];
    this.filesDropped = 0;
    this.thumbnailFile = '';
  }

  // Callback function
  onUpload = (data) => {
    this.setState({ addButtonClicked: false });
    //this.addButtonClicked = false;
    this.files = data.files;
    this.thumbnailFile = data.thumbnail;
    console.log("Uploaded!");
    console.log(data.files);
  }

  // Callback function
  onFileDrop = (filesUploaded) => {
    this.filesDropped += filesUploaded;
    console.log("Incremented file counter by: " + filesUploaded);
  }

  add = (componentData) => {
    console.log('Adding!');
    axios.post('/api/addComponent', {
      data: componentData,
    })
      .then((response) => {
        console.log(`response:  ${response}`);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }

  handleIdChange = (evt) => {
    this.setState({ idValue: evt.target.value });
  }

  handleNameChange = (evt) => {
    this.setState({ nameValue: evt.target.value });
  }

  handleDescChange = (evt) => {
    this.setState({ descValue: evt.target.value });
  }

  handleManufChange = (evt) => {
    this.setState({ manufValue: evt.target.value });
  }

  handleQuantityChange = (evt) => {
    this.setState({ quantityValue: evt.target.value });
  }

  handlePackageChange = (evt) => {
    this.setState({ packageValue: evt.target.value });
  }

  handleLocationChange = (evt) => {
    this.setState({ locationValue: evt.target.value });
  }

  waitFileUpload = () => {
    for (let i = 0; i < FILE_UPLOAD_TIMEOUT; i += 1) {
      if (this.filesDropped === this.files.length) {
        return;
      }

      this.sleep(1000);
    }

    console.log("Waiting for files to upload timed out!");
  }

  addComponentData = async (data) => {
    await this.waitFileUpload();
    console.log('this.filesDropped: ' + this.filesDropped + ', this.files.length: ' + this.files.length);
    data.files = this.files;
    this.add(data);
  }

  onAddButtonClick = () => {
    console.log(
      `${'clicked! '
      + 'ID: '}${this.state.idValue
      }, Name: ${this.state.nameValue
      }, Description: ${this.state.descValue
      }, Manufacturer: ${this.state.manufValue}`,
      `, Quantity: ${this.state.quantityValue}`,
      `, Package: ${this.state.packageValue}`,
      `, Location: ${this.state.locationValue}`,
    );

    const componentData = {
      id: this.state.idValue,
      name: this.state.nameValue,
      description: this.state.descValue,
      manufacturer: this.state.manufValue,
      quantity: this.state.quantityValue,
      package: this.state.packageValue,
      location: this.state.locationValue,
      files: this.files,
      thumbnail: this.thumbnailFile,
    };

    console.log(componentData);

    this.addComponentData(componentData);

    this.isLoading = true;

    this.setState({ addButtonClicked: true });
    // this.addButtonClicked = true;
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  render() {
    const { show, onHide } = this.props;
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add component
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>ID</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handleIdChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <b>Name</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handleNameChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <b>Description</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handleDescChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <b>Manufacturer</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handleManufChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <b>Quantity</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handleQuantityChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <b>Package</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handlePackageChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <b>Location</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handleLocationChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <b>Category</b>
          <InputGroup size="sm" className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title="Categories"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-describedby="basic-addon1" />
          </InputGroup>
          <div style={{marginTop: 10, marginBottom: 10 }}>
            <Button variant="primary" onClick={this.onAddButtonClick}>
              Add
            </Button>
          </div>
          <FileUpload
            partNum={this.state.idValue}
            addButtonClicked={this.state.addButtonClicked}
            onUpload={this.onUpload}
            onFileDrop={this.onFileDrop}
          />

        </Modal.Body>
      </Modal>
    );
  }
}

ComponentAdd.defaultProps = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

ComponentAdd.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default ComponentAdd;
