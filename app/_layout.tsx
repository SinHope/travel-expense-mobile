// app/_layout.tsx
import { Slot } from "expo-router";
import { useInitialAndroidBarSync } from '../lib/useColorScheme';

export default function RootLayout() {
  useInitialAndroidBarSync();
  return <Slot />;
}
