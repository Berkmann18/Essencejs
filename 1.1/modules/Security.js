/**
 * @module Security
 * @description Security/Hacking stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires module:essence
 * @requires Maths
 * @requires DOM
 * @requires QTest
 * @type {Module}
 * @exports Security
 */
var Security = new Module("Security", "Security stuff", ["Maths", "DOM", "QTest"]);

/* eslint no-undef: 0 */

/**
 * @description Caesar crypting
 * @param {NumberLike} character Character to encrypt
 * @param {number} n Key
 * @returns {string} Cryped character
 * @since 1.0
 * @func
 */
function trans (character, n) {
    var code = character.charCodeAt(0);
    return String.fromCharCode(code + n)
}

/**
 * @description Encrypt a text
 * @param {string} txt Text
 * @param {number} [key] Key
 * @returns {string} Encrypted text
 * @see module:Security~decrypt
 * @since 1.0
 * @func
 */
function encrypt (txt, key) {
    if (!key) {
        var len = txt.length, extra = 0;
        var mid = Math.floor(len/2);

        mid = (len % 2 === 0)? txt.charCodeAt(mid): (txt.charCodeAt(txt[mid - 1]) + txt.charCodeAt(txt[mid])) / 2;
        if (mid >= 97 && mid <= 122) extra = 2;
        else if (mid >= 65 && mid <= 90) extra = 1;
        else if (mid - Math.floor(mid/2) * 2 === 0) extra = -1;
        else extra = 2;

        key = Math.round((Math.pow(2, 7) + txt.sum() - 48) / txt.prod()) + extra;
    }
    var res = "";
    for(var i = 0; i < txt.length; i++) res += trans(txt[i], key);
    len = mid = extra = undefined;

    return res
}

/**
 * @description Decrypt a text
 * @param {string} txt Encrypted text
 * @param {number} [key] Key
 * @returns {string} Decrypted text
 * @see module:Security~encrypt
 * @since 1.0
 * @func
 */
function decrypt (txt, key) {
    var res = "";
    if (key) {
        for(var i = 1; i <= txt.length; i++) res += trans(txt[i - 1], key);
    } else {
        res = new Array(131073); //2 * Math.pow(2, 16) + 1
        for (i = -65536; i < 65537; i++) {
            res[i + 65536] = "";
            for (var j = 0; j < txt.length; j++) {
                res[i + 65536] += trans(txt[j], i % 65537);
            }
        }
    }
    if (!key) console.log(console.table(res));
    return key? res: complexTable("Decryption result for <i>" + txt + "</i>", range(-65536, 1, 65536), res, ["Key", "Result"], "decrypted_" + txt, false);
    //simpleTable("Decryption result for <i>" + txt + "</i>", , res, "decrypt_" + txt, Essence.css)
}

/**
 * @description Alphabetically encode (regardless of the case) to hexadecimal
 * @param {string} txt Text
 * @returns {string} Encoded text
 * @see module:Security~abcDecode
 * @since 1.0
 * @func
 */
