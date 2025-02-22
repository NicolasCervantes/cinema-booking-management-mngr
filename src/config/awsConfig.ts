import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1', // Cambia esto a tu región
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const ses = new AWS.SES();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export { ses, dynamoDB };