FROM golang:1.20-alpine

WORKDIR /backend

# Copy go.mod and go.sum to the working directory
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the code to the container
COPY . .

# Build the Go app
RUN go build -o backend .

# Expose port 8080
EXPOSE 8080

# Command to run the backend
CMD ["./backend"]
