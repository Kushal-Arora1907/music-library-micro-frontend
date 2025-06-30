Music Library Micro Frontend Application

This project demonstrates a robust micro-frontend architecture for a music library application, split into a main authentication container and a dynamically loaded music library feature. It showcases modern React development, authentication with role management, efficient data manipulation, and seamless integration between independent frontends.
Table of Contents

    Project Overview

    Features

    Demo Credentials

    How to Run Locally

    Architecture Explanation

        Micro Frontend Architecture

        Role-Based Authentication

    Deployment

    Live Demo Links

Project Overview

The primary objective of this project is to illustrate the implementation of a micro-frontend architecture using React and Vite. It separates a core authentication layer (Main App) from a feature-rich Music Library (Micro Frontend), allowing independent development, deployment, and scaling of each part.
Features

    Music Library UI: Displays a list of songs with comprehensive search, filter (by Album, Artist, Title, Genre, Year), sort, and group-by functionalities.

    Interactive Playback: Users can play and pause songs directly from the song cards.

    Dynamic Content: The library is populated with 20 Hindi song entries (using placeholder audio URLs for demonstration).

    Micro Frontend Architecture:

        Main App (Container): Handles user authentication and acts as the shell.

        Music Library (Micro Frontend): A separate, independent application dynamically loaded into the Main App using UMD bundles and script injection.

    Basic Authentication & Role Management: Implements a simple in-memory JWT-based authentication system with two roles: admin and user.

    Role-Based Access Control: UI controls for adding and deleting songs are conditionally displayed based on the logged-in user's role (admin can modify, user can only view/filter).

    Modern React Development: Built using React functional components and Hooks (useState, useEffect, useMemo, useRef, useContext).

    Efficient Data Handling: Leverages JavaScript's built-in array methods (map, filter, reduce) for efficient data manipulation and display.

    Consistent Styling: Utilizes Tailwind CSS and the Roboto font for a clean, modern, and unified user interface across both applications.

    Modal Components: Implements a reusable modal/popup pattern for forms (e.g., "Add Song") and informational displays (e.g., "About" modal).

    Custom Favicon: Replaced default icons with a custom music-themed favicon.

Demo Credentials

You can use the following credentials to test the application:

    Admin User:

        Username: admin

        Password: admin123

        (Admin users can add and delete songs.)

    Regular User:

        Username: user

        Password: user123

        (Regular users can only view and filter songs.)

How to Run Locally

Follow these steps to set up and run the application on your local machine:

Prerequisites:

    Node.js (v18 or higher recommended)

    npm (Node Package Manager) or Yarn/pnpm

Steps:

    Clone the repository:

    # Navigate to your desired parent directory
    # git clone <your-repo-url> music-library-mfe-project
    # cd music-library-mfe-project

    (Assuming your project is structured with main-app and music-library-app folders directly inside music-library-mfe-project)

    Install dependencies for both applications:

        For Main App:

        cd main-app
        npm install  # or yarn install or pnpm install
        cd ..

        For Music Library App:

        cd music-library-app
        npm install  # or yarn install or pnpm install
        cd ..

    Build the Music Library App (Micro Frontend) for Local Preview:
    The Music Library App needs to be built into a production-like UMD bundle that the Main App can consume.

        Navigate to the music-library-app directory:

        cd music-library-app

        Run the build command:

        npm run build

        Keep this terminal open, and start the preview server for the built app:

        npm run preview

        This will typically run on http://localhost:4173/. Keep this server running.

    Start the Main App (Container) Development Server:

        Open a new terminal window.

        Navigate to the main-app directory:

        cd main-app

        Run the development server:

        npm run dev

        This will typically run on http://localhost:5173/.

    Access the Application:

        Open your web browser and go to: http://localhost:5173/

        You can also access the standalone Music Library App directly at http://localhost:4173/ (after the npm run preview command is running).

Architecture Explanation
Micro Frontend Architecture

