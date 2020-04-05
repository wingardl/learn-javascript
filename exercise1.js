/* 
Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.

*/ 


function range1(start, end){
    let result = [];
    for(let num = start; num <= end; num++){
        result.push(num);
    }
    return result;
}




/*
Next, write a sum function that takes an array of numbers and returns the sum of these numbers. 
*/

let sum = (numbers) => {
    let result = 0;
    for(let num=0; num < numbers.length; num++){
        curr = numbers[num];
        result+= curr;
    }
    return result;
}


/*
As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used when building the array. 
If no step is given, the elements go up by increments of one, corresponding to the old behavior. 
The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. 
Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
*/ 

function range2(start, end, step = 1){
    result = [];
    if(start < end){
        for(let num = start; num <= end; num += step){
            result.push(num);
        }
    } else {
        for(let num = start; num >= end; num += step){
            result.push(num);
        }
    }
    
    return result;
}

console.log("Test results for sum and range functions:\n")
console.log(sum([1, 2, 3]));
console.log(range1(1,10));
console.log(range2(5, 2, -1));
console.log(sum(range2(1,10)));
console.log(range2(1, 10, 2));
console.log("\n\n");

/*For this exercise, write two functions, reverseArray and reverseArrayInPlace. 
The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. 
*/

let reverseArray = (array) => {
    let result = [];
    let len = array.length;
    for(let i = 0; i < len; i++){
        result.push(array.pop());
    }
    return result;
}


/*
The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.
*/

function reverseArrayInPlace(array){
    for(let i=0, j=array.length-1; i < j; i++){
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
        j--;
    }
    return array;
}

console.log("Test results for reverseArray and reverseArrayInPlace functions:\n")
console.log(reverseArray(["A", "B", "C"]));
let array1 = [1, 2, 3, 4, 5];
console.log(reverseArrayInPlace(array1));

/*
Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument. 
*/

function arrayToList(array){
    let list = {value: 0, rest: {}};
    let head = list;
    for(let i=0; i < array.length; i++){
        list.value = array[i];
        if(i+1 == array.length){
            list.rest = null;
        } else {
            list.rest = {value: 0, rest: {}};
        }
        list = list.rest;
    }
    return head;
}

/*
Also write a listToArray function that produces an array from a list. 
*/

let listToArray = (list) => {
    let array = [];
    let curr = list;
    while(curr != null){
        array.push(curr.value);
        curr = curr.rest;
    }
    return array;
}

/*
Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list,
*/

let prepend = (element, list) => {
    let resultList = {value: element, rest: list};
    return resultList;
}

/*
and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth.
*/

function nth(list, target){
    let currElement = list;
    let currIndex = 0;
    let currValue;
    while(currElement != null && currIndex <= target){
        currValue = currElement.value;
        currElement = currElement.rest;
        currIndex++;
    }
    if(currElement == null){
        return undefined;
    }
    return currValue;
}



console.log("\nTest results for arrayToList, listToArray, prepend, and nth:\n");
console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));

/*
Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, 
where the values of the properties are equal when compared with a recursive call to deepEqual.

To find out whether values should be compared directly (use the === operator for that) or have their properties compared, 
you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. 
But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".

The Object.keys function will be useful when you need to go over the properties of objects to compare them.
*/

function deepEqual(object1, object2){
    if(object1 == null){
        return object2 == null;
    }

    if(typeof object1 != typeof object2){
        return false;
    }

    if(typeof object1 == typeof object2 && typeof object1 != "object"){
        return object1 == object2;
    }

    let props1 = Object.keys(object1);
    let props2 = Object.keys(object2);

    if(props1.length != props2.length) {
        return false;
    }

    for(prop of props1){
        let value1 = object1[prop];
        let value2 = object2[prop];
        if(!deepEqual(value1, value2)){
            return false;
        }
    }
    //acount for additional props in obj2
    return true;

}

console.log("Test results for deepEqual:\n");

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));

console.log(deepEqual(obj, {here: 1, object: 2}));

console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));