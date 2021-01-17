window.onload = function () {
  count();
  startCount();
};

document
  .querySelectorAll("[data-id]") //选中具有编辑属性的元素
  .forEach((item) =>
    item.addEventListener("click", (event) => {
      const order = item.getAttribute("data-id").split(":"); //当一个HTML文档切换到设计模式时，document暴露 execCommand 方法，该方法允许运行命令来操纵可编辑内容区域的元素。
      console.log(order[1]);
      event.preventDefault(); //关闭元素默认属性
      document.execCommand(order[0], false, order[1]); //执行命令（比如（formatBlock，false,h1）,设置当前块格式化标签，不打开窗口，块为h1）
      console.log(order[0]);
    })
  );
var colorSelect = document.getElementById("colorSelect");
colorSelect.addEventListener("change", () => {
  const order = colorSelect.getAttribute("data-cid").split(":"); //当一个HTML文档切换到设计模式时，document暴露 execCommand 方法，该方法允许运行命令来操纵可编辑内容区域的元素。
  console.log(order[1]);
  order[1] = colorSelect.value;
  document.execCommand(order[0], false, order[1]); //执行命令（比如（formatBlock，false,h1）,设置当前块格式化标签，不打开窗口，块为h1）
  console.log(order[0]);
});

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
        const picSrc = event.target.result; //文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。

        const imgThumbnailElem =
          "<div class='imgView'><img  src='" +
          picSrc +
          "'" +
          "title='" +
          file.name +
          "'/></div>";

        output.innerHTML = output.innerHTML + imgThumbnailElem;
      });
      picReader.readAsDataURL(file);
    }
  } else {
    alert("您得浏览器不支持File API");
  }
});

var insertLink = document.getElementById("insertLink");
insertLink.addEventListener("click", () => {
  var url = prompt("请输入链接的地址：");
  if (url.slice(0, 4) != "http") {
    url = "http://" + url;
  }

  document.execCommand("createLink", false, url);
  document.getElementById("textContent").focus();
  var a = document.getSelection().focusNode.parentNode; //其返回一个 Selection 对象，表示文档中当前被选择的文本
  console.log(a);
  a.setAttribute("contenteditable", "false");
});

function clearContent() {
  if (confirm("确定要清空文本内容吗？会创建一个新文本")) {
    document.getElementById("textContent").innerHTML =
      "<p>请从这里开始 &nbsp;📌</p>";
    window.localStorage.clear();
    location.reload(); //重新载入文档
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
  AutoSave.start();
});

const AutoSave = (function () {
  const getEditorElement = () => document.querySelector("#textContent"); //把他赋值给一个函数
  let timer = null;

  function save() {
    const editorContent = document.getElementById("textContent").innerHTML;

    if (editorContent) {
      localStorage.setItem("AutoSave" + document.location, editorContent); //localStorage.setItem(key,value)：将value存储到key字段
      //Location 接口表示其链接到的对象的位置（URL）
    }

    const dir = getEditorElement().getAttribute("dir");
    localStorage.setItem("dirIsRtl", dir === "rtl");
  }

  function restore() {
    //从缓存中得到内容
    const savedContent = localStorage.getItem("AutoSave" + document.location);

    if (savedContent) {
      document.getElementById("textContent").innerHTML = savedContent;
    }

    const dirIsRtl = localStorage.getItem("dirIsRtl");
    getEditorElement().setAttribute(
      "dir",
      JSON.parse(dirIsRtl) ? "rtl" : "ltr"
    );
  }

  return {
    // 开始自动保存

    start: function () {
      const editor = document.getElementById("textContent");

      if (editor) restore();

      if (timer != null) {
        clearInterval(timer); //clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。
        timer = null;
      }

      timer = setInterval(save, 3000); //3s自动保存一次
      console.log(timer);
    },

    stop: function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },
  };
})();

