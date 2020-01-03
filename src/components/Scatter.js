import React, {Component} from 'react';
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';

class Scatter extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      data: {},
    };
    console.log(this.props)
  }


  render() {
    return (
      <div id="plot">
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+points',
                marker: {color: 'red'},
              },
              {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
            ]}
            layout={ {title: 'Add A Fancy Plot'} }
          />
      </div>
    )
  }
}

export default Scatter;
