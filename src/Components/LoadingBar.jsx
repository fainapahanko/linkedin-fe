import React, {Component} from 'react';

class LoadingBar extends Component {
    render() {
        return (
            <div>
                <div id="app-boot-bg-loader" className="app-boot-bg-skeleton">
                    <div className="top-bar"></div>
                    <div className="content">
                        <div className="initial-load-animation">
                            <div className="loading-bar">
                                <div className="blue-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LoadingBar;