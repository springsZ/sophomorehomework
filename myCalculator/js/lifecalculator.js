var calculate = document.getElementById("calculate");
var monthBack = document.getElementById("monthBack");
var rateSum = document.getElementById("rateSum");
var backSum = document.getElementById("backSum");
calculate.addEventListener("click", () => {
  /* 关闭表单的默认提交行为 */
  event.preventDefault();
  /* 获取计算需要的值 */
  var backWays = document.getElementById("backWays");
  var index = backWays.selectedIndex;
  console.log("way", index);

  var years = document.getElementById("years").value;
  console.log(years);
  var loanSum = document.getElementById("loanSum").value;
  console.log(loanSum);
  var loanRate = document.getElementById("loanRate").value;
  console.log(loanRate);
  if (
    years == "" ||
    loanSum == "" ||
    loanRate == "" ||
    years <= 0 ||
    loanSum <= 0 ||
    loanRate <= 0
  ) {
    alert("请输入有效的数值");
  } else {
    /* 等额本息 */
    if (index == 0) {
      averaInterest(years, loanSum, loanRate);
    } else {
      averacaptial(years, loanSum, loanRate);
    }
  }
});
var reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  monthBack.value = "";
  rateSum.value = "";
  backSum.value = "";
  years = "";
  loanSum = "";
  loanRate = "";
});
function averaInterest(year_data, loanSum_data, loanRata_data) {
  var month = parseInt(year_data) * 12; //月数
  var monthRateSum = (parseFloat(loanRata_data) * 0.01) / 12; //月利率
  var loanSum_yuan = parseFloat(loanSum_data) * 10000; //本金
  var monthBackSum =
    (loanSum_yuan * monthRateSum * Math.pow(1 + monthRateSum, month)) /
    (Math.pow(1 + monthRateSum, month) - 1); //月均还款
  var totalBackSum = monthBackSum * month; //还款总额
  var rateBackSum = totalBackSum - loanSum_yuan; //总利息
  monthBack.value = monthBackSum;
  rateSum.value = rateBackSum;
  backSum.value = totalBackSum;
}
function averacaptial(year_data, loanSum_data, loanRata_data) {
  var month = parseInt(year_data) * 12; //月数
  var monthRateSum = (parseFloat(loanRata_data) * 0.01) / 12; //月利率
  var loanSum_yuan = parseFloat(loanSum_data) * 10000; //本金
  var d = loanSum_yuan / month; //每月应还本金
  var monthBackSum = (d * monthRateSum + loanSum_yuan * monthRateSum) / 2 + d;
  var rateBackSum =
    ((d +
      loanSum_yuan * monthRateSum +
      (loanSum_yuan / month) * (1 + monthRateSum)) /
      2) *
      month -
    loanSum_yuan;
  var totalBackSum = rateBackSum + loanSum_yuan;
  monthBack.value = monthBackSum;
  rateSum.value = rateBackSum;
  backSum.value = totalBackSum;
}
