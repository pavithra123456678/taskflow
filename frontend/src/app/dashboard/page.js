"use client";
import { useEffect, useState, useMemo, useCallback, useRef, memo } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import LoadingSkeleton from "../../components/LoadingSkeleton";

// Accessibility: focus ring color
const focusRing = "focus:outline-none focus:ring-2 focus:ring-blue-400";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import ErrorBoundary from "../../components/ErrorBoundary";
import { getTasks, createTask, updateTask, deleteTask } from "../../services/api";
// ...existing code...

export default function DashboardPage() {
  // Dashboard state
  const [newTitle, setNewTitle] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const { token, loading: authLoading } = useAuth();

  // Load tasks from backend
  useEffect(() => {
    if (authLoading || !token) return;
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks(token);
        setTasks(data.tasks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [token, authLoading]);

  // Add task (API)
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const response = await createTask(token, { title: newTitle });
      setTasks((prev) => [response.task, ...prev]);
      setNewTitle("");
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete task (API)
  const handleDelete = async (id) => {
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle complete (API)
  const handleToggle = async (task) => {
    try {
      const response = await updateTask(token, task._id, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? response.task : t)));
    } catch (err) {
      alert(err.message);
    }
  };

  // Details (open modal)
  const handleDetails = (task) => {
    setSelectedTask(task);
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, Pavi</h1>
          <p className="text-gray-400 mt-1">{tasks.length} tasks</p>
        </div>
        <div className="space-y-6">
          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="New task title" className="flex-1 p-3 rounded bg-white/6 text-white border border-white/8" />
            <button className="px-4 py-2 bg-blue-600 rounded text-white w-full sm:w-auto">Add</button>
          </form>
          <div className="flex gap-3 items-center">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks" className="flex-1 p-2 rounded bg-white/6 text-white border border-white/8" aria-label="Search tasks" />
            {/* Custom dropdown for all tasks */}
            <div className="relative">
              <button type="button" className="p-2 rounded bg-white/6 text-white border border-white/8 min-w-25" onClick={() => setShowDropdown(v => !v)}>
                Show Tasks ▼
              </button>
              {showDropdown && (
                <div className="absolute left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-[#181c24] border border-gray-700 rounded shadow-lg z-50">
                  <div className="flex justify-between items-center px-3 py-2 border-b border-white/10">
                    <span className="text-xs text-gray-400 font-semibold">All Tasks</span>
                    <button onClick={() => setShowDropdown(false)} className="text-gray-400 hover:text-white text-lg" aria-label="Close dropdown">✕</button>
                  </div>
                  {tasks.length === 0 && <div className="p-4 text-gray-400 text-center">No tasks</div>}
                  {tasks.map((task) => (
                    <div key={task._id} className="p-3 border-b border-white/10 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white truncate max-w-30">{task.title}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${task.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-200'}`}>{task.status}</span>
                      </div>
                      {task.description && <div className="text-xs text-gray-400 mt-1 truncate">{task.description}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            { (search || statusFilter) && <button onClick={() => { setSearch(''); setStatusFilter(''); }} className="text-sm text-gray-300">Clear</button> }
          </div>
          { (search || statusFilter) && (
            <div className="flex gap-2 items-center">
              {search && (
                <div className="px-3 py-1 bg-white/6 text-sm rounded-full flex items-center gap-2">
                  <span className="text-gray-300">Search:</span>
                  <span className="font-medium truncate max-w-xs text-white">{search}</span>
                  <button aria-label="Clear search" onClick={() => setSearch('')} className="ml-2 text-gray-300 hover:text-white">✕</button>
                </div>
              )}
              {statusFilter && (
                <div className="px-3 py-1 bg-white/6 text-sm rounded-full flex items-center gap-2">
                  <span className="text-gray-300">Status:</span>
                  <span className="font-medium text-white">{statusFilter}</span>
                  <button aria-label="Clear status" onClick={() => setStatusFilter('')} className="ml-2 text-gray-300 hover:text-white">✕</button>
                </div>
              )}
              <button onClick={() => { setSearch(''); setStatusFilter(''); }} className="text-sm text-gray-300 ml-2">Clear filters</button>
            </div>
          )}
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-600 text-white flex items-center justify-between">
                  <div className="text-sm">Failed to load tasks. {error}</div>
                  <div className="flex gap-2">
                    <button onClick={() => { setError(null); load(1); }} className="px-3 py-1 bg-white/10 rounded text-sm">Retry</button>
                  </div>
                </div>
              )}
              <ProtectedRoute>
                <ErrorBoundary>
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {tasks.length === 0 && (
                      <div className="col-span-2 text-center text-gray-400 py-8">No tasks yet.</div>
                    )}
                    {tasks.map((task, index) => (
                      <div key={task._id || index} className="bg-zinc-900 rounded-xl p-6 flex flex-col justify-between shadow border border-white/10 relative">
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => handleToggle(task)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${task.status === 'completed' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-400'}`}
                          >
                            {task.status === 'completed' ? <span className="text-white text-xs">●</span> : <span className="text-gray-400 text-xs">○</span>}
                          </button>
                          <span className={`font-medium text-white ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>{task.title}</span>
                          <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${task.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-200'}`}>{task.status}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                          <span>{task.timeAgo || 'Just now'}</span>
                          <div className="flex gap-3 items-center">
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-red-400 hover:text-red-600 text-lg"
                              title="Delete"
                            >
                              ×
                            </button>
                            <button
                              onClick={() => handleDetails(task)}
                              className="text-blue-400 hover:underline text-sm"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Subtasks Modal */}
                  {selectedTask && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold text-white">
                            {selectedTask.title}
                          </h2>
                          <button
                            onClick={() => setSelectedTask(null)}
                            className="text-gray-400 hover:text-white text-lg"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="space-y-3">
                          {selectedTask.subtasks && selectedTask.subtasks.length > 0 ? (
                            selectedTask.subtasks.map((subtask, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white/5 p-2 rounded"
                              >
                                <span
                                  className={`text-sm ${
                                    subtask.completed
                                      ? "line-through text-gray-400"
                                      : "text-white"
                                  }`}
                                >
                                  {subtask.title}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {subtask.completed ? "Completed" : "Pending"}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-400 text-sm">
                              No subtasks available.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </ErrorBoundary>
              </ProtectedRoute>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
