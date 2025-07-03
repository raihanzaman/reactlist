import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../theme/ThemeContext';

// Props interface: expects a callback to handle adding a new task with description, due date, and priority
interface AddTaskProps {
  onAddTask: (description: string, dueDate: Date, priority: 'low' | 'medium' | 'high') => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const { theme } = useTheme(); // Get current app theme from context
  const isDark = theme === 'dark'; // Boolean flag for dark mode styling

  // Modal visibility state: controls whether the Add Task modal is shown
  const [modalVisible, setModalVisible] = useState(false);

  // Task description input state
  const [task, setTask] = useState('');

  // Due date state, default to current date/time
  const [dueDate, setDueDate] = useState<Date>(new Date());

  // Controls visibility of the date picker widget
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Task priority state, default to 'low'
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  // Controls visibility of the priority options picker
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);

  // Reference to the TextInput to programmatically focus it
  const taskInputRef = useRef<TextInput>(null);

  /**
   * Handles adding the new task.
   * Validates the task description is non-empty,
   * then calls the onAddTask callback prop.
   * Resets form fields and focuses input after adding.
   */
  const handleAdd = () => {
    if (task.trim()) {
      onAddTask(task, dueDate, priority);
      // Reset form fields to default values
      setTask('');
      setDueDate(new Date());
      setPriority('low');
      setShowPriorityPicker(false);
      // Refocus the task input for convenience
      taskInputRef.current?.focus();
    }
  };

  /**
   * Effect hook to manage modal open behavior:
   * - Hide date picker on modal open.
   * - Automatically focus the task input when modal opens.
   */
  useEffect(() => {
    if (modalVisible) {
      setShowDatePicker(false);
      // Use requestAnimationFrame for smooth focusing after modal animation
      const showKeyboard = requestAnimationFrame(() => {
        taskInputRef.current?.focus();
      });
      return () => cancelAnimationFrame(showKeyboard);
    }
  }, [modalVisible]);

  /**
   * Closes the modal gracefully by:
   * - Dismissing the keyboard immediately.
   * - Delaying modal close to allow keyboard dismissal animation.
   */
  const closeModal = () => {
    Keyboard.dismiss();
    setTimeout(() => setModalVisible(false), 150);
  };

  /**
   * Utility to get color based on priority level.
   * Used for styling priority button and options.
   */
  const getPriorityColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high': return '#ff4d4f'; // Red for urgent
      case 'medium': return '#ffc107'; // Amber for semi-urgent
      default: return '#ccc'; // Grey for low/no urgency
    }
  };

  return (
    <>
      {/* Floating Action Button to open Add Task modal */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

      {/* Modal containing the Add Task form */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal} // Close on outside tap
        onBackButtonPress={closeModal} // Close on Android back button
        useNativeDriver
        hideModalContentWhileAnimating
        avoidKeyboard // Automatically adjust to keyboard
        style={styles.bottomModal}
      >
        {/* KeyboardAvoidingView adjusts the modal content position on iOS when keyboard is shown */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          {/* TouchableWithoutFeedback allows dismissing keyboard when tapping outside input */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.modalContent, isDark ? styles.darkModal : styles.lightModal]}>
              
              {/* Task description input */}
              <TextInput
                ref={taskInputRef}
                style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                placeholder="Task"
                placeholderTextColor={isDark ? '#aaa' : '#000'}
                value={task}
                onChangeText={setTask}
              />

              {/* Due Date selection row */}
              <View style={styles.dateRow}>
                <Text style={[styles.labelText, { color: isDark ? '#fff' : '#000' }]}>Due Date:</Text>
                
                {/* Touchable to toggle DatePicker visibility */}
                <TouchableOpacity
                  onPress={() => setShowDatePicker(prev => !prev)}
                  style={[styles.input, isDark ? styles.inputDark : styles.inputLight, { flex: 1 }]}
                >
                  {/* Display selected due date in locale format */}
                  <Text style={{ color: isDark ? '#fff' : '#000' }}>
                    {dueDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* DateTimePicker component rendered conditionally */}
              {showDatePicker && (
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    // On iOS keep picker open, on others close after selection
                    setShowDatePicker(Platform.OS === 'ios');
                    if (selectedDate) setDueDate(selectedDate);
                  }}
                  themeVariant={isDark ? 'dark' : 'light'}
                />
              )}

              {/* Priority selection button */}
              <View>
                <TouchableOpacity
                  onPress={() => setShowPriorityPicker(!showPriorityPicker)}
                  style={[styles.priorityButton, { borderColor: getPriorityColor(priority) }]}
                >
                  {/* Text changes depending on selected priority */}
                  <Text style={{ color: getPriorityColor(priority) }}>
                    {priority === 'high'
                      ? 'Urgent'
                      : priority === 'medium'
                      ? 'Semi-Urgent'
                      : 'No Urgency'}
                  </Text>
                </TouchableOpacity>

                {/* Priority options dropdown, visible on toggle */}
                {showPriorityPicker && (
                  <View style={styles.priorityOptions}>
                    {/* Select 'Urgent' priority */}
                    <TouchableOpacity onPress={() => { setPriority('high'); setShowPriorityPicker(false); }}>
                      <Text style={[styles.priorityOption, { color: '#ff4d4f' }]}>Urgent</Text>
                    </TouchableOpacity>
                    {/* Select 'Semi-Urgent' priority */}
                    <TouchableOpacity onPress={() => { setPriority('medium'); setShowPriorityPicker(false); }}>
                      <Text style={[styles.priorityOption, { color: '#ffc107' }]}>Semi-Urgent</Text>
                    </TouchableOpacity>
                    {/* Select 'No Urgency' priority */}
                    <TouchableOpacity onPress={() => { setPriority('low'); setShowPriorityPicker(false); }}>
                      <Text style={[styles.priorityOption, { color: '#999' }]}>No Urgency</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Submit button to add the task */}
              <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
                <Text style={styles.submitButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

// Stylesheet for the AddTask component
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 100,
  },
  fabIcon: {
    color: 'white',
    fontSize: 32,
    marginBottom: 2,
  },
  bottomModal: {
    justifyContent: 'flex-end', // Align modal to bottom of screen
    margin: 0,
  },
  modalContainer: {
    width: '100%',
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
  },
  lightModal: {
    backgroundColor: '#ffffff',
  },
  darkModal: {
    backgroundColor: '#2e2e2e',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelText: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  inputLight: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  inputDark: {
    backgroundColor: '#2e2e2e',
    color: '#ffffff',
  },
  priorityButton: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  priorityOptions: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  priorityOption: {
    fontSize: 16,
    paddingVertical: 6,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTask;
