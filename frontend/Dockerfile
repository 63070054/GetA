# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock /app/

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . /app

# Expose the port on which the application will run
EXPOSE 3000

# Start the application in development mode
CMD ["yarn", "dev"]
