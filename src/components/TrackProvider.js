// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet's default icon issue
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
// });

// const TrackProvider = ({ employeeId }) => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!employeeId) return;

//     const fetchLocation = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.capture360.ai/kovais/track-provider/?employee_id=${employeeId}`
//         );
//         setLocation({
//           lat: parseFloat(res.data.lat),
//           lng: parseFloat(res.data.lng),
//         });
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching location:", err);
//         setError("Unable to fetch provider location.");
//       }
//     };

//     fetchLocation(); // Fetch first immediately
//     const interval = setInterval(fetchLocation, 5000); // Refresh every 5 sec

//     return () => clearInterval(interval);
//   }, [employeeId]);

//   if (error) return <p className="text-accent">{error}</p>;

//   if (!location)
//     return <p className="text-muted">Fetching provider location...</p>;

//   return (
//     <MapContainer
//       center={[location.lat, location.lng]}
//       zoom={15}
//       scrollWheelZoom={false}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={[location.lat, location.lng]}>
//         <Popup>Service Provider</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default TrackProvider;




import React, { useEffect, useState, useRef } from "react";

// Real location from your Google Maps URL - Gobichettipalayam, Tamil Nadu
const DEFAULT_LOCATION = {
  lat: 11.4583,
  lng: 77.4375,
  name: "SH 15, Otthakkuthirai, Gobichettipalayam, Tamil Nadu 638455"
};

// Mock API function to simulate employee locations around Gobichettipalayam area
const mockEmployeeAPI = (employeeId) => {
  // Employee locations around Gobichettipalayam area
  const locations = [
    { lat: 11.4603, lng: 77.4395, name: "Gobichettipalayam Bus Stand" },
    { lat: 11.4563, lng: 77.4355, name: "Gobichettipalayam Market" },
    { lat: 11.4523, lng: 77.4415, name: "Gobichettipalayam Hospital" },
    { lat: 11.4643, lng: 77.4335, name: "Gobichettipalayam Railway Station" },
    { lat: 11.4503, lng: 77.4395, name: "Otthakkuthirai Village" }
  ];
  
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({
          data: {
            lat: randomLocation.lat.toString(),
            lng: randomLocation.lng.toString(),
            location_name: randomLocation.name,
            timestamp: new Date().toISOString(),
            employee_id: employeeId,
            status: "active"
          }
        });
      } else {
        reject(new Error("Network connection failed"));
      }
    }, 5000);
  });
};

// Calculate distance between two points (Haversine formula)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Calculate bearing between two points
const calculateBearing = (lat1, lng1, lat2, lng2) => {
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const y = Math.sin(dLng) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLng);
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};

