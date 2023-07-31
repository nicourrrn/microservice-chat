FROM golang:latest 

WORKDIR /app

COPY . . 
RUN go mod download
RUN go build cmd/main.go

EXPOSE 3000 
CMD ["./main"]
