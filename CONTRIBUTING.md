## Installation

 Make sure you have [python3](https://www.python.org) and [pip](https://pip.pypa.io/en/stable/) installed
 
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

 ## Usage
 Create a .env file using the .flaskenv template

 ### Run on Docker
 ```bash
 $ flask db init
 $ docker-compose up --build
 ```

 ## Contributing
 Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
