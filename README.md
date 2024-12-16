# Node Js Application

## Overview

The backend application is a Node.js and Express.js server that provides APIs for user authentication, role-based access control, and weather data retrieval. It includes features for user registration, login, and user management. The weather data is fetched using AWS Lambda and integrated with OpenWeatherMap API.

## Features

**User Authentication**: Token-based authentication using JWT.

**Role-Based Access Control:** Different access permissions for Users, Admins, and SuperAdmins.

**User Management:** SuperAdmins can edit both admin & user details. For example - Changing roles from admin to user and user to admin. While Admins can edit only users details. For example - User details such as role from user to admin.

**Weather Service:** Fetches weather data using AWS Lambda and OpenWeatherMap API.

## Prerequisites

-Node.js

-npm

-MongoDB

## Installation

1. Clone the repository: [git clone https://github.com/yourusername/your-repo-name.git](https://github.com/ishubham-nagarro/weather-app.git)
2. Navigate to the project directory: cd weather-app
3. Install dependencies: npm install

## Running the Application

### `npm start`
