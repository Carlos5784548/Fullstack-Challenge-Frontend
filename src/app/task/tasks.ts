import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../task/task.model';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;
  editingTask: Task | null = null;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      fechaLimite: [''],
      estado: ['pendiente', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  submit() {
    if (this.taskForm.invalid) return;
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id!, this.taskForm.value).subscribe(() => {
        this.editingTask = null;
        this.taskForm.reset({ status: 'pendiente' });
        this.loadTasks();
      });
    } else {
      this.taskService.createTask(this.taskForm.value).subscribe(() => {
        this.taskForm.reset({ status: 'pendiente' });
        this.loadTasks();
      });
    }
  }

  edit(task: Task) {
    this.editingTask = task;
    this.taskForm.patchValue(task);
  }

  delete(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  cancelEdit() {
    this.editingTask = null;
    this.taskForm.reset({ status: 'pendiente' });
  }

    logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    location.href = '/login';
  }
}