import React, {Component} from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import { Dropdown, Menu, Icon, message } from 'antd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Scatter from "./Scatter"
import CardModal from "./CardModal"
import FileDropdown from "./FileDropdown"
import Nav from '../containers/Nav';
import Plot from 'react-plotly.js';

//import Dropdown from 'react-dropdown'
import 'antd/dist/antd.css';

const config = {editable: true};

class CardList extends Component {
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
        this.setState({mocks})
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
        console.log('file', figure);
        this.setState({
          currentMockIndex: mockIndex,
          data: Object.keys(figure.data.data).map(i => figure.data.data[i]),
          layout: figure.data.layout,
          frames: figure.frames,
        });
      });
  }

  render() {
    console.log(this.state)
    return (
      <Card variant="outlined">
        <CardContent>
          <div id="plot">
            <Nav
              currentMockIndex={this.state.currentMockIndex}
              loadMock={this.loadMock}
              mocks={this.state.mocks}
            />
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                config={config}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default CardList;
