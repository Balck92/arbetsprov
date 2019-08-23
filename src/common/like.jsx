import React, { Component } from "react";

//Input: liked: boolean
//Output: onClick

class Like extends Component {
  render() {
    let classes = "fa fa-star";
    if (!this.props.liked) classes += "-o";
    return (
      <React.Fragment>
        <p>Lägg till som favorit</p>
        <i
          onClick={this.props.onClick}
          style={{ cursor: "pointer" }}
          className={classes}
          aria-hidden="true"
        />
      </React.Fragment>
    );
  }
}

export default Like;
