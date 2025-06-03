import { Inject, Injectable } from '@nestjs/common';
import { PutCommand, DynamoDBDocumentClient, QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { User } from '../../domain/user.entity';


@Injectable()
export class UserRepository {
  private readonly tableName?: string = process.env.DYNAMODB_USER_TABLE || 'star-weather-service-user-dev';
  private readonly emailIndex = 'email-index';

  constructor(
    @Inject('DYNAMO_CLIENT')
    private readonly docClient: DynamoDBDocumentClient
  ) {}

  async save(user: User): Promise<void> {
    await this.docClient.send(new PutCommand({
      TableName: this.tableName,
      Item: user.toJson(),
    }));
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: this.emailIndex,
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const result = await this.docClient.send(new QueryCommand(params));

    return result.Items?.[0] ? User.fromJson(result.Items[0]) : null;
  }
}