/* eslint-disable no-console */
import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ComponentAddTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'component',
    };
    this.onTabChangeFunc = null;
  }

  onTabChange = (tab) => {
    this.setState({ currentTab: tab });
    this.onTabChangeFunc(tab);
  }

  render() {
    const { onTabChange } = this.props;
    this.onTabChangeFunc = onTabChange;
    let key;

    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => this.onTabChange(k)}
      >
        <Tab eventKey="component" title="Component" />
        <Tab eventKey="board" title="Board" />
        <Tab eventKey="misc" title="Misc" />
      </Tabs>
    );
  }
}

ComponentAddTabs.defaultProps = {
  onTabChange: PropTypes.func,
};

ComponentAddTabs.propTypes = {
  onTabChange: PropTypes.func,
};

export default ComponentAddTabs;
