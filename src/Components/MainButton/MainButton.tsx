import "./MainButton.css";

interface Promp {
  children: string;
  width?: {};
  onClick?: () => {};
}

const MainButton = ({onClick, children, width = { width: "388px" } }: Promp) => {
  return (
    <button className="main-button" style={width} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default MainButton;
