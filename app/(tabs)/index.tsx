// app/index.tsx
import { StyleSheet, View } from "react-native";
import { Text } from "../../components/nativewindui/Text";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Travel Expense Buddy</Text>
      <Text style={styles.sub}>Responsible buddy tracking your trips for you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Will override with dark mode later
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#777"
  },
  sub: {
    fontSize: 16,
    marginTop: 10,
    color: "#777",
  },
});
