# Node JS - MySQL - HTML - Docker

A simple project made using Node.js as the backend, MySQL as the database, and single-page HTML to interact with the backend.

Clone the project

```bash
  git clone https://github.com/soumiknandi/node-mysql-html-docker.git
```

Go to the project directory

```bash
  cd node-mysql-html-docker
```

Build docker image

```bash  
  docker build -t node-backend -f backend/Dockerfile ./backend

  docker build -t html-frontend -f frontend/Dockerfile ./frontend
```

Run docker compose

```bash
  docker compose up or docker-compose up 
```

Website link

```bash
  http://localhost:8080
```

API gateway link

```bash
  http://localhost:3000/users/
```

##

> [!IMPORTANT]
> Make sure ports 3306, 3000, and 8080 are not in use by other applications.


