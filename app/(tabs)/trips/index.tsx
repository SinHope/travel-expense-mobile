// app/(tabs)/trips/index.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import API_BASE_URL from "../../../constants/api";


export default function TripsScreen() {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const fetchTrips = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/trips`);
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/trips/${id}`, {
        method: "DELETE",
      });
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (error) {
      Alert.alert("Delete Failed", "Unable to delete trip.");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Trips</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              📍 {item.destination || "No title"}
            </Text>
            <Text>📅 {item.date || "No date"}</Text>
            <Text>💰 ${item.budget ?? 0}</Text>

            <TouchableOpacity
              onPress={() => deleteTrip(item._id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push(`/edit-trip/${item._id}`)}
              style={styles.editButton}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  deleteButton: {
    marginTop: 8,
    backgroundColor: "red",
    paddingVertical: 6,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  editText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
