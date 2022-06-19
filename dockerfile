FROM amazon/aws-lambda-nodejs:16
COPY . ./
RUN npm install
CMD [ "index.handler" ]