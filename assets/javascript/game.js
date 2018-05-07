$(document).ready(function(){


    var timer = 5;
    
    var intervalId;
    
    var disableClick;
    
    function delayRestart() {
          disableClick = true;
          intervalId = setInterval(countDown, 1000);
    }
    
    function countDown() {
    
        timer--;
    
        $("#userScore").text("You " + crystalGame.stateOfPlay + " -- Game will restart in " + timer + " seconds");
    
        if (timer === 0) {
           crystalGame.stateOfPlay = "continue";
           timer=5;
           clearInterval(intervalId);
           crystalGame.resetGame();
        }
    }
    
        
    
        var crystalGame = {
            userWins:               0,
            userLosses:             0,
            amethystVal: 			0,
            redVal:  			    0,
            sapphireVal:     		0,
            swarovskiVal: 			0,
            targetScore:   			0,
            userScore:   			0,
            lowerLimitGame:    	   19,
            upperLimitGame:       120,
            lowerLimitCrystal:      1,
            upperLimitCrystal:     12,
            stateOfPlay:    "continue",
    
            getRandomInteger: function(lowerLimit,upperLimit){
                return Math.floor(Math.random()*(upperLimit-lowerLimit+1)+lowerLimit);
            },
    
            resetGame: function() {
                this.userScore = 0;
    
                // Generate random number between 19-120
                this.targetScore = this.getRandomInteger(this.lowerLimitGame,this.upperLimitGame);
               
                // Generate random value for gems between 1-12
                this.amethystVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
                this.redVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
                this.sapphireVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
                this.swarovskiVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
    
                // And put the initial values up on the display
                $("#num2Guess").text(this.targetScore);
                $("#userScore").text("0");
                disableClick = false;
            },
    
            startGame: function() {
                // Get initial values for userScore, targetScore and the gems' values
                this.resetGame();
    
                this.userWins   = 0;
                this.userLosses = 0; 
    
                // Display the initial values
                $("#numWins").text("Wins: 0");
                $("#numLosses").text("Losses: 0");
                $("#num2Guess").text(this.targetScore);
            },
    
            
    
            processStateOfPlay: function() {
    
                if (this.userScore == this.targetScore){
                    this.userWins++;
                    $("#numWins").text("Wins: "+this.userWins);
                    this.stateOfPlay = "won";
                    $("#userScore").text("You " + crystalGame.stateOfPlay + " -- Game will restart in " + timer + " seconds");
                    delayRestart();
                } else if (this.userScore > this.targetScore){
                    this.userLosses++;
                    $("#numLosses").text("Losses: "+this.userLosses);
                    this.stateOfPlay = "lost";
                    $("#userScore").text("You " + crystalGame.stateOfPlay + " -- Game will restart in " + timer + " seconds");
                    delayRestart();
                } else {
                    this.stateOfPlay = "continue";
                }
            }
    
        }
    

          $(".gemstone").on("click", function() {
            if (disableClick) {
    
            } else {
                    switch ($(this).attr('value')){
                        case "amethyst":
                            crystalGame.userScore += crystalGame.amethystVal;
                            break;
                        case "red":
                            crystalGame.userScore += crystalGame.redVal;
                            break;
                        case "sapphire":
                            crystalGame.userScore += crystalGame.sapphireVal;
                            break;
                        case "swarovski":
                            crystalGame.userScore += crystalGame.swarovskiVal;
                            break;
                        default:
                            alert("Unknown gem!!");
                            break;
                    }
                    $('#userScore').text(crystalGame.userScore);
    
                    crystalGame.processStateOfPlay();
            }
          });
    
        //Start the game
        crystalGame.startGame();
    
    });