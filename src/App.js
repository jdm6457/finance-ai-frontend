import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Wallet, CreditCard, ShoppingCart, Utensils, Home, Lightbulb, Target, MoreVertical, ShieldCheck, Settings, Bell, LogOut } from 'lucide-react';

// Mock Data (In a real app, this would come from an API)
const mockData = {
  netWorth: 125450.75,
  netWorthChange: 1.2,
  cash: 25830.40,
  investments: 99620.35,
  debt: 15200.00,
  transactions: [
    { id: 1, icon: <ShoppingCart className="w-6 h-6 text-blue-400" />, description: 'Online Shopping - Tech Gadget', date: '2025-07-29', amount: -199.99, type: 'Expense' },
    { id: 2, icon: <TrendingUp className="w-6 h-6 text-green-400" />, description: 'Monthly Salary', date: '2025-07-28', amount: 4500.00, type: 'Income' },
    { id: 3, icon: <Utensils className="w-6 h-6 text-orange-400" />, description: 'Dinner with Friends', date: '2025-07-27', amount: -85.50, type: 'Expense' },
    { id: 4, icon: <Home className="w-6 h-6 text-indigo-400" />, description: 'Rent Payment', date: '2025-07-25', amount: -1800.00, type: 'Expense' },
    { id: 5, icon: <CreditCard className="w-6 h-6 text-red-400" />, description: 'Credit Card Payment', date: '2025-07-25', amount: -500.00, type: 'Transfer' },
  ],
  spendingByCategory: [
    { name: 'Housing', value: 2100 },
    { name: 'Food', value: 650 },
    { name: 'Transport', value: 300 },
    { name: 'Shopping', value: 450 },
    { name: 'Entertainment', value: 250 },
    { name: 'Utilities', value: 200 },
  ],
  cashFlow: [
    { month: 'Feb', income: 4800, expenses: 3200 },
    { month: 'Mar', income: 5000, expenses: 3500 },
    { month: 'Apr', income: 4900, expenses: 3300 },
    { month: 'May', income: 5200, expenses: 3800 },
    { month: 'Jun', income: 5100, expenses: 3600 },
    { month: 'Jul', income: 5300, expenses: 4100 },
  ],
  aiInsights: [
    "Your spending on 'Food' is up 15% this month. Consider more home-cooked meals.",
    "You have a recurring subscription for 'Streaming Service X' for $15.99. You haven't used it much this month.",
    "Great job! You're on track to meet your 'Vacation Fund' goal 2 weeks ahead of schedule."
  ],
  financialGoals: [
    { id: 1, name: 'Vacation to Japan', current: 3800, target: 5000 },
    { id: 2, name: 'New Car Down Payment', current: 8500, target: 10000 },
  ]
};

const COLORS = ['#0ea5e9', '#8b5cf6', '#f97316', '#14b8a6', '#ec4899', '#facc15'];

// Helper to format currency
const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

// Card component for consistent styling
const Card = ({ children, className = '' }) => (
  <div className={`bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50 ${className}`}>
    {children}
  </div>
);

// Metric Card Component
const MetricCard = ({ icon, title, value, change, changeType }) => (
  <Card>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-slate-700/50 p-3 rounded-lg">{icon}</div>
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(value)}</p>
        </div>
      </div>
      {change && (
        <div className={`flex items-center text-sm font-semibold ${changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'}`}>
          {changeType === 'positive' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}%
        </div>
      )}
    </div>
  </Card>
);

// Custom Tooltip for Pie Chart
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900/80 backdrop-blur-sm p-3 rounded-lg border border-slate-700 shadow-lg">
        <p className="font-semibold" style={{ color: data.payload.fill }}>
          {`${data.name}: ${formatCurrency(data.value)}`}
        </p>
      </div>
    );
  }
  return null;
};


