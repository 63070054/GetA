interface TodolistCard{
    date:string;
    tasks:Task[];
}

interface Task{
    title:string;
    status:"DONE"|"NOT DONE";
    time?:string;
}

interface ChildrenProps {
  children: ReactNode;
}

interface NavBarRouter {
  name: string;
  routerPath: string;
  icon?: SvgIconComponent;
}