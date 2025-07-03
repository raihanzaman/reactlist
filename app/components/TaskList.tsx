import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Task } from '../types';
import TaskItem from './TaskItem';

// Props interface for TaskList:
// - tasks: array of Task objects to display
// - onComplete: callback when a task is marked complete/incomplete
// - onDelete: callback when a task is deleted
interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete }) => {
  const { theme } = useTheme(); // Get current theme ('light' or 'dark')

  /**
   * Sort tasks by due date in ascending order.
   * Creates a shallow copy to avoid mutating props.
   */
  const sortedTasks = [...tasks].sort(
    (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
  );

  return (
    <View
      // Container view with dynamic background color based on theme
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#2e2e2e' : '#FFFFFF' },
      ]}
    >
      <FlatList
        data={sortedTasks} // Render sorted list of tasks
        renderItem={({ item }) => (
          // Render each task using TaskItem component
          <TaskItem task={item} onComplete={onComplete} onDelete={onDelete} />
        )}
        keyExtractor={(item) => item.id} // Unique key for each item
        // Enable scrolling only if there are more than 15 tasks for better UX
        scrollEnabled={tasks.length > 15}
        contentContainerStyle={styles.contentContainer} // Padding for last item
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar for cleaner UI
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill available space
  },
  contentContainer: {
    paddingBottom: 100, // Extra bottom padding to avoid overlap with floating buttons or nav
  },
});

export default TaskList;