//Utility functions used across multiple files

const fs = require ("fs");

function cloneDR(o) {
  const gdcc = "__getDeepCircularCopy__";
  if (o !== Object(o)) {
      return o; // primitive value
  }

  var set = gdcc in o,
      cache = o[gdcc],
      result;
  if (set && typeof cache == "function") {
      return cache();
  }
  // else
  o[gdcc] = function() { return result; }; // overwrite
  if (o instanceof Array) {
      result = [];
      for (var i=0; i<o.length; i++) {
          result[i] = cloneDR(o[i]);
      }
  } else {
      result = {};
      for (var prop in o)
          if (prop != gdcc)
              result[prop] = cloneDR(o[prop]);
          else if (set)
              result[prop] = cloneDR(cache);
  }
  if (set) {
      o[gdcc] = cache; // reset
  } else {
      delete o[gdcc]; // unset again
  }
  return result;
}
exports.cloneDR = cloneDR;

function readFilePromise(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data){
            if (err) 
                reject(err); 
            else 
                resolve(data);
        });
    });
};
exports.readFilePromise = readFilePromise; 

let wait = ms => new Promise((r, j)=>setTimeout(r, ms));
exports.wait = wait;

function betterSplit(string, divider) {
    return string.split(divider).filter(k => k != "");
}
exports.betterSplit = betterSplit; 

function processToStringArray(tempMsg) {
    if (typeof(tempMsg.content) == "string") {
      var argumentsArray = betterSplit(tempMsg.content," ");
      for (var i = 0; i < argumentsArray.length; i++) {
        argumentsArray[i] = argumentsArray[i].replace("\n", "");
        if (argumentsArray[i] == "") {
          argumentsArray.splice(i, 1);
        }
      }
      console.log(argumentsArray);
      return argumentsArray;
    }
    else {
      console.log("Provided message is not just a string");
      return false;
    }
} 
exports.processToStringArray = processToStringArray;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;  