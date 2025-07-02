// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="trips/index" options={{ title: "My Trips" }} />
      <Tabs.Screen name="add-trip/index" options={{ title: "Add Trip" }} />
    </Tabs>
  );
}
