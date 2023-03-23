import NavBar from "../NavBar";
import AlreadySignInContainer from "../Container/AlreadySignInContainer";


const AlreadySignInLayout = ({ children }: ChildrenProps) => {

  return (
    <>
      <NavBar />
      <AlreadySignInContainer children={children} />
    </>
  );
};

export default AlreadySignInLayout;