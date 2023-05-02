FROM golang:1.16.7-alpine3.14

# Set the working directory
WORKDIR /app

# Copy the go.mod and go.sum files to the container
COPY go.mod go.sum ./

# Download the Go modules
RUN go mod download

# Download the missing dependency and update the checksums
RUN go get golang.org/x/text
RUN go mod verify

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN go build -o main .

# Set the environment variable for the server port
ENV PORT=8080

# Expose the port that the application will run on
EXPOSE 8080

# Start the application
CMD ["./main"]
