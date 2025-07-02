// app/(tabs)/add-trip/index.tsx
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { DatePicker } from "../../../components/nativewindui/DatePicker";
import { Text } from "../../../components/nativewindui/Text";
import API_BASE_URL from "../../../constants/api";

export default function AddTripScreen() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [budget, setBudget] = useState("");
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
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
        setDate(new Date());
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
    <View
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
        Destination
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1a1a1a" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#555" : "#ccc",
          },
        ]}
        value={destination}
        onChangeText={setDestination}
        placeholder="e.g. Batam"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
      />

      <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
        Date
      </Text>
      <DatePicker
        value={date}
        mode="date"
        onChange={(ev) => {
          const newDate = new Date(ev.nativeEvent.timestamp);
          setDate(newDate);
          console.log(newDate);
        }}
      />
      <Text style={{ marginTop: 8, color: isDark ? "#fff" : "#000" }}>
        {date.toISOString().split("T")[0]}
      </Text>

      <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
        Budget (SGD)
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1a1a1a" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#555" : "#ccc",
          },
        ]}
        value={budget}
        onChangeText={setBudget}
        placeholder="e.g. 150"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        keyboardType="numeric"
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Add Trip" onPress={handleSubmit} color={isDark ? "#1e90ff" : "#007aff"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
});
