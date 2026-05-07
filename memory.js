       "use strict"
       const container = document.getElementById("container");
        const resetBtn = document.getElementById("resetBtn");
        const score = document.getElementById("move")

        const cards = [ "🍎", "🍎", "🍌", "🍌", "🥕", "🥕", "💸", "💸", "🍇", "🍇", "😀", "😀", "🍒", "🍒", "🥔", "🥔"
        ];

        let firstcard = null;
        let secondcard = null;
        let lock = false;
        let matchedCount = 0;
        let moves = 0;

        function startGame() {
            container.innerHTML = "";

            firstcard = null;
            secondcard = null;
            lock = false;
            matchedCount = 0;
            moves = 0;

            cards.sort(() => Math.random() - 0.5);

            cards.forEach(function (card) {
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card");
                cardDiv.innerText = "?";
                cardDiv.dataset.value = card;

                cardDiv.addEventListener("click", function () {
                    if (cardDiv.dataset.matched === "true") return;
                    if (lock) return;
                    if (cardDiv === firstcard) return;

                    cardDiv.innerText = card;

                    if (firstcard === null) {
                        firstcard = cardDiv;
                        return;
                    }

                    secondcard = cardDiv;
                    moves++;
                    score.innerText ="Score:" + moves;
                    if (firstcard.dataset.value === secondcard.dataset.value) {
                        matchedCount += 2;

                        if (matchedCount === cards.length) {
                            alert("You Won! 🏆");
                        }

                        firstcard.dataset.matched = "true";
                        secondcard.dataset.matched = "true";

                        firstcard = null;
                        secondcard = null;

                    } else {
                        lock = true;

                        setTimeout(function () {
                            firstcard.innerText = "?";
                            secondcard.innerText = "?";

                            firstcard = null;
                            secondcard = null;
                            lock = false;
                        }, 1000);
                    }
                });

                container.appendChild(cardDiv);
            });
        }

        startGame();

        resetBtn.addEventListener("click", startGame);