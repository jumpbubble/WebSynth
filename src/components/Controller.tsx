// helper component
interface PianoKeyProps {
    // note name
    name: string
    // frequency in Hz
    frequency: number
    playFunction: any
    sharp?: boolean

}
const PianoKey = (props: PianoKeyProps) => {
    return (
        <button className={props.sharp ? "black-key" : "white-key"}
                onClick={() => props.playFunction(props.frequency)}>
            {props.name}
        </button>
    )
}

// This component represents a keyboard input
interface ControllerProps {
    oscillator: any
    audioCtx: any
    gainController: any
    maxGain: number
}
const Controller = (props: ControllerProps) => {
    // note frequency values
    const c3 = 130.81; // C3
    const cs3 = 138.59; // C#3
    const d3 = 146.83;
    const ds3 = 155.56;
    const e3 = 164.81;
    const f3 = 174.61;
    const fs3 = 185.0;
    const g3 = 196.0;
    const gs3 = 207.65;
    const a3 = 220.0;
    const as3 = 233.08;
    const b3 = 246.94;
    const c4 = 261.63;

    const togglePlay = (note: number) => {
        try {
            props.oscillator.frequency.setValueAtTime(note, props.audioCtx.currentTime); // value in hertz
            props.gainController.gain.setValueAtTime(props.maxGain, props.audioCtx.currentTime);
            props.gainController.gain.setValueAtTime(0, props.audioCtx.currentTime + 1);
        }
        catch (err) {
            window.alert("Error:" + err)
        }
    }


    return (
        <div className="keyboard">
            <PianoKey name="C3" frequency={c3} playFunction={togglePlay}/>
            <PianoKey name="C#3" frequency={cs3} playFunction={togglePlay} sharp/>
            <PianoKey name="D3" frequency={d3} playFunction={togglePlay} />
            <PianoKey name="D#3" frequency={ds3} playFunction={togglePlay} sharp/>
            <PianoKey name="E3" frequency={e3} playFunction={togglePlay} />
            <PianoKey name="F3" frequency={f3} playFunction={togglePlay} />
            <PianoKey name="F#3" frequency={fs3} playFunction={togglePlay} sharp/>
            <PianoKey name="G3" frequency={g3} playFunction={togglePlay} />
            <PianoKey name="G#3" frequency={gs3} playFunction={togglePlay} sharp/>
            <PianoKey name="A3" frequency={a3} playFunction={togglePlay} sharp/>
            <PianoKey name="A#3" frequency={as3} playFunction={togglePlay} sharp/>
            <PianoKey name="B3" frequency={b3} playFunction={togglePlay} />
            <PianoKey name="C4" frequency={c4} playFunction={togglePlay} />
        </div>
    );
}

export default Controller;
