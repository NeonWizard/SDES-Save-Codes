function p10(inputKey) {
  var outputKey = [];
  var permutation = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
  var i = 0;
  var keyLength = 10;

  if (inputKey.length !== keyLength) {
    return -1;
  }

  for (i = 0; i < keyLength; i++) {
    outputKey.push(inputKey[permutation[i] - 1]);
  }

  return outputKey;
}

function p8(inputKey) {
  var outputKey = [];
  var permutation = [6, 3, 7, 4, 8, 5, 10, 9];
  var i = 0;
  var inputKeyLength = 10;
  var outputKeyLength = 8;

  if (inputKey.length !== inputKeyLength) {
    return -1;
  }

  for (i = 0; i < outputKeyLength; i++) {
    outputKey.push(inputKey[permutation[i] - 1]);
  }

  return outputKey;
}

function splitString(inputString) {
  var leftString = [];
  var rightString = [];
  var stringLength = inputString.length;
  var midPoint;

  if (stringLength % 2 === 1) {
    return -1;
  }

  midPoint = stringLength / 2;
  leftString = inputString.slice(0, midPoint);
  rightString = inputString.slice(midPoint, stringLength);

  return {
    leftString: leftString,
    rightString: rightString,
  };
}

function leftShift(inputKey, shiftLength) {
  var outputKey = [];
  var i = 0;
  var keyLength = inputKey.length;

  if (keyLength < 1) {
    return -1;
  }

  for (i = 0; i < keyLength; i++) {
    outputKey.push(inputKey[(i + shiftLength) % keyLength]);
  }

  return outputKey;
}

function ip(inputString) {
  var outputString = [];
  var permutation = [2, 6, 3, 1, 4, 8, 5, 7];
  var i = 0;
  var stringLength = 8;

  if (inputString.length !== stringLength) {
    return -1;
  }

  for (i = 0; i < stringLength; i++) {
    outputString.push(inputString[permutation[i] - 1]);
  }

  return outputString;
}

function ipInverse(inputString) {
  var outputString = [];
  var permutation = [4, 1, 3, 5, 7, 2, 8, 6];
  var i = 0;
  var stringLength = 8;

  if (inputString.length !== stringLength) {
    return -1;
  }

  for (i = 0; i < stringLength; i++) {
    outputString.push(inputString[permutation[i] - 1]);
  }

  return outputString;
}

function ep(inputString) {
  var outputString = [];
  var permutation = [4, 1, 2, 3, 2, 3, 4, 1];
  var i = 0;
  var inputStringLength = 4;
  var outputStringLength = 8;

  if (inputString.length !== inputStringLength) {
    return -1;
  }

  for (i = 0; i < outputStringLength; i++) {
    outputString.push(inputString[permutation[i] - 1]);
  }

  return outputString;
}

function p4(inputString) {
  var outputString = [];
  var permutation = [2, 4, 3, 1];
  var i = 0;
  var stringLength = 4;

  if (inputString.length !== stringLength) {
    return -1;
  }

  for (i = 0; i < stringLength; i++) {
    outputString.push(inputString[permutation[i] - 1]);
  }

  return outputString;
}

function sbox(inputString, sboxIndex) {
  var sboxDefinition = [
    [
      [
        [[0], [1]],
        [[0], [0]],
        [[1], [1]],
        [[1], [0]],
      ],
      [
        [[1], [1]],
        [[1], [0]],
        [[0], [1]],
        [[0], [0]],
      ],
      [
        [[0], [0]],
        [[1], [0]],
        [[0], [1]],
        [[1], [1]],
      ],
      [
        [[1], [1]],
        [[0], [1]],
        [[1], [1]],
        [[1], [0]],
      ],
    ],

    [
      [
        [[0], [0]],
        [[0], [1]],
        [[1], [0]],
        [[1], [1]],
      ],
      [
        [[1], [0]],
        [[0], [0]],
        [[0], [1]],
        [[1], [1]],
      ],
      [
        [[1], [1]],
        [[0], [0]],
        [[0], [1]],
        [[0], [0]],
      ],
      [
        [[1], [0]],
        [[0], [1]],
        [[0], [0]],
        [[1], [1]],
      ],
    ],
  ];

  var outputString = [];
  var row;
  var col;

  if (inputString.length !== 4) {
    return -1;
  }

  row = (inputString[0] << 1) + inputString[3];
  col = (inputString[1] << 1) + inputString[2];

  outputString = sboxDefinition[sboxIndex][row][col];

  return outputString;
}

