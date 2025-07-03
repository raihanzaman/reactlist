import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import { useTheme } from '../theme/ThemeContext';
import { Task } from '../types';

const HomeScreen = () => {
  const { theme } = useTheme(); // <-- Move inside the component!

  const [tasks, setTasks] = useState<Task[]>([]);

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

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff' },
      ]}
    >
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
      <AddTask onAddTask={addTask} />
      <TaskList tasks={tasks} onComplete={toggleTaskCompletion} onDelete={deleteTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
