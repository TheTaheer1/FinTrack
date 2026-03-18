import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip,
  BarChart, Bar, LabelList
} from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#ef4444', '#14b8a6', '#6366f1'];

export const CategoryPieChart = ({ transactions }) => {
  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
    
    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (data.length === 0) return <div className="text-secondary flex-center" style={{ height: '300px' }}>Not enough data for pie chart.</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <PieTooltip 
          formatter={(value) => `₹${value}`} 
          contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
          itemStyle={{ color: '#f8fafc' }}
          labelStyle={{ color: '#94a3b8' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const MonthlyLineChart = ({ transactions }) => {
  const data = useMemo(() => {
    const end = new Date();
    const start = subMonths(end, 5); // Last 6 months
    const months = eachMonthOfInterval({ start, end });
    
    return months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      
      const monthExpenses = transactions
        .filter(t => t.type === 'expense')
        .filter(t => {
          try {
            const date = parseISO(t.date);
            return date >= monthStart && date <= monthEnd;
          } catch { return false; }
        })
        .reduce((sum, t) => sum + Number(t.amount), 0);
        
      return {
        name: format(month, 'MMM'),
        amount: monthExpenses
      };
    });
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" tickFormatter={(value) => `₹${value}`} />
        <LineTooltip 
          formatter={(value) => `₹${value}`} 
          contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
          itemStyle={{ color: '#f8fafc' }}
          labelStyle={{ color: '#94a3b8' }}
        />
        <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const IncomeExpenseBarChart = ({ transactions }) => {
  const data = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
    return [
      { name: 'Income', amount: income, fill: '#10b981' },
      { name: 'Expense', amount: expense, fill: '#ef4444' }
    ];
  }, [transactions]);

  const CustomBarLabel = (props) => {
    const { x, y, width, height, value, index } = props;
    const fill = index === 0 ? '#10b981' : '#ef4444';
    return (
      <text x={x + width + 5} y={y + height / 2} dy={4} fill={fill} fontWeight="bold" fontSize={14}>
        ₹{value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 80, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis type="number" stroke="#94a3b8" />
        <YAxis dataKey="name" type="category" stroke="#94a3b8" />
        <LineTooltip 
          formatter={(value) => `₹${value}`} 
          contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
          itemStyle={{ color: '#f8fafc' }}
          labelStyle={{ color: '#94a3b8' }}
        />
        <Bar dataKey="amount" radius={[0, 4, 4, 0]} minPointSize={5}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
          <LabelList dataKey="amount" content={<CustomBarLabel />} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
