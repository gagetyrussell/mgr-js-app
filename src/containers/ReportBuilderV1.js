import React from 'react';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import _ from 'lodash'
import CardList from '../components/CardList'

class ReportBuilderV1 extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      q: {},
      files: [],
      count: 1
    };
    console.log(this.state)

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

  handleClick = () => {
    this.setState(({ count }) => ({
      count: count + 1
    }));
  };

  render() {
    let cards = [
        {'name': 'Super card', 'id': 1},
        {'name': 'Other card', 'id': 2},
        {'name': 'Last card', 'id': 3}
    ];
    var arr=["one", "two", "three", "four"];
    var elements=[];
    for(var i=0;i<this.state.count;i++){
         // push the component to elements!
        elements.push(<CardList id={ arr[i] } value={ arr[i] } />);
    }
    return (
      <div>
        <button onClick={this.handleClick}>+</button>
        {elements}
      </div>
    );
  }
}

export default ReportBuilderV1;
