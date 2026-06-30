import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TaskItem, TaskStats, TaskState, TaskPriority, UpdateTaskDto } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = 'http://localhost:5115/api/tasks';
  private readonly statusMap: { [key in TaskState]: number } = {
    'Todo': 1,
    'InProgress': 2,
    'Done': 3
  };
    private readonly priorityMap: { [key in TaskPriority]: number } = {
    'Low': 3,
    'Medium': 2,
    'High': 1
  };

  constructor(private http: HttpClient) {}

  getTasks(filters?: { status?: TaskState; priority?: TaskPriority; assignedTo?: string }): Observable<TaskItem[]> {
    let params = new HttpParams();
    if (filters?.status) params = params.set('status', this.statusMap[filters.status]);
    if (filters?.priority) params = params.set('priority', this.priorityMap[filters.priority]);
    //if (filters?.assignedTo) params = params.set('assignedTo', filters.assignedTo);

    return this.http.get<TaskItem[]>(this.baseUrl, { params });
  }

  getStats(): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.baseUrl}/stats`);
  }

  updateTask(id: number | string, dto: UpdateTaskDto): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.baseUrl}/${id}`, dto);
  }

  updateStatus(id: number | string, task: TaskItem, status: TaskState): Observable<TaskItem> {
    const numericStatus = this.statusMap[status];
    return this.updateTask(id, { ...task, status: numericStatus as any });
  }

  createTask(task: Partial<TaskItem>): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.baseUrl, task);
  }
}
