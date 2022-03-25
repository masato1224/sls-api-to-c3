## デプロイ

```
npx sls deploy --aws-profile private-aws
```

## how to use

```
curl https://25mnk42q4b.execute-api.ap-northeast-1.amazonaws.com/dev/s3/test  -d '{"message": "testtest"}' -H 'Content-Type:application/json'
```
