import React from "react";
import User from "../components/User"
import MGRAPI from "../utils/MGRAPI";
import "./Home.css";

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      name: null,
      avatar: null,
      email: null
    };
  }

  render() {
    const { isLoading, name, avatar, email } = this.state;

    return (
      <User isLoading={isLoading} name={name} avatar={avatar} email={email} />
    );
  }

  async componentDidMount() {
    // Load async data.
    let userData = await MGRAPI.get('/getUsers');
    console.log(userData)

        // Parse the results for ease of use.
    userData = userData.data.results[0];

    // Update state with new data and re-render our component.
    const name = `${userData.name.first} ${userData.name.last}`;
    const avatar = userData.picture.large;
    const email = userData.email;

    this.setState({
      ...this.state, ...{
        isLoading: false,
        name,
        avatar,
        email
      }
    });
  }
}

export default UserPage;
