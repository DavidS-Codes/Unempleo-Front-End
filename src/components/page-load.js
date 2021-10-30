import React from "react";

class Loading extends React.Component{
  render() {
    
    return (
      <div>
        {this.props.loading ? <div className="loading"> <div className="image-loading mx-auto" /> </div> : this.props.children}
      </div>
    );
  }
}
export default Loading;
