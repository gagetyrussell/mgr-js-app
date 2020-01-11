import React, {Component} from 'react';
import plotly from 'plotly.js/dist/plotly';
import PlotlyEditor from 'react-chart-editor';
import 'react-chart-editor/lib/react-chart-editor.css';
import Nav from './Nav';
import dataSources from './dataSources';
import UploadChart from '../components/UploadChart';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";

const dataSourceOptions = Object.keys(dataSources).map(name => ({
  value: name,
  label: name,
}));

const config = {editable: true};

class ChartEditor2 extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      layout: {},
      frames: [],
      currentMockIndex: -1,
      mocks: [],
    };

    this.loadMock = this.loadMock.bind(this);
  }

  componentWillMount() {
    Auth.currentAuthenticatedUser().then(async result => {
      let mock_objects = await MGRAPI.get('/getSavedChartsByUser', {
          params: {
            user_id: result.username,
          }
        })
        const mocks = mock_objects.data
        console.log('mocks:',mocks)
        console.log('mocks.data:',mocks.data)
        this.setState({mocks})
        console.log('state:',this.state)
      });
//     fetch('https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks')
//       .then(response =>  response.json())
//       .then(mocks => this.setState({mocks}));
  }

  loadMock(mockIndex) {
    console.log(mockIndex);
    const mock = this.state.mocks[mockIndex];
    console.log(mock.key)
    Auth.currentAuthenticatedUser().then(async result => {
      let figure = await MGRAPI.get('/getSavedChartJson', {
          params: {
            key: mock.key,
          }
        })
        console.log('file', figure);
        this.setState({
          currentMockIndex: mockIndex,
          data: Object.keys(figure.data.data).map(i => figure.data.data[i]),
          layout: figure.data.layout,
          frames: figure.frames,
        });
      });
//     fetch(mock.url, {
//       headers: new Headers({Accept: 'application/vnd.github.v3.raw'}),
//     })
//       .then(response => response.json())
//       .then(figure => {
        // this.setState({
        //   currentMockIndex: mockIndex,
        //   data: figure.data,
        //   layout: figure.layout,
        //   frames: figure.frames,
        // });
//         console.log(this.state)
//       });
  }

  render() {
    console.log(this.state)
    return (
      <div className="app">
        <PlotlyEditor
          data={this.state.data}
          layout={this.state.layout}
          config={config}
          frames={this.state.frames}
          dataSources={dataSources}
          dataSourceOptions={dataSourceOptions}
          plotly={plotly}
          onUpdate={(data, layout, frames) => this.setState({data, layout, frames})}
          useResizeHandler
          debug
          advancedTraceTypeSelector
        />
        <UploadChart
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

export default ChartEditor2;
