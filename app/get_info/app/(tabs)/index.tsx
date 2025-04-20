import { StyleSheet, Button, TextInput, Text, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { useCallback, useEffect, useState, useTransition } from "react";
import * as Location from "expo-location";
import { debounce } from "lodash";

export default function HomeScreen() {
  const [location, setLocation] = useState({
    latitude: 72.5,
    longitude: 28.8,
  });
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(200);
  const [suggestions, setSuggestions] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);

  const [latLon, setLatLon] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  
  const handleSearch = useCallback(
    debounce(async (query: string) => {
      console.log(query);
      if (!query) {
        return;
      }
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1`;
      const options = {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        },
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 1200),
    []
  );

  // const handleAddressChange = useCallback(async (newAddress: string) => {
  //   setAddress(newAddress);
  //   try {
  //     const geocodeResult = await Location.geocodeAsync(newAddress);
  //     if (geocodeResult.length > 0) {
  //       const { latitude, longitude } = geocodeResult[0];
  //       setLatLon({ latitude, longitude });
  //     } else {
  //       console.log("Address not found");
  //     }
  //   } catch (error) {
  //     console.log("Error fetching ghghlocation data: " + error.message);
  //   }
  // }, []);
  // Use the device's current location if the user doesn't input an address
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>Home</ThemedText>

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
          color: "white",
        }}
        placeholder="Search address..."
        onChangeText={handleSearch}
      />

      <FlatList
        style={{ height: "20%", width: "auto", backgroundColor: "ff0000" }}
        data={suggestions}
        renderItem={({ item }) => (
          <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
            {item.display_name}
          </ThemedText>
        )}
        keyExtractor={(item) => item.display_name}
      />
      {/* 
      <TextInput
        aria-label="radius"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
          color: "white",
        }}
        placeholder="Enter radius (meters)"
        value={String(radius)}
        onChangeText={(text) => setRadius(Number(text))}
        keyboardType="numeric"
      /> */}

      {errorMsg && <ThemedText style={{ color: "red" }}>{errorMsg}</ThemedText>}

      <Button title="Reset" onPress={() => setLatLon(null)} />

      <MapView
        zoomControlEnabled
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latLon?.latitude || location.latitude,
          longitude: latLon?.longitude || location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {latLon && radius && (
          <Circle
            center={latLon}
            radius={radius}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgb(255, 0, 0)"
            strokeWidth={2}
          />
        )}
      </MapView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    color: "#1500ff",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  map: {
    width: "100%",
    height: "70%",
  },
});
