var turncounter;
var player; //player1 = true, player2 = false
var player1wins = 0;
var player2wins = 0;
var draws = 0;

for(let i = 0; i < 9; i++)
{
    var divElement = document.createElement("div");
    var pElement = document.createElement("p");
    var textnode = document.createTextNode("-");
    divElement.className = "box";
    divElement.id = "box" + i;
    divElement.addEventListener("click", function() {changeStatus(this);});
    pElement.appendChild(textnode);
    divElement.appendChild(pElement);
    document.getElementById("container").appendChild(divElement);
}

function changeStatus(e)
{
    if (checkCats()) {
        resolutionCats();
        return;
    } else if (checkStatus(e)) {
        alert("This square is already taken");
    } else {
        var letter = getPlayerLetter();
        var classcolor = getPlayerColor();

        turncounter++;

        //removes children (<p> and its text)
        var div = document.getElementById(e.id);
        var children = div.childNodes;
        for(let i = 0; i < children.length; i++)
        {
            div.removeChild(children[i]);
        }

        //then replaces it with another <p>
        var pElement = document.createElement("p");
        var textnode = document.createTextNode(letter);
        pElement.className = classcolor;
        pElement.appendChild(textnode);
        div.appendChild(pElement);

        displayPlayer();
    }
    if(checkWin())
    {
        resolutionWin();
        return;
    }
}

function checkStatus(e)
{
    if(document.getElementById(e.id).innerText == "O" || document.getElementById(e.id).innerText == "X")
    {
        return true;
    } else {
        return false;
    }
}

var setTurnCounter = (function setTC() //number between 0 and 1
{
    turncounter = Math.floor(Math.random() * 2);
    return setTC;
}());

function getTurn()
{
    if(turncounter % 2)
    {
        return true; //player1 if turncounter is even
    } else {
        return false; //player2 if turncounter is odd
    }
}

function getPlayerLetter()
{
    if(getTurn())
    {
        return "X";
    } else {
        return "O";
    }
}

//needed to get the letter of the past turn in order to correctly display who won, otherwise would take one extra changeStatus() click 
//for the program to register that there is three in a row
//used in the checkWin() functions
function getPlayerLetterInverse() 
{
    if(getTurn())
    {
        return "O";
    } else {
        return "X";
    }
}

function getPlayerNumber()
{
    if(getTurn())
    {
        return 1;
    } else {
        return 2;
    }
}

//similar to getPlayerLetterInverse(), needed to correctly display the correct player's alert message
//and increment the correct player's score
//used in the resolutionWin() function
function getPlayerNumberInverse()
{
    if(getTurn())
    {
        return 2;
    } else {
        return 1;
    }
}

function getPlayerColor()
{
    if(getTurn())
    {
        return "lightred-text";
    } else {
        return "lightblue-text";
    }
}

//auto executes and then stores function to reference to call it again later
var displayPlayer = (function player()
{
    var div = document.getElementById("turn");
    var classcolor = getPlayerColor();
    var num = getPlayerNumber();
    var children = div.childNodes;

    for(let i = 0; i < children.length; i++)
    {
        div.removeChild(children[i]);
    }

    //adds the inverse of the color
    if(classcolor == "lightred-text")
    {
        document.getElementById("turn").classList.add("turn-lightblue-text");
    } else {
        document.getElementById("turn").classList.add("turn-lightred-text");
    }
    changeTurnColor();

    var pElement = document.createElement("p");
    pElement.className = classcolor;
    var textnode = document.createTextNode(`Player ${num}'s Turn`);
    pElement.appendChild(textnode);
    div.appendChild(pElement);

    //returns the function name to store to the reference
    return player;
}());

function checkWin()
{
    if(checkWinHorizontal() || checkWinVertical() || checkWinDiagonal1() || checkWinDiagonal2())
    {
        return true;
    }
    return false;
}

