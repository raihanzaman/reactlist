import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: { backgroundColor: "#f0f0f0" }}} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
