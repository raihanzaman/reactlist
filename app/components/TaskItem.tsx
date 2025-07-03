import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

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
  const { theme } = useTheme();

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return '#ff4d4f'; // red
      case 'medium':
        return '#ffc107'; // yellow
      default:
        return theme === 'dark' ? '#666' : '#ccc'; // grey varies by theme
    }
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onComplete(task.id)}
        style={[
          styles.bubble,
          task.completed && styles.bubbleCompleted,
        ]}
        accessibilityLabel={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.taskText,
            task.completed && styles.completed,
          ]}
          numberOfLines={1}
        >
          {task.description}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.dueDate}>
            {new Date(task.dueDate).toLocaleDateString()}
          </Text>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor() }]} />
        </View>
      </View>

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

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#444' : '#ccc',
      backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff',
    },
    bubble: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme === 'dark' ? '#888' : '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    bubbleCompleted: {
      borderColor: 'green',
      backgroundColor: '#d4edda',
    },
    checkmark: {
      color: 'green',
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoContainer: {
      flex: 1,
    },
    taskText: {
      fontSize: 16,
      color: theme === 'dark' ? '#eee' : '#111',
    },
    completed: {
      textDecorationLine: 'line-through',
      color: theme === 'dark' ? '#777' : 'gray',
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    dueDate: {
      color: theme === 'dark' ? '#aaa' : '#888',
      fontSize: 12,
      marginRight: 8,
    },
    priorityDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    deleteButton: {
      marginLeft: 12,
      padding: 8,
      backgroundColor: '#ff4d4f',
      borderRadius: 6,
    },
  });

export default TaskItem;
