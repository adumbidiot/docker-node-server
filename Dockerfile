FROM hypriot/rpi-node:latest 

ADD ./ ./
RUN npm install

EXPOSE 8080 
#Set up for 8080 ==> 9002

CMD node index.js
