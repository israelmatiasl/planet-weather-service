import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const DynamoDBProvider = {
    provide: 'DYNAMO_CLIENT',
    useFactory: () => {
        const client = new DynamoDBClient({ region: process.env.AWS_REGION });
        return DynamoDBDocumentClient.from(client);
    }
};