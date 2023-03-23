interface TodolistCard{
    date:string
    tasks:Task[]
}

interface Task{
    title:string
    status:"DONE"|"NOT DONE"
    time?:string
}