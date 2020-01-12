import React, { useMemo, useCallback } from 'react';
import MGRAPI from "../utils/MGRAPI";
import { message, Input, Button, Form } from 'antd';
import { Auth } from "aws-amplify";
import axios from "axios";

const success = () => {
    message.success('Successfully Uploaded Data');
};

export default class UploadChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filename: "default" };

        this.handleChange = this.handleChange.bind(this);
        this.saveChartJSON = this.saveChartJSON.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ filename: target.value });
        console.log(this.state);
    };


    saveChartJSON(data, layout, file_name) {
        const chart = {}
        chart["data"] = { ...data };
        chart["layout"] = { ...layout };

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
        success();
        this.props.refreshData();
    }


    render() {

        console.log(this.props);
        const named = this.state.filename === "default";
        return (
            <div>
                <Form layout="inline">
                    <Form.Item>
                        <Input placeholder="Filename"
                            value={this.state.filename}
                            onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => this.saveChartJSON(this.props.data, this.props.layout, this.state.filename)} type="primary">Save Chart</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
