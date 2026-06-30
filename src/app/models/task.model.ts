export type TaskState = 'Todo' | 'InProgress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  status: TaskState;
  priority: TaskPriority;
  assignedTo: string;
  dueDate: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskState;
  assignee?: string;
  dueDate?: string;
  expectedVersion?: number;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}
