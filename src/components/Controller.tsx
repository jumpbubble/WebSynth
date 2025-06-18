// helper component
import {useState} from "react";

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
        <input type="button" id={`key-${props.frequency}Hz`} className={"piano-key" + (props.sharp ? " black-key " : " white-key ") + props.name}
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
    // could rework this to be based on mathematical equal temperament (n*2^(m/12)) if I wanted to be annoying about it
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

    // keyboard input

    const keyMap = new Map();
    keyMap.set("KeyA", c3);
    keyMap.set("KeyW", cs3);
    keyMap.set("KeyS", d3);
    keyMap.set("KeyE", ds3);
    keyMap.set("KeyD", e3);

    keyMap.set("KeyF", f3);
    keyMap.set("KeyT", fs3);
    keyMap.set("KeyG", g3);
    keyMap.set("KeyY", gs3);
    keyMap.set("KeyH", a3);
    keyMap.set("KeyU", as3);
    keyMap.set("KeyJ", b3);

    keyMap.set("KeyK", 2*c3);
    keyMap.set("KeyO", 2*cs3);
    keyMap.set("KeyL", 2*d3);
    keyMap.set("KeyP", 2*ds3);
    keyMap.set("Semicolon", 2*e3);

    // remember the first key pressed so one can subsequently press keys and release without the note stopping
    // I wanted to make this a state variable just in case, but it caused some issues with asynchronicity
    // additionally, it would be nice to replace this with an ordered list of every note played, that functions
    //   somewhat like a stack, so that every note release would play the most recently-added unreleased note
    //   but this feels like overkill right now.
    let firstNote: number | null = null;

    // check if the key being released is the first key pressed and unreleased
    // if it is, stop playing, if not, play the original unreleased note
    const holdStopTyped = (key: KeyboardEvent) => {
        if (keyMap.get(key.code)) {
            let note = keyMap.get(key.code);
            if (note === firstNote) {
                holdStop();
                firstNote = null;
            }
            else {
                props.oscillator.frequency.setValueAtTime(firstNote || 0, props.audioCtx.currentTime);
            }
            let keyElement = document.getElementById(`key-${note}Hz`);
            if (keyElement) {
                if (keyElement.className.includes("black-key")){
                    keyElement.style.backgroundColor = "#171717"; // default black color todo change if styles change
                }
                else {
                    keyElement.style.backgroundColor = "#D4D2D5"; // default white color todo change if styles change
                }
            }
        }
    }

    // when a note is played by keypress, run the play function
    const typeNote = (key: KeyboardEvent) => {
        if (keyMap.get(key.code)) {
            let note = keyMap.get(key.code);
            if (firstNote === null) {
                firstNote = note;
            }
            holdPlay(note);
            // highlight keyboard note
            let keyElement = document.getElementById(`key-${note}Hz`);
            if (keyElement) {
                keyElement.style.backgroundColor = "#7B68EE"; // Active bg color todo change if styles change
            }
        }
    }

    window.addEventListener("keydown", (event) => typeNote(event));
    window.addEventListener("keyup", (event) => holdStopTyped(event));

    // TODO: fix keyboard input ignoring volume and waveform

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
