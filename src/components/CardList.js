import React from 'react';
import { Dropdown, Menu, Icon, message } from 'antd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Scatter from "./Scatter"
import CardModal from "./CardModal"
import FileDropdown from "./FileDropdown"
//import Dropdown from 'react-dropdown'
import 'antd/dist/antd.css';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      <Icon type="user" />
      scatter
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      bar
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="user" />
      box
    </Menu.Item>
  </Menu>
);

const Box = () => (
  <Card variant="outlined">
    <CardContent>
      <CardModal/>
      <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
        Select Chart Type
      </Dropdown.Button>
      <Dropdown.Button overlay={menu} >
        Select Data Source
      </Dropdown.Button>
      <div>
        <FileDropdown/>
      </div>
      <div id="plot">
        <Scatter id="plot"/>
      </div>
    </CardContent>
  </Card>
);


export default () => (
  <div
    style={{
      width: '100%',
      height: '100%',
    }}
  >

      <Box />
  </div>
);
