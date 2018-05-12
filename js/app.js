/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

const cardDeck = document.querySelector('.deck');
let card=document.querySelectorAll(".card");
let cardArray=[...card];
let openCardsArray=[];
let tilesFlipped=0;
let moves=0;
let moveDisplay=document.querySelector(".moves");
let starCount=document.querySelectorAll(".fa-star");
let time=document.querySelector("time");
let seconds=0;
let hours=0;
let minutes=0;
let t;
let winner=document.querySelector('.winner-message');
let page=document.querySelector(".page-container");
let playAgain=document.querySelector(".play-again");
playAgain.addEventListener("click",function(){restart();});

window.addEventListener("load",function()
	{
		//alert("READY TO MATCH!!!!!!");
		startGame();
	});
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame()
{
	//cardArray=[...card];
	cardArray=shuffle(cardArray);
    let tempArray=[];
    for(let i=0;i<starCount.length;i++)
    {
    	starCount[i].style.visibility='visible';
    }
    tilesFlipped=0;
	moves=0;
	openCardsArray=[];
	moveDisplay.innerText=moves;
    clearTime();
    timer();
    for(let i=0;i<cardArray.length;i++)
    {
        cardDeck.innerHTML='';
        tempArray.forEach.call(cardArray,function(item){cardDeck.appendChild(item);});
        //cardArray[i].classList.toggle('match');
        cardArray[i].classList.toggle('open');
        cardArray[i].classList.toggle('show');
        //delay(500);
        setTimeout(function(){//alert("In play function Removing cards");
		for(let i=0;i<cardArray.length;i++)
    {
    	//alert("Removing it");
        cardArray[i].classList.remove('show','open','match');
    }},500);
    }
    for(let i=0;i<cardArray.length;i++)
	{
    	cardArray[i].addEventListener("click",function(event)
    	{//alert("target:"+event.target.className);
    		//let tag=event.target;
    		//alert("Child"+tag);
			openCard(event);
    	});
	}


}


function openCard(event)
{
	let clsLs=event.target.classList;
	if(clsLs.length>=3)
	{
		if(clsLs.length===3)
		{
			alert("Choose other one to match");	
		}
		else
		{
			alert("You already matched it");
		}
		
	}
	else if(clsLs.length===1)
	{
		if(openCardsArray.length===0)
		{
			event.target.classList.toggle("open");
    		event.target.classList.toggle("show");
			openCardsArray.push(event.target);
		}
		else if(openCardsArray.length===1)
		{
			event.target.classList.toggle("open");
    		event.target.classList.toggle("show");
    		moves+=1;
    		moveDisplay.innerText=moves;
    		checkMove();
    		setTimeout(function(){
    		openCardsArray.push(event.target);
			if(openCardsArray[0].innerHTML===openCardsArray[1].innerHTML)
			{
				//alert("great");
				tilesFlipped+=2;
				checkEnd();
				openCardsArray[0].classList.toggle("match");
				openCardsArray[1].classList.toggle("match");
				openCardsArray=[];
			}
			else
			{

				//alert("No");
				//alert(openCardsArray[0]+"   "+openCardsArray[1]);
				openCardsArray[0].style.background="red";
				openCardsArray[1].style.background="red";
				setTimeout(function(){
					//alert("Inside Changing one");
					openCardsArray[0].style.background="";
					openCardsArray[1].style.background="";
					openCardsArray[0].classList.remove('show','open');
					openCardsArray[1].classList.remove('show','open');
					openCardsArray=[];},500);
					
			}},500);
			
		}
	}

}
function checkEnd()
{
	if(tilesFlipped===16)
	{			
				let star=document.querySelector(".stars");
				page.classList.toggle("hidden");
				winner.classList.toggle("hidden");
				document.querySelector(".final-time").innerText="Time: "+time.innerText;
				document.querySelector(".final-moves").innerText="Moves: "+moves;
				let s=document.querySelector(".fstars");
				let str="";
				//for(let i=0;i<starCount.length;i++)
				//{
					//str="<li><i class="+starCount[i]+"><i></li>"
					s.innerText="Stars"
				s.innerHTML=star.innerHTML;
				//}
				//playAgain.addEventListener("click",restart());
	
				tilesFlipped=0;
				moves=0;
				moveDisplay.innerText=moves;
		}
	
}

let reset=document.querySelector('.restart');
reset.addEventListener("click",function(){restart();});
function restart()
{
	//alert("Restarting Game");
    	window.location.reload();
}
function checkMove()
{
	if(moves>20&&moves<=30)
	{
		starCount[2].style.visibility="collapse";
	}
	else if(moves>30)
	{
		starCount[1].style.visibility="collapse";
	}
}

function timer() 
{
    t = setTimeout(add, 1000);
}

function add() 
{
    seconds++;
    if (seconds >= 60) 
    {
        seconds = 0;
        minutes++;
        if (minutes >= 60) 
        {
            minutes = 0;
            hours++;
        }
    }
    
    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function clearTime()
{
	seconds=0;
	minutes=0;
	hours=0;
	time.innerText="00:00:00";
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
