# ChatApp (WASSUP) Project Readme

Welcome to ChatApp, codenamed "WASSUP" – a real-time chat application designed to connect users seamlessly. This project utilizes HTML, CSS, JavaScript, and Socket.IO for real-time communication. MongoDB and Mongoose are employed to store and manage chat messages, user information, and timestamps. Below, you'll find details on the project structure, technologies used, and instructions for setting up the application.

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Features](#features)
- [Usage](#usage)
- [Database Schema](#database-schema)

## Technologies

- HTML
- CSS
- JavaScript (ES6+)
- Socket.IO
- MongoDB
- Mongoose

## Project Structure

The project structure is organized as follows:

- **public:** Contains static files (HTML, CSS, client-side JavaScript).
- **server:** Server-side scripts, including Socket.IO implementation.
- **models:** Mongoose schema definitions.
- **config:** Configuration files, including MongoDB connection setup.
- **index.js:** Entry point for the server.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/amal2000-cse/chatapp-WASSUP-.git
    ```

2. Install dependencies:

    ```bash
    cd chatapp-wassup
    npm install
    ```

3. Set up your MongoDB database and update the database configuration in `config/db.js`.

4. Start the application:

    ```bash
    npm start
    ```

## Features

- **Real-time Chat:** Utilizing Socket.IO for instant messaging between users.
- **User Authentication:** Users need to input their name before entering the chat.
- **Message History:** New users receive previous chat messages upon joining.
- **User Count:** The application displays the number of clients currently using the chat.

## Usage

1. Access the application in your web browser:

    ```bash
    http://localhost:3000
    ```

2. Enter your name to join the chat.

3. Start chatting in real-time with other users.

## Database Schema

The MongoDB database stores the following information:

- **User:** Stores user details, including their name.
  
    ```javascript
    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
    });
    ```

- **Message:** Stores chat messages with the associated user and timestamp.

    ```javascript
    const messageSchema = new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    });
    ```

Feel free to explore the code and customize it to fit your specific needs. Enjoy chatting with WASSUP!
