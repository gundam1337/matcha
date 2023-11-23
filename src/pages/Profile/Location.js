import React, { useState } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

Modal.setAppElement('#root');
//TODO change the center to the moroco
const center = [34.020882, -6.841650]; // Coordinates for Rabat, Morocco

function MyMapComponent() {
  const [position, setPosition] = useState(center);

  function LocationMarker() {
    useMapEvents({
      async click(e) {
        setPosition(e.latlng);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        );
        const data = await response.json();
        console.log({
          city: data.address.city || data.address.town || "",
          country: data.address.country || "",
        });
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  }

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
}
const Location = () => {
  //const [location, setLocation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="form-group profile-photo-upload">
        <label htmlFor="profilePhoto">Location</label>
        <img
          src="https://assets-global.website-files.com/620d42e86cb8ec4d0839e59d/6230e9244963aa3b684c5ed2_61cb6723e4c8112dbd440616_Location-Based-Services-Example.jpeg"
          alt="Person's profile"
          className="profile-img"
        ></img>

        {/* {!location ? (
          <></>
        ) : (
          <p className="file-type-info">your location is : {}</p>
        )} */}
        <button
          onClick={() => setModalIsOpen(true)}
          type="button"
          className="btn-upload"
        >
          find me
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Location Picker"
        >
          <MyMapComponent />
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      </div>
    </>
  );
};
export default Location;
