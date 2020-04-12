import React, { Component } from 'react';
import plotly from 'plotly.js/dist/plotly';
import PlotlyEditor from 'react-chart-editor';
import 'react-chart-editor/lib/react-chart-editor.css';
import Nav from './Nav';
//import dataSources from './dataSources';
import UploadChart from '../components/UploadChart';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import FileDropdown from "../components/FileDropdown"
import CovidAPISearch from "../components/CovidAPISearch"
import CovidAPI from "../utils/CovidAPI";



const config = { editable: true };

class Covid19Editor extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            covidData: [],
            layout: {},
            frames: [],
            currentMockIndex: -1,
            mocks: [],
            dataSources: {},
            dataSourceOptions: {},
            data_selected: false,
            logged_in: false
        };

        this.loadMock = this.loadMock.bind(this);
        this.transformArray = this.transformArray.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.apiSelectorChange = this.apiSelectorChange.bind(this);
    }

    transformArray(arr) {
      let objects = {}
      Object.keys(arr[1]).forEach(function (item) {
        var items = []
        for (var i = 0; i < arr.length; i++) {
          console.log(arr[i][item])
          items.push(arr[i][item])
        }
        objects[item] = items
      });
      console.log(objects)
      return objects
    }

    refreshData() {
        Auth.currentAuthenticatedUser().then(async result => {
            let mock_objects = await MGRAPI.get('/getSavedChartsByUser', {
                params: {
                    user_id: result.username,
                }
            })
            const mocks = mock_objects.data
            this.setState({ mocks })
        });
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser().then(async result => {
            console.log("logged", result)
            let mock_objects = await MGRAPI.get('/getSavedChartsByUser', {
                params: {
                    user_id: result.username,
                }
            })
            this.setState({logged_in: true})
            const mocks = mock_objects.data
            this.setState({ mocks })
        });
    }

    loadMock(mockIndex) {
        const mock = this.state.mocks[mockIndex];
        Auth.currentAuthenticatedUser().then(async result => {
            let figure = await MGRAPI.get('/getSavedChartJson', {
                params: {
                    key: mock.key,
                }
            })
            this.setState({
                currentMockIndex: mockIndex,
                data: Object.keys(figure.data.data).map(i => figure.data.data[i]),
                layout: figure.data.layout,
                frames: figure.frames,
            });
        });
    }

    apiSelectorChange(value) {
        this.setState({
          data_selected: true,
        }, () => {
          console.log("selected api", value)
          CovidAPI.get(value, {
          })
          .then(res => {
            console.log("job order response", res)
            const dataSources = this.transformArray(res.data)
            console.log(dataSources)
            const dataSourceOptions = Object.keys(dataSources).map(name => ({
                value: name,
                label: name,
            }));
            this.setState({covidData: res.data})
            this.setState({
              dataSources: dataSources,
              dataSourceOptions: dataSourceOptions
            })
          })
          .catch((e) => {
            console.error(e);
          })
        });

      };

      handleChange(e) {
        console.log('click', e[0]);
        Auth.currentAuthenticatedUser().then(async result => {
          let file_data = await MGRAPI.get('/parseDataFromFile', {
              params: {
                file_key: e[0],
              }
            })
            const dataSources = file_data.data
            const dataSourceOptions = Object.keys(dataSources).map(name => ({
                value: name,
                label: name,
            }));
            this.setState({
              dataSources: dataSources,
              dataSourceOptions: dataSourceOptions
            })
            console.log(this.state)
          })
      }


    render() {
        return (
            <div className="app">
                <CovidAPISearch apiSelectorChange={this.apiSelectorChange}/>
                <PlotlyEditor
                    data={this.state.data}
                    layout={this.state.layout}
                    config={config}
                    frames={this.state.frames}
                    dataSources={this.state.dataSources}
                    dataSourceOptions={this.state.dataSourceOptions}
                    plotly={plotly}
                    onUpdate={(data, layout, frames) => this.setState({ data, layout, frames })}
                    useResizeHandler
                    debug
                    advancedTraceTypeSelector
                />
                <UploadChart
                    disabled={!this.state.logged_in}
                    refreshData={this.refreshData}
                    data={this.state.data}
                    layout={this.state.layout}
                />
                <Nav
                    currentMockIndex={this.state.currentMockIndex}
                    loadMock={this.loadMock}
                    mocks={this.state.mocks}
                />
            </div>
        );
    }
}

export default Covid19Editor;
