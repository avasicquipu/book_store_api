# REACT_NATIVE_TASK

## Task:

1. Create a React Native application for both Android and iOS platforms.
2. The application should serve as a Books app that communicates with the provided backend server to fetch and display book data.

## Non-Functional Requirements

1. The application must provide secure authentication and session management mechanisms to protect user data.
2. User sessions should be securely maintained to prevent unauthorized access and ensure proper logout.
3. The login form should be intuitive and user-friendly, requesting only necessary information such as name, email, and password.
4. The app design should be aesthetically pleasing and not overly simplistic.
5. The application should support offline mode.
6. Dark mode support must be included to enhance user experience in low-light environments.
7. The app should not crash during normal usage scenarios. Errors and exceptions should be properly handled and logged for debugging.
8. The codebase should follow clean architecture and modular design principles to ease updates and bug fixes. Documentation for setup, build, and deployment should be provided
9. The architecture should allow easy integration of new features such as book categories, user roles, or push notifications. Backend communication should be designed to support a growing user base without degradation in performance
10. The application must support localization.

## ✅ Functional Requirements

1. Once the user is logged in, their name should be displayed in the header as a personalized greeting.
2. The application must allow users to search for books based on title or author.
3. Users should be able to open a book and view detailed information about it.
4. Each book can be edited or deleted by the user.
5. Only authenticated users can create, edit, or delete books.
6. Unauthenticated users can view and search for books.
7. The application must allow users to log out at any time.
8. The app must display feedback to users (e.g. loading indicators, error messages, and success notifications).
9. Login form input must include validation (e.g. valid email format, required fields, minimum password length).

## ✅ Design constraints

1. The application must be built using a bare React Native project setup (Expo is not allowed).
2. The app must support localization (e.g. English).
3. The application must contain at least 2 unit tests and 2 end-to-end (E2E) tests.
4. The application must contain custom fonts by your choice.
