/* eslint-disable no-console */
import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ComponentTable extends React.Component {
  constructor(props) {
    super(props);
    this.columnNames = [
      'ID',
      'Name',
      'Description',
      'Manufacturer',
      'Quantity',
      'Package',
      'Location',
    ];
  }

  buildRow = (data, row, headers, rowIndex) => {
    console.log(`headers${headers}`);
    return (
      <tr key={rowIndex}>
        <td>{rowIndex}</td>
        { headers.map((value, index) => {
          if (index === 0) {
            return <td key={index}>{data[rowIndex].productId}</td>;
          } if (index === 1) {
            return <td key={index}>{data[rowIndex].name}</td>;
          } if (index === 2) {
            return <td key={index}>{data[rowIndex].description}</td>;
          } if (index === 3) {
            return <td key={index}>{data[rowIndex].manufacturer}</td>;
          } if (index === 4) {
            return <td key={index}>{data[rowIndex].quantity}</td>;
          } if (index === 5) {
            return <td key={index}>{data[rowIndex].package}</td>;
          } if (index === 6) {
            return <td key={index}>{data[rowIndex].location}</td>;
          }
          return <td key={index}>1</td>;
        })}
      </tr>
    );
  };

  generateTable(data) {
    console.log(`table len: ${data.length}`);
    this.table = (
      <Table responsive bordered hover>
        <thead className="thead-dark" key="header-1">
          <tr>
            <th>#</th>
            {this.columnNames.map((item, index) => (
              <th key={item.id}>{this.columnNames[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
          data.map((value, index) => (
            this.buildRow(data, value, this.columnNames, index)
          ))
          }
        </tbody>
      </Table>
    );
  }

  render() {
    const { data } = this.props;
    this.generateTable(data);

    return <div>{this.table}</div>;
  }
}

ComponentTable.defaultProps = {
  data: PropTypes.PropTypes.shape([]),
};

ComponentTable.propTypes = {
  data: PropTypes.PropTypes.shape([]),
};

export default ComponentTable;
