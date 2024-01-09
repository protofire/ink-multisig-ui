# Use the official Node.js image as a base image
FROM node:18

# Download git to clone the repository
RUN apt-get install git

# Set the working directory in the container
WORKDIR /xs-doc

# Clone the application to the container
RUN git clone https://github.com/GabrielCamba/xs-doc.git .

# Install the dependencies in the container
RUN yarn install 

# Build the Docusaurus website
RUN yarn build 

# Expose port 3001 for the Docusaurus server
EXPOSE 3001

# Command to run the Docusaurus server
CMD ["yarn", "serve","-p","3001"] 