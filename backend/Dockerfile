# Use a lightweight alpine image with Go and Node.js installed
FROM golang:alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the source code to the working directory inside the container
COPY . .

# Build the Go binary
RUN go build -o main .

# Use a lightweight Node.js image to serve the application
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Go binary from the builder stage to the working directory inside the container
COPY --from=builder /app/main .

# Start the application when the container starts
CMD ["go", "run", "."]