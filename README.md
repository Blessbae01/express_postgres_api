# express_postgres_api
A simple Express.js REST API connected to a PostgreSQL database. Supports full CRUD operations for managing user data.

# Express.js + PostgreSQL CRUD API

A simple REST API using Express.js and PostgreSQL for basic CRUD operations on users.

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL
- VS Code (with Thunder Client or Postman)

### Database Setup
1. Open SQL Shell (psql)
2. Run:
   ```sql
   CREATE DATABASE userdb;
   \c userdb
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100),
     age INTEGER
   );
