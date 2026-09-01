//Task 1: Callback → Promise → Async/Await
// 1. Simulates reading a file
function readFile(filename, callback) {
  setTimeout(() => {
    if (filename === "missing.txt") callback(new Error("File not found"), null);
    else callback(null, `Contents of ${filename}`);
  }, 500);
}

// Function 1 as a promise version
const readFileV1 = (filename) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filename === "missing.txt") {
        reject(new Error("File not found"));
      } else {
        resolve(`Contents of ${filename}`);
      }
    }, 500);
  });
};

// function 1 using async await
const readFileV2 = async (filename) => {
  return await readFileV1(filename);
};


// 2. Simulates fetching a user
function getUser(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) callback(new Error("Invalid user ID"), null);
    else callback(null, { id: userId, name: "Amina", email: "amina@example.com" });
  }, 300);
}

// Rewriting function two as a promise version
const getUserV1 = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error("Invalid user ID"));
      } else {
        resolve({ id: userId, name: "Amina", email: "amina@example.com" });
      }
    }, 300);
  });
};

// Function two as an async wait function based on the promise version
const getUserV2 = async (userId) => {
  return await getUserV1(userId);
};

// 3. Simulates saving to database
function saveToDb(data, callback) {
  setTimeout(() => {
    if (!data.name) callback(new Error("Name is required"), null);
    else callback(null, { ...data, id: Math.floor(Math.random() * 1000), saved: true });
  }, 400);
}

// Rewriting function 3 as Promise version
const saveToDbV1 = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.name) {
        reject(new Error("Name is required"));
      } else {
        resolve({ ...data, id: Math.floor(Math.random() * 1000), saved: true });
      }
    }, 400);
  });
};

// Function three as an async await version
const saveToDbV2 = async (data) => {
  return await saveToDbV1(data);
};

// Running relevant tests in order -> readfile - getUser - savetoDB
// Helper function to run convert the older callback version into a promise
const runCallback = (fn, ...args) =>
  new Promise((resolve) => {
    fn(...args, (err, result) => resolve({ err, result }));
  });

const runTests = async () => {
  console.log("=== readFile ===");

  const readFileCallback = await runCallback(readFile, "data.txt");
  console.log(readFileCallback.err ? `Callback: ${readFileCallback.err.message}` : `Callback: ${readFileCallback.result}`);

  try {
    const p = await readFileV1("data.txt");
    console.log("Promise:", p);
  } catch (error) {
    console.log("Promise:", error.message);
  }

  try {
    const a = await readFileV2("data.txt");
    console.log("Async/Await:", a);
  } catch (error) {
    console.log("Async/Await:", error.message);
  }

  try {
    await readFileV2("missing.txt");
  } catch (error) {
    console.log("Error Handling:", error.message);
  }

  console.log("=== getUser ===");

  const getUserCallback = await runCallback(getUser, 1);
  console.log(getUserCallback.err ? `Callback: ${getUserCallback.err.message}` : "Callback:", getUserCallback.err ? "" : getUserCallback.result);

  try {
    const pu = await getUserV1(1);
    console.log("Promise:", pu);
  } catch (error) {
    console.log("Promise:", error.message);
  }

  try {
    const au = await getUserV2(1);
    console.log("Async/Await:", au);
  } catch (error) {
    console.log("Async/Await:", error.message);
  }

  try {
    await getUserV2(0);
  } catch (error) {
    console.log("Error Handling:", error.message);
  }

  console.log("=== saveToDb ===");
  const saveUsertoDbRunCallback = await runCallback(saveToDb, { name: "Amon", city: "Nairobi" });
  console.log(saveUsertoDbRunCallback.err ? `Callback: ${saveUsertoDbRunCallback.err.message}` : "Callback:", saveUsertoDbRunCallback.err ? "" : saveUsertoDbRunCallback.result);

  try {
    const ps = await saveToDbV1({ name: "Amon", city: "Nairobi" });
    console.log("Promise:", ps);
  } catch (error) {
    console.log("Promise:", error.message);
  }

  try {
    const as = await saveToDbV2({ name: "Amon", city: "Nairobi" });
    console.log("Async/Await:", as);
  } catch (error) {
    console.log("Async/Await:", error.message);
  }

  try {
    await saveToDbV2({});
  } catch (error) {
    console.log("Error Handling:", error.message);
  }
};

runTests();

// Task 2: API Race
const fetchAll = async () => {
  try {
    const [post, user, todo] = await Promise.all ([
      fetch("https://jsonplaceholder.typicode.com/posts/1"),
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/todos/1"),
    ]);
    console.log(post);
  } catch (error) {
    console.log("Error:", error);
  }
};

fetchAll();