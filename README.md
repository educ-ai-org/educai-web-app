# Educ.ai Web Application

A modern, AI-powered educational platform designed to revolutionize language teaching in Brazil. Educ.ai combines artificial intelligence with human connection to create an engaging learning experience for students and teachers.

## 📋 Project Overview

Educ.ai is a comprehensive web application that empowers language teachers to create interactive classroom environments, generate AI-assisted educational content, and provide real-time feedback to students. The platform leverages artificial intelligence to automate exercise creation, enable intelligent chatbot interactions, and deliver personalized learning experiences.

**Target Audience**: Language teachers and students in Brazil seeking innovative, technology-enhanced learning solutions.

**Core Problem Solved**: Reduces time spent on manual exercise creation while increasing student engagement through AI-powered tools and real-time feedback mechanisms.

## ✨ Features

### Core Functionalities
- **Classroom Management**: Create, edit, and delete virtual classrooms with course organization
- **User Authentication**: Secure login system with JWT token-based authentication and automatic token refresh
- **Role-Based Access Control**: Separate interfaces and permissions for teachers and students
- **Multi-language Support**: Full internationalization (i18n) with English and Portuguese translations

### Educational Features
- **AI-Powered Exercise Generation**: Automatically create questions based on:
  - YouTube video links
  - Audio recordings (with transcription)
  - Document uploads
  - Custom instructions and themes
  - Difficulty levels and question quantity control
- **Classwork Management**: Create, assign, and track student assignments
- **Real-time Feedback**: Instant AI-generated feedback on student submissions
- **Answer Review System**: Teachers can review and evaluate student answers
- **Progress Tracking**: Leaderboard system to gamify learning and track student performance

### AI Chatbot (Edu)
- **Interactive Learning Assistant**: Students can chat with "Edu", an AI assistant for learning support
- **Voice Interaction**: Audio recording and transcription for voice-based queries
- **Context-Aware Responses**: Powered by OpenAI integration

### Content Management
- **Educational Posts**: Share materials, announcements, and resources with the classroom
- **File Management**: Upload and download educational materials
- **Material Generation**: AI-powered educational resource creation from various input sources

### Student Engagement
- **Dictionary Integration**: Built-in dictionary for word definitions and language learning
- **Participant Management**: Add students and teachers to classrooms via email invitations
- **Activity Tracking**: Monitor assignment completion status across all students

### Admin Features
- **User Management**: Remove participants from classrooms
- **Classroom Analytics**: View student engagement through leaderboards
- **Bulk Operations**: Manage multiple classrooms and assignments efficiently

## 🛠 Technology Stack

### Frontend Core
- **React 18.2.0**: Modern UI library with hooks and functional components
- **TypeScript 5.2.2**: Type-safe development with static type checking
- **Vite 5.1.4**: Lightning-fast build tool and development server

### UI Framework & Styling
- **Material-UI (MUI) 5.16.8**: Comprehensive component library
  - `@mui/material`: Core components
  - `@mui/icons-material`: Icon library
  - `@mui/lab`: Experimental components
  - `@mui/x-date-pickers`: Date/time pickers
- **TailwindCSS 3.4.1**: Utility-first CSS framework
- **DaisyUI 4.9.0**: TailwindCSS component library
- **Framer Motion 11.12.0**: Animation library for smooth transitions

### Routing & Navigation
- **React Router DOM 6.23.0**: Client-side routing and navigation

### State Management & Data Fetching
- **Axios 1.6.8**: HTTP client for API communication
- **React Async Hook 4.0.0**: Async state management

### Internationalization
- **i18next 23.16.2**: Internationalization framework
- **react-i18next 15.1.0**: React bindings for i18next
- **i18next-http-backend 2.6.2**: Backend plugin for loading translations
- **i18next-browser-languagedetector 8.0.0**: Language detection plugin

