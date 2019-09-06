# serverless-jwt

A serverless API powered by API Gateway with JWT authentication

## Usage

Install with `yarn install` and run `yarn start` to fire the development server

## Deployment

Just run `yarn deploy`. It will output the API keys and the endpoints at the end, along with the selected stage

## Routes

### /auth/login

The login endpoint. Uses the POST method and expects the `x-api-key` header (the API key will be displayed on the terminal/console on dev mode) and the credentials in the Basic format (`user:password` in base64 encoding) at the `Authorization` header. Should return the access token (valid for 1 hour) and a refresh token (valid for 1 month)

### /users/me

The user endpoint, just to test the access token. Uses the GET method and expects the `Authorization` header in the format `Bearer accessToken`. Should return the user configured on `handlers/login.checkCredentials`

### /auth/token

The token renewal endpoints. Expects the POST method and the `Authorization` header in the format `Bearer refreshToken`. Should return two new tokens

## TODO

- token blacklist
- user management
