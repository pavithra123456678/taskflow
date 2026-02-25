const Task = require("../models/Task");

// ➕ Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, subtasks } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      subtasks: Array.isArray(subtasks) ? subtasks.map(st => ({ title: st.title, completed: !!st.completed })) : [],
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 Get All Tasks (for logged-in user) — with pagination
exports.getTasks = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    let filter = { user: req.user._id };

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Search by title
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Task.countDocuments(filter),
    ]);

    res.json({
      tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Allow updating fields including `subtasks`. We sanitize subtasks if present.
    const updates = { ...req.body };
    if (updates.subtasks && Array.isArray(updates.subtasks)) {
      updates.subtasks = updates.subtasks.map(st => ({ title: st.title, completed: !!st.completed }));
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
