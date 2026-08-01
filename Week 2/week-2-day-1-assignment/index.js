// Task 1 Solutions
fizzBuzz = n => {
    for (let i = 1; i <= n; i++) {
        let output = i;
        if (i % 3 === 0 && i % 5 === 0) {
            output = "FizzBuzz"
        }
        else if (i % 3 === 0) {
            output = "Fizz"
        }
        else if (i % 5 === 0) {
            output = "Buzz"
        }
        console.log(output)
    }
        
};

reverseString = str => {
    console.log(str.split("").reverse().join(""))
};


isPalindrome = str => {
    reversedStr = str.split("").reverse().join("").toLowerCase()
    if (str.toLowerCase() === reversedStr) {
        console.log("true")
    }
    else {
        console.log("false")
    }

}

findLargest = arr => {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    console.log(max);
};

countVowels = str => {
    const vowels = ["a", "e", "i", "o", "u"];
    const strArray = str.split("");
    let vowelCount = 0;
    for (const char of strArray) {
        if (vowels.includes(char.toLowerCase())) {
            vowelCount += 1;
        }
    }
    console.log(vowelCount);
};

// Task 2 Solutions
const counties = {
    Nairobi: {
        name: "Nairobi",
        capital: "Nairobi City",
        population: 4397073,
        area: 696, // km²
        borders: ["Kiambu", "Machakos", "Kajiado"]
    },
    Mombasa: {
        name: "Mombasa",
        capital: "Mombasa City",
        population: 1208333,
        area: 230, // km²
        borders: ["Kilifi", "Kwale"]
    },
    Kiambu: {
        name: "Kiambu",
        capital: "Kiambu Town",
        population: 2417735,
        area: 2543, // km²
        borders: ["Nairobi", "Machakos", "Murang'a", "Nyandarua", "Nakuru", "Kajiado"]
    }
};

displayCounty = county => {
    console.log(`${counties[county].name} County | Capital: ${counties[county].capital} | Population: ${counties[county].population.toLocaleString()} | Area: ${counties[county].area} km²`)
}


formatPopulation = num => {
    console.log(num.toLocaleString())
}

bordersString = county => {
    const allBordersButLast = counties[county].borders.slice(0, -1).join(", ");
    const lastBorder = counties[county].borders.slice(-1);
    console.log(`${counties[county].name} borders ${allBordersButLast}, and ${lastBorder} `)
}


// Task 3
const routes = [
    { name: "Route 11 - Eastleigh", fare: 50, stops: ["CBD", "Pangani", "Eastleigh", "Mathare"] },
    { name: "Route 23 - Langata", fare: 80, stops: ["CBD", "Uhuru Gardens", "Langata", "Karen"] },
    { name: "Route 33 - Rongai", fare: 100, stops: ["CBD", "Langata", "Ongata Rongai", "Rimpa"] },
    { name: "Route 34 - South B", fare: 40, stops: ["CBD", "South B", "South C", "Nairobi West"] },
    { name: "Route 44 - Buruburu", fare: 50, stops: ["CBD", "Jogoo Road", "Hamza", "Buruburu"] },
    { name: "Route 46 - Donholm", fare: 60, stops: ["CBD", "Jogoo Road", "Donholm", "Kayole"] },
    { name: "Route 58 - Kikuyu", fare: 120, stops: ["CBD", "Westlands", "Kinoo", "Kikuyu"] },
    { name: "Route 100 - Githurai", fare: 70, stops: ["CBD", "Thika Road", "Roysambu", "Githurai"] },
    { name: "Route 125 - Thika", fare: 200, stops: ["CBD", "Thika Road", "Ruiru", "Juja", "Thika"] },
    { name: "Route 14 - Westlands", fare: 30, stops: ["CBD", "University Way", "Museum Hill", "Westlands"] }
  ];

cheapestRoute = routes => {
    const cheapest = routes.reduce((max, route) => route.fare < max.fare ? route : max);
    console.log(cheapest);
}

routeThroughStop = (routes, stop) => {
    const foundRoutes = [];
    for (const route of routes) {
        if (route.stops.includes(stop)) {
            foundRoutes.push(route.name);
        }
    }
    console.log(`Routes through ${stop}: ${foundRoutes.join(", ")}`);
};

journeyFare = (routes, routeNames) => {
    let totalFare = 0;
    for (const route of routes) {
        if (routeNames.includes(route.name)) {
            totalFare += route.fare;
        }
    }
    const origin = routeNames[0].split(" - ")[1];
    const destination = routeNames[routeNames.length - 1].split(" - ")[1];
    console.log(`Journey Fare (${origin} -> ${destination}): ${totalFare}`);
};

