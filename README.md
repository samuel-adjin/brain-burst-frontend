# 🧠 BrainBurst - React Client

A serverless, cloud-native math challenge game built with React. Test your arithmetic skills across multiple difficulty levels and compete on the leaderboard!

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![AWS](https://img.shields.io/badge/AWS-Cognito%20%7C%20S3%20%7C%20CloudFront-FF9900?logo=amazon-aws)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Project Overview

BrainBurst is the frontend client for a serverless math game where users answer rapid-fire arithmetic questions within a 60-second time limit. The game features multiple operations, difficulty levels, real-time scoring, and multi-level leaderboards.

## ✨ Features

- 🔐 **User Authentication** - Secure sign-up/sign-in with Amazon Cognito
- ⚡ **Dynamic Gameplay** - Choose from 4 operations (addition, subtraction, multiplication, division)
- 🎚️ **Three Difficulty Levels** - Easy, Medium, and Hard challenges
- ⏱️ **60-Second Timer** - Fast-paced gameplay with countdown
- 📊 **Real-Time Scoring** - Track your performance instantly
- 🏆 **Multi-Level Leaderboards** - Compete for top 10 in each difficulty level
- 📧 **Achievement Notifications** - Receive congratulatory emails when you hit top 10
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework:** React 18.x
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Authentication:** AWS Amplify + Amazon Cognito
- **Styling:** CSS Modules / Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Hosting:** Amazon S3 + CloudFront CDN

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v16.x or higher)
- npm 
- AWS account with Cognito configured
- Backend API Gateway URL

## 🚀 Getting Started

### 1. Clone the Repository
### 2. Install Dependencies
- npm install

### 3. ## Environment Configuration

Create a `.env` file in the root directory of the project with the following environment variables:

```env
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/prod
REACT_APP_COGNITO_USER_POOL_ID=your-user-pool-id
REACT_APP_COGNITO_CLIENT_ID=your-client-id
REACT_APP_AWS_REGION=us-east-1

### 4. Run Development Server
- npm start

### 5. Build for Production
- npm run build

```bash

