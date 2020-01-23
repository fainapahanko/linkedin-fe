import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import Api from '../Api';

class CommentModal extends React.Component {
    //const {buttonLabel, className} = props;
    //experience = JSON.parse(JSON.stringify(this.props.experience));

    constructor(props) {
        super(props);
        this.state = {modal: false, selectedFile: null, comment: {}};
    }

    submit = (e) => {
        if (this.state.comment._id) {
            Api.fetch("/posts/" + this.props.postId, "PUT", JSON.stringify(this.state.comment)).then(res => {
                console.log("edit", res);
                this.props.refresh();
            });

        } else {
            Api.fetch("/posts/" + this.props.postId + "/comment", "POST", JSON.stringify(this.state.comment)).then(res => {
                console.log("inserted", res);
                this.props.refresh()
            });
        }
        this.setState({_id: undefined});
        this.toggle();
    };
    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    onChangeHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    };

    updateForm = (e) => {
        this.setState({comment: {...this.state.comment, [e.target.id]: e.target.value}});
    };

    render() {
        const props = this.props;
        return (
            <>
                <div onClick={this.toggle.bind(this)} className="post-bottom-icon cursor">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" data-supported-dps="24x24"
                         fill="currentColor" focusable="false">
                        <path
                            d="M18 10H6V9h12v1zm4-5v17l-5-4H3a1 1 0 01-1-1V5a1 1 0 011-1h18a1 1 0 011 1zm-2 1H4v10h13.7l2.3 1.84V6zm-4 6H8v1h8v-1z"></path>
                    </svg>
                </div>
                <div className="cursor" onClick={this.toggle.bind(this)}>Comment</div>

                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle.bind(this)}>Edit experience</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='startDate'>Write your comment</Label>
                                        <textarea onChange={this.updateForm} name="comment" id="comment" cols="30"
                                                  rows="10"></textarea>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.submit.bind(this)}>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default CommentModal;
