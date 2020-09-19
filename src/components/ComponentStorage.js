import React from 'react'
import { Button, Table } from 'react-bootstrap';
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
            locationValue: '',
            componentData: []
        };
        this.columnNames = [
            'ID',
            'Name',
            'Description',
            'Manufacturer',
            'Quantity',
            'Package',
            'Location'
        ];
        
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
    
    getComponentData = () => {
        console.log("GetAll clicked!");
        
        const promiseComponentData = axios.get('/api/getComponents')
        
        // handle success
        .then(function (response) {
            //response.data.data.map((item, key) => {
            //item.date = parseDate(item.date)
            //});
            console.log("Loaded data")
            //this.componentData.push(response.data.data);
            //console.log(this.componentData)
            return response.data.data
        })
        
        // handle error
        .catch(function (error) {
            console.log(error);
        });
        
        console.log("promiseComponentData: " + promiseComponentData)
        return promiseComponentData;
    };
    
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
    
    onAddButtonClick = () => {
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
            "name" : this.state.nameValue,
            "description" : this.state.descValue,
            "manufacturer" : this.state.manufValue,
            "quantity" : this.state.quantityValue,
            "package" : this.state.packageValue,
            "location" : this.state.locationValue
        };
        
        console.log("data: " + componentData.id);
        
        this.add(componentData);
        
        this.isLoading = true;
        this.table = this.generateTable();
    }
    
    onGetAllButtonClick = () => {
        this.getComponentData().then(data => {
            //console.log("data: " + data)
            let currentData = this.state.componentData;
            for(let i = 0; i < data.length; i++) {
                currentData.push(data[i]);
            }
			
            this.setState({componentData: currentData})
            console.log(this.state.componentData);
		})
        
        this.generateTable();
    }
    
    /*
    onLoadingButtonClick(event) {
        this.setState({value: event.target.value});
        console.log("clicked! value: " + this.state.value)
        this.isLoading = true;
    }
    */
    
    buildRow = (row, headers, rowIndex) => {
        console.log("headers" + headers)
        return (
         <tr key={rowIndex}>
         <td>{rowIndex}</td>
         { headers.map((value, index) => {
             if(index === 0) {
                return <td key={index}>{this.state.componentData[rowIndex].productId}</td>
             } else if(index === 1) {
                return <td key={index}>{this.state.componentData[rowIndex].name}</td>
             } else if(index === 2) {
                return <td key={index}>{this.state.componentData[rowIndex].description}</td>
             } else if(index === 3) {
                return <td key={index}>{this.state.componentData[rowIndex].manufacturer}</td>
             } else if(index === 4) {
                return <td key={index}>{this.state.componentData[rowIndex].quantity}</td>
             } else if(index === 5) {
                return <td key={index}>{this.state.componentData[rowIndex].package}</td>
             } else if(index === 6) {
                return <td key={index}>{this.state.componentData[rowIndex].location}</td>
             } else {
                 return <td key={index}>{"1"}</td>
             }
                 
          })}
         </tr>
     )
  };
    
    generateTable() {
        console.log("table len: " + this.state.componentData.length)
        this.table = (
          <Table responsive bordered hover>
            <thead className="thead-dark" key="header-1">
              <tr>
                <th>#</th>
                 {this.columnNames.map((_, index) => (
                    <th key={index}>{this.columnNames[index]}</th>
                  ))}
               </tr>
            </thead>
          <tbody>
          
          
          
        { this.state.componentData.map((value, index) => {
              return this.buildRow(value, this.columnNames, index);
          })}
        
    
    
  </tbody>
</Table>
        )
        
       
    }
    
    
    
    
    render() {
        this.generateTable();
        console.log("table: " + this.table)
        
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
          
          <div style={{marginTop: 10, marginBottom: 10}}>
            <Button variant="primary" onClick={this.onAddButtonClick}>
                Add
            </Button>
            {' '}
            <Button variant="primary" onClick={this.onGetAllButtonClick}>
                Get All
            </Button>
          </div>
          
          {this.table}
         
        </div>
        )
    }
  }
  
export default ComponentStorage

