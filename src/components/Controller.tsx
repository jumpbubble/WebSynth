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
        <li className={"piano-key" + (props.sharp ? " black-key " : " white-key ") + props.name}
                onClick={() => props.playFunction(props.frequency)}>
        </li>
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

    // holds the timeout to be referenced whenever a new note plays
    // setTimeout is not precise enough for sequencing, but is fine for this use case
    let timer: any;

    const togglePlay = (note: number) => {
        try {
            props.oscillator.frequency.setValueAtTime(note, props.audioCtx.currentTime); // value in hertz
            window.clearTimeout(timer);
            props.gainController.gain.setValueAtTime(props.maxGain, props.audioCtx.currentTime);
            timer = setTimeout(
                () => props.gainController.gain.setValueAtTime(0, props.audioCtx.currentTime),
                2000
            );
        }
        catch (err) {
            window.alert("Error:" + err)
        }
    }

    return (
        <div className="controller">
            <ul className="piano-keys">
                <PianoKey name="c" frequency={c3} playFunction={togglePlay}/>
                <PianoKey name="cs" frequency={cs3} playFunction={togglePlay} sharp/>
                <PianoKey name="d" frequency={d3} playFunction={togglePlay} />
                <PianoKey name="ds" frequency={ds3} playFunction={togglePlay} sharp/>
                <PianoKey name="e" frequency={e3} playFunction={togglePlay} />
                <PianoKey name="f" frequency={f3} playFunction={togglePlay} />
                <PianoKey name="fs" frequency={fs3} playFunction={togglePlay} sharp/>
                <PianoKey name="g" frequency={g3} playFunction={togglePlay} />
                <PianoKey name="gs" frequency={gs3} playFunction={togglePlay} sharp/>
                <PianoKey name="a" frequency={a3} playFunction={togglePlay} />
                <PianoKey name="as" frequency={as3} playFunction={togglePlay} sharp/>
                <PianoKey name="b" frequency={b3} playFunction={togglePlay} />

                <PianoKey name="c" frequency={c3*2} playFunction={togglePlay}/>
                <PianoKey name="cs" frequency={cs3*2} playFunction={togglePlay} sharp/>
                <PianoKey name="d" frequency={d3*2} playFunction={togglePlay} />
                <PianoKey name="ds" frequency={ds3*2} playFunction={togglePlay} sharp/>
                <PianoKey name="e" frequency={e3*2} playFunction={togglePlay} />
            </ul>
        </div>
    );
}

export default Controller;
