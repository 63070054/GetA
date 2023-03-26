import NavBar from "../NavBar";
import AlreadySignInContainer from "../Container/AlreadySignInContainer";


const AlreadySignInLayout = ({ children }: ChildrenProps) => {

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <AlreadySignInContainer children={children} />
    </div>
  );
};

export default AlreadySignInLayout;