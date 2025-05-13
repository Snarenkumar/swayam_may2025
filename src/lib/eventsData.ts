import { z } from "zod";

export type clubsType =
  | "Dhwani"
  | "Nrityatrix"
  | "Raagabhinaya"
  | "Toastmasters"
  | "Saahitya"
  | "Aakriti";
export const clubsNames: clubsType[] = [
  "Dhwani",
  "Nrityatrix",
  "Raagabhinaya",
  "Toastmasters",
  "Saahitya",
  "Aakriti",
];
export const clubsSchema = z.enum([
  "Dhwani",
  "Nrityatrix",
  "Raagabhinaya",
  "Toastmasters",
  "Aakriti",
  "Saahitya",
]);
export const eventsData = {
  Dhwani: [
    {
      id: "clw3q9v6e000008l0h6qy7q1z",
      no: 1,
      name: "Vocal Vistar - Where every voice finds its spotlight",
      description:
        "Celebrate the power of melody in this solo singing event that brings out the soul of India’s musical heritage. Whether you prefer classical or contemporary, let your voice echo the spirit of VIRASAT.",
      rules: [
        "Solo event.",
        "Time limit: 4 minutes (including setup).",
        "Use of pre-recorded background music is allowed, Live accompaniment is also allowed.",
      ],
      registration_fee: 200,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Emmanuel Joseph", phone: "9513090776" },
        { name: "Gifta", phone: "8762362006" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/dhwani/vocal_vistar.svg",
    },
    {
      id: "clw3q9v6e000108l0h6qy7q1z",
      no: 2,
      name: "SPIT FIRE - Ignite the stage with rhythm, rhymes and Beats!",
      description:
        "Showcase your lyrical mastery and rhythmic creativity in this electrifying rapping and beatboxing competition. Let your beats reflect the pulse of tradition meeting innovation.",
      rules: [
        "Solo  Participation.",
        "3-minute performance limit.",
        "Lyrics must be original; any explicit content will lead to disqualification.",
      ],
      registration_fee: 200,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Vallabh Rao", phone: "9148573697" },
        { name: "Mukund", phone: "6364422548" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/dhwani/spit_fire.svg",
    },
    {
      id: "clw3q9v6e000208l0h6qy7q1z",
      no: 3,
      name: "RAAG RANG - Weaving Harmony Through the soul of Indian Music",
      description:
        "Unite in harmony and let your voices weave tales of tradition in this Indian group singing competition. Dive into the cultural melodies of VIRASAT.",
      rules: [
        "Teams of 4-10 members.",
        "Time limit: 8 minutes (including Setup).",
        "Traditional Indian instruments are allowed.",
      ],
      registration_fee: 600,
      prizes: {
        first: "6,000",
        second: "4,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Sajid", phone: "9149559393" },
        { name: "Disha Bhat", phone: "9482190980" },
      ],
      minTeamMembers: 4,
      maxTeamMembers: 10,
      image: "/assets/clubevents/dhwani/raag_rang.svg",
    },
    {
      id: "clw3q9v6e000308l0h6qy7q1z",
      no: 4,
      name: "ECHOES AND BEATS - Where instruments Speak and Creativity Flows",
      description:
        "A showcase of instrumental mastery where music becomes the universal language. Let your instruments bring alive the spirit of VIRASAT.",
      rules: [
        "Individual or duo performances.",
        "Time limit: 5 minutes.",
        "Pre-recorded backing tracks are not allowed.",
      ],
      registration_fee: 200,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Aditi", phone: "9110245919" },
        { name: "Jason", phone: "9019431617" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 2,
      image: "/assets/clubevents/dhwani/echoes_beats.svg",
    },
    {
      id: "clw3q9v6e000408l0h6qy7q1z",
      no: 5,
      name: "BATTLE OF BANDS: Clash of Talent, Power and Pure Music Energy",
      description:
        "The ultimate stage for rock stars to battle it out with electrifying performances. Bring your band and let your music leave the crowd in awe.",
      rules: [
        "Teams of 3-8 members.",
        "Performance time: 8 minutes (including setup).",
        "At least one original composition is encouraged.",
      ],
      registration_fee: 1000,
      prizes: {
        first: "20,000",
        second: "10,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Onkar", phone: "9234236426" },
        { name: "S Rithanya", phone: "8310541198" },
        { name: "Shravya Kote", phone: "8792635071" },
      ],
      minTeamMembers: 3,
      maxTeamMembers: 8,
      image: "/assets/clubevents/dhwani/echoes_beats.svg",
    },
    {
      id: "clw3q9v6e000508l0h6qy7q1z",
      no: 6,
      name: "SYMPHONY SQUAD - Uniting Voices in Perfect Harmony",
      description:
        "A celebration of Western harmony as voices blend into a symphonic spectacle. This group singing event will echo the unity in diversity theme.",
      rules: [
        "Teams of 4-10 members.",
        "Time limit: 6 minutes.",
        "Explicit or offensive content is not allowed.",
      ],
      registration_fee: 600,
      prizes: {
        first: "6,000",
        second: "4,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Prakashika", phone: "9835598951" },
        { name: "Arpita", phone: "9019763381" },
      ],
      minTeamMembers: 4,
      maxTeamMembers: 10,
      image: "/assets/clubevents/dhwani/symphony_squad.svg",
    },
  ],
  Nrityatrix: [
    {
      id: "clw3q9v6e000608l0h6qy7q1z",
      no: 1,
      name: "Nritya Veer - The Brave Solo Performer[INDIAN SOLO]",
      description:
        "Celebrate the elegance of India’s traditional dance forms with mesmerizing moves and vibrant expressions. Let your performance reflect the cultural hues of VIRASAT.",
      rules: [
        "Individual event.",
        "Time limit: 3+1 minute (including setup).",
        "Backdrops and hazardous props prohibited.",
      ],
      registration_fee: 250,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Saniya", phone: "6363357424" },
        { name: "Thanu", phone: "7795190362" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/nrityatrix/indian_solo.svg",
    },
    {
      id: "clw3q9v6e000708l0h6qy7q1z",
      no: 2,
      name: "Urban Nasha - City Style Dance with a Desi Kick [WESTERN SOLO] ",
      description:
        "Step onto the stage and dazzle with high-energy moves that capture global dance styles. Unleash your creativity and rhythm in this solo event.",
      rules: [
        "Individual event.",
        "Time limit: 3+1 minute (including setup).",
        "Props and hazardous materials prohibited.",
      ],
      registration_fee: 250,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Rachitha", phone: "8050746071" },
        { name: "Sambhradha", phone: "8867054035" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/nrityatrix/western_solo.svg",
    },
    {
      id: "clw3q9v6e000808l0h6qy7q1z",
      no: 3,
      name: "VIRASAT ki Jugalbandi - Duet of Heritage [DUET DANCE]",
      description:
        "Two is better than one! Perform in perfect synchronization with your partner in a celebration of coordination and rhythm.",
      rules: [
        "Teams of 2 members.",
        "Time limit: 3+1 minute (including setup).",
        "Props allowed; hazardous materials prohibited.",
      ],
      registration_fee: 320,
      prizes: {
        first: "3,000",
        second: "1,500",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Damini", phone: "8904075454" },
        { name: "Jeevan", phone: "7892066331" },
      ],
      minTeamMembers: 2,
      maxTeamMembers: 2,
      image: "/assets/clubevents/nrityatrix/duet_dance.svg",
    },
    {
      id: "clw3q9v6e000908l0h6qy7q1z",
      no: 4,
      name: "Taandav X Takedown - Where Legends Clash",
      description:
        "Bring the heat to the floor in this spontaneous dance showdown. Unpredictable beats and raw talent take center stage.",
      rules: [
        "This is an individual event, conducted in 1 vs 1 format.",
        "Music will be played spontaneously on the spot.",
      ],
      registration_fee: 250,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Charan", phone: "7892040913" },
        { name: "Chetan", phone: "6363205414" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/nrityatrix/battle.svg",
    },
    {
      id: "clw3q9v6e001008l0h6qy7q1z",
      no: 5,
      name: "Groove Riot [WESTERN GROUP]",
      description:
        "Showcase your team’s creativity and energy through captivating choreography that represents the vibrancy of Western dance styles.",
      rules: [
        "Teams of 8-15 members.",
        "Time limit: 5+2 minutes (including setup and conclusion).",
        "Props encouraged, hazardous materials prohibited.",
      ],
      registration_fee: 1200,
      prizes: {
        first: "8,000",
        second: "5,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Manasvini", phone: "9606793908" },
        { name: "Neethu", phone: "9686742350" },
      ],
      minTeamMembers: 8,
      maxTeamMembers: 15,
      image: "/assets/clubevents/nrityatrix/western_group.svg",
    },
    {
      id: "clw3q9v6e001108l0h6qy7q1z",
      no: 7,
      name: "SwarNatyam - Mega Event",
      description:
        "A grand spectacle combining drama, music, and dance into a thematic performance. Bring the spirit of VIRASAT alive through your artistry.",
      rules: [
        "Teams of 8-17 members.",
        "Performance duration: 5+2 minutes.",
        "Props and costumes encouraged , hazardous materials prohibited.",
      ],
      registration_fee: 1500,
      prizes: {
        first: "25,000",
        second: "15,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "R V Lehanya", phone: "9972977347" },
        { name: "Rahul B S", phone: "7338547046" },
        { name: "Vidhi Jain", phone: "8618415234" },
        { name: "Drishti Luthra", phone: "9103947046" },
        { name: "Amog Anand Keur", phone: "8431085574" },
      ],
      minTeamMembers: 8,
      maxTeamMembers: 17,
      image: "/assets/clubevents/nrityatrix/western_group.svg",
    },
  ],
  Raagabhinaya: [
    {
      id: "clw3q9v6e001208l0h6qy7q1z",
      no: 1,
      name: "Anubhoot - MIME GROUP",
      description:
        "Delve into the art of silent storytelling, where actions speak louder than words. Express emotions and narratives that transcend language barriers with finesse and creativity.",
      rules: [
        "Teams of 6+4 participants.",
        "Time limit: 6+2 minutes(including setup).",
        "Pre-recorded music without lyrics is allowed.",
      ],
      registration_fee: 600,
      prizes: {
        first: "8,000",
        second: "5,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Vaishnavi", phone: "8123680295" },
        { name: "Prabiyot Singh", phone: "8899640581" },
      ],
      minTeamMembers: 6,
      maxTeamMembers: 10,
      image: "/assets/clubevents/raagabhinaya/mime_group.svg",
    },
    {
      id: "clw3q9v6e001308l0h6qy7q1z",
      no: 2,
      name: "Drishyapat - SHORT FILM MAKING",
      description:
        "Lights, camera, action! Create a cinematic masterpiece that tells a story of tradition and modernity. Channel your inner filmmaker.",
      rules: [
        "Teams of up to 5 participants.",
        "Film duration: 6 minutes + 10 seconds.",
        "Topic provided on the spot; 24 hours provided for submission.",
      ],
      registration_fee: 600,
      prizes: {
        first: "8,000",
        second: "5,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Kaviya", phone: "9483447393" },
        { name: "Saniya NB", phone: "9606326894" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 5,
      image: "/assets/clubevents/raagabhinaya/short_film.svg",
    },
    {
      id: "clw3q9v6e001408l0h6qy7q1z",
      no: 3,
      name: "Jashn-e-Hasya - STAND-UP",
      description:
        "Bring the house down with your humor and wit in this solo stand-up comedy event. Make the audience laugh while reflecting the cultural essence of VIRASAT.",
      rules: [
        "Individual event.",
        "Time limit: 4+1 minute (including setup & conclusion).",
        "No offensive content allowed.",
      ],
      registration_fee: 250,
      prizes: {
        first: "4,000",
        second: "3,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Parnitha", phone: "9743306660" },
        { name: "Rohith", phone: "7975375180" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/raagabhinaya/stand_up.svg",
    },
    {
      id: "clw3q9v6e001508l0h6qy7q1z",
      no: 4,
      name: "Rangrekha - GRAPHIC DESIGNING",
      description:
        "Transform your ideas into stunning visuals that captivate and inspire. Let your creativity shine in this design competition.",
      rules: [
        "Individual event.",
        "Topic provided on the spot.",
        "Submit in JPEG, JPG, or PNG format within 24 hours.",
      ],
      registration_fee: 200,
      prizes: {
        first: "3,000",
        second: "2,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Narmada", phone: "9751308619" },
        { name: "Koustubh", phone: "7829992205" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/raagabhinaya/graphic_design.svg",
    },
    {
      id: "clw3q9v6e001608l0h6qy7q1z",
      no: 5,
      name: "Drishitkon - PHOTOGRAPHY",
      description:
        "Capture the spirit of VIRASAT through your lens. Tell stories that words cannot express in this photography contest.",
      rules: [
        "Individual event.",
        "Images must be original and relevant to the theme.",
        "Basic editing allowed.",
      ],
      registration_fee: 200,
      prizes: {
        first: "3,000",
        second: "2,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Prasanna", phone: "7975158961" },
        { name: "Shreya", phone: "9591848646" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/raagabhinaya/photography.svg",
    },
    {
      id: "clw3q9v6e001708l0h6qy7q1z",
      no: 6,
      name: "Ekanki - MONO ACTING",
      description:
        "Step into the spotlight and showcase your acting skills in this solo performance event. Convey emotions and stories through dramatic artistry.",
      rules: [
        "Individual event.",
        "Performance duration: 2+1 minutes.",
        "Any language permitted.",
      ],
      registration_fee: 200,
      prizes: {
        first: "4,000",
        second: "3,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Joshua", phone: "7892256574" },
        { name: "Pranith", phone: "9019387446" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/raagabhinaya/mono_acting.svg",
    },
    {
      id: "clw3q9v6e001808l0h6qy7q1z",
      no: 7,
      name: "Raahgiri - STREET PLAY",
      description:
        "Command the streets with impactful performances that bring societal issues to the forefront. Fuse energy and creativity to inspire change while honoring the values of VIRASAT.",
      rules: [
        "Teams of 12-20 members.",
        "Time limit: 7+3 minutes (including setup & conclusion).",
        "Props allowed; electronic instruments prohibited.",
      ],
      registration_fee: 800,
      prizes: {
        first: "8,000",
        second: "4,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Heerath", phone: "9797243748" },
        { name: "Preetika", phone: "9622431393" },
      ],
      minTeamMembers: 12,
      maxTeamMembers: 20,
      image: "/assets/clubevents/raagabhinaya/street_play.svg",
    },
    {
      id: "clw3q9v6e001908l0h6qy7q1z",
      no: 8,
      name: "Rangmanch - IMPROV",
      description:
        "Unleash your spontaneity and humor in this improvisation event where quick thinking takes the stage. Create magic on the spot.",
      rules: [
        "Teams of 2-3 participants.",
        "Scenarios provided on the spot.",
        "Multiple entries from an institution are allowed.",
      ],
      registration_fee: 300,
      prizes: {
        first: "4,000",
        second: "3,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Aravind", phone: "9380016889" },
        { name: "Paul", phone: "7411508842" },
      ],
      minTeamMembers: 2,
      maxTeamMembers: 3,
      image: "/assets/clubevents/raagabhinaya/improv.svg",
    },
  ],
  Saahitya: [
    {
      id: "clw3q9v6e002008l0h6qy7q1z",
      no: 1,
      name: "ChronoChatter – Timeless talk, 60 seconds sharp.",
      description:
        "Test your wit and spontaneity in this fast-paced speaking challenge. Keep your thoughts sharp, your words sharper, and impress the audience in “JUST A MINUTE”.",
      rules: [
        "Individual event.",
        "Avoid hesitation, repetition, or deviation.",
        "The use of Queen’s English is encouraged.",
      ],
      registration_fee: 150,
      prizes: {
        first: "3,000",
        second: "2,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Maria", phone: "6362748820" },
        { name: "Nadeem", phone: "6372525448" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/saahitya/jam.svg",
    },
    {
      id: "clw3q9v6e002108l0h6qy7q1z",
      no: 2,
      name: "Judgment Day Joust - Air Crash",
      description:
        "One parachute, one chance to plead, the weight of survival, your words must lead. With wit and charm, you stake your claim, Convince them now or lose the flame.",
      rules: [
        "Individual event.",
        "Time limit: 5 minutes per participant.",
        "No profanity or personal attacks.",
      ],
      registration_fee: 200,
      prizes: {
        first: "3,000",
        second: "2,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Nabi", phone: "7061104766" },
        { name: "Hemapriya", phone: "9148779932" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/saahitya/air_crash.svg",
    },
    {
      id: "clw3q9v6e002208l0h6qy7q1z",
      no: 3,
      name: "The Cipher Sprint - Literary Treasure Hunt",
      description:
        "Embark on a thrilling adventure through words and riddles. Crack literary clues and solve mystery challenges to uncover hidden treasures where time is the ultimate judge.",
      rules: [
        "Teams of 2-3 participants.",
        "Participants must stay within the specified boundaries.",
        "No collaboration between teams will be tolerated.",
      ],
      registration_fee: 600,
      prizes: {
        first: "8,000",
        second: "5,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Sravan", phone: "7204700369" },
        { name: "Vanshika", phone: "7892676862" },
      ],
      minTeamMembers: 2,
      maxTeamMembers: 3,
      image: "/assets/clubevents/saahitya/literary_treasure_hunt.svg",
    },
    {
      id: "clw3q9v6e002308l0h6qy7q1z",
      no: 4,
      name: "Crownference - Team Debate",
      description:
        "Engage in lively intellectual battles, where every argument sharpens your wit. Join forces to tackle critical topics, presenting perspectives with structure and precision. It's a stage to reason, refute, and redefine the narrative.",
      rules: [
        "Teams of 2 members.",
        "Time limit: 15 minutes per round.",
        "Topics provided just before the debate.",
      ],
      registration_fee: 300,
      prizes: {
        first: "4,000",
        second: "2,500",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Sanjay", phone: "7892042237" },
        { name: "Kavyashree", phone: "9019798249" },
      ],
      minTeamMembers: 2,
      maxTeamMembers: 2,
      image: "/assets/clubevents/saahitya/team_debate.svg",
    },
    {
      id: "clw3q9v6e002408l0h6qy7q1z",
      no: 5,
      name: "Inkwell of the Unseen – The ink of emotions touched, not watched.",
      description:
        "From pen to paper, now from perception to prose, writing demands more than fleeting feelings in your mind. Don’t let your senses deceive you; go beyond impressions, unearthing truths that lie beneath. To be a writer is to shape raw sensations into vivid, unforgettable creations.",
      rules: [
        "Individual event.",
        "Time Limit: 5 minutes to interact with the object and 30 minutes to write.",
        "Word Limit: 200 or 300 words.",
      ],
      registration_fee: 200,
      prizes: {
        first: "3,000",
        second: "2,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Prajwal", phone: "6366732380" },
        { name: "Harsha", phone: "8660904600" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/saahitya/sensory_writing.svg",
    },
    {
      id: "clw3q9v6e002508l0h6qy7q1z",
      no: 6,
      name: "The Poetic Gavel - Poet’s Auction",
      description:
        "Step into the world of Slam Poetry but with a twist! The Poet’s Auction challenges teams to craft powerful, original poems while battling in an exhilarating auction for their words. Combine poetic artistry with strategy and performance as you bring your creations to life.",
      rules: [
        "Participation as a team of 2.",
        "Participants must bid for words and compose a poem.",
        "Time limit: 60 minutes.",
      ],
      registration_fee: 200,
      prizes: {
        first: "3,000",
        second: "2,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Mussarrat", phone: "9353801953" },
        { name: "Shivani", phone: "7760783977" },
      ],
      minTeamMembers: 2,
      maxTeamMembers: 2,
      image: "/assets/clubevents/saahitya/poets_auction.svg",
    },
    {
      id: "clw3q9v6e002608l0h6qy7q1z",
      no: 7,
      name: "The Catalyst Chain - Design Domino",
      description:
        "Unleash your inner designer to create stunning narratives through visuals. Build upon each domino for a unique chain of ideas.",
      rules: [
        "Teams of 2 participants.",
        "Time limit: 90 minutes.",
        "Twists revealed every 15 mins.",
        "Submission in digital (JPEG, PNG, or PDF).",
      ],
      registration_fee: 150,
      prizes: {
        first: "2,500",
        second: "1,500",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Aravind", phone: "9740181866" },
        { name: "Sanskritthi", phone: "9663395425" },
      ],
      minTeamMembers: 2,
      maxTeamMembers: 2,
      image: "/assets/clubevents/saahitya/design_domino.svg",
    },
    {
      id: "clw3q9v6e002708l0h6qy7q1z",
      no: 8,
      name: "Kannada Kalarava",
      description:
        "Kannada Kalarava is a vibrant event dedicated to showcasing the richness of Karnataka's culture, Kannada language as well as its literature. Participants will engage in a series of rounds that test their knowledge, creativity and fluency in Kannada.",
      rules: ["Team of 2 participants.", "4 round event."],
      registration_fee: 300,
      prizes: {
        first: "3,000",
        second: "2,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Kavita", phone: "8660761775" },
        { name: "Darshan", phone: "8073797091" },
      ],
      minTeamMembers: 2,
      maxTeamMembers: 2,
      image: "/assets/clubevents/saahitya/kannada_kalarava.svg",
    },
    {
      id: "clw3q9v6e002808l0h6qy7q1z",
      no: 9,
      name: "Model United Nations",
      description:
        "Step into the shoes of world diplomats, navigating the intricate web of global challenges. Engage in thoughtful discussions, negotiate impactful resolutions, and represent nations with conviction. Display leadership, teamwork, and diplomacy as you work to craft a better tomorrow.",
      rules: [
        "Individual participation.",
        "Sessions divided into opening statements, moderated caucus, and resolutions.",
        "Stay in character of your assigned country.",
      ],
      registration_fee: 350,
      prizes: {
        first: "5,000",
        second: "3,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Joel", phone: "8310819628" },
        { name: "Arjun Sharma", phone: "9119289604" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/saahitya/model_united_nations.svg",
    },
  ],
  Aakriti: [
    {
      id: "clw3q9v6e000008l0h6qy7q1a",
      no: 1,
      name: "Pencil Perfection",
      description:
        "Bring your artistic visions to life with detailed pencil or graphic sketches. Whether traditional or digital, showcase your creativity and attention to detail.",
      rules: [
        "Individual event.",
        "Time limit: 2.5 hours + 30 minutes.",
        "Theme provided on-spot.",
      ],
      registration_fee: 300,
      prizes: {
        first: "3,000",
        second: "1,500",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Mythri", phone: "8088836477" },
        { name: "Anish M", phone: "7406777828" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/aakriti/pencil_sketching.svg",
    },
    {
      id: "clw3q9v6e000108l0gp7ge4m2",
      no: 2,
      name: "Painted Smiles",
      description:
        "Turn faces and bodies into vibrant canvases to express the spirit of VIRASAT. Creativity and technique will set you apart in this artistic challenge.",
      rules: [
        "Individual Participation.",
        "Time limit: 2.5 hours + 30 minutes.",
        "Theme: Announced in advance or provided on the spot.",
      ],
      registration_fee: 300,
      prizes: {
        first: "3,000",
        second: "1,500",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Anna Jovitha", phone: "8310616583" },
        { name: "Kushi Patil", phone: "9019722592" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/aakriti/face_painting.svg",
    },
    {
      id: "clw3q9v6e000208l0fn9g4c5c",
      no: 3,
      name: "Doodle on Clay",
      description:
        "Transform plain ceramics into masterpieces by adding intricate and vibrant doodles. A perfect blend of creativity and craftsmanship.",
      rules: [
        "Individual event.",
        "Time limit: 2.5 hours + 30 minutes.",
        "Participants must bring their own ceramic objects (plate, mug, tile, or vase).",
      ],
      registration_fee: 250,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Azezzah", phone: "9242107871" },
        { name: "Dhanush", phone: "6360952142" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/aakriti/ceramic.svg",
    },
    {
      id: "clw3q9v6e000308l0cajwj9tg",
      no: 4,
      name: "Waste to Wonder",
      description:
        "Turn discarded materials into artistic treasures that reflect creativity and innovation. Prove that art has no boundaries.",
      rules: [
        "Individual participation.",
        "Time limit: 2.5 hours + 30 minutes.",
        "Theme (if any) will be announced on the spot.",
      ],
      registration_fee: 250,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Sneha Patil", phone: "9740780242" },
        { name: "Keerthana K A", phone: "8296072082" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/aakriti/treasure.svg",
    },
    {
      id: "clw3q9v6e000408l0h0jh6zsa",
      no: 5,
      name: "Rangoli Rhapsody",
      description:
        "Celebrate Indian traditions by crafting stunning rangoli designs with vibrant colors. Showcase your skills and bring your designs to life.",
      rules: [
        "Individual participation.",
        "Time limit: 2.5 hours + 30 minutes.",
        "Bring your own materials.",
      ],
      registration_fee: 150,
      prizes: {
        first: "1,500",
        second: "800",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Ritesh", phone: "9620571230" },
        { name: "Chandana S H", phone: "9739844329" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/aakriti/rangoli.svg",
    },
    {
      id: "clw3q9v6e000508l0g1kw58em",
      no: 6,
      name: "Mandala Magic",
      description:
        "A Mandala Art Competition offers participants a chance to explore patterns, symmetry, and spiritual symbolism through intricate designs. It encourages mindfulness, creativity, and precision in creating visually captivating circular artwork. The event emphasizes detail, harmony, originality, and adherence to the theme provided.",
      rules: [
        "Individual competition.",
        "Time limit: 2.5 hours + 30 minutes.",
        "Only black pens, fine liners, and pencils are allowed.",
      ],
      registration_fee: 200,
      prizes: {
        first: "3,000",
        second: "1,500",
      },
      date_time: "Will be announced soon",
      coordinators: [
        { name: "Amithesh C", phone: "9113543283" },
        { name: "Sambhardha", phone: "8867054035" },
      ],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/aakriti/mandala_magic.svg",
    },
  ],
  Toastmasters: [
    {
      id: "clw3q9v6e000608l0hr9zhq3d",
      no: 1,
      name: "Katha Yatra - Slide Thru Stories",
      description:
        "The Ultimate Storytelling Challenge Craft imaginative narratives driven by surprise visual prompts. Spin tales that captivate and leave a lasting impression on the audience.",
      rules: [
        "Individual event.",
        "Minimum: 3 minutes, Maximum: 5 minutes.",
        "Incorporate all provided visual prompts.",
      ],
      registration_fee: 200,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [{ name: "Aadil", phone: "8610912825" }],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/toastmasters/slide_thru_stories.svg",
    },
    {
      id: "clw3q9v6e000708l0fp5ep3fw",
      no: 2,
      name: "Virodh Vodh - Turn Coat Debate",
      description:
        "Think Fast. Argue Both Sides. Adapt Instantly. A debate like no other, where you argue both sides of a motion. Quick thinking and adaptability are your best allies in this dynamic contest.",
      rules: ["Individual event.", "Switch stances on cue.", "2 Round event."],
      registration_fee: 200,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [{ name: "Trisha", phone: "8904625443" }],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/toastmasters/turn_coat_debate.svg",
    },
    {
      id: "clw3q9v6e000808l0fmlt4c87",
      no: 3,
      name: "Sabha Sutradhar - Elevate your pitch",
      description:
        "The Ultimate Pitch Challenge Deliver the ultimate pitch in this challenge where persuasion meets clarity. Convince the audience and judges of your vision in minutes.",
      rules: [
        "Individual event.",
        "Time limit: Maximum of 3 minutes.",
        "Use provided visuals or props effectively.",
      ],
      registration_fee: 200,
      prizes: {
        first: "2,000",
        second: "1,000",
      },
      date_time: "Will be announced soon",
      coordinators: [{ name: "Preethi", phone: "7760868083" }],
      minTeamMembers: 1,
      maxTeamMembers: 1,
      image: "/assets/clubevents/toastmasters/elevate.svg",
    },
  ],
};
export const getClubEvents = (clubName: clubsType) => {
  return eventsData[clubName];
};

export const getClubEvent = (clubName: clubsType, id: string) => {
  const events = getClubEvents(clubName);
  let index: number;
  events.forEach((data) => {
    if (data.id == id) index = data.no;
  });
  // @ts-expect-error Index will be defined due to for each loop
  if (!index) throw new Error("Event not found");
  return events[index - 1];
};

// export const someData = () => {
//   const data = {};
//   for (let club in eventsData) {
//     data[club] = getClubEvents(club).map(({ id, name }) => ({
//       id,
//       title: name,
//     }));
//   }
//   console.log(data);
// };

export const getEventDetailsById = (id: string) => {
  for (const event of eventsData.Dhwani) {
    if (event.id == id) return { event, club: "Dhwani" };
  }
  for (const event of eventsData.Aakriti) {
    if (event.id == id) return { event, club: "Aakriti" };
  }
  for (const event of eventsData.Saahitya) {
    if (event.id == id) {
      return { event, club: "Saahitya" };
    }
  }
  for (const event of eventsData.Toastmasters) {
    if (event.id == id) return { event, club: "Toastmasters" };
  }
  for (const event of eventsData.Nrityatrix) {
    if (event.id == id) return { event, club: "Nrityatrix" };
  }
  for (const event of eventsData.Raagabhinaya) {
    if (event.id == id) return { event, club: "Raagabhinaya" };
  }
  return undefined;
};