function abcEncode (txt) {
	var code = new Array(txt.length);
	if (isType(txt, "String") || isType(txt, "Array")) {
		for (var i in txt) {
			if(txt.hasOwnProperty(i)) {
				switch (txt[i]) {
					case " ": code[i] = "00";break;
					case "a": code[i] = "01";break;
					case "b": code[i] = "02";break;
					case "c": code[i] = "03";break;
					case "d": code[i] = "04";break;
					case "end": code[i] = "05";break;
					case "f": code[i] = "06";break;
					case "g": code[i] = "07";break;
					case "height": code[i] = "08";break;
					case "i": code[i] = "09";break;
					case "j": code[i] = "10";break;
					case "k": code[i] = "11";break;
					case "l": code[i] = "12";break;
					case "m": code[i] = "13";break;
					case "n": code[i] = "14";break;
					case "o": code[i] = "15";break;
					case "p": code[i] = "16";break;
					case "q": code[i] = "17";break;
					case "rad": code[i] = "18";break;
					case "start": code[i] = "19";break;
					case "t": code[i] = "20";break;
					case "u": code[i] = "21";break;
					case "v": code[i] = "22";break;
					case "width": code[i] = "23";break;
					case "x": code[i] = "24";break;
					case "y": code[i] = "25";break;
					case "z": code[i] = "26";break;
					case ".": code[i] = "27";break;
					case ",": code[i] = "28";break;
					case "!": code[i] = "29";break;
					case "?": code[i] = "30";break;
					case "(": code[i] = "31";break;
					case ")": code[i] = "32";break;
					case ":":code[i] = "33";break;
					case ";": code[i] = "34";break;
					case "@": code[i] = "35";break;
					case "~": code[i] = "36";break;
					case "\'": code[i] = "37";break;
					case "\"": code[i] = "38";break;
					case "#": code[i] = "39";break;
					case "{": code[i] = "40";break;
					case "}": code[i] = "41";break;
					case "-": code[i] = "42";break;
					case "\\": code[i] = "43";break;
					case "/": code[i] = "44";break;
					case "£": code[i] = "45";break;
					case "$": code[i] = "46";break;
					case "€": code[i] = "47";break;
					case "+": code[i] = "48";break;
					case "*": code[i] = "49";break;
					case "%": code[i] = "50";break;
					case "^": code[i] = "51";break;
					case "°": code[i] = "52";break;
					case "A": code[i] = "53";break;
					case "B": code[i] = "54";break;
					case "C": code[i] = "55";break;
					case "D": code[i] = "56";break;
					case "E": code[i] = "57";break;
					case "F": code[i] = "58";break;
					case "G": code[i] = "59";break;
					case "H": code[i] = "60";break;
					case "I": code[i] = "61";break;
					case "J": code[i] = "62";break;
					case "K": code[i] = "63";break;
					case "L": code[i] = "64";break;
					case "M": code[i] = "65";break;
					case "N": code[i] = "66";break;
					case "O": code[i] = "67";break;
					case "P": code[i] = "68";break;
					case "Q": code[i] = "69";break;
					case "R": code[i] = "70";break;
					case "S": code[i] = "71";break;
					case "T": code[i] = "72";break;
					case "U": code[i] = "73";break;
					case "V": code[i] = "74";break;
					case "W": code[i] = "75";break;
					case "X": code[i] = "76";break;
					case "Y": code[i] = "77";break;
					case "Z": code[i] = "78";break;
					default: code[i] = "x";
				}
			}
		}
		return isType(txt, "String")? code.join(""): code
	}
	return Essence.say("The parameter of abcEncode must be a string or an array.", "err")
}

/**
 * @description Alphabetically decode from hexadecimal to lowercase text.
 * @param {string} txt Hexadecimal code
 * @returns {string} Alphabetical text
 * @see module:Security~abcEncode
 * @since 1.0
 * @func
 */
