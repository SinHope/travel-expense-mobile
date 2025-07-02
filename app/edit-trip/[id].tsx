// app/edit-trip/[id].tsx
import API_BASE_URL from "@/constants/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/nativewindui/Text";


export default function EditTripScreen() {
  const { id } = useLocalSearchParams();
  console.log("🟡 Params (id):", id); // ✅ Log the received id from URL
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/trips/${id}`);
        console.log("🌐 API_BASE_URL:", API_BASE_URL);
        // Check for a valid response
        if (!res.ok) {
          const errorText = await res.text(); // Read raw HTML error
          throw new Error(`Server error: ${res.status} - ${errorText}`);
        }
        const trip = await res.json();
        setDestination(trip.destination || "");
        setDate(trip.date ? new Date(trip.date) : new Date());
        setBudget(trip.budget?.toString() || "");
      } catch (err) {
        console.error("Failed to load trip", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/trips/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          date,
          budget: parseFloat(budget),
        }),
      });
      router.replace("/trips"); // Go back to trips list
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>📅 Date</Text>

      {Platform.OS === "web" ? (
        <input
          type="date"
          value={date.toISOString().slice(0, 10)}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
      ) : (
        <>
          <Text style={styles.label}>📅 {date.toISOString().slice(0, 10)}</Text>
          <Button title="Choose Date" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(e, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Budget (SGD)</Text>
      <TextInput
        style={styles.input}
        value={budget}
        onChange={setBudget}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>UPDATE TRIP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  label: { fontWeight: "bold", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