### Additional Libraries
- **jwt-decode 4.0.0**: JWT token parsing
- **dayjs 1.11.11**: Date manipulation library
- **react-toastify 10.0.5**: Toast notifications
- **Swiper 11.1.0**: Touch-enabled slider component
- **React Icons 5.0.1**: Icon library
- **UUID 9.0.1**: Unique identifier generation

### Development Tools
- **ESLint 8.56.0**: Code linting with TypeScript support
- **Ladle 4.0.2**: Component development environment (alternative to Storybook)
- **PostCSS 8.4.35**: CSS transformation tool
- **Autoprefixer 10.4.18**: CSS vendor prefixing

### Deployment
- **Nginx**: Web server for production deployment
- **Docker**: Containerization (deployment target)
- **Azure VM**: Cloud hosting platform

## 🏗 Architecture

### High-Level System Design
```
┌─────────────────┐
│  Landing Page   │ (Public)
└────────┬────────┘
         │
    ┌────▼────┐
    │  Login  │
    └────┬────┘
         │
    ┌────▼──────────────────────────────┐
    │   Authenticated Application       │
    │  (Protected by AuthProvider)      │
    │                                   │
    │  ┌──────────┬──────────┬────────┐│
    │  │   Home   │  Turma   │  Edu   ││
    │  │(Classes) │(Classroom)│(Chat)  ││
    │  └──────────┴──────────┴────────┘│
    │  ┌──────────────────────────────┐│
    │  │    Classwork Management      ││
    │  │  (Create/View Activities)    ││
    │  └──────────────────────────────┘│
    └───────────────────────────────────┘
```

### Directory Structure
```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Reusable UI components
│   ├── Button/
│   ├── Modal/
│   ├── TopBar/
│   ├── Leaderboard/
│   ├── ClassWorksList/
│   └── ...
├── contexts/            # React Context providers
│   └── AuthContext.tsx  # Authentication state management
├── lib/                 # Core utilities and configurations
│   ├── client/          # API client implementation
│   │   ├── client.ts    # Main API client class
│   │   ├── useClient.ts # Client hook for API requests
│   │   └── useAIClient.ts # AI-specific client hook
│   ├── types/           # TypeScript type definitions
│   ├── theme.ts         # MUI theme configuration
│   └── useAudioRecorder.ts
├── pages/               # Page-level components
│   ├── Atividades/      # Activity management pages
│   ├── Home.tsx         # User dashboard
│   ├── LandingPage.tsx  # Public landing page
│   ├── Login.tsx        # Authentication page
│   ├── Turma.tsx        # Classroom detail view
│   ├── TalkWithEdu.tsx  # AI chatbot interface
│   └── ...
├── providers/           # Context providers
│   └── AuthProvider.tsx # Authentication provider wrapper
├── utils/               # Helper functions
│   └── formatDate.ts
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── i18n.ts              # Internationalization configuration

public/
└── locales/            # Translation files
    ├── en/             # English translations
    └── pt/             # Portuguese translations
```

### Key Modules and Responsibilities

#### API Client (`src/lib/client/client.ts`)
- **Purpose**: Centralized HTTP client for all backend communication
- **Features**: 
  - Automatic token refresh on expiration
  - Request/response interceptors
  - Dual API support (main API and AI API)
- **Endpoints**: User auth, classrooms, posts, classwork, AI generation, transcription, dictionary, leaderboard, participants

#### Authentication Context (`src/contexts/AuthContext.tsx`)
- **Purpose**: Global authentication state management
- **Data**: User ID, role, username, profile picture, JWT token
- **Methods**: Token update, student/teacher mode switching

#### Routing (`src/main.tsx`)
- **Public Routes**: `/` (landing page), `/login`
- **Protected Routes**: All other routes wrapped in `<AuthProvider>`
- **Route Structure**: Dynamic routes for classrooms (`/turma/:id`)

### Data Flow

1. **Authentication Flow**:
   ```
   Login → JWT Token → AuthContext → Protected Routes → API Requests (with token)
   ```

2. **AI Content Generation Flow**:
   ```
   User Input (text/audio/video/document) → AI API → Generated Content → Display/Save
   ```