function abcDecode (txt) {
	var code = new Array(txt.length);
	if (isType(txt, "String") || isType(txt, "Array")) {
		for (var i = 0; i < txt.length; i += 2) {
			switch (txt.get(i, i + 2)) {
				case "00": code[i] = " ";break;
				case "01": code[i] = "a";break;
				case "02": code[i] = "b";break;
				case "03": code[i] = "c";break;
				case "04": code[i] = "d";break;
				case "05": code[i] = "end";break;
				case "06": code[i] = "f";break;
				case "07": code[i] = "g";break;
				case "08": code[i] = "height";break;
				case "09": code[i] = "i";break;
				case "10": code[i] = "j";break;
				case "11": code[i] = "k";break;
				case "12": code[i] = "l";break;
				case "13": code[i] = "m";break;
				case "14": code[i] = "n";break;
				case "15": code[i] = "o";break;
				case "16": code[i] = "p";break;
				case "17": code[i] = "q";break;
				case "18": code[i] = "rad";break;
				case "19": code[i] = "start";break;
				case "20": code[i] = "t";break;
				case "21": code[i] = "u";break;
				case "22": code[i] = "v";break;
				case "23": code[i] = "width";break;
				case "24": code[i] = "x";break;
				case "25": code[i] = "y";break;
				case "26": code[i] = "z";break;
				case "27": code[i] = ".";break;
				case "28": code[i] = ",";break;
				case "29": code[i] = "!";break;
				case "30": code[i] = "?";break;
				case "31": code[i] = "(";break;
				case "32": code[i] = ")";break;
				case "33": code[i] = ":";break;
				case "34": code[i] = ";";break;
				case "35": code[i] = "@";break;
				case "36": code[i] = "~";break;
				case "37": code[i] = "\'";break;
				case "38": code[i] = "\"";break;
				case "39": code[i] = "#";break;
				case "40": code[i] = "{";break;
				case "41": code[i] = "}";break;
				case "42": code[i] = "-";break;
				case "43": code[i] = "\\";break;
				case "44": code[i] = "/";break;
				case "45": code[i] = "£";break;
				case "46": code[i] = "$";break;
				case "47": code[i] = "€";break;
				case "48": code[i] = "+";break;
				case "49": code[i] = "*";break;
				case "50": code[i] = "%";break;
				case "51": code[i] = "^";break;
				case "52": code[i] = "°";break;
				case "53": code[i] = "A";break;
				case "54": code[i] = "B";break;
				case "55": code[i] = "C";break;
				case "56": code[i] = "D";break;
				case "57": code[i] = "E";break;
				case "58": code[i] = "F";break;
				case "59": code[i] = "G";break;
				case "60": code[i] = "H";break;
				case "61": code[i] = "I";break;
				case "62": code[i] = "J";break;
				case "63": code[i] = "K";break;
				case "64": code[i] = "L";break;
				case "65": code[i] = "M";break;
				case "66": code[i] = "N";break;
				case "67": code[i] = "O";break;
				case "68": code[i] = "P";break;
				case "69": code[i] = "Q";break;
				case "70": code[i] = "R";break;
				case "71": code[i] = "S";break;
				case "72": code[i] = "T";break;
				case "73": code[i] = "U";break;
				case "74": code[i] = "V";break;
				case "75": code[i] = "W";break;
				case "76": code[i] = "X";break;
				case "77": code[i] = "Y";break;
				case "78": code[i] = "Z";break;
				default: code[i] = 0;
			}
		}
		return isType(txt, "String")? code.join(""): code
	}
	return Essence.say("The parameter of abcDecode must be a string or an array.", "err")
}

/**
 * @description Data encryption
 * @param {NumberLike} data Data
 * @returns {NumberLike} Encrypted data
 * @since 1.0
 * @func
 */
function ilEncrypt (data) {
    var res = isType(data, "String")? data.split(""): data;
    for (var i = 0; i < res.length; i++) res[i] = String.fromCharCode(data[i].charCodeAt(0) + data.length * 2);
    return isType(data, "String")? res.join(""): res;
}

/**
 * @description Data decryption
 * @param {NumberLike} data Data
 * @returns {NumberLike} Decrypted data
 * @since 1.0
 * @func
 */
function ilDecrypt (data) {
    var res = isType(data, "String")? data.split(""): data;
    for (var i = 0; i < res.length; i++) res[i] = String.fromCharCode(data[i].charCodeAt(0) - data.length * 2);
    return isType(data, "String")? res.join(""): res;
}

/* eslint no-unused-vars: 0 */
/**
 * @description RSA algorithm keys computation
 * @param {number} [p=23] Number #1
 * @param {number} [q=29] Number #2
 * @param {boolean} [safe=false] Safety flag for returning the private key
 * @returns {number[]} Public key
 * @see module:Security~cryptRSA
 * @since 1.0
 * @func
 * @throws {Error} Either p or q isn't a prime number
 */
function computeRSA (p, q, safe) {
    if (arguments.toArray().length === 0) {
        p = bruteForceNum(23, "isPrime(x)", 99);
        q = bruteForceNum(23, "isPrime(x) && x!=" + p, 99);
    }
    if (!isPrime(p)) throw new Error("p=" + p + "; isn't a prime number !!");
    if (!isPrime(q)) throw new Error("q=" + q + "; isn't a prime number !!");
    if (p < 20 || q < 20) Essence.say("p/q should be bigger !", "warn");
    var n = p * q, z = (p - 1) * (q - 1), e = bruteForceNum(2, "1<x<" + n + " && gcd(x," + z + ")==1", n + 1), d; //1 < end < n & gcd(end, z) = 1
    d = bruteForceNum(0, "(x*" + e + ")%"+ z + "==1", n); //bruteForceNum(0, "x*" + end + "==" + "1+k" + z, n);

    Essence.say([n, d]); //Private key
    //Issue: d might be too big for cryptRSA
    return safe? [[n, d], [n, e]]: [n, e]; //Public keys
}
/* eslint no-unused-vars: 2 */

