/* eslint-disable no-console */
import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ComponentTable from './ComponentTable.jsx';
import ComponentAdd from './ComponentAdd.jsx';

class ComponentStorage extends React.Component {
  constructor(props) {
    super(props);
    this.isLoading = false;
    this.state = {
      componentData: [],
      showModal: false,
    };
    this.errors = [];
  }

  componentDidMount() {
    this.getAllData();
  }

  getComponentData = () => {
    console.log('GetAll clicked!');
    const promiseComponentData = axios.get('/api/getComponents')
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

  addError = (err) => {
    this.errors.push(err);
  }

  getAllData = () => {
    try {
      this.getComponentData().then((data) => {
        // console.log("data: " + data)
        if (!data) {
          console.log('Failed to get data!');
          this.addError('Failed to get data from the backend!');
          return;
        }
        const currentData = [];
        for (let i = 0; i < data.length; i += 1) {
          currentData.push(data[i]);
        }
        this.setState({ componentData: currentData });
        console.log(this.state.componentData);
      });
    } catch (error) {
      console.log('ComponentStorage.jsx Error! Failed to get component data!');
    }
  }

  onGetAllButtonClick = () => {
    this.getAllData();
  }

  // Callback function. Called when the 'Add component' modal closes.
  callbackModal = () => {
    console.log("CS closing")
    this.setState({ showModal: false });
  }

  // Callback function. Called when a new component was added.
  callbackAdd = () => {
    console.log("CS added");
    this.getAllData();
  }

  onModalButtonClick = () => {
    this.setState({ showModal: true });
  }

  render() {
    console.log(`table: ${this.table}`);
    return (
      <div data-testid="ComponentStorage" className="storageDiv">
        <h2>Component storage</h2>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Button variant="primary" onClick={this.onGetAllButtonClick}>
            Get all
          </Button>
          {' '}
          <Button variant="primary" onClick={this.onModalButtonClick}>
            Add
          </Button>
          <ComponentAdd
            show={this.state.showModal}
            onHide={this.callbackModal}
            onAdd={this.callbackAdd}
          />
        </div>
        <ComponentTable data={this.state.componentData} columnNames={this.columnNames} />
      </div>
    );
  }
}

export default ComponentStorage;
