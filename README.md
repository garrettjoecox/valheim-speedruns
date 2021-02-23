# Valheim Speedrun Leaderboard

## Data model

- User
  - id
  - email
  - password
  - displayName
  - role
- Category
  - id
  - name
  - rules
- Leaderboard
  - id
  - category
- Submission
  - id
  - userId
  - time
  - proofUrl
  - date
  - leaderboardId

## Endpoints

```

- GET /users - list of users
- POST /users - create User
- PUT /users/{userId} - promote/demote/ban
- DELETE /users/{userId} - delete the user
- POST /submissions - create a new submission
- PUT /submissions/{submissionId} - Approve/reject the submission
- GET /categories - list all categories
- GET /categories/{categoryId}/leaderboards
- GET /leaderboards/{leaderboardId}/submissions

```

## Users

- Viewer
  - Will not exist in database
- User
  - Submit runs
- Moderator
  - Approve/Reject submissions
- Admin
  - Can promote/demote

## Views

- Leaderboard
  - Can have top level categories
  - Can have subcategories
- Login/Signup
- Submission screen
- Settings
- Profile
  - List of runs
- List of submissions
  - Ability to approve/reject
- List of users
  - Ability to promote/demote/ban
