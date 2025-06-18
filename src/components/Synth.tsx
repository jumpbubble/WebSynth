import Controller from "./Controller";
import {useState} from "react";
import Slider from "./Slider";

interface EmitterProps {
    audioCtx: any
}

// This component represents any number of oscillators controlled by one controller.
// This does need to be a separate component from Rack unless the scope of this project grows significantly, consider refactoring
const Synth = (props: EmitterProps) => {
    const oscA = props.audioCtx.createOscillator();
    const oscB = props.audioCtx.createOscillator();
    const gainA = props.audioCtx.createGain(); // master volume
    const gainB = props.audioCtx.createGain();

    oscA.connect(gainA);
    oscB.connect(gainB);
    gainB.connect(gainA); // connect oscillator B volume to master volume
    gainA.connect(props.audioCtx.destination);
    gainA.gain.setValueAtTime(0, props.audioCtx.currentTime);
    oscA.start();
    oscB.start();

    const [volume, setVolume] = useState(100);
    const [volumeB, setVolumeB] = useState(0);
    let waveformNumber = 1;
    let waveformNumberB = 1;
    const setWaveform = (waveform: number, osc: any) => {
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
        osc.type = waveName;
    }
    const setWaveformA = (waveform: number) => {setWaveform(waveform, oscA)};
    const setWaveformB = (waveform: number) => {setWaveform(waveform, oscB)};

    return (
        <>
            <div className="synth-container">
                <div className="synth">
                    <div className="settings">
                        <Slider id="volume" min={0} max={100} default={volume} setter={setVolume}/>
                        <Slider default={1} setter={setWaveformA} max={4} min={1} id="waveform" name="waveformA"/>
                        <Slider default={1} setter={setWaveformB} max={4} min={1} id="waveform" name="waveformB"/>
                    </div>
                </div>
            </div>
            <Controller oscillator={oscA}
                        oscillatorB={oscB}
                        audioCtx={props.audioCtx}
                        gainMaster={gainA}
                        gainB={gainB}
                        maxGainB={volume/100}
                        enableB
                        maxGain={volume/100}/>
        </>
    );
}

export default Synth;
