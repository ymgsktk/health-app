FROM node:16.20.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install -g next@14.2.4

RUN npm install react-router-dom@6.26.0

RUN npm install axios

RUN npm install redux react-redux

# Copy the rest of the application code
COPY . .

CMD ["npm", "start"]