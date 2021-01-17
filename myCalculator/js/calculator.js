var inputTop = document.getElementById("inputTop");
var inputBottom = document.getElementById("inputBottom");
var nums = document.querySelectorAll(".num");
var operas = document.querySelectorAll(".opera");
var reset = document.getElementById("reset");
var Del = document.getElementById("Del");
var equal = document.getElementById("equal");
var timeCalculator = document.getElementById("after");
var records = document.getElementById("records");
var historyContainer = document.getElementById("historyContainer");
var Iscalculate = false;
/* 科学计算部分 */
var science = false;
var operaList = [];
var numList = [];
var recordsList = [];
var localList = [
  "sin",
  "cos",
  "tan",
  "arcsin",
  "arccos",
  "arctan",
  "sqrt",
  "log",
  "abs",
  "exp",
];
var weekDays = [
  "星期天",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
var isScience = document.getElementById("science");
var isScienceClass = document.getElementsByClassName("scienceList");

reset.addEventListener("click", () => {
  inputTop.value = "";
  inputBottom.value = "0";
  temp = "";
  science = false;
  Iscalculate = false;
  operaList = [];

  numList = [];
  gsap.to(reset, 0.15, { scaleX: 0.95, scaleY: 0.95 });
  gsap.to(reset, 1, {
    delay: 0.15,
    scaleX: 1,
    scaleY: 1,
    ease: Elastic.easeOut,
  });
});
Del.addEventListener("click", () => {
  var temp = inputBottom.value.length - 1;
  science = false;
  if (temp >= 0) {
    var Isletter = inputBottom.value.charCodeAt(temp);
    if (
      (Isletter >= 65 && Isletter <= 90) ||
      (Isletter >= 97 && Isletter <= 122)
    ) {
      inputBottom.value = inputBottom.value.substring(0, temp - 2);
    } else inputBottom.value = inputBottom.value.substring(0, temp);
  } else {
    alert("已经清零");
    Iscalculate = false;
  }
  gsap.to(Del, 0.15, { scaleX: 0.95, scaleY: 0.95 });
  gsap.to(Del, 1, {
    delay: 0.15,
    scaleX: 1,
    scaleY: 1,
    ease: Elastic.easeOut,
  });
});

for (let i = 0; i < nums.length; i++) {
  nums[i].addEventListener("click", () => {
    if (Iscalculate || inputBottom.value == "0") {
      inputBottom.value = nums[i].getAttribute("data-set");
      Iscalculate = false;
    } else {
      inputBottom.value += nums[i].getAttribute("data-set");
    }
    if (science) {
      numList.push(nums[i].getAttribute("data-set"));
      console.log(numList[0]);
    }
    /* 产生动画效果 */
    gsap.to(nums[i], 0.25, {
      scale: 1.2,
      transformOrigin: "center",
      ease: Back.easeOut,
    });
    gsap.to(nums[i], 0.25, {
      scale: 1,
      delay: 0.25,
      transformOrigin: "center",
      ease: Back.easeOut,
    });
  });
}

for (let i = 0; i < operas.length; i++) {
  operas[i].addEventListener("click", () => {
    Iscalculate = false;

    /* console.log(operas[i].getAttribute("data-set")); */
    if (operas[i].getAttribute("data-set").length > 1) {
      science = true;
      operaList = [];
      numList = [];
      operaList.push(operas[i].getAttribute("data-set"));
      console.log(operaList[0]);
      inputBottom.value = "";
    }
    inputBottom.value += operas[i].getAttribute("data-set");

    gsap.to(operas[i], 0.25, {
      scale: 1.2,
      transformOrigin: "center",
      ease: Power3.easeOut,
    });
    gsap.to(operas[i], 0.25, {
      scale: 1,
      delay: 0.25,
      transformOrigin: "center",
      ease: Back.easeOut,
    });
  });
}

equal.addEventListener("click", () => {
  // 如果算数表达式不为空
  if (inputBottom.value != "" && inputBottom.value != "undefined") {
    // 将表达式上置，为结果预留空间
    inputTop.value = inputBottom.value;
    inputBottom.value = "";
    Iscalculate = true;
    if (!science) {
      inputBottom.value = eval(inputTop.value);
    } else {
      /* 保证下一次的计算初始化 */
      science = false;
      var opChoose = 99;
      /* 匹配运算符 */
      for (let i = 0; i < localList.length; i++) {
        if (operaList[0] == localList[i]) {
          opChoose = i;
        }
      }
      /* 将数字字符串拼接成数字，并转成浮点数字 */
      var operaNum = "";
      for (let i = 0; i < numList.length; i++) {
        operaNum += numList[i];
      }
      parseFloat(operaNum);
      console.log(operaNum);

      switch (opChoose) {
        case 0:
          inputBottom.value = Math.sin(operaNum);
          break;
        case 1:
          inputBottom.value = Math.cos(operaNum);
          break;
        case 2:
          inputBottom.value = Math.tan(operaNum);
          break;
        case 3:
          inputBottom.value = Math.asin(operaNum);
          break;
        case 4:
          inputBottom.value = Math.acos(operaNum);
          break;
        case 5:
          inputBottom.value = Math.atan(operaNum);
          break;
        case 6:
          inputBottom.value = Math.sqrt(operaNum);
          break;
        case 7:
          inputBottom.value = Math.log(operaNum);
          break;
        case 8:
          inputBottom.value = Math.abs(operaNum);
          break;
        case 9:
          inputBottom.value = Math.exp(operaNum);
          break;
      }
    }
    console.log(inputBottom.value);
    if (inputBottom.value == "") inputBottom.value = "ERROR";
  } else inputBottom.value = "ERROR";
  recordsList.push(`${inputTop.value} = ${inputBottom.value}`);
  var newItem = `<p class="opItem">${inputTop.value} = ${inputBottom.value}</p>`;
  historyContainer.insertAdjacentHTML("afterbegin", newItem);
  gsap.to(equal, 0.15, { scaleX: 0.95, scaleY: 0.95 });
  gsap.to(equal, 1, {
    delay: 0.15,
    scaleX: 1,
    scaleY: 1,
    ease: Elastic.easeOut,
  });
});

/* 监听是否显示科学计算部分 */
isScience.addEventListener("click", () => {
  console.log(isScienceClass);
  if (
    isScienceClass[0].style.display == "none" ||
    isScienceClass[0].style.display == ""
  ) {
    Array.prototype.forEach.call(isScienceClass, (element) => {
      element.style.display = "block";
    });
  } else {
    Array.prototype.forEach.call(isScienceClass, (element) => {
      element.style.display = "none";
    });
  }
  gsap.to(isScience, 0.15, { scaleX: 0.95, scaleY: 0.95 });
  gsap.to(isScience, 1, {
    delay: 0.15,
    scaleX: 1,
    scaleY: 1,
    ease: Elastic.easeOut,
  });
});
records.addEventListener("click", () => {
  var isShow = historyContainer.style.zIndex;
  if (isShow == -1) {
    historyContainer.style.zIndex = 3;
  } else {
    historyContainer.style.zIndex = -1;
  }
  gsap.to(records, 0.15, { scaleX: 0.95, scaleY: 0.95 });
  gsap.to(records, 1, {
    delay: 0.15,
    scaleX: 1,
    scaleY: 1,
    ease: Elastic.easeOut,
  });
  console.log(1);
});

timeCalculator.addEventListener("click", () => {
  while (1) {
    var time = prompt("请输入天数,计算出n天后为星期几");
    if (!time) break;
    if (time == "") {
      alert("天数不能为空");
      continue;
    } else {
      time = parseInt(time);

      if (time <= 0) {
        alert("请输入合法数字");
        continue;
      } else {
        console.log(time, "time");
        var loaclTime = new Date();
        var today = loaclTime.getDay();
        console.log(today);
        var days = Math.floor(time % 7);
        var day = Math.floor((days + today) % 7);
        alert(`今天是${weekDays[today]},第${time}天后是${weekDays[day]}`);
        break;
      }
    }
  }
});
