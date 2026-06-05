# E-Games Manager

E-Games Manager is a full-stack web application designed to help tournament administrators easily manage e-sports tournaments, teams, matches, and daily tasks. 

It provides a clean, user-friendly Vanilla JS frontend powered by a scalable Node.js/Express backend, using MongoDB for persistent data storage.

## 🚀 Features

*   **🏆 Tournament Management:** Create and track tournaments, define prize pools, and organize events by game (e.g., Valorant, Tekken 8, FIFA).
*   **👥 Team Registration:** Register e-sports teams and assign individual players to those teams.
*   **⚔️ Match Scheduling:** Schedule matches between teams, assign them to specific tournament rounds (Group Stage, Semi-Finals, etc.), and update live scores.
*   **📊 Dynamic Statistics:** Automatically calculates total matches, completed matches, and generates a live Leaderboard based on team wins.
*   **📋 Task Management:** A built-in To-Do list for tournament admins to track pending, in-progress, and completed administrative tasks.

## 🛠️ Technology Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas (accessed via Mongoose ODM)
*   **Environment Management:** `dotenv`

## 📁 Project Architecture

The backend follows the MVC (Model-View-Controller) pattern with modularized routing:

*   **`/models`**: Contains the Mongoose schemas for `Match.js`, `Player.js`, `Task.js`, `Team.js`, and `Tournament.js`. These are heavily normalized to adhere to 1NF and 3NF database design principles.
*   **`/routes`**: Contains modularized Express routers for each domain (`matches.js`, `stats.js`, `tasks.js`, `teams.js`, `tournaments.js`).
*   **`/public`**: Contains all static frontend assets (HTML, CSS, JS).
*   **`server.js`**: The main entry point that initializes the server, connects to the database, and mounts the API routes.

## ⚙️ Local Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ahmad1845/E-Games-Manager.git
    cd E-Games-Manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your MongoDB Atlas connection string:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0...
    PORT=3000
    ```

4.  **Start the server:**
    ```bash
    node server.js
    ```

5.  **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.
