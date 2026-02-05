import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasksbyProject,createTask,toggleTasksStatus } from "../services/taskService";

const Project = () => {
  const { projectId } = useParams();
  const [tasks,setTasks] = useState([]);
  const [taskTitle,setTaskTitle] = useState('');
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchTasks = async() =>{
        setLoading(true);
        const data = await getTasksbyProject(projectId);
        setTasks(data);
        setLoading(false);
    }

    fetchTasks();
  },[projectId])

  const handleTask = async() =>{
    if (!taskTitle.trim()) return;

    await createTask(taskTitle,projectId);
    const data = await getTasksbyProject(projectId);
    setTasks(data);
    setTaskTitle('');
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>

        <div className="flex gap-2 max-w-xl">
            <input
            type="text"
            placeholder="New Task"
            value={taskTitle}
            onChange={(e)=>setTaskTitle(e.target.value)}
            />
            <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={handleTask}
            >
                Add
            </button>
        </div>

        {loading && (<p className="text-gray-500">Loading tasks...</p>)}

        {!loading && tasks.length === 0 && (
            <p className="text-gray-500">No tasks yet.</p>
        )}

        {!loading && tasks.length>0 && (
            <ul className="space-y-3 max-w-xl">
                {tasks.map((t)=>(
                    <li key={t.id} className="border p-3 rounded flex items-center gap-3">
                        <input
                        type="checkbox"
                        checked={t.status==='done'}
                        onChange={async ()=>{
                            await toggleTasksStatus(t.id,t.status);
                            const data = await getTasksbyProject(projectId);
                            setTasks(data);
                        }}
                        />
                        <span style={t.status === 'done' ? { textDecoration: "line-through", color: "#9ca3af" }: {}}>
                            {t.taskTitle}
                        </span>
                    </li>
        ))}
            </ul>
        )}
    </div>
  );
};

export default Project;
