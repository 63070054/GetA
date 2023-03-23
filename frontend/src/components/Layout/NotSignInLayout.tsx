import NavBar from "../NavBar";
import NotSignInContainer from "../Container/NotSignInContainer";


const NotSignInLayout = ({ children }: ChildrenProps) => {

  return (
    <>
      <NavBar />
      <NotSignInContainer children={children} />
    </>
  );
};

export default NotSignInLayout;