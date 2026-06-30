import { Component, OnInit } from '@angular/core';

import { TaskService } from '../services/task.service';
import { TaskItem, TaskState, TaskPriority } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  sortedTasks: TaskItem[] = [];
  loading = true;

  statusFilter: TaskState | '' = '';
  priorityFilter: TaskPriority | '' = '';

  private readonly statusMap: { [key: number]: TaskState } = {
    1: 'Todo',
    2: 'InProgress',
    3: 'Done'
  };

  constructor(private taskService: TaskService) {}

  getStatusLabel(status: TaskState | number | string | null | undefined): TaskState {
    if (typeof status === 'number') {
      return this.statusMap[status] || 'Todo';
    }
    return status as TaskState;
  }

  getPriorityLabel(priority: TaskPriority | number | string | null | undefined): string {
    switch (priority) {
      case 1:
      case '1':
      case 'High':
      case 'high':
        return 'High';
      case 2:
      case '2':
      case 'Medium':
      case 'medium':
        return 'Medium';
      case 3:
      case '3':
      case 'Low':
      case 'low':
        return 'Low';
      default:
        return priority ? String(priority) : '';
    }
  }

  getPriorityClass(priority: TaskPriority | number | string | null | undefined): string {
    switch (priority) {
      case 1:
      case '1':
      case 'High':
      case 'high':
        return 'high';
      case 2:
      case '2':
      case 'Medium':
      case 'medium':
        return 'medium';
      case 3:
      case '3':
      case 'Low':
      case 'low':
        return 'low';
      default:
        return '';
    }
  }

  private getPriorityOrder(priority: TaskPriority | number | string): number {
    switch (priority) {
      case 1:
      case '1':
      case 'High':
      case 'high':
        return 0;
      case 2:
      case '2':
      case 'Medium':
      case 'medium':
        return 1;
      case 3:
      case '3':
      case 'Low':
      case 'low':
        return 2;
      default:
        return 3;
    }
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService
      .getTasks({
        status: this.statusFilter || undefined,
        priority: this.priorityFilter || undefined
      })
      .subscribe(tasks => {
        this.tasks = tasks;
        this.sortedTasks = [...tasks];
        this.loading = false;
      });
  }

  applyFilters(): void {
    this.loadTasks();
  }

  sortByPriority(): void {
    this.sortedTasks = [...this.sortedTasks].sort(
      (a, b) => this.getPriorityOrder(a.priority) - this.getPriorityOrder(b.priority)
    );
  }

  sortByDueDate(): void {
    this.sortedTasks = [...this.sortedTasks].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  inprogressTask(index: number): void {
    const task = this.tasks[index];
    this.taskService.updateStatus(task.id, task, 'InProgress').subscribe(updated => {
      task.status = updated.status;
    });
  }

  completeTask(index: number): void {
    const task = this.tasks[index];
    this.taskService.updateStatus(task.id, task, 'Done').subscribe(updated => {
      task.status = updated.status;
    });
  }
}