3. **Classwork Submission Flow**:
   ```
   Student Answers → API → Teacher Review → Feedback → Student Notification
   ```

4. **Real-time Chat Flow**:
   ```
   User Message → OpenAI API → AI Response → Display in Chat
   ```

## 📦 Prerequisites

### System Requirements
- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux

### Required Software
- Git for version control
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE (VS Code recommended)

### Access Requirements
- Backend API URL (provided via environment variables)
- AI API URL (provided via environment variables)
- OpenAI API key (for Edu chatbot functionality)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/educ-ai-org/educai-web-app.git
cd educai-web-app
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Environment Configuration
Create environment variable files for different environments:

**For Development** (create `.env.development`):
```env
VITE_API_URL=http://localhost:3000/api
VITE_API_URL_IA=http://localhost:3001/api
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**For Production** (use environment variables in deployment):
- `VITE_API_URL`: Production backend API URL
- `VITE_API_URL_IA`: Production AI API URL
- `VITE_OPENAI_API_KEY`: OpenAI API key

### 4. Verify Installation
```bash
npm run dev
```

The application should start on `http://localhost:5173` (default Vite port).

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Main backend API base URL | Yes | `https://api.educai.com` |
| `VITE_API_URL_IA` | AI services API base URL | Yes | `https://ai-api.educai.com` |
| `VITE_OPENAI_API_KEY` | OpenAI API key for chat functionality | Yes | `sk-...` |

### Configuration Files

#### `vite.config.ts`
- Vite build configuration
- React plugin setup
- Default configuration suitable for most use cases

