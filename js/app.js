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

//add event lsitener to window object to load the game
window.addEventListener("load",function()
	{
		//alert("READY TO MATCH!!!!!!");
		startGame(); //calling startGame to startGame
	});
function shuffle(array) //shuffle cards function
 {
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

function startGame() //starts Game
{
	//cardArray=[...card];
	cardArray=shuffle(cardArray); //shuffle the cards
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
    timer();           //start the timer
    for(let i=0;i<cardArray.length;i++) //adding shuffled cards to card element
    {
        cardDeck.innerHTML='';
        tempArray.forEach.call(cardArray,function(item){cardDeck.appendChild(item);});
        //cardArray[i].classList.toggle('match');
        cardArray[i].classList.toggle('open');			//show cards initial 
        cardArray[i].classList.toggle('show');
        //delay(500);
        setTimeout(function(){//alert("In play function Removing cards");
		for(let i=0;i<cardArray.length;i++)
    {
    	//alert("Removing it");
        cardArray[i].classList.remove('show','open','match'); //close them after initial display of about 700 milliseconds
    }},700);
    }
    for(let i=0;i<cardArray.length;i++) //event listener to cards
	{
    	cardArray[i].addEventListener("click",function(event)
    	{//alert("target:"+event.target.className);
    		//let tag=event.target;
    		//alert("Child"+tag);
			openCard(event); //function to open cards
    	});
	}


}


function openCard(event)
{
	let clsLs=event.target.classList;
	if(clsLs.length>=3) //already selceted 
	{
		if(clsLs.length===3)
		{
			alert("Choose other one to match");	//asking other selection to match
		}
		else //already matched cards
		{
			alert("You already matched it"); //alert the user that the card is already matched
		}
		
	}
	else if(clsLs.length===1) //opening a closed card
	{
		if(openCardsArray.length===0) //no element in checking array
		{
			event.target.classList.toggle("open");
    		event.target.classList.toggle("show");
			openCardsArray.push(event.target);
		}
		else if(openCardsArray.length===1) //already element in checking array compare the elements
		{
			event.target.classList.toggle("open");
    		event.target.classList.toggle("show");
    		moves+=1; //Increment moves 
    		moveDisplay.innerText=moves;
    		checkMove(); //track the number of moves
    		/*Checking the opened cards*/
    		setTimeout(function(){
    		openCardsArray.push(event.target);
			if(openCardsArray[0].innerHTML===openCardsArray[1].innerHTML) //card matches
			{
				//alert("great");
				tilesFlipped+=2; //track the number of cards flipped
				checkEnd();     //to check end of game
				openCardsArray[0].classList.toggle("match");
				openCardsArray[1].classList.toggle("match");
				openCardsArray=[];
			}
			else //card dismatches
			{

				//alert("No");
				//alert(openCardsArray[0]+"   "+openCardsArray[1]);
				openCardsArray[0].style.background="red";   //highlight them red
				openCardsArray[1].style.background="red";
				setTimeout(function(){
					//alert("Inside Changing one");
					openCardsArray[0].style.background=""; //rest to original color
					openCardsArray[1].style.background="";
					openCardsArray[0].classList.remove('show','open');	//close dismatched cards after 500 milliseconds
					openCardsArray[1].classList.remove('show','open'); 
					openCardsArray=[];},500);
					
			}},500);
			
		}
	}

}
function checkEnd()
{
	if(tilesFlipped===16) //indicates end of game
	{			
			/*display the winner message*/
				let star=document.querySelector(".stars");
				page.classList.toggle("hidden");
				winner.classList.toggle("hidden");
				document.querySelector(".final-time").innerText="Time: "+time.innerText;
				document.querySelector(".final-moves").innerText="Moves: "+moves;
				let s=document.querySelector(".fstars");
				let str="";
				s.innerHTML=star.innerHTML;				
				/*reset*/
				tilesFlipped=0;
				moves=0;
				moveDisplay.innerText=moves;
		}
	
}

let reset=document.querySelector('.restart'); //onclicking reset button
reset.addEventListener("click",function(){restart();});  //refreshing
function restart()
{
	//alert("Restarting Game");
    	window.location.reload();
}
function checkMove() //track moves
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

function timer() //timer 
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

function clearTime() //clear time
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
