const Button = ({ text, icon, className, onClick, href }) => {
  const mainClass =
    className +
    " hover:shadow-2xl hover:scale-110 flex text-center text-white rounded-xl p-3 mx-auto m-3 transition duration-500 transform ease-in-out box-shadow";

  return (
    <a
      className={mainClass}
      href={href}
      onClick={(e) => {
        if (e) e.preventDefault();
        onClick();
      }}
    >
      {icon && <p className="mx-2 my-auto">{icon}</p>}
      <p className="mx-auto">{text}</p>
    </a>
  );
};

Button.defaultProps = {
  onClick: () => {},
  href: "!#",
};

export default Button;
