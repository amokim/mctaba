// Task 1: Create a Top calculator
calculateTip = (billAmount, numberOfPeople, serviceQuality) => {
    if (numberOfPeople <= 0) {
        return { error: "Number of people must be at least 1" };
    } 
    if (billAmount < 0) {
        return {error: "Bill Amount cannot be negative" };
    }
    let tip;
    if (serviceQuality === "poor") {
        tip = 10;
    } else if (serviceQuality === "good") {
        tip = 15;
    } else if (serviceQuality === "excellent") {
        tip = 20;
    } else {
        tip = 15;
    }
    
    const tipAmount = (tip/100) * billAmount;
    const tipPerPerson = tipAmount / numberOfPeople;
    const totalBill = billAmount + tipAmount;
    const totalPerPerson = totalBill / numberOfPeople;
    return {tipPerPerson, totalPerPerson, totalBill};
};

//Evaluating CalculateTip Function
//console.log(calculateTip(1200, 0, "good"));

// Task 2: Create a Grade Calculator
calculateGrade = score => {
    let weightedAverage = 0;
    let weightedScore = 0;
    let letterGrade;
    for (const item of score) {
        weightedScore += item.weight;
        weightedAverage += item.score * item.weight;
    }
    if (Math.abs(weightedScore - 1.0 ) > 0.01) {
        return {error: "Total sum of weights must be equal to 1" };
    }
    // Evaluating grade based on weighted score
    if (weightedAverage >= 70) {
        letterGrade = "A";
    } else if (weightedAverage >= 60) {
        letterGrade = "B";
    } else if (weightedAverage >= 50) {
        letterGrade = "C";
    } else if (weightedAverage => 40) {
        letterGrade = "D";
    } else {
        letterGrade = "F";
    }
    // Evaluating status based on the letterGrade
    const status = letterGrade === "F" ? "Fail" : "Pass";
    return {weightedAverage, letterGrade, status};
};

// Evaluating the Grade Calculator function
/*
console.log(calculateGrade([
    { name: "Exam", score: 85, weight: 0.4 },
    { name: "Assignment", score: 90, weight: 0.3 },
    { name: "Project", score: 78, weight: 0.3 }
]));
*/

//Task 3: Create a password Strength Checker
checkPasswordStrength = password => {
    let score = 0;
    let missing = [];
    password.length >= 8 ? score += 1 : missing.push("At least 8 characters");
    /[A-Z]/.test(password) ? score += 1: missing.push("Uppercase letter");
    /[a-z]/.test(password) ? score += 1: missing.push("Lowecase letter");
    /[0-9]/.test(password) ? score += 1: missing.push("Number");
    /[!@#$%^&*()_+=-]/.test(password) ? score += 1: missing.push("Special character");
    //Evaluating password strength
    let stregth;
    if (score >= 4) {
        stregth = "Strong";
    } else if (score == 3) {
        stregth = "Medium"
    } else {
        stregth = "Weak"
    }
    return {stregth, score, missing}
};

// Evaluating the check password function
//console.log(checkPasswordStrength("hello"));
//console.log(checkPasswordStrength("MyP@ssw0rd!"));

