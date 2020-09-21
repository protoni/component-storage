/* eslint-disable no-console */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import FileUpload from './FileUpload.jsx'

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
    };
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
      location: this.state.locationValue
    };

    console.log(`data: ${componentData.id}`);

    this.add(componentData);

    this.isLoading = true;
  }

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
        <div>
            <label>
              ID:
                <input type="text" value={this.state.idValue} onChange={this.handleIdChange} />
            </label>
          </div>
          <div>
            <label>
              Name:
              <input type="text" value={this.state.nameValue} onChange={this.handleNameChange} />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input type="text" value={this.state.descValue} onChange={this.handleDescChange} />
            </label>
          </div>
          <div>
            <label>
              Manufacturer:
              <input type="text" value={this.state.manufValue} onChange={this.handleManufChange} />
            </label>
          </div>
          <div>
            <label>
              Quantity:
              <input type="text" value={this.state.quantityValue} onChange={this.handleQuantityChange} />
            </label>
          </div>
          <div>
            <label>
              Package:
              <input type="text" value={this.state.packageValue} onChange={this.handlePackageChange} />
            </label>
          </div>
          <div>
            <label>
              Location:
              <input type="text" value={this.state.locationValue} onChange={this.handleLocationChange} />
            </label>
          </div>
          <div style={{marginTop: 10, marginBottom: 10 }}>
            <Button variant="primary" onClick={this.onAddButtonClick}>
              Add
            </Button>
          </div>
          <FileUpload />
          
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
