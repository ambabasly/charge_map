import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { EnvironmentFilled } from "@ant-design/icons";
import { Modal, Row, Col } from "antd";

export class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: null,
    };
  }

  // default props
  static defaultProps = {
    zoom: 10,
  };

  // charge center maker
  ChargeCenter = (location) => {
    return (
      <div
        onClick={() => {
          this.open(location);
        }}
        lat={location.AddressInfo.Latitude}
        lng={location.AddressInfo.Longitude}
        location={location}
      >
        <EnvironmentFilled
          style={{
            fontSize: "40px",
          }}
        />
      </div>
    );
  };

  open = (location) => {
    this.setState({
      current: location,
      visible: true,
    });
  };

  close = () => {
    this.setState({
      current: null,
      visible: false,
    });
  };

  // _onChildClick = (key, childProps) => {
  //   this.setState({
  //     current: childProps.location,
  //     visible: true,
  //   })
  // }

  render() {
    const { locations } = this.props;
    const { visible, current } = this.state;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          defaultCenter={{
            lat: this.props.lat,
            lng: this.props.long,
          }}
          defaultZoom={this.props.zoom}
          // onChildClick={this._onChildClick}
        >
          {/* <Home
            lat={this.props.lat}
            lng={this.props.long}
          /> */}

          {locations.map((item) => this.ChargeCenter(item))}
        </GoogleMapReact>

        {current !== null && (
          <Modal
            footer={null}
            title={null}
            onCancel={this.close}
            onOk={this.close}
            visible={visible}
            className="info-modal"
          >
            <h1 className="title">
              {current?.AddressInfo?.Postcode}, {current?.AddressInfo?.Town} (
              {current?.AddressInfo?.Country.Title})
            </h1>

            <Row>
              <Col lg={12} xs={24}>
                <p className="footnote">{current.OperatorInfo.Title}</p>
                <p className="footnote">{current.OperatorInfo.Comments}</p>
              </Col>
              <Col lg={12} xs={24}>
                <p className="footnote">
                  Latitude: {current.AddressInfo.Latitude}
                </p>
                <p className="footnote">
                  Longitude: {current.AddressInfo.Longitude}
                </p>
              </Col>
            </Row>

            <p className="footnote">
              Status:{" "}
              {current.StatusType.IsOperational ? "Available" : "Not Available"}
            </p>

            <table>
              <tr>
                <th>#</th>
                <th>Plug Type</th>
                <th>Max Power</th>
              </tr>
              {current.Connections.map((item, index) => (
                <>
                  <tr key={`conn-${item.ID}`}>
                    <td>{index + 1}</td>
                    <td>{item.ConnectionType.Title}</td>
                    <td>{item.PowerKW} kW</td>
                  </tr>
                </>
              ))}
            </table>
          </Modal>
        )}
      </div>
    );
  }
}
