FROM node:12
WORKDIR /beelinked-client/
ADD . /beelinked-client/
RUN npm install
RUN rm node_modules/mdbreact/dist/mdb*
ADD mdb* node_modules/mdbreact/dist
RUN ls
CMD [ "npm", "start" ]
EXPOSE 3000
