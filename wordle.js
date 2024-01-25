const start_time = new Date();

function timer() {
  const now_time = new Date();
  const during_time = new Date(now_time - start_time);
  const min = during_time.getMinutes().toString().padStart(2, "0");
  const sec = during_time.getSeconds().toString().padStart(2, "0");
  const check = document.querySelector("#timer");
  check.innerText = `time : ${min}:${sec}`;
}

setInterval(timer, 1000);
