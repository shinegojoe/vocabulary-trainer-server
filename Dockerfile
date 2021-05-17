FROM ubuntu:18.04

# Set the working directory to /app
WORKDIR /app

# Install any needed packages specified in requirements.txt


RUN apt update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN apt install vim -y
RUN apt-get install build-essential -y
RUN npm install pm2 -g

# Make port available to the world outside this container
# 5003 for server, 5004 for client
EXPOSE 5011

