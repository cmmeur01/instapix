FROM node:8.4

COPY . ./

RUN cd frontend \
  && npm install --silent \
  && cd .. \
  && npm install --silent

EXPOSE 3000

CMD ["npm", "run", "dev"]

