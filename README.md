## 📋 Descripción

Aplicación frontend desarrollada en **Angular 19** para gestionar tareas personales con funcionalidades de autenticación. Permite a los usuarios registrarse, iniciar sesión y realizar operaciones CRUD sobre sus propias tareas, asegurando que cada usuario solo pueda acceder a sus datos.

El frontend consume un backend desarrollado en Node.js con Express, que expone una API REST segura mediante JWT.

---

## 🚀 Tecnologías utilizadas

- **Angular 19**
- **Tailwind CSS v4** para estilos
- **JWT** para autenticación y manejo de sesión
- Comunicación con backend REST en **Node.js + Express**
- Gestión del estado y manejo de errores en Angular

---

## 🎯 Objetivo

- Permitir a los usuarios registrarse y autenticarse.
- Gestionar tareas personales con campos:
  - Título (obligatorio)
  - Descripción
  - Fecha límite
  - Estado (pendiente, en progreso, completada)
- Asegurar que cada usuario sólo vea y modifique sus propias tareas.
- Manejar errores y validaciones desde frontend y backend.

---


# Gestiontareas

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
