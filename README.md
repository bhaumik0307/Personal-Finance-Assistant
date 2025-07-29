# Typeface Project

A minimalist personal finance management app designed for simplicity and clarity. Track your expenses, manage budgets, and gain insights into your financial habits with a clean, distraction-free interface.

## Features

- **Minimalist Design**: Clean, clutter-free interface focused on essential functionality
- **Expense Tracking**: Easy transaction logging and categorization
- **Budget Management**: Set and monitor spending limits across categories
- **Financial Insights**: Visual analytics and spending patterns
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Data Privacy**: Your financial data stays secure and private

## Tech Stack

### Frontend
- **Framework**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Charts**: Recharts for financial visualizations

### Backend
- **Runtime**: Node.js
- **Database**: [Your database choice]
- **API**: RESTful API design
- **Authentication**: [Your auth solution]

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
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

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

### Getting Started with Typeface

1. **Create Account**: Sign up with your email to get started
2. **Add Transactions**: Log your income and expenses with simple forms
3. **Categorize Spending**: Organize transactions into meaningful categories
4. **Set Budgets**: Define spending limits for different categories
5. **View Insights**: Check your dashboard for spending patterns and trends

### Key Features

- **Quick Add**: Rapidly input transactions with keyboard shortcuts
- **Smart Categorization**: Automatic category suggestions based on transaction details
- **Monthly Overview**: Clear monthly spending summaries
- **Goal Tracking**: Monitor progress toward financial goals

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

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes in the appropriate folder (backend or frontend)
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Design Philosophy

Typeface Project follows minimalist design principles:

- **Clarity over Complexity**: Every feature serves a clear purpose
- **Typography-First**: Clean, readable fonts and text hierarchy
- **Purposeful Color**: Limited color palette for better focus
- **Intuitive Navigation**: Simple, predictable user flows
- **Mobile-First**: Responsive design that works everywhere

## Testing

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment
1. Build the backend: `cd backend && npm run build`
2. Deploy to your preferred hosting service (Railway, Render, etc.)
3. Set environment variables in your hosting platform

### Frontend Deployment (Vercel)
1. Push your code to GitHub
2. Connect the `frontend` folder to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

## License

MIT License

## Support

For support and questions:
- Create an issue on GitHub
- Email: cbhaumik08@gmail.com

## Roadmap

- [ ] Bank account integration
- [ ] Advanced analytics and reporting
- [ ] Multi-currency support
- [ ] Data export functionality

---

Built with ❤️ for better financial clarity and peace of mind.
```

This README is specifically tailored for your Typeface Project with the correct folder structure and running commands for both backend and frontend servers.

