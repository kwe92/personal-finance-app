# Clarifi - Advanced Personal Finance Dashboard

![Clarifi Preview](./preview.jpg) <!-- Update with your actual project screenshot -->

[![Frontend Mentor Challenge](https://img.shields.io/badge/Frontend%20Mentor-Premium%20Challenge-brightgreen)](https://www.frontendmentor.io)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](#)
[![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white)](#)
[![Plaid](https://img.shields.io/badge/Plaid-111111?style=flat&logo=plaid&logoColor=white)](#)

## Welcome to Clarifi 👋

**Clarifi** is a production-ready, full-stack personal finance application designed to help users take total control of their money. 

Originally inspired by the [Frontend Mentor Personal Finance App challenge](https://www.frontendmentor.io), Clarifi goes far beyond the original UI/UX scope. It features a custom **Golang backend**, **Google Cloud Firestore** data persistence, robust **Firebase Authentication**, and live bank data syncing via the **Plaid API**. 

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Deep Dive: Engineering Highlights](#-deep-dive-engineering-highlights)
  - [Live Bank Sync (Plaid API)](#1-live-bank-sync-plaid-api)
  - [Secure Authentication Flow](#2-secure-authentication-flow)
  - [Advanced Expense Analysis Engine](#3-advanced-expense-analysis-engine)
  - [Smart Recurring Bills Logic](#4-smart-recurring-bills-logic)
- [Getting Started](#-getting-started)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

- **Live Financial Data:** Securely link bank accounts via Plaid to instantly fetch balances, transactions, and recurring streams.
- **Comprehensive Overview:** A high-level dashboard displaying income, expenses, savings, and upcoming bill summaries at-a-glance.
- **Budgeting System:** Full CRUD functionality for custom budgets. Tracks monthly spending and displays the latest transactions per category.
- **Saving Pots:** Set financial goals, add/withdraw funds, and visualize progress dynamically. Balances automatically sync with the user's linked accounts.
- **Custom Auth Forms:** Highly controlled client-side validation paired with secure backend JWT verification.
- **Accessibility & UX:** Fully responsive layout, interactive onboarding carousels, active hover/focus states, and 100% keyboard navigable.

---

## 🛠 Tech Stack & Architecture

### Frontend (Client)
- **React.js** (Custom Hooks, Context API for state management)
- **react-plaid-link** (Bank authentication UI)
- **Chart.js / react-chartjs-2** (Data visualization)
- **Firebase Auth SDK** (Client-side user management)
- **CSS3** (Custom styling, CSS Variables, Flexbox/Grid)

### Backend (Server)
- **Go (Golang)** (High-performance backend logic)
- **Gin Web Framework** (RESTful API routing and middleware)
- **Plaid Go SDK** (Financial data retrieval)
- **Firebase Admin SDK** (Token verification and user profile updates)

### Database
- **Google Cloud Firestore (NoSQL)** 
  - Hierarchical data modeling (`users/{uid}/budgets`, `users/{uid}/pots`).
  - Stores user preferences, Plaid access tokens, and custom targets.

---

## 🧠 Deep Dive: Engineering Highlights

### 1. Live Bank Sync (Plaid API)
Instead of relying on static JSON files, Clarifi connects to real bank accounts. 
- **The Onboarding Flow:** A polished `WelcomeView` component guides new users through a value-prop carousel before initializing `react-plaid-link`.
- **Token Exchange:** The frontend securely retrieves a Plaid `public_token`, which the Go backend (`SetAccessToken`) exchanges for a permanent `access_token` and stores securely in Firestore.
- **Data Aggregation:** The backend's `GetOverviewSummary` endpoint concurrently syncs transactions (`TransactionsSync`) and fetches live account balances (`AccountsBalanceGet`), mapping complex Plaid payloads into clean, lightweight DTOs for the React frontend.

### 2. Secure Authentication Flow
Security is handled at both the client and server levels:
- **Client-Side Validation:** A custom `AuthValidationContext` provides granular, real-time feedback (empty fields, short passwords, email formatting) without relying on heavy external form libraries.
- **JWT Protection:** Every backend API request passes through a custom Go `FirebaseAuthMiddleware`. This middleware intercepts the `Authorization: Bearer <token>` header, uses the Firebase Admin SDK to verify the JWT, and injects the verified `uid` into the Gin context, ensuring users can only access their own Firestore sub-collections.

### 3. Advanced Expense Analysis Engine
The `ExpenseTrackerContext` acts as a dynamic financial advisor:
- **Context-Aware Baselines:** Calculates a user's typical daily average spend based on historical data, filtering out non-expenses like transfers.
- **Temporal Narratives:** Generates human-readable insights (e.g., "Trending above baseline", peak spending days) based on the user's selected date range (7 days, 30 days, custom).
- **Needs vs. Wants:** Automatically categorizes spending into essentials and lifestyle choices, visualized via a custom `react-chartjs-2` Doughnut chart.

### 4. Smart Recurring Bills Logic
Tracking subscriptions isn't just about listing transactions. The Go backend features a custom recurring bills engine:
- Parses Plaid `TransactionStream` data to infer frequency (Weekly, Bi-Weekly, Monthly, Annually).
- Calculates the exact `nextDate` and `daysUntilDue` by comparing the last payment date against the current UTC time.
- Categorizes bills into actionable statuses (`paid`, `upcoming`, `due_soon`, `past_due`) based on custom day-threshold logic.

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites
- Node.js (v16+)
- Go (v1.20+)
- Firebase Project (with Firestore and Authentication enabled)
- Plaid Developer Account

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/your-username/clarifi.git
