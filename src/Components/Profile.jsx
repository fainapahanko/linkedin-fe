import React from 'react';
import ProfileHeading from './ProfileHeading';
import AboutUs from './AboutUs';
import {Col, Container, Jumbotron, Row} from 'reactstrap';
import Api from '../Api';
import LoadingBar from "./LoadingBar";

class Profile extends React.Component {
    state = {
        profile: null
    };

    render() {
        return (
            this.state.profile ? (
                <div>
                    <Container>
                        <Row>
                            <Col className="col-12">
                                <Jumbotron className='profile-background-image jumbotronProfile'>
                                    <Container>
                                        <ProfileHeading profile={this.state.profile}/>
                                    </Container>
                                </Jumbotron>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <AboutUs profile={this.state.profile}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (<LoadingBar/>)
        );
    }

    async loadData() {
        let user = "me";
        if (this.props.match) {
            user = this.props.match;
        }
        this.setState({
            profile: await Api.fetch('/profile/' + user)
        });
    }

    componentDidMount = async () => {
        this.loadData();
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match !== this.props.match)  {
            this.loadData();
        }
    }
}

export default Profile;
