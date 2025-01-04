FROM node:18.16-alpine AS builder


ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone


WORKDIR /backend-research

# Copy the package.json and package-lock.json files to the container
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node . .


RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the application
RUN npm run build

# Use a lightweight Node.js 18 image as the base image
FROM node:18.16-alpine AS production

ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone

WORKDIR  /backend-research

# Copy the production build files from the builder image to the container
COPY --from=builder  /backend-research/dist ./dist
COPY --from=builder  /backend-research/.env/ ./.env
COPY --from=builder  /backend-research/node_modules ./node_modules


COPY package*.json ./
COPY tsconfig.json ./

EXPOSE 4000

CMD ["npm","run" , "start:prod"]


