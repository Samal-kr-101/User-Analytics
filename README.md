# User Analytics Application

## Overview

A full-stack User Analytics Application built using the MERN stack. The application tracks user interactions on a webpage, stores events in MongoDB, and provides an analytics dashboard to visualize user behavior.

## Features

### Event Tracking

* Tracks page views
* Tracks click events
* Generates unique session IDs using localStorage
* Sends events to the backend API

### Analytics Dashboard

* Total Sessions
* Total Events
* Average Events per Session
* Session-wise event statistics

### User Journey

* View all events for a specific session
* Displays event timeline in chronological order

### Click Heatmap

* Visualize click positions on a page
* Shows total click count for a given page URL

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render

## Project Structure

frontend/
├── src/
├── public/
└── ...

backend/
├── routes/
├── models/
├── server.js
└── ...

## Setup Instructions

### 1. Clone Repository

git clone <repository-url>

cd user-analytics

### 2. Backend Setup

cd backend

npm install

Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

Run backend:

npm run dev

### 3. Frontend Setup

cd frontend

npm install

Create .env file:

VITE_API_URL=http://localhost:5000

Run frontend:

npm run dev

### 4. Open Application

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

## API Endpoints

POST /api/events

GET /api/sessions

GET /api/sessions/:sessionId

GET /api/heatmap?pageUrl=<url>

## Assumptions

* A session is identified using a unique UUID stored in localStorage.
* Events are grouped by session_id.
* Heatmap data is generated from click events only.
* Page URLs must match exactly for heatmap visualization.

## Trade-offs

* Session IDs persist in localStorage and do not automatically expire.
* No user authentication is implemented.
* Heatmap visualization uses simple click coordinates instead of advanced clustering.
* Analytics are designed for demonstration purposes and not enterprise-scale workloads.

## Deployment Links

Frontend:
https://user-analytics-seven.vercel.app

Backend:
https://user-analytics-da3k.onrender.com
