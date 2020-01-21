import React from 'react';
import {Container} from 'reactstrap'
import NavigationBar from './NavigationBar';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import ProfilePage from "./ProfilePage";
import NewsFeed from './NewsFeed';
import Login from "./Login";

function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                sessionStorage.getItem("username") ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

class MainPage extends React.Component {
    state = {};

    render() {
        return (
            <div>


                <Router>
                    <PrivateRoute path='/' exact>
                        <NavigationBar/>
                        <ProfilePage/>
                    </PrivateRoute>
                    <PrivateRoute path='/users/:id'>
                        <NavigationBar/>
                        <ProfilePage/>
                    </PrivateRoute>
                    <PrivateRoute path='/NewsFeed'>
                        <NavigationBar/>
                        <Container>
                            <NewsFeed/>
                        </Container>
                    </PrivateRoute>
                    <Route path='/login'>
                        <Login/>
                    </Route>
                </Router>

            </div>


        );
    }
}

export default MainPage;
