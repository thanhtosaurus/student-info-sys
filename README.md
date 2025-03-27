# Student Information System

A full-stack application for managing student information using React and Express.

## 🚀 Quick Start

### Prerequisites
- Node.js (LTS version recommended)
- npm
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/thanhtosaurus/student-info-sys.git
cd student-info-sys
```

2. Install dependencies
```bash
# Root directory dependencies
npm install

# Client dependencies
cd client
npm install

# Server dependencies
cd ../server
npm install
```

3. Environment Setup
Create a `.env` file in the server directory with the following variables:
```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_service_role_key_here    # Service role key for server-side operations
```

## 🛠️ Development

### Running the Development Server

1. Using npm scripts:
```bash
# From root directory
npm run dev     # Runs both client and server
# OR
npm run client  # Runs only client
npm run server  # Runs only server with nodemon
```

2. Using nodemon directly:
```bash
# From server directory
nodemon index.js

# Or with specific configuration
nodemon --watch server --ext js,json
```

### Development Ports
- Client runs on: http://localhost:3000
- Server runs on: http://localhost:5000

### Nodemon Configuration
Create a `nodemon.json` in your server directory for custom configuration:
```json
{
  "watch": ["server"],
  "ext": "js,json",
  "ignore": ["node_modules/", "client/"],
  "env": {
    "NODE_ENV": "development"
  }
}
```

### Hot Reloading
- Client: Automatically reloads with React's development server
- Server: Automatically restarts when files change (via nodemon)

## 🏗️ Building for Production

Build the application:
```bash
# From root directory
npm run build   # Builds both client and server
```

This will:
- Install all dependencies
- Build the React client
- Prepare the server for production

## 🔄 Continuous Integration

This project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci.yml`.

### CI Pipeline includes:
- Dependency installation
- Code linting
- Unit tests
- Build verification

### CI Workflow Status
[![CI](https://github.com/yourusername/student-info-sys/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/student-info-sys/actions/workflows/ci.yml)

### CI Configuration
```yaml
name: CI

on:
  pull_request:
    branches: [ main, master ]
  push:
    branches: [ main, master ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install Dependencies
      run: |
        npm install
        npm --prefix client install
        npm --prefix server install

    - name: Run Tests
      run: |
        npm --prefix client test -- --watchAll=false
        npm --prefix server test

    - name: Build Client
      run: npm run build --prefix client

    - name: Build Server
      run: npm run build --prefix server
```

## 📁 Project Structure
```
student-info-sys/
├── client/             # React frontend
├── server/             # Express backend
├── .github/
│   └── workflows/      # CI/CD configurations
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Scripts

- `npm run dev` - Start development environment
- `npm run build` - Build for production
- `npm run client` - Run client only
- `npm run server` - Run server only
- `npm test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Pull Request Process
- Ensure all tests pass
- Update documentation if needed
- PR must pass CI checks before merging
- Require code review approval

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details