# Specify the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .


# Start the Next.js app
CMD ["yarn", "dev"]