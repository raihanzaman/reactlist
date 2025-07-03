import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import { useTheme } from '../theme/ThemeContext';
import { Task } from '../types';

const HomeScreen = () => {
  const { theme } = useTheme(); // Access current theme (light/dark) from context

  // State to hold all tasks as an array of Task objects
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Adds a new task to the tasks list.
   * Generates a unique id using current timestamp.
   * Initializes 'completed' to false by default.
   * Updates tasks state with the new task appended.
   */
  const addTask = (
    description: string,
    dueDate: Date,
    priority: 'low' | 'medium' | 'high'
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      description,
      dueDate,
      priority,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  /**
   * Toggles completion status of a task given its id.
   * Maps over tasks and inverts 'completed' on matching task.
   */
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Deletes a task from the list based on its id.
   * Filters out the task to remove it.
   */
  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <View
      // Container with dynamic background color based on theme
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff' },
      ]}
    >
      {/* Header title */}
      <Text
        style={{
          color: theme === 'dark' ? '#fff' : '#000',
          fontSize: 40,
          marginBottom: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial',
        }}
      >
        My Tasks
      </Text>

      {/* AddTask component receives addTask callback */}
      <AddTask onAddTask={addTask} />

      {/* TaskList component receives tasks and handlers for completion & deletion */}
      <TaskList tasks={tasks} onComplete={toggleTaskCompletion} onDelete={deleteTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the full screen height
    padding: 16, // Add padding around content
  },
});

export default HomeScreen;
