# FinTrack - Personal Finance & Expense Analytics App

FinTrack is a comprehensive and visually stunning personal finance application built with React. It helps users manage their income, track expenses, set budgets, and analyze their financial habits through an intuitive and interactive dashboard. 

The application uses modern design principles like glassmorphism and an aesthetic dark theme, providing a seamless and premium user experience. All financial data is persistently stored in your browser's local storage.

## ✨ Detailed Feature Breakdown

### 📊 Dashboard & Analytics
- **Financial Overview**: Instantly view your total income, total expenses, and net balance calculated dynamically based on your records.
- **Top Spending Category**: The dashboard automatically identifies and displays the category where you spend the most, helping you stay mindful of your habits.
- **Interactive Visualizations**: Built with **Recharts**, the analytics page provides:
  - **Category Pie Chart**: A colorful breakdown of your expenses by category.
  - **Income vs. Expense Bar Chart**: A side-by-side comparison of your cash flow.
  - **Expense Trend Line Chart**: A 6-month historical view to track whether your spending is increasing or decreasing over time.

### 💰 Transaction Management
- **Full CRUD Functionality**: Easily **Create**, **Read**, **Update**, and **Delete** your transactions.
- **Income & Expense Tracking**: Categorize every transaction precisely using preset categories (e.g., Housing, Food, Salary).
- **Add Notes**: Attach context to any transaction by writing optional notes.
- **Smart Forms**: Forms are built with **React Hook Form** for peak performance and use **Yup** schemas to enforce strict validation rules. Your amount, title, and dates must be perfectly formatted before saving.

### 🔍 Advanced Filtering & Search
- **Instant Search**: Type a keyword in the search bar to instantly find transactions based on their title or notes.
- **Filter by Category & Type**: Narrow down your transactions to see exactly what you spent on "Food" or only view your "Income".
- **Date Range Picker**: Select "Last 7 Days", "Last 30 Days", or "This Month" to analyze specific timeframes.

### 🌍 Multi-Currency Support
- **Global Formatting**: The application provides built-in currency management. Using the Context API, you can seamlessly format your financial data to Indian Rupees (INR) or other integrated currencies. 

### 💾 Local Storage Persistence
- **Zero Configuration DB**: You don't need a backend! FinTrack automatically saves every addition, edit, or deletion to your browser's `localStorage` using custom React Hooks (`useTransactions`). When you close and reopen the app, your data remains perfectly intact.

### 🎨 Premium UI/UX Design
- **Dark Theme Aesthetics**: The app features a stunning, easy-on-the-eyes dark mode using deep blues and purples.
- **Glassmorphism Panels**: UI cards and containers use a frosted glass effect with blurred backdrops (`backdrop-filter: blur()`) to feel incredibly modern.
- **Fully Responsive**: Using modern CSS Grid and Flexbox, the app works seamlessly and looks gorgeous whether you're on a desktop monitor, tablet, or smartphone.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API & Custom Hooks
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **Data Visualization**: Recharts
- **Icons**: React Icons (Lucide)
- **Notifications**: React Toastify
- **Utility**: uuid, date-fns
- **Styling**: Custom CSS (Glassmorphism / Dark Theme)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <your-repository-url>
   cd fintrack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Charts, Forms, etc.)
├── context/          # React Context providers (FinanceContext)
├── hooks/            # Custom React hooks (useTransactions, useCurrency)
├── pages/            # Page-level components (Dashboard, Analytics, Transactions, etc.)
├── App.jsx           # Main application component & routing setup
├── index.css         # Global styles and design system variables
└── main.jsx          # React entry point
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
