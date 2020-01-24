import React, { Component } from "react";
import { Button, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import Api from "../Api";
import NewsFeedAdd from "./NewsFeedAdd";
import NewsFeedEdit from "./NewsFeedEdit";
import { Link } from "react-router-dom";
import moment from "moment";
import { InfiniteScroll } from "react-simple-infinite-scroll";
import SearchProfile from "./SearchProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import LoadingBar from "./LoadingBar";
import NewsFeedComments from "./NewsFeedComments";
import CommentModal from "./CommentModal";

class NewsFeed extends Component {
  state = {
    newsfeed: null,
    selectedNews: {},
    isLoading: true,
    items: [],
    cursor: 5
  };

  loadData = async () => {
    // load posts and users
    const newsfeed = await Api.fetch("/posts");
    const users = await Api.fetch("/profile");
    console.log(Api.USER)
    // map the user object to his post
    newsfeed.map(post => {
      post.user = users.find(user => user.username === post.username);
      return post;
    });
    newsfeed.reverse();
    this.setState({
      newsfeed: newsfeed,
      items: newsfeed.slice(0, 5),
      isLoading: false
    });
  };

  likedPost = async(news) => {
    let resp = await Api.fetch("/posts/likes/" + news._id, "POST");
    this.loadData()
    }

  feedData = () => {
    console.log("feed", this.state.cursor);
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
        error: undefined,
        cursor: this.state.cursor
      });
      setTimeout(
        () =>
          this.setState(state => ({
            items: [
              ...state.items,
              ...this.state.newsfeed.slice(
                this.state.cursor,
                this.state.cursor + 5
              )
            ],
            cursor: this.state.cursor + 5,
            isLoading: false
          })),
        2000
      );
    }
  };

  componentDidMount = async () => {
    // setInterval(() => this.loadData(), 10000);
    this.loadData();
  };

  resetUpdate() {
    this.setState({ selectedNews: {} });
  }

  deleteNewsfeed = async post => {
    let resp = await Api.fetch("/posts/" + post._id, "DELETE");
    var newsWithoutCurrent = this.state.newsfeed.filter(
      x => x._id !== post._id
    );
    this.setState({ newsfeed: newsWithoutCurrent });
    this.loadData();
  };
  updateNewsfeed = val => {
    let currentNews = this.state.selectedNews;
    currentNews[val.target.name] = val.target.value;
    this.setState({ selectedNews: currentNews });
  };
  // updateNewsfeed = (e, news) => {
  //     console.log(e.target);
  //     var formData = new FormData();
  //     formData.append("post", e.target.files[0]);
  //     Api.request("/posts/" + news._id, "POST", formData);
  //     this.loadData();
  // };

  showUpdatedNewsfeed = update => {
    if (update) {
      const index = this.state.newsfeed.findIndex(
        exp => this.state.selectedExp._id === exp._id
      );
      this.state.newsfeed[index] = { ...this.state.selectedExp };
    }
    this.resetUpdate();
  };

  render() {
    if (!this.state.newsfeed) return null;
    const allnews = [...this.state.newsfeed];
    allnews.map(news => {
      news.isUpdated =
        news.updatedAt &&
        moment(news.createdAt).format("HH:mm") !==
          moment(news.updatedAt).format("HH:mm");
    });
    return (
      <>
        <NewsFeedAdd refresh={this.loadData} />
        <Row>
          <Col>
            <div className="new-post-container">
              <h4>NEWS FEED</h4>
            </div>
            <div>
              <InfiniteScroll
                throttle={100}
                threshold={300}
                isLoading={this.state.isLoading}
                hasMore={!!this.state.cursor}
                onLoadMore={this.feedData}
              >
                {this.state.items.length > 0
                  ? this.state.items.map(news => (
                      <div className="new-post-container" key={news._id}>
                        <ListGroup>
                          <ListGroupItem>
                            <div className="post-detail">
                              <div>
                                <img
                                  src={news.user.image}
                                  className="user-image"
                                />
                              </div>
                              <div className="details-container">
                                <div className="user-name">
                                  <Link to={"users/" + news.username}>
                                    {news.user.name} {news.user.surname}
                                  </Link>
                                </div>
                                <div className="user-title">
                                  {news.user.title} in {news.user.area}
                                </div>
                                <div className="post-age">
                                  {moment(news.createdAt).fromNow()}{" "}
                                  {news.isUpdated && (
                                    <span>
                                      - updated{" "}
                                      {moment(news.updatedAt).fromNow()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </ListGroupItem>
                          <ListGroupItem>{news.text}</ListGroupItem>
                          <ListGroupItem className="post-images">
                            <img
                              src={news.image}
                              className="posts-random-image"
                              alt={"image"}
                            />
                          </ListGroupItem>
                          <ListGroupItem>
                            <div className="post-age">
                              <div className="post-bottom-icons">
                                <div className="post-bottom-icons">
                                  <div className="post-bottom-icon">
                                    <div className="post-bottom-icon">
                                      <FontAwesomeIcon
                                        onClick={() => this.likedPost(news)}
                                        style={{ fontSize: "30px" }}
                                        icon={faThumbsUp}
                                      />
                                    </div>
                                    <div>
                                      <h5>{news.likesTotal}</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="post-bottom-icons"></div>
                                <CommentModal
                                  postId={news._id}
                                  refresh={this.loadData}
                                />
                                <div className="post-bottom-icons">
                                  <div className="post-bottom-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      data-supported-dps="24x24"
                                      fill="currentColor"
                                      focusable="false"
                                    >
                                      <path d="M24 12a1.18 1.18 0 00-.36-.84L14 2v6h-3A10 10 0 001 18v4h1.87A6.11 6.11 0 019 16h5v6l9.63-9.14A1.18 1.18 0 0024 12zm-8 5.54V14H9a8.15 8.15 0 00-6 2.84A8 8 0 0111 10h5V6.48L21.81 12z"></path>
                                    </svg>
                                  </div>
                                  <div>Share</div>
                                </div>
                                <div className="post-bottom-spacer" />

                                {Api.USER === news.username && (
                                  <NewsFeedEdit
                                    news={news}
                                    refresh={this.loadData}
                                  />
                                )}

                                <Button
                                  className="button-margin"
                                  size="sm"
                                  onClick={() => this.deleteNewsfeed(news)}
                                >
                                  {" "}
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </div>
                            </div>
                          </ListGroupItem>
                        </ListGroup>
                        <NewsFeedComments comments={news.comments} />
                      </div>
                    ))
                  : null}
              </InfiniteScroll>
              <div style={{ marginBottom: "20px" }}>
                {this.state.isLoading && <LoadingBar />}
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default NewsFeed;
