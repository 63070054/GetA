
const GuideLineContainer = ({ children }: ChildrenProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 grid-auto-rows'>
      {children}
    </div>
  );
};

export default GuideLineContainer;