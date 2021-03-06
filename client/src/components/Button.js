import classNames from 'classnames';

const Button = ({text,icon,className,onClick,href}) => {
    const mainClass = classNames(
        'hover:shadow-2xl hover:scale-110',
        className,
        `flex bg-gray-300 text-white bg-gray-600 rounded-xl p-3 mx-auto m-3
        transition duration-500 transform ease-in-out box-shadow`)
    return (
        <a 
        className = {mainClass}
        href = {href}
        onClick={(e)=>{e.preventDefault();onClick()}} 
        >
            {icon && <p className="mx-2 my-auto">{icon}</p>}<p>{text}</p>
        </a>
    )
}

Button.defaultProps = {
    onClick: () => {},
    href: "!#"
}

export default Button;