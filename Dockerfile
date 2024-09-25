# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Install nodemon globally for development purposes.
RUN npm install -g nodemon

# Copy local code to the container image.
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Use nodemon for development to auto-restart the server on file changes
CMD [ "nodemon", "app.js" ]