This project implements a micro-frontend architecture by splitting the application into two independent React applications:

    Main App (Container):

        Responsible for the overall application shell, including the primary header and background.

        Handles user authentication and session management.

        Dynamically loads the Music Library micro frontend when a user is authenticated.

        Dynamic Loading Method: It loads the music-library-app as a UMD (Universal Module Definition) JavaScript bundle (music-library-app.umd.js) via a dynamically injected <script> tag. The music-library-app exposes a global window.renderMusicLibrary function that the Main App calls to mount the micro frontend into a designated DOM element (#music-library-container). Its CSS (music-library-app.css) is also loaded separately via a dynamically injected <link> tag.

    Music Library App (Micro Frontend):

        A self-contained application responsible solely for the music library features (displaying songs, filtering, sorting, grouping, adding, deleting, and playback).

        It has its own build process and can be developed and deployed independently.

        When embedded, it expects the host (Main App) to provide the overall page structure and relies on its own internal styling for its content. When run standalone, it provides its own full page styling including header and background.

This separation allows for:

    Independent Development: Teams can work on each app without affecting the other.

    Independent Deployment: Each app can be deployed and updated separately.

    Technology Agnosticism: While both are React here, different micro frontends could theoretically use different frameworks.

Role-Based Authentication

The application implements a basic in-memory authentication system:

    Mock JWT: A simplified JWT (JSON Web Token) approach is used, where tokens are generated and stored in localStorage without actual backend validation.

    Roles: Two roles are defined:

        admin: Has full privileges, including viewing, filtering, adding, and deleting songs.

        user: Has read-only access, able to view and filter songs, but cannot add or delete.

    Conditional UI: The Add Song button and Delete icons on song cards are conditionally rendered based on the logged-in user's role, demonstrating role-based access control at the UI level.

    Logout: The logout functionality is provided within the Music Library App's header, and the logout function is passed down from the Main App's AuthContext to enable session termination from within the micro frontend.

Deployment

Both the Main App and the Music Library Micro Frontend are deployed as separate static sites. This project uses Netlify (or Vercel) as the hosting platform.

Deployment Steps:

    Build Both Applications Locally:

        Navigate to main-app and run npm run build.

        Navigate to music-library-app and run npm run build.

        Crucially: For both applications, the generated dist folder must be committed to their respective GitHub repositories. This means temporarily commenting out or removing /dist from their .gitignore files before committing and pushing.

            For music-library-app, you also need to manually place the index.html file (provided in the "How to Run Locally" section) into its dist folder after building, as Vite's lib mode doesn't generate it automatically.

    Create Separate GitHub Repositories:

        Create a new GitHub repository for your main-app (e.g., your-username/music-app-container).

        Create a new GitHub repository for your music-library-app (e.g., your-username/music-library-microfrontend-remote).

    Push Code to Respective Repositories:

        Push the main-app code (including its dist folder) to music-app-container.

        Push the music-library-app code (including its dist folder with the custom index.html) to music-library-microfrontend-remote.

    Deploy Music Library App First (Netlify/Vercel):

        Go to Netlify/Vercel and create a new project.

        Connect it to your music-library-microfrontend-remote GitHub repository.

        Build command: npm run build

        Publish directory (or Output directory): dist

        Deploy the site. Once deployed, copy the live URL (e.g., https://your-music-library-name.netlify.app/).

    Update Main App with Live Music Library URL:

        In your local main-app/src/components/AuthenticatedContent.jsx, replace the http://localhost:4173/ URLs for cssLink.href and script.src with the live URL from the previous step (e.g., https://musiclibrarymfe.netlify.app/music-library-app.css and https://musiclibrarymfe.netlify.app/music-library-app.umd.js).

        Save this file.

    Deploy Main App (Netlify/Vercel):

        Commit and push the updated main-app code to its GitHub repository (music-app-container).

        Go to Netlify/Vercel and create another new project.

        Connect it to your music-app-container GitHub repository.

        Build command: npm run build

        Publish directory (or Output directory): dist

        Deploy the site.

Live Demo Links

Once deployed, you can access the live application here:

    Main App (Container): [YOUR_MAIN_APP_LIVE_URL_HERE]

    Music Library (Standalone): [YOUR_MUSIC_LIBRARY_LIVE_URL_HERE] (e.g., https://musiclibrarymfe.netlify.app/)
