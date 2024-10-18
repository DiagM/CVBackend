# Backend API

This is the backend API for a full-stack application. It is built with Node.js, Express, and MongoDB, and is deployed on Railway.

## Features

- User authentication (JWT-based)
- CRUD operations for CV management
- Integration with MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB Atlas account (or local MongoDB setup)

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/DiagM/CVBackend.git
    cd your-backend-repo
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret_key
    PORT=3003
    ```

4. Start the development server:

    ```bash
    npm run start:dev
    ```

    The server will run on `http://localhost:3003`.

### Deployment

#### Railway Deployment

1. Push your repository to GitHub if you haven't done so already.
2. Go to [Railway.app](https://railway.app/) and create a new project.
3. Select **Deploy from GitHub repo** and choose your repository.
4. In Railway, go to the **Environment Variables** section and add the necessary variables:

    - `MONGO_URI`
    - `JWT_SECRET`
    - `PORT` (optional)

5. Railway will automatically build and deploy your backend.

#### API Endpoints

- `PUT /api/auth/profile/edit`: Edit user profile

### Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Railway](https://railway.app/)

## License

This project is licensed under the MIT License.

