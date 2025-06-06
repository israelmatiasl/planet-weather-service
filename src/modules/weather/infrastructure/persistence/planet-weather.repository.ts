import { Inject, Injectable } from '@nestjs/common';
import { PutCommand, DynamoDBDocumentClient, QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { PlanetWeather } from '../../domain/planet-weather.entity';


@Injectable()
export class PlanetWeatherRepository {
  private readonly tableName?: string = process.env.DYNAMODB_TABLE || 'star-weather-service-dev';
  private readonly autogeneratedIndex = 'autogenerated-index';

  constructor(
    @Inject('DYNAMO_CLIENT')
    private readonly docClient: DynamoDBDocumentClient
  ) {}

  async save(planetWeather: PlanetWeather): Promise<void> {
    await this.docClient.send(new PutCommand({
      TableName: this.tableName,
      Item: planetWeather.toJson(),
    }));
  }

  async findByAutogenerated(
    autogenerated: boolean = false,
    limit = 10,
    lastKey?: Record<string, any>
  ): Promise<{ items: PlanetWeather[]; lastKey?: Record<string, any> }> {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: this.autogeneratedIndex,
      KeyConditionExpression: 'autogenerated = :autogenerated',
      ExpressionAttributeValues: {
        ':autogenerated': autogenerated ? 1 : 0,
      },
      Limit: limit,
      ExclusiveStartKey: lastKey,
    };

    const result = await this.docClient.send(new QueryCommand(params));

    return {
      items: result.Items?.map(item => PlanetWeather.fromJson(item)) || [],
      lastKey: result.LastEvaluatedKey,
    };
  }
}