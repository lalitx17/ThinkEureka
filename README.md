# ThinkEureka

ThinkEureka is a platform designed to make abstract concepts simple and engaging through interactive animations. It leverages modern web technologies to create intuitive, playful, and educational experiences.

## Features

- **Interactive Animations**: Explore complex topics through interactive, story-driven animations.
- **Dynamic Content Generation**: Automatically generate animations based on user input using AI-powered APIs.
- **Customizable Levels**: Tailor animations for different expertise levels (Beginner, Intermediate, Advanced).
- **Modern UI/UX**: Built with Next.js, Tailwind CSS, and React for a seamless user experience.

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- Azure Services (sqlserver, AzureAI Foundry)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lalitx17/ThinkEureka.git
   cd thinkEureka
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create and configure your `.env` file:

   ```bash
   cp .env.example .env
   ```

   Update your `.env` file with your database connection string and other required environment variables.

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:3000`

## Project Structure

### Key Directories

- **`app/`**: Contains the main application logic, including pages, layouts, and API routes.
- **`components/`**: Reusable UI components.
- **`lib/`**: Utility functions and shared logic.
- **`prisma/`**: Database schema and migrations.
- **`styles/`**: Global and component-specific styles.

## Technologies Used

- **Next.js** – Framework for server-rendered React applications.
- **Prisma** – Type-safe ORM for database management.
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- **React** – Front-end library for building user interfaces.
- **NextAuth** – Authentication for Next.js applications.
- **AzureAIFoundry** – AI/ML integration.

## License

This project is licensed under the MIT License.
