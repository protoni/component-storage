import React from 'react';
import {
  FaDatabase,
  FaDesktop,
  FaSync, FaRegChartBar,
} from 'react-icons/fa';
import { Row, Col, OverlayTrigger } from 'react-bootstrap';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.backEndOk = true;
    this.frontEndOk = true;
    this.mySqlOk = true;
    this.mongoDbOk = true;
    this.serverOk = false;

    // Tooltip
    this.cpuTemp = 45;
    this.gpuTemp = 57;
  }

    renderTooltip = (props) => (
      <div
        {...props}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          padding: '20px 20px',
          color: 'white',
          borderRadius: 3,
          ...props.style,
        }}
      >
        <Row>
          CPU temp:
          {' '}
          {this.cpuTemp}
          {' '}
          °C
        </Row>
        <Row>
          GPU temp:
          {' '}
          {this.gpuTemp}
          {' '}
          °C
        </Row>

      </div>
    );

    render() {
      let showBackEndOk;
      let showFrontEndOk;
      let showMySqlOk;
      let showMongoDbOk;
      let showServerOk;

      if (this.backEndOk) {
        showBackEndOk = <h2 style={{ color: '#027d0f' }}><FaSync /></h2>;
      } else {
        showBackEndOk = <h2 style={{ color: '#ff4d58' }}><FaSync /></h2>;
      }

      if (this.frontEndOk) {
        showFrontEndOk = <h2 style={{ color: '#027d0f' }}><FaDesktop /></h2>;
      } else {
        showFrontEndOk = <h2 style={{ color: '#ff4d58' }}><FaDesktop /></h2>;
      }

      if (this.mySqlOk) {
        showMySqlOk = <h2 style={{ color: '#027d0f' }}><FaDatabase /></h2>;
      } else {
        showMySqlOk = <h2 style={{ color: '#ff4d58' }}><FaDatabase /></h2>;
      }

      if (this.mySqlOk) {
        showMySqlOk = <h2 style={{ color: '#027d0f' }}><FaDatabase /></h2>;
      } else {
        showMySqlOk = <h2 style={{ color: '#ff4d58' }}><FaDatabase /></h2>;
      }

      if (this.serverOk) {
        showServerOk = <h2 style={{ color: '#027d0f' }}><FaRegChartBar /></h2>;
      } else {
        showServerOk = <h2 style={{ color: '#ff4d58' }}><FaRegChartBar /></h2>;
      }

      return (
        <div data-testid="Status" className="statusBar">
          <h2 className="statusHeader">Status</h2>

          <Row>
            <Col className="statusCol">
              <b>Back End Connection</b>
              {showBackEndOk}
            </Col>
            <Col className="statusCol">
              <b>Front End</b>
              {showFrontEndOk}
            </Col>
          </Row>

          <Row>
            <Col className="statusCol">
              <b>MySQL</b>
              {showMySqlOk}
            </Col>
            <Col className="statusCol">
              <b>MongoDB</b>
              {showMongoDbOk}
            </Col>
          </Row>
          <Row>
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={this.renderTooltip}
            >
              <Col className="statusCol">
                <b>Server</b>
                {showServerOk}
              </Col>
            </OverlayTrigger>
          </Row>
        </div>
      );
    }
}

export default StatusBar;
