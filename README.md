# Secure File Uploader

A full-stack application built with Node.js, Express, and MongoDB that allows users to securely register, log in, and upload files directly to an AWS S3 bucket. The application features a clean, responsive frontend rendered server-side with EJS and styled with Tailwind CSS and Flowbite.

## Features

-   **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT) and bcrypt for password hashing.
-   **AWS S3 Integration**: Files are uploaded directly to an AWS S3 bucket using `multer` and `multer-s3`.
-   **Secure File Access**: Users can only view and download files they have uploaded. Download links are authenticated before serving the file from S3.
-   **Responsive UI**: A modern user interface built with EJS, Tailwind CSS, and Flowbite, featuring an interactive drag-and-drop file upload modal.
-   **User Feedback**: Flash messages provide clear feedback for actions like successful registration, login, logout, and file uploads.
-   **Session Management**: Uses `express-session` and `cookie-parser` to manage user sessions.

## Tech Stack

| Category         | Technology / Library                                       |
| ---------------- | ---------------------------------------------------------- |
| **Backend**      | Node.js, Express.js                                        |
| **Database**     | MongoDB with Mongoose ODM                                  |
| **Authentication** | JSON Web Token (`jsonwebtoken`), `bcrypt`                    |
| **File Handling**  | `multer`, `multer-s3`, `@aws-sdk/client-s3`                |
| **Templating**     | EJS (Embedded JavaScript)                                  |
| **Styling**      | Tailwind CSS, Flowbite                                     |
| **Middleware**   | `express-session`, `cookie-parser`, `connect-flash`        |
| **Environment**  | `dotenv`                                                   |

## Prerequisites

-   Node.js and npm
-   MongoDB instance (local or cloud-based like MongoDB Atlas)
-   AWS Account with an S3 bucket and IAM credentials (`accessKeyId`, `secretAccessKey`)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pawanprasad2/secure-file-uploader.git
    cd secure-file-uploader
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root of the project and add the following environment variables. Replace the placeholder values with your actual configuration.

    ```env
    # Server Configuration
    PORT=3000

    # MongoDB Configuration
    MONGO_DB_URI=your_mongodb_connection_string

    # JWT Configuration
    JWT_SECRET=your_super_secret_jwt_key

    # AWS S3 Configuration
    AWS_REGION=your_s3_bucket_region # e.g., us-east-1
    AWS_ACCESS_KEY_ID=your_aws_access_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    S3_BUCKET_NAME=your_s3_bucket_name
    ```

4.  **Run the application:**
    ```bash
    node app.js
    ```
    The server will start on the port defined in your `.env` file (e.g., `http://localhost:3000`).

## Available Routes

### User Routes (`/user`)

-   `GET /user/register`: Renders the user registration page.
-   `POST /user/register`: Handles new user creation.
-   `GET /user/login`: Renders the user login page.
-   `POST /user/login`: Authenticates the user and creates a session cookie.
-   `GET /user/logout`: Clears the session cookie and logs the user out.

### Main Routes (`/`)

-   `GET /`: (Protected) Renders the home page, displaying files uploaded by the logged-in user.
-   `POST /upload`: (Protected) Handles file uploads to AWS S3.
-   `GET /download/:path`: (Protected) Handles file downloads. It verifies the user's ownership of the file before streaming it from S3.
