FROM hypriot/rpi-node:latest 

ADD ./ ./
RUN npm install

CMD node index.js
