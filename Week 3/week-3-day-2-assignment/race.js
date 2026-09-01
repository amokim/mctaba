// Task 2: API Race
const fetchAll = async () => {
    console.log("=== Promise.all Results ===")
    const startTime = Date.now();

    const requests = {
        post: fetch("https://jsonplaceholder.typicode.com/posts/1"),
        user: fetch("https://jsonplaceholder.typicode.com/users/1"),
        todo: fetch("https://jsonplaceholder.typicode.com/todos/1"),
    };

    const [postResponse, userResponse, todoResponse] = await Promise.all(Object.values(requests));

    const [post, user, todo] = await Promise.all([
        postResponse.json(),
        userResponse.json(),
        todoResponse.json(),
    ])

    console.log("Post:", post);
    console.log("User:", user);
    console.log("Todo:", todo)
    const endTime = Date.now();
    console.log(`All completed in: ${endTime - startTime}ms\n`);

    // Selecting the race winner
    console.log("=== Promise.race Winner ===")
    const labelled = Object.entries(requests).map(([name, promise]) => 
        promise.then((res) => ({name, time: Date.now() - startTime}))
    );
    const fastestApi = await Promise.race(labelled);
    console.log(`Fastest API: ${fastestApi.name}s (${fastestApi.time}ms)`);
  
    console.log("\n=== Individual Timings ===");
    const allTimes = await Promise.all(labelled);
    allTimes.forEach(({name, time}) => 
    console.log(`${name}s: ${time}ms`)
    );
};
  
  fetchAll();