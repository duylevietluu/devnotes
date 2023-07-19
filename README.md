# DevNotes

DevNotes is a simplistic version of Dev.To, a platform for developers to share their thoughts and insights with the community. This project aims to provide a user-friendly interface for developers to create and publish their own notes on various topics. 

The project is built using the following technologies:

- Frontend: Next.js 13
- Backend: Firebase
- Deployment: Vercel

## Live Demo
See it at this [Vercel deployment](https://devnotes-two.vercel.app/)

## Features

DevNotes currently supports the following features:

- User authentication: Users can create accounts and log in to the platform.
- Create and edit notes: Logged-in users can create new notes and edit their existing notes.
- Markdown support: Users can write their notes using Markdown syntax for formatting.
- Like: Users can like on notes posted by other users.

## SSR and SEO
- The DevNotes project leverages Next.js 13 to harness its powerful Server Side Rendering (SSR) and SEO features.
- SSR pre-renders the web pages on the server, including user-generated notes written in Markdown, resulting in faster initial page load and improved search engine visibility.
- Next.js provides customizable title tags and meta tags, enabling dynamic generation of meaningful information for search engines.
- These SEO elements optimize the project for search engine indexing, enhancing discoverability of user notes.
- By utilizing Next.js 13's SSR and SEO capabilities, DevNotes delivers a superior user experience and showcases advanced technical proficiency and attention to detail.

## Installation

To run the DevNotes project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/your-username/devnotes.git
```
Navigate to the project directory:
```bash
cd devnotes
```
2. Set up Firebase configuration:

- Create a new Firebase project and obtain the Firebase configuration details.
- Create a .env.local file in the project root and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit http://localhost:3000 to view the application.

## Special thanks

This project is made under the instructions of Fireship.io course. Thank you Jeff for this great course of Firebase and NextJS!

## Future features
- Comments: Users can leave a comment on other notes.
- Search functionality: Users can search for notes based on keywords or topics.

