# Equipments Front-End

## Description

This project is a web application to show equipment's bar chart built with React, TypeScript and Vite. The application features the following functionalities:

- User registration
- User login/authentication
- Bar chart to show the average value for each equipment over the last 24 hours, 48 hours, 1 week and 1 month

## Main Stacks

- React v18.3.1
- TypeScript v5.5.3
- Vite v5.4.1
- Chakra UI to develop the application UI
- Material UI to develop the Bar Chart

## Packages Added

- @chakra-ui/icons and react-icons: For icons
- axios: To make the http requests
- chakra-react-select: To develop the select component
- react-toastify: To display toast notifications
- react-router-dom: To handle routing in the application
- use-local-storage: Hook for managing localStorage

## Dev Dependencies

- eslint: Linter for TypeScript

## Backend

To be able to run the project properly, you need to run the API. Follow the instructions described in the API `README.md` file, which can be found in the [equipments-api repository](https://github.com/suellenlemos/equipments-api)

## Getting Started

- Clone the repository:

```code
git clone https://github.com/suellenlemos/equipments-frontend.git
```

- Go to the project folder

## Environment Variables

- Create a `.env` file in the root of the project and add the environment variable:

```text
VITE_BACKEND_URL=http://127.0.0.1:5002/
```

## Running Project in a Container

### Prerequisites

- Docker
- Docker-compose

### Building and running the container locally

Open your terminal, go to the project folder and execute this command:

```code
docker-compose -f docker-compose.yml build && docker-compose -f docker-compose.yml up -d
```

It will take a few minutes to create the frontend container and build the image.

After that, run `docker ps`. You should be able to see the `co-equipments-frontend` container running.

### Testing the application

Now the application is ready to use!

You can access it through: [http://localhost:3000/login](http://localhost:3000/login)

## Running The Application Locally

Prerequisites:

- Node
- Yarn

To start the project without Docker, follow these steps:

- Go to the project folder

- Install the dependencies:

```code
yarn install
```

- Start the development server:

```code
yarn dev
```

## Usage

1. With the application running, go to the /register route and create a user
2. After that, you will be redirected to the home page
3. To populate the database, download the csv file from the API repository: [equipments.csv](https://github.com/suellenlemos/equipments-api/blob/0f9fa07107ea8f68d1ec1972de67addbf86b7b0f/src/temporary/equipment.csv)
4. To download it, click on the download icon (Download raw file) or press `Command`+`Shift`+`s` (Mac) or `Ctrl`+`Shift`+`s` (Windows/Linux)
5. In the application, click on the "Upload File" button, select the downloaded file and click on the "Send" button
6. In the select component, select an equipment to show the Chart Bar
7. If you wish, you can add new data in the csv file or create a new one and upload it again. Just follow this format:

| equipmentId | timestamp                     | value |
| ----------- | ----------------------------- | ----- |
| EQ-5        | 2024-08-29T01:30:00.000-05:00 | 78.81 |
