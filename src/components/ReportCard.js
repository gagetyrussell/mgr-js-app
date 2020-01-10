import React from "react";
import Modal from "./Modal";
import { Dropdown, Menu, Icon, message } from 'antd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Scatter from "./Scatter"

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      <Icon type="user" />
      scatter
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      bar
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="user" />
      box
    </Menu.Item>
  </Menu>
);

class ReportCard extends React.Component {
  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    return (
      <div className="App">
        <Card variant="outlined">
          <CardContent>
            <button
              class="toggle-button"
              id="centered-toggle-button"
              onClick={e => {
                this.showModal(e);
              }}
            >
              {" "}
              show Modal{" "}
            </button>
            <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
              Select Chart Type
            </Dropdown.Button>
            <Dropdown.Button overlay={menu} >
              Select Data Source
            </Dropdown.Button>
            <div id="plot">
              <Scatter id="plot"/>
            </div>
          <Modal onClose={this.showModal} show={this.state.show}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
            deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
            fuga omnis a sed impedit explicabo accusantium nihil doloremque
            consequuntur.
          </Modal>
        </CardContent>
      </Card>
      </div>
    );
  }
}

export default ReportCard;
