import "./Rack.scss";

interface SliderProps {
    default: any
    setter: any
    max: number
    min: number
    id: string
    name?: string
    waveform?: boolean
}

// vertical slider
const Slider = (props: SliderProps) => {

    return (
        <div className="knob">
            <label>
                {props.name || props.id}
            </label>
            <div className="slider-super-container">
                <div className="slider-container">
                    <input defaultValue={props.default} className="slider" type="range" id={props.id} name={props.id} min={props.min} max={props.max} onChange={e => {
                        props.setter(parseInt(e.target.value))
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default Slider;
