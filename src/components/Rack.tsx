import '../App.scss';
import Synth from "./Synth";
import "./Rack.scss";

// This component represents the layout of all the generators on the page.
const Rack = () => {

    let audioCtx;

    try {
        audioCtx =
            new (window.AudioContext)();
    } catch (error) {
        return (
            <div>Sorry, but your browser doesn't support the Web Audio API! :(</div>
        )
    }

    // I am having some internal architecture issues, I want the ability to have multiple controllers per
    // oscillator, but I also want to
    return (
        <div className="rack">
            <span className="branding">
                WebSynth
            </span>
            <Synth audioCtx={audioCtx} />
        </div>
    );
}

export default Rack;
