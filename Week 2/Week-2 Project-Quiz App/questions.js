
// questions.js

const quizQuestions = [
    {
      question: "What is the capital city of Kenya?",
      options: ["Mombasa", "Kisumu", "Nairobi", "Nakuru"],
      correct: 2,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which mobile money platform is the most widely used in Kenya?",
      options: ["Airtel Money", "T-Kash", "M-Pesa", "Equitel"],
      correct: 2,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "What is the highest mountain in Africa?",
      options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Elgon", "Mount Meru"],
      correct: 1,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "In which year did Kenya gain independence from Britain?",
      options: ["1960", "1963", "1965", "1958"],
      correct: 1,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "What does the acronym HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correct: 0,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Which Kenyan city is known as the 'Sunshine City'?",
      options: ["Nairobi", "Mombasa", "Kisumu", "Malindi"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "What is the name of Kenya's first President?",
      options: [
        "Daniel arap Moi",
        "Jomo Kenyatta",
        "Mwai Kibaki",
        "Oginga Odinga"
      ],
      correct: 1,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "Which programming language is primarily used for adding interactivity to web pages?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: 2,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Lake Victoria is shared by Kenya, Uganda, and which other country?",
      options: ["Rwanda", "Tanzania", "Ethiopia", "Burundi"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "What CSS property is used to change the background color of an element?",
      options: ["color", "bg-color", "background-color", "element-color"],
      correct: 2,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Which national park in Kenya is famous for the Great Wildebeest Migration?",
      options: [
        "Tsavo East",
        "Amboseli",
        "Maasai Mara",
        "Lake Nakuru"
      ],
      correct: 2,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "What is the Swahili word for 'freedom'?",
      options: ["Uhuru", "Harambee", "Jambo", "Karibu"],
      correct: 0,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Which method is used to store data in the browser th b at persists after the page is closed?",
      options: [
        "sessionStorage.setItem()",
        "localStorage.setItem()",
        "document.cookie()",
        "window.saveData()"
      ],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "What is the official currency of Kenya?",
      options: [
        "Kenyan Dollar",
        "Kenyan Pound",
        "Kenyan Shilling",
        "Kenyan Franc"
      ],
      correct: 2,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "Which JavaScript array method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correct: 0,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "What is the second-highest mountain in Kenya?",
      options: ["Mount Elgon", "Mount Longonot", "Aberdare Range", "Mount Kulal"],
      correct: 0,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "What is the longest river in Kenya?",
      options: ["Athi River", "Tana River", "Ewaso Ng'iro", "Nzoia River"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Which is the largest county in Kenya by area?",
      options: ["Turkana", "Garissa", "Marsabit", "Kajiado"],
      correct: 2,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Which Kenyan coastal town, known for its Swahili architecture, is a UNESCO World Heritage Site?",
      options: ["Malindi", "Watamu", "Lamu", "Kilifi"],
      correct: 2,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "What is the largest lake located entirely within Kenya's borders?",
      options: ["Lake Naivasha", "Lake Turkana", "Lake Baringo", "Lake Elmenteita"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Which Kenyan lake is famous for the large flocks of flamingos that gather along its shores?",
      options: ["Lake Nakuru", "Lake Victoria", "Lake Magadi", "Lake Jipe"],
      correct: 0,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which desert is located in northern Kenya, near Marsabit?",
      options: ["Sahara Desert", "Chalbi Desert", "Danakil Desert", "Kalahari Desert"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "How many countries share a border with Kenya?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Which ocean does Kenya's coastline border?",
      options: ["Atlantic Ocean", "Pacific Ocean", "Arctic Ocean", "Indian Ocean"],
      correct: 3,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which Kenyan city lies on the shores of Lake Victoria?",
      options: ["Eldoret", "Nyeri", "Kisumu", "Machakos"],
      correct: 2,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "What does the acronym CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Program Utility",
        "Core Processing Unit"
      ],
      correct: 0,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "High Transfer Text Protocol",
        "HyperText Technical Procedure",
        "Home Tool Transfer Protocol"
      ],
      correct: 0,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Which company originally developed the JavaScript programming language in 1995?",
      options: ["Microsoft", "Sun Microsystems", "Netscape", "IBM"],
      correct: 2,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "In what year was the Python programming language first released?",
      options: ["1989", "1991", "1995", "2000"],
      correct: 1,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "Which data structure follows the Last In, First Out (LIFO) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "What does the acronym API stand for?",
      options: [
        "Application Programming Interface",
        "Automated Program Integration",
        "Applied Programming Instruction",
        "Application Process Interaction"
      ],
      correct: 0,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Which HTML tag is used to define an unordered list?",
      options: ["<ol>", "<list>", "<ul>", "<li>"],
      correct: 2,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "What is the time complexity of binary search on a sorted array of n elements?",
      options: ["O(n)", "O(n log n)", "O(1)", "O(log n)"],
      correct: 3,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "Android was originally developed by a startup before being acquired by Google in 2005. What was that startup called?",
      options: ["Android Inc.", "Palm Inc.", "Symbian Ltd.", "BlackBerry Inc."],
      correct: 0,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Sequential Query Logic",
        "Structured Query Language",
        "System Query Language",
        "Standard Question Language"
      ],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "Besides English, what is the national and official language of Kenya?",
      options: ["Swahili", "Kikuyu", "Luo", "Amharic"],
      correct: 0,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "Ugali, a staple food in Kenya, is traditionally made from which ingredient?",
      options: ["Rice flour", "Maize flour", "Wheat flour", "Cassava flour"],
      correct: 1,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "Which Kenyan community, largely from the Rift Valley, is internationally renowned for producing elite long-distance runners?",
      options: ["Maasai", "Kalenjin", "Turkana", "Mijikenda"],
      correct: 1,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "What is the Swahili word for the greeting 'hello'?",
      options: ["Karibu", "Asante", "Jambo", "Pole"],
      correct: 2,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "The Kenyan concept of 'Harambee' refers to which idea?",
      options: [
        "Pulling together / community self-help",
        "A traditional wedding ceremony",
        "A form of Kenyan sculpture",
        "The national anthem"
      ],
      correct: 0,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Which Kenyan environmentalist won the Nobel Peace Prize in 2004?",
      options: ["Wangari Maathai", "Ngozi Okonjo-Iweala", "Graça Machel", "Leymah Gbowee"],
      correct: 0,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "What is the name of the traditional Maasai jumping dance performed by warriors?",
      options: ["Isukuti", "Adumu", "Mwomboko", "Ohangla"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "The nyatiti, an eight-stringed lyre, is a traditional instrument of which Kenyan community?",
      options: ["Kikuyu", "Luo", "Kamba", "Kalenjin"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "The annual camel racing festival known as the Camel Derby is held in which Kenyan town?",
      options: ["Lodwar", "Isiolo", "Maralal", "Wajir"],
      correct: 2,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "Which Kenyan author wrote the novels 'Weep Not, Child' and 'A Grain of Wheat'?",
      options: ["Ngũgĩ wa Thiong'o", "Chinua Achebe", "Meja Mwangi", "Grace Ogot"],
      correct: 0,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Kenya is located on which continent?",
      options: ["Asia", "Africa", "South America", "Europe"],
      correct: 1,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "What is the name of Kenya's highest mountain?",
      options: ["Mount Kilimanjaro", "Mount Kenya", "Mount Elgon", "Mount Longonot"],
      correct: 1,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which Kenyan city serves as the country's main seaport?",
      options: ["Nairobi", "Kisumu", "Mombasa", "Nakuru"],
      correct: 2,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which national park in Kenya lies right next to the country's capital city?",
      options: ["Amboseli National Park", "Tsavo East National Park", "Nairobi National Park", "Maasai Mara National Reserve"],
      correct: 2,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Amboseli National Park is famous for offering views of which iconic mountain located in neighboring Tanzania?",
      options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Elgon", "Mount Meru"],
      correct: 1,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which country borders Kenya to the north?",
      options: ["Somalia", "Uganda", "Tanzania", "Ethiopia"],
      correct: 3,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which country borders Kenya to the south?",
      options: ["Uganda", "Tanzania", "Ethiopia", "South Sudan"],
      correct: 1,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Which country borders Kenya to the west?",
      options: ["Uganda", "Somalia", "Tanzania", "Ethiopia"],
      correct: 0,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Diani Beach, a famous white-sand beach destination, is located along the coast near which Kenyan city?",
      options: ["Malindi", "Mombasa", "Lamu", "Kilifi"],
      correct: 1,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "What is the name of the vast valley, part of a larger system stretching across East Africa, that runs through Kenya from north to south?",
      options: ["The Nile Valley", "The Great Rift Valley", "The Zambezi Valley", "The Congo Basin"],
      correct: 1,
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "Naivasha, known for its flower farms and freshwater lake, is located within which major geographic feature of Kenya?",
      options: ["The Great Rift Valley", "The Chalbi Desert", "The Kenyan Highlands", "The Tana Delta"],
      correct: 0,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Hell's Gate National Park, famous for its dramatic gorge and geothermal activity, is located near which Kenyan town?",
      options: ["Nakuru", "Naivasha", "Nyahururu", "Nanyuki"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "The Maasai Mara National Reserve forms part of a larger cross-border ecosystem shared with which country's Serengeti National Park?",
      options: ["Uganda", "Ethiopia", "Tanzania", "Somalia"],
      correct: 2,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Tsavo National Park, one of the world's largest game reserves, is split into Tsavo East and which other section?",
      options: ["Tsavo North", "Tsavo West", "Tsavo Central", "Tsavo South"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Lake Bogoria, known for its hot springs and geysers, is also a sanctuary for large flocks of which bird?",
      options: ["Pelicans", "Flamingos", "Storks", "Herons"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Mount Kenya, the country's highest peak, is the eroded remnant of what type of geological feature?",
      options: ["A meteorite crater", "An extinct volcano", "A coral reef", "A limestone plateau"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "Which Kenyan town sits directly on the Equator and is a popular stop for tourists to see equator demonstrations?",
      options: ["Nyeri", "Nanyuki", "Meru", "Embu"],
      correct: 1,
      category: "Geography",
      difficulty: "medium"
    },
    {
      question: "What is the name of the highest peak of Mount Kenya, standing at 5,199 metres?",
      options: ["Nelion", "Batian", "Point Lenana", "Point John"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "How many counties is Kenya currently divided into under its constitution?",
      options: ["42", "45", "47", "50"],
      correct: 2,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Lake Magadi, in Kenya's Rift Valley, is a major natural source of which mineral used in industry?",
      options: ["Salt", "Soda ash (trona)", "Gypsum", "Limestone"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "The Aberdare Range is known by which alternative name, which is also the name of a Kenyan county?",
      options: ["Nyandarua", "Kirinyaga", "Laikipia", "Nyeri"],
      correct: 0,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Lake Turkana is nicknamed the 'Jade Sea' because of what?",
      options: ["The shape of its shoreline", "The blue-green colour of its algae-rich waters", "Jade deposits found on its floor", "Its jade-coloured fish species"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "The Mau Forest Complex, Kenya's largest indigenous forest and a critical water catchment area, lies in which part of the country?",
      options: ["The Coast region", "The Rift Valley region", "Northeastern Kenya", "The Nyanza region"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Thomson's Falls, one of Kenya's best-known waterfalls, is located in which town?",
      options: ["Nyahururu", "Nanyuki", "Naivasha", "Kericho"],
      correct: 0,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Kakamega Forest, Kenya's only tropical rainforest, is considered the easternmost remnant of which larger rainforest?",
      options: ["The Congo Basin rainforest", "The Guineo-Congolian rainforest", "The Amazon rainforest", "The Miombo woodland"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Which crop, extensively grown in the highlands around Kericho, makes Kenya one of the world's top exporters?",
      options: ["Coffee", "Tea", "Sugarcane", "Cotton"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Ol Pejeta Conservancy, home to the world's last two northern white rhinos, is located near which Kenyan town?",
      options: ["Nanyuki", "Nyeri", "Naivasha", "Isiolo"],
      correct: 0,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "What time zone does Kenya operate on?",
      options: ["East Africa Time (UTC+2)", "East Africa Time (UTC+3)", "Central Africa Time (UTC+1)", "West Africa Time (UTC+0)"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Nairobi, Kenya's capital, sits at approximately what elevation above sea level, making it one of Africa's highest capital cities?",
      options: ["500 metres", "1,000 metres", "1,795 metres", "3,200 metres"],
      correct: 2,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Mount Kenya National Park and Natural Forest was inscribed as a UNESCO World Heritage Site in which year?",
      options: ["1987", "1997", "2007", "2011"],
      correct: 1,
      category: "Geography",
      difficulty: "hard"
    },
    {
      question: "Githeri, a popular Kenyan dish, is made primarily from maize and which other ingredient?",
      options: ["Beans", "Lentils", "Peas", "Rice"],
      correct: 0,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "What is the Swahili word for 'thank you'?",
      options: ["Karibu", "Asante", "Pole", "Rafiki"],
      correct: 1,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "What is the Swahili word for 'welcome'?",
      options: ["Asante", "Jambo", "Karibu", "Hodi"],
      correct: 2,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "What is the Swahili word for 'friend'?",
      options: ["Rafiki", "Ndugu", "Mzee", "Bwana"],
      correct: 0,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "In the Kenyan flag, what does the red stripe symbolize?",
      options: ["The land and agriculture", "The blood shed during the struggle for independence", "Peace and unity", "The nation's wildlife"],
      correct: 1,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "What two traditional objects are depicted on the shield at the centre of the Kenyan flag?",
      options: ["A spear and shield", "A bow and arrow", "A sword and drum", "A staff and calabash"],
      correct: 0,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "What is the title of Kenya's national anthem?",
      options: ["Mungu Ibariki Afrika", "Ee Mungu Nguvu Yetu", "Wimbo wa Taifa", "Kenya Nchi Yetu"],
      correct: 1,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "Which Kenyan community is widely known for its distinctive red shuka clothing and beadwork?",
      options: ["Kikuyu", "Maasai", "Luhya", "Kamba"],
      correct: 1,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "What is the name of Kenya's central bank, responsible for issuing the Kenyan Shilling?",
      options: ["Bank of Kenya", "Central Bank of Kenya", "National Reserve Bank", "Kenya Commercial Bank"],
      correct: 1,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "Which sport is Kenya's most popular team sport, widely played and watched across the country?",
      options: ["Rugby", "Basketball", "Football (soccer)", "Cricket"],
      correct: 2,
      category: "Culture",
      difficulty: "easy"
    },
    {
      question: "Madaraka Day, celebrated on 1 June, commemorates what milestone in Kenya's history?",
      options: ["Kenya's full independence from Britain", "Kenya attaining internal self-rule from Britain", "The adoption of Kenya's new constitution", "The founding of the Kenyan republic"],
      correct: 1,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Mashujaa Day, celebrated on 20 October, honors whom?",
      options: ["Kenya's founding president", "Kenya's national heroes and freedom fighters", "Kenya's independence delegation", "Kenya's Olympic athletes"],
      correct: 1,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Jamhuri Day, celebrated on 12 December, marks Kenya's transition to what form of government?",
      options: ["A monarchy", "A federation", "A republic", "A colony"],
      correct: 2,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Jomo Kenyatta's well-known book documenting Kikuyu customs and culture is titled what?",
      options: ["Facing Mount Kenya", "Weep Not, Child", "The River Between", "Out of Africa"],
      correct: 0,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Benga, a popular Kenyan music genre known for its fast guitar riffs, originated among which community?",
      options: ["Kikuyu", "Kalenjin", "Luo", "Mijikenda"],
      correct: 2,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Mekatilili wa Menza is remembered in Kenyan history for leading resistance against British colonial rule among which coastal community?",
      options: ["Mijikenda (Giriama)", "Swahili", "Taita", "Pokomo"],
      correct: 0,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "The Lamu Cultural Festival, held annually and featuring dhow races and traditional dances, celebrates which heritage?",
      options: ["Maasai heritage", "Swahili heritage", "Kalenjin heritage", "Somali heritage"],
      correct: 1,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "What single Swahili word, meaning 'let us pull together,' is inscribed as Kenya's national motto?",
      options: ["Uhuru", "Harambee", "Umoja", "Amani"],
      correct: 1,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "What is the Swahili word for 'story'?",
      options: ["Hadithi", "Wimbo", "Methali", "Ngoma"],
      correct: 0,
      category: "Culture",
      difficulty: "medium"
    },
    {
      question: "Isukuti, a traditional drum dance performed during celebrations, is associated with which Kenyan community?",
      options: ["Luhya", "Kamba", "Turkana", "Pokot"],
      correct: 0,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "Mwomboko, a traditional partner dance, is associated with which Kenyan community?",
      options: ["Luo", "Kikuyu", "Maasai", "Kisii"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "Ohangla, an energetic traditional dance and music style, is associated with which Kenyan community?",
      options: ["Luo", "Kalenjin", "Mijikenda", "Meru"],
      correct: 0,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "The town of Wamunyu is famous for which traditional craft, practiced by the Akamba people?",
      options: ["Pottery", "Wood carving", "Basket weaving", "Beadwork"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "The kayamba, a flat rattle instrument made of raffia and seeds, is traditionally used by which Kenyan communities?",
      options: ["Kikuyu and Kalenjin", "Mijikenda and Taita", "Luo and Luhya", "Maasai and Samburu"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "'Moran' (or il-murran) is the traditional term for young warriors among which Kenyan community?",
      options: ["Samburu only", "Maasai", "Turkana", "Rendille"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "The Gede Ruins, an ancient Swahili trading town abandoned in the 17th century, are located near which Kenyan coastal town?",
      options: ["Lamu", "Malindi", "Kilifi", "Watamu"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "Fort Jesus, a 16th-century Portuguese-built fortress and UNESCO World Heritage Site, is located in which Kenyan city?",
      options: ["Lamu", "Malindi", "Mombasa", "Kilifi"],
      correct: 2,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "What is the name of Kenya's leading annual literary award, established in 1974, for outstanding Kenyan writing?",
      options: ["The Caine Prize", "The Jomo Kenyatta Prize for Literature", "The Wahome Mutahi Prize", "The Kenya Book Award"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "Kanga, a colourful wrap garment worn along the Kenyan coast, is traditionally printed with what, in addition to patterns?",
      options: ["Family crests", "Swahili proverbs", "Historical dates", "Religious verses only"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "Kiondo, a traditional hand-woven basket made by Kenyan women, is most commonly made from fibre of which plant?",
      options: ["Cotton", "Sisal", "Papyrus", "Banana leaf"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "Vigango, carved wooden memorial posts honoring deceased elders, are traditionally erected by which Kenyan coastal community?",
      options: ["Swahili", "Mijikenda (Giriama)", "Bajuni", "Digo only"],
      correct: 1,
      category: "Culture",
      difficulty: "hard"
    },
    {
      question: "What does the acronym URL stand for?",
      options: ["Uniform Resource Locator", "Universal Reference Link", "Uniform Reference Locator", "United Resource Link"],
      correct: 0,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "What does the acronym RAM stand for?",
      options: ["Read Access Memory", "Random Access Memory", "Rapid Access Memory", "Run Access Memory"],
      correct: 1,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Which company created the Windows operating system?",
      options: ["Apple", "Microsoft", "IBM", "Google"],
      correct: 1,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "In CSS, which symbol is used to select an element by its class name?",
      options: ["# (hash)", "* (asterisk)", ". (period)", "& (ampersand)"],
      correct: 2,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<href>", "<a>", "<url>"],
      correct: 2,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "What does the acronym GUI stand for?",
      options: ["Graphical User Interface", "General User Input", "Graphic Utility Interface", "Global User Interaction"],
      correct: 0,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "Google was founded in 1998 by Larry Page and which other Stanford PhD student?",
      options: ["Steve Wozniak", "Sergey Brin", "Elon Musk", "Jeff Bezos"],
      correct: 1,
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "What does 'DOM' stand for in web development?",
      options: ["Document Object Model", "Data Object Management", "Document Order Model", "Dynamic Object Model"],
      correct: 0,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "Which JavaScript method is used to select an HTML element by its ID attribute?",
      options: ["document.querySelectorAll()", "document.getElementById()", "document.getElementByClass()", "document.selectId()"],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "What does 'JSON' stand for?",
      options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Ordered Notation", "Joint Syntax Object Notation"],
      correct: 0,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "Which CSS layout module is designed primarily for one-dimensional layouts, such as a single row or column?",
      options: ["CSS Grid", "Flexbox", "Float", "Table layout"],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "Which CSS layout module is designed for two-dimensional layouts, arranging items in rows and columns simultaneously?",
      options: ["Flexbox", "CSS Grid", "Positioning", "Inline layout"],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "What is the programming term for a function that calls itself to solve a smaller instance of the same problem?",
      options: ["Iteration", "Recursion", "Delegation", "Abstraction"],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "Which HTTP status code indicates that a requested web resource could not be found?",
      options: ["200", "301", "404", "500"],
      correct: 2,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "What does the acronym CRUD stand for in database operations?",
      options: ["Create, Read, Update, Delete", "Copy, Read, Update, Delete", "Create, Retrieve, Undo, Delete", "Create, Read, Upload, Delete"],
      correct: 0,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "Which distributed version control system, widely used by developers, was created by Linus Torvalds?",
      options: ["Subversion", "Mercurial", "Git", "CVS"],
      correct: 2,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "In JavaScript, which keyword declares a variable that cannot be reassigned after its initial value?",
      options: ["let", "var", "const", "static"],
      correct: 2,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "Which company originally developed the React JavaScript library?",
      options: ["Google", "Facebook (Meta)", "Microsoft", "Amazon"],
      correct: 1,
      category: "Technology",
      difficulty: "medium"
    },
    {
      question: "What is the time complexity of accessing an element in an array by its index?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      correct: 2,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "Which sorting algorithm works by repeatedly dividing the array in half and has an average time complexity of O(n log n)?",
      options: ["Bubble sort", "Merge sort", "Insertion sort", "Selection sort"],
      correct: 1,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "In the OSI networking model, which layer is responsible for routing data packets between different networks?",
      options: ["Data Link layer", "Network layer", "Transport layer", "Session layer"],
      correct: 1,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "What does the acronym TCP stand for in networking?",
      options: ["Transfer Control Protocol", "Transmission Control Protocol", "Transport Communication Protocol", "Total Control Protocol"],
      correct: 1,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "Which data structure operates on a First In, First Out (FIFO) principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correct: 1,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "What term describes a programming error that occurs while a program is executing, rather than during compilation?",
      options: ["Syntax error", "Logical fallacy", "Runtime error", "Compile-time error"],
      correct: 2,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "Which simple sorting algorithm repeatedly swaps adjacent elements and has a worst-case time complexity of O(n^2)?",
      options: ["Quick sort", "Merge sort", "Bubble sort", "Heap sort"],
      correct: 2,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "What is the Big O notation for searching a specific value in an unsorted array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 2,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "Who is the creator of the Python programming language?",
      options: ["Dennis Ritchie", "Guido van Rossum", "James Gosling", "Bjarne Stroustrup"],
      correct: 1,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "What does the acronym REST stand for in the context of web APIs?",
      options: ["Representational State Transfer", "Remote State Transmission", "Reliable State Transfer", "Representational Server Transfer"],
      correct: 0,
      category: "Technology",
      difficulty: "hard"
    },
    {
      question: "In JavaScript, what term describes a function's ability to remember and access variables from its outer scope even after that scope has finished executing?",
      options: ["Hoisting", "Closure", "Currying", "Scoping"],
      correct: 1,
      category: "Technology",
      difficulty: "hard"
    }
  ];