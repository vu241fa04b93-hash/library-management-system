# 📚 Library Management System

A web-based **Library Management System** developed to manage books, users, issuing, returning, search, filtering, and CRUD operations efficiently.

## 🚀 Project Overview

The Library Management System is a frontend-based web application that provides a simple digital solution for managing library records.

The system allows a librarian to:

- Add, view, edit and delete books
- Add, view, edit and delete users
- Search books and users
- Filter books by category and availability
- Issue books to users
- Return issued books
- Automatically update available stock
- Validate user input and handle API errors

## 🎯 Objectives

- Digitize library book and user records
- Reduce manual record-keeping
- Make searching and filtering faster
- Maintain accurate book availability
- Simplify book issuing and returning
- Demonstrate CRUD and REST API concepts

## ✨ Features

### 📖 Book Management
- Add new books
- View book details
- Edit existing books
- Delete books
- Search books by title or author
- Filter books by category
- Filter books by availability

### 👤 User Management
- Add users
- View users
- Edit users
- Delete users
- Search users by name, email or ID

### 📤 Issue Book
- Select a book and user
- Check available stock
- Prevent issuing when stock is zero
- Create an issued-book record
- Decrease available stock automatically

### 📥 Return Book
- Select an issued book
- Remove the issued-book record
- Increase available stock automatically

### ✅ Validation & Error Handling
- Validate book details
- Validate user details
- Validate stock values
- Validate email and phone number
- Handle API/server errors using try-catch

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML | Webpage structure |
| CSS | Styling and layout |
| JavaScript | Application logic and DOM manipulation |
| Axios | HTTP/API communication |
| JSON Server | REST API |
| db.json | Data storage |
| Visual Studio Code | Development environment |
| Git & GitHub | Version control |

## 🏗️ Project Architecture

```text
User
  ↓
HTML Views
  ↓
JavaScript Logic
  ↓
Service Layer
  ↓
Axios
  ↓
JSON Server REST API
  ↓
db.json
  ↓
Response
  ↓
JavaScript / DOM
  ↓
Updated UI
