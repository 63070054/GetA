
const FilterBox = ({
  name,
  backgroundColor,
  textColor
}: FilterBoxProps) => {
  return (
    <div className={`${backgroundColor} ${textColor} px-6 py-2 rounded-lg`}>
      {name}
    </div>
  );
};

export default FilterBox;