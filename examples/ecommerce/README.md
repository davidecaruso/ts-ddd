# E-commerce
This is a simple example which makes use of the library.

## Installing dependencies
This example has his own dependencies, like web server, database driver and so on.
To install them run the following command:

```npm
npm i --no-save fastify pino mongodb
```

## Running the application
Now it's time to start the application, but do that from the root of the project:

```shell
ts-node --project tsconfig.json examples/ecommerce/app/index.ts
```

## Do something
This example exposes some API endpoints, let's try to call this one:

```shell
curl --request POST \
  --url http://127.0.0.1:8080/api/v1/orders \
  --header 'Content-Type: application/json' \
  --data '{
    "userId": "602cf58400f4c67f28ddcc0c",
    "products": [
        {
            "id": "640318e5ae2b9170a39d349c",
            "quantity": 2
        }
    ]
}'
```
