import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

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
            cities: "/api/cities",
        }
    })
})

// GET all cities
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

//GET single city with specific id
app.get('/api/cities/:id', (req, res) => {
    const city = cities.find(p => p.id === parseInt(req.params.id));

    if (!city) {
        return res.status(404).json({
            success: false,
            error: 'City not found'
        })
    }

    res.json({
        success: true,
        data: city
    });
})

// POST
app.post('/api/cities', (req, res) => {
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

// DELETE
app.delete('/api/cities/:id', (req, res) => {
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

// PATCH
app.patch('/api/cities/:id', (req, res) => {
    const cityID = parseInt(req.params.id);
    const city = cities.find(c => c.id === cityID);

    if (!city) {
        return res.status(404).json({
            success: false,
            error: `City with ID ${cityID} does not exist`
        });
    }
    const { name, county, population } = req.body ?? {};

    if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
        return res.status(400).json({
            success: false,
            error: 'name must be a non-empty string'
        });
    }

    if (county !== undefined && (typeof county !== 'string' || !county.trim())) {
        return res.status(400).json({
            success: false,
            error: 'county must be a non-empty string'
        });
    }

    if (population !== undefined && (typeof population !== 'number' || population <= 0)) {
        return res.status(400).json({
            success: false,
            error: 'population must be a positive number'
        });
    }

    if (name !== undefined) city.name = name;
    if (county !== undefined) city.county = county;
    if (population !== undefined) city.population = population;

    res.json({
        success: true,
        message: 'City details updated',
        data: city
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
