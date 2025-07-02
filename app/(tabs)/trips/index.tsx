import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../../../components/nativewindui/Text";
import API_BASE_URL from "../../../constants/api";

export default function TripsScreen() {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [filterText, setFilterText] = useState("");

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

  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [])
  );

  const sortedTrips = [...trips].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

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

      {/* Sort Buttons */}
      <View style={styles.sortRow}>
        <TouchableOpacity
          onPress={() => setSortOrder("newest")}
          style={[
            styles.sortButton,
            { backgroundColor: sortOrder === "newest" ? "#007bff" : "#ccc" },
          ]}
        >
          <Text style={styles.sortButtonText}>Newest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSortOrder("oldest")}
          style={[
            styles.sortButton,
            { backgroundColor: sortOrder === "oldest" ? "#007bff" : "#ccc" },
          ]}
        >
          <Text style={styles.sortButtonText}>Oldest</Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: "relative", marginBottom: 12 }}>
        <TextInput
          placeholder="Search by destination..."
          value={filterText}
          onChangeText={setFilterText}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            paddingRight: 35, // make space for the clear button
            backgroundColor: "#fff", // add dark mode if needed
          }}
        />

        {filterText.length > 0 && (
          <TouchableOpacity
            onPress={() => setFilterText("")}
            style={{
              position: "absolute",
              right: 10,
              top: "30%",
              backgroundColor: "#ccc",
              borderRadius: 12,
              paddingHorizontal: 5,
              paddingVertical: 2,
            }}
          >
            <Text style={{ fontSize: 12 }}>❌</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Trip List */}
      <FlatList
        data={sortedTrips.filter((trip) =>
          trip.destination?.toLowerCase().includes(filterText.toLowerCase())
        )}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="bg-card border border-border rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold text-base">
              📍 {item.destination || "No title"}
            </Text>
            <Text>
              📅{" "}
              {(() => {
                const d = new Date(item.date);
                if (isNaN(d.getTime())) return "Invalid date";
                const day = d.getDate().toString().padStart(2, "0");
                const month = (d.getMonth() + 1).toString().padStart(2, "0");
                const year = d.getFullYear();
                return `${day}-${month}-${year}`;
              })()}
            </Text>
            <Text>💰 ${item.budget ?? 0}</Text>

            <TouchableOpacity
              onPress={() => deleteTrip(item._id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("🟢 Edit Trip ID:", item._id);
                router.push(`/edit-trip/${item._id}`);
              }}
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
  sortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 6,
  },
  sortButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
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
    backgroundColor: "#007bff",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  editText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
