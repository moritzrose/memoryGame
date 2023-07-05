"use strict"

const player1 = {
    score: 0
}

const player2 = {
    score: 0
}

const compare = {

    player: 1,

    cardsClicked: [], 

    counter(target) {
        if(!this.cardsClicked.includes(target)){     //to make sure, pairs can't be found by clicked the same card twice
            this.cardsClicked.push(target)
            if(this.cardsClicked.length === 2){
                if(this.cardsClicked[0].className === this.cardsClicked[1].className){
                    this.popUpSuccess(`.${this.cardsClicked[0].className.slice(5)}`)
                }
                else this.popUpNoSuccess()
                }
            }    
        },
            
    //------------------Success-----------------------
    popUpSuccess(selector){
       const cards = document.querySelectorAll(selector)

       this.cardsClicked = []
       
       //-------------Show "Well done"
       popUpSuccess.showModal()

       for(const card of cards){
        card.style.border = "4px solid #68ff04"
        card.style.transform = "scale(1.2)"
       }
       //-------------Close "Well done"
       setTimeout(function(){     
            
        popUpSuccess.close()
  
            for(const card of cards){
                card.style.visibility = "hidden",2000
       }}, 2000)
       //-------------getPoint--------------
       
       if (this.player === 1) player1.score += 1
       if (this.player === 2) player2.score += 1

    },
    //-------------No Success-----------------------
    popUpNoSuccess(){
        const cards = document.querySelectorAll(".card")

        this.cardsClicked = []

        //-------------switch Player if cards don't match----------
        if (this.player === 1){
            this.player = 2
           } else
           if (this.player === 2){
            this.player = 1
        }

        popUpNoSuccess.showModal()

        setTimeout(function(){     
             
         popUpNoSuccess.close()
   
             for(const card of cards){
                 card.classList.add("hidden")
        }}, 2000)
     }
}

//--------------Difficulties----------------
    let currentdifficulty = []

    const difficulty = document.getElementById("difficulty")
    difficulty.showModal()

document.addEventListener("DOMContentLoaded",() => {



    const easy = document.getElementById("easy")
    const medium = document.getElementById("medium")
    const hard = document.getElementById("hard")

    easy.addEventListener("click", () => {
        currentdifficulty = [4, "1fr 1fr"]
        for (let i=1; i<=currentdifficulty[0]*2;i++){
            const a = document.createElement("a")
            a.classList.add("card", "hidden")
            playfield.appendChild(a)
        }
        difficulty.close()
        startGame()
    })
    medium.addEventListener("click", () => {
        currentdifficulty = [6, "1fr 1fr 1fr"]
        for (let i=1; i<=currentdifficulty[0]*2;i++){
            const a = document.createElement("a")
            a.classList.add("card", "hidden")
            playfield.appendChild(a)
        }
        difficulty.close()
        startGame()

    })
    hard.addEventListener("click", () => {
        currentdifficulty = [8, "1fr 1fr 1fr 1fr"]
        for (let i=1; i<=currentdifficulty[0]*2;i++){
            const a = document.createElement("a")
            a.classList.add("card", "hidden")
            playfield.appendChild(a)
        }
        difficulty.close()

        startGame()
    })


    const playfield = document.querySelector(".playfield")
        
    const newGameButton = document.querySelectorAll(".newGame")
    const newGame1 = document.getElementById("newGame1")
    const newGame2 = document.getElementById("newGame2")
    const newGame3 = document.getElementById("newGame3")
    
    
    let playerpoint1 = document.getElementById("player1")
    playerpoint1.innerText = player1.score
    let playerpoint2 = document.getElementById("player2")
    playerpoint2.innerText = player2.score
   
    const player1wins = document.getElementById("player1wins")
    const player2wins = document.getElementById("player2wins")
    const player3wins = document.getElementById("nobodywins")
    
    const resetButton = document.querySelector(".reset")
    
    const popUpNoSuccess = document.getElementById("popUpNoSuccess")
    const popUpSuccess = document.getElementById("popUpSuccess")
    
    let CardCounter = []
    
    //-------------------startingGame----------------------
    function startGame(){

        let cards = document.querySelectorAll(".playfield .card")

        //building the playfield
        playfield.style.gridTemplateRows = currentdifficulty[1]
        
        
        for (let i = 1; i <= currentdifficulty[0]; i++) {
            CardCounter.push(`card${i}`, `card${i}`);
        }
        
        //assigning the pictures to the cards
        
        CardCounter.sort(() => Math.random() - 0.5)
        
        for (let index = 0; index < cards.length; index++){
            cards[index].classList.add(CardCounter[index])
        }
        //------------------------------click on card------------------------------
        for (let card of cards){
            card.addEventListener("mouseup", (event) => {
                card.classList.remove("hidden")
                compare.counter(event.target)        
                
                playerpoint1.innerText = player1.score
                playerpoint2.innerText = player2.score
                
                if((player1.score + player2.score) === CardCounter.length/2) {
                    if (player1.score > player2.score) {
                        
                        setTimeout(() => {
                            player1wins.showModal()
                            setTimeout(() => {
                                newGame1.style = "display:"
                            },1000)
                        }, 1000)
                    } else if(player1.score < player2.score){
                        setTimeout(() => {
                            player2wins.showModal()
                            setTimeout(() => {
                                newGame2.style = "display:"
                            },1000)
                        }, 500)
                    } else {
                        setTimeout(() => {
                            player3wins.showModal()
                            setTimeout(() => {
                                newGame3.style = "display:"
                            },1000)
                        }, 500)
                    }
                }
            })
        }
    }
    //------------------------------hitResetButton----------------------------
    resetButton.addEventListener("mouseup", () =>{
        
        //----------turn over cards and delete old reference-------------
        
        let cards = document.querySelectorAll(".playfield .card")
        
        newGame1.style = "display: none"
        newGame2.style = "display: none"
        
        compare.cardsClicked = []
        
        
        player1.score = 0
        player2.score = 0
        
        playerpoint1.innerText = player1.score
        playerpoint2.innerText = player2.score
        
        for (let card of cards){
            card.classList.add("hidden")
            
            card.style = ""
            
            for (let i =1; i<=currentdifficulty[0]; i++){
                if (card.classList.contains("card" + i)){
                    card.classList.remove("card" + i)
                }
            }
        }
        //-------------shuffle cards----------------------
        
        CardCounter = CardCounter.sort(() => Math.random() - 0.5)
        
        for (let index = 0; index < cards.length; index++){
            cards[index].classList.add(CardCounter[index])
        }
    })
    
    //----------------Hit NewGame Button-------------
    //------------------------------shuffle cards----------------------------
    
    
    
    for(const button of newGameButton){
        button.addEventListener("mouseup", () =>{
            
            newGame1.style = "display: none"
            newGame2.style = "display: none"
            //----------turn over cards and delete old reference-------------
            
            let cards = document.querySelectorAll(".playfield .card")
            
            player1.score = 0
            player2.score = 0
            
            playerpoint1.innerText = player1.score
            playerpoint2.innerText = player2.score
            
            for (let card of cards){
                card.classList.add("hidden")
                card.style = ""
                
                for (let i =1; i<=currentdifficulty[0]; i++){
                    if (card.classList.contains("card" + i)){
                        card.classList.remove("card" + i)
                    }
                }
            }
            
            //----------------shuffle cards----------------------
            
            CardCounter = CardCounter.sort(() => Math.random() - 0.5)
            
            for (let index = 0; index < cards.length; index++){
                cards[index].classList.add(CardCounter[index])
            }
            player1wins.close()            
            player2wins.close()
        })
    }    
})