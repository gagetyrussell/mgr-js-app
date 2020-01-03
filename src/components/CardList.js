import React from 'react';
import {Rnd} from 'react-rnd';
import { Dropdown, Menu, Icon, message, Select } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Scatter from "./Scatter"
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


const Option = Select.Option;


const options = [
  'one', 'two', 'three'
]
const Box = () => (
  <Card variant="outlined">
    <CardContent>
      <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
        Select Chart Type
      </Dropdown.Button>
      <Dropdown.Button overlay={menu} >
        Select Data Source
      </Dropdown.Button>
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
