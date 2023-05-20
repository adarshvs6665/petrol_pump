import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const MapComponent = ({ initialLocation, setLocation, setLocationName }) => {
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDE-V3UMnD4OK8SG2S-wzOUGlBF-PlJH_Y",
        libraries,
    });

    useEffect(() => {
        Geocode.setApiKey("AIzaSyDE-V3UMnD4OK8SG2S-wzOUGlBF-PlJH_Y");
        Geocode.fromLatLng(selectedLocation.lat, selectedLocation.lng).then(
            (response) => {
                const address = response.results[0].formatted_address.split(",")[2];
                setLocationName(address);
            },
            (error) => {
                console.error("Error geocoding location:", error);
            }
        );
        setLocation({
            latitude: initialLocation.lat,
            longitude: initialLocation.lng,
        });
    }, [selectedLocation]);

    const handleMapClick = (event) => {
        setSelectedLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
        setLocation({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
        });
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={initialLocation}
            zoom={15}
            onClick={handleMapClick}
        >
            <Marker position={selectedLocation} />
        </GoogleMap>
    );
};

export default MapComponent;
