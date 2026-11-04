// Seed data - 26 books across all six categories, prices in KES
const books = [
    // Fiction
    {
        id: 1,
        title: 'Weep Not, Child',
        author: "Ngugi wa Thiong'o",
        isbn: '978-0-14-018650-2',
        price: 1200,
        category: 'Fiction',
        description: 'The first English-language novel published by an East African author. Njoroge, a young Kikuyu boy, dreams of education while the Mau Mau uprising tears his family apart.',
        coverImage: 'https://picsum.photos/seed/book1/400/600',
        inStock: true,
        createdAt: '2026-01-15T00:00:00.000Z'
    },
    {
        id: 2,
        title: 'The River Between',
        author: "Ngugi wa Thiong'o",
        isbn: '978-0-14-018651-9',
        price: 1100,
        category: 'Fiction',
        description: 'Two Gikuyu villages on opposite ridges are divided by faith and tradition, and Waiyaki tries to unite them through education.',
        coverImage: 'https://picsum.photos/seed/book2/400/600',
        inStock: true,
        createdAt: '2026-01-16T00:00:00.000Z'
    },
    {
        id: 3,
        title: 'Petals of Blood',
        author: "Ngugi wa Thiong'o",
        isbn: '978-0-14-311833-6',
        price: 1500,
        category: 'Fiction',
        description: 'A murder in the village of Ilmorog becomes the lens for a sweeping critique of post-independence Kenya.',
        coverImage: 'https://picsum.photos/seed/book3/400/600',
        inStock: false,
        createdAt: '2026-01-17T00:00:00.000Z'
    },
    {
        id: 4,
        title: 'Dust',
        author: 'Yvonne Adhiambo Owuor',
        isbn: '978-0-345-80254-5',
        price: 1800,
        category: 'Fiction',
        description: 'After Odidi Oganda is gunned down in Nairobi, his family gathers in northern Kenya and confronts decades of buried secrets.',
        coverImage: 'https://picsum.photos/seed/book4/400/600',
        inStock: true,
        createdAt: '2026-01-18T00:00:00.000Z'
    },
    {
        id: 5,
        title: 'Half of a Yellow Sun',
        author: 'Chimamanda Ngozi Adichie',
        isbn: '978-1-4000-9520-9',
        price: 1450,
        category: 'Fiction',
        description: 'Three lives are swept up in the Nigerian Civil War in this story of love, loyalty and the birth and death of Biafra.',
        coverImage: 'https://picsum.photos/seed/book5/400/600',
        inStock: true,
        createdAt: '2026-01-19T00:00:00.000Z'
    },
    {
        id: 6,
        title: 'Things Fall Apart',
        author: 'Chinua Achebe',
        isbn: '978-0-385-47454-2',
        price: 1000,
        category: 'Fiction',
        description: 'Okonkwo, a proud Igbo warrior, watches his world unravel with the arrival of colonial rule and Christian missionaries.',
        coverImage: 'https://picsum.photos/seed/book6/400/600',
        inStock: true,
        createdAt: '2026-01-20T00:00:00.000Z'
    },

    // Non-Fiction
    {
        id: 7,
        title: 'Born a Crime',
        author: 'Trevor Noah',
        isbn: '978-0-399-58817-4',
        price: 1500,
        category: 'Non-Fiction',
        description: 'Stories from a South African childhood under apartheid, told with sharp humour and a deep love for a fearless mother.',
        coverImage: 'https://picsum.photos/seed/book7/400/600',
        inStock: true,
        createdAt: '2026-01-21T00:00:00.000Z'
    },
    {
        id: 8,
        title: 'Unbowed',
        author: 'Wangari Maathai',
        isbn: '978-0-307-27520-5',
        price: 1400,
        category: 'Non-Fiction',
        description: 'The memoir of the Nobel Peace Prize laureate who founded the Green Belt Movement and planted millions of trees across Kenya.',
        coverImage: 'https://picsum.photos/seed/book8/400/600',
        inStock: true,
        createdAt: '2026-01-22T00:00:00.000Z'
    },
    {
        id: 9,
        title: 'Dreams in a Time of War',
        author: "Ngugi wa Thiong'o",
        isbn: '978-0-307-37683-4',
        price: 1350,
        category: 'Non-Fiction',
        description: "Ngugi's memoir of growing up in colonial Kenya during the Second World War and the years leading to the Mau Mau struggle.",
        coverImage: 'https://picsum.photos/seed/book9/400/600',
        inStock: true,
        createdAt: '2026-01-23T00:00:00.000Z'
    },
    {
        id: 10,
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        isbn: '978-0-06-231609-7',
        price: 1750,
        category: 'Non-Fiction',
        description: 'A brief history of humankind, from the cognitive revolution to the present day.',
        coverImage: 'https://picsum.photos/seed/book10/400/600',
        inStock: false,
        createdAt: '2026-01-24T00:00:00.000Z'
    },

    // Technology
    {
        id: 11,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '978-0-13-235088-4',
        price: 3500,
        category: 'Technology',
        description: 'A handbook of agile software craftsmanship: how to write code that is easy to read, change and maintain.',
        coverImage: 'https://picsum.photos/seed/book11/400/600',
        inStock: true,
        createdAt: '2026-01-25T00:00:00.000Z'
    },
    {
        id: 12,
        title: 'The Pragmatic Programmer',
        author: 'David Thomas & Andrew Hunt',
        isbn: '978-0-13-595705-9',
        price: 3800,
        category: 'Technology',
        description: 'Practical advice for software developers, from personal responsibility and career growth to architecture.',
        coverImage: 'https://picsum.photos/seed/book12/400/600',
        inStock: true,
        createdAt: '2026-01-26T00:00:00.000Z'
    },
    {
        id: 13,
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        isbn: '978-1-59327-950-9',
        price: 2800,
        category: 'Technology',
        description: 'A modern introduction to programming with JavaScript, from the basics to the browser and Node.js.',
        coverImage: 'https://picsum.photos/seed/book13/400/600',
        inStock: true,
        createdAt: '2026-01-27T00:00:00.000Z'
    },
    {
        id: 14,
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        isbn: '978-1-4493-7332-0',
        price: 4200,
        category: 'Technology',
        description: 'The big ideas behind reliable, scalable and maintainable systems: databases, replication, partitioning and streams.',
        coverImage: 'https://picsum.photos/seed/book14/400/600',
        inStock: false,
        createdAt: '2026-01-28T00:00:00.000Z'
    },

    // Business
    {
        id: 15,
        title: 'The Lean Startup',
        author: 'Eric Ries',
        isbn: '978-0-307-88789-4',
        price: 1550,
        category: 'Business',
        description: 'How continuous innovation, validated learning and rapid experiments help startups build products people want.',
        coverImage: 'https://picsum.photos/seed/book15/400/600',
        inStock: true,
        createdAt: '2026-01-29T00:00:00.000Z'
    },
    {
        id: 16,
        title: 'Shoe Dog',
        author: 'Phil Knight',
        isbn: '978-1-5011-3592-5',
        price: 1600,
        category: 'Business',
        description: 'The founder of Nike tells the story of building one of the most recognised brands in the world.',
        coverImage: 'https://picsum.photos/seed/book16/400/600',
        inStock: true,
        createdAt: '2026-01-30T00:00:00.000Z'
    },
    {
        id: 17,
        title: 'Zero to One',
        author: 'Peter Thiel',
        isbn: '978-0-8041-3929-8',
        price: 1450,
        category: 'Business',
        description: 'Notes on startups and how to build companies that create genuinely new things.',
        coverImage: 'https://picsum.photos/seed/book17/400/600',
        inStock: true,
        createdAt: '2026-01-31T00:00:00.000Z'
    },
    {
        id: 18,
        title: 'Rich Dad Poor Dad',
        author: 'Robert T. Kiyosaki',
        isbn: '978-1-61268-019-4',
        price: 1100,
        category: 'Business',
        description: 'What the rich teach their kids about money that the poor and middle class do not.',
        coverImage: 'https://picsum.photos/seed/book18/400/600',
        inStock: true,
        createdAt: '2026-02-01T00:00:00.000Z'
    },

    // Self-Help
    {
        id: 19,
        title: 'Atomic Habits',
        author: 'James Clear',
        isbn: '978-0-7352-1129-2',
        price: 1700,
        category: 'Self-Help',
        description: 'An easy and proven way to build good habits and break bad ones through tiny, compounding changes.',
        coverImage: 'https://picsum.photos/seed/book19/400/600',
        inStock: true,
        createdAt: '2026-02-02T00:00:00.000Z'
    },
    {
        id: 20,
        title: 'The 7 Habits of Highly Effective People',
        author: 'Stephen R. Covey',
        isbn: '978-1-9821-3727-4',
        price: 1650,
        category: 'Self-Help',
        description: 'A principle-centred approach to solving personal and professional problems.',
        coverImage: 'https://picsum.photos/seed/book20/400/600',
        inStock: true,
        createdAt: '2026-02-03T00:00:00.000Z'
    },
    {
        id: 21,
        title: 'Deep Work',
        author: 'Cal Newport',
        isbn: '978-1-4555-8669-1',
        price: 1500,
        category: 'Self-Help',
        description: 'Rules for focused success in a distracted world, and why concentration is becoming a rare and valuable skill.',
        coverImage: 'https://picsum.photos/seed/book21/400/600',
        inStock: false,
        createdAt: '2026-02-04T00:00:00.000Z'
    },
    {
        id: 22,
        title: 'The Power of Now',
        author: 'Eckhart Tolle',
        isbn: '978-1-57731-480-6',
        price: 1300,
        category: 'Self-Help',
        description: 'A guide to spiritual enlightenment through living fully in the present moment.',
        coverImage: 'https://picsum.photos/seed/book22/400/600',
        inStock: true,
        createdAt: '2026-02-05T00:00:00.000Z'
    },

    // Academic
    {
        id: 23,
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        isbn: '978-0-262-04630-5',
        price: 6500,
        category: 'Academic',
        description: 'The standard university textbook on algorithms, covering sorting, graphs, dynamic programming and more.',
        coverImage: 'https://picsum.photos/seed/book23/400/600',
        inStock: true,
        createdAt: '2026-02-06T00:00:00.000Z'
    },
    {
        id: 24,
        title: 'Decolonising the Mind',
        author: "Ngugi wa Thiong'o",
        isbn: '978-0-85255-501-6',
        price: 1250,
        category: 'Academic',
        description: 'A classic essay collection on the politics of language in African literature.',
        coverImage: 'https://picsum.photos/seed/book24/400/600',
        inStock: true,
        createdAt: '2026-02-07T00:00:00.000Z'
    },
    {
        id: 25,
        title: 'How Europe Underdeveloped Africa',
        author: 'Walter Rodney',
        isbn: '978-1-78873-118-2',
        price: 1400,
        category: 'Academic',
        description: 'An influential study of how colonialism and trade shaped the economic history of Africa.',
        coverImage: 'https://picsum.photos/seed/book25/400/600',
        inStock: true,
        createdAt: '2026-02-08T00:00:00.000Z'
    },
    {
        id: 26,
        title: 'Calculus: Early Transcendentals',
        author: 'James Stewart',
        isbn: '978-1-285-74155-0',
        price: 5800,
        category: 'Academic',
        description: 'A widely used university calculus textbook with clear explanations and worked examples.',
        coverImage: 'https://picsum.photos/seed/book26/400/600',
        inStock: false,
        createdAt: '2026-02-09T00:00:00.000Z'
    }
];

module.exports = books;
