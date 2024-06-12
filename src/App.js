import React, { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [markers, setMarkers] = useState([]);

  // Добавлення маркера
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setMarkers([...markers, e.latlng]);
        console.log(markers);
        saveMarkerToFirebase(e.latlng);
      },
    });
    return null;
  };

  // Видалення маркерів по одному, клацнувши по ньому 2 рази
  const handleMarkerDoubleClick = (idx) => {
    setMarkers(markers.filter((_, index) => index !== idx));
  };

  // Видалення всіх маркерів
  const handleRemoveAllMarkers = () => {
    setMarkers([]);
  };

  // Перенесення маркерів
  const handleMarkerDragEnd = (event, idx) => {
    const { lat, lng } = event.target.getLatLng();
    const updatedMarkers = [...markers];
    updatedMarkers[idx] = { lat, lng };
    setMarkers(updatedMarkers);
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/10492/10492160.png",
    iconSize: [38, 38],
  });

  const saveMarkerToFirebase = async (marker) => {
    try {
      await addDoc(collection(db, "markers"), {
        location: { lat: marker.lat, lng: marker.lng },
        timestamp: new Date().toISOString(),
      });
    } catch (e) {}
  };

  return (
    <div className="App">
      <h1>Viso Test Map</h1>
      <button className="button_delete" onClick={handleRemoveAllMarkers}>
        Delete all markers
      </button>
      <MapContainer center={[49.843, 24.025]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        <MapEvents></MapEvents>
        <MarkerClusterGroup>
          {markers.map((position, idx) => (
            <Marker
              key={`marker-${idx}`}
              position={position}
              icon={customIcon}
              draggable={true}
              eventHandlers={{
                dblclick: () => handleMarkerDoubleClick(idx),
                dragend: (event) => handleMarkerDragEnd(event, idx),
              }}
            >
              <Popup>
                <h2>
                  {`Lat:${
                    position.lat.toFixed(3) + " Lng:" + position.lng.toFixed(3)
                  }  Hello i'm a popup Number ${idx + 1}`}
                </h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
export default App;
