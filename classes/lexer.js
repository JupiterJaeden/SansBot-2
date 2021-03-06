class Lexer {
  separator; 

  //The separator string is a collection of characters, all of which are recognized as valid separators. 
  //For example, " \n" would recognize both " " and "\n" as valid separators 
  constructor(separator) {
    this.separator = separator; 
  }

  /*Takes a string and returns an array of tokens, all with separators removed  
  Valid tokens are: 
  Words 
  "Words or phrases inside quotes"
  */
  tokenizeString(str) { 
    let stream = new StreamWrapper(str); 
    let tokens = []; 

    while (!stream.input.eof()) {
      //Skipping all separators until next token 
      stream.skipCharsWhile(this.separator); 

      let peek = stream.input.peek(); 
      if (peek == "\"") { 
        //Get everything until closing quote 
        tokens.push(stream.getCharsWhileNot("\"")); 
        stream.input.get(); 
      }
      else { 
        //Get everything until next separator 
        tokens.push(stream.getCharsWhileNot(this.separator)); 
      }
    }

    return tokens; 
  }
}
exports.Lexer = Lexer; 

class StringStream { 
  #str; 
  #index; 

  constructor(str) {
    this.#str = str;
    this.#index = 0;
  }

  //Gets next character, "" if none available
  get() {
    if (this.eof()) {
      return ""; 
    }
    else { 
      this.#index++; 
      return this.#str[this.#index - 1]; 
    }
  }

  //Checks next character, "" if none available 
  peek() {
    if (this.eof()) {
      return ""; 
    }
    else {
      return this.#str[this.#index]; 
    }
  }

  //Checks if end-of-file has been reached
  eof() {
    if (this.#index >= this.#str.length) {
      return true; 
    }
  }
}

class StreamWrapper {
  input; 

  constructor(str) {
    this.input = new StringStream(str); 
  }

  //Checks it the next character is anywhere in compstr
  //Returns false on eof 
  nextCharIs(compstr) {
    let c = this.input.peek(); 
    return this.input != "" && compstr.includes(c); 
  }

  //Checks the next character is NOT anywhere in compstr
  //Also returns false on eof
  nextCharIsNot(compstr) { 
    let c = this.input.peek(); 
    return !compstr.includes(c); 
  }

  //Continually gets characters from the input while they are somewhere in the compstr
  //Also stops at eof
  getCharsWhile(compstr) {
    let finalstr = "";
    while (true) {
      if (this.nextCharIs(compstr)) {
        finalstr += this.input.get();
      }
      else {
        return finalstr;
      }
    }
  }

  //Continually gets characters from the input while they are NOT somewhere in the compstr
  //Also stops at eof
  getCharsWhileNot(compstr) {
    let finalstr = "";
    while (true) {
      if (this.nextCharIsNot(compstr)) {
        finalstr += this.input.get();
      }
      else {
        return finalstr;
      }
    }
  }

  //Skips characters while they are somewhere in the compstr
  skipCharsWhile(compstr) {
    this.getCharsWhile(compstr); 
    return; 
  }
}