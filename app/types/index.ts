export interface Task {
  id: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
}
