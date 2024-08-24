# Mealify
-- A web application to inspire cooks with what they have in the fridge.

## Backend
### Starting up the backend:
- Create a virtual enviroment and  install requirements.txt
- Step 1:
    - pip install requirements.txt
- Step 2:
    - run python manage.py runserver
- Step 3:
    - ctrl + c out of that and run python manage.py make migrations
- Step 4:
    - run python manage.py migrate then run python manage.py runserver and you are all set.

## Frontend
### Starting up the React Front end.
- Step 1:
    - navigate to the cap2-frontend directory and run npm i
- Step 2:
    - run npm run and your front end is all set.
- Step 3:
    - our app runs on Spoontacular's Recipe Api so an api key will be required.
    - url: https://spoonacular.com/food-api
- Step 4:
    - once a key is optained create a .env file and create a variable "REACT_APP_API_KEY and set it equal to the api key as a string and set BACKEND_URL to the backend url of your choosing.

## Proposal
![Project Proposal](/Capstone%20Project%202%20Proposal.pdf)

## Models
![Model Flow Chart](https://drive.google.com/file/d/19MuyX2PFR9ZMUu25RU-Bu3qVIFRefTo_/view?usp=sharing)