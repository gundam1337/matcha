import React, { useState } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "../style/location.css";

Modal.setAppElement("#root");

const center = [34.020882, -6.84165];

function MyMapComponent({ onDataFetch, setFieldValue }) {
  const [position, setPosition] = useState(center);
  const [place, setPlace] = useState({city: "",country: ""})
  function LocationMarker() {
    useMapEvents({
      async click(e) {
        setPosition(e.latlng);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        );

        const data = await response.json();
        if (data.address) {
          onDataFetch({
            city: data.address.city || data.address.town || "",
            country: data.address.country || "",
          });
          const city = data.address.city || data.address.town || "";
          const country = data.address.country || "";
          onDataFetch({ city, country });
          setFieldValue("location.latitude", e.latlng.lat);
          setFieldValue("location.longitude", e.latlng.lng);
          setFieldValue("location.city", city);
          setFieldValue("location.country", country);
        } else {
          onDataFetch({
            city: "",
            country: "",
          });
        }
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  }

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "70%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
}

const Location = ({ setFieldValue, errors, touched }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataFromChild, setDataFromChild] = useState({});

  const handleData = (data) => {
    setDataFromChild(data);
  };
  return (
    <>
      <div className="form-group profile-photo-upload">
        <label htmlFor="profilePhoto">Location</label>
        <img
          src="https://assets-global.website-files.com/620d42e86cb8ec4d0839e59d/6230e9244963aa3b684c5ed2_61cb6723e4c8112dbd440616_Location-Based-Services-Example.jpeg"
          alt="Person's profile"
          className="profile-img"
        ></img>
        <button
          onClick={() => setModalIsOpen(true)}
          type="button"
          className="btn-upload"
        >
          find me
        </button>

        
          {/* Display city and country data if there are no errors */}
          {!errors.location && (
            <p className="location-info">
              city: {dataFromChild.city} <br />
              country: {dataFromChild.country}
            </p>
          )}

          {/* Display error message if there are errors */}
          {errors.location && touched.location && (
            <>
            <p className="infoError">
              {errors.location.city}
            </p>
            <br></br>
            <p className="infoError">
              {errors.location.country}
            </p>
            </>
          )}
        

        <Modal
          style={{
            content: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Location Picker"
        >
          <MyMapComponent
            onDataFetch={handleData}
            setFieldValue={setFieldValue}
          />
          <br />
          <div className="modal-container">
            //this not display until the somthing get change 
            <p className="location-info">
              city: {dataFromChild.city} <br />
              country: {dataFromChild.country}
            </p>
          </div>

          <button
            type="button"
            className="btn-save"
            onClick={() => setModalIsOpen(false)}
          >
            Save the change
          </button>
        </Modal>
      </div>
    </>
  );
};
export default Location;
