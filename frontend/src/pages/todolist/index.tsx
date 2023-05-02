import AddTodoCardButton from "@/components/Button/AddTodoCardButton";
import TodolistCard from "@/components/Card/TodolistCard";
import MediumComtainer from "@/components/Container/MediumContainer";
import api from "@/plugins/axios/api";
import { useUser } from "@/utils/useUser";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const index = () => {

    const router = useRouter()
    const { id: userId } = useUser()

    const [todos, setToDos] = useState<TodolistCard[]>([])


    const addTask = async (toDoIndex: number, newTask: Task) => {

        try {
            const addTaskModel: AddTaskModel = {
                title: newTask.title,
                status: newTask.status,
                time: newTask.time,
                taskId: newTask.taskId
            }
            const response = await api.post("/todos", addTaskModel)
            const subTaskId = response.data

            const newTaskFromDb: Task = {
                id: subTaskId,
                ...addTaskModel
            }

            const copyToDos = todos
            copyToDos[toDoIndex].subTasks.push(newTaskFromDb)
            setToDos([...copyToDos])

        } catch (error) {
            console.log(error)
        }

    }
    const addToDo = async (newToDo: TodolistCard) => {

        try {
            const addDateModel: AddDateModel = {
                date: newToDo.date,
                ownerId: newToDo.ownerId,
                subTasks: newToDo.subTasks
            }
            const response = await api.post("/date", addDateModel)
            const taskId = response.data

            const newTaskFromDb: TodolistCard = {
                id: taskId,
                ...addDateModel
            }

            const copyToDos = todos
            copyToDos.push(newTaskFromDb)
            setToDos([...copyToDos])


            console.log(newTaskFromDb)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const getToDoListById = async () => {
            const response = await api.get("/todos/" + userId)
            let copyToDos: TodolistCard[] = response.data || []
            console.log(copyToDos)

            copyToDos = copyToDos.map((task: any) => {
                return {
                    id: task.id,
                    date: task.date,
                    subTasks: task.SubTasks ? task.SubTasks : [],
                    ownerId: task.ownerId
                }
            })


            setToDos([...copyToDos])
        }

        if (router.isReady) {
            getToDoListById()
        }


    }, [router.isReady])


    const handleChange = (toDoIndex: number, taskId: number) => {
        const copyToDos = todos
        const selectSubTask = copyToDos[toDoIndex].subTasks.find(subTask => subTask.id === taskId)
        if (selectSubTask) {
            selectSubTask.status = !selectSubTask.status
            setToDos([...copyToDos])
        }

    };

    const handleonChangeStatus = (toDoIndex: number, task: Task) => {
        if (task.id) handleChange(toDoIndex, task?.id)
    }

    return (
        <MediumComtainer>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:gap-16 grid-cols-1 gap-6">
                {todos.map((todo, index) => (
                    <TodolistCard key={index} {...{ handleonChangeStatus, }} toDoIndex={index} {...todo} addTask={addTask} />
                ))}
                <AddTodoCardButton addToDo={addToDo}></AddTodoCardButton>
            </div>
        </MediumComtainer>
    );
};

export default index;