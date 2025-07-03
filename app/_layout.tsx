import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler'; // Ensure gesture handler is initialized
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * RootLayout wraps the entire app with GestureHandlerRootView,
 * which is required for react-native-gesture-handler to work properly.
 * 
 * It also sets up the root Stack navigator, loading the "(tabs)" folder
 * as the main screen stack without a header and with a light background.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Stack>
        {/* Main stack screen that loads the tabs layout */}
        <Stack.Screen
          name="(tabs)" // Folder/screen containing the tab navigator
          options={{
            headerShown: false, // Hide the header for this stack screen
            contentStyle: { backgroundColor: "#f0f0f0" }, // Light grey background color
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, // Full screen container to fill available space
  },
});
