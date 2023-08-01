FROM node:latest

WORKDIR /app

COPY . .

RUN yarn 
RUN yarn build

EXPOSE 3000
CMD ["yarn", "dev", "--host", "0.0.0.0"]
