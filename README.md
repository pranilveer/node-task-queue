# Node.js Task Queue with Rate Limiting

## Overview

This project implements a Node.js API that queues user tasks with rate limiting. Each user can only process one task per second and 20 tasks per minute. Tasks are logged in a file.

## Requirements

- Node.js
- Redis

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start Redis server.
4. Run the API with `node src/index.js`.

## API Endpoint

- **POST** `/api/v1/task`

### Request Body

```json
{
  "user_id": "123"
}