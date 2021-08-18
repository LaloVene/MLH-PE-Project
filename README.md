# DevUp
![devup](https://user-images.githubusercontent.com/74735037/129316871-f9dc82d2-dd5e-493d-bb8e-06500c2bee33.png)

By Michelle Shen, Eduardo Venegas, and Angela Wang

**Deployment: https://dev-up.tech**

## 📖 Project Overview
DevUp is a platform where developers of all skill levels can find other developers to team up with on a project. Developers can search for projects that they are interested in, and contact the current team members of the project to learn more about them and join their team. Developers that already have an project idea can make a post on DevUp to display it to other seeking developers and find new team members.

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
The architecture is highly modularized, were every service has its own container and is independent from the others.
- The Nginx service Container loads the SSL certificate and has a reverse proxy to connect the client app and the monitoring tools.
- The client and api containers get their images by pulling from our Github Package Registry, these images are built in the CI/CD workflow with Github Actions.
- The API image is only accesible via the internal nginx service in the client container. On top of that, the API container connects to a Database contianer that has its own volume for data persistance.
- Finally the monitoring containers are accessible by their own routes or ports and have some volumes to keep their data.
![DOCKER ARCHITECTURE](https://user-images.githubusercontent.com/54692916/129931677-4619fff9-a6fc-4905-af29-caf64bf409dc.png)

## 🔍 Project Overview
### Login/Register
![image](https://user-images.githubusercontent.com/74735037/129318143-f7a9b079-90bc-41e5-8aa4-c6f4f76db48c.png)
![image](https://user-images.githubusercontent.com/74735037/129318198-f6763547-4745-4fbe-be49-dee9a9105b1d.png)
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
The Projects Page displays all of the projects that the user is contributing to. It is also where the user can post about their own project to look for other developers.


### Profile Page
![Profile Page](https://user-images.githubusercontent.com/74735037/129464999-b1730a11-8626-4508-b7fc-f15bf7808e47.png)The Profile Page displays a user's basic information, languages, interests, and top projects that they are working on.

## 🖥️ Monitoring
### cAdvisor
![cAdvisor](https://user-images.githubusercontent.com/54692916/129934946-bfae1683-6397-44c2-aad8-5b2c3899ab06.png)
### Prometheus
![Prometheus](https://user-images.githubusercontent.com/54692916/129935101-8c2206ce-5b88-409b-b567-8d3b18b15b8e.png)
### Grafana
![Grafana](https://user-images.githubusercontent.com/54692916/129935190-ae32230c-2e59-4348-adc7-4e3ae0006c66.png)

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
 
## 📝 Contributing
Contributions are welcome! Please refer to the [Contributing](https://github.com/LaloVene/MLH-PE-Project/blob/main/CONTRIBUTING.md) guidelines.