function checkWinHorizontal()
{
    var letter = getPlayerLetterInverse();
    var counter = 0;
    for(let i = 0; i < 9; i++)
    {
        if(i == 3 || i == 6)
        {
            counter = 0;
        }
        var text = document.getElementById("box" + i).innerText;
        if(letter == text)
        {
            counter++;
        }
        if(counter == 3)
        {
            return true;
        }
    }
    return false;
}

function checkWinVertical()
{
    var letter = getPlayerLetterInverse();
    var counter = 0;
    for(let i = 0; i < 3; i++)
    {
        counter = 0;
        for(let j = i; j < i+8; j+=3) //gets i and jumps by 3 to access columns (0,3,6) (1,4,7) (2,5,8)
        {
            var text = document.getElementById("box" + j).innerText;
            if(letter == text)
            {
                counter++;
            }
            if(counter == 3)
            {
                return true;
            }
        }
    }
    return false;
}

function checkWinDiagonal1()
{
    var letter = getPlayerLetterInverse();
    var counter = 0;
    for(let i = 0; i < 12; i+=4)
    {
        var text = document.getElementById("box" + i).innerText;
        if(letter == text)
        {
            counter++;
        }
        if(counter == 3)
        {
            return true;
        }
    }
    return false;
}

function checkWinDiagonal2()
{
    var letter = getPlayerLetterInverse();
    var counter = 0;
    for(let i = 2; i < 8; i+=2)
    {
        var text = document.getElementById("box" + i).innerText;
        if(letter == text)
        {
            counter++;
        }
        if(counter == 3)
        {
            return true;
        }
    }
    return false;
}

function checkCats()
{
    var counter = 0;
    for(let i = 0; i < 9; i++)
    {
        var text = document.getElementById("box" + i).innerText;
        if(text != "-")
        {
            counter++;
        }
    }
    if(counter == 8)
    {
        return true;
    }
    return false;
}

function resolutionWin()
{
    var number = getPlayerNumberInverse();
    alert(`~~~Congradulations! Player ${number} has won!~~~`);
    increasePlayerWin();
    resetBoard();
}

function resolutionCats()
{
    alert("~~~Cats Game!~~~");
    increaseDraw();
    resetBoard();
}

function resetBoard()
{
    for(let i = 0; i < 9; i++)
    {
        //removes the player letters
        var div = document.getElementById("box" + i);
        var children = div.childNodes;
        for(let i = 0; i < children.length; i++)
        {
            div.removeChild(children[i]);
        }

        //then resets it with another <p>
        var pElement = document.createElement("p");
        var textnode = document.createTextNode("-");
        pElement.appendChild(textnode);
        div.appendChild(pElement);
    }

    turncounter = -1;
    setTurnCounter();
    displayPlayer();
}

function increasePlayerWin()
{
    var pElement = document.getElementById(`player${getPlayerNumberInverse()}wins`);
    var children = pElement.childNodes;
    for(let i = 0; i < children.length; i++)
    {
        pElement.removeChild(children[i]);
    }

    var w;
    if(getPlayerNumberInverse() == 1)
    {
        player1wins++;
        w = player1wins;
    } else {
        player2wins++;
        w = player2wins;
    }
    var textnode = document.createTextNode(`Player ${getPlayerNumberInverse()} (${getPlayerLetterInverse()}) wins: ${w}`);
    pElement.appendChild(textnode);
}

function increaseDraw()
{
    var pElement = document.getElementById("draws");
    var children = pElement.childNodes;
    for(let i = 0; i < children.length; i++)
    {
        pElement.removeChild(children[i]);
    }

    draws++;
    var textnode = document.createTextNode(`Draws: ${draws}`);
    pElement.appendChild(textnode);
}

function changeTurnColor()
{
    var turn = document.getElementById("turn");
    if(turn.className == "turn-lightred-text")
    {
        turn.classList.remove("turn-lightred-text");
        turn.className = "turn-lightblue-text";
    } else {
        turn.classList.remove("turn-lightblue-text");
        turn.className = "turn-lightred-text";
    }
}