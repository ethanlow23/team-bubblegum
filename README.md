# Receipt Tracker
Do you enjoy spending? Have you ever checked your bank statement and wondered how the balance got to be so high? Maybe you feel the need to control your spending habits. This application aims to help with just that as it allows you to input receipts from each of your purchases to inform you of how much you have been spending, along with what you have been spending on. Let us know how much you want to allocate for your spending and we will let you know when you should stop!
## Specific Contributions
- Create overall structure for the frontend and backend
- Implemented frontend React component to upload receipt and images
- Integrate Celery to handle asynchronous requests and schedule email notifications
- Incorporate Amazon Web Service's S3 to store image uploads into buckets
- Create database table for images and backend route to store images with specific receipts
## Getting Started
To get started, make sure to have the required prerequisites installed on your local machine. Follow the installation directions below to get the project up and running locally.

### Installation
From top level directory of project
- Install the backend dependencies...
```bash
cd server
pipenv install
```
- Install the frontend dependencies...
```bash
cd client
npm install
```
### Start the application
1. Open a terminal
2. First tab:
Go to `server` folder and run `pipenv run flask run`
3. Second tab:
Go to `client` folder and run `npm start`
4. Open a browser and navigate to `localhost:3000`

## Built With
Some of the technologies used to build the application:
* [Python 3](https://www.python.org/) - Programming language
* [Flask](http://flask.palletsprojects.com/en/1.1.x/) - Web framework written in Python
* [PostgreSQL](https://www.postgresql.org/) - Relational database management system
* [React](https://reactjs.org/) - JavaScript library for building user interfaces
* [Material-UI](https://material-ui.com/) - React UI framework, Material Design for React
* [Celery](http://docs.celeryproject.org/en/latest/index.html) - Asynchronous task queue/job queue
