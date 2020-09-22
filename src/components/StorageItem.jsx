/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

class StorageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      componentData: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });
    console.log(`id: ${id}`);
    this.loadComponentData(id);
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

    return (
      <div>
        <h2>
          Item
          {' '}
          {this.state.id}
        </h2>
        {this.table}
      </div>
    );
  }
}

export default StorageItem;
