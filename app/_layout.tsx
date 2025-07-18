// app/_layout.tsx
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import "expo-dev-client";
import { Slot } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import "../global.css";
import { useColorScheme, useInitialAndroidBarSync } from "../lib/useColorScheme";
import { NAV_THEME } from '../theme/index';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <NavThemeProvider value={NAV_THEME[colorScheme]}> 
      <Slot />
      </NavThemeProvider>

      <Toast /> 
    </>
  );
}
