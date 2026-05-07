const TaskCard = ({ task }) => {

  const statusColors = {
    Todo: "bg-yellow-500/20 text-yellow-300",
    "In Progress": "bg-blue-500/20 text-blue-300",
    Done: "bg-green-500/20 text-green-300",
  };

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300">

      <div className="flex justify-between items-center mb-5">

        <span
          className={`px-4 py-2 rounded-full text-sm font-bold ${statusColors[task.status]}`}
        >
          {task.status}
        </span>

        <span className="text-slate-400 text-sm">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>

      </div>

      <h2 className="text-2xl font-bold text-white mb-3">
        {task.title}
      </h2>

      <p className="text-slate-400 leading-7">
        {task.description}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <div>
          <p className="text-slate-500 text-sm">
            Assigned To
          </p>

          <h3 className="text-white font-semibold">
            {task.assignedTo?.name || "Unknown"}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
          {task.assignedTo?.name?.charAt(0)}
        </div>

      </div>

    </div>
  );
};

export default TaskCard;