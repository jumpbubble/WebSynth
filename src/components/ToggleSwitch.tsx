import "./ToggleSwitch.scss";

const animatedToggle = () => {

}

const ToggleSwitch = () => {
    return (
        <button className="toggle-container" onClick={animatedToggle}>
            <div className="text">ON</div>
            <div className="toggle-ring">
                <div className="toggle">
                    <div className="toggle-btn" ></div>
                </div>
            </div>
            <div className="text">OFF</div>
        </button>
    );
}

export default ToggleSwitch;
