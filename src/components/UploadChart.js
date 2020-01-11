import React, {useMemo, useCallback} from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import axios from "axios";

export default class UploadChart extends React.Component {
  constructor(props){
    super(props);
    this.state = { filename: "default"};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({ target }) => {
    this.setState({ filename: target.value });
     console.log(this.state);
  };

  render() {

    function saveChartJSON(data, layout, file_name) {
      const chart = { }
      chart["data"] = {...data};
      chart["layout"] = {...layout};

      console.log('chart', chart);
      console.log('fiiiiiiiiile', file_name)

      var chartJSON = JSON.stringify(chart);

      console.log('json', chartJSON);

      Auth.currentAuthenticatedUser().then(async result => {
        let signed_url = await MGRAPI.get('/getPresignedUserChartUrl', {
            params: {
              user_id: result.username,
              file_name: file_name
            }
          });

          console.log('url', signed_url);

          const formData = new FormData();
          Object.keys(signed_url.data.fields).forEach(key => {
            formData.append(key, signed_url.data.fields[key]);
          });
          formData.append("file", chartJSON);
          var options = { headers: { 'Content-Type': 'application/json', 'x-amz-acl': 'public-read' } };
          let http_post = axios({
            method: 'post',
            url: signed_url.data.url,
            data: formData,
            options: options
          });
          return result;
        }
      );
    };

    console.log(this.props);
    const named = this.state.filename === "default";
    return (
      <div>
        <form>
          <label htmlFor="name">filename</label>
          <input type="text"
            file_name={this.state.filename}
            onChange={this.handleChange}
          />
        </form>
        <button onClick={() => saveChartJSON(this.props.data, this.props.layout, this.state.filename)}>Save Chart</button>
      </div>
    );
  }
}
