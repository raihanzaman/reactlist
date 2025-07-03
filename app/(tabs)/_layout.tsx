import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';

/**
 * Inner Tabs component that consumes theme context to apply
 * dynamic styling based on current theme (light/dark).
 */
function TabsLayoutInner() {
  const { theme } = useTheme(); // Get current theme from context

  return (
    <Tabs
      // Common screen options for all tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue', // Active tab icon/text color
        headerTitle: '', // Remove header title for clean look
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff', // Dynamic header background color
          elevation: 0, // Remove Android header shadow
          shadowOpacity: 0, // Remove iOS header shadow
          borderTopWidth: 0, // Remove border top (Android)
        },
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff', // Dynamic tab bar background color
          elevation: 0, // Remove Android shadow under tab bar
          shadowOpacity: 0, // Remove iOS shadow under tab bar
          borderTopWidth: 0, // Remove border top line from tab bar
        },
      }}
    >
      {/* Tab Screen for the main Tasks page */}
      <Tabs.Screen
        name="index" // Route name
        options={{
          title: 'Tasks', // Title displayed on the tab bar
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={24} color={color} /> // Icon for the tab
          ),
        }}
      />

      {/* Tab Screen for Options/Settings */}
      <Tabs.Screen
        name="options"
        options={{
          title: 'Options',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

/**
 * Exported component wraps the TabsLayoutInner with ThemeProvider
 * so that theme context is available to all tab screens.
 */
export default function TabsLayout() {
  return (
    <ThemeProvider>
      <TabsLayoutInner />
    </ThemeProvider>
  );
}