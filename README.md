# 🧠 BrainBurst - React Client

A serverless, cloud-native math challenge game built with React. Test your arithmetic skills across multiple difficulty levels and compete on the global leaderboard!

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![AWS](https://img.shields.io/badge/AWS-Cognito%20%7C%20S3%20%7C%20CloudFront-FF9900?logo=amazon-aws)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?logo=node.js)

## 🎯 Project Overview

BrainBurst is a full-stack serverless application featuring a React frontend that delivers rapid-fire arithmetic challenges. Users compete against a 60-second timer across multiple operations and difficulty levels while tracking their performance on multi-tier leaderboards.

## ✨ Features

- 🔐 **Secure Authentication** - AWS Cognito-powered user registration and login
- ⚡ **Dynamic Gameplay** - Support for 4 arithmetic operations (+, -, ×, ÷)
- 🎚️ **Progressive Difficulty** - Easy, Medium, and Hard challenge levels
- ⏱️ **Time-Attack Mode** - 60-second countdown with real-time scoring
- 🏆 **Competitive Leaderboards** - Top 10 rankings per difficulty level
- 📧 **Achievement System** - Automated congratulatory emails for top performers
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

**Frontend Framework:** React 18.x  
**State Management:** React Hooks (useState, useEffect, useContext)  
**Authentication:** AWS Amplify + Amazon Cognito  
**Styling:** Tailwind CSS  
**API Client:** fetch API 
**Routing:** React Router  
**Hosting:** Amazon S3 + CloudFront CDN  
**Build Tool:** Vite

## 📋 Prerequisites

Ensure you have the following installed and configured:
- **Node.js** (v16.x or higher)
- **npm** package manager
- **AWS Account** with Cognito User Pool configured
- **Backend API** Gateway endpoint URL

## 🚀 Quick Start

### 1. Clone the Repository
git clone https://github.com/samuel-adjin/brain-burst-frontend.git
cd brain-burst-frontend

text

### 2. Install Dependencies
npm install

text

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/prod
REACT_APP_COGNITO_USER_POOL_ID=your-user-pool-id
REACT_APP_COGNITO_CLIENT_ID=your-client-id
REACT_APP_AWS_REGION=us-east-1

**⚠️ Important Security Notes:**
- Replace placeholder values with your actual AWS resource identifiers
- Add `.env` to your `.gitignore` to prevent committing sensitive data
- For production deployments, use your platform's environment variable management

### 4. Start Development Server
npm start

text
The application will open at `http://localhost:3000`

### 5. Build for Production
npm run build

text
Creates an optimized production build in the `build` folder.

text

## 📦 Available Scripts

**Development:** `npm start` - Runs development server  
**Build:** `npm run build` - Creates production build  

## 🌐 Deployment

The application is configured for deployment to AWS S3 and CloudFront. The `build` folder contains static files ready for hosting on any web server or CDN.


