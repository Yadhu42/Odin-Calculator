const digit = document.querySelector(`.numBtn`);
const operator = document.querySelector(`.opBtn`);
const equals = document.querySelector(`.equals`);
const clear = document.querySelector(`.clear`);
const visual = document.querySelector(`.display`);
const entry = document.createElement(`p`);
visual.appendChild(entry);

entry.textContent=`0`;
let input = [];
let operand = [];
const keyboard = `1234567890`;

digit.addEventListener(`click`,(event) =>{
    operand.push(event.target.textContent);
    console.log(operand);
    displayScreen(operand.join(``));
});

operator.addEventListener(`click`,(event) =>{
    input.push(operand.join(``),event.target.textContent);
    displayScreen(input.join(``)); 
    operand = [];
});

document.addEventListener(`keypress`,(event) =>{
   if(keyboard.includes(event.key)){
    operand.push(event.key);
    displayScreen(operand.join(``));
   }
});

equals.addEventListener(`click`,(event) =>{
    input.push(operand.join(``));
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

function sum(...theArgs){
    return theArgs.reduce((first,current) =>{
        return Number(first) + Number(current);
    });
}

function subtract(a,b){
    return Number(a) - Number(b);
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
        return Number(a)/Number(b);
    }
}

function operate (arr){
    if(arr.length >= 3){
        let count = (arr.length-1)/2;
        for(let i = 0;i<count;i++){
            console.log(arr, arr.length);
            let chunk = selectOperate(arr.slice(0,3));
            arr.splice(0,3,chunk);
           //console.log(input);
        }
        return arr[0];
    }
    else{
        console.log(`smaller`);
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



