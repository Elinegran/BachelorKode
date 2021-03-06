export const buttonCv = {
    path: '/CV',
    id: 'CV',
    buttonLabel: 'Se CV',
    img: require ('../../assets/images/Forside/draw_cv.svg').default,
    alt: 'CV'
}

export const buttonChatbot = {
    path: '/Chatbot',
    id: 'Chatbot',
    buttonLabel: 'Chatbot',
    img: require ('../../assets/images/Forside/draw_chatbot2.svg').default,
    alt: 'Chatbot',
}

export const buttonLenkebibliotek = {
    path: '/Lenkebibliotek',
    id: 'lenkebib',
    buttonLabel: 'Lenkebibliotek',
    img: require ('../../assets/images/Forside/draw_link.svg').default,
    alt: 'Lenkebibliotek',
}

export const buttonFAQ = {
    path: '/FAQ',
    id: 'FAQ',
    buttonLabel: 'FAQ',
    img: require ('../../assets/images/Forside/draw_faq.svg').default,
    alt: 'FAQ',
}

export const circleMeldinger = {
    path: '/Meldinger',
    id: 'meldinger',
    alt: 'Meldingsikon',
    img: require ('../../assets/images/Forside/draw_mail_1.png').default,
    // Dette tallet burde komme fra databasen med antall uleste meldinger. 3 er bare et eksempel
    subText: '5' + ' nye',
    buttonLabel: 'Meldinger'
}

export const circleNavMeldekort = {
    path: '/Meldekort',
    id: 'navMeldekort',
    // Dette tallet burde komme fra databasen med antall dager igjen til NAV frist. 7 er bare et eksempel
    buttonLabel: '7',
    subText: '7' + 'd igjen',
    buttonLabel: 'Aktivitetsplan',
    img: require ('../../assets/images/Forside/navlogo_1.png').default
}

export const circleCalendar = {
    path: '/Kalender',
    id: 'kalender',
    alt: 'Kalenderikon',
    img: require ('../../assets/images/Forside/draw_calendar_1.png').default,
    // Dette tallet burde komme fra databasen med f.eks antall gjøremål denne dagen. 2 er bare et eksempel
    subText: '2' +' hendelser',
    buttonLabel: 'Kalender'
}

// Bilder i karusell
export const slides = {
    slide1: require ('../../assets/images/Forside/slide1.jpg').default,
    slide2: require ('../../assets/images/Forside/slide2.jpg').default,
    slide3: require ('../../assets/images/Forside/slide3.jpg').default
}

