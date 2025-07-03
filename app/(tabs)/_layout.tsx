import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';

function TabsLayoutInner() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerTitle: '',
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={24} color={color} />
          ),
        }}
      />
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

export default function TabsLayout() {
  return (
    <ThemeProvider>
      <TabsLayoutInner />
    </ThemeProvider>
  );
}