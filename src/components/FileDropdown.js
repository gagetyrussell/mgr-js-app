import React, {useMemo, useCallback, useEffect, useState} from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import axios from "axios";
import _ from 'lodash';
import { Dropdown, Menu, Icon, message } from 'antd';

function dataToCharts(data){
  return ( data.map((item, index) => (
    <Menu.Item key={index}>
        <Icon type="user" />
        {item}
      </Menu.Item>
    ))
  )
};

class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      files: {},
      hasData: false,
      data: {}
    };
    console.log(this.props)

    //this.dataToCharts = this.dataToCharts.bind(this);
    this.filterQueryRefresh = _.debounce(this.filterQueryRefresh.bind(this), 200);
    this.refreshData = this.refreshData.bind(this);
  }
  refreshData() {
    Auth.currentAuthenticatedUser().then(async result => {
      let files = await MGRAPI.get('/listDataByUser', {
          params: {
            user_id: result.username,
          }
        })
        this.setState({ files })
        this.setState({ hasData: true })
      })
  }
  filterQueryRefresh() {
    Auth.currentAuthenticatedUser().then(async result => {
      let files = await MGRAPI.get('/listDataByUser', {
          params: {
            user_id: result.username,
          }
        })
        var data = files.database
        this.setState({ hasData: true })
        this.setState({ files })
      })
  }
  componentDidMount() {
    this.refreshData();
  }

  render() {
    function handleMenuClick(e) {
      message.info('Click on menu item.');
      console.log('click', e);
    }
    var menu = (
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
    )
    if (this.state.hasData) {
      let menu_items = dataToCharts(this.state.files.data)
      console.log(menu_items)
      var menu = (
        <Menu onClick={handleMenuClick}>
          //{dataToCharts(this.state.files.data)}
        </Menu>
      );
    }
    return (
        <Dropdown.Button overlay={menu} >
          Select Data Source
        </Dropdown.Button>
        //data={this.state.files.data}
    )
  }
}

export default FileTable;
