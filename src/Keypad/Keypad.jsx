import "./Keypad.css";

const Keypad = (props) => {
  return (
    <div className="keypad">
      <div className="keypad-display">
        {props.code !== "" ? props.code : "_ _ _ _ _"}
      </div>

      <div className="keypad-keys">
        {[...Array(9)].map((x, i) => (
          <div
            key={i}
            className="key"
            onClick={() => props.onKeyPress?.(i + 1)}
          >
            {i + 1}
          </div>
        ))}
        <div className="key clr-button" onClick={() => props.onClr()}>
          CLR
        </div>
        <div className="key" onClick={() => props.onKeyPress?.(0)}>
          0
        </div>
        <div className="key ok-button" onClick={() => props.onOk()}>
          OK
        </div>
      </div>
    </div>
  );
};

export default Keypad;
