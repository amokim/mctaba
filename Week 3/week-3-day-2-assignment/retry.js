const fetchWithRetry = async (url, maxRetries=3) => {
    console.log(`Fetching ${url}...`)

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            console.log(`Attempt ${attempt} of ${maxRetries}: Success!`);
            console.log('Data:', data);
            return data;
        } catch (error) {
            if (attempt === maxRetries) {
                console.log(`Attempt ${attempt} of ${maxRetries} failed.`)
                throw new Error (`Failed after ${maxRetries} attempts: ${error.message}`);
            }

            const waitTime = Math.pow(2, attempt - 1) * 1000;
            console.log(`Attempt ${attempt} of ${maxRetries} failed. Retrying in ${waitTime}ms...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
        
}   

fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1/3')
    .catch(err => {
        console.log(`Error: ${err.message}`);
    });