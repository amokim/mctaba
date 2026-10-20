const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const { AppError, errorHandler} = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(logger);
app.use(rateLimiter);


let cities = [
  { id: 1, name: "Nairobi", county: "Nairobi", population: 4397073 },
  { id: 2, name: "Mombasa", county: "Mombasa", population: 1208333 },
  { id: 3, name: "Kisumu", county: "Kisumu", population: 610082 },
  { id: 4, name: "Nakuru", county: "Nakuru", population: 570674 },
  { id: 5, name: "Eldoret", county: "Uasin Gishu", population: 475716 },
  { id: 6, name: "Thika", county: "Kiambu", population: 279429 },
  { id: 7, name: "Malindi", county: "Kilifi", population: 207253 },
  { id: 8, name: "Kitale", county: "Trans-Nzoia", population: 220111 }
];

let nextId = Math.max(...cities.map(c => c.id)) + 1;

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to week5 API",
        version: "1.0.0",
        endpoints: {
            "GET /": "API info (this page)",
            "GET /api/health": "Health check",
            "GET /api/cities": "List cities. Optional query: ?county=Nairobi&minPopulation=500000",
            "GET /api/cities/:id": "Get a single city by ID",
            "POST /api/cities": "Create a city (requires x-api-key header). Body: { name, county, population }",
            "DELETE /api/cities/:id": "Delete a city (requires x-api-key header)",
            "POST /api/auth/login": "Log in. Body: { email, password }"
        },
        authentication: {
            header: "x-api-key",
            protectedRoutes: ["POST /api/cities", "DELETE /api/cities/:id"]
        },
        rateLimit: "10 requests per 60 seconds per IP"
    })
})

// GET all cities, public no auth needed
app.get('/api/cities', (req, res) => {
    let cityResults = [...cities];

    if (req.query.county) {
        const county = req.query.county.toLowerCase();
        cityResults = cityResults.filter(p => p.county.toLowerCase() === county);
    }

    if (req.query.minPopulation) {
        const minPopulation = parseInt(req.query.minPopulation);
        if (isNaN(minPopulation)) {
            return res.status(400).json({
                success: false,
                error: 'minPopulation must be a number'
            });
        }
        cityResults = cityResults.filter(p => p.population >= minPopulation);
    }
    res.json({
        success: true,
        count: cityResults.length,
        data: cityResults
    });
})

app.get("/api/cities/:id", (req, res, next) => {
  const city = cities.find(c => c.id === parseInt(req.params.id));
  if (!city) throw new AppError("City not found", 404);
  res.json({ success: true, data: city });
});

// health, public no auth needed
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok'
    })
})

// POST - protected needs API key
app.post('/api/cities', auth, (req, res) => {
    const { name, county, population } = req.body ?? {};

    //validation checks
    // name & county - strings, population positive number
    if (typeof name !== 'string' || !name.trim() || typeof county !== 'string' || !county.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Name and county are required'
        });
    }

    if (typeof population !== 'number' || population <=0) {
        return res.status(400).json({
            success: false,
            error: 'Population must be a positive number'
        });
    }


    const newCity = {
        id: nextId++,
        name,
        county,
        population
    }

    cities.push(newCity);
    res.status(201).json({
        success: true,
        data: newCity
    });
})

// DELETE - protected needs API key
app.delete('/api/cities/:id', auth, (req, res) => {
    const cityID = parseInt(req.params.id);
    const index = cities.findIndex(c => c.id === cityID);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: `City with ID ${cityID} does not exist`
        });
    }

    const [deletedCity] = cities.splice(index, 1);

    res.json({
        success: true,
        message: 'City deleted',
        data: deletedCity
    });
});

// POST /api/auth/login - public no need API key
const users = [
    { id: 1, email: 'user@test.com', password: 'password123', name: 'Test User' }
];

app.post('/api/auth/login', (req, res) => {
    const { email, password} = req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'email and password are required'
        });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid email or password'
        });
    }

    res.json({
        message: 'Login successful',
        user: {id: user.id, email: user.email, name: user.name}
    });
});

 // Test route for unexpected errors
app.get('/api/broken-route', (req, res) => {
      throw new Error('Simulated crash');
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});