const TrackProvider = ({ employeeId = "EMP001" }) => {
  const [employeeLocation, setEmployeeLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef(null);
  const intervalRef = useRef(null);

  const fetchEmployeeLocation = async () => {
    if (!employeeId) {
      setError("Employee ID is required");
      return;
    }

    try {
      // Replace with your actual API call when ready
      // const res = await axios.get(`https://api.capture360.ai/kovais/track-provider/?employee_id=${employeeId}`);
      
      const res = await mockEmployeeAPI(employeeId);
      
      const newLocation = {
        lat: parseFloat(res.data.lat),
        lng: parseFloat(res.data.lng),
        name: res.data.location_name || "Employee Location",
        status: res.data.status || "active"
      };

      if (isNaN(newLocation.lat) || isNaN(newLocation.lng)) {
        throw new Error("Invalid coordinates received from API");
      }

      setEmployeeLocation(newLocation);
      setLastUpdated(new Date());
      setError(null);
      setIsOnline(true);

      // Calculate distance, bearing and estimated time
      const dist = calculateDistance(
        currentLocation.lat, currentLocation.lng,
        newLocation.lat, newLocation.lng
      );
      setDistance(dist);
      setEstimatedTime(Math.round(dist * 2.5)); // Assuming 24 km/h average speed in city
      
      const bear = calculateBearing(
        currentLocation.lat, currentLocation.lng,
        newLocation.lat, newLocation.lng
      );
      setBearing(bear);

    } catch (err) {
      console.error("Error fetching employee location:", err);
      setError(`Failed to fetch employee location: ${err.message}`);
      setIsOnline(false);
    }
  };

  useEffect(() => {
    if (!employeeId) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    fetchEmployeeLocation();

    if (isTracking) {
      intervalRef.current = setInterval(fetchEmployeeLocation, 8000); // Every 8 seconds when tracking
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [employeeId, isTracking]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCurrentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Your Current Location"
          };
          setCurrentLocation(newCurrentLocation);
          
          if (employeeLocation) {
            const dist = calculateDistance(
              newCurrentLocation.lat, newCurrentLocation.lng,
              employeeLocation.lat, employeeLocation.lng
            );
            setDistance(dist);
            setEstimatedTime(Math.round(dist * 2.5));
            
            const bear = calculateBearing(
              newCurrentLocation.lat, newCurrentLocation.lng,
              employeeLocation.lat, employeeLocation.lng
            );
            setBearing(bear);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Unable to get your current location. Using default location.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const openGoogleMaps = () => {
    if (employeeLocation) {
      const url = `https://www.google.com/maps/dir/${currentLocation.lat},${currentLocation.lng}/${employeeLocation.lat},${employeeLocation.lng}`;
      window.open(url, '_blank');
    }
  };

  const getDirectionText = (bearing) => {
    const directions = [
      "North", "North-East", "East", "South-East",
      "South", "South-West", "West", "North-West"
    ];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  if (error && !employeeLocation) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-red-700 font-medium">Connection Error</p>
        </div>
        <p className="text-red-600 text-sm mb-3">{error}</p>
        <button 
          onClick={fetchEmployeeLocation}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!employeeLocation) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-700 font-medium">Locating Employee...</p>
          <p className="text-gray-500 text-sm mt-1">Connecting to tracking system</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-gray-100">
      {/* Header Status Bar */}
      <div className="absolute top-3 left-3 z-[1000] bg-white rounded-xl shadow-lg p-4 max-w-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="font-semibold text-gray-800">Employee {employeeId}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            employeeLocation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {employeeLocation.status || 'Active'}
          </span>
        </div>
        
        <div className="space-y-1 text-sm">
          <div className="flex items-center text-blue-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {employeeLocation.name}
          </div>
          
          {distance > 0 && (
            <div className="flex items-center text-green-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {distance.toFixed(2)} km • {estimatedTime} min • {getDirectionText(bearing)}
            </div>
          )}
          
          {lastUpdated && (
            <div className="text-xs text-gray-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col space-y-2">
        <button
          onClick={getCurrentLocation}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 shadow-lg transition-colors"
          title="Get my current location"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        </button>
        
        <button
          onClick={toggleTracking}
          className={`${isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg p-3 shadow-lg transition-colors`}
          title={isTracking ? "Stop tracking" : "Start tracking"}
        >
          {isTracking ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0-6l-6 6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 010 5H9m4.5-5H15a2.5 2.5 0 010 5h-1.5m-4-5v5m6-5v5" />
            </svg>
          )}
        </button>
        
        <button
          onClick={openGoogleMaps}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-3 shadow-lg transition-colors"
          title="Open in Google Maps"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </button>
        
        <button
          onClick={() => setShowDirections(!showDirections)}
          className={`${showDirections ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded-lg p-3 shadow-lg transition-colors`}
          title="Toggle directions"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
      </div>

      {/* Directions Panel */}
      {showDirections && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] bg-white rounded-xl shadow-lg p-4 max-h-40 overflow-y-auto border border-gray-200">
          <h3 className="font-bold text-lg mb-3 flex items-center text-gray-800">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Navigation Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-700">From:</p>
                  <p className="text-gray-600 text-xs">{currentLocation.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-700">To:</p>
                  <p className="text-gray-600 text-xs">{employeeLocation.name}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-800">Distance:</span>
                  <span className="text-blue-600 font-bold">{distance.toFixed(2)} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-800">Est. Time:</span>
                  <span className="text-blue-600 font-bold">{estimatedTime} minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-800">Direction:</span>
                  <span className="text-blue-600 font-bold">{getDirectionText(bearing)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Embed */}
      <div className="w-full h-full">
        <iframe
          ref={mapRef}
          src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dATNbvKA3P6-8Y&origin=${currentLocation.lat},${currentLocation.lng}&destination=${employeeLocation.lat},${employeeLocation.lng}&mode=driving&zoom=15`}
          className="w-full h-full border-0 rounded-lg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Route to ${employeeLocation.name}`}
        />
      </div>

      {/* Real-time Status Indicator */}
      {isTracking && (
        <div className="absolute bottom-4 right-4 z-[1000]">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-medium">Live Tracking</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackProvider;