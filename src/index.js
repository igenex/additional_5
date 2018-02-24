module.exports =
function check(str, bracketsConfig) {
  // your solution
  let BracketsChecker = {
    errors: [],
    init(str, bracketConfig) {
      "use strict";
      this.stringArr = str.split("");
      this.bracketModel = bracketConfig;
      this.bracketsObject = {};
      this.sameBase = [];
      this.findSameOpenCloseBrackets();
      this.getBracketPositionAndType.cache = Object.create(null);
    },
    findSameOpenCloseBrackets() {
      "use strict";
      this.bracketModel.forEach((item, i) => {
        if (item[0] === item[1]) {
          this.sameBase.push(item[0]);
        }
      });
    },
    getBracketsCount() {
      "use strict";
      return this.stringArr.length;
    },
    getBracketsTypeCount() {
      "use strict";
      return this.bracketModel.length;
    },
    getBracketsPositionCount() {
      "use strict";
      this.stringArr.forEach(item => {
        if (!this.bracketsObject[item]) {
          this.bracketsObject[item] = 0;
        }
        this.bracketsObject[item]++;
      });
    },
    getBracketPositionAndType(currentBracket) {
      "use strict";
      //if(!this.getBracketPositionAndType.cache) {this.getBracketPositionAndType.cache = Object.create(null);}
      if (!this.getBracketPositionAndType.cache[currentBracket]) {
        let position = Object.create(null);
        this.bracketModel.forEach((array, i) => {
          let currentBracketIndex = array.indexOf(currentBracket);
          let isSameBracket = this.sameBase.indexOf(currentBracket);
          if (currentBracketIndex > -1) {
            if (!(isSameBracket > -1)) {
              position.bracketPos = currentBracketIndex ? "close" : "open";
            } else {
              position.bracketPos = "openclose";
            }
            position.bracketType = i;
          }
        });
        this.getBracketPositionAndType.cache[currentBracket] = JSON.stringify(position);
      }
      return JSON.parse(this.getBracketPositionAndType.cache[currentBracket]);
    },
    getTypeMap() {
      "use strict";
      let typeMap = [];
      this.stringArr.forEach((item) => {
        typeMap.push(this.getBracketPositionAndType(item).bracketType);
      });
      console.log(typeMap);
      return typeMap;
    },
    validateString() {
      "use strict";
      let testStringArray = this.stringArr;
      this.getBracketsPositionCount();

      //Проверка номер 1
      if (testStringArray.length % 2 !== 0) {
        this.failure("Нечетное количество скобок " + testStringArray.length);
        return false;
      }

      //Проверка номер 2
      if (this.getBracketPositionAndType(testStringArray[testStringArray.length - 1]).bracketPos === "open") {
        this.failure("Заканчивается открывающей скобкой");
        return false;
      }

      //Проверка номер 3
      if (this.getBracketPositionAndType(testStringArray[0]).bracketPos === "close") {
        this.failure("Начинается с открытой скобкой");
        return false;
      }

      //========================================================
      let fullInfoBracketArray = [];
      for (let i = 0, max = this.stringArr.length; i < max; i++) {
        let bracketInfo = this.getBracketPositionAndType(this.stringArr[i]);
        let bracketType = bracketInfo.bracketType,
          bracketState = bracketInfo.bracketPos;

        if (fullInfoBracketArray.length >= 1) {
          let prev_item = fullInfoBracketArray.slice(-1);
          if (prev_item[0][0] === bracketType &&
            ((prev_item[0][1] === "open" && bracketState === "close") ||
              (prev_item[0][1] === "openclose" &&  bracketState === "openclose"))) {
            fullInfoBracketArray.pop();
            continue;
          }
        }
        if (bracketState === "close" && fullInfoBracketArray.length === 0) {
          return false;
        }

        fullInfoBracketArray.push([bracketType, bracketState]);
      }

      if (fullInfoBracketArray.length > 0) {
        return false;
      }

      //=========================================

      return true;
    },
    failure(err) {
      this.errors.push(err);
      //this.showDialog("Ошибка : " + err);
    },
    showDialog(msg) {
      "use strict";
      //console.log(msg);
    }
  };

  let brackets = Object.create(BracketsChecker);
  brackets.init(str, bracketsConfig);
  return brackets.validateString();

};




