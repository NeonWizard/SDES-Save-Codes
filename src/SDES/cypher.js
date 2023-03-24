// guh

/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var GFG = /** @class */ (function () {
  function GFG() {
    this.key = [1, 0, 1, 0, 0, 0, 0, 0, 1, 0];
    this.P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
    this.P8 = [6, 3, 7, 4, 8, 5, 10, 9];
    this.key1 = [0, 0, 0, 0, 0, 0, 0, 0];
    this.key2 = [0, 0, 0, 0, 0, 0, 0, 0];
    this.IP = [2, 6, 3, 1, 4, 8, 5, 7];
    this.EP = [4, 1, 2, 3, 2, 3, 4, 1];
    this.P4 = [2, 4, 3, 1];
    this.IP_inv = [4, 1, 3, 5, 7, 2, 8, 6];
    this.S0 = [
      [1, 0, 3, 2],
      [3, 2, 1, 0],
      [0, 2, 1, 3],
      [3, 1, 3, 2],
    ];
    this.S1 = [
      [0, 1, 2, 3],
      [2, 0, 1, 3],
      [3, 0, 1, 0],
      [2, 1, 0, 3],
    ];
  }
  GFG.prototype.key_generation = function () {
    var key_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 10; i++) {
      key_[i] = this.key[this.P10[i] - 1];
    }
    var Ls = [0, 0, 0, 0, 0];
    var Rs = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      Ls[i] = key_[i];
      Rs[i] = key_[i + 5];
    }
    var Ls_1 = this.shift(Ls, 1);
    var Rs_1 = this.shift(Rs, 1);
    for (let i = 0; i < 5; i++) {
      key_[i] = Ls_1[i];
      key_[i + 5] = Rs_1[i];
    }
    for (let i = 0; i < 8; i++) {
      this.key1[i] = key_[this.P8[i] - 1];
    }
    var Ls_2 = this.shift(Ls, 2);
    var Rs_2 = this.shift(Rs, 2);
    for (let i = 0; i < 5; i++) {
      key_[i] = Ls_2[i];
      key_[i + 5] = Rs_2[i];
    }
    for (let i = 0; i < 8; i++) {
      this.key2[i] = key_[this.P8[i] - 1];
    }
    console.info("Your Key-1 :");
    for (let i = 0; i < 8; i++) {
      console.info(this.key1[i] + " ");
    }
    console.info();
    console.info("Your Key-2 :");
    for (let i = 0; i < 8; i++) {
      console.info(this.key2[i] + " ");
    }
  };
  GFG.prototype.shift = function (ar, n) {
    while (n > 0) {
      var temp = ar[0];
      for (let i = 0; i < ar.length - 1; i++) {
        ar[i] = ar[i + 1];
      }
      ar[ar.length - 1] = temp;
      n--;
    }
    return ar;
  };
  GFG.prototype.encryption = function (plaintext) {
    var arr = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
      arr[i] = plaintext[this.IP[i] - 1];
    }
    var arr1 = this.function_(arr, this.key1);
    var after_swap = this.swap(arr1, (arr1.length / 2) | 0);
    var arr2 = this.function_(after_swap, this.key2);
    var ciphertext = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
      ciphertext[i] = arr2[this.IP_inv[i] - 1];
    }
    return ciphertext;
  };
  GFG.prototype.binary_ = function (val) {
    if (val === 0) return "00";
    else if (val === 1) return "01";
    else if (val === 2) return "10";
    else return "11";
  };
  GFG.prototype.function_ = function (ar, key_) {
    var l = [0, 0, 0, 0];
    var r = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      l[i] = ar[i];
      r[i] = ar[i + 4];
    }
    var ep = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
      ep[i] = r[this.EP[i] - 1];
    }
    for (let i = 0; i < 8; i++) {
      ar[i] = key_[i] ^ ep[i];
    }
    var l_1 = [0, 0, 0, 0];
    var r_1 = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      l_1[i] = ar[i];
      r_1[i] = ar[i + 4];
    }
    var row;
    var col;
    var val;
    row = /* parseInt */ parseInt("" + l_1[0] + l_1[3], 2);
    col = /* parseInt */ parseInt("" + l_1[1] + l_1[2], 2);
    console.log(parseInt("" + l_1[0] + l_1[3], 2));
    console.log(parseInt("" + l_1[1] + l_1[2], 2));
    val = this.S0[row][col];
    var str_l = this.binary_(val);
    row = /* parseInt */ parseInt("" + r_1[0] + r_1[3], 2);
    col = /* parseInt */ parseInt("" + r_1[1] + r_1[2], 2);
    val = this.S1[row][col];
    var str_r = this.binary_(val);
    var r_ = [0, 0, 0, 0];
    for (let i = 0; i < 2; i++) {
      var c1 = str_l.charAt(i);
      var c2 = str_r.charAt(i);
      r_[i] = c1.charCodeAt(0);
      r_[i + 2] = c2.charCodeAt(0);
    }
    var r_p4 = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      r_p4[i] = r_[this.P4[i] - 1];
    }
    for (let i = 0; i < 4; i++) {
      l[i] = l[i] ^ r_p4[i];
    }
    var output = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      output[i] = l[i];
      output[i + 4] = r[i];
    }
    return output;
  };
  GFG.prototype.swap = function (array, n) {
    var l = (function (s) {
      var a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    var r = (function (s) {
      var a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      l[i] = array[i];
      r[i] = array[i + n];
    }
    var output = (function (s) {
      var a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(2 * n);
    for (let i = 0; i < n; i++) {
      output[i] = r[i];
      output[i + n] = l[i];
    }
    return output;
  };
  GFG.prototype.decryption = function (ar) {
    var arr = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
      arr[i] = ar[this.IP[i] - 1];
    }
    var arr1 = this.function_(arr, this.key2);
    var after_swap = this.swap(arr1, (arr1.length / 2) | 0);
    var arr2 = this.function_(after_swap, this.key1);
    var decrypted = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
      decrypted[i] = arr2[this.IP_inv[i] - 1];
    }
    return decrypted;
  };
  GFG.main = function (args) {
    var obj = new GFG();
    obj.key_generation();
    var plaintext = [1, 0, 0, 1, 0, 1, 1, 1];
    console.info();
    console.info("Your plain Text is :");
    for (let i = 0; i < 8; i++) {
      console.info(plaintext[i] + " ");
    }
    var ciphertext = obj.encryption(plaintext);
    console.info();
    console.info("Your cipher Text is :");
    for (let i = 0; i < 8; i++) {
      console.info(ciphertext[i] + " ");
    }
    var decrypted = obj.decryption(ciphertext);
    console.info();
    console.info("Your decrypted Text is :");
    for (let i = 0; i < 8; i++) {
      console.info(decrypted[i] + " ");
    }
  };
  return GFG;
})();

GFG["__class"] = "GFG";
GFG.main(null);
