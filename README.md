# DevUp
![devup](https://user-images.githubusercontent.com/74735037/129316871-f9dc82d2-dd5e-493d-bb8e-06500c2bee33.png)

By Michelle Shen, Eduardo Venegas, and Angela Wang

**Deployment: https://dev-up.tech**

[![License](https://img.shields.io/github/license/LaloVene/MLH-PE-Project)](https://github.com/LaloVene/MLH-PE-Project/blob/main/LICENSE)
[![Monitoring](https://img.shields.io/website?url=https%3A%2F%2Fdev-up.tech)](https://dev-up.tech)


## 📖 Project Overview
Ever wanted to work on a project with others but don't know where to get started? Introducing DevUp - a platform to help developers find teammates for side projects.

Developers can search for projects that they are interested in, and contact the current team members of the project to learn more about them and join their team. Developers that already have an project idea can make a post on DevUp to display it to other project-seeking developers and find new team members.

## 📍 Table of Contents
- [Technologies Used](https://github.com/LaloVene/MLH-PE-Project#-technologies-used)
- [Architecture](https://github.com/LaloVene/MLH-PE-Project#-architecture)
- [CI/CD](https://github.com/LaloVene/MLH-PE-Project#-cicd)
- [Site Overview](https://github.com/LaloVene/MLH-PE-Project#-site-overview)
- [Monitoring](https://github.com/LaloVene/MLH-PE-Project#%EF%B8%8F-monitoring)
- [Installation](https://github.com/LaloVene/MLH-PE-Project#%EF%B8%8F-installation)
- [Usage](https://github.com/LaloVene/MLH-PE-Project#-usage)
- [Contributing](https://github.com/LaloVene/MLH-PE-Project#-contributing)


## 💻 Technologies Used
- Docker
- React Ionic
- Flask
- PostgreSQL
- AWS
- NGINX
- cAdvisor
- Prometheus
- Grafana
- Github Actions
- Github Package Registry
- Python
- JavaScript

## 📚 Architecture
The architecture is highly modularized, where every service has its own container and is independent from the others.
- The Nginx service container loads the SSL certificate and has a reverse proxy to connect the client app and the monitoring tools.
- The Client and API containers get their images by pulling from our Github Package Registry. These images are built into the CI/CD workflow with Github Actions.
- The API image is only accesible via the internal Nginx service in the Client container. On top of that, the API container connects to a Database contianer that has its own volume for data persistance.
- The Monitoring containers are accessible by their own routes or ports and have volumes to keep their data persistant.
![DOCKER ARCHITECTURE](https://user-images.githubusercontent.com/54692916/129938902-fccfd75c-d9e9-4366-8167-0077ea170052.png)

## 🤖 CI/CD
This project has a full Continuous Integration and Delivery system.
- All code is tested the moment a pull request is created using Linters and Unit Tests (Postman Testsing and Jest).
- You can merge into main when all tests pass 
- When Continuous Delivery is triggered, Github Actions builds the Client and API images and pushes them into a Github Package Registry.
- Finally, Github Actions SSHs into the AWS instance, pulls the new images, stops the current docker compose and runs it again.
![CI_CD](https://user-images.githubusercontent.com/54692916/130151094-c816d17d-f13a-4995-8473-9658d3342949.png)

## 🔍 Site Overview
### Login/Register
![Login Page](https://user-images.githubusercontent.com/74735037/129318143-f7a9b079-90bc-41e5-8aa4-c6f4f76db48c.png)
![Register Page](https://user-images.githubusercontent.com/74735037/129318198-f6763547-4745-4fbe-be49-dee9a9105b1d.png)
Developers can create a DevUp account to share their interests and languages, post about their projects, and contact other project owners.

### Explore/Home Page
![Explore/Home Page](https://user-images.githubusercontent.com/74735037/129460432-6744aaf1-aec5-4645-ba84-bd33ce229bdd.png)
The Explore/Home Page is where developers can see projects that are open for collaboration. Users will be able to view more details about the project and contact the project owner.

### Categories Page
![Categories Page](https://user-images.githubusercontent.com/74735037/129460447-323cd625-fa1f-49d1-919f-fd3c46f7e302.png)
![Category Example](https://user-images.githubusercontent.com/74735037/129461644-23bef6a2-6656-4769-bbe4-38a81b419d89.png)
The Categories Page shows all available topics and users can click on a topic to view related projects.

### Projects Page
![Projects Page](https://user-images.githubusercontent.com/74735037/129464603-7b70f2f4-2e11-49cf-bf95-a0138f8143ea.png)
![Project example](https://user-images.githubusercontent.com/74735037/129464596-38fe0434-7f54-4ba9-a5a4-f728f71dd63e.png)
The Projects Page displays all of the projects that the user is contributing to. It is also where the user can post about their own project to look for other developers, and make edits to their post when necessary. 


### Profile Page
![Profile Page](https://user-images.githubusercontent.com/74735037/129464999-b1730a11-8626-4508-b7fc-f15bf7808e47.png)The Profile Page displays a user's basic information, languages, interests, and top projects that they are working on.

## 🖥️ Monitoring
### cAdvisor
![cAdvisor](https://user-images.githubusercontent.com/54692916/129934946-bfae1683-6397-44c2-aad8-5b2c3899ab06.png)
### Prometheus
![Prometheus](https://user-images.githubusercontent.com/54692916/129935101-8c2206ce-5b88-409b-b567-8d3b18b15b8e.png)
### Grafana
![Grafana](https://user-images.githubusercontent.com/54692916/129982602-9be6d3ef-223a-4e70-9c6d-ce4b5f476b29.png)

## ⬇️ Installation

 Make sure you have [python3](https://www.python.org) and [pip](https://pip.pypa.io/en/stable/) installed
 
 Clone the directory and enter the project directory:
 ```bash
 $ git clone https://github.com/LaloVene/MLH-PE-Project.git
 $ cd MLH-PE-Project
 ```
 
 Create and activate virtual environment using virtualenv, under /api
 ```bash
 $ cd api
 
 # Install virtualenv
 $ pip install virtualenv
 
 # Create virtualenv
 $ python -m venv venv
 # Create virtualenv for windows
 $ py -3 -m venv venv
 
 # Activate virtualenv:
 $ source venv/bin/activate
 # Activate virtualenv for windows:
 $ venv\Scripts\activate
 ```

 Use the package manager pip to install all dependencies

 ```bash
 $ pip install -r requirements.txt
 ```

 ## 💼 Usage
 Create a .env file in the root app directory using the following template:
 ```env
FLASK_APP=api.py
FLASK_ENV=development
POSTGRES_USER=[username]
POSTGRES_PASSWORD=[password]
POSTGRES_HOST=[host_name]
POSTGRES_DB=[db_name]
```

 ### Run on Docker
 ```bash
 $ flask db init
 $ docker-compose up --build
 ```
 This will create a server running on localhost:5000 and a client running on localhost:3000. Data will be stored in a Docker volume.
 
 ### AWS Configuration
 - Instance:      AWS EC2
 - Instance type: t2.small
 - Traffic:       All
 
## 📝 Contributing
Contributions are welcome! Please refer to the [Contributing](https://github.com/LaloVene/MLH-PE-Project/blob/main/CONTRIBUTING.md) guidelines.


