import React, { Component } from "react";
import PropTypes from "prop-types";
import Like from "../common/like";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      index: []
    };
  }

  handleDetails = () => {
    this.setState({ showDetails: true });
    console.log("Details Clicked");
    console.log(this.props.newsItem);
  };

  render() {
    const {
      title,
      content,
      creator,
      link,
      pubDate,
      index
    } = this.props.newsItem;

    return (
      <div id={`card-${index}`} className="card">
        <div>
          <h1>{title}</h1>
          {this.state.showDetails && <p>{content}</p>}

          <p>Författare: {creator}</p>
          <p>{link}</p>
          <p>Publiseringsdatum: {pubDate}</p>

          <div />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.handleDetails()}
        >
          Läs mer
        </button>
        <Like
          liked={this.props.newsItem.liked}
          onClick={() => this.props.onLike(this.props.newsItem)}
        />
      </div>
    );
  }
}
Card.propTypes = {
  newsItem: PropTypes.object.isRequired
};

export default Card;
