import TodolistCard from "@/components/TodolistCard";
const index = () => {

    const tasks: Task[] = []

    return (
        <div>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
            </div>
        </div>
    );
};

export default index;