function sdesKeyGenerator(inputKey) {
  var inputKeyLength = 10;
  var afterP10Key;
  var leftKey;
  var rightKey;
  var splitKeyContainer;
  var outputKey1;
  var outputKey2;

  if (inputKey.length !== inputKeyLength) {
    return -1;
  }

  afterP10Key = p10(inputKey);

  splitKeyContainer = splitString(afterP10Key);
  leftKey = splitKeyContainer.leftString;
  rightKey = splitKeyContainer.rightString;

  leftKey = leftShift(leftKey, 1);
  rightKey = leftShift(rightKey, 1);

  outputKey1 = p8(leftKey.concat(rightKey));

  leftKey = leftShift(leftKey, 2);
  rightKey = leftShift(rightKey, 2);

  outputKey2 = p8(leftKey.concat(rightKey));

  return {
    k1: outputKey1,
    k2: outputKey2,
  };
}

function mappingFunction(inputString, key, currentRoundNumber) {
  var keyLength = key.length;
  var outputString;
  var postEPString;
  var leftString;
  var rightString;
  var sboxLeft;
  var sboxRight;
  var tempString;
  var tempObject;
  var i = 0;

  postEPString = ep(inputString);

  for (i = 0; i < keyLength; i++) {
    postEPString[i] = postEPString[i] ^ key[i];
  }

  tempObject = splitString(postEPString);

  leftString = tempObject.leftString;
  rightString = tempObject.rightString;

  sboxLeft = sbox(leftString, 0);
  sboxRight = sbox(rightString, 1);

  tempString = sboxLeft.concat(sboxRight);

  outputString = p4(tempString);

  return outputString;
}

function roundFunction(leftString, rightString, key, currentRoundNumber) {
  var keyLength = 4;
  var mappingFunctionResult;

  mappingFunctionResult = mappingFunction(rightString, key, currentRoundNumber);

  for (let i = 0; i < keyLength; i++) {
    leftString[i] = leftString[i] ^ mappingFunctionResult[i];
  }

  return {
    leftString: leftString,
    rightString: rightString,
  };
}

function sdes(inputText, key, encryptFlag) {
  var leftText;
  var rightText;
  var roundKeys = [];
  var objectHolder;
  var outputText;
  var postIPText;
  var i;

  objectHolder = sdesKeyGenerator(key);
  roundKeys.push(objectHolder.k1);
  roundKeys.push(objectHolder.k2);

  postIPText = ip(inputText);

  rightText = postIPText.slice(4, 8);
  leftText = postIPText.slice();
  leftText.splice(4, 4);

  //Perform the round function twice, and the switch function in between
  for (i = 0; i < 2; i++) {
    if (encryptFlag) {
      objectHolder = roundFunction(leftText, rightText, roundKeys[i], i + 1);
    } else {
      objectHolder = roundFunction(
        leftText,
        rightText,
        roundKeys[1 - i],
        i + 1
      );
    }

    if (i < 1) {
      //if the current round is not the last, switch
      objectHolder = {
        leftString: objectHolder.rightString,
        rightString: objectHolder.leftString,
      };
      leftText = objectHolder.leftString;
      rightText = objectHolder.rightString;
    }
  }

  outputText = objectHolder.leftString.concat(objectHolder.rightString);
  outputText = ipInverse(outputText);

  return outputText;
}

// const bitArray = sdes("00000111", "1111110110");
// let out = 0;
// for (let i = 0; i < 8; i++) {
//   out += bitArray[i] << (7 - i);
// }
// console.log(bitArray);
// console.log(out);

function encrypt(inputText, key) {
  return sdes(inputText, key, true);
}

function decrypt(inputText, key) {
  return sdes(inputText, key, false);
}

export { encrypt, decrypt };
