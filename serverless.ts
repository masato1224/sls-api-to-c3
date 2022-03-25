import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'sls-api-to-c3',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-apigateway-service-proxy'],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    apiGatewayServiceProxies: [
      {
        s3: {
          path: '/s3/{myKey} ',
          method: 'post',
          action: 'PutObject',
          bucket: {
            Ref: 'S3Bucket',
          },
          key: {
            pathParam: 'myKey',
          },
          cors: true,
        },
      },
    ],
  },
  resources: {
    Resources: {
      S3Bucket: {
        Type: 'AWS::S3::Bucket',
      },
    },
  },
}

module.exports = serverlessConfiguration
