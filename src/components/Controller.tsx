// helper component
interface PianoKeyProps {
    // note name
    name: string
    // frequency in Hz
    frequency: number
    playFunction: any
    stopFunction?: any
    sharp?: boolean

}
const PianoKey = (props: PianoKeyProps) => {
    return (
        <input type="button" className={"piano-key" + (props.sharp ? " black-key " : " white-key ") + props.name}
                onMouseDown={() => props.playFunction(props.frequency)}
                onMouseUp={props.stopFunction}>
        </input>
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

    // play for use on mouse down, use holdStop onMouseUp or note will play indefinitely
    const holdPlay = (note:number) => {
        try {
            props.oscillator.frequency.setValueAtTime(note, props.audioCtx.currentTime); // value in hertz
            props.gainController.gain.setValueAtTime(props.maxGain, props.audioCtx.currentTime);
        }
        catch (err) {
            window.alert("Error:" + err)
        }
    }
    // stop playing a note
    const holdStop = () => {
        try {
            props.gainController.gain.setValueAtTime(0, props.audioCtx.currentTime);
        }
        catch (err) {
            window.alert("Error:" + err)
        }
    }

    // plays a note for timerLength ms on trigger, uses js timeout
    const timedPlay = (note: number, timerLength: number) => {
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
                <PianoKey name="c" frequency={c3} playFunction={holdPlay} stopFunction={holdStop}/>
                <PianoKey name="cs" frequency={cs3} playFunction={holdPlay} stopFunction={holdStop} sharp/>
                <PianoKey name="d" frequency={d3} playFunction={holdPlay} stopFunction={holdStop} />
                <PianoKey name="ds" frequency={ds3} playFunction={holdPlay} stopFunction={holdStop} sharp/>
                <PianoKey name="e" frequency={e3} playFunction={holdPlay} stopFunction={holdStop} />
                <PianoKey name="f" frequency={f3} playFunction={holdPlay} stopFunction={holdStop} />
                <PianoKey name="fs" frequency={fs3} playFunction={holdPlay} stopFunction={holdStop} sharp/>
                <PianoKey name="g" frequency={g3} playFunction={holdPlay} stopFunction={holdStop} />
                <PianoKey name="gs" frequency={gs3} playFunction={holdPlay} stopFunction={holdStop} sharp/>
                <PianoKey name="a" frequency={a3} playFunction={holdPlay} stopFunction={holdStop} />
                <PianoKey name="as" frequency={as3} playFunction={holdPlay} stopFunction={holdStop} sharp/>
                <PianoKey name="b" frequency={b3} playFunction={holdPlay} stopFunction={holdStop} />

                <PianoKey name="c" frequency={c3*2} playFunction={holdPlay} stopFunction={holdStop}/>
                <PianoKey name="cs" frequency={cs3*2} playFunction={holdPlay} stopFunction={holdStop} sharp/>
                <PianoKey name="d" frequency={d3*2} playFunction={holdPlay} stopFunction={holdStop} />
                <PianoKey name="ds" frequency={ds3*2} playFunction={holdPlay} stopFunction={holdStop} sharp/>
                <PianoKey name="e" frequency={e3*2} playFunction={holdPlay} stopFunction={holdStop} />
            </ul>
        </div>
    );
}

export default Controller;
