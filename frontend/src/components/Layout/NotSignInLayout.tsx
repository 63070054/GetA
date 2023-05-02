import NavBar from "../NavBar";
import NotSignInContainer from "../Container/NotSignInContainer";


const NotSignInLayout = ({ children }: ChildrenProps) => {

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <NavBar />
      <NotSignInContainer children={children} />
    </div>
  );
};

export default NotSignInLayout;