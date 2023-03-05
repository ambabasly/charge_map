import React, { useMemo, useEffect, useCallback, useState } from "react";
import axios from "axios";
import {SimpleMap} from "../../components/locationmap/locationmap";
import { message } from "antd";

export const Homepage = () => {
  const [locations, setLocations] = useState([]);

  // request details
  const request = useMemo(() => {
    return {
      key: "dbd3949c-d7ea-41aa-81d1-e5d6489e1b",
      countrycode: "DE",
    };
  }, []);

  const getPoi = useCallback(async () => {
    try {
      const res = await axios.get(`https://api.openchargemap.io/v3/poi`, {
        params: {
          ...request,
        },
      });
      setLocations(res.data);
    } catch (error) {
      message.error("Something went wrong");
    }
  }, [request]);

  useEffect(() => {
    getPoi();
  }, [getPoi]);

  return (
    <div className="homepage">
      <h1 className="title">Charge Point Finder</h1>
      <div className="map-holder">
        <SimpleMap
          // long and lat for germany
          lat={51.1657}
          long={10.4515}
          // loations gotten from the endpoint
          locations={locations}
        />
      </div>
    </div>
  );
};
