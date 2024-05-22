
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');


// step 1......................................................................................
let cellSize = 50;
let cellSize1 = 50;
let boardHeight = 600;
let boardWidth = 1000;

//snake cells jiski bjase snake ki rectangle ban rhe hai
let snakeCells = [[0,0]]

let direction = 'right';

let foodCell = foodGen();

let gameOver = false;



document.addEventListener('keydown', function(event){

    if(event.key === "ArrowUp"){
        direction = 'up';
    }
    else if(event.key === "ArrowRight"){
        direction = 'right';

    }else if (event.key === "ArrowDown"){
        direction = 'down';

    }else if (event.key === "ArrowLeft"){
        direction = 'left';
    }
    // console.log(event);
})



function foodGen (){
    return[
    Math.round((Math.random()* (boardWidth - cellSize))/cellSize)* cellSize, //x
    Math.round((Math.random()* (boardHeight - cellSize))/cellSize)* cellSize //y
    ]
}
 

// draw a snake
function draw(){

    if(gameOver === true){
        clearInterval(intervalTime);
        ctx.fillStyle = 'red'
        ctx.font = '50px sans-serif'
        ctx.fillText('Game Over!!' , 350,300)
        return;
    }

    ctx.fillStyle = 'blue';
    ctx.fillText('Score:' , 20, 20)

    // erase poori board 
    ctx.clearRect(0,0,boardWidth,boardHeight)    
    

    // snake drawing..............
    for(let cells of snakeCells){
        ctx.fillStyle = 'red'
        ctx.fillRect(cells[0], cells[1], cellSize, cellSize)
        // ctx.strokeStyle = "golden"
        // ctx.strokeRect(item[0] , item[1] , cellSize ,cellSize );
       
    }

    // draw food
    ctx.fillStyle = 'yellow';
    ctx.fillRect(foodCell[0], foodCell[1], cellSize, cellSize);
}



// will update from time to time...
function update(){
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];
    
    let newHeadX;
    let newHeadY;
    
    if(direction === "right"){
        newHeadX = headX + cellSize;
        newHeadY = headY;
        if(newHeadX === boardWidth || chekMate(newHeadX, newHeadY)){
            gameOver = true;
        }        
    }else if (direction === "left"){
        newHeadX = headX - cellSize;
        newHeadY = headY;
        if(newHeadX < 0 || chekMate(newHeadX, newHeadY)){
            gameOver = true;
        }
    }else if(direction === "up"){
        newHeadX = headX;
        newHeadY = headY - cellSize;
        if(newHeadY <0 || chekMate(newHeadX, newHeadY)){
            gameOver = true;
        }
    }else{
        newHeadX = headX;
        newHeadY = headY + cellSize;
        if(newHeadY === boardHeight || chekMate(newHeadX, newHeadY)){
            gameOver = true;
        }
    }

    snakeCells.push([newHeadX, newHeadY]);

    if(newHeadX === foodCell[0] && newHeadY === foodCell[1]) 
    {
        foodCell = foodGen();
    }else{
        snakeCells.shift();
    }

} 

function chekMate(newHeadX, newHeadY){
    for(let item of snakeCells){
        if(item[0] === newHeadX && item[1] === newHeadY){
            return true;
        }
    }
    return false;
}



let intervalTime = setInterval(function(){
    update();
    draw();
}, 300)




























