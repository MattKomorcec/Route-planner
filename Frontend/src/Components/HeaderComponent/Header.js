import React from 'react';

class Header extends React.Component {

    handleClickLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        document.location.reload();
    }

    render() {
        return (
            <div className="row header-holder">   
                <div className="col-md-4">
                    <h2>Route Planner</h2>
                </div>
                <div className="col-md-8 text-right user-info-holder">
                    <p>Welcome { localStorage.getItem('username') } <button className="btn btn-danger" onClick={ this.handleClickLogout }>Logout</button></p>
                </div>
            </div>  
        );
    }
}

export default Header;