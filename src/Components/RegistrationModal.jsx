import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import Api from '../Api';

class RegistrationModal extends React.Component {
    //const {buttonLabel, className} = props;
    //experience = JSON.parse(JSON.stringify(this.props.experience));

    constructor(props) {
        super(props);
        this.state = {modal: false, selectedFile: null, user: {}};
    }

    submit = (e) => {
        if (this.state.user._id) {
            Api.fetch("/users/" + this.state.user._id, "PUT", JSON.stringify(this.state.user)).then(res => {
                console.log("edit", res);
            });

        } else {
            Api.fetch("/users/", "POST", JSON.stringify(this.state.user)).then(res => {
                console.log("inserted", res);
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
        this.setState({user: {...this.state.user, [e.target.id]: e.target.value}});
    };

    render() {
        const props = this.props;
        return (
            <>

                <div className="cursor" onClick={this.toggle.bind(this)}>Join now</div>

                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle.bind(this)}>Register</ModalHeader>
                    <ModalBody>
                        <Form className="form">
                            <Row form>
                                <div clasName="form-group col-12">
                                    <label>NAME</label>
                                    <input type="text" className="form-control" id="name"
                                           placeholder="" onChange={this.updateForm}
                                           defaultValue={this.state.user.name}/>
                                </div>
                            </Row>
                            <Row form>
                                <FormGroup clasName="form-group">
                                    <label>SURNAME</label>
                                    <input type="text" className="form-control" id="surname"
                                           placeholder="" onChange={this.updateForm}
                                           defaultValue={this.state.user.surname}/>
                                </FormGroup>
                            </Row>
                            <Row form>
                                <div clasName="form-group">
                                    <label>EMAIL</label>
                                    <input type="text" className="form-control" id="email"
                                           placeholder="" onChange={this.updateForm}
                                           defaultValue={this.state.user.email}/>
                                </div>
                            </Row>
                            <Row form>
                                <div clasName="form-group">
                                    <label>USERNAME</label>
                                    <input type="text" className="form-control" id="username"
                                           placeholder="" onChange={this.updateForm}
                                           defaultValue={this.state.user.username}/>
                                </div>
                            </Row>
                            <Row form>
                                <div clasName="form-group">
                                    <label>PASSWORD</label>
                                    <input type="password" className="form-control" id="password"
                                           placeholder="" onChange={this.updateForm}
                                           defaultValue={this.state.user.password}/>
                                </div>
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

export default RegistrationModal;
