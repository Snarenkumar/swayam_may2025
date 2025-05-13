// src/app/api/chatbot/route.js
import { callGeminiAPI } from "../../../lib/geminiClient";

export async function POST(request) {
  try {
    console.log("Received chat request"); // Debugging
    const body = await request.json();
    const { userInput } = body;

    // console.log("User input:", userInput); // Debugging

    if (!userInput) {
      console.log("Missing userInput"); // Debugging
      return new Response(
        JSON.stringify({ error: "Missing userInput in request body" }),
        { status: 400 }
      );
    }

    const eventDetails = `
      You are a helpful assistant for Swayam 2025, the annual cultural fest of MVJ College of Engineering.
      Here are some key details about the event:

      - Event Name: Swayam 2025
      - Location: MVJ College of Engineering, Bangalore
      - Dates: Will be announced soon
      - Theme: VIRASAT

      About SWAYAM
      For years, SWAYAM has been a beacon of creativity and expression, bringing together the brightest minds and talents in a celebration of cultural brilliance. Rooted in a legacy of excellence, SWAYAM has grown into a dynamic confluence of ideas, art, and innovation. It is more than just a fest; it is a tradition of passion, a testament to artistic exploration, and a stage where inspiration meets execution.
      Within its hallowed grounds, SWAYAM fosters a spirit of unity and showcases the boundless potential of human imagination. A journey in abundance of fascinating stories, voices, and visions, an exquisite tapestry of expression. SWAYAM stands not merely as an event but as a movement, echoing the unyielding drive to create, connect, and inspire.

      About MVJ College of Engineering
      Founded in 1982 by the Venkatesha Education Society, MVJ College of Engineering has been a steadfast provider of quality education in engineering and technology. With a focus on holistic learning, the college offers well-structured programs that emphasize both theoretical foundations and practical applications. Over the years, MVJCE has nurtured a vibrant academic environment, fostering innovation, collaboration, and a strong sense of community. The institution values experiential learning, encouraging students to engage in projects that bridge academic concepts with real-world challenges. Its alumni carry forward a legacy of integrity and ingenuity, making meaningful contributions in diverse fields. MVJCE remains committed to shaping individuals who aspire to excel and drive positive change in society.

      Theme – VIRASAT
      VIRASAT, a vibrant blend of cultures and customs, the emblem of pride and motivation; ushers us to discover the rich artistic treasures of our past and weave them into the fabric of our present.
      It is an exultation of dynasties, a promenade to the folklore and manifestations that exemplify who we are.
      Through VIRASAT, we bridge the classic with the contemporary, blending the echoes of yesterday with the aspirations of tomorrow.
      With every stride, a gateway to the mesmerizing bounty of eloquence, a glorious euphony of ethereal splendour.
      Embark with us on a journey through the extensive and vibrant culture of India, where even the smallest pieces stir a variety of narratives and an orchestra of melodies.

      Clubs:-
      1. Dhwani
      2. Nriryatrix
      3. Raagabhinaya
      4. Saahitya
      5. Aakriti
      6. Toastmasters

      Event Details
      Dhwani – Music Club
      Club Coordinators:=
      Yuvraj:-8971728640
      Manaswini:-8431546867
      Vocal Vistar- Where every voice finds its spotlight
      Celebrate the power of melody in this solo singing event that brings out the soul of India's musical heritage. Whether you prefer classical or contemporary, let your voice echo the spirit of VIRASAT.
      ● Rules:
      ○ Solo event.
      ○ Time limit: 4 minutes (including setup)
      ○ Use of pre-recorded background music is allowed, Live accompaniment is also allowed.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Emmanuel Joseph: 9513090776; Gifta: 8762362006

      SPIT FIRE - Ignite the stage with rhythm, rhymes and Beats!
      Showcase your lyrical mastery and rhythmic creativity in this electrifying rapping and beatboxing competition. Let your beats reflect the pulse of tradition meeting innovation.
      ● Rules:
      ○ Solo Participation.
      ○ 3-minute performance limit.
      ○ Lyrics must be original; any explicit content will lead to disqualification.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: VARSHA - 84314 09457 ; Mukund: 6364422548
      RAAG RANG - Weaving Harmony Through the soul of Indian Music
      Unite in harmony and let your voices weave tales of tradition in this Indian group singing competition. Dive into the cultural melodies of VIRASAT.
      ● Rules:
      ○ Teams of 4-10 members.
      ○ Time limit: 10 minutes (including Setup)
      ○ Traditional Indian instruments are allowed.
      ● Registration fee: ₹600
      ● Prize: 1st: ₹6,000, 2nd: ₹4,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Sajid:9149559393; Disha Bhat: 9482190980
      ECHOES AND BEATS - Where instruments Speak and Creativity Flows
      A showcase of instrumental mastery where music becomes the universal language. Let your instruments bring alive the spirit of VIRASAT.
      ● Rules:
      ○ Individual or duo performances.
      ○ Time limit: 5 minutes.
      ○ Pre-recorded backing tracks are not allowed.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Aditi: 9110245919; Jason:9019431617
      BATTLE OF BANDS: Clash of Talent, Power and Pure Music Energy
      The ultimate stage for rock stars to battle it out with electrifying performances. Bring your band and let your music leave the crowd in awe.
      ● Rules:
      ○ Teams of 3-8 members.
      ○ Performance time: 8 minutes (including setup)
      ○ At least one original composition is encouraged.
      ● Registration fee: ₹1000
      ● Prize: 1st: ₹20,000, 2nd: ₹10,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Onkar: 9234236426
      ○ S Rithanya: 8310541198
      ○ Shravya Kote: 8792635071
      SYMPHONY SQUAD - Uniting Voices in Perfect Harmony
      A celebration of Western harmony as voices blend into a symphonic spectacle. This group singing event will echo the unity in diversity theme.
      ● Rules:
      ○ Teams of 4-10 members.
      ○ Time limit: 6 minutes.
      ○ Explicit or offensive content is not allowed.
      ● Registration fee:₹600
      ● Prize: 1st: ₹6,000, 2nd: ₹4,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Prakashika: 9835598951; Arpita: 9019763381
      Nrityatrix – Dance Club
      Club Coordinators:-
      Darshan: 9141695797
      Ashmita: 7411061287
      Nritya Veer- The Brave Solo Performer
      [INDIAN SOLO DANCE COMPETITION]
      Celebrate the elegance of India's traditional dance forms with mesmerizing moves and vibrant expressions. Let your performance reflect the cultural hues of VIRASAT.
      ● Rules:
      ○ Individual event.
      ○ Time limit: 3+1 minute (including setup).
      ○ Backdrops and hazardous props prohibited.
      ● Registration fee: ₹250
      ● Prize: 1st: ₹4,000, 2nd: ₹3,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Saniya : 6363357424; Thanu : 7795190362
      Urban Nasha- City Style dance with a desi kick
      WESTERN SOLO DANCE COMPETITION
      Step onto the stage and dazzle with high-energy moves that capture global dance styles. Unleash your creativity and rhythm in this solo event.
      ● Rules:
      ○ Individual event.
      ○ Time limit: 3+1 minute (including setup).
      ○ Props and hazardous materials prohibited.
      ● Registration fee: ₹250
      ● Prize: 1st: ₹4,000, 2nd: ₹3,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Rachitha : 8050746071; Sambhradha : 8867054035
      Virasat ki Jugalbandi-Duet of Heritage
      DUET DANCE COMPETITION
      Two is better than one! Perform in perfect synchronization with your partner in a celebration of coordination and rhythm.
      ● Rules:
      ○ Teams of 2 members.
      ○ Time limit: 3+1 minute (including setup).
      ○ Props allowed; hazardous materials prohibited.
      ● Registration fee: ₹320
      ● Prize: 1st: ₹4,000, 2nd: ₹3000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:Damini : 8904075454; Jeevan : 7892066331
      Taandav X Takedown: Where legends Clash
      OPEN DANCE BATTLE COMPETITION
      Bring the heat to the floor in this spontaneous dance showdown. Unpredictable beats and raw talent take center stage.
      ● Rules:
      ○ This is an individual event, conducted in 1 vs 1 format.
      ○ Music will be played spontaneously on the spot.
      ● Registration fee: ₹250
      ● Prize: 1st: ₹3,000, 2nd: ₹2,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Charan : 7892040913; Chetan : 6363205414
      Groove Riot
      WESTERN GROUP DANCE COMPETITION
      Showcase your team's creativity and energy through captivating choreography that represents the vibrancy of Western dance styles.
      ● Rules:
      ○ Teams of 8-15 members.
      ○ Time limit: 5+2 minutes (including setup and conclusion).
      ○ Props encouraged; hazardous materials prohibited.
      ● Registration fee: ₹1200
      ● Prize: 1st: ₹10,000, 2nd: ₹8,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Manasvini : 9606793908; Neethu : 9686742350
      SwarNatyam- Mega Event
      A grand spectacle combining drama, music, and dance into a thematic performance. Bring the spirit of VIRASAT alive through your artistry.
      ● Rules:
      ○ Teams of 8-17 members.
      ○ Performance duration: 5+2 minutes.
      ○ Props and costumes encouraged; hazardous materials prohibited.
      ● Registration fee: 1500
      ● Prize: 1st: ₹50,000, 2nd: ₹25,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ R V Lehanya: +91 99729 77347
      ○ Rahul B S: 7338547046
      ○ Vidhi Jain: +918618415234
      ○ Drishti Luthra: 91039 47046
      ○ Amog Anand Keur: 8431085574
      Raagabhinaya – Theatre & Production Club
      Club Coordinators:-
      Sharat: 9380897991
      Sachin:8660241556
      Aishwarya:9148913385
      Raaghav: 7348860439
      Anubhoot
      MIME GROUP
      Delve into the art of silent storytelling, where actions speak louder than words. Express emotions and narratives that transcend language barriers with finesse and creativity.
      ● Rules:
      ○ Teams of 6+4 participants.
      ○ Time limit: 6+2 minutes(including setup).
      ○ Pre-recorded music without lyrics is allowed.
      ● Registration fee: ₹600
      ● Prize: 1st: ₹8,000, 2nd: ₹5,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Vaishnavi +91 81236 80295
      ○ Prabjyot Singh +91 88996 40581

      Drishyapat
      SHORT FILM MAKING
      Lights, camera, action! Create a cinematic masterpiece that tells a story of tradition and modernity. Channel your inner filmmaker.
      ● Rules:
      ○ Teams of up to 5 participants.
      ○ Film duration: 6 minutes + 10 seconds.
      ○ Topic provided on the spot; 24 hours provided for submission.
      ● Registration fee: ₹600
      ● Prize: 1st: ₹8,000, 2nd: ₹5,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Kaviya +91 94834 47393
      ○ Saniya NB +91 96063 26894
      Jashn-e-Hasya
      STAND-UP
      Bring the house down with your humor and wit in this solo stand-up comedy event. Make the audience laugh while reflecting the cultural essence of VIRASAT.
      ● Rules:
      ○ Individual event.
      ○ Time limit: 4+1 minute (including setup & conclusion).
      ○ No offensive content allowed.
      ● Registration fee:₹250
      ● Prize: 1st: ₹4,000, 2nd: ₹3,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Parnitha +91 97433 06660
      ○ Rohith +91 79753 75180
      Rangrekha
      GRAPHIC DESIGNING
      Transform your ideas into stunning visuals that captivate and inspire. Let your creativity shine in this design competition.
      ● Rules:
      ○ Individual event.
      ○ Topic provided on the spot.
      ○ Submit in JPEG, JPG, or PNG format within 24 hours.
      ● Registration fee:₹200
      ● Prize: 1st: ₹3,000, 2nd: ₹2,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Narmada +91 97513 08619
      ○ Koustubh +91 78299 92205
      Drishtikon
      PHOTOGRAPHY
      Capture the spirit of VIRASAT through your lens. Tell stories that words cannot express in this photography contest.
      ● Rules:
      ○ Individual event.
      ○ Images must be original and relevant to the theme.
      ○ Basic editing allowed.
      ● Registration fee:₹200
      ● Prize: 1st: ₹3,000, 2nd: ₹2,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Prasanna +91 79751 58961
      ○ Shreya +91 95918 48646
      ekanki
      MONO ACTING
      Step into the spotlight and showcase your acting skills in this solo performance event. Convey emotions and stories through dramatic artistry.
      ● Rules:
      ○ Individual event.
      ○ Performance duration: 2+1 minutes.
      ○ Any language permitted.
      ● Registration fee: ₹250
      ● Prize: 1st: ₹4,000, 2nd: ₹3,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Joshua +91 78922 56574
      ○ Pranith +91 90193 87446
      raahgiri
      STREET PLAY
      Command the streets with impactful performances that bring societal issues to the forefront. Fuse energy and creativity to inspire change while honoring the values of VIRASAT.
      ● Rules:
      ○ Teams of 12-20 members.
      ○ Time limit: 7+3 minutes (including setup & conclusion).
      ○ Props allowed; electronic instruments prohibited.
      ● Registration fee: ₹800
      ● Prize: 1st: ₹8,000, 2nd: ₹4,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Heerath +91 97972 43748
      ○ Preetika +91 96224 31393
      Rangmanch
      IMPROV
      Unleash your spontaneity and humor in this improvisation event where quick thinking takes the stage. Create magic on the spot.
      ● Rules:
      ○ Teams of 2-3 participants.
      ○ Scenarios provided on the spot.
      ○ Multiple entries from an institution are allowed.
      ● Registration fee: ₹300
      ● Prize: 1st: ₹4,000, 2nd: ₹3,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Aravind +91 93800 16889
      ○ Paul +91 74115 08842
      Saahitya – Literature Club
      Club Coordinators:-
      Akash:6361482706
      Maclin: 8217648197
      ChronoChatter
      [JAM- Just a Minute]
      Test your wit and spontaneity in this fast-paced speaking challenge. Keep your thoughts sharp, your words sharper, and impress the audience in "JUST A MINUTE".
      ● Rules:
      ○ Individual event.
      ○ Avoid hesitation, repetition, or deviation.
      ○ The use of Queen's English is encouraged.
      ● Registration fee:₹150
      ● Prize: 1st: ₹3,000, 2nd: ₹2,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Maria:63627 48820
      ○ Nadeem:63725 25448
      Judgment Day Joust
      [Air Crash]
      One parachute, one chance to plead, the weight of survival, your words must lead. With wit and charm, you stake your claim, Convince them now or lose the flame.
      ● Rules:
      ○ Individual event.
      ○ Time limit: 5 minutes per participant.
      ○ No profanity or personal attacks.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹3000, 2nd: ₹2000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Nabi:70611 04766
      ○ Hemapriya:91487 79932
      The Cipher Sprint
      [Literary Treasure Hunt]
      Embark on a thrilling adventure through words and riddles. Crack literary clues and solve mystery challenges to uncover hidden treasures where time is the ultimate judge.
      ● Rules:
      ○ Teams of 2-3 participants.
      ○ Participants must stay within the specified boundaries.
      ○ No collaboration between teams will be tolerated.
      ● Registration fee: ₹600
      ● Prize: 1st: ₹8,000, 2nd: ₹5,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Sravan:7204700369
      ○ Vanshika:7892676862
      Crownference
      [Team Debate]
      Engage in lively intellectual battles, where every argument sharpens your wit. Join forces to tackle critical topics, presenting perspectives with structure and precision. It's a stage to reason, refute, and redefine the narrative.
      ● Rules:
      ○ Teams of 2 members.
      ○ Time limit: 15 minutes per round.
      ○ Topics provided just before the debate.
      ● Registration fee:₹300
      ● Prize: 1st: ₹4000, 2nd: ₹2500
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Sanjay:6362433345
      ○ Kavyashree:9019798249
      Inkwell of the Unseen
      [Sensory Writing Challenge]
      From pen to paper, now from perception to prose, writing demands more than fleeting feelings in your mind. Don't let your senses deceive you; go beyond impressions, unearthing truths that lie beneath. To be a writer is to shape raw sensations into vivid, unforgettable creations.
      ● Rules:
      ○ Individual event.
      ○ Time Limit: 5 minutes to interact with the object and 30 minutes to write.
      ○ Word Limit: 200 or 300 words.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹3000, 2nd: ₹2000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Prajwal: 6366732380
      ○ Harsha: 8660904600
      The Poetic Gavel
      [Poet's Auction]
      Step into the world of Slam Poetry but with a twist! The Poet's Auction challenges participants to craft powerful, original poems while battling in an exhilarating auction for their words. Combine poetic artistry with strategy and performance as you bring your creations to life.
      ● Rules:
      ○ Individual Event.
      ○ Participants must bid for words and compose a poem.
      ○ Time limit: 60 minutes.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹3000, 2nd: ₹2000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Mussarrat: 9353801953
      ○ Shivani:6360584283
      The Catalyst Chain
      [Design Domino]
      Unleash your inner designer to create stunning narratives through visuals. Build upon each domino for a unique chain of ideas.
      ● Rules:
      ○ Solo Event.
      ○ Time limit: 75 minutes.
      ○ Twists revealed every 10 mins
      ○ Submission in digital (JPEG, PNG, or PDF)
      ● Registration fee: ₹150
      ● Prize: 1st: ₹2500, 2nd: ₹1500
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Aravind:9740181866
      ○ Sanskruthi:9663395425
      Kannada Kalarava
      Kannada Kalarava is a vibrant event dedicated to showcasing the richness of Karnataka's culture, Kannada language as well as its literature. Participants will engage in a series of rounds that test their knowledge, creativity and fluency in Kannada.

      ● Rules
      ○ Team of 2 participants.
      ○ 4 round event.
      ● Registration fee: ₹300
      ● Prize : 1st-₹3000; 2nd-₹2000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Kavita:8660761775
      ○ Darshan:8073797091

      ಕನ್ನಡ ಕಲರವ 💛❤️

      ಶುಲ್ಕ: ₹300
      ಮೊದಲ ಬಹುಮಾನ: 3000
      ಎರಡನೇ ಬಹುಮಾನ: 2000

      ಕನ್ನಡ ಕಲರವವು ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿ, ಕನ್ನಡ ಭಾಷೆ ಹಾಗೂ ಸಾಹಿತ್ಯ ಶ್ರೀಮಂತಿಕೆಯನ್ನು ಪ್ರದರ್ಶಿಸಲು ಮೀಸಲಾಗಿರುವ ಒಂದು ರೋಮಾಂಚಕ ಕಾರ್ಯಕ್ರಮವಾಗಿದೆ. ಭಾಗವಹಿಸುವವರು  ತಮ್ಮ ಕನ್ನಡದ ಜ್ಞಾನ, ಸೃಜನಶೀಲತೆ ಮತ್ತು ವಾಕ್ಚಾತುರ್ಯತೆಯನ್ನು ಪರೀಕ್ಷಿಸುವ ಸರಣಿ ಸುತ್ತುಗಳಲ್ಲಿ ತೊಡಗಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.

      ನಿಯಮಗಳು:
      ಪ್ರತಿ ತಂಡವು  2 ಸ್ಪರ್ಧಾಳುಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.
      ಈ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ 4 ಸುತ್ತುಗಳು ಇರುತ್ತವೆ.

      Model United Nations
      Step into the shoes of world diplomats, navigating the intricate web of global challenges. Engage in thoughtful discussions, negotiate impactful resolutions, and represent nations with conviction. Display leadership, teamwork, and diplomacy as you work to craft a better tomorrow.
      ● Rules:
      ○ Individual participation.
      ○ Sessions divided into opening statements, moderated caucus, and resolutions.
      ○ Stay in character of your assigned country.
      ● Registration fee: ₹350
      ● Prize: 1st: ₹5,000, 2nd: ₹3,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Joel: 8310819628
      ○ Arjun Sharma:9119289604
      Aakriti – Art Club
      Club Coordinators:-
      Aditya: 6361931910
      Pushpanjali: 9353361331
      Pencil Perfection
      Pencil/Graphite sketching
      Bring your artistic visions to life with detailed pencil or graphic sketches. Whether traditional or digital, showcase your creativity and attention to detail.
      ● Rules:
      ○ Individual event.
      ○ Time limit: 2.5 hours+30 minutes.
      ○ Theme provided on-spot.
      ● Registration fee: ₹300
      ● Prize: 1st: ₹3,000, 2nd: ₹1,500
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Mythri-8088836477
      ○ Anish M-7406777828
      Painted Smiles
      Face/Body Painting
      Turn faces and bodies into vibrant canvases to express the spirit of VIRASAT. Creativity and technique will set you apart in this artistic challenge.
      ● Rules:
      ○ Individual Participation.
      ○ Time limit: 2.5 hours+30 minutes.
      ○ Theme: Announced in advance or provided on the spot.
      ● Registration fee:₹300
      ● Prize: 1st: ₹3,000, 2nd: ₹1,500
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Anna jovitha-8310616583
      ○ Kushi patil-9019722592
      Doodle on Clay
      Ceramic Doodling
      Transform plain ceramics into masterpieces by adding intricate and vibrant doodles. A perfect blend of creativity and craftsmanship.
      ● Rules:
      ○ Individual event.
      ○ Time limit: 2.5 hours+30 minutes.
      ○ Participants must bring their own ceramic objects (plate, mug, tile, or vase).
      ● Registration fee: ₹250
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Azezzah-9242107871
      ○ Dhanush-6360952142
      Waste to Wonder
      Treasure from trash
      Turn discarded materials into artistic treasures that reflect creativity and innovation. Prove that art has no boundaries.
      ● Rules:
      ○ Individual participation.
      ○ Time limit: 2.5 hours + 30 minutes.
      ○ Theme (if any) will be announced on the spot.
      ● Registration fee: ₹250
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Sneha Patil: 9740780242
      ○ Keerthana K A: 8296072082
      Rangoli Rhapsody
      Rangoli Rachana
      Celebrate Indian traditions by crafting stunning rangoli designs with vibrant colors. Showcase your skills and bring your designs to life.
      ● Rules:
      ○ Individual participation.
      ○ Time limit: 2.5 hours+30 minutes.
      ○ Bring your own materials.
      ● Registration fee: ₹150
      ● Prize: 1st: ₹1,500, 2nd: ₹800
      ● Date & Time: [To be Updated]
      ● Coordinator Contact:
      ○ Ritesh-9620571230
      ○ Chandana S H-9739844329
      Mandala Magic
      Mandala Art

      A Mandala Art Competition offers participants a chance to explore patterns, symmetry, and spiritual symbolism through intricate designs. It encourages mindfulness, creativity, and precision in creating visually captivating circular artwork. The event emphasizes detail, harmony, originality, and adherence to the theme provided.

      ● Rules:
      ○ Individual competition.
      ○ Time limit:2.5 hours + 30 minutes.
      ○ Only black pens, fine liners, and pencils are allowed.
      ● Registration fee:₹200
      ● Prize: 1st-₹3000; 2nd-₹1500
      ● Date & Time: [To be Updated]
      ● Coordinators:
      ○ Amithesh C-9113543283
      ○ Sambhardha-8867054035
      Toastmasters – Public Speaking Club
      Club Coordinators:-
      Sai Karthik: 9380452696
      Trisha: 8904625443
      Katha Yatra - Slide Thru Stories
      The Ultimate Storytelling Challenge Craft imaginative narratives driven by surprise visual prompts. Spin tales that captivate and leave a lasting impression on the audience.
      ● Rules:
      ○ Individual event.
      ○ Minimum: 3 minutes, Maximum: 5 minutes.
      ○ Incorporate all provided visual prompts.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Aadil: +91 86109 12825
      Virodh Vodh - Turn Coat Debate
      Think Fast. Argue Both Sides. Adapt Instantly. A debate like no other, where you argue both sides of a motion. Quick thinking and adaptability are your best allies in this dynamic contest.
      ● Rules:
      ○ Individual event.
      ○ Switch stances on cue.
      ○ 2 Round event.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Trisha +91 89046 25443
      Sabha Sutradhar - Elevate your pitch
      The Ultimate Pitch Challenge Deliver the ultimate pitch in this challenge where persuasion meets clarity. Convince the audience and judges of your vision in minutes.
      ● Rules:
      ○ Individual event.
      ○ Time limit: Maximum of 3 minutes.
      ○ Use provided visuals or props effectively.
      ● Registration fee: ₹200
      ● Prize: 1st: ₹2,000, 2nd: ₹1,000
      ● Date & Time: [To be Updated]
      ● Coordinator Contact: Preethi +91 77608 68083
      Note:-
      Details on Sponsors and Partners, Contact Details, Event Schedule, Workshop details and Brochure have not been finalised and will be updated as its finalised.

      DJ Events:
      - Details about DJ performances and events will be updated soon. Stay tuned for exciting announcements!

      When users ask about:
      1. **The main event**: provide details about Swayam 2025, its theme, location, dates, and registration link.
      2. **A specific club**: introduce the club, list its events, coordinators names/phones, and registration link.
      3. **A specific event**: explain rules, prizes, registration, and contact details with the exact link.
      4. **Coordinator details**: give the name and phone number.
      5. **Dress code or outfit**: outline the MVJ dresscode rules from above.
      6. **Anything else unrelated to Swayam 2025**: gently steer the conversation back to Swayam topics—do not ask random productivity or selfhelp questions.

      User's question: ${userInput}

      Please provide a helpful and detailed response. If the user's question is not related to Swayam 2025, engage in a friendly conversation.And make take the conversation towards the swayam.
    `;

    // console.log("Generated prompt:", eventDetails); // Debugging

    const result = await callGeminiAPI({ userInput: eventDetails });
    // console.log("API Response:", result); // Debugging

    const chatbotReply = result || "No response from Gemini";
    return new Response(JSON.stringify({ reply: chatbotReply }), {
      status: 200,
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
