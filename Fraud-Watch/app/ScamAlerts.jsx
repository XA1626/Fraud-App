import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const ScamAlerts = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Request user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922, // Determines zoom level (adjust as needed)
        longitudeDelta: 0.0421,
      });
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        initialRegion={location} // Set map's initial region to user's location
        showsUserLocation={true} // Show the user's current location
      >
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
            description="This is where you are currently located"
          />
        )}
      </MapView>
    </View>
  );
};

export default ScamAlerts;

