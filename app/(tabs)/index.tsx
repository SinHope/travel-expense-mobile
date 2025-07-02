// app/index.tsx
import { useColorScheme } from "nativewind";
import { StyleSheet, View } from "react-native";
import { Text } from "../../components/nativewindui/Text";
import { ThemeToggle } from "../../components/nativewindui/ThemeToggle";

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#fff" },
      ]}
    >
      <View style={styles.toggleContainer}>
        <ThemeToggle />
      </View>

      <Text
        style={[styles.title, { color: isDark ? "#fff" : "#333" }]}
      >
        📍 Travel Expense Buddy
      </Text>

      <Text
        style={[styles.sub, { color: isDark ? "#ccc" : "#777" }]}
      >
        Responsible buddy tracking your trips for you
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  toggleContainer: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  sub: {
    fontSize: 16,
    marginTop: 10,
  },
});
