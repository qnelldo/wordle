let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:orange; width:200px; height:65px";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = async () => {
    let win = 0;
    const update = await fetch("/answer");
    const answer = await update.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );

      const input = block.innerText;
      const letter = answer[i];

      if (input === letter) {
        win++;
        block.style.background = "green";
      } else if (answer.includes(input)) block.style.background = "yellow";
      else block.style.background = "gray";
      block.style.color = "white";
    }
    if (win === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    //console.log(event.key, event.keyCode);
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && 90 >= keyCode) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const start_time = new Date();

    function timer() {
      const now_time = new Date();
      const during_time = new Date(now_time - start_time);
      const min = during_time.getMinutes().toString().padStart(2, "0");
      const sec = during_time.getSeconds().toString().padStart(2, "0");
      const check = document.querySelector("#timer");
      check.innerText = `${min}:${sec}`;
    }

    timer = setInterval(timer, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}
appStart();
