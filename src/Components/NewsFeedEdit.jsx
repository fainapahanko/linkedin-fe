import React, {Component, useState} from 'react'
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import NewsFeedModal from "./NewsFeedModal"

import Api from "../Api";

class NewsFeedEdit extends Component {
    state = {
        text: this.props.news.text,
        modal: false
    };


    toggle = () => this.setState({modal:!this.state.modal});
    onFileChange = (e) => {
        this.setState({[e.target.name]: e.target.files[0]});
        //this.props.updateFeed(e.target.name, e.target.files[0])
    };

    handleOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    submit = () => {
        this.save();
        this.toggle();
    };

    save = () => {
        Api.fetch("/posts/"+this.props.news._id, "PUT", JSON.stringify({text: this.state.text})).then((res) => {
            console.log(res);
            if (res && res._id && this.state.selectedFile) {
                var formData = new FormData();
                formData.append("post", this.state.selectedFile);
                Api.request("/posts/" + res._id, "POST", formData).then((res) => this.props.refresh());
            } else {
                this.props.refresh();
            }
        });
    };

    updateFeed = (name, newText) => {
        this.setState({[name]: newText})
    };

    render() {
        return (
            <div>
                <Button className="button-margin" size="sm" onClick={this.toggle}><i
                    className='fas fa-pencil-alt'></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Create a post</ModalHeader>
                    <ModalBody>
                    <textarea onChange={(e) => this.handleOnChange(e)} value={this.state.text} className="form-control" rows="3" cols="50"
                              name="text"></textarea>
                    </ModalBody>
                    <ModalFooter>

                        <FormGroup>
                            <Label for='picture'>Upload Photo</Label>
                            <Input type='file' name='selectedFile' id='selectedFile'
                                   onChange={(e) => this.onFileChange(e)} placeholder=''/>
                        </FormGroup>
                        <Button color="primary" onClick={this.submit}>Post</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default NewsFeedEdit;
