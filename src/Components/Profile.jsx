import React from 'react';
import ProfileHeading from './ProfileHeading';
import AboutUs from './AboutUs';
import {Col, Container, Jumbotron, Row} from 'reactstrap';
import Api from '../Api';
import LoadingBar from "./LoadingBar";
import html2pdf from "html2pdf.js"
import html2canvas from "html2canvas";

class Profile extends React.Component {
    state = {
        profile: null,
        titleShow: false
    };

    onClick = () => {
        window.html2canvas = html2canvas;
        const title = document.getElementById('cv-title');
        let opt = {
            filename: 'cv.pdf',
            enableLinks: true,
            image: {type: 'jpeg', quality: 0.98},
            margin: [10, 0],
            html2canvas: {
                scale: 8,
                useCORS: true,
                width: 810,
                letterRendering: true,
                ignoreElements: (element) => {
                    return element.tagName === "BUTTON"
                }
            },
            jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'},
        };
        title.style = "display: block";

        html2pdf().set(opt).from(document.getElementById('profile')).then(function(w)  {
            this.save().then(() => title.style = "display: none");
        });


    };

    render() {
        return (
            this.state.profile ? (
                <div>

                    <Container>
                        <h1 id="cv-title" style={{display: this.state.titleShow?'block':'none'}}>Curriculum Vitæ</h1>
                        <Row>
                            <Col className="col-12">
                                <Jumbotron className='profile-background-image jumbotronProfile'>
                                    <Container>
                                        <ProfileHeading printFn={this.onClick} profile={this.state.profile}/>
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
        if (prevProps.match !== this.props.match) {
            this.loadData();
        }
    }
}

export default Profile;
