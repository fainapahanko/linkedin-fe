import React, {Component} from 'react';
import Profile from "./Profile";
import Experiences from "./Experiences";
import { withRouter } from 'react-router-dom'


class ProfilePage extends Component {

    render() {
        return (
            <div>
                <Profile match={this.props.match.params.id} />
                <Experiences match={this.props.match.params.id} />
            </div>
        );
    }
}

export default withRouter(ProfilePage);