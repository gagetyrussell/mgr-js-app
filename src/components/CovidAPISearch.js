import { Select } from 'antd';
import React, { Component } from 'react';


const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

class covidAPISearch extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            layout: {},
            frames: [],
            currentMockIndex: -1,
            mocks: [],
            dataSources: {},
            dataSourceOptions: {}
        };

    }

    render() {
        console.log(this.props)
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select Data Source..."
            optionFilterProp="children"
            onChange={this.props.apiSelectorChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="/api/v1/states/current.json">Current State Data</Option>
            <Option value="/api/v1/states/daily.json">Historical State Data</Option>
            <Option value="/api/v1/states/info.json">State Info</Option>
            <Option value="/api/v1/us/current.json">Current US Data</Option>
            <Option value="/api/us/daily">Current US Data</Option>
            <Option value="/api/counties">Current US Data</Option>
            <Option value="/api/press">Current US Data</Option>
          </Select>
        )
      }
    }

export default covidAPISearch;
