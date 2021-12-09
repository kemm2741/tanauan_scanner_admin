import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Typography from "@material-ui/core/Typography";

// ! Import Base URL
import { baseURL } from "../utils/baseURL";

// Import axios
import axios from "axios";

// React Icons
import { FaMapMarkerAlt } from "react-icons/fa";

const Map = () => {
  const [showPopup, togglePopup] = useState(false);
  const [data, setData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 11.111,
    longitude: 125.0156,
    zoom: 11.5,
    pitch: 40,
  });

  // fetchBranch
  const fetchBranch = async () => {
    try {
      let { data } = await axios.get(`${baseURL}/branch`);
      setData(data.branch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <>
      <Typography style={{ marginBottom: "20px" }} variant="h5">
        Map of Registered Branch
      </Typography>

      <ReactMapGL
        mapboxApiAccessToken={
          "pk.eyJ1IjoidGFuYXVhbiIsImEiOiJja3N0bWdrdWMwOXoxMndwNmhuaDN0MnhoIn0.LeQnXm_RC-fKuafoB1ux-A"
        }
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        width="100%"
        height="85vh"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {data.map((branch) => {
          const { latitude, longitude } = branch;
          return (
            <>
              <Marker
                latitude={parseFloat(latitude)}
                longitude={parseFloat(longitude)}
                offsetLeft={-10}
                // offsetTop={-10}
                offsetTop={(-viewport.zoom * 5) / 2}
              >
                <FaMapMarkerAlt size={viewport.zoom * 1.5} color="red" />
              </Marker>
            </>
          );
        })}
      </ReactMapGL>
    </>
  );
};

export default Map;
