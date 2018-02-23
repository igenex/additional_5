/*module.exports = */function check(str, bracketsConfig) {
  // your solution
  let BracketsChecker = {
    errors : [],
    init(str, bracketConfig) {
      "use strict";
      this.stringArr = str.split("");
      this.bracketModel = bracketConfig;
      this.bracketsObject = {};
    },
    getBracketsTypeCount () {
      "use strict";
      return this.bracketModel.length;
    },
    getBracketsPositionCount () {
      "use strict";
      this.stringArr.forEach(item => {
        if(!this.bracketsObject[item]) {
          this.bracketsObject[item] = 0;
        }
        this.bracketsObject[item]++;
      });
    },
    getBracketPositionAndType (currentBracket) {
      "use strict";
      let position = Object.create(null);
      this.bracketModel.forEach((array, i) => {
        if(array.indexOf(currentBracket) > -1) {
          if(array.indexOf(currentBracket)) {

          }
          position.bracketPos = array.indexOf(currentBracket) ? "close" : "open";
          position.bracketType = i;
        }
      });
      return position;
    },
    getTypeMap () {
      "use strict";
      let typeMap = [];
      this.stringArr.forEach((item) => {
        typeMap.push(this.getBracketPositionAndType(item).bracketType);
      });
      return typeMap;
    },
    validateString () {
      "use strict";
      let testStringArray = this.stringArr;
      this.getBracketsPositionCount ();

      //Проверка номер 1
      if(testStringArray.length % 2 !== 0) {
        this.failure("Нечетное количество скобок " + testStringArray.length);
        return false;
      }

      //Проверка номер 2
      if(this.getBracketPositionAndType(testStringArray[testStringArray.length-1]).bracketPos === "open") {
        this.failure("Заканчивается открывающей скобкой");
        return false;
      }

      //Проверка номер 3
      if(this.getBracketPositionAndType(testStringArray[0]).bracketPos === "close") {
        this.failure("Начинается с открытой скобкой");
        return false;
      }

      //Проверка номер 5
      /*
      for(let bracket in this.bracketsObject) {
        if(this.bracketsObject[bracket] % 2) {
          this.failure("Не хватает скобки");
          return false;
        }
      }
      */
      //Проверка номер 6
      let evenOddBracketCount = {};
      this.stringArr.forEach((item, i) => {
        let bracketType = this.getBracketPositionAndType(item).bracketType,
          bracketState = this.getBracketPositionAndType(item).bracketPos;
        if(!evenOddBracketCount[bracketType+"_"+bracketState]) {
          evenOddBracketCount[bracketType+"_"+bracketState] = {};
          evenOddBracketCount[bracketType+"_"+bracketState].count = 0;
          evenOddBracketCount[bracketType+"_"+bracketState].even = 0;
          evenOddBracketCount[bracketType+"_"+bracketState].odd = 0;
        }
        if(!(i % 2)) {
          evenOddBracketCount[bracketType+"_"+bracketState].odd++;
        } else {
          evenOddBracketCount[bracketType+"_"+bracketState].even++
        }
        evenOddBracketCount[bracketType+"_"+bracketState].count++;
      });

      let typeCount = this.getBracketsTypeCount();
      for(let i = 0; i < typeCount; i++) {
        if(evenOddBracketCount[i + "_open"].even !== evenOddBracketCount[i + "_close"].odd ||
          evenOddBracketCount[i + "_open"].odd !== evenOddBracketCount[i + "_close"].even) {
          this.failure("Позиция скобки не верная");
          return false;
        }
      }
      return true;
      //console.log(evenOddBracketCount);
    },
    failure (err) {
      this.errors.push( err );
      //this.showDialog("Ошибка : " + err );
    },
    showDialog(msg) {
      "use strict";
      //console.log(msg);
    }
  };

  let brackets = Object.create(BracketsChecker);
  brackets.init(str, bracketsConfig);

  return brackets.validateString();
  //console.log("============================")
};


const config1 = [['(', ')']];
const config2 = [['(', ')'], ['[', ']']];
const config3 = [['(', ')'], ['[', ']'], ['{', '}']];
const config4 = [['|', '|']];
const config5 = [['(', ')'], ['|', '|']];
const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];
const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];

check('||', config4);//, true
/*
check('|()|', config5);//, true
check('|(|)', config5);//, false
check('|()|(||)||', config5);//, true
check('111115611111111222288888822225577877778775555666677777777776622222', config6);// true
check('5555512575557777777555566667888888667661133833448441111222233333444442266666', config6);//, false
check('8888877878887777777888888887777777887887788788887887777777788888888887788888', config6);//, false);
check('111115611111111156111111112222888888222255778777787755556666777777777766222221111222288888822225577877778775555666677777777776622222', config6);//, true);
check('[]][[]', config3);//, false
check('[]][[]', config2);//, false
check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]]))()', config7);//, false);
check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])(())', config7);//, true);
check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])((([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])))', config7);
*/