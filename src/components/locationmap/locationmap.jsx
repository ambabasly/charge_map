import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  EnvironmentFilled
} from '@ant-design/icons';
// import { Modal } from 'antd'

class SimpleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      current: null
    }
  }

  // default props
  static defaultProps = {
    zoom: 10
  };

  // charge center maker
  ChargeCenter = (location) => {
    return (
      <div
        onClick={() => {
          this.open(location)
        }}
        lat={location.AddressInfo.Latitude}
        lng={location.AddressInfo.Longitude}
      >
        <EnvironmentFilled
          style={{
            fontSize: '40px'
          }}
        />
      </div>
    )
  }

  open = (current) => {
    console.log(current)
    this.setState({
      current,
      visible: true
    })
  }

  close = () => {
    this.setState({
      current: null,
      visible: false
    })
  }


  render() {
    const { locations } = this.props
    // const { visible, current } = this.state

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={process.env.REACT_APP_API_KEY}
          defaultCenter={{
            lat: this.props.lat,
            lng: this.props.long
          }}
          defaultZoom={this.props.zoom}
          
        >
          {/* <Home
            lat={this.props.lat}
            lng={this.props.long}
          /> */}

          {
            locations.map((item) => (
              this.ChargeCenter(item)
            ))
          }
        </GoogleMapReact>

        {/* {
          current !== null &&
          <Modal
            footer={null}
            title={null}
            onCancel={this.close}
            onOk={this.close}
            visible={true}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta, itaque repellat iste molestiae iure fugit neque reiciendis optio esse molestias possimus minima sequi ullam earum explicabo rem saepe iusto.
          </Modal>
        } */}
      </div>
    );
  }
}

export default SimpleMap;