const digit = document.querySelector(`.numBtn`);
const operator = document.querySelector(`.opBtn`);
const equals = document.querySelector(`.equals`);
const visual = document.querySelector(`.display`);
const entry = document.createElement(`p`);
visual.appendChild(entry);

let input = [];
let operand = [];

digit.addEventListener(`click`,(event) =>{
operand.push(event.target.textContent);
let display = operand.join(``);
entry.textContent=display;
//console.log(display);
});

operator.addEventListener(`click`,(event) =>{
    input.push(operand.join(``),event.target.textContent);
    display=input.join(``);
    entry.textContent=display;
    //console.log(display);
    operand = [];
});

equals.addEventListener(`click`,(event) =>{
    input.push(operand.join(``));
    display=input.join(``);
    entry.textContent=display;
    //console.log(display);
    operand = [];
    let nums = input.slice();
    input=[];
    entry.textContent=operate(nums);
    //console.log(`final answer:`, operate(nums));

});

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
    return Number(a)/Number(b);
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



