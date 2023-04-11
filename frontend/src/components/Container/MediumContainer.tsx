const MediumComtainer = ({ children }: ChildrenProps) => {
  return (
    <div className="px-0 md:px-10 lg:px-16 2xl:px-32 grow flex relative z-0 bg-gray-100">
      <div className="py-4 md:py-16 px-8 md:px-8 bg-white shadow-lg	grow">
        {children}
      </div>
    </div>
  );
};

export default MediumComtainer;