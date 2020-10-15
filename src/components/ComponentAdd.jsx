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
import ComponentAddTabs from './ComponentAddTabs.jsx';
import './css/ComponentAdd.css';

// Timeout for saving file data to database ( seconds )
const FILE_UPLOAD_TIMEOUT = 60;

// Timeout for saving component data to database ( seconds )
const DATA_UPLOAD_TIMEOUT = 60;

class ComponentAdd extends React.Component {
  constructor(props) {
    super(props);
    this.defaultTab = 'component';
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
        commentValue: '',
        categoryValue: '',
      },
      addButtonClicked: false,
      showOnClosePrompt: false,
      showAddPrompt: false,
      currentTab: this.defaultTab,
    };
    this.show = true;
    this.addButtonClicked = false;
    this.files = [];
    this.filesDropped = 0;
    this.thumbnailFile = '';
    this.onHideFunc = null;
    this.onAddFunc = null;
    this.formChanged = false;
    this.nextPartNumbers = [];
    this.nextPartNumbersFetched = false;
    this.partNumLoaded = false;

    // Component data succesfully added to database
    this.dataAdded = false;
  }

  componentDidMount() {
    // this.getPartnumbers();
    console.log('ComponentAdd mounted!');
  }

  setPartNumber = (currentTab) => {
    const { formValues } = this.state;
    for (let i = 0; i < this.nextPartNumbers.length; i += 1) {
      if (this.nextPartNumbers[i].type === currentTab) {
        formValues.idValue = this.nextPartNumbers[i].partNum;
      }
    }
    this.setState({ formValues });
  }

  getPartnumbers = () => {
    axios.get('/api/getPartnumbers/')
      // handle success
      .then((response) => {
        this.nextPartNumbers = response.data.partNums;
        this.setPartNumber(this.state.currentTab);

        console.log('Partnum data:');
        console.log(response.data);

        return response.data;
      })

      // handle error
      .catch((error) => {
        console.log(error);
      });
  }

  loadPartNum = () => {
    console.log("this.partNumLoaded: " + this.partNumLoaded)
    if (!this.partNumLoaded) {
      this.partNumLoaded = true;
      console.log("-------------")
      this.getPartnumbers();
      this.setPartNumber(this.defaultTab);
    }
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
    this.filesDropped += filesUploaded.length;
    console.log(`Incremented file counter by: ${filesUploaded}`);
  }

  // Callback function
  onFileRemove = (newFiles) => {
    this.filesDropped = newFiles.length;
    this.filesToStore = newFiles;
    console.log('Decresed fukesUploaded counter by: ' + newFiles.length)
  }

  // Callback function
  onThumbnailSelect = (fileSelected) => {
    this.thumbnailFile = fileSelected;
    console.log(`ComponentAdd! Thumbnail selected: ${this.thumbnailFile}`);
  }

  // Callback function
  callbackTabChange = (tab) => {
    console.log(`Tab changed to: ${tab}`);

    this.setState({ currentTab: tab });
    this.setPartNumber(tab);
  }

  add = (componentData) => {
    console.log('Adding!');
    axios.post('/api/addComponent', {
      data: componentData,
    })
      .then((response) => {
        console.log(`response:  ${response}`);
        this.dataAdded = true;
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }

  printValues = () => {
    const items = Object.values(this.state.formValues);
    // const values = Object.values(fruits)

    console.log('form values: ');
    for (let i = 0; i < items.length; i += 1) {
      console.log(items[i]);
    }

    console.log(`file count: ${this.filesDropped}`);
  }

  handleIdChange = (evt) => {
    this.printValues();
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

  handleCommentChange = (evt) => {
    const { formValues } = this.state;
    formValues.commentValue = evt.target.value;
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

  waitDataUpload = async () => {
    for (let i = 0; i < DATA_UPLOAD_TIMEOUT; i += 1) {
      if (this.dataAdded) {
        return;
      }

      /* eslint-disable no-await-in-loop */
      await this.sleep(1000);
    }

    console.log('Waiting for data to upload timed out!');
  }

  sendComponentData = async (data) => {
    await this.waitFileUpload();
    console.log(`this.filesDropped: ${this.filesDropped}, this.files.length: ${this.files.length}`);
    data.files = this.files;
    this.add(data);
  }

  onAddButtonClick = () => {
    this.setState({ showAddPrompt: true });
  }

  addComponentData = () => {
    const { formValues, currentTab } = this.state;
    const {
      idValue,
      nameValue,
      descValue,
      manufValue,
      quantityValue,
      packageValue,
      locationValue,
      commentValue,
      categoryValue,
    } = formValues;

    console.log(
      `${'clicked! '
      + 'ID: '}${idValue
      }, Name: ${nameValue
      }, Description: ${descValue
      }, Manufacturer: ${manufValue}`,
      `, Quantity: ${quantityValue}`,
      `, Package: ${packageValue}`,
      `, Location: ${locationValue}`,
      `, Comment: ${commentValue}`,
      `, Category: ${categoryValue}`,
      `, Type: ${currentTab}`,
      `, Thumbnail: ${this.thumbnailFile}`,
    );

    const componentData = {
      id: idValue,
      name: nameValue,
      description: descValue,
      manufacturer: manufValue,
      quantity: quantityValue,
      package: packageValue,
      location: locationValue,
      comment: commentValue,
      category: categoryValue,
      type: currentTab,
      files: this.files,
      thumbnail: this.thumbnailFile,
    };

    console.log(componentData);

    this.sendComponentData(componentData);

    this.isLoading = true;

    this.setState({ addButtonClicked: true });
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  canClose = () => {
    const { formValues } = this.state;

    // Exclude part number check because it is retreived automatically from the backend
    delete formValues.idValue;

    const items = Object.values(formValues);
    // const values = Object.values(fruits)

    for (let i = 0; i < items.length; i += 1) {
      console.log(items[i]);
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
    this.setState({
      showModal: false,
      showOnClosePrompt: false,
      showAddPrompt: false,
      currentTab: this.defaultTab,
    });

    this.onHideFunc();
    this.partNumLoaded = false;
    this.dataAdded = false;
  }

  onModalClose = () => {
    if (this.canClose()) {
      this.closeModal();
    } else {
      console.log('Unsaved changes!');
      this.setState({ showOnClosePrompt: true });
    }
    this.partNumLoaded = false;
    this.dataAdded = false;
  }

  promptCloseYesBtn = (evt) => {
    this.cleanup();
    this.closeModal();
  }

  promptCloseNoBtn = (evt) => {
    this.setState({ showOnClosePrompt: false });
  }

  // Called when the 'add component' confirm button has been pressed
  promptAddYesBtn = async () => {
    this.addComponentData();
    this.closeModal();

    console.log('Waiting for the data to upload to database..');
    await this.waitDataUpload();
    console.log('Data uploaded to the database!');

    // Get next part numbers
    this.getPartnumbers();

    // Call parent to fetch new data
    this.onAddFunc();

    // Cleanup
    this.cleanup();
  }

  promptAddNoBtn = () => {
    this.setState({ showAddPrompt: false });
  }

  generateOnClosePrompt = () => {
    console.log(`showOnClosePrompt: ${this.state.showOnClosePrompt}`);
    if (this.state.showOnClosePrompt) {
      this.onClosePrompt = (
        <div style={{
          position: 'absolute', right: '40px', top: '50px', fontSize: '0.5em',
        }}
        >
          <div>
            <b>
              Unsaved changes!
            </b>
          </div>
          <div>
            {'Discard changes and close?'}
            {' '}
            <Button onClick={this.promptCloseYesBtn} size="sm" variant="outline-danger">Yes</Button>
            {' '}
            <Button onClick={this.promptCloseNoBtn} size="sm" variant="outline-dark">No</Button>
            {' '}
          </div>
        </div>
      );
    } else {
      this.onClosePrompt = <div />;
    }
  }

  generateAddPrompt = () => {
    if (this.state.showAddPrompt) {
      this.addPrompt = (
        <div style={{ margin: 'auto' }}>
          <div>
            <b>{'Are you sure?'}</b>
            {' '}
            <Button onClick={this.promptAddYesBtn} size="sm" variant="outline-danger">Yes</Button>
            {' '}
            <Button onClick={this.promptAddNoBtn} size="sm" variant="outline-dark">No</Button>
            {' '}
          </div>
        </div>
      );
    } else {
      this.addPrompt = <div />;
    }
  }

  cleanFormValues = () => {
    const newFormValues = {
      idValue: '',
      nameValue: '',
      descValue: '',
      manufValue: '',
      quantityValue: '',
      packageValue: '',
      locationValue: '',
      commentValue: '',
      categoryValue: '',
    };

    this.setState({ formValues: newFormValues });
  }

  cleanFilesArray = () => {
    this.filesDropped = 0;
    this.thumbnailFile = '';
    console.log('Cleaned files array!');
  }

  cleanup = () => {
    // Set currentTab to component
    this.setState({ currentTab: this.defaultTab });

    // Clean state.formValues
    this.cleanFormValues();

    // Remove files from the files array
    this.cleanFilesArray();

    // Set modal close states
    this.closeModal();
  }

  render() {
    const { show, onHide, onAdd } = this.props;
    this.onHideFunc = onHide;
    this.onAddFunc = onAdd;
    this.generateOnClosePrompt();
    this.generateAddPrompt();
    this.loadPartNum();

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
        <ComponentAddTabs onTabChange={this.callbackTabChange} />
        <Modal.Header>
          <Modal.Title>
            <div className="header">
              Add
              {' '}
              {this.state.currentTab}
            </div>
            <div>
              {this.onClosePrompt}
              <button onClick={this.onModalClose} className="close" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <b>Part number</b>
          <InputGroup size="sm" className="mb-3">
            <FormControl onChange={this.handleIdChange} value={this.state.formValues.idValue} disabled aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
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

          <b>Comment</b>
          <InputGroup size="lg" className="mb-3">
            <FormControl as="textarea" onChange={this.handleCommentChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <div>
          <div style={{ marginTop: 10, marginBottom: 10, display: 'flex' }}>
            <Button variant="primary" onClick={this.onAddButtonClick}>
              Add
            </Button>
            {this.addPrompt}
          </div>
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
  onAdd: PropTypes.func,
};

ComponentAdd.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onAdd: PropTypes.func,
};

export default ComponentAdd;
