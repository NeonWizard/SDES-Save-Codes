import "./Keypad.css";

const Keypad = () => {
  return (
    <div className="keypad">
      <div className="keypad-display">12345</div>

      <div className="keypad-keys">
        <div className="key">1</div>
        <div className="key">2</div>
        <div className="key">3</div>
        <div className="key">4</div>
        <div className="key">5</div>
        <div className="key">6</div>
        <div className="key">7</div>
        <div className="key">8</div>
        <div className="key">9</div>
        <div></div>
        <div className="key">0</div>
      </div>
    </div>
  );
}

export default Keypad;
