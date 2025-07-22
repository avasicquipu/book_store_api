# 📱 React Native Books App – Specification

## ✅ Functional Requirements

- The application must allow users to sign in using their name, email, and password.

- After a successful login, the application must display the user's name in the header as a personalized greeting.

- Users must be able to search for books by title or author.

- Each book must have a dedicated page showing detailed information.

- Authenticated users must be able to add, edit, and delete books.

- Unauthenticated users must only be able to view and search for books.

- Users must be able to log out at any time.

- The application must display appropriate user feedback: loading indicators, error messages, and success notifications.

- The login form must include input validation (e.g., valid email format, required fields, minimum password length).

## ❌ Non-Functional Requirements

- The application must use secure mechanisms for authentication and session management (auth and refresh token).

- User sessions must be protected from unauthorized access and allow for secure logout.

- The login form must be intuitive and easy to use.

- The UI design must be aesthetically pleasing (not too complicated) and should include at least one smooth animation

- The application must support offline mode.

- Dark mode support is required.

- The application must not crash during normal use; all errors must be properly handled and logged for debugging purposes.

- The codebase must follow modular design principles to facilitate easier maintenance and future enhancements.

- The application architecture must allow for easy integration of new features (e.g., book categories, user roles, push notifications) and must be scalable as the user base grows, without performance degradation.

- The application must support localization (multiple languages).

- The project must include clear and concise documentation for setup processes.

## 🎨 Design Constraints

- The application must be developed using a bare React Native setup (Expo is not allowed).

- Localization support must be implemented (e.g., English language).

- The application must include at least 2 unit tests and 2 end-to-end (E2E) tests.

- Custom fonts of the developer's choice must be used in the application.

- The use of UI libraries such as NativeWind (or similar utility-first/component libraries) is not allowed; all UI components must be implemented manually using React Native core and stylesheets.

## 🕒 Estimates

- 5 days
