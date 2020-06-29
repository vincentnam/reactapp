import React from 'react';
import { TileLayer, Popup} from 'react-leaflet';

import L from 'leaflet';

import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import Chart from "./Chart";
import PieMarker from "./PieMarker";


class GeoMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isLoaded:false, markers_data: []}






    }
    componentWillMount() {
                    fetch("http://localhost:5000/allgates")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            markers_data: JSON.parse(result)
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    }

    render() {

              const Map = ReactMapboxGl({
                  accessToken:
                      'pk.eyJ1IjoibXlnYXRlcyIsImEiOiJjanh1aHcyb3gwNXJhM2ZwOWg3enBkZHhwIn0.jszPwygXpk_DPVtBWnz_Og'
              });
              return (
                  <Map
                      style="mapbox://styles/mygates/cjyu4lvs20tas1cpquf82nxvg"
                      containerStyle={{
                          height: '80vh',
                          width: '60vw'
                      }} center={[1.470, 43.564]} zoom={[15]}>
                      {/** center : longitude latitude to fit with geoJson format**/}

                      {
                          this.state.markers_data.map(item => (
                              <Marker coordinates={item.geoJson.coordinates}
                                      offsetLeft={-20} offsetTop={-10}
                                      anchor="bottom-left"
                                      key={item.id}
                              >
                                  <div>
                                      <PieMarker car_in={item.car_auth}
                                                 car_alert={item.car_refused}
                                                 period={this.props.period}
                                                 handlerAlert={this.props.handlerAlert}
                                      />
                                  </div>
                              </Marker>
                          ))
                      }


                  </Map>
              );

          }

}

export default GeoMap;
