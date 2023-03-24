import { useEffect, useState } from "react";
import Keypad from "./Keypad/Keypad";
import { intToByteArray } from "./utils/utils";
import { decrypt, encrypt } from "./SDES/SDES2";

const SaveCodes = () => {
  const [playerKey, setPlayerKey] = useState(localStorage.getItem("playerKey"));

  const [decodeValue, setDecodeValue] = useState("");
  const [encodeValue, setEncodeValue] = useState("");

  useEffect(() => {
    localStorage.setItem("playerKey", playerKey);
  }, [playerKey]);

  const doEncode = () => {
    if (decodeValue.length !== 5 || parseInt(decodeValue) > Math.pow(2, 16)) {
      // TODO: Error
      return;
    }

    const byteArray = intToByteArray(parseInt(decodeValue));

    const bin1 = byteArray[0].toString(2).padStart(8, "0");
    const bin2 = byteArray[1].toString(2).padStart(8, "0");

    const encBin1 = encrypt(bin1, playerKey);
    const encBin2 = encrypt(bin2, playerKey);

    const enc1 = parseInt(encBin1.join(""), 2);
    const enc2 = parseInt(encBin2.join(""), 2);

    const encrypted = (enc2 << 8) | enc1;

    setEncodeValue(encrypted.toString().padStart(5, "0"));
    setDecodeValue("");
  };

  const doDecode = () => {
    if (encodeValue.length !== 5 || parseInt(encodeValue) > Math.pow(2, 16)) {
      // TODO: Error
      return;
    }

    const byteArray = intToByteArray(parseInt(encodeValue));

    const bin1 = byteArray[0].toString(2).padStart(8, "0");
    const bin2 = byteArray[1].toString(2).padStart(8, "0");

    const encBin1 = decrypt(bin1, playerKey);
    const encBin2 = decrypt(bin2, playerKey);

    const enc1 = parseInt(encBin1.join(""), 2);
    const enc2 = parseInt(encBin2.join(""), 2);

    const decrypted = (enc2 << 8) | enc1;

    setDecodeValue(decrypted.toString().padStart(5, "0"));
    setEncodeValue("");
  };

  return (
    <div>
      <h1 className="title">S-DES Save State Manager</h1>
      <hr style={{ marginBottom: 14 }} />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <label>Game: </label>
          <select>
            <option>LIDAR</option>
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Player Key: </label>
          <input
            style={{ borderColor: playerKey?.length !== 10 ? "red" : "lime" }}
            value={playerKey}
            onInput={(e) => {
              setPlayerKey((e.target.value.match(/[0|1]+/) || []).pop() || "");
            }}
            maxLength={10}
            size={10}
          ></input>
        </div>
      </div>

      <hr style={{ marginTop: 20 }} />

      <div className="main-content">
        {/* Left side of screen */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginBottom: "12px" }}>Decoded</h1>
          <Keypad
            code={decodeValue}
            onKeyPress={(num) =>
              setDecodeValue((decodeValue + num).slice(0, 5))
            }
            onClr={() => setDecodeValue("")}
            onOk={() => doEncode()}
          />
        </div>

        {/* Right side of screen */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginBottom: "12px" }}>Encoded</h1>
          <Keypad
            code={encodeValue}
            onKeyPress={(num) =>
              setEncodeValue((encodeValue + num).slice(0, 5))
            }
            onClr={() => setEncodeValue("")}
            onOk={() => doDecode()}
          />
        </div>
      </div>
    </div>
  );
};

export default SaveCodes;
