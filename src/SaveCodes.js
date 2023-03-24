import Keypad from "./Keypad/Keypad";

const SaveCodes = () => {
  return (
    <div>
      <h1 className="title">S-DES Gamestate Manager</h1>
      <hr style={{marginBottom: 40}} />

      {/* <GameSelector /> */}

      <div className="main-content">
        {/* Left side of screen */}
        <div>Hey</div>

        {/* Right side of screen */}
        <div>
        <Keypad />
        </div>
      </div>
    </div>
  );
}

export default SaveCodes;