const digit = document.querySelector(`.numBtn`);
const num = document.querySelectorAll(`.digit`);
const decimal = document.querySelector(`.decimal`);
const operator = document.querySelectorAll(`.sign`);
const equals = document.querySelector(`.equals`);
const clear = document.querySelector(`.clear`);
const visual = document.querySelector(`.display`);
const entry = document.createElement(`p`);
visual.appendChild(entry);

entry.textContent=`0`;
let input = [];
let operand = [];
const keyboard = `1234567890`;
const symbols = `+*/`;
const allSymbols = `+*/-`;

num.forEach((element) =>{
    element.addEventListener(`click`,(event) =>{
        screenOn();
        if(event.target.textContent === `Del`){
            deleteNum();
        }
        else{
            operand.push(event.target.textContent);
            if(event.target.textContent === `.`){
                event.target.setAttribute(`disabled`,true);
            }
            displayScreen(operand.join(``));
        }
        if(operand.length >13){
            num.forEach((element) =>{
                element.setAttribute(`disabled`,`true`);
            })
        }
    });
});


operator.forEach((element) =>{
    element.addEventListener(`click`,(event) =>{
        screenOn();
        if(operand.length>0){
            input.push(operand.join(``),event.target.textContent);
            displayScreen(input.join(``)); 
            operand = [];
            decimal.setAttribute(`disabled`,`false`);
            
            num.forEach((element) =>{
                element.removeAttribute(`disabled`,`true`);
            });
        }
        else{
            operand.push(event.target.textContent);
            input.push(operand.join());
            displayScreen(input.join(``));
            operand=[];
        }
    });
});

document.addEventListener(`keypress`,(event) =>{
   if(keyboard.includes(event.key)){
    operand.push(event.key);
    displayScreen(operand.join(``));
   }
});

equals.addEventListener(`click`,(event) =>{
    if(operand.length>0){
        input.push(operand.join(``));
    }
    else{
        input.pop();
    }
    
    let nums = input.slice();
    operand = [];
    input=[];
    displayScreen(operate(nums));
});

clear.addEventListener(`click`,() =>{
    entry.textContent=`0`;
    input = [];
    operand = [];
});

function displayScreen(content){
    let display = content;
    entry.textContent=display;
}

function deleteNum(){
    if(operand.length>0){
        input.push(operand.join(``));
    }

    input = checkNegativeSymbols(input);

    operand=[];
    input.pop();

    if(input.length>1){
        displayScreen(input.join(``));
    }
    else{
        displayScreen(`0`);
    }
}

function checkNegativeSymbols(arr){
    if(symbols.includes(arr[0])){
        arr=arr.slice(1);
    }

    if(arr[0]===`-`){
        arr.splice(0,2,`-${arr[1]}`);
    }

    for(let i=1;i<=arr.length;i++){
        if(arr[i] === `-`){
            if(symbols.includes(arr[i-1]) ){
                arr.splice(i,2,`-${arr[i+1]}`);
            }
            else if(arr[i+1] === `+`){
                arr.splice(i+1,1);
            }
            else if(arr[i+1] === `-`){
                arr.splice(i,2,`+`);
            }
            else{
                arr.splice(i,2,`+`,`-${arr[i+1]}`);
            }
        }
    }
    if(allSymbols.includes(arr[arr.length-1])){
        arr.pop();
    }
    return arr;
    
}

function sum(...theArgs){
    return theArgs.reduce((first,current) =>{
        return Number(first) + Number(current);
    });
}

function subtract(a,b){
    let rem = Number(a) - Number(b);
    return rem;
}

function multiply(...theArgs){
    return theArgs.reduce((first,current) =>{
        return Number(first) * Number(current);
    },1);
}

function divide(a,b){
    if(Number(b)===0){
        return(`Nah bruh :/`);
    }
    else{
        let rem = Number(a)/Number(b);
        return rem;
    }
}

function operate (arr){
    arr = checkNegativeSymbols(arr);
    if(arr.length >= 3){
        let count = (arr.length-1)/2;
        for(let i = 0;i<count;i++){

            let chunk = selectOperate(arr.slice(0,3));
            arr.splice(0,3,chunk);

        }
        if(arr[0]===undefined || arr[0] === NaN){
            arr[0]=`--`;
            return arr;
        }
        else{
            return +arr[0].toFixed(11);
        }
    }
    else{
        return arr;
    }
}

function selectOperate(arr){

    if(arr.includes(`+`)){
        return sum(arr[0],arr[2]);     
    }
    if(arr.includes(`-`)){
        return subtract(arr[0],arr[2]);
    }
    if(arr.includes(`*`)){
        return multiply(arr[0],arr[2]);
    }
    if(arr.includes(`/`)){
        return divide(arr[0],arr[2]);
    }
        
}

setInterval(screenOff, 15000);

function screenOn(){
    visual.setAttribute(`style`,`background-color:#FFAF00; box-shadow: inset -3px -3px 4px rgb(182, 139, 65), inset 5px 3px 5px rgba(0, 0, 0, 0.6);`);
}

function screenOff(){
    visual.setAttribute(`style`,`background-color:#27391C; box-shadow: inset -3px -3px 4px #3b4f38, inset 5px 3px 5px rgba(0, 0, 0, 0.6);`);
}