import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const Options = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#2e2e2e' : '#fff';
  const textColor = isDark ? '#eee' : '#111';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Theme Settings</Text>

      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: isDark ? '#555' : '#007AFF' }]}
        accessibilityLabel="Toggle light/dark mode"
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
