import React, {useMemo, useCallback, useEffect, useState} from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import axios from "axios";
import _ from 'lodash'
import MaterialTable from 'material-table';

class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      q: {},
      files: {},
    };
    console.log(this.props)

    this.refreshData = this.refreshData.bind(this);
    this.filterQueryRefresh = _.debounce(this.filterQueryRefresh.bind(this), 200);
  }
  refreshData() {
    Auth.currentAuthenticatedUser().then(async result => {
      let files = await MGRAPI.get('/getDataByUser', {
          params: {
            user_id: result.username,
          }
        })
        this.setState({ files })
      })
  }
  filterQueryRefresh() {
    const query = this.state.q;

    Auth.currentAuthenticatedUser().then(async result => {
      let files = await MGRAPI.get('/getDataByUser', {
          params: {
            user_id: result.username,
          }
        })
        this.setState({ files })
      })
  }
  componentDidMount() {
    this.refreshData();
  }
  render() {
    console.log(this.state.files)
    return (
      <MaterialTable
        title="Files"
        columns={[
          { title: 'name', field: 'key' },
          { title: 'size', field: 'size' },
          { title: 'last modified', field: 'mod' },
        ]}
        data={this.state.files.data}
        options={{
          selection: true,
          headerStyle: {
            backgroundColor: '#4d9448',
            color: '#FFF',
            fontSize: 17
          },
          rowStyle: {
            backgroundColor: '#EEE',
            fontSize: 100
          },
          cellStyle: {
            fontSize: 14
          },
          searchFieldStyle: {
            fontSize: 12,
            width: '200px'
          }
        }}
      />
    )
  }
}

export default FileTable;
