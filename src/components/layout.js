import React from "react";
import Cookies from "js-cookie/dist/js.cookie.min.js";

import Navbar from "./header";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userlogged: false,
      mainContainer: "main-usernotlogged"
    };
  }
  componentDidMount() {
    // Cookies.set('token','123',{expires: 1})

    if (Cookies.get('token')){
      this.setState({
        userlogged: true,
        mainContainer:"main-userlogged"
      } )
    }else{
      this.setState({
        userlogged: false,
        mainContainer:"main-usernotlogged"
      } )
    }

  }

  render() {
    return (
      <div className="divMain">
        <Navbar logged={this.state.userlogged} />
        <main className={"h-100 " + this.state.mainContainer}>
          {this.props.children}
        </main>
      </div>
    );
  }
}


export default Layout;
