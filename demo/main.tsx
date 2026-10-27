import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Wand2 } from 'lucide-react';
import { CronBuilder, calculateNextRun } from '../src';
import './index.css';

const params = new URLSearchParams(window.location.search);

const App: React.FC = () => {
    const [expression, setExpression] = useState(params.get('expr') ?? '30 2 * * 1,2,3,4,5');
    const [open, setOpen] = useState(params.has('open'));

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg space-y-4">
                <h1 className="text-xl font-semibold text-gray-900">Cron Builder demo</h1>
                <label className="block text-sm font-medium text-gray-700">Cron expression</label>
                <div className="flex space-x-2">
                    <input
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                        <Wand2 className="w-4 h-4" />
                        <span>Build</span>
                    </button>
                </div>
                <p className="text-sm text-gray-500">Next run: {calculateNextRun(expression)}</p>
            </div>

            <CronBuilder
                isOpen={open}
                onClose={() => setOpen(false)}
                onApply={setExpression}
                initialExpression={expression}
            />
        </div>
    );
};

createRoot(document.getElementById('root')!).render(<App />);
