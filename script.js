document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault(); 

    const scoreAndMove = {
        countX: document.querySelector("#cross__count"),
        countO: document.querySelector("#nought__count"),

        scoreBlockX: document.querySelector("#cross"),
        scoreBlockO: document.querySelector("#nought"),

        scoreBoardFooter: document.querySelector(".score-board__footer"),
        needToMoveItem: document.querySelector("#need_to_move_item"),

        crossImg: '<img src="./assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="cross">',
        noughtImg: '<img src="./assets/radio_button_unchecked_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="nought">',

    }

    const items = {
        X: `
            <svg aria-label="Х" role="img" viewBox="0 0 128 128" style="visibility: visible;">
                <path class="hFJ9Ve" d="M16,16L112,112" style="stroke: rgb(84, 84, 84); stroke-dasharray: 135.764; stroke-dashoffset: 0;"></path>
                <path class="hFJ9Ve" d="M112,16L16,112" style="stroke: rgb(84, 84, 84); stroke-dasharray: 135.764; stroke-dashoffset: 0;"></path>
            </svg>
        
        `,
        O: `
            <svg aria-label="O" role="img" viewBox="0 0 128 128" style="visibility: visible;">
                <path class="hFJ9Ve" d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16" style="stroke: rgb(242, 235, 211); stroke-dasharray: 301.635; stroke-dashoffset: 0;"></path>
            </svg>
        `
    }
    const boardGame = {
        ticTacToe: document.querySelector("#tic-tac-toe"),
    }
    const footer = {
        button: document.querySelector("#reset__restart"),
    }

    boardGame.ticTacToe.addEventListener("click", (e) => {
        e.preventDefault(); 

        if(!e.target.classList.contains("item")) return;

        if(scoreAndMove.scoreBlockX.classList.contains("move")){
            scoreAndMove.scoreBlockX.classList.remove("move");
            scoreAndMove.scoreBlockO.classList.add("move");
            scoreAndMove.needToMoveItem.innerHTML = scoreAndMove.noughtImg;
            e.target.innerHTML = items.X;
            e.target.dataset.item = "x";
        }
        else{
            scoreAndMove.scoreBlockO.classList.remove("move");
            scoreAndMove.scoreBlockX.classList.add("move");
            scoreAndMove.needToMoveItem.innerHTML = scoreAndMove.crossImg;
            e.target.innerHTML = items.O;
            e.target.dataset.item = "o";
        }


        const result =
        checkHorizontal(boardGame.ticTacToe) ||
        checkVertical(boardGame.ticTacToe) ||
        checkDiagonal(boardGame.ticTacToe);
    
        if(result){
            document.querySelector(".board").classList.add("disabled");
        
            scoreAndMove.scoreBoardFooter.innerHTML = `
                <span class="need_to_move_info">Winner!</span>
                <span class="need_to_move_item" id="need_to_move_item">
                    ${result === "x" ? scoreAndMove.crossImg : scoreAndMove.noughtImg}
                </span>
            `;
        
            if (result === "x") {
                scoreAndMove.countX.textContent = scoreAndMove.countX.textContent === "-" ? 1 : parseInt(scoreAndMove.countX.textContent) + 1;
            } else {
                scoreAndMove.countO.textContent = scoreAndMove.countO.textContent === "-" ? 1 : parseInt(scoreAndMove.countO.textContent) + 1;
            }
        }

        if(checkDraw(boardGame.ticTacToe) && result === null){
            document.querySelector(".board").classList.add("disabled");

            scoreAndMove.scoreBoardFooter.innerHTML = `
                <span class="need_to_move_info">Draw!</span>
                <span class="need_to_move_item" id="need_to_move_item">
                    <img src="./assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="cross">
                    <img src="./assets/radio_button_unchecked_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="nought">
                </span>
            `;
        }
    });

    footer.button.addEventListener("click", (e) => {
        e.preventDefault(); 

        const rows = Array.from(boardGame.ticTacToe.querySelectorAll("tr"));
        for(let row of rows){
            const cells = Array.from(row.querySelectorAll(".item"));

            for (let cell of cells) {
                delete cell.dataset.item;
                cell.innerHTML = ""; 
            }        
        }


        if(scoreAndMove.scoreBlockO.classList.contains("move")) {
            scoreAndMove.scoreBlockO.classList.remove("move");
            scoreAndMove.scoreBlockX.classList.add("move");
        }

        scoreAndMove.scoreBoardFooter.innerHTML = `
            <span class="need_to_move_info">Moves</span>
            <span class="need_to_move_item" id="need_to_move_item">
                <img src="./assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="cross">
            </span>
        `;

        scoreAndMove.needToMoveItem = document.querySelector("#need_to_move_item");
        document.querySelector(".board").classList.remove("disabled");

    });

    function checkDraw(board){
        const rows = Array.from(board.querySelectorAll("tr"));
        for(let row of rows){
            const cells = Array.from(row.querySelectorAll(".item"));

            for (let cell of cells) {
                if (!cell.dataset.item) {
                    return false;
                }
            }
        } 
        return true;
    }
    function checkDiagonal(board){
        const rows = Array.from(board.querySelectorAll('tr'));
        const mainDiagonal = [
          rows[0].querySelectorAll('.item')[0],
          rows[1].querySelectorAll('.item')[1],
          rows[2].querySelectorAll('.item')[2],
        ].map(cell => cell.dataset.item);
      
        const antiDiagonal = [
          rows[0].querySelectorAll('.item')[2],
          rows[1].querySelectorAll('.item')[1],
          rows[2].querySelectorAll('.item')[0],
        ].map(cell => cell.dataset.item);
      
        if (mainDiagonal.every(val => val === 'x')) return 'x';
        if (mainDiagonal.every(val => val === 'o')) return 'o';
        if (antiDiagonal.every(val => val === 'x')) return 'x';
        if (antiDiagonal.every(val => val === 'o')) return 'o';
      
        return null;
    }
    function checkVertical(board){
        const rows = Array.from(board.querySelectorAll('tr'));
        for (let col = 0; col < 3; col++) {
            const values = rows.map(row => row.querySelectorAll('.item')[col].dataset.item);    
            
            if(values.every(item => item === "x")) return "x";
            if(values.every(item => item === "o")) return "o";
        }

        return null;
    }
    function checkHorizontal(board){
        const rows = board.querySelectorAll("tr");
        for(let row of rows){
            const cells = Array.from(row.querySelectorAll(".item"));
            const values = cells.map(cell => cell.dataset.item);

            if(values.every(item => item === "x")) return "x";
            if(values.every(item => item === "o")) return "o";
        }

        return null;
    }    
});