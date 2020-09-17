import React from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


class ComponentStorage extends React.Component {
    constructor(props) {
        super(props);
        this.isLoading = false;
        this.state = {
            idValue: '',
            nameValue: '',
            descValue: '',
            manufValue: '',
            quantityValue: '',
            packageValue: '',
            locationValue: ''
        };
    }
    
    add = (componentData) => {
        console.log("Adding!")
        axios.post('/api/addComponent', {
            filename: this.state.filename,
            data: componentData
        })
        .then(function (response) {
        console.log("response: " + response);
        })
        .catch(function (error) {
        console.log("error: " + error);
        });
    }
    
    simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }
    
    handleIdChange = (evt) => {
        this.setState({idValue: evt.target.value});
    }
    
    handleNameChange = (evt) => {
        this.setState({nameValue: evt.target.value});
    }
    
    handleDescChange = (evt) => {
        this.setState({descValue: evt.target.value});
    }
    
    handleManufChange = (evt) => {
        this.setState({manufValue: evt.target.value});
    }
    
    handleQuantityChange = (evt) => {
        this.setState({quantityValue: evt.target.value});
    }
    
    handlePackageChange = (evt) => {
        this.setState({packageValue: evt.target.value});
    }
    
    handleLocationChange = (evt) => {
        this.setState({locationValue: evt.target.value});
    }
    
    onLoadingButtonClick = () => {
        console.log(
        "clicked! " + 
        "ID: " + this.state.idValue + 
        ", Name: " + this.state.nameValue + 
        ", Description: " + this.state.descValue + 
        ", Manufacturer: " + this.state.manufValue,
        ", Quantity: " + this.state.quantityValue,
        ", Package: " + this.state.packageValue,
        ", Location: " + this.state.locationValue);
        
        let componentData = {
            "id" : this.state.idValue,
            "name: " : this.state.nameValue,
            "description: " : this.state.descValue,
            "manufacturer: " : this.state.manufValue,
            "quantity: " : this.state.quantityValue,
            "package: " : this.state.packageValue,
            "location: " : this.state.locationValue
        };
        
        console.log("data: " + componentData.id);
        
        this.add(componentData);
        
        this.isLoading = true;
    }
    /*
    onLoadingButtonClick(event) {
        this.setState({value: event.target.value});
        console.log("clicked! value: " + this.state.value)
        this.isLoading = true;
    }
    */
   
    render() {
        let msg = "";
        for(let i = 0; i < 10000; i++) {
            msg += "ASD\r\n";
        }
        return (
          <div class="storageDiv">
          <h2>Component storage</h2>
          
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
          
          <div>
            <Button variant="primary" onClick={this.onLoadingButtonClick}>
                Add
            </Button>
          </div>
          
                <p>{msg}</p>
            </div>
        )
    }
  }
  
export default ComponentStorage

