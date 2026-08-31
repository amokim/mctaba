// Task 1: Destructuring, Spread and Rest
// Destcturing - Sub Task 1 - Extract name and age from { name: "Amina", age: 24, city: "Nairobi" } into variables

const { name, age } = { name: "Amina", age: 24, city: "Nairobi" };
console.log(name, age);

// Destcturing - Sub Task 2 - Rename name to fullName during destructuring
const { name: fullName } = { name: "Amina", age: 24, city: "Nairobi" };
console.log(fullName);

// Destcturing - Sub Task 3 - Destructure with a default value
const { role = "student" } = { name: "Brian" };
console.log(role);

// Destcturing - Sub Task 4 - Destructure a nested object
const { address: { city, county }} = { name: "Lilian", address: { city: "Mombasa", county: "Mombasa", zip: "80100" } };
console.log(city, county);

// Destcturing - Sub Task 4 - Array destructuring
const [first, , third] = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];
console.log(first, third);

// Spread - Sub Task 1 - Merging two arrays into one
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
console.log(merged);

// Spread - Sub Task 2 - Create a shallow copy of an object and change one property without mutating the original
const mergedCopy = [...merged];
mergedCopy[2] = 8;
console.log(mergedCopy);

// Spread - Sub Task 3 - Use spread to pass array elements as function arguments
const numbers = [1, 2, 3, 4, 5, 6, 7];
console.log(Math.max(...numbers));

// Spread - Sub Task 4 - Merge two objects with the second overriding shared keys
const object1 = {
    a: 1,
    b: 2,
};

const object2 = {
    b: 3,
    c: 4
};

const mergedObjects = {...object1, ...object2}
console.log(mergedObjects);

// Spread - Sub Task 5 - Adding items to the beginning and end of an array without using push/unshift
const arr3 = [11, 12, 13, 14, 15];
const arr4 = [10, ...arr3, 16];
console.log(arr4);


// Rest - Sub Task 1 - A function that accepts any no of arguments and returns their sum
const sum = (...numbers) => {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
};

console.log(sum(100, 200, 300));

// Rest - Sub Task 2 - Write a function that takes a first parameter and collects the rest: function greet(first, ...others)
const greet = (first, ...others) => {
    console.log(`Hello, ${first}!`);
    if (others.length > 0) {
        console.log(`And hello to: ${others.join(', ')}`);
    }
};

greet('Tom', 'Jerry');

// Rest - Sub Task 3 - Destructure an object keeping specific keys and collecting the rest
const person = {
    firstName: 'Tom',
    age: 29,
    location: 'Nairobi, Kenya',
    skills: ['Python', 'JavaScript', 'Kubernetes']
};

const { firstName, ...others} = person;
console.log(firstName);
console.log(others);

// Rest - Sub Task 4 - Write a function head(first, ...rest) that returns the first element and the remaining array
const head = (first, ...rest) => {
    const initialText = first;
    const restOfText = rest.join(', ');
    return [initialText, restOfText];
};

const [firstWord, otherText] = head('Python', 'JavaScript', 'Kubernetes');
console.log(firstWord);
console.log(otherText);


// Rest - Sub Task 5 - Use rest to write a function that logs the first argument and counts the remaining: "First: X, remaining: Y"
const counter = (first, ...rest) => {
    return `First: ${first}, remaining: ${rest.length}`
};

console.log(counter(10,1,2,3,4));