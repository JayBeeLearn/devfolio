import React, { useState } from 'react';

interface AdminAuthProps {
  isFirstTime: boolean;
  onLogin: (password: string) => void;
  onRegister: (password: string, confirm: string) => void;
  error: string;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ isFirstTime, onLogin, onRegister, error }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFirstTime) {
      onRegister(password, confirmPassword);
    } else {
      onLogin(password);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <h2 className="text-3xl font-black mb-2 text-center">
          {isFirstTime ? 'Admin Setup' : 'Admin Access'}
        </h2>
        <p className="text-center text-zinc-500 mb-6">
          {isFirstTime ? 'Create a password to secure your portfolio.' : 'Enter your password to continue.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isFirstTime ? "Create password..." : "Enter password..."}
            className="w-full px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 outline-none border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
          />
          
          {isFirstTime && (
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password..."
              className="w-full px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 outline-none border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
            />
          )}

          {error && <p className="text-rose-500 text-sm font-medium text-center">{error}</p>}
          
          <button className="w-full py-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl font-bold transition-transform active:scale-95">
            {isFirstTime ? 'Set Password & Login' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
