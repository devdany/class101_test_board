Project Run
=============

# config.json

프로젝트 최상단 디렉터리에 config.json 파일 생성후 아래와 같이 DB정보 입력.
```
{
  "db": {
    "prod": {
      "schema": "foo_schema",
      "username": "foo_user",
      "password": "foo_password",
      "host": "localhost",
      "dialect": "mysql"
    },
    "dev": {
      "schema": "foo_schema_dev",
      "username": "foo_user",
      "password": "foo_password",
      "host": "localhost",
      "dialect": "mysql"
    }
  }
}
```

# Add Dependency & Server Start

Dependency 추가

```
yarn install
``` 
or 
```
npm install 
```

서버 Run (개발서버)
```
yarn start 
```
or 
```
npm start 
```
