# Hackathon Video Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Auth0](https://img.shields.io/badge/Auth0-Enabled-orange)](https://auth0.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Vitest%20%7C%20Cypress-green)](https://vitest.dev/)

A modern, scalable video management application built with Next.js, featuring authentication, video upload, processing, and management capabilities. This application demonstrates clean architecture principles and integrates with Auth0 for secure authentication.

## 🚀 Features

- **🔐 Authentication**: Secure user authentication with Auth0
- **📹 Video Management**: Upload, view, and manage video content
- **🎨 Modern UI**: Responsive design with dark mode support
- **⚡ Real-time Updates**: Live video status updates and processing
- **🔍 Search & Filter**: Advanced filtering and search capabilities
- **📱 Responsive Design**: Works seamlessly across all devices
- **🧪 Comprehensive Testing**: Unit and integration tests
- **🐳 Docker Support**: Containerized deployment ready

## 🏗️ Architecture

This application follows modern web development practices:

- **Frontend**: Next.js 15 with React 19
- **Authentication**: Auth0 Next.js SDK
- **API**: Express.js server with JWT validation
- **Styling**: Reactstrap with Bootstrap components
- **Testing**: Vitest for unit tests, Cypress for E2E tests
- **Deployment**: Docker containerization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker** (optional, for containerized deployment)
- **Auth0 Account** (for authentication)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/FIAP-SOAT-G20/hackathon-video-manager.git
cd hackathon-video-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# A long secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The base url of your application
APP_BASE_URL='http://localhost:3000'
# Your Auth0 tenant domain
AUTH0_DOMAIN='YOUR_AUTH0_DOMAIN.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
# Your Auth0 API's Identifier
AUTH0_AUDIENCE='YOUR_AUTH0_API_IDENTIFIER'
# The permissions your app is asking for
AUTH0_SCOPE='openid profile email read:shows'
# API Server Port
API_PORT=3001
# API Video Service Server
VIDEO_SERVICE_API='https://localhost:8080'
```

**Note**: Generate a secure `AUTH0_SECRET` using:
```bash
openssl rand -hex 32
```

### 4. Auth0 Setup

1. **Create an Auth0 Application**:
   - Go to [Auth0 Dashboard](https://manage.auth0.com)
   - Create a new "Single Page Application"
   - Configure allowed callback URLs: `http://localhost:3000/api/auth/callback`
   - Configure allowed logout URLs: `http://localhost:3000`

2. **Create an API**:
   - Create a new API in Auth0 Dashboard
   - Add a permission named `read:shows`
   - Use the API Identifier in your `AUTH0_AUDIENCE` environment variable

### 5. Run the Application

```bash
# Development mode (runs both Next.js and API server)
npm run dev

# Or run them separately
npm run dev:api  # API server only
npm run dev      # Next.js only
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API Server**: http://localhost:3001

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and API with hot reload
npm run dev:api          # Start API server with nodemon
npm run build            # Build for production
npm start                # Start production build

# Testing
npm run test             # Run unit tests with Vitest
npm run test:watch       # Run tests in watch mode
npm run test:integration # Run integration tests with Cypress
npm run test:integration:watch # Open Cypress test runner

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

### Project Structure

```
hackathon-video-manager/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── videos/            # Video management page
│   ├── profile/           # User profile page
│   └── ...
├── components/            # Reusable React components
├── contexts/              # React contexts (DarkMode, etc.)
├── lib/                   # Utility libraries (Auth0 config)
├── tests/                 # Test files
├── utils/                 # Utility functions
├── api-server.js          # Express API server
├── middleware.js          # Next.js middleware
└── ...
```

### Key Components

- **Video Management**: Upload, view, and manage video content
- **Authentication**: Secure login/logout with Auth0
- **Dark Mode**: Theme switching with context
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error states and loading indicators

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Tests

```bash
# Run Cypress E2E tests
npm run test:integration

