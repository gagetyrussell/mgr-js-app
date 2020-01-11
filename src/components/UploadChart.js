import React, {useMemo, useCallback} from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import axios from "axios";

export default class UploadChart extends React.Component {
  render() {
    function saveChartJSON(data, layout) {
      const chart = { }
      chart["data"] = {...data};
      chart["layout"] = {...layout};
      console.log('chart', chart);
      var chartJSON = JSON.stringify(chart);
      console.log('json', chartJSON);
      Auth.currentAuthenticatedUser().then(async result => {
        let signed_url = await MGRAPI.get('/getPresignedUserChartUrl', {
            params: {
              user_id: result.username,
              file_name: 'test.json'
            }
          });
          console.log(signed_url);
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
    return (
      <div>
         <button onClick={() => saveChartJSON(this.props.data, this.props.layout)}>Save Chart</button>
      </div>
    );
  }
}
