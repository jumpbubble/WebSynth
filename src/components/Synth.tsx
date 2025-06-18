import Controller from "./Controller";
import {useState} from "react";
import Slider from "./Slider";

interface EmitterProps {
    audioCtx: any
}

// This component represents any number of oscillators controlled by one controller.
// This does need to be a separate component from Rack unless the scope of this project grows significantly, consider refactoring
const Synth = (props: EmitterProps) => {
    const osc1 = props.audioCtx.createOscillator();
    const gain1 = props.audioCtx.createGain();

    osc1.connect(gain1);
    gain1.connect(props.audioCtx.destination);
    gain1.gain.setValueAtTime(0, props.audioCtx.currentTime);
    osc1.start();

    const [volume, setVolume] = useState(100);
    let waveformNumber = 1;
    const setWaveform = (waveform: number) => {
        console.log(waveform, typeof waveform)
        let waveName = "sine";
        waveformNumber = waveform;
        switch (waveform) {
            case 1:
                waveName = "sine";
                break;
            case 2:
                waveName = "triangle";
                break;
            case 3:
                waveName = "square";
                break;
            case 4:
                waveName = "sawtooth";
                break;
        }
        osc1.type = waveName;
    }

    return (
        <>
            <div className="synth-container">
                <div className="synth">
                    <div className="settings">
                        <Slider id="volume" min={0} max={100} default={volume} setter={setVolume}/>
                        <Slider default={1} setter={setWaveform} max={4} min={1} id="waveform" waveform={true}/>
                    </div>
                </div>
            </div>
            <Controller oscillator={osc1} audioCtx={props.audioCtx} gainController={gain1} maxGain={volume/100}/>
        </>
    );
}

export default Synth;
