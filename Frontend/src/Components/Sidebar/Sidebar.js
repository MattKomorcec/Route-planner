import React from 'react';
import { connect } from 'react-redux';
import { set_directions } from '../../Actions/SidebarConfig/set_directions.js';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            start: '',
            end: '',
            metric: false,
            imperial: false,
            avoidTolls: false,
            avoidHighways: false,
            isGettingDirs: false,
            travelMode: ''
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isGettingDirs !== this.props.isGettingDirs) {
            this.setState({
                isGettingDirs: newProps.isGettingDirs
            });
        }
    }

    handleClickDirections = (e) => {
        if (this.state.start !== '' && this.state.end !== '') {
            this.props.dispatch(set_directions(this.state));
        }
    }

    handleChangeDriveMode = (e) => {
        this.setState({
            travelMode: e.target.value
        });
    }

    handleChangeLocation = (e) => {
        if (e.target.name === 'start') {
            this.setState({
                start: e.target.value
            });
        }
        else {
            this.setState({
                end: e.target.value
            });
        }
    }

    render() {
        return (
            <div className="sidebar-holder">
                <div className="col-md-12">

                    <div className="form-group">
                        <label>Starting location</label>
                        <input type="text" placeholder="Starting location..." id="start" name="start" value={this.state.start} onChange={this.handleChangeLocation} />
                    </div>

                    <div className="form-group">
                        <label>Destination</label>
                        <input type="text" placeholder="Destination location..." id="end" name="end" value={this.state.end} onChange={this.handleChangeLocation} />
                    </div>

                    <hr />

                    <div className="form-group">
                        <label>Travel mode</label>
                        <select className="form-control travel-mode" value={ this.state.travelMode } onChange={ this.handleChangeDriveMode }>
                            <option>-- Choose travel mode --</option>
                            <option value="DRIVING">Driving</option>
                            <option value="BICYCLING">Bicycling</option>
                            <option value="WALKING">Walking</option>
                        </select>
                    </div>

                    <hr />

                    <div className="form-group clearfix">
                        <label>Unit system</label>
                        <div className="col-md-12">
                            <div className="col-md-6">
                                <input type="checkbox" value="Metric" id="unit-metric" />
                                <label className="value-labels" htmlFor="unit-metric">Metric</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox" value="Imperial" id="unit-imperial" />
                                <label className="value-labels" htmlFor="unit-imperial">Imperial</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group clearfix">
                        <label>Additional options</label>
                        <div className="col-md-12">
                            <div className="col-md-6">
                                <input type="checkbox" value="avoid-tolls" id="additional-tolls" />
                                <label className="value-labels" htmlFor="additional-tolls">Avoid tolls</label>
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox" value="Imperial" id="additional-highways" />
                                <label className="value-labels" htmlFor="additional-highways">Avoid highways</label>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="text-center">
                        <button className="directions-btn" onClick={this.handleClickDirections}>Get Directions</button>
                    </div>

                    <hr />

                    <p>{this.state.isGettingDirs ? 'Getting route' : null}</p>

                    {
                        this.props.directionsError ?
                            <div className="alert alert-danger">
                                <strong>Error!</strong> There was an error. Try again.
                            </div>
                            :
                            null
                    }

                    <div style={{ display: this.props.directionsObj ? 'block' : 'none' }}>
                        <div className="route-info">
                            <label>Route info:</label>
                            <p>Distance: <span id="route-distance"></span>, duration: <span id="route-duration"></span></p>
                        </div>

                        <div id="directions-result">
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isGettingDirs: state.Sidebar.isGettingDirs,
        directionsObj: state.Sidebar.directionsObj,
        directionsError: state.Sidebar.directionsError
    }
}

export default connect(mapStateToProps)(Sidebar);