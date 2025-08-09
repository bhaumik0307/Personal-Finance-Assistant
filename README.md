# Typeface Project

A minimalist personal finance management app designed for simplicity and clarity. Track your expenses, manage budgets, and gain insights into your financial habits with a clean, distraction-free interface.

## 🚀 Demo

[![Watch the demo](https://img.youtube.com/vi/do0vvD6iGs0/0.jpg)](https://www.youtube.com/watch?v=do0vvD6iGs0)

## Live Link
[Personal-Finance-Assistant on Vercel](https://personal-finance-assistant-7o3s.vercel.app)

## Features

- **Minimalist Design**: Clean, clutter-free interface focused on essential functionality
- **Expense Tracking**: Easy transaction logging and categorization
- **Financial Insights**: Visual analytics and spending patterns
- **Data Privacy**: Your financial data stays secure and private

## Tech Stack

### Frontend
- **Framework**:  React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts for financial visualizations

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB
- **API**: RESTful API design
- **Authentication**: Google OAuth

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/typeface-project.git
cd typeface-project
```

2. Install dependencies for both frontend and backend:

**Backend Setup:**
```bash
cd backend
npm install
# or
yarn install
```

**Frontend Setup:**
```bash
cd ../frontend
npm install
# or
yarn install
```

3. Set up environment variables:

**Backend:**
```bash
cd backend
cp .env.example .env
```

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
```

4. Configure your environment variables:

**Backend (.env):**
```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

**Frontend (.env.local):**
```env
VITE_PUBLIC_API_URL=http://localhost:5000

# Google OAuth (Frontend)
VITE_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## Google OAuth Setup

To enable Google OAuth authentication, you'll need to:

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (for development)
     - `https://yourdomain.com/api/auth/google/callback` (for production)

2. **Configure Environment Variables:**
   - Copy the Client ID and Client Secret from Google Cloud Console
   - Add them to your `.env` files as shown above
   - The `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is used for frontend Google Sign-In button
   - The backend credentials are used for server-side OAuth flow


### Running the Application

You'll need to run both the backend and frontend servers:

**Start the Backend Server:**
```bash
cd backend
npm run dev
# or
yarn dev
```
The backend will run on [http://localhost:5000](http://localhost:5000)

**Start the Frontend Server (in a new terminal):**
```bash
cd frontend
npm run dev
# or
yarn dev
```
The frontend will run on [http://localhost:3000](http://localhost:3000)

## Usage

### Getting Started

1. **Create Account**: Sign up with your email to get started
2. **Add Transactions**: Log your income and expenses with simple forms
3. **Categorize Spending**: Organize transactions into meaningful categories
4. **Set Budgets**: Define spending limits for different categories
5. **View Insights**: Check your dashboard for spending patterns and trends

### Key Features

- **Quick Add**: Rapidly input transactions with keyboard shortcuts
- **Smart Categorization**: Automatic category suggestions based on transaction details
- **Monthly Overview**: Clear monthly spending summaries

## Project Structure

```
typeface-project/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── .env.example
├── frontend/               # Frontend Next.js app
│   ├── app/               # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── lib/          # Utility functions
│   │   └── globals.css   # Global styles
│   ├── components/        # Shared UI components
│   │   └── ui/           # shadcn/ui components
│   ├── public/           # Static assets
│   ├── package.json
│   └── .env.local.example
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Transactions
- `GET /api/transactions` - Get all user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Budgets
- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget

## Development Scripts

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Support

For support and questions:
- Create an issue on GitHub
- Email: cbhaumik08@gmail.com

---

Built with ❤️ by Bhaumik Chauhan

