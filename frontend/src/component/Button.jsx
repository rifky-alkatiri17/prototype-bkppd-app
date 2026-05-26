import "./css/button.css";

function Button({ text }) {
    return (
        <button className="btn">
            {text}
        </button>
    );
}

export default Button;