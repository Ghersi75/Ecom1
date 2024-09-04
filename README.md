# Project File Structure
# Table of Contents
- [Database Schema](#database)

## Frontend

## Backend

## Database

This project is an attempt at building an online ordering website with a dynamic online menu. The most important part of the database is how the menu is structured. Below is a breakdown of how I split it up into different tables.

Each section ahead represents a table in the database. The **primary source of truth** for the database schema is located in `backend/db/initdb/starterData.sql`. This same file is used with Docker Compose to start up a new instance of the database with test data for development and testing.

To avoid repetition, certain fields are used across multiple tables. These fields all serve the same purpose unless otherwise specified, and they are listed below.

---

### Repeating Fields

#### **`*_id`**
Any field with `_id` is a unique identifier for a specific table. For example, `section_id` uniquely identifies entries in the `sections` table. These identifiers may be referenced in other tables but serve the same purpose across the schema.

- **Type**: INT, NOT NULL, AUTO INCREMENT.
- **Example**: `1`, `2`, `3`, etc.

#### **`name`**
This field is a developer-friendly identifier for any item in a table. It may contain classifying data.

- **Example**: `sections`, `pizza_specialty_buffalo_chicken`

#### **`display_text`**
A user-friendly representation of any item in a table.

- **Example**: `Sections`, `Buffalo Chicken Pizza`

#### **`display_order`**
This field is used to determine the order in which items appear, sorted in ascending order.

- **Example**: `0`, `1`, `2`, etc.

#### **`is_active`**
Indicates whether an item is currently active and should be displayed on the menu. If an item is not active, it will not be shown to users.

- **Example**: `True` or `False`

#### **`is_available`**
Indicates whether an item is available for ordering. If an item is unavailable, it will still be shown to users, but marked as temporarily out of stock.

- **Example**: `True` or `False`

---

With the repeating fields out of the way, below is the schema for each table and its purpose.

### **`sections` Table**

```sql
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| section_id    | int          | NO   | PRI | NULL    | auto_increment |
| name          | varchar(100) | NO   |     | NULL    |                |
| display_text  | varchar(100) | NO   |     | NULL    |                |
| display_order | int          | NO   |     | NULL    |                |
| is_active     | tinyint(1)   | NO   |     | NULL    |                |
| is_available  | tinyint(1)   | NO   |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