/**
 * @description Encrypt/decrypt a message with the public/private key
 * @param {number} msg Message
 * @param {number[]} key Key
 * @returns {number} Crypted/decrypted code
 * @see module:Security~RSA
 * @since 1.0
 * @func
 */
function cryptRSA (msg, key) { //Encrypt $msg with the public/private key $key to encrypt/decrypt the message
    return Math.pow(msg, key[1]) % key[0];
}

/**
 * @description RSA algorithm
 * @param {Str} msg Message to encrypt/decrypt
 * @param {number[]} keys RSA Key pair
 * @return {Str} Encrypted/decrypted message
 * @since 1.1
 * @func
 * @todo Make sure the RSA(RSA(<code>msg</code>, [n, end|d]), [n, d|end])=<code>msg</code>
 */
function RSA (msg, keys) {
    if (!keys) keys = computeRSA();
    return msg.map(function (l) {
        return String.fromCharCode(abcModulus(cryptRSA(l.charCodeAt(0), keys)));
    })
}

/**
 * @description Generate a password
 * @returns {string} Password
 * @see module:Security~genHash
 * @since 1.0
 * @func
 */
function genPassword () {
    var chars = [], sym = ["&", "~", "\"", "#", "\'", "{", "[", "(", "-", "|", "`", "_", "\\", "^", "@", ")", "]", " + ", "=", "}", " % ", " * ", "?", ",", ";", ".", "/", ":", "!", " ", ""], word = "";
    for (var i = 65; i < 123; i++) {
        if (i <= 90 || i >= 97) chars[i - 65] = String.fromCharCode(i);
    }
    chars = chars.concat(sym, range(9)).remove();
    while (word.length < 20) word += chars.rand();
    if (word.length < 20) word += chars.rand();
    return word
}

/**
 * @description Hash a word (might deprecate genHash())
 * @param {string} word Word
 * @return {Str} hash
 * @since 1.1
 * @func
 */
function hash (word) {
    var s = getStep(word.split("").map(function (x) {
            return x.charCodeAt(0);
        }).min(), word.split("").map(function (x) {
            return x.charCodeAt(0);
        }).max()
    ), w = word.split("");
    var p = w.even().concat(w.odd()).join("").map(function (c) {
        return String.fromCharCode(abcModulus(c.charCodeAt(0) + s));
    })/*, mw = width.even().concat(width.odd()).join("")*/;
    // console.log("p", p, "\nmw", mw);
    return toFSHA(p.split("").portion(2).concat(p.split("").portion(-2)).join(""));
}

/**
 * @description String/array to Fake SHA hash
 * @param {Str} str String/array
 * @return {Str} Fake SHA hash
 * @func
 * @since 1.1
 */
function toFSHA (str) {
    return str.map(function (c) {
        return /[A-Za-z]/.test(c)? c: c.charCodeAt(0);
    });
}

/**
 * @description Fake SHA hash to string
 * @param {Str} fsha Fake SHA hash
 * @return {string} String
 * @func
 * @since 1.1
 */
