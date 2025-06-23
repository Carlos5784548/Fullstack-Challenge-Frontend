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
      estado: ['pendiente', Validators.required],
    
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

  const nuevaTarea = this.taskForm.value;

  if (this.editingTask) {
    // Modo edición
    this.taskService.updateTask(this.editingTask.id!, nuevaTarea).subscribe({
      next: (tareaActualizada) => {
        // Reemplazá la tarea en el array por la actualizada
        const index = this.tasks.findIndex(t => t.id === tareaActualizada.id);
        if (index !== -1) {
          this.tasks[index] = tareaActualizada;
        }
        this.editingTask = null;
        this.taskForm.reset({ estado: 'pendiente' });
      },
      error: (err) => {
        console.error('Error al actualizar tarea', err);
        alert('Error al actualizar la tarea. Intenta nuevamente.');
      }
    });
  } else {
    // Modo creación
    this.taskService.createTask(nuevaTarea).subscribe({
      next: (tareaCreada) => {
        this.tasks.push(tareaCreada); // Agregá la tarea devuelta por el backend
        this.taskForm.reset({ estado: 'pendiente' });
      },
      error: (err) => {
        console.error('Error al crear tarea', err);
        alert('Error al crear la tarea. Intenta nuevamente.');
      }
    });
  }
}

edit(task: Task) {
  this.editingTask = task;
  this.taskForm.patchValue(task);
}

delete(id: string | number) {
  const idStr = String(id);
  console.log('Eliminar localmente ID:', idStr);
  const antes = this.tasks.length;
  this.tasks = this.tasks.filter(t => String(t.id) !== idStr);
  const despues = this.tasks.length;
  console.log(`Tareas antes: ${antes}, después: ${despues}`);
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