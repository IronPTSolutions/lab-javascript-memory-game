const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      // TODO: write some code here
      console.log(`Card clicked: ${card}`);
      card.classList.toggle("turned");

      const turned = document.querySelectorAll(".turned:not(.guessed)");

      if (turned.length === 2) {
        const guessed = memoryGame.checkIfPair(
          turned[0].getAttribute("data-card-name"),
          turned[1].getAttribute("data-card-name")
        );

        // other option: turned[0].datset.cardName

        if (!guessed) {
          setTimeout(() => {
            turned[0].classList.toggle("turned");
            turned[1].classList.toggle("turned");
          }, 750);
        } else {
          turned[0].classList.add("guessed");
          turned[1].classList.add("guessed");
        }

        document.getElementById("pairs-clicked").innerText =
          memoryGame.pairsClicked;
        document.getElementById("pairs-guessed").innerText =
          memoryGame.pairsGuessed;

        if (memoryGame.checkIfFinished()) {
          const turned = document.querySelectorAll(".turned");

          for (const card of turned) {
            card.classList.remove("turned");
            card.classList.remove("guessed");
          }

          memoryGame.pairsClicked = 0;
          memoryGame.pairsGuessed = 0;

          document.getElementById("pairs-clicked").innerText =
            memoryGame.pairsClicked;
          document.getElementById("pairs-guessed").innerText =
            memoryGame.pairsGuessed;

          memoryGame.shuffleCards();
        }
      }
    });
  });
});
