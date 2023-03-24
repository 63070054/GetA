const AlreadySignInContainer = ({ children }: ChildrenProps) => {
  return (
    <div className="px-4 py-4 md:px-48 md:py-16 grow flex">
      {children}
    </div>
  );
};

export default AlreadySignInContainer;