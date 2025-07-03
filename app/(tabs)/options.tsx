import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const Options = () => {
  const { theme, toggleTheme } = useTheme(); // Access current theme and function to toggle it

  const isDark = theme === 'dark'; // Boolean for convenience
  const backgroundColor = isDark ? '#2e2e2e' : '#fff'; // Background color based on theme
  const textColor = isDark ? '#eee' : '#111'; // Text color based on theme

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Screen title */}
      <Text style={[styles.title, { color: textColor }]}>Theme Settings</Text>

      {/* Button to toggle between light and dark mode */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: isDark ? '#555' : '#007AFF' }]} // Button color changes by theme
        accessibilityLabel="Toggle light/dark mode" // Accessibility label for screen readers
      >
        <Text style={[styles.buttonText]}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20, // Padding around content
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
