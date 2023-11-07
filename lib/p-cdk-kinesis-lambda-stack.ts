import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kinesis from 'aws-cdk-lib/aws-kinesis';
import * as _lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';

export class PCdkKinesisLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stream = new kinesis.Stream(this, 'MyKinesisStream', {
      streamName: 'MyKinesisStream',
    });
    
    const lambdaFunction = new _lambda.Function(this, 'Function', {
      code: _lambda.Code.fromAsset('src'),
      handler: 'kinesis.handler',
      functionName: 'KinesisMessageHandler',
      runtime: _lambda.Runtime.PYTHON_3_11,
    });
    
    const eventSource = new lambdaEventSources.KinesisEventSource(stream, {
      startingPosition: _lambda.StartingPosition.TRIM_HORIZON,
    });

    lambdaFunction.addEventSource(eventSource);
  }
}
