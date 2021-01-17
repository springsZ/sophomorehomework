var list = $(".picContainer .list");
var listW = list.width();
var listH = list.height();
var imgW = listW / 3;
var imgH = listH / 3;
var startArr = [];
var randArr = [];
var key = true;
var imgCell;
var num = 3;
var seleBox = $(".selectbox");
var seleLi = seleBox.find("li"); //获取难度系数
var seleBtn = seleBox.find(".text");
var picSrc = "";
init();
function init() {
  render(num); //初始是3*3
  gamestart();
  select();
}
function render(n) {
  list.html("");
  imgW = listW / n;
  imgH = listH / n;
  startArr = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      startArr.push(i * n + j);
      var li = $("<li>");
      li.css({
        left: j * imgW + "px",
        top: i * imgH + "px",
        backgroundPosition: -j * imgW + "px " + -i * imgH + "px",
        width: imgW + "px",
        height: imgH + "px",
      });
      if (picSrc != "") {
        //如果插入了图片，需要添加图片背景样式
        li.css({
          left: j * imgW + "px",
          top: i * imgH + "px",
          backgroundPosition: -j * imgW + "px " + -i * imgH + "px",
          width: imgW + "px",
          height: imgH + "px",
          backgroundImage: `url(${picSrc})`,
        });
      }
      list.append(li);
      imgCell = list.find("li"); //搜索所有段落中的后代 li 元素
    }
  }
}

const insertImg = document.getElementById("insertImg");
insertImg.addEventListener("change", function (event) {
  const picReader = new FileReader();
  console.log(picReader);
  console.log(event);
  if (window.File && window.FileList && window.FileReader) {
    const files = event.target.files;
    console.log(files);
    const output = document.getElementById("textContent");
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.match("image")) continue;

      const picReader = new FileReader();
      console.log(picReader);

      picReader.addEventListener("load", (event) => {
        //文件阅读执行后
        console.log("123"); //event 加载完成后picReader的相关属性
        picSrc = event.target.result; //文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
        var ulcontent = document.getElementById("content");
        var licontent = ulcontent.getElementsByTagName("li");
        var lilength = licontent.length;
        console.log(lilength);
        for (var i = 0; i < lilength; ++i) {
          licontent[i].style.backgroundImage = `url(${picSrc})`;
        }
      });
      render(num); //更新origArr
      picReader.readAsDataURL(file);
    }
  } else {
    alert("您得浏览器不支持File API");
  }
});

function select() {
  seleBtn.on("click", function () {
    $(this).siblings(".box").slideToggle();
    seleBox.toggleClass("active");
  });
  seleLi.on("click", function () {
    var index = $(this).index();
    var text = $(this).text();
    seleBtn.text(text);
    seleBox.find(".box").slideUp();
    seleBox.removeClass("active");
    if (index == seleLi.length - 1) {
      num = 12;
      return;
    } else if (index == seleLi.length - 2) {
      num = 8;
      return;
    }
    num = Math.floor(index * 1.5) + 3;
  });
}
function gamestart() {
  $(".btn").on("click", function () {
    if (key) {
      key = false;
      $(this).text("恢复");
      render(num);
      randomArr();
      singelmake(randArr, num);
      drag();
      seleBtn.attr("disabled", "disabled");
      $(imgCell).css("cursor", "move");
      seleBox.find(".box").slideUp();
      seleBox.removeClass("active");
      maxtime = 2 * num * 60;
      timer = setInterval("CountDown()", 1000);
    } else {
      key = true;
      $(this).text("开始");
      singelmake(startArr, num);
      imgCell.off("mousemove mouseup mousedown mouseover mouseout");
      seleBtn.attr("disabled", false);
      $(imgCell).css("cursor", "pointer");
      clearInterval(timer);
    }
  });
}
function randomArr() {
  randArr = [];
  var len = startArr.length;
  var order;
  var temp = {};
  for (var i = 0; i < len; i++) {
    order = Math.floor(Math.random() * len);
    if (randArr.length > 0) {
      while ($.inArray(order, randArr) > -1) {
        order = Math.floor(Math.random() * len); //如果已经有了随机数，就需要继续随机
      }
    }
    randArr.push(order);
  }
  return;
}
function singelmake(arr, n) {
  var len = arr.length;
  for (var a = 0; a < len; a++) {
    var j = arr[a] % n;
    var i = Math.floor(arr[a] / n);
    makeanimate(a, j, i, n);
  }
}
function drag() {
  var disX, disY;
  var initL = list.offset().left;
  var initT = list.offset().top;
  imgCell
    .on("mousedown", function (e) {
      var e = e || window.e;
      disX = e.pageX - $(this).offset().left;
      disY = e.pageY - $(this).offset().top;
      var self = this;
      var index1 = $(this).index();
      $(document)
        .on("mousemove", function (e) {
          e.preventDefault();
          var e = e || window.e;
          var l = e.pageX - disX - initL;
          var t = e.pageY - disY - initT;
          $(self).css({
            left: l + "px",
            top: t + "px",
            zIndex: 1000,
            opacity: "0.6",
          });
        })
        .on("mouseup", function (e) {
          var e = e || window.e;
          var l = e.pageX - initL;
          var t = e.pageY - initT;
          var index2 = changeIndex(l, t, index1, num);
          if (index1 == index2) {
            cellReturn(index1, num);
          } else {
            cellChange(index1, index2, num);
          }
          $(this).off("mousemove").off("mouseup");
        });
    })
    .on("mouseover", function () {
      $(this).css({ opacity: "0.8" });
    })
    .on("mouseout", function () {
      $(this).css({ opacity: "1" });
    });
}
function changeIndex(x, y, index, n) {
  if (x < 0 || x > listW || y < 0 || y > listH) {
    return index;
  }
  var row = Math.floor(y / imgH);
  var col = Math.floor(x / imgW);
  var l = row * n + col;
  var i = 0;
  len = randArr.length;
  while (i < len && randArr[i] !== l) {
    i++;
  }
  return i;
}
function cellReturn(index, n) {
  var i = Math.floor(randArr[index] / n);
  var j = randArr[index] % n;
  makeanimate(index, j, i, num);
}
function cellChange(from, to, n) {
  var fromI = Math.floor(randArr[from] / n);
  var fromJ = randArr[from] % n;
  var toI = Math.floor(randArr[to] / n);
  var toJ = randArr[to] % n;
  var temp = randArr[from];
  makeanimate(from, toJ, toI, num);
  makeanimate(to, fromJ, fromI, num, function () {
    randArr[from] = randArr[to];
    randArr[to] = temp;
    check();
  });
}
var maxtime = 2 * num * 60;
function CountDown() {
  if (maxtime >= 0) {
    minutes = Math.floor(maxtime / 60);
    seconds = Math.floor(maxtime % 60);
    msg = "距离结束还有" + minutes + "分" + seconds + "秒";
    document.all["timer"].innerHTML = msg;
    --maxtime;
  } else {
    clearInterval(timer);
    alert("时间到，游戏结束!");
  }
}

function check() {
  if (startArr.toString() == randArr.toString()) {
    alert("成功过关！");
    clearInterval(timer);
  }
}
function makeanimate(index, j, i, n, callBack) {
  imgW = listW / n;
  imgH = listH / n;
  imgCell
    .eq(index)
    .animate({ left: j * imgW + "px", top: i * imgH + "px" }, function () {
      $(this).css({ zIndex: "0", opacity: "1" });
      typeof callBack == "function" ? callBack.call(this, arguments) : "";
    });
} //animate() 方法执行 CSS 属性集的自定义动画。
