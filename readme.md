# BeBalance

## 1. Introduction

Track your work-life balance and improve the specific areas of your life with AI recommendations.

### 1.1 Useful Links

- Pay attention, that we have certain [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/src/javascript.md), which we should follow during application development.

TODO: Add development deployment link

## 2. Domain

The product helps the users to maintain work-life balance, identify areas for improvements and recommend specific measurable actions.

## 3. Requirements

- [NodeJS](https://nodejs.org/en) (20.x.x);
- [npm](https://www.npmjs.com/) (10.x.x);
- [PostgreSQL](https://www.postgresql.org/) (15.4)

## 4. Database Schema

```mermaid

erDiagram
    users {
        int id PK
        dateTime created_at
        dateTime updated_at
        varchar email
        text password_hash
        text password_salt
    }

    user_details ||--|| users: user_id
    user_details ||--o| files: avatar_file_id
    user_details {
        int id PK
        dateTime created_at
        dateTime updated_at
        varchar name
        int user_id FK
        string notification_frequency
        int avatar_file_id FK
        varchar thread_id
    }

    files {
        int id PK
        varchar file_key UK
        varchar url
        dateTime created_at
        dateTime updated_at
    }

    categories {
        int id PK
        dateTime created_at
        dateTime updated_at
        varchar name UK
    }

    quiz_questions }|--o| categories: category_id
    quiz_questions {
        int id PK
        dateTime created_at
        dateTime updated_at
        text label UK
        int category_id FK
    }

    quiz_answers }|--o| quiz_questions: question_id
    quiz_answers {
        int id PK
        dateTime created_at
        dateTime updated_at
        text label
        int value
        int question_id FK
    }

    quiz_scores }o--|| categories: category_id
    quiz_scores }o--|| users: user_id
    quiz_scores {
        int id PK
        dateTime created_at
        dateTime updated_at
        int score
        int category_id FK
        int user_id FK
    }

    quiz_answers_to_users }o--|| quiz_answers: answer_id
    quiz_answers_to_users }o--|| users: user_id
    quiz_answers_to_users {
        int id PK
        dateTime created_at
        dateTime updated_at
        int user_id FK
        int answer_id FK
    }

    onboarding_questions {
        int id PK
        dateTime created_at
        dateTime updated_at
        text label UK
    }

    onboarding_answers }|--o| onboarding_questions: question_id
    onboarding_answers {
        int id PK
        dateTime created_at
        dateTime updated_at
        text label
        int question_id FK
    }

    onboarding_answers_to_users }o--|| onboarding_answers: answer_id
    onboarding_answers_to_users }o--|| users: user_id
    onboarding_answers_to_users {
        int id PK
        dateTime created_at
        dateTime updated_at
        int answer_id FK
        int user_id FK
    }

    user_task_days }o--|| users: user_id
    user_task_days {
        int id PK
        dateTime created_at
        dateTime updated_at
        int day_of_week
        int user_id FK
    }

    tasks }o--|| users : user_id
    tasks }o--|| categories : category_id
    tasks {
        int id PK
        dateTime created_at
        dateTime updated_at
        int category_id FK
        int user_id FK
        dateTime due_date
        varchar label
        text description
        text status
    }

    chat_messages }o--|| user_details : thread_id
    chat_messages {
        int id PK
        dateTime created_at
        dateTime updated_at
        author text
        is_read boolean
        text text
        text type
        json task
        varchar thread_id FK
    }
```

## 5. Architecture

TODO: add application schema

### 5.1 Global

#### 5.1.1 Technologies

1. [Typescript](https://www.typescriptlang.org/)
2. [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces)

### 5.2 Frontend

#### 5.2.1 Technologies

1. [React](https://react.dev/) — a frontend library
2. [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) — a state manager

#### 5.2.2 Folder Structure

1. assets - static assets (images, global styles)
2. libs - shared libraries and utilities

   2.1 components - plain react components

   2.2 enums

   2.3 helpers

   2.4 hooks

   2.5 modules - separate features or functionalities

   2.6 types

3. modules - separate app features or functionalities
4. pages - app pages

### 5.3 Backend

#### 5.3.1 Technologies

1. [Fastify](https://fastify.dev/) — a backend framework
2. [Knex](https://knexjs.org/) — a query builder
3. [Objection](https://vincit.github.io/objection.js/) — an ORM

#### 5.3.2 Folder Structure

1. db - database data (migrations, seeds)
2. libs - shared libraries and utilities

   2.1 enums

   2.2 exceptions

   2.3 helpers

   2.4 modules - separate features or functionalities

   2.5 types

3. modules - separate app features or functionalities

### 5.4 Mobile

This project is mainly focused on Android platform.

#### 5.4.1 Technologies

React Native — a mobile library
Redux + Redux Toolkit — a state manager

#### 5.4.2 Folder Structure

1. assets - static assets (images)

2. libs - shared libraries and utilities

   2.1 components - plain react components

   2.2 enums

   2.3 helpers

   2.4 hooks

   2.5 packages - separate features or functionalities

   2.6 types

3. navigations - app navigators

4. packages - separate app features or functionalities

5. screens - app screens

6. slices - redux slices

### 5.4 Shared Package

#### 5.4.1 Reason

As we are already using js on both frontend and backend it would be useful to share some contracts and code between them.

#### 5.4.2 Technologies

1. [Zod](https://github.com/colinhacks/zod) — a schema validator

## 6. How to Run

### 6.1 Manually

1. Create and fill all .env files. These files are:

- apps/frontend/.env
- apps/backend/.env

You should use .env.example files as a reference.

1. Install dependencies: `npm install`.

2. Install pre-commit hooks: `npx simple-git-hooks`. This hook is used to verify code style on commit.

3. Run database. You can run it by installing postgres on your computer.

4. Apply migrations: `npm run migrate:dev -w backend`

5. Run backend: `npm run start:dev -w backend`

6. Run frontend: `npm run start:dev -w frontend`

## 7. Development Flow

### 7.1 Pull Request Flow

```
<type>: <ticket-title> <project-prefix>-<issue-number>
```

For the full list of types check [Conventional Commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

Examples:

- `feat: add dashboard screen bb-123`

### 7.2 Branch Flow

```
<issue-number>-<type>-<short-desc>
```

Examples:

- `123-feat-add-dashboard`
- `12-feat-add-user-flow`
- `34-fix-user-flow`

### 7.3 Commit Flow

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) to handle commit messages

```
<type>: <description> <project-prefix>-<issue-number>
```

Examples:

- `feat: add dashboard component bb-45`
- `fix: update dashboard card size bb-212`

## 8. Deployment

CI/CD implemented using [GitHub Actions](https://docs.github.com/en/actions)
