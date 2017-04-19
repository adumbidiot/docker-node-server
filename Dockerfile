FROM hypriot/rpi-node:latest 

ADD ./package.json ./package.json
RUN npm install

ADD ./ ./

EXPOSE 8080 
#Set up for 8080 ==> 9002

CMD node index.js
