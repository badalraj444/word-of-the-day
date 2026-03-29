FROM node AS base
WORKDIR /usr/local/app 

FROM base AS client-base
COPY client/package.json client/package-lock.json ./ 
RUN npm install 
COPY client/eslint.config.js client/index.html client/vite.config.js client/public ./
COPY client/src ./src   

FROM client-base AS client-dev 
# CMD ["npm",  "run", "dev"] 
CMD ["npm", "run", "dev", "--", "--host"]

# todo: client-build 


###### BACKEND ########

FROM base AS backend-dev 
COPY backend/package.json backend/package-lock.json ./               
RUN npm install 
COPY backend/src ./src 
# CMD [ "npm", "run", "dev" ] 
CMD ["npm", "run", "dev", "--", "--host"]