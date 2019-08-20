import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import config from "../config";
import Pagination from "../common/pagination";
import Like from "../common/like";
import { paginate } from "../utils/paginate";

let Parser = require("rss-parser");
let parser = new Parser();

class News extends Component {
  state = {
    newsItems: [],
    currentPage: 1,
    pageSize: 10
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleLike = news => {
    const newsItems = [...this.state.newsItems];
    const index = newsItems.indexOf(news);
    newsItems[index] = { ...newsItems[index] };
    newsItems[index].liked = !newsItems[index].liked;
    this.setState({ newsItems });
  };

  async componentDidMount() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    const { items: newsItems } = await parser.parseURL(
      CORS_PROXY + config.apiEndpoint
    );
    console.log("Fetching data from DN");
    this.setState({ newsItems });

    console.log(newsItems);
  }

  render() {
    const { length: count } = this.state.newsItems;
    const { pageSize, currentPage, newsItems: allNews } = this.state;
    const newsArticles = paginate(allNews, currentPage, pageSize);
    console.log(newsArticles);

    return (
      <React.Fragment>
        <h1>Visar {count} nyhetsartiklar från DN </h1>
        <table className="table">
          <thead>
            <tr>
              <th>Nyhetsartiklar</th>
              <th>Publiserad av</th>
              <th>Länk</th>
              <th>Markera som favorit</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {allNews.map(news => (
              <tr key={news.id}>
                <td>{news.title}</td>
                <td>{news.creator}</td>
                <td>{news.link}</td>
                <td>
                  <Like
                    liked={news.liked}
                    onClick={() => this.handleLike(news)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default News;
