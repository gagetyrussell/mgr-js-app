import React, {useMemo, useCallback, useEffect, useState} from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import axios from "axios";
import { useTable } from 'react-table'
import styled from 'styled-components'
import _ from 'lodash'
import MaterialTable from 'material-table';
import Upload from "./Upload"


class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      q: {},
      files: [],
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
          selection: true
        }}
      />
    )
  }
}

export default FileTable;
