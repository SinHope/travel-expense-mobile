// app/(tabs)/add-trip/index.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { DatePicker } from "../../../components/nativewindui/DatePicker";
import { Text } from "../../../components/nativewindui/Text";
import API_BASE_URL from "../../../constants/api";

export default function AddTripScreen() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [budget, setBudget] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!destination || !date || !budget) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination, date, budget: parseFloat(budget) }),
      });

      const result = await response.json();
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Trip Added!",
        });
        router.replace("/(tabs)/trips");
        setDestination("");
        setDate("");
        setBudget("");
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add trip.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
        placeholder="e.g. Batam"
      />

      <Text style={styles.label}>Date</Text>
      <DatePicker
        value={date}
        mode="date"
        onChange={(ev) => {
          const newDate = new Date(ev.nativeEvent.timestamp);
          setDate(newDate);
        }}
      />
      <Text style={{ marginTop: 8 }}>{date.toISOString().split("T")[0]}</Text>

      <Text style={styles.label}>Budget (SGD)</Text>
      <TextInput
        style={styles.input}
        value={budget}
        onChangeText={setBudget}
        placeholder="e.g. 150"
        keyboardType="numeric"
      />

      <Button title="Add Trip" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
});
