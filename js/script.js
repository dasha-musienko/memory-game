const emojis = [
  "😂",
  "😂",
  "🤩",
  "🤩",
  "🇺🇦",
  "🇺🇦",
  "🙈",
  "🙈",
  "🧊",
  "🧊",
  "🎲",
  "🎲",
  "💸",
  "💸",
  "😍",
  "😍",
];
const shuffledEmojis = shufflesEmojis(emojis);
const cardContainer = document.querySelector(".cards");
const resetBtn = document.querySelector(".btn");

document.addEventListener("click", documentClickHandler);
resetBtn.addEventListener("click", resetBtnClickHandler);

function documentClickHandler(evt) {
  const card = evt.target.closest(".card");
  if (card) {
    card.classList.add("open");
    addsGameLogic();
  }
}

function resetBtnClickHandler() {
  document.location.reload();
}

function shufflesEmojis(arr) {
  return arr.sort(() => (Math.random() > 0.5 ? 2 : -1));
}

function createsCardsMarkup(arr) {
  arr.map((el) =>
    cardContainer.insertAdjacentHTML(
      "beforeend",
      `
    <li class="card animate__animated">${el}</li>
`
    )
  );
}

function addsGameLogic() {
  setTimeout(function () {
    const cardsArr = document.querySelectorAll(".card.open");
    if (cardsArr.length > 1) {
      if (cardsArr[0].textContent === cardsArr[1].textContent) {
        cardsArr[0].classList.add("match");
        cardsArr[1].classList.add("match");

        cardsArr[0].classList.remove("open");
        cardsArr[1].classList.remove("open");

        cardsArr[0].classList.add("animate__pulse");
        cardsArr[1].classList.add("animate__pulse");

        if (document.querySelectorAll(".card.match").length === emojis.length) {
          alertify.set("notifier", "position", "top-right");
          alertify.success("🔥 You won 🔥");

          setTimeout(function () {
            document.location.reload();
          }, 700);
        }
      } else {
        cardsArr[0].classList.add("animate__shakeX");
        cardsArr[1].classList.add("animate__shakeX");

        setTimeout(function () {
          cardsArr[0].classList.remove("animate__shakeX");
          cardsArr[1].classList.remove("animate__shakeX");
        }, 1000);

        setTimeout(function () {
          cardsArr[0].classList.remove("open");
          cardsArr[1].classList.remove("open");
        }, 700);
      }
    }
  }, 1000);
}
createsCardsMarkup(shuffledEmojis);
