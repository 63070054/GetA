import AddTodoCardButton from "@/components/Button/AddTodoCardButton";
import TodolistCard from "@/components/TodolistCard";
const index = () => {

    const tasks: Task[] = [{id:1, status: false, title: "Do HomeWork" },
    {id:2, status: false, title: "Do HomeWork2",time:"13.00" },
    {id:3, status: false, title: "Do HomeWork3" },
    {id:7, status: false, title: "Do HomeWork3" }]
    const todos:TodolistCard[]=[
        {date:"3 มีนาคม 2565",tasks:tasks},
        {date:"5 มีนาคม 2565",tasks:tasks},
        {date:"12 มีนาคม 2565",tasks:tasks},
        {date:"15 มีนาคม 2565",tasks:tasks}
    ]

    return (
        <div className="w-full">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                {todos.map(todo=>
                <TodolistCard date={todo.date} tasks={todo.tasks}></TodolistCard>
                )}
                <AddTodoCardButton></AddTodoCardButton>
            </div>
        </div>
    );
};

export default index;