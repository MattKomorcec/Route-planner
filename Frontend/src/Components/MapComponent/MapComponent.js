import React from 'react';
import { connect } from'react-redux';
import { directions_loaded } from '../../Actions/SidebarConfig/directions_loaded.js';
import { directions_error } from '../../Actions/SidebarConfig/directions_error.js';

// Using window.google since google maps are a global variable

class MapComponent extends React.Component {

    componentDidMount() {
        this.init();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.directionsObj !== this.props.directionsObj) {
            this.calculateAndDisplayRoute(newProps.directionsObj);
        }
    }

    init = () => { // init function
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        console.log('Init called!')
        var defaultLatLng = {
            lat: 45.8113979,
            lng: 16.001993
        }

        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 13,
            disableDefaultUI: true,

            // The latitude and longitude to center the map (always required)

            center: new window.google.maps.LatLng(defaultLatLng), // Zagreb

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [
                {"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}]
        };

        // Get the HTML DOM element that will contain your map
        var mapElement = document.getElementById('google-map');

        // Create the Google Map using our element and options defined above
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        this.directionsService = new window.google.maps.DirectionsService();
        this.map = new window.google.maps.Map(mapElement, mapOptions);
                
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(document.getElementById('directions-result'));

    } // end of Init function

    calculateAndDisplayRoute = (directionsObj) => {
        let {dispatch} = this.props;
        let { start, end, travelMode } = directionsObj;
        this.directionsService.route({
            origin: start,
            destination: end,
            travelMode: travelMode
        }, function(response, status) {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
                document.getElementById('route-distance').innerHTML = response.routes[0].legs[0].distance.text;
                document.getElementById('route-duration').innerHTML = response.routes[0].legs[0].duration.text;
                console.log(response)
                dispatch(directions_loaded());
            } else {
                console.log(status);
                dispatch(directions_error("NO_RESULTS"));
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="map-holder clearfix">
                <div id="google-map"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        directionsObj: state.Sidebar.directionsObj
    }
}

export default connect(mapStateToProps)(MapComponent);