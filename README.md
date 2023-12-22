# App Backend

This is Dietarify Backend Application

## Requirements

Before you start the application, you should provide below requirements:

- Google Cloud Project
- ML API
- Firebase Project
- Firebase CLI
- Node 20
- Yarn 1.22.21

## Running Development Mode

1. Please setup Firebase CLI. See https://firebase.google.com/docs/cli#sign-in-test-cli
2. Change file `.firebaserc` based on your firebase project
3. Copy `.env.example` to `.env` and fill the information based on your environment
4. Run firebase emulator

```sh
yarn firebase:emulator
```

1. Run below command to install all dependencies:

```sh
yarn
```

3. Migrate the database with below command:

```sh
npx prisma migrate dev
```

4. Run below command to run the server

```sh
yarn dev
```

## Running Production Mode

1. Copy `.env.example` to `.env` and fill the information based on your environment. Note that you have not to set `SHADOW_DATABASE_URL` on production for security concern. It is prefered to use system environment variable rather than use `.env` file.
2. RUn below command to install all dependencies:

```sh
yarn install --production
```

3. Run below command to build the application:

```sh
yarn build
```

4. Run below command to run application:

```sh
yarn start
```

## FAQ

### How to get token id for testing in development mode?

You can use firebase emulator to do that. Assume that firebase emulator run at `http://localhost:9099`. You can make token with below sample request:

```
POST http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyC_yUWGQ_5xjzZqIFAYfz16YFZeIPSjbrc

{
	"returnSecureToken": true,
	"requestUri":"http://localhost",
	"postBody":"id_token=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMDk4NjE2MzY4MjgyMDY5NTgyNjkwNzE3NTgwODM2NDQwMjY3MjkzIiwiaXNzIjoiIiwiYXVkIjoiIiwiZXhwIjowLCJpYXQiOjE3MDExMDIyNTIsIm5hbWUiOiJQZWFjaCBBbGdhZSIsInNjcmVlbl9uYW1lIjoiYWxnYWVfcGVhY2giLCJlbWFpbCI6InBlYWNoLmFsZ2FlLjU5OEBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfQ.&providerId=google.com"
}
```

The response of above request looks like this:

```json
{
  "kind": "identitytoolkit#VerifyAssertionResponse",
  "context": "",
  "providerId": "google.com",
  "displayName": "Peach Algae",
  "fullName": "Peach Algae",
  "screenName": "algae_peach",
  "email": "peach.algae.598@example.com",
  "emailVerified": true,
  "rawUserInfo": "{\"granted_scopes\":\"openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email\",\"id\":\"1098616368282069582690717580836440267293\",\"name\":\"Peach Algae\",\"verified_email\":true,\"locale\":\"en\",\"email\":\"peach.algae.598@example.com\"}",
  "federatedId": "https://accounts.google.com/1098616368282069582690717580836440267293",
  "oauthAccessToken": "FirebaseAuthEmulatorFakeAccessToken_google.com",
  "oauthIdToken": "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMDk4NjE2MzY4MjgyMDY5NTgyNjkwNzE3NTgwODM2NDQwMjY3MjkzIiwiaXNzIjoiIiwiYXVkIjoiIiwiZXhwIjowLCJpYXQiOjE3MDExMDIyNTIsIm5hbWUiOiJQZWFjaCBBbGdhZSIsInNjcmVlbl9uYW1lIjoiYWxnYWVfcGVhY2giLCJlbWFpbCI6InBlYWNoLmFsZ2FlLjU5OEBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfQ.",
  "localId": "PO1eOI9V5Au9lULaObF7fxkh1Ltq",
  "idToken": "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiUGVhY2ggQWxnYWUiLCJlbWFpbCI6InBlYWNoLmFsZ2FlLjU5OEBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE3MDMxNzQ2MzIsInVzZXJfaWQiOiJQTzFlT0k5VjVBdTlsVUxhT2JGN2Z4a2gxTHRxIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwZWFjaC5hbGdhZS41OThAZXhhbXBsZS5jb20iXSwiZ29vZ2xlLmNvbSI6WyIxMDk4NjE2MzY4MjgyMDY5NTgyNjkwNzE3NTgwODM2NDQwMjY3MjkzIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9LCJpYXQiOjE3MDMxNzQ2MzIsImV4cCI6MTcwMzE3ODIzMiwiYXVkIjoiZGlldGFyaWZ5IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2RpZXRhcmlmeSIsInN1YiI6IlBPMWVPSTlWNUF1OWxVTGFPYkY3ZnhraDFMdHEifQ.",
  "refreshToken": "eyJfQXV0aEVtdWxhdG9yUmVmcmVzaFRva2VuIjoiRE8gTk9UIE1PRElGWSIsImxvY2FsSWQiOiJQTzFlT0k5VjVBdTlsVUxhT2JGN2Z4a2gxTHRxIiwicHJvdmlkZXIiOiJnb29nbGUuY29tIiwiZXh0cmFDbGFpbXMiOnt9LCJwcm9qZWN0SWQiOiJkaWV0YXJpZnkifQ==",
  "expiresIn": "3600"
}
```

You can use `idToken` as token for connecting to our backend.
