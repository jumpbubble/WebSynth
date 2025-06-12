import Controller from "./Controller";
import {useState} from "react";

interface EmitterProps {
    audioCtx: any
}

// This component represents any number of oscillators controlled by one controller.
const Synth = (props: EmitterProps) => {
    const osc1 = props.audioCtx.createOscillator();
    const gain1 = props.audioCtx.createGain();

    osc1.connect(gain1);
    gain1.connect(props.audioCtx.destination);
    gain1.gain.setValueAtTime(0, props.audioCtx.currentTime);
    osc1.start();

    const [volume, setVolume] = useState(100);
    const setWaveform = (waveform: string) => {
        osc1.type = waveform;
    }

    return (
        <>
            <div className="synth-container">
                <div className="synth">
                    <div className="settings">
                        <div className="knob">
                            volume
                            <input type="range" id="volume" name="volume" min="0" max="100" value={volume} onChange={e => {
                                setVolume(parseInt(e.target.value))
                            }}/>
                        </div>
                        <select className="selector" onChange={e => setWaveform(e.target.value)}>
                            <option value="sine">Sine</option>
                            <option value="triangle">Triangle</option>
                            <option value="sawtooth">Saw</option>
                            <option value="square">Square</option>
                        </select>
                    </div>
                </div>
            </div>
            <Controller oscillator={osc1} audioCtx={props.audioCtx} gainController={gain1} maxGain={volume/100}/>
        </>
    );
}

export default Synth;
