
const IconContainer = ({ children }: ChildrenProps) => {
  return (
    <div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-12'>
      {children}
    </div>
  );
};

export default IconContainer;