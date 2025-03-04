const digit = document.querySelector(".numBtn");
const equals = document.querySelector(".equals");

let input = [];
digit.addEventListener("click",(event) =>{
input.push(event.target.textContent);
});

equals.addEventListener("click",(event) =>{
    let nums = input.slice();
    operate(nums);
})


function sum(...theArgs){
    return theArgs.reduce((first,current) =>{
        return Number(first) + Number(current);
    });
}

function subtract(a,b){
    return a-b;
}

function multiply(...theArgs){
    return theArgs.reduce((first,current) =>{
        return first * current;
    },1);
}

function divide(a,b){
    return a/b;
}

function operate (arr){
    if(arr.length>3){
        let count = (arr.length-1)/2;
        for(let i = 0;i<count;i++){
            //console.log(arr, arr.length);
            let chunk = selectOperate(arr.slice(0,3));
            console.log(chunk);
            arr.splice(0,3,chunk);
            console.log(arr);
            //console.log(input);
        }
    }
    else if(arr.length===3){
        console.log(arr, arr.length);
        arr = selectOperate(arr);
        console.log(arr);
    }
    else if (arr.length<3){
        console.log("smaller");
    }
}

function selectOperate(arr){

    if(arr.includes(`+`)){
        //console.log(`answer`, sum(arr[0],arr[2]));
        return sum(arr[0],arr[2]);
        
    }
    if(arr.includes(`-`)){
        console.log(subtract(arr[0],arr[2]));
    }
    if(arr.includes(`*`)){
        console.log(multiply(arr[0],arr[2]));
    }
    if(arr.includes(`/`)){
        console.log(divide(arr[0],arr[2]));
    }
        
}



