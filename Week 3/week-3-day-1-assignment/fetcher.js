// Helper: delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


const resilientFetch = async (url) => {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`Attempt ${attempt} of ${maxAttempts} for ${url}...`);
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log(`✅ Success: ${JSON.stringify(data)}`);
            return data;
        } catch (error) {
            if (attempt < maxAttempts) {
                await delay(1000);
            }
        }
    }

    const result = {
        success: false,
        error: `Failed after ${maxAttempts} attempts`,
        url,
        attempts: maxAttempts
    };
    console.log(`❌ Failed:`, result);
    return result;
};

//resilientFetch('https://jsonplaceholder.typicode.com/posts/1');
//resilientFetch('https://jsonplaceholder.typicode.com/invalid-endpoint-that-404s');