#### `tailwind.config.js`
- TailwindCSS customization
- Custom colors: `dark` (#0A0A0A), `gradientPurple` (#A578F9)
- Custom fonts: Montserrat, Manrope
- DaisyUI plugin integration

#### `tsconfig.json`
- TypeScript compiler options
- Path aliases and module resolution
- Strict type checking enabled

#### `nginx.conf`
- Production web server configuration
- SPA routing support (all routes redirect to index.html)
- Static asset caching
- Port 80 configuration

## 💻 Usage

### Development Mode
```bash
npm run dev
```
- Starts Vite development server
- Hot module replacement (HMR) enabled
- Accessible at `http://localhost:5173`

### Building for Production
```bash
npm run build
```
- Compiles TypeScript
- Bundles application with Vite
- Output directory: `dist/`

### Preview Production Build
```bash
npm run preview
```
- Serves production build locally
- Useful for testing before deployment

### Code Linting
```bash
npm run lint
```
- Runs ESLint on TypeScript/TSX files
- Reports unused disable directives

### Auto-fix Lint Issues
```bash
npm run fix-lint
```
- Automatically fixes linting issues where possible

### Component Development
```bash
npm run stories
```
- Starts Ladle component development environment
- Browse and develop components in isolation
- Accessible at default Ladle port

## 📱 Key User Workflows

### For Teachers

1. **Creating a Classroom**:
   - Navigate to Home
   - Click "Create Classroom"
   - Enter title and course information
   - Invite students via email

2. **Generating AI Exercises**:
   - Open classroom
   - Go to "Create Activity"
   - Choose input method (YouTube link, audio, document, or text)
   - Set difficulty level and question count
   - Generate and review questions
   - Assign to classroom

3. **Reviewing Student Work**:
   - Navigate to "View Activities"
   - Select assignment
   - Review student submissions
   - Provide feedback

### For Students

1. **Joining a Classroom**:
   - Receive email invitation
   - Login to platform
   - Access classroom from dashboard

2. **Completing Assignments**:
   - View assigned classwork
   - Answer questions
   - Submit for review

3. **Using Edu (AI Assistant)**:
   - Navigate to "Talk with Edu"
   - Type or record voice message
   - Receive AI-generated responses

## 🔧 Development

### Project Structure Best Practices
- Components should be self-contained in their own directories
- Each component directory may include: component file, styles, stories, and tests
- Use TypeScript interfaces from `src/lib/types/` for type safety
- Follow existing naming conventions (PascalCase for components)

### State Management
- Use React Context for global state (authentication)
- Use local state (useState, useReducer) for component-specific state
- Use custom hooks for reusable logic (e.g., `useClient`, `useAIClient`)

### API Integration
- All API calls go through the `Client` class
- Use `useClient()` hook to access authenticated API client
- Use `useAIClient()` hook for AI-specific endpoints
- Token refresh is handled automatically by interceptors

### Styling Guidelines
- Prefer TailwindCSS utility classes for styling
- Use MUI components for complex UI patterns
- Custom theme values defined in `tailwind.config.js` and `src/lib/theme.ts`
- Maintain consistent spacing and color schemes

### Adding New Routes
1. Define route in `src/main.tsx`
2. Wrap in `<AuthProvider>` if authentication required
3. Create page component in `src/pages/`
4. Add navigation links where appropriate

### Internationalization
- Add new translation keys to JSON files in `public/locales/{lang}/`
- Use `useTranslation()` hook in components
- Translation namespaces: home, login, turma, landingPage, talkWithEdu, material, criarAtividade, dictionary, profile, activity

## 🚢 Deployment

### CI/CD Pipeline
The project uses GitHub Actions for continuous integration and deployment:

**Workflow File**: `.github/workflows/main.yml`

**CI Stage**:
1. Checkout repository
2. Setup Node.js 18.x
3. Install dependencies (`npm ci`)
4. Lint code (`npm run lint`)
5. Build application (`npm run build`)
6. Upload build artifacts
7. Bump version and create git tag

**CD Stage**:
1. Download build artifacts
2. Deploy to Azure VM via SCP
3. Run Docker container with updated code

### Manual Deployment

#### Docker Deployment
The project is designed to run in a Docker container using nginx. While a Dockerfile is not included in the repository, the deployment follows this pattern:

```bash
# 1. Build the application
npm run build

# 2. Create a Dockerfile (example):
# FROM nginx:alpine
# COPY dist/ /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

# 3. Build and run Docker image
docker build -t educai-web-app .
docker run -d -p 80:80 educai-web-app
```

The provided `nginx.conf` file should be used for nginx configuration in the container.

#### Static Hosting
The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps
- GitHub Pages

### Environment-Specific Configuration

**Development**:
- Uses local API endpoints
- Debug mode enabled
- Source maps included

**Production**:
- Uses production API endpoints
- Optimized build
- Minified assets
- No source maps

### Health Checks
- Verify API connectivity: Check browser console for API errors
- Verify authentication: Test login flow
- Verify AI features: Test exercise generation and Edu chat

## 🐛 Troubleshooting

### Common Issues

#### Issue: "eslint: not found" when running `npm run lint`
**Solution**: Ensure dependencies are installed:
```bash
npm install
```

#### Issue: API requests failing with CORS errors
**Solution**: 
- Verify API URLs in environment variables
- Check that backend CORS settings allow the frontend origin
- Ensure `withCredentials: true` is set for authenticated requests

#### Issue: "Token has expired" errors
**Solution**: 
- Token refresh is automatic via interceptors
- If persistent, clear cookies and re-login
- Check that refresh token endpoint is accessible

#### Issue: Build fails with TypeScript errors
**Solution**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix type errors in reported files
```

#### Issue: Translations not loading
**Solution**:
- Verify translation files exist in `public/locales/{lang}/{namespace}.json`
- Check browser console for 404 errors on translation files
- Ensure i18n configuration in `src/i18n.ts` matches file structure

#### Issue: AI features not working
**Solution**:
- Verify `VITE_API_URL_IA` environment variable is set
- Check that OpenAI API key is valid
- Review browser console and network tab for API errors

### Debug Mode
To enable verbose logging:
1. Open browser DevTools (F12)
2. Check Console tab for error messages
3. Check Network tab for failed API requests
4. i18n debug is enabled by default (`debug: true` in i18n.ts)

### Log Locations
- **Browser Console**: Client-side errors and API responses
- **Network Tab**: HTTP request/response details
- **Server Logs**: Backend API logs (not accessible from frontend)

### Getting Help
- Check existing issues on GitHub repository
- Review API documentation for backend services
- Contact development team for access issues

## 📚 API Reference

The application communicates with two backend services:

### Main API (`VITE_API_URL`)

#### Authentication
- `POST /user/auth` - Login with credentials
- `POST /user/refreshToken` - Refresh JWT token
- `POST /user/logoff` - Logout user

#### Classrooms
- `GET /user/classrooms` - Get user's classrooms
- `POST /classroom` - Create new classroom
- `GET /classroom/:id` - Get classroom details
- `PATCH /classroom/:id` - Update classroom
- `DELETE /classroom/:id` - Delete classroom
- `GET /classroom/:id/leaderboard` - Get classroom leaderboard
- `POST /classroom/:id/invite` - Invite participant
- `DELETE /classroom/:id/user/:userId` - Remove participant

#### Posts
- `POST /posts` - Create post with file upload
- `GET /posts/:id/download` - Download post file
- `DELETE /posts/:id` - Delete post
- `PATCH /posts/:id` - Update post
- `GET /classroom/:id/posts` - Get classroom posts

#### Classwork
- `POST /classwork` - Create classwork
- `GET /classwork/:id` - Get classwork details
- `GET /classroom/:id/classworks` - Get teacher's classworks
- `GET /classroom/:id/student-classworks` - Get student's classworks
- `POST /classwork/answer` - Submit answers
- `GET /classwork/:id/answer` - Get user answers
- `GET /classwork/:id/answer/:studentId` - Get student answers
- `GET /classwork/:id/answers/status` - Get submission status

### AI API (`VITE_API_URL_IA`)

#### Content Generation
- `POST /generate-educational-resource` - Generate educational material
- `POST /generate-questions` - Generate quiz questions
- `POST /transcription` - Transcribe audio to text
- `POST /upload` - Upload files

#### AI Chat
- `POST /edu-response` - Get AI chatbot response
- `POST /feedback` - Generate feedback document

#### Dictionary
- `GET /dictionary/:word/definition` - Get word definition

### Request/Response Examples

#### Login
```typescript
// Request
POST /user/auth
{
  "email": "teacher@example.com",
  "password": "securePassword123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Create Classroom
```typescript
// Request
POST /classroom
{
  "title": "English 101",
  "course": "Beginner English"
}

// Response
{
  "id": "classroom-id",
  "title": "English 101",
  "course": "Beginner English"
}
```

#### Generate Questions
```typescript
// Request (FormData)
POST /generate-questions
{
  "instructions": "Create grammar questions",
  "difficulty": "medium",
  "theme": "Present Perfect",
  "numberOfQuestions": "5"
}

// Response
[
  {
    "id": "q1",
    "question": "Which sentence uses present perfect correctly?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "B"
  }
]
```

### Authentication
All authenticated requests must include JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

The client automatically handles token refresh when tokens expire.

## 📄 License

This project is licensed under the **MIT License**.

Copyright (c) 2024 educ.ai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 👥 Contributors

### Development Team

- **Gustavo** - AI Engineer
- **Julia** - Designer and Front-End Developer
- **Luiza** - Back-End Developer
- **Vitor** - DevOps Engineer
- **Diego** - Back-End Developer
- **Erick** - Front-End Developer

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [Material-UI](https://mui.com/)
- Powered by [Vite](https://vitejs.dev/) for blazing fast development
- AI capabilities provided by [OpenAI](https://openai.com/)
- Internationalization by [i18next](https://www.i18next.com/)

---

**Mission Statement**: Our mission is to innovate language teaching in Brazil, believing that AI and human connection is the key to effective education.

For questions, issues, or contributions, please visit our [GitHub repository](https://github.com/educ-ai-org/educai-web-app).
