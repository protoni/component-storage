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
import cloneDeep from 'lodash/cloneDeep';
import FileUpload from './FileUpload.jsx';
import ComponentAddTabs from './ComponentAddTabs.jsx';
import './css/ComponentAdd.css';

// Timeout for saving file data to database ( seconds )
const FILE_UPLOAD_TIMEOUT = 60;

// Timeout for saving component data to database ( seconds )
const DATA_UPLOAD_TIMEOUT = 60;

// Timeout for loading component data from database ( seconds )
const DATA_DOWNLOAD_TIMEOUT = 60;

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

    // Current item data
    this.data = [];

    // Saved original data before editing
    this.originalData = {};

    // Has the original data saved already
    this.originalDataSaved = false;

    // Component data succesfully added to database
    this.dataAdded = false;
  }

  componentDidMount() {
    // this.getPartnumbers();
    console.log('ComponentAdd mounted!');
    this.loadData();
  }

  loadData = async () => {
    for (let i = 0; i < DATA_DOWNLOAD_TIMEOUT; i += 1) {
      console.log('Loading ComponentEdit data!');
      if (this.data.length > 0) {
        const obj = {
          idValue: this.data[0].productId,
          nameValue: this.data[0].name,
          descValue: this.data[0].description,
          manufValue: this.data[0].manufacturer,
          quantityValue: this.data[0].quantity,
          packageValue: this.data[0].package,
          locationValue: this.data[0].location,
          commentValue: this.data[0].comment,
          categoryValue: this.data[0].category,
        };

        this.setState({ formValues: obj });

        // Save original data
        if (!this.originalDataSaved) {
          this.originalDataSaved = true;

          // Create a copy object and save
          const obj2 = cloneDeep(obj);
          this.originalData = obj2;
        }
        return;
      }

      // eslint-disable-next-line no-await-in-loop
      await this.sleep(1000);
    }

    console.log('Timeout loading ComponentEdit data!');
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
    console.log("File removed! New files:");
    console.log(newFiles);
  }

  // Callback function
  onThumbnailSelect = (fileSelected) => {
    this.thumbnailFile = fileSelected;
    console.log(`ComponentAdd! Thumbnail selected: ${this.thumbnailFile}`);
  }

  // Callback function
  callbackTabChange = (tab) => {
    console.log(`Tab changed to: ${tab}`);
    console.log("obj:");
    console.log(this.state.formValues)
    this.setState({ currentTab: tab });
  }

  edit = (componentData) => {
    console.log('Adding!');
    axios.post('/api/editComponent', {
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
    this.edit(data);
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

    const items = Object.values(formValues);
    const origItems = Object.values(this.originalData);

    if (items.length !== origItems.length) {
      return false;
    }

    for (let i = 0; i < items.length; i += 1) {
      if (items[i] !== origItems[i]) {
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
    this.cleanup();
    this.closeModal();

    console.log('Waiting for the data to upload to database..');
    await this.waitDataUpload();
    console.log('Data uploaded to the database!');

    // Call parent to fetch new data
    this.onAddFunc();
  }

  promptAddNoBtn = () => {
    this.setState({ showAddPrompt: false });
  }

  generateOnClosePrompt = () => {
    console.log(`showOnClosePrompt: ${this.state.showOnClosePrompt}`);
    if (this.state.showOnClosePrompt) {
      this.onClosePrompt = (
        <div style={{
          position: 'absolute', right: '40px', top: '10px', fontSize: '0.5em',
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
            <b>Are you sure?</b>
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

  revertChanges = () => {
    const obj = cloneDeep(this.originalData);
    this.setState({ formValues: obj });
  }

  cleanup = () => {
    // Set currentTab to component
    this.setState({ currentTab: this.defaultTab });

    // Un-do changes
    this.revertChanges();

    // Set modal close states
    this.closeModal();
  }

  generateForms = () => {
    this.forms = (
      <div>
        <b>Part number</b>
        <InputGroup size="sm" className="mb-3">
          <FormControl onChange={this.handleIdChange} value={this.state.formValues.idValue} disabled aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <b>Name</b>
        <InputGroup size="sm" className="mb-3">
          <FormControl onChange={this.handleNameChange} value={this.state.formValues.nameValue} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <b>Description</b>
        <InputGroup size="sm" className="mb-3">
          <FormControl onChange={this.handleDescChange} value={this.state.formValues.descValue} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <b>Manufacturer</b>
        <InputGroup size="sm" className="mb-3">
          <FormControl onChange={this.handleManufChange} value={this.state.formValues.manufValue} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <b>Quantity</b>
        <InputGroup size="sm" className="mb-3">
          <FormControl onChange={this.handleQuantityChange} value={this.state.formValues.quantityValue} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <b>Package</b>
        <InputGroup size="sm" className="mb-3">
          <FormControl onChange={this.handlePackageChange} value={this.state.formValues.packageValue} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <b>Location</b>
        <InputGroup size="sm" className="mb-3">
          <FormControl onChange={this.handleLocationChange} value={this.state.formValues.locationValue} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
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
          <FormControl value={this.state.formValues.categoryValue} aria-describedby="basic-addon1" />
        </InputGroup>

        <b>Comment</b>
        <InputGroup size="lg" className="mb-3">
          <FormControl as="textarea" onChange={this.handleCommentChange} value={this.state.formValues.commentValue} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

      </div>
    );
  }

  render() {
    const {
      show,
      onHide,
      onAdd,
      data,
      files,
    } = this.props;
    this.onHideFunc = onHide;
    this.onAddFunc = onAdd;
    this.data = data;
    this.generateOnClosePrompt();
    this.generateAddPrompt();
    this.generateForms();

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
            <div className="header">
              Edit
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
          {this.forms}

          <div>
            <div style={{ marginTop: 10, marginBottom: 10, display: 'flex' }}>
              <Button variant="primary" onClick={this.onAddButtonClick}>
                Save
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
            files={files}
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
  data: PropTypes.PropTypes.shape([]),
  files: PropTypes.PropTypes.shape([]),
};

ComponentAdd.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onAdd: PropTypes.func,
  data: PropTypes.PropTypes.shape([]),
  files: PropTypes.PropTypes.shape([]),
};

export default ComponentAdd;
