# OlympicGamesApp

This project is an Angular application developed to display data about the Olympic Games. It uses a modular architecture with well-defined components, pages, and business logic.

## Prerequisites

- Node.js (recommended version 14 or higher)
- Angular CLI (version 18.0.3)
- NPM (or Yarn) for package management

## Installation

Clone the project, then install the dependencies by running:

```bash
npm install
```

## Start the Development Server

To start the application in development mode, run:

```bash
ng serve
```

Then access the application in your browser at http://localhost:4200/. The application will automatically reload when you change any source files.

## Build the Project
To build the project for production, run:

```bash
ng build
```

The build artifacts will be stored in the dist/ directory. Use this version for deploying the application.

## Project Architecture

The application is organized using a modular architecture to facilitate maintenance and reuse of components:

- components: Contains all reusable components of the application.
- pages: Contains components used for routing and main views.
- core: Contains business logic, including services for API calls and data models (services and models).

## Implemented Features

- Display Olympic Games: The application fetches and displays data about the Olympic Games from an external source.
- Medals Visualization: Displays a chart of medals by country.
- Simplified Navigation: Clear navigation between different pages using Angular Router.
- Use of Services: Data management via Angular services to separate business logic from the user interface.
- TypeScript Interfaces: Replaced any types with specific interfaces to improve code robustness and readability.

## Key Code Sections

- app-routing.module.ts: Manages navigation between the application's pages.
- olympic.service.ts: Service responsible for fetching and managing Olympic data. It is a key point to understand how data is handled.

## License

This project is licensed under the MIT License - see the LICENSE file for details.