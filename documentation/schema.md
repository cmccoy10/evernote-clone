# Clevernote Data Schema

## users

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| first_name     | varchar(40)  | not null              |
| last_name      | varchar(40)  | not null              |
| email          | varchar(255) | not null, unique      |
| hashedPassword | varchar      | not null, (binary)    |

## notebooks

| attribute name | data type   | details               |
| -------------- | ----------- | --------------------- |
| id             | integer     | not null, primary key |
| title          | varchar(30) |                       |
| owner_id       | integer     | not null, foreign key |
| is_default     | boolean     | defaults to False     |

## notes

| attribute name | data type   | details               |
| -------------- | ----------- | --------------------- |
| id             | integer     | not null, primary key |
| title          | varchar(30) |                       |
| body           | varchar     |                       |
| user_id        | integer     | foreign key           |
| notebook_id    | integer     | not null, foreign key |
| created_on     | datetime    |                       |
| updated_on     | datetime    |                       |

## note_tags

| attribute name | data type | details               |
| -------------- | --------- | --------------------- |
| id             | integer   | not null, primary key |
| note_id        | integer   | not null, foreign key |
| tag_id         | integer   | not null, foreign key |

## tags

| attribute name | data type   | details               |
| -------------- | ----------- | --------------------- |
| id             | integer     | not null, primary key |
| name           | varchar(30) | not null              |
| user_id        | integer     | foreign key           |
