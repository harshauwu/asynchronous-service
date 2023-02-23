# Asynchronous Services

### Used Technologies
- Nodejs
- MySql
- AWS
- SQS
- SNS
- Lambda

### Architecture

##### Below is the architectural diagram for synchronous services.

![My Image](/documents/asynchronous_services.png)

This system has four lambda services
- Request Handler Service
- Data Store Service
- Email Notification Service
- Email Delivery Service

### Installation
First you need to clone repo into local machine.

npm run install
Create a zip file using 
```
npm run predeploy.
```

#### Note: 
You should create zip file for each services one by one.

The,
You should have to create below services in AWS account:
- API gateway
- 4 lambda functions.
- 3 SQS
- SNS topic

You can deploy each services using below command:
```
npm run deploy
```


After completing the setup, you can send a post request api request to the API gateway using Postman. I have added Postman script to the document directory; you can import that file, update the URL, and run it.


### How the system works:
Request-handler-service is being triggered by API Gateway. Then it will send a message to SQS and return a success response. After that, SQS triggers the data store service. Then it will be receiving jobs, and it will store the request payload in the database. Then it will send a message to the queue. The queue is triggering the email notification service, and the email notification service is receiving the job, sending an email to the recipient, and storing the email details in the email log database.

We have configured the SNS service to capture the delivered emails. When a response received it will be send job into queue. The queue is triggering email delivery service, and it will update the email log database. Then we can list down email notifications in the admin panel using the email log database.

