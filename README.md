## The Task

Thank you for applying for the role of an Android developer at PassEntry!

At PassEntry, we move fast and maintain our core applications as well as prototype new solutions for our clients. These apps integrate with a variety of backend APIs - provided by our own servers as well as those of third parties.

Your task is to build a simple Android application and integrate it with a mock HTTP API included in this project. The API details as well as instructions on how to run the API locally are described further down.

**Note:** we know that creating apps that users love takes time! We're not expecting you to cover all edge cases and build a beautiful UI in a few hours. We're more than happy if you give us a simple implementation to start with - you'll have a chance to tell us how you'd develop the app further when we meet to discuss your solution.

We only ask that you use Kotlin or Java. All other technology choices are up to you.

### Application spec

Below are the application requirements.

#### Login page

The login page should accept a username and password. When submitted,
the application should validate these credentials against the `/login` endpoint
of the mock API (documented below).

#### Home page

This page should only be accessible to authenticated users. The login page
should display the username of the authenticated user.

#### Tap history page

This page should only be accessible to authenticated users. It should display the list of pass taps which can be retrieved from the `/taps` endpoint of the mock API (documented below).

## Mock API

We've included a mock HTTP API for you to integrate the application with. Please integrate with the API as is - we do not expect you to make any changes to the API itself.

### Valid user credentials

The API has been pre-configured to accept **only one username and password**:

- username: hello@passentry.com
- password: securepass

Sending these to the `/login` endpoint should result in success. Any other credentials will be rejected as invalid.

### How to run the mock HTTP API

You will need `docker` and `docker-compose` installed to run the API.

To start the mock API, run the following command:

```sh
docker-compose up --build
```

This should start the mock HTTP API on `http://localhost:3000`.

## Mock API endpoints

The base URL for the mock API is `http://localhost:3000`.

### 1. POST /login

#### Description

Authenticate a user and generate an API token.

#### Request

- Method: `POST`
- URL: `/login`
- Headers:
  - Content-Type: `application/json`

##### Request Body

```json
{
  "username": "...",
  "password": "..."
}
```

#### Success Response

If the correct credentials are given (see above), the response body contains an API token to
be used with the `/taps` endpoint (described further below).

- Status Code: `200 OK`

##### Success Response Body

```json
{
  "api-token": "..."
}
```

#### Error Response

If incorrect credentials are given, no token is returned.

- Status Code: `401 Unauthorized`

##### Error Response Body

```json
{
  "error": "Unauthorized"
}
```

## GET /taps

### Description

Retrieve a collection of pass tap history data.

**Note: to get a successful response, the request must include a header with a bearer token. The only token that will work is the one returned by the `/login` endpoint.**

### Request

- Method: `GET`
- URL: `/taps`
- Headers:
  - Authorization: `Bearer ...`

#### Success Response

- Status Code: `200 OK`
- Body:

```json
[
  {
    "tappedAt": "2023-12-22T12:34:56.789Z",
    "status": "success",
    "readerId": "someReaderId"
  },
  {
    "tappedAt": "2023-12-23T12:34:56.789Z",
    "status": "fail",
    "readerId": "someReaderId"
  }
  // ... more data
]
```

#### Error Response

If authorization token in the request is missing or invalid, no data is returned

- Status Code: `401 Unauthorized`

##### Error Response Body

```json
{
  "error": "Unauthorized"
}
```

## Questions?

If you have any questions about this task, you can email us at jobs@passentry.com
