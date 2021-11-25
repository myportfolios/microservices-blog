#Base Image file
FROM node:alpine

# work dir to use
WORKDIR /app

#copy the package.json file from current work dir to container
#package.json is needed to run 'npm install'
COPY ./package.json ./

#run 'npm install' to install depenedencies
RUN npm install

#copy all the files and folders from current dir to WORKDIR of the vreated container
COPY ./ ./

#provide command to run/start the container
CMD ["npm", "start"]

