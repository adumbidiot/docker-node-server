FROM hypriot/rpi-node:latest 

ADD ./package.json ./package.json
RUN npm install

ADD ./public ./public
ADD ./views ./views
ADD ./ ./

EXPOSE 8080 
#Set up for 8080 ==> 9002

CMD node index.js
