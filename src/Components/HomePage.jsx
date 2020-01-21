import React, {Component} from 'react'
import Profile from './Profile'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Profile />

                <NewsFeed />
            </div>
        )
    }
}


