  let score = JSON.parse(localStorage.getItem('score')) || 
      {
        wins: 0,
        losses: 0,
        ties: 0
      };

      updatescoreElement();

       function pickcomputerMove()
      {
        const randomNumber = Math.random();
        let computerMove = '';

        if(randomNumber>=0 && randomNumber < (1/3))
        {
          computerMove = 'rock';
        }
        else if(randomNumber >= (1/3) && randomNumber < (2/3))
        {
          computerMove = 'paper';
        }
        else if(randomNumber >= (2/3) && randomNumber < 1)
        {
          computerMove = 'scissors';
        }
         
        return computerMove;
      }

      let isautoplaying = false;
      let intervalid;

      function autoplay() {

        if(!isautoplaying) {
              intervalid = setInterval(() => {
              const playerMove = pickcomputerMove();
              playGame(playerMove);
            },1000);
            isautoplaying = true;
        } else {
          clearInterval(intervalid);
          isautoplaying = false;
        }
        
      }


      function playGame(playerMove)
      {
        let result ='';

        const computerMove = pickcomputerMove();

        if(playerMove === 'rock')
        {
          if(computerMove === 'rock')
          {
            result = 'Tie';
          }

          else if (computerMove === 'paper')
          {
            result = 'You loose';
          }
          
          else if(computerMove === 'scissors')
          {
            result = 'You win';
          }
        }
       else if(playerMove === 'paper')
       {
          if(computerMove === 'rock')
          {
            result = 'You win';
          }

          else if (computerMove === 'paper')
          {
            result = 'Tie';
          }
          
          else if(computerMove === 'scissors')
          {
            result = 'You loose';
          }
       }
       else if (playerMove === 'scissors')
       {
        if(computerMove === 'rock')
        {
          result = 'You loose';
        }

        else if (computerMove === 'paper')
        {
          result = 'You win';
        }
        
        else if(computerMove === 'scissors')
        {
          result = 'Tie';
        }
       }

       if(result === 'You win'){
          score.wins += 1;
        }
        else if(result === 'You loose'){
          score.losses += 1;
        }
        else if (result === 'Tie'){
          score.ties += 1;
        }
          
        localStorage.setItem('score' , JSON.stringify(score));

        updatescoreElement();

        document.querySelector('.js-result')
        .innerHTML = result;

        document.querySelector('.js-moves')
         .innerHTML = 
            `You 
            <img src="https://supersimple.dev/projects/rock-paper-scissors/images/${playerMove}-emoji.png" class = "option-player">
            <img src="https://supersimple.dev/projects/rock-paper-scissors/images/${computerMove}-emoji.png" class = "option-computer" >
            computer`;
      }

      function updatescoreElement() {
        document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
      }

