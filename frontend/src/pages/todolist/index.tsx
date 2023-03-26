import TodolistCard from "@/components/TodolistCard";
const index = () => {

    const tasks: Task[] = [{id:1, status: false, title: "Do HomeWork" },
    {id:2, status: false, title: "Do HomeWork2",time:"13.00" },
    {id:3, status: false, title: "Do HomeWork3" }]

    return (
        <div className="w-full">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
                <TodolistCard date="18 มีนาคม 2565" tasks={tasks}></TodolistCard>
            </div>
        </div>
    );
};

export default index;