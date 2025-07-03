import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete }) => {
  const { theme } = useTheme();

  const sortedTasks = [...tasks].sort(
    (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
  );

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#2e2e2e' : '#FFFFFF' }]}>
      <FlatList
        data={sortedTasks}
        renderItem={({ item }) => (
          <TaskItem task={item} onComplete={onComplete} onDelete={onDelete} />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={tasks.length > 15}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
});

export default TaskList;
