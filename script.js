const digit = document.querySelector(`.numBtn`);
const num = document.querySelectorAll(`.digit`);
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
const allSymbols = `+-*/`;

num.forEach((element) =>{
    element.addEventListener(`click`,(event) =>{
        if(event.target.textContent === `Del`){
            deleteNum();
        }
        else{
            operand.push(event.target.textContent);
            displayScreen(operand.join(``));
        }
    });
});

operator.addEventListener(`click`,(event) =>{
    if(operand.length>0){
        input.push(operand.join(``),event.target.textContent);
        displayScreen(input.join(``)); 
        operand = [];
    }
    else{
        operand.push(event.target.textContent);
        input.push(operand.join());
        displayScreen(input.join(``));
        operand=[];
    }
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

    console.log(`before delete:`,operand,input);

    input = checkNegative(input);
    console.log(input);

    operand=[];
    input.pop();

    if(input.length>1){
        displayScreen(input.join(``));
    }
    else{
        displayScreen(`0`);
    }
}

function checkNegative(arr){
    if(allSymbols.includes(arr[0])){
        if(arr[0]===`-`){
            let neg = arr[1];
            arr.splice(0,2,`-${neg}`);
            console.log(arr);
        }
        else{
            arr=arr.slice(1);
            console.log(arr);
        }
    }
    return arr;
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
    arr = checkNegative(arr);

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
        console.log(arr);
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



