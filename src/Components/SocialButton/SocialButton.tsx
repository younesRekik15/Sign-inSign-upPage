import "./SocialButton.css";

interface Promp {
  brandName: string;
  registrationType: string;
  brandLink: string;
  onClick?: () =>{};
  width?: {};
}

const SocialButton = ({ brandName, registrationType, brandLink, onClick, width = { width: "359px" } }: Promp) => {
  return (
    <button className="social-button" style={width} onClick={onClick}>
      <img
        className="icon"
        src={ brandLink }
      />
      <span className="not-small-screen-only">{registrationType} with</span>{" "}
      <span className="social-button-name">{brandName}</span>
    </button>
  );
};

export default SocialButton;
