# Use an official Node.js runtime as a parent image
FROM node:16.13.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy package.json and package-lock.json (if applicable)
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Install app dependencies
RUN npm install --production

# Bundle app source (copy the rest of the application code)
COPY . .

# (Optional) Build your application
# RUN npm run build

# Expose the port your app runs on
EXPOSE 3001

# Define the command to run your app
CMD ["npm", "start"]
