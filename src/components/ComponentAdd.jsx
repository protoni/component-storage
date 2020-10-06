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
import FileUpload from './FileUpload.jsx';
import './css/ComponentAdd.css';

// ( seconds )
const FILE_UPLOAD_TIMEOUT = 60;

class ComponentAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      formValues: {
        idValue: '',
        nameValue: '',
        descValue: '',
        manufValue: '',
        quantityValue: '',
        packageValue: '',
        locationValue: '',
      },
      addButtonClicked: false,
      showOnClosePrompt: false,
    };
    this.show = true;
    this.addButtonClicked = false;
    this.files = [];
    this.filesDropped = 0;
    this.thumbnailFile = '';
    this.onHideFunc = null;
    this.formChanged = false;
  }

  // Callback function
  onUpload = (data) => {
    this.setState({ addButtonClicked: false });
    this.files = data;
    console.log('Uploaded!');
    console.log(data);
  }

  // Callback function
  onFileDrop = (filesUploaded) => {
    this.filesDropped += filesUploaded;
    console.log(`Incremented file counter by: ${filesUploaded}`);
  }

  // Callback function
  onFileRemove = (newFiles) => {
    this.filesDropped = newFiles.length;
    this.filesToStore = newFiles;
  }

  // Callback function
  onThumbnailSelect = (fileSelected) => {
    this.thumbnailFile = fileSelected;
    console.log(`ComponentAdd! Thumbnail selected: ${this.thumbnailFile}`);
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
    const { formValues } = this.state;
    formValues.idValue = evt.target.value;
    this.setState({ formValues });
  }

  handleNameChange = (evt) => {
    const { formValues } = this.state;
    formValues.nameValue = evt.target.value;
    this.setState({ formValues });
  }

  handleDescChange = (evt) => {
    const { formValues } = this.state;
    formValues.descValue = evt.target.value;
    this.setState({ formValues });
  }

  handleManufChange = (evt) => {
    const { formValues } = this.state;
    formValues.manufValue = evt.target.value;
    this.setState({ formValues });
  }

  handleQuantityChange = (evt) => {
    const { formValues } = this.state;
    formValues.quantityValue = evt.target.value;
    this.setState({ formValues });
  }

  handlePackageChange = (evt) => {
    const { formValues } = this.state;
    formValues.packageValue = evt.target.value;
    this.setState({ formValues });
  }

  handleLocationChange = (evt) => {
    const { formValues } = this.state;
    formValues.locationValue = evt.target.value;
    this.setState({ formValues });
  }

  waitFileUpload = async () => {
    for (let i = 0; i < FILE_UPLOAD_TIMEOUT; i += 1) {
      if (this.filesDropped === this.files.length) {
        return;
      }

      /* eslint-disable no-await-in-loop */
      await this.sleep(1000);
    }

    console.log('Waiting for files to upload timed out!');
  }

  addComponentData = async (data) => {
    await this.waitFileUpload();
    console.log(`this.filesDropped: ${this.filesDropped}, this.files.length: ${this.files.length}`);
    data.files = this.files;
    this.add(data);
  }

  onAddButtonClick = () => {
    console.log(
      `${'clicked! '
      + 'ID: '}${this.state.formValues.idValue
      }, Name: ${this.state.formValues.nameValue
      }, Description: ${this.state.formValues.descValue
      }, Manufacturer: ${this.state.formValues.manufValue}`,
      `, Quantity: ${this.state.formValues.quantityValue}`,
      `, Package: ${this.state.formValues.packageValue}`,
      `, Location: ${this.state.formValues.locationValue}`,
      `, Thumbnail: ${this.thumbnailFile}`,
    );

    const componentData = {
      id: this.state.formValues.idValue,
      name: this.state.formValues.nameValue,
      description: this.state.formValues.descValue,
      manufacturer: this.state.formValues.manufValue,
      quantity: this.state.formValues.quantityValue,
      package: this.state.formValues.packageValue,
      location: this.state.formValues.locationValue,
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

  canClose = () => {
    const items = Object.values(this.state.formValues);
    // const values = Object.values(fruits)

    for (let i = 0; i < items.length; i += 1) {
      if (items[i] !== '') {
        return false;
      }
    }

    if (this.filesDropped > 0) {
      return false;
    }

    return true;
  }

  closeModal = () => {
    console.log('closing..');
    this.setState({ showModal: false, showOnClosePrompt: false });
    this.onHideFunc();
  }

  onModalClose = () => {
    if (this.canClose()) {
      this.closeModal();
    } else {
      console.log('Unsaved changes!');
      this.setState({ showOnClosePrompt: true });
    }
  }

  promptYesBtn = (evt) => {
    this.closeModal();
  }

  promptNoBtn = (evt) => {
    this.setState({ showOnClosePrompt: false });
  }

  generateOnClosePrompt = () => {
    console.log('showOnClosePrompt: ' + this.state.showOnClosePrompt);
    if (this.state.showOnClosePrompt) {
      this.onClosePrompt = (
        <div style={{ position: 'absolute', right: '40px', top: '5px', fontSize: '0.5em' }}>
          <div>
            <b>
              Unsaved changes!
            </b>
          </div>
          <div>
            {'Discard changes and close?'}
            {' '}
            <Button onClick={this.promptYesBtn} size="sm" variant="outline-danger">Yes</Button>
            {' '}
            <Button onClick={this.promptNoBtn} size="sm" variant="outline-dark">No</Button>
            {' '}
          </div>
        </div>
      );
    } else {
      this.onClosePrompt = <div />;
    }
  }

  render() {
    const { show, onHide } = this.props;
    this.onHideFunc = onHide;
    this.generateOnClosePrompt();

    return (
      <Modal
        show={this.state.showModal | show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            Add
            <div>
              {this.onClosePrompt}
              <button onClick={this.onModalClose} className="close" />
            </div>
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
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Button variant="primary" onClick={this.onAddButtonClick}>
              Add
            </Button>
          </div>
          <FileUpload
            partNum={this.state.idValue}
            addButtonClicked={this.state.addButtonClicked}
            onUpload={this.onUpload}
            onFileDrop={this.onFileDrop}
            onThumbnailSelect={this.onThumbnailSelect}
            onFileRemove={this.onFileRemove}
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
