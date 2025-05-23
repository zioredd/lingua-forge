# API Contracts (Detailed)

All endpoints are prefixed with `/api`. All endpoints (except signup/login/oauth) require JWT authentication via `Authorization: Bearer <token>`.

---

## 1. Authentication

### POST `/api/auth/signup`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string"
  }
  ```
- **Response:**
  - `201 Created`
    ```json
    { "token": "jwt", "user": { ... } }
    ```
  - `400 Bad Request` (validation error)
  - `409 Conflict` (email exists)

### POST `/api/auth/login`
- **Description:** User login.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK`
    ```json
    { "token": "jwt", "user": { ... } }
    ```
  - `401 Unauthorized` (invalid credentials)

### POST `/api/auth/oauth`
- **Description:** OAuth login/signup (Google, Apple).
- **Request Body:**
  ```json
  {
    "provider": "google|apple",
    "accessToken": "string"
  }
  ```
- **Response:**
  - `200 OK` / `201 Created`
    ```json
    { "token": "jwt", "user": { ... } }
    ```
  - `400 Bad Request` (invalid token)

---

## 2. User Profile & Progress

### GET `/api/user/profile`
- **Description:** Get current user profile.
- **Response:**
  - `200 OK`
    ```json
    {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "avatarUrl": "string",
      "bio": "string",
      "languages": ["en", "es"],
      "xp": 1234,
      "streak": 7,
      "badges": ["streak_7", "xp_1000"]
    }
    ```
  - `401 Unauthorized`

### PATCH `/api/user/profile`
- **Description:** Update profile info (name, avatar, bio, goals).
- **Request Body:**
  ```json
  {
    "name": "string",
    "avatarUrl": "string",
    "bio": "string",
    "goals": { "dailyXp": 30 }
  }
  ```
- **Response:**
  - `200 OK` (updated profile)
  - `400 Bad Request` (invalid data)

### GET `/api/user/progress`
- **Description:** Get user progress summary and analytics.
- **Response:**
  - `200 OK`
    ```json
    {
      "xp": 1234,
      "streak": 7,
      "lessonsCompleted": 42,
      "accuracy": 0.92,
      "fluencyEstimate": "A2",
      "certificates": ["A1", "A2"]
    }
    ```

---

## 3. Lessons & Learning

### GET `/api/lessons/next`
- **Description:** Get the next lesson for the user (adaptive).
- **Response:**
  - `200 OK`
    ```json
    {
      "lessonId": "uuid",
      "title": "Basics 1",
      "level": 1,
      "exercises": [
        { "id": "uuid", "type": "flashcard", ... },
        { "id": "uuid", "type": "fill_blank", ... }
      ]
    }
    ```
  - `404 Not Found` (no more lessons)

### POST `/api/lessons/submit`
- **Description:** Submit lesson answers and get feedback.
- **Request Body:**
  ```json
  {
    "lessonId": "uuid",
    "answers": [
      { "exerciseId": "uuid", "answer": "string|object" }
    ]
  }
  ```
- **Response:**
  - `200 OK`
    ```json
    {
      "score": 8,
      "maxScore": 10,
      "mistakes": [
        { "exerciseId": "uuid", "correctAnswer": "string", "explanation": "string" }
      ],
      "xpEarned": 15,
      "streak": 8
    }
    ```
  - `400 Bad Request` (invalid submission)

### GET `/api/lessons/:id`
- **Description:** Get lesson details by ID.
- **Response:**
  - `200 OK` (lesson object)
  - `404 Not Found`

### GET `/api/lessons/review`
- **Description:** Get personalized review exercises (spaced repetition).
- **Response:**
  - `200 OK` (list of exercises)

---

## 4. Gamification & Leaderboards

### GET `/api/leaderboard?scope=global|friends&period=week|month`
- **Description:** Get leaderboard rankings.
- **Response:**
  - `200 OK`
    ```json
    [
      { "userId": "uuid", "name": "string", "xp": 1234, "rank": 1 },
      ...
    ]
    ```

### GET `/api/badges`
- **Description:** Get all badges and user’s earned badges.
- **Response:**
  - `200 OK` (list of badges)

---

## 5. Social & Community

### GET `/api/friends`
- **Description:** Get friend list and requests.
- **Response:**
  - `200 OK` (list of friends, pending requests)

### POST `/api/friends/request`
- **Description:** Send a friend request.
- **Request Body:**
  ```json
  { "friendId": "uuid" }
  ```
- **Response:**
  - `200 OK` (request sent)
  - `404 Not Found` (user not found)

### POST `/api/friends/accept`
- **Description:** Accept a friend request.
- **Request Body:**
  ```json
  { "requestId": "uuid" }
  ```
- **Response:**
  - `200 OK` (friend added)
  - `404 Not Found`

### DELETE `/api/friends/:id`
- **Description:** Remove a friend.
- **Response:**
  - `204 No Content`

---

## 6. Speech & Pronunciation

### POST `/api/speech/submit`
- **Description:** Submit audio for pronunciation feedback.
- **Request:**
  - `multipart/form-data` with audio file and exerciseId
- **Response:**
  - `200 OK`
    ```json
    { "score": 0.85, "feedback": "Good pronunciation!" }
    ```
  - `400 Bad Request` (invalid audio)

---

## 7. Notifications

### GET `/api/notifications`
- **Description:** Get user notifications (friend requests, reminders, achievements).
- **Response:**
  - `200 OK` (list of notifications)

---

## 8. Monetization

### GET `/api/shop/items`
- **Description:** List available shop items (avatars, streak freezes, boosts).
- **Response:**
  - `200 OK` (list of items)

### POST `/api/shop/purchase`
- **Description:** Purchase an item with LinguaCoins or real currency.
- **Request Body:**
  ```json
  { "itemId": "uuid", "paymentMethod": "coins|card" }
  ```
- **Response:**
  - `200 OK` (purchase confirmed)
  - `400 Bad Request` (insufficient funds)

---

## Error Handling
- All errors return a JSON object:
  ```json
  { "error": "Error message.", "code": 400 }
  ```
- Standard HTTP status codes are used.

---

## Notes
- All endpoints (unless noted) require JWT authentication.
- Use OpenAPI/Swagger for auto-generated, interactive documentation.