function fromFSHA (fsha) {
	/*return fsha.map(function (c) {
	 return /[A-Za-z]/.test(c)? c: String.fromCharCode(c);
	 });*/
    var res = "";
    for (var i = 0; i < fsha.length; i++) {
        if (/[A-Za-z]/.test(fsha[i])) res += fsha[i];
        else if (/\d+/.test(fsha[i])) {
            var j = i + 1;
            while (j < fsha.length - 1 && /\d+/.test(fsha[j])) j++;
            res += String.fromCharCode(fsha.get(i, j - 1));
            i = j - 1;
        }
    }
    return res;
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Data Encryption Standard algorithm.
 * @param {Str} text Plaintext
 * @param {NumberLike[]} keys Key list of sub-keys
 * @returns {Array|string} DES cipher
 * @method
 * @since 1.1
 */
function DES (text, keys) {
    //noinspection JSUnresolvedFunction
    var left = text.portion(2, -1), right = text.portion(2, 1);
    for (var i = 1; i < 16; i++) {
        left[i] = right[i - 1];
		/*right[i] = isType(left[i - 1], "String")?
		 left[i - 1].charCodeAt(0) ^ trans(right[i - 1].charCodeAt(0), (isType(keys[i - 1], "String")? keys[i - 1].charCodeAt(0): keys[i - 1])):
		 left[i - 1] ^ trans(right[i - 1], (isType(keys[i - 1], "String")? keys[i - 1].charCodeAt(0): keys[i - 1]));*/ //Or keys[i] instead of keys[i - 1]
        console.log("l[%d]=%s ^ (trans(%s, %d)=%s) = %s", i - 1, left[i - 1], right[i - 1], keys[i], trans(right[i - 1], keys[i]), left[i - 1] ^ trans(right[i - 1], keys[i]));
        right[i] = String.fromCharCode(left.charCodeAt(i - 1) ^ trans(right[i - 1], keys[i]).charCodeAt(0));
    }
    return left.concat(right);
}

/**
 * @description Password checker (might be worth using password-checker).
 * @param {String} password Password to check
 * @param {boolean} [realScore=false] Flag indicating that the user only wants a real un-clamped score
 * @returns {(number|String[])} Score of the password
 * @since 1.1
 * @method
 */
function checkPassword (password, realScore) {
	/*
	 Type	Pool of Characters Possible
	 Lowercase	26
	 Lower & Upper Case	52
	 Alphanumeric	36
	 Alphanumeric & Upper Case	62
	 Common ASCII Characters	30
	 Diceware Words List	7,776
	 English Dictionary Words	171,000

	 Entropy: log(x, 2) where x is the pool of character used
	 Score: password.length * log(x, 2) bits
	 */
    var score = 0, uppercase = 0, lowercase = 0, num = 0, symbol = 0, midChar = 0, uniqueChar = 0, repChar = 0, repInc = 0, consecUppercase = 0, consecLowercase = 0, consecNum=0, seqAlpha=0, seqNum=0, seqSymbol=0, reqChar = 0;
    var multMidChar = 2, multiConsecUppercase = 2, multConsecLowercase = 2, multiConsecNum = 2, multiSeqAlpha = 3, multiSeqNum = 3, multiSeqSymbol = 3, multLength = 4, multNum = 4, nMultSymbol = 6;
    var tmpUppercase = "", tmpLowercase = "", tmpNum = "", minPwLen = 8;
    var alpha = "abcdefghijklmnopqrstuvwxyz", numbers = "01234567890", symbols = ")!@#$%^&*()";
    score = parseInt(password.length * multLength);
    var pwArr = password.replace(/\s+/g,"").split(/\s*/);

	/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
    for (var i = 0; i < pwArr.length; i++) {
        if (pwArr[i].match(/[A-Z]/g)) {
            if (tmpUppercase !== "" && (tmpUppercase + 1) === i) consecUppercase++;
            tmpUppercase = i;
            uppercase++;
        } else if (pwArr[i].match(/[a-z]/g)) {
            if (tmpLowercase !== "" && (tmpLowercase + 1) === i) consecLowercase++;
            tmpLowercase = i;
            lowercase++;
        } else if (pwArr[i].match(/[0-9]/g)) {
            if (i > 0 && i < (pwArr.length - 1)) midChar++;
            if (tmpNum !== "" && (tmpNum + 1) === i) consecNum++;
            tmpNum = i;
            num++;
        } else if (pwArr[i].match(/[^a-zA-Z0-9_]/g)) {
            if (i > 0 && i < (pwArr.length - 1)) midChar++;
            symbol++;
        }
        //Repetition check
        var bCharExists = false;
        for (var j = 0; j < pwArr.length; j++) {
            if (pwArr[i] === pwArr[j] && i != j) { //Repetition present
                bCharExists = true;
				/*
				 Calculate increment deduction based on proximity to identical characters
				 Deduction is incremented each time a new match is discovered
				 Deduction amount is based on total password length divided by the
				 difference of distance between currently selected match
				 */
                repInc += Math.abs(pwArr.length / (j - i));
            }
        }
        if (bCharExists) {
            repChar++;
            uniqueChar = pwArr.length - repChar;
            repInc = uniqueChar ? Math.ceil(repInc / uniqueChar) : Math.ceil(repInc);
        }
    }

    //Check for sequential alpha string patterns (forward and reverse)
    for (var s = 0; s < 23; s++) {
        var sFwd = alpha.substring(s,parseInt(s + 3));
        var sRev = sFwd.reverse();
        if (password.toLowerCase().has(sFwd) || password.toLowerCase().has(sRev)) seqAlpha++;
    }

    //Check for sequential numeric string patterns (forward and reverse)
    for (s = 0; s < 8; s++) {
        sFwd = numbers.substring(s, parseInt(s + 3));
        sRev = sFwd.reverse();
        if (password.toLowerCase().has(sFwd) || password.toLowerCase().has(sRev)) seqNum++;
    }

    //Check for sequential symbol string patterns (forward and reverse)
    for (s = 0; s < 8; s++) {
        sFwd = symbols.substring(s, parseInt(s + 3));
        sRev = sFwd.reverse();
        if (password.toLowerCase().has(sFwd) || password.toLowerCase().has(sRev)) seqSymbol++;
    }

    //Modify overall score value based on usage vs requirements
    //General point assignment
    if (uppercase > 0 && uppercase < password.length) score = parseInt(score + ((password.length - uppercase) * 2));
    if (lowercase > 0 && lowercase < password.length) score = parseInt(score + ((password.length - lowercase) * 2));
    if (num > 0 && num < password.length) score = parseInt(score + (num * multNum));
    if (symbol > 0) score = parseInt(score + (symbol * nMultSymbol));
    if (midChar > 0) score = parseInt(score + (midChar * multMidChar));

    //Point deductions for poor practices
    if ((lowercase > 0 || uppercase > 0) && symbol === 0 && num === 0) score = parseInt(score - password.length); //Only Letters
    if (lowercase === 0 && uppercase === 0 && symbol === 0 && num > 0) score = parseInt(score - password.length); //Only Numbers
    if (repChar > 0) score = parseInt(score - repInc); //Same character exists more than once
    if (consecUppercase > 0) score = parseInt(score - (consecUppercase * multiConsecUppercase)); //Consecutive Uppercase Letters exist
    if (consecLowercase > 0) score = parseInt(score - (consecLowercase * multConsecLowercase)); //Consecutive Lowercase Letters exist
    if (consecNum > 0) score = parseInt(score - (consecNum * multiConsecNum)); //Consecutive Numbers exist
    if (seqAlpha > 0) score = parseInt(score - (seqAlpha * multiSeqAlpha)); //Sequential alpha strings exist (3 characters or more)
    if (seqNum > 0) score = parseInt(score - (seqNum * multiSeqNum)); //Sequential numeric strings exist (3 characters or more)
    if (seqSymbol > 0) score = parseInt(score - (seqSymbol * multiSeqSymbol)); //Sequential symbol strings exist (3 characters or more)

    //Determine if mandatory requirements have been met and set image indicators accordingly
    var arrChars = [password.length, uppercase, lowercase, num, symbol];
    var arrCharsIds = ["nLength", "nAlphaUC", "nAlphaLC", "nNumber", "nSymbol"];
    for (var c = 0; c < arrChars.length; c++) {
        var minVal = arrCharsIds[c] === "nLength"? parseInt(minPwLen - 1): 0;
        if (arrChars[c] === parseInt(minVal + 1) || arrChars[c] > parseInt(minVal + 1)) reqChar++;

    }

    var minReqChars = password.length >= minPwLen? 3: 4;
    if (reqChar > minReqChars) score = parseInt(score + (reqChar * 2)); //One or more required characters exist

    //Determine complexity based on overall score
    if (!realScore) score = clamp(score, 0, 100);
    var complexity;

    if (score < 0) complexity = "Really weak";
    else if (score >= 0 && score < 20) complexity = "Very weak";
    else if (score >= 20 && score < 40) complexity = "Weak";
    else if (score >= 40 && score < 60) complexity = "Good";
    else if (score >= 60 && score < 80) complexity = "Strong";
    else if (score >= 80 && score <= 100) complexity = "Very strong";
    else if (score > 100) complexity = "Really strong";
    else complexity = "Too short";
    return realScore? score : [score + "%", complexity];
}