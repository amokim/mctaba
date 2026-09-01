const rateLimitedFetch =  async (urls, maxConcurrent = 3) => {
    const results = new Array(urls.length);
    let completed = 0;
    let nextIndex = 0;

    console.log(`Fetching ${Math.min(maxConcurrent, urls.length)} of ${urls.length} URLs...`);

    const worker = async () => {
        while (nextIndex < urls.length) {
            const currentIndex = nextIndex++;
            const url = urls[currentIndex];

            try {
                const response  = await fetch(url);
                results[currentIndex] = await response.json();
            } catch (err) {
                results[currentIndex] = {error: err.message };
            }
            completed++;
            console.log(`Completed: ${completed}/${urls.length}`);
        }
    }
    const workerCount = Math.min(maxConcurrent, urls.length);
    const wokers = Array.from({length: workerCount}, () => worker());

    await Promise.all(wokers);
    return results;
}

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/users/2",
    "https://jsonplaceholder.typicode.com/comments/1",
    "https://jsonplaceholder.typicode.com/albums/1",
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/photos/1",
    "https://jsonplaceholder.typicode.com/todos/2"
];
  
rateLimitedFetch(urls, 2).then(results => {
    console.log(results);
});