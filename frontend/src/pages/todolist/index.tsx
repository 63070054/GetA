import AddTodoCardButton from "@/components/Button/AddTodoCardButton";
import TodolistCard from "@/components/TodolistCard";
import { useState } from "react";
const index = () => {

    const tasks: Task[] = [{id:"1", status: false, title: "Do HomeWork" },
    {id:"2", status: false, title: "Do HomeWork2",time:"13.00" },
    {id:"3", status: false, title: "Do HomeWork3" },
    {id:"7", status: false, title: "Do HomeWork3" }]

    const [todos, setToDos] = useState<TodolistCard[]>([
        {date:"3 มีนาคม 2565",tasks: [{id:"1", status: false, title: "Do HomeWork" },
        {id:"2", status: false, title: "Do HomeWork2",time:"13.00" },
        {id:"3", status: false, title: "Do HomeWork3" },
        {id:"7", status: false, title: "Do HomeWork3" }]},
        {date:"5 มีนาคม 2565",tasks:tasks},
        {date:"12 มีนาคม 2565",tasks:tasks},
        {date:"15 มีนาคม 2565",tasks:tasks}
    ])

    const addTask = (toDoIndex: number, newTask: Task) => {
        console.log(toDoIndex,newTask)
        const copyToDos = todos
        copyToDos[toDoIndex].tasks.push(newTask)
        setToDos([...copyToDos])
    }

    return (
        <div className="w-full">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-16">
                {todos.map((todo, index) => (
                                    <TodolistCard key={index} toDoIndex={index} {...todo} addTask={addTask} />
                ))}
                <AddTodoCardButton></AddTodoCardButton>
            </div>
        </div>
    );
};

export default index;