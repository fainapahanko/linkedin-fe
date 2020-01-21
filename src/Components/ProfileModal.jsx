import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import Api from '../Api';

const ProfileModal = props => {
  const { buttonLabel, className } = props;

  const profile = JSON.parse(JSON.stringify(props.profile));

  let selectedFile = useState(null);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onChangeHandler = event => {
    console.log(event.target.files[0]);
    selectedFile = event.target.files[0];
  };

  const submit = () => {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const area = document.getElementById('area').value;
    const title = document.getElementById('title').value;
    const bio = document.getElementById('bio').value;
    // const image = document.getElementById('image').value;

    const profile = { name, surname, email, area, title, bio };
    console.log(selectedFile);
    Api.fetch('/profile', 'PUT', JSON.stringify(profile)).then(() => {
      var formData = new FormData();
      formData.append("profile", selectedFile);
      Api.request("/profile/" + Api.USER + "/picture", "POST", formData);
      toggle();
      window.location.reload();
    });
  };

  return (
    <div>
      <Button onClick={toggle} className={'buttonEdit'} id='buttonEdit'>
        <i className='fas fa-pencil-alt fa-2x'></i>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for='name'>Name</Label>
                  <Input type='text' name='name' id='name' defaultValue={props.profile.name} placeholder='Mario' />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for='surname'>Surname</Label>
                  <Input type='text' name='surname' id='surname' defaultValue={props.profile.surname} placeholder='Smith' />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input type='email' name='email' id='email' defaultValue={props.profile.email} placeholder='user@example.com' />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for='area'>Area</Label>
                  <Input type='text' name='area' id='area' defaultValue={props.profile.area} placeholder='Bangalore' />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input type='text' name='title' id='title' defaultValue={props.profile.title} placeholder='CTO @ ACME corp' />
            </FormGroup>
            <FormGroup>
              <Label for='bio'>Bio</Label>
              <Input type='textarea' name='bio' id='bio' defaultValue={props.profile.bio} placeholder='Bio' />
            </FormGroup>
            <FormGroup>
              <Label for='description'>Upload Photo</Label>
              <Input type='file' name='picture' id='picture'
                     onChange={onChangeHandler} placeholder=''/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={submit}>
            Edit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProfileModal;
