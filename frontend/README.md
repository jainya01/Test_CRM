# CRM Frontend

A modern React application built with Vite for managing CRM operations related to Hajj, Umrah, ticketing, and medical travel services.

# Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- React Bootstrap
- Font Awesome
- React Toastify
- ESLint
- PurgeCSS
- Rollup Visualizer

## Backend

- Node.js
- Express.js 5
- MySQL2
- JWT Authentication (jsonwebtoken)
- bcrypt Password Hashing
- Cookie Parser
- CORS
- Helmet Security Middleware
- Express Rate Limiting
- Compression
- Multer (File Uploads)
- dotenv (Environment Variables)
- CSV Parser
- ExcelJS

## Development Tools

- Nodemon
- Vite
- ESLint
- Rollup Plugin Visualizer

## Features

- Secure Admin Authentication
- Dashboard Management
- Lead & Customer Management
- Responsive User Interface
- Protected Routes
- API Integration with Axios
- Toast Notifications
- Optimized Production Build

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd project-folder
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:1700/api
```

Replace the URL with your backend API endpoint.

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Build for Production

Generate an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/
├── admin/
├── agent/
├── staff/
├── layout/
├── components/
├── User.jsx
├── App.jsx
├── main.jsx
└── App.css
```

## Available Scripts

```bash
npm run dev
```

Runs the application in development mode.

```bash
npm run build
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Performance Optimizations

- Vite Fast Refresh (HMR)
- Production Code Splitting
- CSS Optimization with PurgeCSS
- Bundle Analysis using Rollup Visualizer
- Optimized Static Assets

## Security Notes

- Input validation on forms
- Backend API validation required
- JWT-based authentication
- Protected admin routes

## Deployment

Build the project:

```bash
npm run build
```

Deploy the generated `dist` folder to your hosting provider.

## Backend Setup

### Prerequisites

Make sure the following software is installed:

- Node.js (v18 or later recommended)
- npm
- MySQL Server

### Installation

Clone the backend repository:

```bash
git clone <backend-repository-url>
cd backend-folder
```

Install dependencies:

```bash
npm install
```

### Database Setup

Create a MySQL database:

```sql
CREATE DATABASE crm;
```

Import the database schema if provided:

```bash
mysql -u root -p crm < database.sql
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=1700

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm

JWT_SECRET=your_jwt_secret_key

CLIENT_URL=http://localhost:5173

NODE_ENV=development
```

Update the values according to your local or production environment.

### Running the Backend

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The backend server will run on:

```text
http://localhost:1700
```

### API Connection

Configure the frontend `.env` file:

```env
VITE_API_URL=http://localhost:1700/api
```

Make sure the backend server is running before starting the frontend application.

### Verify Database Connection

You can test the MySQL connection:

```bash
npm run dev
```

If the connection is successful, the server should start without database errors.

### Common Issues

#### MySQL Connection Refused

Verify:

- MySQL service is running.
- Database credentials are correct.
- Port `3306` is open and accessible.

#### Access Denied for User

Check:

```env
DB_USER
DB_PASSWORD
```

and ensure the user has privileges on the database.

#### Database Not Found

Create the database:

```sql
CREATE DATABASE crm;
```

and update:

```env
DB_NAME=crm
```

### Recommended Project Structure

```text
backend/
├── config/
├── middleware/
├── routes/
├── uploads/
├── api.js
├── package.json
└── .env
```

## License

This project is intended for internal business use.
