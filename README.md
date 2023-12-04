# Rmj Autos App

Project documentation is a collection of documents containing information about a project and its processes. It provides all the necessary details about the project, such as its objectives, scope, timeline, budget, and resources. The project documentation is crucial in keeping track of progress, identifying risks, and ensuring that all stakeholders have the same understanding of the project. Proper documentation is essential for the success of any project.

## Prerequisites

Make sure you have Node.js and npm installed on your machine.

# 1. Client Installation

Welcome to the client-side documentation for My Rmj-Autos App!

## Installation

i. Navigate to the `client` folder:

   ```bash
   cd client
   ```

ii. Install All Packages:

   ```bash
   npm install
   ```

iii. Run the application:

   ```bash
   npm run dev
   ```

iv. Build the application:

   ```bash
   npm run build
   ```

v. Run the application in `Production`:

   ```bash
   npm run start
   ```

# 2. Server Installation

Welcome to the server-side documentation for My Rmj-Autos App!

## Installation

i. Navigate to the `server` folder:

   ```bash
   cd server
   ```

ii. Install All Packages:

   ```bash
   npm install
   ```

iii. Run the application:

   ```bash
   npm run dev
   ```

# 3. PostgreSQL Database Setup for My Rmj-Autos App (Node.js Project)

## 1. Database Requirements

Before setting up the PostgreSQL database for My Rmj-Autos App, ensure that you have the following prerequisites:

- PostgreSQL Database Server Installed
- pgAdmin Installed (for managing PostgreSQL databases)

## 2. PostgreSQL Installation

### a. Install PostgreSQL Database Server

1. Download and install PostgreSQL from the official website: [PostgreSQL Downloads](https://www.postgresql.org/download/).

2. Follow the installation instructions provided by the PostgreSQL installer.

### b. Install pgAdmin

1. Download and install pgAdmin from the official website: [pgAdmin Downloads](https://www.pgadmin.org/download/).

2. Follow the installation instructions provided by the pgAdmin installer.

## 3. Database Setup and Configuration

### a. Launch pgAdmin

1. Start pgAdmin after the installation.

2. Connect to your PostgreSQL server using the connection details provided during installation.

### b. Create a Database

1. In pgAdmin, right-click on "Databases" and choose "Create > Database."

2. Enter a name for your database (e.g., `rmj_autos`) and configure any additional settings if necessary.

### c. Create Database User

1. In pgAdmin, right-click on "Login/Group Roles" and choose "Create > Login/Group Role."

2. Enter a username and set a password for the database user. Assign necessary privileges, and link the user to the newly created database.

## 4. Database Initialization (if needed)

Update the Node.js project configuration to connect to the PostgreSQL database. Locate the configuration file in the server folder (e.g., `server/.env.development`).

Replace DB_USERNAME and DB_PASSWORD with the PostgreSQL database username and password you created.
If your application requires specific tables or schema, provide instructions for initializing the database schema. This may include running database migration scripts or setting up initial data.

```javascript
// Example configuration for PostgreSQL
# Database environment variables
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=101
   DB_DATABASE=rmj_autos
  // ...

```

## 5. Verify Database Connection

Run the application and verify that it successfully connects to the PostgreSQL database.

```bash
  npm run dev
```
