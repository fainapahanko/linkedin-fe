import React, {Component} from 'react';
import Api from "../Api";
import moment from "moment";
import NewsFeedAdd from "./NewsFeedAdd";
import {Button, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {Link} from "react-router-dom";
import LoadingBar from "./LoadingBar";

class NewsFeedComments extends Component {
    state = {
        comments: null,
        selectedComment: {},
        isLoading: true,
        items: [],
        cursor: 5
    };

    loadData = async () => {
        // load posts and users
        const comments = await Api.fetch('/posts/');
        const users = await Api.fetch('/profile/');
        // map the user object to his post
        comments.map(post => {
            post.user = users.find(user => user.username === post.username);
            return post;
        });
        comments.reverse();
        this.setState({
            comments: comments,
            items: comments.slice(0, 5),
            isLoading: false
        });
    };

    feedData = () => {
        console.log("feed", this.state.cursor);
        if (!this.state.isLoading) {
            this.setState({isLoading: true, error: undefined, cursor: this.state.cursor});
            setTimeout(() => this.setState(state => ({
                items: [...state.items, ...(this.state.newsfeed.slice(this.state.cursor, this.state.cursor + 5))],
                cursor: this.state.cursor + 5,
                isLoading: false
            })), 2000);
        }
    };

    componentDidMount = async () => {
        setInterval(() => this.loadData(), 10000);
        this.loadData();
    };

    resetUpdate() {
        this.setState({selectedComments: {}});
    }

    deleteComments = async (post) => {
        let resp = await Api.fetch("/posts/" + post._id, "DELETE");
        var commentsWithoutCurrent = this.state.newsfeed.filter(x => x._id !== post._id);
        this.setState({newsfeed: commentsWithoutCurrent});
    };
    // updateNewsfeed = (val) => {
    //     let currentNews = this.state.selectedNews;
    //     currentNews[val.target.name] = val.target.value;
    //     this.setState({selectedNews: currentNews})
    // }
    updateComments = (e, comments) => {
        console.log(e.target);
        var formData = new FormData();
        formData.append("post", e.target.files[0]);
        Api.request("/posts/" + comments._id, "POST", formData);
        this.loadData();
    };


    showUpdatedComments = (update) => {
        if (update) {
            const index = this.state.comments.findIndex((exp) => this.state.selectedExp._id === exp._id);
            this.state.comments[index] = {...this.state.selectedExp};
        }
        this.resetUpdate();
    };


    render() {
        if (!this.state.comments)
            return null;
        const allcomments = [...this.state.comments];
        allcomments.map((comments) => {

            comments.isUpdated = comments.updatedAt && (moment(comments.createdAt).format("HH:mm") !== moment(comments.updatedAt).format("HH:mm"))
        });
        return (
            <>

                <NewsFeedAdd refresh={this.loadData}/>
                <Row>
                    <Col>
                        <div className="new-post-container">
                            <h5>comments</h5>
                        </div>
                        <div>
                            {this.state.items.length > 0
                                ? this.state.items.map(comments => (

                                    <div className="new-comment-container" key={comments._id}>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <div className="comment-detail">
                                                    <div>
                                                        <img src={comments.user.image} className="user-image"/>
                                                    </div>
                                                    <div className="details-container">
                                                        <div
                                                            className="user-name"><Link
                                                            to={'users/' + comments.username}>{comments.user.name} {comments.user.surname}</Link>
                                                        </div>
                                                        <div
                                                            className="user-title">{comments.user.title} in {comments.user.area}</div>
                                                        <div
                                                            className="post-age">{moment(comments.createdAt).fromNow()} {comments.isUpdated &&
                                                        <span>- updated {moment(comments.updatedAt).fromNow()}</span>}</div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>{comments.text}</ListGroupItem>
                                            <ListGroupItem className="post-images">
                                                <img src={comments.image} className="posts-random-image"
                                                     alt={'image'}/>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>


                                ))
                                : null}

                            <div style={{marginBottom: '20px'}}>
                                {this.state.isLoading && <LoadingBar/>}
                            </div>
                        </div>
                    </Col>
                </Row>

            </>
        );
    }
}

export default NewsFeedComments;