// app/index.tsx
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 All Trips</Text>
      <Text style={styles.sub}>This will show your trip list</Text>
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
  },
  sub: {
    fontSize: 16,
    marginTop: 10,
    color: "#777",
  },
});
