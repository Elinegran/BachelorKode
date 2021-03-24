

export const buttonNyAktivitet = {
    path: '/NyAktivitet',
    id: 'NyAktivitet',
    buttonLabel: 'Legg til ny aktivitet',
    img: require ('../../assets/images/Forside/draw_add_activity.svg').default,
    alt: 'NyAktivitet'
}

export const buttonRegBruker = {
    path: '/RegBruker',
    id: 'RegBruker',
    buttonLabel: 'Registrer bruker',
    img: require ('../../assets/images/Forside/draw_add_user.svg').default,
    alt: 'Registrer Bruker',
}

export const buttonLenkebibliotek = {
    path: '/Lenkebibliotek',
    id: 'lenkebib',
    buttonLabel: 'Endre Lenkebibliotek',
    img: require ('../../assets/images/Forside/draw_link.svg').default,
    alt: 'Lenkebibliotek',
}

export const buttonFAQ = {
    path: '/FAQ',
    id: 'FAQ',
    buttonLabel: 'Endre FAQ',
    img: require ('../../assets/images/Forside/draw_faq.svg').default,
    alt: 'FAQ',
}

export const circleMeldinger = {
    path: '/Meldinger',
    id: 'meldinger',
    alt: 'Meldingsikon',
    img: require ('../../assets/images/Forside/draw_mail_1.png').default,
    // Dette tallet burde komme fra databasen med antall uleste meldinger. 3 er bare et eksempel
    subText: '12',
    buttonLabel: 'Meldinger'
}

export const circleBrukeroversikt = {
    path: '/Brukeroversikt',
    id: 'brukeroversikt',
    // Dette tallet burde komme fra databasen med antall dager igjen til NAV frist. 7 er bare et eksempel
    buttonLabel: 'Brukere',
    subText: '27' + ' Aktive',
    buttonLabel: 'Brukeroversikt',
    img: require ('../../assets/images/Forside/icon_users.png').default
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

export const slides = {
    slide1: require ('../../assets/images/Forside/slide1.jpg').default,
    slide2: require ('../../assets/images/Forside/slide2.jpg').default,
    slide3: require ('../../assets/images/Forside/slide3.jpg').default
}

