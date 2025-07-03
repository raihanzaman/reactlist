import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Props interface for a single task item, including task data and callbacks for complete/delete actions
interface TaskItemProps {
  task: {
    id: string;
    description: string;
    completed: boolean;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
  };
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  const { theme } = useTheme(); // Access current app theme from context

  /**
   * Returns a color string based on the task's priority.
   * High priority: red
   * Medium priority: yellow
   * Low priority: grey (varies by theme)
   */
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return '#ff4d4f'; // Red color for urgent tasks
      case 'medium':
        return '#ffc107'; // Yellow for medium urgency
      default:
        return theme === 'dark' ? '#666' : '#ccc'; // Grey for low priority, adjusted by theme
    }
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* Touchable bubble to toggle completion status */}
      <TouchableOpacity
        onPress={() => onComplete(task.id)}
        style={[
          styles.bubble,
          task.completed && styles.bubbleCompleted, // Apply completed styling if done
        ]}
        accessibilityLabel={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {/* Show checkmark only if task is completed */}
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Container for task description and metadata */}
      <View style={styles.infoContainer}>
        {/* Task description text, line truncated to single line */}
        <Text
          style={[
            styles.taskText,
            task.completed && styles.completed, // Strikethrough if completed
          ]}
          numberOfLines={1}
        >
          {task.description}
        </Text>

        {/* Row displaying due date and priority indicator */}
        <View style={styles.metaRow}>
          {/* Formatted due date string */}
          <Text style={styles.dueDate}>
            {new Date(task.dueDate).toLocaleDateString()}
          </Text>

          {/* Colored dot representing task priority */}
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor() }]} />
        </View>
      </View>

      {/* Delete button with trash icon */}
      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
        accessibilityLabel="Delete task"
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * Dynamic styles based on current theme ('light' or 'dark').
 * Styles container layout, bubbles, text, priority indicators, and buttons.
 */
const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row', // Layout children horizontally
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#444' : '#ccc', // Separator line color
      backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff', // Background based on theme
    },
    bubble: {
      width: 28,
      height: 28,
      borderRadius: 14, // Circle shape
      borderWidth: 2,
      borderColor: theme === 'dark' ? '#888' : '#ccc', // Circle border color based on theme
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
      backgroundColor: theme === 'dark' ? '#333' : '#fff', // Circle background based on theme
    },
    bubbleCompleted: {
      borderColor: 'green', // Green border when completed
      backgroundColor: '#d4edda', // Light green fill for completed tasks
    },
    checkmark: {
      color: 'green',
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoContainer: {
      flex: 1, // Take up remaining space
    },
    taskText: {
      fontSize: 16,
      color: theme === 'dark' ? '#eee' : '#111', // Text color based on theme
    },
    completed: {
      textDecorationLine: 'line-through', // Strikethrough completed tasks
      color: theme === 'dark' ? '#777' : 'gray', // Lighter color for completed text
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    dueDate: {
      color: theme === 'dark' ? '#aaa' : '#888', // Subtle text for due date
      fontSize: 12,
      marginRight: 8,
    },
    priorityDot: {
      width: 10,
      height: 10,
      borderRadius: 5, // Circular dot
    },
    deleteButton: {
      marginLeft: 12,
      padding: 8,
      backgroundColor: '#ff4d4f', // Red background for delete button
      borderRadius: 6,
    },
  });

export default TaskItem;