// Spending Pie Chart Component
const SpendingChart = () => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <h2 className="text-lg font-bold text-white mb-4">Spending by Category</h2>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={mockData.spendingByCategory}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {mockData.spendingByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {mockData.spendingByCategory.map((item, index) => (
          <div key={item.name} className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span className="text-slate-400">{item.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Cash Flow Bar Chart Component
const CashFlowChart = () => (
  <Card className="col-span-1 md:col-span-2 lg:col-span-2">
    <h2 className="text-lg font-bold text-white mb-4">Cash Flow (Last 6 Months)</h2>
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={mockData.cashFlow} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#475569' }} tickLine={{ stroke: '#475569' }} />
          <YAxis tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#475569' }} tickLine={{ stroke: '#475569' }} tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip
            cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#cbd5e1' }}
            formatter={(value) => formatCurrency(value)}
          />
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
          <Bar dataKey="income" fill="#22c55e" name="Income" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#3b82f6" name="Expenses" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

// Recent Transactions Component
const RecentTransactions = () => (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <h2 className="text-lg font-bold text-white mb-4">Recent Transactions</h2>
        <div className="space-y-4">
            {mockData.transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-slate-700/50 p-3 rounded-full">
                            {tx.icon}
                        </div>
                        <div>
                            <p className="text-white font-medium">{tx.description}</p>
                            <p className="text-slate-400 text-sm">{tx.date}</p>
                        </div>
                    </div>
                    <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                    </p>
                </div>
            ))}
        </div>
    </Card>
);


// AI Insights Component
const AIInsights = () => {
  const [insightIndex, setInsightIndex] = useState(0);

  const nextInsight = () => {
    setInsightIndex((prevIndex) => (prevIndex + 1) % mockData.aiInsights.length);
  };

  return (
    <Card className="col-span-1">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-white mb-4">AI Financial Analyst</h2>
        <button onClick={nextInsight} className="text-slate-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
      <div className="flex items-start space-x-4">
        <div className="bg-yellow-500/20 text-yellow-400 p-2 rounded-full mt-1">
          <Lightbulb size={20} />
        </div>
        <p className="text-slate-300 text-sm flex-1">{mockData.aiInsights[insightIndex]}</p>
      </div>
    </Card>
  );
};

// Financial Goals Component
const FinancialGoals = () => (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="text-lg font-bold text-white mb-4">Financial Goals</h2>
        <div className="space-y-4">
            {mockData.financialGoals.map(goal => {
                const progress = (goal.current / goal.target) * 100;
                return (
                    <div key={goal.id}>
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-white text-sm font-medium">{goal.name}</p>
                            <p className="text-slate-400 text-xs">{Math.round(progress)}%</p>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-right text-slate-400 text-xs mt-1">{formatCurrency(goal.current)} / {formatCurrency(goal.target)}</p>
                    </div>
                );
            })}
        </div>
    </Card>
);

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-900/70 backdrop-blur-xl border-r border-slate-800 p-6 hidden lg:flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-3 mb-10">
                    <ShieldCheck className="w-8 h-8 text-sky-400" />
                    <h1 className="text-xl font-bold text-white">Finance AI</h1>
                </div>
                <nav className="space-y-2">
                    <a href="#/" className="flex items-center space-x-3 px-4 py-3 bg-slate-800 rounded-lg text-white font-semibold">
                        <Home className="w-5 h-5" />
                        <span>Dashboard</span>
                    </a>
                    <a href="#/" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                        <Wallet className="w-5 h-5" />
                        <span>Accounts</span>
                    </a>
                    <a href="#/" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Transactions</span>
                    </a>
                    <a href="#/" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                        <Target className="w-5 h-5" />
                        <span>Budgets</span>
                    </a>
                     <a href="#/" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                        <TrendingUp className="w-5 h-5" />
                        <span>Investments</span>
                    </a>
                </nav>
            </div>
            <div className="space-y-2">
                 <a href="#/" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </a>
                <a href="#/" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </a>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Welcome Back, Quinn</h1>
                    <p className="text-slate-400">Here's your financial overview for today.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-slate-800/50 transition-colors">
                        <Bell className="w-6 h-6 text-slate-400" />
                    </button>
                     <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/40x40/64748b/e2e8f0?text=A" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-600" />
                        <div>
                            <p className="text-white font-semibold">Quinn Pennyworth</p>
                            <p className="text-xs text-slate-400">Premium User</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                icon={<DollarSign className="w-6 h-6 text-emerald-400" />}
                title="Net Worth"
                value={mockData.netWorth}
                change={mockData.netWorthChange}
                changeType="positive"
              />
              <MetricCard
                icon={<Wallet className="w-6 h-6 text-sky-400" />}
                title="Total Cash"
                value={mockData.cash}
              />
              <MetricCard
                icon={<CreditCard className="w-6 h-6 text-red-400" />}
                title="Total Debt"
                value={mockData.debt}
              />
              
              <CashFlowChart />
              <SpendingChart />
              
              <RecentTransactions />
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-6">
                <AIInsights />
                <FinancialGoals />
              </div>

            </div>
        </main>
      </div>
    </div>
  );
}