# Open Cypress test runner
npm run test:integration:watch
```

### Test Structure

- **Unit Tests**: Component and utility function testing with Vitest
- **Integration Tests**: End-to-end testing with Cypress
- **API Tests**: Express server endpoint testing

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t hackathon-video-manager .

# Run the container
docker run -p 3000:3000 -p 3001:3001 \
  -e APP_BASE_URL=http://localhost:3000 \
  -e AUTH0_SECRET=your_secret \
  -e AUTH0_DOMAIN=your_domain \
  -e AUTH0_CLIENT_ID=your_client_id \
  -e AUTH0_CLIENT_SECRET=your_client_secret \
  -e AUTH0_AUDIENCE=your_audience \
  -e VIDEO_SERVICE_API=your_video_service_api \
  hackathon-video-manager
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "3001:3001"
    environment:
      - APP_BASE_URL=http://localhost:3000
      - AUTH0_SECRET=${AUTH0_SECRET}
      - AUTH0_DOMAIN=${AUTH0_DOMAIN}
      - AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
      - AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
      - AUTH0_AUDIENCE=${AUTH0_AUDIENCE}
      - NODE_ENV=production
      - VIDEO_SERVICE_API=${VIDEO_SERVICE_API}
```

Run with:
```bash
docker-compose up -d
```

## 🚀 Production Deployment

### Environment Variables

Ensure all required environment variables are set in production:

```bash
NODE_ENV=production
AUTH0_SECRET=your_production_secret
AUTH0_DOMAIN=your_production_domain
AUTH0_CLIENT_ID=your_production_client_id
AUTH0_CLIENT_SECRET=your_production_client_secret
AUTH0_AUDIENCE=your_production_audience
APP_BASE_URL=https://your-domain.com
API_PORT=3001
VIDEO_SERVICE_API=your_video_service_api
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Health Checks

The application provides health endpoints:

- **Frontend Health**: `GET /` (Next.js health check)
- **API Health**: `GET /api/health` (Express server health check)

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Video Management Endpoints

- `GET /api/videos` - List all videos
- `POST /api/videos` - Upload new video
- `GET /api/videos/:id` - Get video details
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video
- `GET /api/videos/:id/processed` - Get processed video status

### User Management Endpoints

- `GET /api/user` - Get current user profile
- `GET /api/user/:id` - Get user by ID

## 🔧 Configuration

### Auth0 Configuration

The application uses Auth0 for authentication. Key configuration points:

1. **Application Type**: Single Page Application (SPA)
2. **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
3. **Allowed Logout URLs**: `http://localhost:3000`
4. **Allowed Web Origins**: `http://localhost:3000`

### Middleware Configuration

The `middleware.js` file handles:
- Authentication route protection
- Session management
- Redirect logic for unauthenticated users

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with tests
4. **Run quality checks**: `npm run test && npm run lint`
5. **Commit your changes**: Use conventional commit format
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Create a Pull Request**

### Code Standards

- **React**: Follow React best practices and hooks patterns
- **Next.js**: Use App Router conventions
- **Testing**: Maintain >80% test coverage
- **Documentation**: Update documentation for new features
- **Conventional Commits**: Use conventional commit format

### Pull Request Checklist

- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation updated
- [ ] Integration tests included for new features
- [ ] Environment variables documented

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Auth0 Configuration Errors**
   - Verify all environment variables are set correctly
   - Check Auth0 dashboard for correct callback URLs
   - Ensure API permissions are configured

2. **Port Conflicts**
   - Default ports: 3000 (Next.js), 3001 (API)
   - Change ports in `.env.local` if needed

3. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

4. **Docker Issues**
   - Ensure Docker is running
   - Check port availability
   - Verify environment variables in container

### Getting Help

- Check the [Issues](https://github.com/FIAP-SOAT-G20/hackathon-video-manager/issues) page
- Review [Auth0 Next.js SDK Documentation](https://auth0.com/docs/quickstart/webapp/nextjs)
- Consult [Next.js Documentation](https://nextjs.org/docs)

## 📚 References

### Technologies Used

- [Next.js 15](https://nextjs.org/docs) - React framework
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0) - Authentication
- [Reactstrap](https://reactstrap.github.io/) - Bootstrap components
- [Vitest](https://vitest.dev/) - Testing framework
- [Cypress](https://www.cypress.io/) - E2E testing
- [Express.js](https://expressjs.com/) - API server

### Architecture References

- [Next.js App Router](https://nextjs.org/docs/app)
- [Auth0 Integration Patterns](https://auth0.com/docs/architecture-scenarios)
- [React Testing Best Practices](https://testing-library.com/docs/react-testing-library/intro/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

