FROM node:14.19.0
WORKDIR /app
COPY ["package.json","package-lock.json", "./"]
RUN npm install --production
COPY . .
EXPOSE 80
CMD ["npm", "stat"]