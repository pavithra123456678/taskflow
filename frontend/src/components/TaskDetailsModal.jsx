import React, { useState, useEffect } from 'react';

export default function TaskDetailsModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [newSub, setNewSub] = useState('');

  useEffect(() => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setSubtasks(task?.subtasks || []);
  }, [task]);

  const toggleSubtask = (idx) => {
    setSubtasks(s => s.map((st, i) => i === idx ? { ...st, completed: !st.completed } : st));
  };

  const addSubtask = () => {
    if (!newSub.trim()) return;
    setSubtasks(s => [{ title: newSub.trim(), completed: false }, ...s]);
    setNewSub('');
  };

  const removeSubtask = (idx) => {
    setSubtasks(s => s.filter((_, i) => i !== idx));
  };

  const save = () => {
    if (onSave) onSave({ title, description, subtasks });
    if (onClose) onClose();
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#181c24] rounded-lg max-w-xl w-full p-6 shadow-lg text-gray-900 dark:text-white min-h-128 min-w-md flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Task details</h3>
          <button onClick={onClose} className="text-sm text-gray-500 dark:text-gray-300">Close</button>
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-600 dark:text-gray-300">Title</label>
          <input className="w-full p-2 rounded bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-600 dark:text-gray-300">Description</label>
          <textarea className="w-full p-2 rounded bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-600 dark:text-gray-300">Subtasks</label>
          <div className="mt-2 space-y-2">
            {subtasks.map((st, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={!!st.completed} onChange={() => toggleSubtask(i)} />
                  <span className={`text-sm ${st.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>{st.title}</span>
                </label>
                <button onClick={() => removeSubtask(i)} className="text-xs text-red-400">Remove</button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <input className="flex-1 p-2 rounded bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700" placeholder="New subtask" value={newSub} onChange={e => setNewSub(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSubtask(); } }} />
              <button onClick={addSubtask} className="px-3 py-2 bg-blue-600 rounded text-white">Add</button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-700 text-white/80">Cancel</button>
          <button onClick={save} className="px-3 py-2 rounded bg-emerald-500 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
