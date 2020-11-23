# Clevernote Data Schema

users
-----


| attribute name | data type | details |
| - | - | - |
| id | integer | primary key, not null |
| first_name | varchar(40) | not null |
| last_name | varchar(40) | not null |
| email | varchar(40) | not null, unique |
| hashedPassword | varchar | not null, (binary) |

notebooks
--------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| title | varchar(30) | foreign key |
| owner_id | integer | not null, foreign key |

notes
--------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| title | varchar(30) | foreign key |
| body | varchar | |
| notebook_id | integer | not null, foreign key |

note_tags
--------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| note_id | integer | not null, foreign key |
| tag_id | integer | not null, foreign key |

tags
--------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| name | varchar(30) | not null |