function downLoad(type) {
  let savedContent = ""; //先定义一个用于存储的空字符串
  if (type === "txt") {
    savedContent = document.getElementById("textContent").textContent;
  } else {
    savedContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>文本</title>
        </head>
            <body>
                ${document.getElementById("textContent").innerHTML}
            </body>
        </html>
        `;
  }

  const savedA = document.createElement("a"); //创建一个a标签用于下载到本地
  savedA.setAttribute("download", `writty.${type}`);
  savedA.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(savedContent) //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  );
  savedA.click();
}
function startCount() {
  var textContent = document.getElementById("textContent");
  textContent.addEventListener("mouseup", count);
  textContent.addEventListener("keyup", count);
}
var countType = "character";
const counter = document.getElementById("counter");
counter.addEventListener("click", () => {
  countType == "word" ? (countType = "character") : (countType = "word");
  console.log(countType);
});
function count() {
  var total = 0;
  var textContent = document.getElementById("textContent").innerText;
  if (countType == "word") {
    total = textContent.match(/\b[-?(\w+)?]+\b/gi).length;
  } else {
    total = textContent.length;
  }
  counter.innerText = total;
}

function changeTheme(bgColor, color) {
  var bodyColor = document.getElementsByTagName("body");
  bodyColor[0].style.backgroundColor = bgColor;
  var textContent = document.getElementById("textContent");
  if (color == "white") {
    textContent.classList.remove("black");
    textContent.classList.add("white");
  } else {
    textContent.classList.remove("white");
    textContent.classList.add("black");
  }
}

const importFile = document.getElementById("importfile");
importFile.addEventListener("change", (event) => {
  const file = event.currentTarget.files[0];
  if (!file) {
    return;
  }
  const type = file.name.split(".").pop();

  if (type === "html" || "md") {
    const reader = new FileReader();
    reader.onload = function () {
      importContent(type, reader.result);
    };

    reader.readAsText(file);
    count();
  } else {
    alert("不支持该文件类型的输入");
  }
});
function importContent(type, content) {
  var textContent = document.getElementById("textContent");

  if (type === "html") {
    const sanitizedContent = HtmlSanitizer.SanitizeHtml(content);
    const tempElement = document.createElement("html");
    tempElement.innerHTML = sanitizedContent;
    textContent.innerHTML = tempElement.querySelector("body").innerHTML;
  } else if (type === "md") {
    const converter = new showdown.Converter(); // 初始化转换器
    const html = converter.makeHtml(content); // 将MarkDown转为html格式的内容
    textContent.innerHTML = html;
  } else {
    alert("仅支持HTML文件或MarkDown文件导入");
  }
}
var search = document.getElementById("search");
search.addEventListener("click", () => {
  var value = prompt("请输入您要查找的词");
  var textContent = document.getElementById("textContent");
  var index = textContent.innerText.indexOf(value);
  var index1 = index;
  var i = 0;
  console.log(index);
  var pageindex = 0;
  console.log(textContent.childNodes[0].length);
  /* console.log(textContent.childNodes[1].firstChild.length); */
  for (i; i < textContent.childNodes.length; i++) {
    var currrent = 0;
    if (i == 0) {
      currrent = textContent.childNodes[i].length;
      pageindex += textContent.childNodes[i].length;
    } else {
      currrent = textContent.childNodes[i].innerText.length;
      pageindex += textContent.childNodes[i].innerText.length;
    }

    console.log(pageindex);
    if (index < pageindex) {
      break;
    }

    index1 = index1 - currrent;
    console.log(index1);
  }
  console.log(i);
  var content;
  if (i == 0) content = textContent.childNodes[i];
  else content = textContent.childNodes[i].firstChild;
  console.log(index1);
  if (index == -1) {
    alert("未查找到该字符");
  } else {
    var end = index1 - i * 1 + value.length;
    var range = document.createRange();
    range.setStart(content, index1 - 1 * i);
    range.setEnd(content, end);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
