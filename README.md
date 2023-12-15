# EcologyGame (IOAD 2)

## Project modules
# User management module
### Module APIs
- User authentication interface
    - Create, modify, delete account
    - Sign in/sign out user ===> unique session token
    - Get user info by session token
- User relationship interface
    - Add relationship
    - Remove relationship
    - List user relationships 
- User status interface
    - receive user structure change event (SSE/Websocket?)
    - multicast user action

- Mail management interface

### [View full documentation of the User Management Module (UMM)](/src/modules/user_management/README.md)
# Forum module
### Module APIs
### [View full documentation of the Forum Module (FM)](/src/modules/forum/README.md)
# Leaderboard module (?)
### Module APIs
### [View full documentation of the Leaderboard Module (LM)](/src/modules/leaderboard/README.md)
### Module APIs
# Core module / game module
### Module APIs
### [View full documentation of the Core Module/Game Module (GM)](/src/modules/game_core/README.md)

# EcologyGame dev guide

## 7.11.2023 manual

# Run applicaton locally without container:
If you would like to run the server without using Docker container, please follow the below steps:
1. Install sqlite3:
```
$ sudo apt-get install sqlite3
```
2. ~~Copy the EcologyGame/.env file into the EcologyGame/src/bin directory:~~
```
EcologyGame $ cp .env src/bin/
```
UPDATE: As Typescript was added to the project, you need to copy .env into the src/transpiled/bin directory instead:
```
EcologyGame $ cp .env src/transpiled/bin/
```
3. Run ```EcologyGame/src $ npm install```
4. Run ```EcologyGame/src $ /bin/sh ./start.sh```
   
The application server should now be running directly in the host OS, using the port specified in the .env file (8090 by default for now)\
If you encounter problems, please create an issue for this repository. 
# Run application locally using Docker Compose (recommended for development):
Always make sure using the correct Docker context, by executing:
```
EcologyGame $ docker context use default
```
Build the Docker image:
```
EcologyGame $ docker compose up --build -d 
```
Note 1: This will run the container as soon as the image is built. \
Note 2 : . (this note will appear during deployment setup)
 
If the image is already built, starting or stopping the container is as easy as running ```docker compose up``` or ```docker compose down```.


# Update the image in the Azure Container Registry (use to update the application hosted at Azure)
This section will be completed during deployment setup
# Run and stop the live remote container 
This section will be completed during deployment setup
# Live demo of the hosted container instance
```diff
- NOT YET AVAILABLE
```
1. Visit xxx://xxx.xxx.azurecontainer.io (the FQDN will be updated during deployment setup)
# Change the network port used to access the application
To change the port used to access the application you need to modify the **.env** file.
# Where do I learn more about the project technologies?
To learn more about the project, you can visit the repository community wiki: (doesn't exist yet)
If you feel like sharing the knowledge about the project technologies or have useful resources to include, feel free to contribute to the repository wiki.  
# What needs to be done?
Check issues

