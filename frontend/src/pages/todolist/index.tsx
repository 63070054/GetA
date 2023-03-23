import TodolistCard from "@/components/TodolistCard";

const index = () => {

    const tasks: Task[] = []

    return (
        <div>
            <TodolistCard date="39024" tasks={tasks}></TodolistCard>
        </div>
    );
};

export default index;