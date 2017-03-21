import React from 'react';
import { Link } from 'react-router';

class NoMatch extends React.Component {
    render() {
        return (
            <div className="container">
                <h2 className="text-center">Error, the page you requested doesn't exist.</h2>
                <Link to="/"><h3 className="text-center">Go back</h3></Link>
            </div>
        );
    }
}

export default NoMatch;