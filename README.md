# SBA-318

Express API Project
This is a basic RESTful API built with Express.js. It allows you to manage users, posts, and comments, with CRUD operations (Create, Read, Update, Delete). It also renders data dynamically using EJS and includes simple CSS styling for the front-end.

Features
Create, read, update, and delete users, posts, and comments.
Filter users, posts, and comments.
Render user data on the front-end with EJS templates.
Simple CSS for styling.
Setup

1. Clone the repo
   bash
   Copy code
   git clone <your-repository-url>
2. Install dependencies
   bash
   Copy code
   npm install
3. Start the server
   bash
   Copy code
   npm start
   The server will be running at http://localhost:3000.

Endpoints
GET /users: View all users.
POST /users: Create a new user.
PUT /users/:id: Update a user.
DELETE /users/:id: Delete a user.
GET /posts: View all posts.
POST /posts: Create a new post.
GET /comments: View all comments.
POST /comments: Create a new comment.
