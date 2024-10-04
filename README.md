# Git-Finder

GitHub Finder is a social platform that leverages GitHub authentication to provide users with a space to share their thoughts, ideas, and insights with the developer community. Users can post updates, interact with others, and explore GitHub profiles of fellow users.

## Features

### 1. GitHub Authentication

- Users can log in securely using their GitHub credentials.
- OAuth integration ensures a seamless and secure authentication process.

### 2. Post Thoughts

- Share your latest discoveries, thoughts, or challenges with the community.
- Post updates in a format similar to popular social media platforms.

### 3. Explore GitHub Profiles

- Search for other GitHub users and explore their profiles.
- View GitHub contribution graphs to understand their coding activity over time.
- Explore repositories and projects associated with each user.

### 4. Connect with Developers

- Follow other GitHub users to stay updated on their activities.
- Like, comment, and engage with posts to foster a vibrant developer community.

Whether you're looking to build your professional network, seek feedback on projects, or simply stay in touch with fellow coders, GitHub Finder creates an engaging space for developers of all levels.

## Env Variables
To obtain the values for the Firebase configuration and GitHub token, you'll need to follow these steps:

### Firebase Configuration:

- **Create a Firebase Project:** If you haven't already, go to the Firebase console (https://console.firebase.google.com/) and create a new Firebase project.
- **Get API Key:** In the Project Settings section, navigate to the General tab. You'll find your API key listed there.
- **Get Auth Domain:** This is also located in the General tab of your Firebase project settings.
- **Get Project ID:** The project ID is displayed at the top of the Firebase console for your project.
- **Get Storage Bucket:** In the General tab, you'll find the storage bucket name listed.
- **Get Messaging Sender ID:** This can be found in the Cloud Messaging tab of your Firebase project settings.
- **Get App ID:** The App ID is located in the General tab of your Firebase project settings.

### GitHub Token:

- **Create a GitHub Personal Access Token:** Go to your GitHub profile, click on Settings, then Developer settings, and finally Personal access tokens.
- **Generate a new token:** Click on Generate new token.
- **Choose scopes:** Select the necessary scopes for your project. For most React applications, you'll likely need the repo scope to access repositories.
- **Create token:** Click on Generate token. You'll be presented with a unique token.
- **Store the token securely:** Copy and store the token in a safe place. Do not share it publicly.


