import NavBar from "../NavBar";

const AlreadySignInLayout = ({ children }: ChildrenProps) => {

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {children}
    </div>
  );
};

export default AlreadySignInLayout;