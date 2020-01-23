import React, {Component} from 'react'
import {Col, Row} from 'reactstrap';
import NewsFeedModal from "./NewsFeedModal"

import Api from "../Api";

class NewsFeedAdd extends Component {
    state = {
        text: ""
    };

    save = () => {
        Api.fetch("/posts/", "POST", JSON.stringify({text: this.state.text})).then((res) => {
            console.log(res);
            if (res && res._id && this.state.selectedFile) {
                var formData = new FormData();
                formData.append("image", this.state.selectedFile);
                Api.request("/posts/" + res._id + "/picture", "POST", formData).then(() => this.props.refresh());
            } else this.props.refresh();
        });
    };

    updateFeed = (name, newText) => {
        this.setState({[name]: newText})
    };

    render() {
        return (
            <Row>
                <Col sm="12">

                    <div className="display-flex bodyNewsFeed">
                        <NewsFeedModal updateFeed={this.updateFeed} save={this.save}/>
                        <button className="share-box_trigger share-box_trigger1"><i
                            className="fas fa-camera fa-2x iconNewsFeed"></i></button>
                        <button className="share-box_trigger share-box_trigger1"><i
                            className="fas fa-video fa-2x iconNewsFeed"></i></button>
                        <button className="share-box_trigger share-box_trigger1"><i
                            className="far fa-file-alt fa-2x iconNewsFeed"></i></button>
                    </div>

                </Col>

                {/*       <div className="new-post-container">
                        <div>
                            <h5>ADD NEWS</h5>
                            <textarea className="form-control" rows="3" cols="50" value={this.state.name} name="text"
                                onChange={(data) => {
                                    this.setState({ text: data.target.value })
                                }} />
                            <br />
                            <button onClick={() => {
                                this.submit()
                            }}> Post
                            </button>
                        </div>
                    </div> */}

            </Row>
        )
    }
}

export default NewsFeedAdd;
