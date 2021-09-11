# RossetaTranslate


## How to setup


### 1. Make env file
create `.env` file and put root folder.

```
DEEPL_API_KEY=<DEEPL API key>
GOOGLE_APPLICATION_CREDENTIALS=<google translate credential filepath>
```

### 2. build and run backend server

```
cd server
go build
go run ./main.go ./TranslateServer.go
```

### 3. run frontend
```
cd frontend
yarn build
yarn start
```