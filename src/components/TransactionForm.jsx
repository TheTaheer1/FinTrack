import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { FinanceContext } from '../context/FinanceContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(50, 'Title is too long'),
  amount: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Amount is required')
    .positive('Amount must be positive'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  notes: yup.string().max(200, 'Notes cannot exceed 200 characters'),
  recurring: yup.boolean()
});

const TransactionForm = ({ defaultValues }) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const navigate = useNavigate();
  const { currency, exchangeRates } = useContext(FinanceContext);
  
  const rate = exchangeRates[currency] || 1;
  const isEditing = !!defaultValues;

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues ? { ...defaultValues, amount: (defaultValues.amount * rate).toFixed(2) } : {
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      notes: '',
      recurring: false
    }
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultValues, amount: (defaultValues.amount * rate).toFixed(2) });
    } else {
      reset({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        notes: '',
        recurring: false
      });
    }
  }, [defaultValues, reset]);

  const selectedType = watch('type');

  const onSubmit = (data) => {
    const baseAmount = Number(data.amount) / rate;
    const processedData = { ...data, amount: baseAmount };

    if (isEditing) {
      updateTransaction(defaultValues.id, processedData);
      toast.success('Transaction updated!');
    } else {
      addTransaction({ ...processedData, id: uuidv4() });
      toast.success('Transaction added!');
    }
    navigate('/transactions');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="form-group">
        <label className="form-label">Type</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="radio" value="expense" {...register('type')} />
            Expense
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="radio" value="income" {...register('type')} />
            Income
          </label>
        </div>
        {errors.type && <p className="form-error">{errors.type.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" placeholder="E.g., Grocery Shopping" {...register('title')} />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Amount ({currency})</label>
          <input type="number" step="0.01" className="form-control" placeholder="0.00" {...register('amount')} />
          {errors.amount && <p className="form-error">{errors.amount.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" {...register('date')} />
          {errors.date && <p className="form-error">{errors.date.message}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select className="form-control" {...register('category')}>
          <option value="">Select a category</option>
          {selectedType === 'expense' ? (
            <>
              <option value="Housing">Housing</option>
              <option value="Food">Food & Dining</option>
              <option value="Transport">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Other">Other</option>
            </>
          ) : (
            <>
              <option value="Salary">Salary</option>
              <option value="Investment">Investment</option>
              <option value="Gift">Gift</option>
              <option value="Other">Other</option>
            </>
          )}
        </select>
        {errors.category && <p className="form-error">{errors.category.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Notes (Optional)</label>
        <textarea className="form-control" rows="3" {...register('notes')}></textarea>
        {errors.notes && <p className="form-error">{errors.notes.message}</p>}
      </div>

      <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center' }}>
        <input type="checkbox" id="recurring" {...register('recurring')} style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }} />
        <label htmlFor="recurring" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>Set as recurring transaction</label>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" className="btn">{isEditing ? 'Update Transaction' : 'Save Transaction'}</button>
      </div>
    </form>
  );
};

export default TransactionForm;
