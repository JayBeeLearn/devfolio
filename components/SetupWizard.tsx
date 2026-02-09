import React, { useState } from 'react';
import { Copy, Terminal, Check } from 'lucide-react';

type BackendType = 'firebase' | 'supabase';

const SetupWizard: React.FC = () => {
  const [backendType, setBackendType] = useState<BackendType>('firebase');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleAutoSetup = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const content = generateEnvFile();
      const res = await fetch('/__set-env', {
        method: 'POST',
        body: content,
      });
      
      if (res.ok) {
        alert('Configuration saved! The server will now restart to apply changes. Please wait a moment and then reload the page.');
        // Force reload after a delay to allow server restart
        setTimeout(() => window.location.reload(), 3000);
      } else {
        throw new Error('Failed to write file');
      }
    } catch (e) {
      console.error(e);
      setSaveError('Failed to save automatically. Please create the .env file manually.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const generateEnvFile = () => {
    let content = `VITE_BACKEND_TYPE=${backendType}\n`;
    
    if (backendType === 'firebase') {
      content += `VITE_FIREBASE_API_KEY=${formData.apiKey || ''}\n`;
      content += `VITE_FIREBASE_AUTH_DOMAIN=${formData.authDomain || ''}\n`;
      content += `VITE_FIREBASE_PROJECT_ID=${formData.projectId || ''}\n`;
      content += `VITE_FIREBASE_STORAGE_BUCKET=${formData.storageBucket || ''}\n`;
      content += `VITE_FIREBASE_MESSAGING_SENDER_ID=${formData.messagingSenderId || ''}\n`;
      content += `VITE_FIREBASE_APP_ID=${formData.appId || ''}\n`;
    } else if (backendType === 'supabase') {
      content += `VITE_SUPABASE_URL=${formData.supabaseUrl || ''}\n`;
      content += `VITE_SUPABASE_ANON_KEY=${formData.supabaseKey || ''}\n`;
    }
    
    return content;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEnvFile());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = backendType === 'firebase' 
    ? formData.apiKey && formData.projectId 
    : formData.supabaseUrl && formData.supabaseKey;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-zinc-800 rounded-xl shadow-2xl overflow-hidden border border-zinc-700">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to DevFolio</h1>
          <p className="text-zinc-400 mb-8">Configure your backend to get started. This process will generate an environment file for you.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Select Backend</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setBackendType('firebase')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    backendType === 'firebase' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <div className="font-semibold">Firebase</div>
                  <div className="text-xs text-zinc-400 mt-1">Google's app platform</div>
                </button>
                <button
                  onClick={() => setBackendType('supabase')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    backendType === 'supabase' 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <div className="font-semibold">Supabase</div>
                  <div className="text-xs text-zinc-400 mt-1">Open source Firebase alternative</div>
                </button>
              </div>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-700/50">
              <h3 className="text-lg font-semibold mb-4 capitalize">{backendType} Configuration</h3>
              <div className="space-y-4">
                {backendType === 'firebase' && (
                  <>
                    <input type="text" placeholder="API Key" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-blue-500 outline-none" onChange={e => handleInputChange('apiKey', e.target.value)} />
                    <input type="text" placeholder="Auth Domain" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-blue-500 outline-none" onChange={e => handleInputChange('authDomain', e.target.value)} />
                    <input type="text" placeholder="Project ID" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-blue-500 outline-none" onChange={e => handleInputChange('projectId', e.target.value)} />
                    <input type="text" placeholder="Storage Bucket" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-blue-500 outline-none" onChange={e => handleInputChange('storageBucket', e.target.value)} />
                    <input type="text" placeholder="Messaging Sender ID" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-blue-500 outline-none" onChange={e => handleInputChange('messagingSenderId', e.target.value)} />
                    <input type="text" placeholder="App ID" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-blue-500 outline-none" onChange={e => handleInputChange('appId', e.target.value)} />
                  </>
                )}
                {backendType === 'supabase' && (
                  <>
                    <input type="text" placeholder="Supabase URL" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-green-500 outline-none" onChange={e => handleInputChange('supabaseUrl', e.target.value)} />
                    <input type="text" placeholder="Anon Key" className="w-full bg-zinc-800 border-zinc-700 rounded p-2 focus:ring-2 ring-green-500 outline-none" onChange={e => handleInputChange('supabaseKey', e.target.value)} />
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-4">
                 <button
                    onClick={handleAutoSetup}
                    disabled={saving || !isFormValid}
                    className="flex-1 py-4 bg-white text-zinc-900 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                    {saving ? 'Saving & Restarting...' : 'Save & Configure Automatically'}
                    {!saving && <Terminal size={18} />}
                 </button>
            </div>
            {saveError && <p className="text-rose-500 text-center text-sm">{saveError}</p>}


            <div className="mt-8 border-t border-zinc-700 pt-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-zinc-400">Manual Configuration (Fallback)</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
              <div className="bg-black p-4 rounded-lg font-mono text-xs text-zinc-500 overflow-x-auto border border-zinc-800 relative">
                 <pre>{generateEnvFile()}</pre>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
