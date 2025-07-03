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

interface AddTaskProps {
  onAddTask: (description: string, dueDate: Date, priority: 'low' | 'medium' | 'high') => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const taskInputRef = useRef<TextInput>(null);

  const handleAdd = () => {
    if (task.trim()) {
      onAddTask(task, dueDate, priority);
      setTask('');
      setDueDate(new Date());
      setPriority('low');
      setShowPriorityPicker(false);
      taskInputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setShowDatePicker(false);
      const showKeyboard = requestAnimationFrame(() => {
        taskInputRef.current?.focus();
      });
      return () => cancelAnimationFrame(showKeyboard);
    }
  }, [modalVisible]);


  const closeModal = () => {
    Keyboard.dismiss();
    setTimeout(() => setModalVisible(false), 150);
  };

  const getPriorityColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#ffc107';
      default: return '#ccc';
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        useNativeDriver
        hideModalContentWhileAnimating
        avoidKeyboard
        style={styles.bottomModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.modalContent, isDark ? styles.darkModal : styles.lightModal]}>
              {/* Task input */}
              <TextInput
                ref={taskInputRef}
                style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                placeholder="Task"
                placeholderTextColor={isDark ? '#aaa' : '#000'}
                value={task}
                onChangeText={setTask}
              />

              {/* Date input */}
              <View style={styles.dateRow}>
                <Text style={[styles.labelText, { color: isDark ? '#fff' : '#000' }]}>Due Date:</Text>
                
                <TouchableOpacity
                  onPress={() => setShowDatePicker(prev => !prev)}
                  style={[styles.input, isDark ? styles.inputDark : styles.inputLight, { flex: 1 }]}
                >
                  <Text style={{ color: isDark ? '#fff' : '#000' }}>
                    {dueDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(Platform.OS === 'ios'); // hide unless on iOS spinner
                    if (selectedDate) setDueDate(selectedDate);
                  }}
                  themeVariant={isDark ? 'dark' : 'light'}
                />
              )}

              {/* Priority Button */}
              <View>
                <TouchableOpacity
                  onPress={() => setShowPriorityPicker(!showPriorityPicker)}
                  style={[styles.priorityButton, { borderColor: getPriorityColor(priority) }]}
                >
                  <Text style={{ color: getPriorityColor(priority) }}>
                    {priority === 'high'
                      ? 'Urgent'
                      : priority === 'medium'
                      ? 'Semi-Urgent'
                      : 'No Urgency'}
                  </Text>
                </TouchableOpacity>

                {/* Priority Options */}
                {showPriorityPicker && (
                  <View style={styles.priorityOptions}>
                    <TouchableOpacity onPress={() => { setPriority('high'); setShowPriorityPicker(false); }}>
                      <Text style={[styles.priorityOption, { color: '#ff4d4f' }]}>Urgent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setPriority('medium'); setShowPriorityPicker(false); }}>
                      <Text style={[styles.priorityOption, { color: '#ffc107' }]}>Semi-Urgent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setPriority('low'); setShowPriorityPicker(false); }}>
                      <Text style={[styles.priorityOption, { color: '#999' }]}>No Urgency</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Add Button */}
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
    justifyContent: 'flex-end',
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
