import React, {useMemo, useCallback, useEffect, useState} from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import axios from "axios";
import _ from 'lodash';
import { Dropdown, Menu, Icon, message, Select } from 'antd';

const { Option } = Select;

function dataToDropdown(data) {
  console.log("data",data)
  return ( data.map((item) => (
    <Option key={item.key}>
      {item.name}
    </Option>
    ))
  )
};

export default class FileDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      hasData: false
    }
    this.refreshData = this.refreshData.bind(this);
    //this.dataToDropdown = this.dataToDropdown.bind(this);
  }

  refreshData() {
    Auth.currentAuthenticatedUser().then(async result => {
      let files = await MGRAPI.get('/getDataByUser', {
          params: {
            user_id: result.username,
          }
        })
        this.setState({ files })
        this.setState({ hasData: true })
      })
  }

  componentDidMount() {
    this.refreshData();
  }

  render() {
    // function handleChange(e) {
    //   message.info('Click on menu item.');
    //   console.log('click', e[0]);
    //   Auth.currentAuthenticatedUser().then(async result => {
    //     let file_data = await MGRAPI.get('/parseDataFromFile', {
    //         params: {
    //           file_key: e[0],
    //         }
    //       })
    //       console.log(file_data)
    //     })
    // }

    var menu;
    if (this.state.hasData) {
      console.log('bool', this.state.hasData)
      menu = (
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select data sources"
          onChange={this.props.handleChange}
          >
            {dataToDropdown(this.state.files.data)}
        </Select>
      );

    } else {
      menu = (
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={this.props.handleChange}
          >
        </Select>
      );
    }

    return (
      <div>
        {menu}
      </div>
    )
  }
}

//     if (this.state.hasData) {
//       let menu_items = dataToCharts(this.state.files.data)
//       console.log(menu_items)
//       var menu = (
//         <Menu onClick={handleMenuClick}>
//           //{dataToCharts(this.state.files.data)}
//         </Menu>
//       );
//     }
//     return (
//         <Dropdown.Button overlay={menu} >
//           Select Data Source
//         </Dropdown.Button>
//         //data={this.state.files.data}
//     )
//   }


// function dataToCharts(data){
//   return ( data.map((item, index) => (
//     <Menu.Item key={index}>
//         <Icon type="user" />
//         {item}
//       </Menu.Item>
//     ))
//   )
// };
//
// class FileTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.props = props;
//     this.state = {
//       files: {},
//       hasData: false,
//       data: {}
//     };
//     console.log(this.props)
//
//     //this.dataToCharts = this.dataToCharts.bind(this);
//     this.filterQueryRefresh = _.debounce(this.filterQueryRefresh.bind(this), 200);
//     this.refreshData = this.refreshData.bind(this);
//   }
//   refreshData() {
//     Auth.currentAuthenticatedUser().then(async result => {
//       let files = await MGRAPI.get('/getDataByUser', {
//           params: {
//             user_id: result.username,
//           }
//         })
//         this.setState({ files })
//         this.setState({ hasData: true })
//       })
//   }
//   filterQueryRefresh() {
//     Auth.currentAuthenticatedUser().then(async result => {
//       let files = await MGRAPI.get('/listDataByUser', {
//           params: {
//             user_id: result.username,
//           }
//         })
//         var data = files.database
//         this.setState({ hasData: true })
//         this.setState({ files })
//       })
//   }
//   componentDidMount() {
//     this.refreshData();
//   }
//
//   render() {
//     function handleMenuClick(e) {
//       message.info('Click on menu item.');
//       console.log('click', e);
//     }
//     var menu = (
//       <Menu onClick={handleMenuClick}>
//         <Menu.Item key="1">
//           <Icon type="user" />
//           scatter
//         </Menu.Item>
//         <Menu.Item key="2">
//           <Icon type="user" />
//           bar
//         </Menu.Item>
//         <Menu.Item key="3">
//           <Icon type="user" />
//           box
//         </Menu.Item>
//       </Menu>
//     )
//     if (this.state.hasData) {
//       let menu_items = dataToCharts(this.state.files.data)
//       console.log(menu_items)
//       var menu = (
//         <Menu onClick={handleMenuClick}>
//           //{dataToCharts(this.state.files.data)}
//         </Menu>
//       );
//     }
//     return (
//         <Dropdown.Button overlay={menu} >
//           Select Data Source
//         </Dropdown.Button>
//         //data={this.state.files.data}
//     )
//   }
// }
//
// export default FileTable;
