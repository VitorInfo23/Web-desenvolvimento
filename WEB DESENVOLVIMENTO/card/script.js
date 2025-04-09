const images =
[
    "car1.png", "car1.png",
    "car2.png", "car2.png",
    "car3.png", "car3.png",
    "car4.png", "car4.png"
];
let flippedCard = [];
let matchedPairs= 0;

function shuffle(array)
{
    return array.sort(() => Math.random() -0.5);
}

function createBoard()
{
    const board = document.querySelector(".container");
    const shuffledImages = shuffle(images);
    
    shuffledImages.forEach((image) => 
    {
        const card = documento.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;

        const img = documento.createElement("img");
        img.src = image;

        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard()
{
    if(flippedCard.length < 2 && !this.classList.contains("flipped"))
    {
        this.classList.add("flipped");
        flippedCard.push(this);
        if(flippedCard.length === 2)
        {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch()
{
    const [card1, card2] = flippedCard;
    if(card1.dataset.image === card2.dataset.image)
    {
        matchedPairs++;
        flippedCard = [];

        if(matchedPairs === images.length/2)
        {
            setTimeout(() => alert("You Win!"), 500);
        }

    }
    else
    {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCard = [];
    }
}

createBoard();