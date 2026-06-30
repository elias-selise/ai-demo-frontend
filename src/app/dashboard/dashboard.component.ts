import { Component, OnInit } from '@angular/core';

import { TaskService } from '../services/task.service';
import { TaskItem } from '../models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: TaskItem[] = [];
  loading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.loading = false;
    });
  }

  get totalCount(): number {
    return this.tasks.length;
  }

  get todoCount(): number {
    return this.tasks.filter(t => t.status === 'Todo').length;
  }

  get inProgressCount(): number {
    return this.tasks.filter(t => t.status === 'InProgress').length;
  }

  get doneCount(): number {
    return this.tasks.filter(t => t.status === 'Done').length;
  }
}
