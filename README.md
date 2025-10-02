# React Native User Management App

A mobile application built with Expo and React Native that demonstrates user management functionality with Redux state management.

## Features

### ✅ Core Requirements
- **List Users**: Fetches users from JSONPlaceholder API and displays name, email, and company
- **Search**: Client-side search functionality by name or email
- **User Details**: Navigate to detailed user view showing address, phone, and website
- **Add New User**: Form with validation to add users locally (name and email required)

### ✅ Bonus Features
- **Redux State Management**: Complete Redux implementation with Redux Toolkit
- **Update Users**: Edit user information directly from the details screen
- **Delete Users**: Remove users with confirmation dialog
- **Local User Management**: Distinguish between API users and locally added users

## Tech Stack

- **React Native** with Expo
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **JSONPlaceholder API** for initial user data

## Project Structure

```
src/
├── navigation/
│   └── AppNavigator.js          # Navigation setup
├── screens/
│   ├── UserListScreen.js        # Main user list with search
│   ├── UserDetailsScreen.js     # User details with edit functionality
│   └── AddUserScreen.js         # Add new user form
└── store/
    ├── store.js                 # Redux store configuration
    └── userSlice.js             # User state management slice
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd UserManagementApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web browser
```

## Usage

### User List Screen
- View all users fetched from the API
- Search users by name or email using the search bar
- Tap on a user to view details
- Use the "Add New User" button to add local users
- Delete users using the delete button (with confirmation)

### User Details Screen
- View complete user information including address and contact details
- Edit user information using the "Edit User" button
- Save or cancel changes

### Add User Screen
- Fill out the form with user information
- Required fields: Name and Email
- Optional fields: Phone, Website, Company, Address
- Form validation ensures data integrity

## State Management

The app uses Redux Toolkit for state management with the following features:

- **fetchUsers**: Async thunk to fetch users from API
- **addUser**: Add new user to the state
- **updateUser**: Update existing user information
- **deleteUser**: Remove user from the state
- **setSearchQuery**: Manage search functionality

## API Integration

- Fetches initial user data from `https://jsonplaceholder.typicode.com/users`
- All user modifications (add, update, delete) are handled locally
- Local users are marked with a "Local User" badge

## Development Notes

- Built with Expo for easy development and deployment
- Uses React Navigation for smooth navigation between screens
- Implements proper form validation and error handling
- Responsive design with modern UI components
- Redux state is properly normalized and managed

## License

This project is created as part of a React Native internship challenge.
