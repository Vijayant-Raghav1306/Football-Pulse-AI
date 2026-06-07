"use client";

import { useState } from "react";
import Image from "next/image";

const SQUADS = [
  // GROUP A
  {
    group: "Group A", team: "Mexico", countryCode: "mx", fifaRank: 16, coach: "Javier Aguirre",
    keyPlayers: ["Guillermo Ochoa", "Raul Jimenez", "Santiago Gimenez", "Edson Alvarez", "Alexis Vega", "Luis Chavez", "Cesar Montes", "Jorge Sanchez", "Orbelin Pineda", "Roberto Alvarado", "Brian Gutierrez", "Obed Vargas", "Jesus Gallardo", "Alvaro Fidalgo", "Julian Quinones", "Carlos Acevedo", "Israel Reyes", "Johan Vasquez", "Mateo Chavez", "Erik Lira", "Luis Romo", "Gilberto Mora", "Cesar Huerta", "Armando Gonzalez", "Guillermo Martinez", "Raul Rangel"],
    strength: "Experienced squad on home soil. Santiago Gimenez leads the attack.", oneToWatch: "Santiago Gimenez",
  },
  {
    group: "Group A", team: "South Africa", countryCode: "za", fifaRank: 65, coach: "Hugo Broos",
    keyPlayers: ["Ronwen Williams", "Lyle Foster", "Evidence Makgopa", "Themba Zwane", "Relebohile Mofokeng", "Oswin Appollis", "Teboho Mokoena", "Percy Tau", "Iqraam Rayners", "Khuliso Mudau", "Aubrey Modiba", "Nkosinathi Sibisi", "Sipho Chaine", "Ricardo Goss", "Sphephelo Sithole", "Thapelo Maseko", "Jayden Adams", "Thalente Mbatha", "Bradley Cross", "Samukele Kabini", "Olwethu Makhanya", "Thabang Matuludi", "Mbekezeli Mbokazi", "Ime Okon", "Kamogelo Sebelebele", "Khulumani Ndamane"],
    strength: "Compact and disciplined. Mofokeng is their most exciting talent.", oneToWatch: "Relebohile Mofokeng",
  },
  {
    group: "Group A", team: "South Korea", countryCode: "kr", fifaRank: 23, coach: "Hong Myung-bo",
    keyPlayers: ["Son Heung-min", "Lee Kang-in", "Kim Min-jae", "Hwang Hee-chan", "Cho Gue-sung", "Hwang In-beom", "Lee Jae-sung", "Bae Jun-ho", "Oh Hyeon-gyu", "Yang Hyun-jun", "Kim Seung-gyu", "Jo Hyeon-woo", "Kim Moon-hwan", "Kim Tae-hyeon", "Lee Han-beom", "Paik Seung-ho", "Lee Tae-seok", "Cho Wi-je", "Park Jin-seob", "Eom Ji-sung", "Seol Young-woo", "Lee Gi-hyuk", "Jens Castrop", "Lee Dong-gyeong", "Kim Jin-gyu", "Song Bum-keun"],
    strength: "Son Heung-min in his prime. Kim Min-jae anchors a solid defence.", oneToWatch: "Son Heung-min",
  },
  {
    group: "Group A", team: "Czechia", countryCode: "cz", fifaRank: 37, coach: "Ivan Hašek",
    keyPlayers: ["Patrik Schick", "Tomáš Souček", "Vladimír Coufal", "Adam Hložek", "Lukáš Provod", "Tomáš Chorý", "Jan Kuchta", "Matěj Kovář", "Jindřich Staněk", "Robin Hranáč", "David Zima", "Tomáš Holeš", "Vladimír Darida", "Mojmír Chytil", "David Jurásek", "Pavel Šulc", "Michal Sadílek", "Lukáš Červ", "Jaroslav Zelený", "David Douděra", "Lukáš Horníček", "Alexandr Sojka", "Hugo Sochůrek", "Denis Višinský", "Štěpán Chaloupek", "Ladislav Krejčí"],
    strength: "Schick is clinical. Souček and Hložek are the difference-makers.", oneToWatch: "Patrik Schick",
  },
  // GROUP B
  {
    group: "Group B", team: "Canada", countryCode: "ca", fifaRank: 47, coach: "Jesse Marsch",
    keyPlayers: ["Alphonso Davies", "Jonathan David", "Tajon Buchanan", "Cyle Larin", "Ismaël Koné", "Stephen Eustáquio", "Jonathan Osorio", "Richie Laryea", "Dayne St. Clair", "Maxime Crépeau", "Alistair Johnston", "Derek Cornelius", "Joel Waterman", "Moïse Bombito", "Luc de Fougerolles", "Jacob Shaffelburg", "Liam Millar", "Mathieu Choinière", "Ali Ahmed", "Nathan Saliba", "Tani Oluwaseyi", "Promise David", "Niko Sigur", "Alfie Jones", "Owen Goodman"],
    strength: "Davies is one of the fastest players on the planet. David is prolific.", oneToWatch: "Alphonso Davies",
  },
  {
    group: "Group B", team: "Bosnia-Herzegovina", countryCode: "ba", fifaRank: 55, coach: "Sergej Barbarez",
    keyPlayers: ["Edin Džeko", "Ermedin Demirović", "Benjamin Tahirović", "Amar Dedić", "Sead Kolašinac", "Nikola Vasilj", "Tarik Muharemović", "Dennis Hadžikadunić", "Amir Hadžiahmetović", "Ivan Šunjić", "Ivan Bašić", "Dženis Burnić", "Armin Gigović", "Nikola Katić", "Kerim Alajbegović", "Samed Baždar", "Haris Tabaković", "Nidal Čelik", "Jovo Lukić", "Ermin Mahmić", "Mladen Jurkas", "Esmir Bajraktarević", "Martin Zlomislić", "Stjepan Radeljić", "Amar Memić", "Osman Hadžikić"],
    strength: "Džeko and Demirović lead the attack. Emotional first WC back in years.", oneToWatch: "Ermedin Demirović",
  },
  {
    group: "Group B", team: "Qatar", countryCode: "qa", fifaRank: 58, coach: "Martín Lasarte",
    keyPlayers: ["Akram Afif", "Almoez Ali", "Hassan Al-Haydos", "Karim Boudiaf", "Mohammed Muntari", "Edmilson Junior", "Assim Madibo", "Abdulaziz Hatem", "Pedro Miguel", "Lucas Mendes", "Meshaal Barsham", "Boualem Khoukhi", "Homam Ahmed", "Issa Laye", "Jassem Gaber", "Ahmed Al-Janehi", "Yusuf Abdurisag", "Tahsin Mohammed", "Salah Zakaria", "Sultan Al Brake", "Mohammed Mannai", "Ahmed Fathi", "Ayoub Al-Oui", "Mahmoud Abunada"],
    strength: "Akram Afif is a genuine world-class threat in attack.", oneToWatch: "Akram Afif",
  },
  {
    group: "Group B", team: "Switzerland", countryCode: "ch", fifaRank: 19, coach: "Murat Yakin",
    keyPlayers: ["Granit Xhaka", "Breel Embolo", "Noah Okafor", "Remo Freuler", "Manuel Akanji", "Gregor Kobel", "Ricardo Rodriguez", "Ardon Jashari", "Dan Ndoye", "Ruben Vargas", "Denis Zakaria", "Fabian Rieder", "Djibril Sow", "Silvan Widmer", "Nico Elvedi", "Zeki Amdouni", "Michel Aebischer", "Christian Fassnacht", "Eray Comert", "Luca Jaquez", "Miro Muheim", "Cedric Itten", "Aurele Amenda", "Johan Manzambi", "Yvon Mvogo", "Marvin Keller"],
    strength: "Tactically disciplined. Xhaka leads, Embolo and Okafor provide firepower.", oneToWatch: "Granit Xhaka",
  },
  // GROUP C
  {
    group: "Group C", team: "Brazil", countryCode: "br", fifaRank: 5, coach: "Dorival Júnior",
    keyPlayers: ["Vinícius Jr.", "Neymar Jr", "Raphinha", "Endrick", "Rodrygo", "Lucas Paquetá", "Bruno Guimarães", "Casemiro", "Marquinhos", "Alisson", "Ederson", "Gabriel Magalhães", "Bremer", "Danilo", "Alex Sandro", "Douglas Santos", "Leo Pereira", "Ibañez", "Wesley", "Fabinho", "Matheus Cunha", "Gabriel Martinelli", "Igor Thiago", "Luiz Henrique", "Rayan", "Danilo Santos"],
    strength: "Vinícius Jr. is unstoppable. Neymar returns. Deep squad everywhere.", oneToWatch: "Vinícius Jr.",
  },
  {
    group: "Group C", team: "Morocco", countryCode: "ma", fifaRank: 14, coach: "Walid Regragui",
    keyPlayers: ["Achraf Hakimi", "Brahim Díaz", "Sofyan Amrabat", "Noussair Mazraoui", "Yassine Bounou", "Nayef Aguerd", "Azzedine Ounahi", "Bilal El Khannouss", "Ayoub El Kaabi", "Soufiane Rahimi", "Abdesamad Ezzalzouli", "Neil El Aynaoui", "Ayoub Bouaddi", "Ismael Saibari", "Chemsdine Talbi", "Issa Diop", "Chadi Riad", "Zakaria El Ouahdi", "Anas Salah-Eddine", "Youssef Bellammari", "Munir El Kajoui", "Ahmed Reda Tagnaouti", "Samir El Mourabet", "Redouane Halhal", "Yassine Gessim", "Ayoube Amaimouni"],
    strength: "2022 semi-finalists. Defensively exceptional. Hakimi and Brahim Díaz are world class.", oneToWatch: "Achraf Hakimi",
  },
  {
    group: "Group C", team: "Haiti", countryCode: "ht", fifaRank: 83, coach: "Marc Collat",
    keyPlayers: ["Duckens Nazon", "Frantzdy Pierrot", "Wilson Isidor", "Jean-Ricner Bellegarde", "Leverton Pierre", "Derrick Etienne Jr.", "Josue Duverger", "Johny Placide", "Duke Lacroix", "Jean-Kevin Duverne", "Hannes Delcroix", "Carlens Arcus", "Ricardo Ade", "Martin Experience", "Wilguens Paugain", "Keeto Thermoncy", "Carl Fred Sainte", "Danley Jean Jacques", "Woodensky Pierre", "Dominique Simon", "Josue Casimir", "Louicius Deedson", "Yassin Fortune", "Lenny Joseph", "Ruben Providence", "Alexandre Pierre"],
    strength: "Historic first WC qualification. Full of passion and nothing to lose.", oneToWatch: "Duckens Nazon",
  },
  {
    group: "Group C", team: "Scotland", countryCode: "gb-sct", fifaRank: 39, coach: "Steve Clarke",
    keyPlayers: ["Andy Robertson", "Scott McTominay", "John McGinn", "Kieran Tierney", "Lawrence Shankland", "Che Adams", "Ryan Christie", "Craig Gordon", "Angus Gunn", "Grant Hanley", "Jack Hendry", "Aaron Hickey", "Scott McKenna", "Nathan Patterson", "Lewis Ferguson", "Kenny McLean", "Lyndon Dykes", "George Hirst", "Ross Stewart", "Anthony Ralston", "Dom Hyam", "John Souttar", "Findlay Curtis", "Tyler Fletcher", "Ben Gannon-Doak", "Liam Kelly"],
    strength: "McTominay's goals from midfield are a huge weapon. Robertson is elite.", oneToWatch: "Scott McTominay",
  },
  // GROUP D
  {
    group: "Group D", team: "United States", countryCode: "us", fifaRank: 13, coach: "Mauricio Pochettino",
    keyPlayers: ["Christian Pulisic", "Gio Reyna", "Tyler Adams", "Weston McKennie", "Folarin Balogun", "Haji Wright", "Ricardo Pepi", "Brenden Aaronson", "Tim Weah", "Antonee Robinson", "Matt Turner", "Miles Robinson", "Chris Richards", "Joe Scally", "Sergino Dest", "Mark McKenzie", "Tim Ream", "Malik Tillman", "Alejandro Zendejas", "Cristian Roldan", "Sebastian Berhalter", "Auston Trusty", "Alex Freeman", "Max Arfsten", "Chris Brady", "Matt Freese"],
    strength: "Young hungry squad playing at home. Pulisic and Reyna are the creative leaders.", oneToWatch: "Christian Pulisic",
  },
  {
    group: "Group D", team: "Paraguay", countryCode: "py", fifaRank: 62, coach: "Gustavo Alfaro",
    keyPlayers: ["Miguel Almirón", "Julio Enciso", "Antonio Sanabria", "Diego Gomez", "Ramon Sosa", "Gustavo Gomez", "Fabian Balbuena", "Junior Alonso", "Braian Ojeda", "Andres Cubas", "Matias Galarza", "Alejandro Gamarra", "Omar Alderete", "Alexandro Maidana", "Jose Canale", "Gustavo Velazquez", "Juan Caceres", "Isidro Pitta", "Gabriel Avalos", "Alex Arce", "Damian Bobadilla", "Mauricio Magalhaes", "Gustavo Caballero", "Orlando Gill", "Roberto Fernandez", "Gaston Olveira"],
    strength: "Almirón and Enciso provide real quality. Dangerous on the break.", oneToWatch: "Julio Enciso",
  },
  {
    group: "Group D", team: "Australia", countryCode: "au", fifaRank: 24, coach: "Tony Popovic",
    keyPlayers: ["Mathew Ryan", "Ajdin Hrustic", "Jackson Irvine", "Nestory Irankunda", "Mathew Leckie", "Cristian Volpato", "Tete Yengi", "Cameron Devlin", "Awer Mabil", "Harry Souttar", "Milos Degenek", "Aziz Behich", "Connor Metcalfe", "Aiden O'Neill", "Paul Izzo", "Cameron Burgess", "Alessandro Circati", "Jason Geria", "Lucas Herrington", "Jacob Italiano", "Kai Trewin", "Jordan Bos", "Mohamed Toure", "Nishan Velupillay", "Paul Okon-Engstler", "Patrick Beach"],
    strength: "Proved at 2022 WC they can compete with anyone. Irankunda is the future.", oneToWatch: "Nestory Irankunda",
  },
  {
    group: "Group D", team: "Türkiye", countryCode: "tr", fifaRank: 29, coach: "Vincenzo Montella",
    keyPlayers: ["Hakan Çalhanoğlu", "Arda Güler", "Kenan Yıldız", "Kerem Aktürkoğlu", "Merih Demiral", "Zeki Çelik", "Altay Bayındır", "Mert Günok", "Uğurcan Çakır", "Abdülkerim Bardakcı", "Çağlar Söyüncü", "Ferdi Kadıoğlu", "Ozan Kabak", "Samet Akaydın", "Mert Müldür", "Kaan Ayhan", "Orkun Kökcü", "Salih Özcan", "Baris Alper Yilmaz", "Can Uzun", "Irfan Can Kahveci", "Eren Elmalı", "Ismail Yuksek", "Deniz Gul", "Oguz Aydin", "Yunus Akgun"],
    strength: "Arda Güler and Kenan Yıldız are two of the most exciting young players in Europe.", oneToWatch: "Arda Güler",
  },
  // GROUP E
  {
    group: "Group E", team: "Germany", countryCode: "de", fifaRank: 12, coach: "Julian Nagelsmann",
    keyPlayers: ["Jamal Musiala", "Florian Wirtz", "Kai Havertz", "Manuel Neuer", "Joshua Kimmich", "Antonio Rüdiger", "Leroy Sané", "Leon Goretzka", "Nico Schlotterbeck", "Jonathan Tah", "David Raum", "Waldemar Anton", "Pascal Gross", "Felix Nmecha", "Nadiem Amiri", "Jamie Leweling", "Oliver Baumann", "Alexander Nübel", "Malick Thiaw", "Nathaniel Brown", "Aleksandar Pavlovic", "Angelo Stiller", "Nick Woltemade", "Deniz Undav", "Maximilian Beier", "Lennart Karl"],
    strength: "Musiala and Wirtz are the most exciting midfield duo in world football right now.", oneToWatch: "Florian Wirtz",
  },
  {
    group: "Group E", team: "Curaçao", countryCode: "cw", fifaRank: 81, coach: "Remko Bicentini",
    keyPlayers: ["Leandro Bacuna", "Juninho Bacuna", "Tahith Chong", "Jurgen Locadia", "Kenji Gorre", "Sontje Hansen", "Elroy Room", "Riechedly Bazoer", "Armando Obispo", "Shurandy Sambo", "Gervane Kastaneer", "Brandley Kuwas", "Tyrick Bodack", "Trevor Doornbusch", "Joshua Brenet", "Roshon van Eijma", "Sherel Floranus", "Deveron Fonville", "Jurien Gaari", "Kevin Felida", "Ar'jany Martha", "Tyrese Noslin", "Godfried Roemeratoe", "Jeremy Antonisse", "Jearl Margaritha", "Livano Comenencia"],
    strength: "Historic achievement. Tahith Chong and the Bacuna brothers bring real quality.", oneToWatch: "Tahith Chong",
  },
  {
    group: "Group E", team: "Ivory Coast", countryCode: "ci", fifaRank: 30, coach: "Emerse Faé",
    keyPlayers: ["Franck Kessié", "Simon Adingra", "Seko Fofana", "Amad Diallo", "Nicolas Pépé", "Sébastien Haller", "Ousmane Diomandé", "Evan Ndicka", "Odilon Kossounou", "Yahia Fofana", "Ibrahim Sangaré", "Elye Wahi", "Ange-Yoan Bonny", "Emmanuel Agbadou", "Christopher Operi", "Guela Doue", "Wilfried Singo", "Ghislain Konan", "Alban Lafont", "Mohamed Koné", "Jean Michael Seri", "Parfait Guiagon", "Yan Diomandé", "Oumar Diakite", "Evann Guessand", "Bazoumana Toure"],
    strength: "2024 AFCON winners. Amad Diallo and Adingra are electric on the wings.", oneToWatch: "Amad Diallo",
  },
  {
    group: "Group E", team: "Ecuador", countryCode: "ec", fifaRank: 35, coach: "Sebastián Beccacece",
    keyPlayers: ["Moisés Caicedo", "Enner Valencia", "Gonzalo Plata", "Piero Hincapié", "Willian Pacho", "Pervis Estupiñán", "Kendry Páez", "Ángelo Preciado", "Félix Torres", "Joel Ordóñez", "Jackson Porozo", "Hernán Galíndez", "Moisés Ramírez", "Gonzalo Valle", "Alan Franco", "Pedro Vite", "Jordy Alcívar", "Denil Castillo", "John Yeboah", "Nilson Angulo", "Alan Minda", "Kevin Rodríguez", "Jordy Caicedo", "Anthony Valencia", "Jeremy Arévalo", "Yaimar Medina"],
    strength: "Caicedo is world class in midfield. Kendry Páez is only 17 and already elite.", oneToWatch: "Moisés Caicedo",
  },
  // GROUP F
  {
    group: "Group F", team: "Netherlands", countryCode: "nl", fifaRank: 7, coach: "Ronald Koeman",
    keyPlayers: ["Virgil van Dijk", "Cody Gakpo", "Frenkie de Jong", "Tijjani Reijnders", "Xavi Simons", "Memphis Depay", "Nathan Aké", "Jurriën Timber", "Denzel Dumfries", "Mark Flekken", "Bart Verbruggen", "Ryan Gravenberch", "Teun Koopmeiners", "Marten de Roon", "Guus Til", "Quinten Timber", "Mats Wieffer", "Brian Brobbey", "Noa Lang", "Donyell Malen", "Crysencio Summerville", "Wout Weghorst", "Justin Kluivert", "Robin Roefs", "Jan Paul van Hecke", "Jorrel Hato"],
    strength: "Van Dijk leads a formidable defence. Gakpo and Simons provide creativity.", oneToWatch: "Xavi Simons",
  },
  {
    group: "Group F", team: "Japan", countryCode: "jp", fifaRank: 18, coach: "Hajime Moriyasu",
    keyPlayers: ["Takefusa Kubo", "Ritsu Doan", "Wataru Endō", "Daichi Kamada", "Kaoru Mitoma", "Ayase Ueda", "Junya Ito", "Ao Tanaka", "Daizen Maeda", "Ko Itakura", "Hiroki Ito", "Zion Suzuki", "Tomoki Hayakawa", "Yuto Nagatomo", "Takehiro Tomiyasu", "Shogo Taniguchi", "Yukinari Sugawara", "Koki Ogawa", "Kento Shiogai", "Kaishu Sano", "Keito Nakamura", "Keisuke Goto", "Tsuyoshi Watanabe", "Ayumu Seko", "Yuito Suzuki", "Junnosuke Suzuki"],
    strength: "Organised, disciplined and lethal on the counter. Beat Germany and Spain at 2022 WC.", oneToWatch: "Takefusa Kubo",
  },
  {
    group: "Group F", team: "Sweden", countryCode: "se", fifaRank: 25, coach: "Jon Dahl Tomasson",
    keyPlayers: ["Alexander Isak", "Viktor Gyökeres", "Dejan Kulusevski", "Anthony Elanga", "Victor Nilsson Lindelöf", "Lucas Bergvall", "Emil Forsberg", "Mattias Svanberg", "Isak Hien", "Carl Starfelt", "Gabriel Gudmundsson", "Viktor Johansson", "Jacob Zetterström", "Gustaf Lagerbielke", "Hjalmar Ekdal", "Jesper Karlström", "Yasin Ayari", "Ken Sema", "Benjamin Nygren", "Elliot Stroud", "Taha Ali", "Alexander Bernhardsson", "Gustaf Nilsson", "Eric Smith", "Daniel Svensson", "Besfort Zeneli"],
    strength: "Isak and Gyökeres give them one of the deadliest strike partnerships in the tournament.", oneToWatch: "Alexander Isak",
  },
  {
    group: "Group F", team: "Tunisia", countryCode: "tn", fifaRank: 32, coach: "Jalel Kadri",
    keyPlayers: ["Hannibal Mejbri", "Ellyes Skhiri", "Anis Ben Slimane", "Montassar Talbi", "Dylan Bronn", "Hazem Mastouri", "Rayan Elloumi", "Rani Khedira", "Elias Saad", "Youssef Msakni", "Ali Abdi", "Omar Rekik", "Yan Valéry", "Mortadha Ben Ouanes", "Mohamed Hadj Mahmoud", "Sabri Ben Hessen", "Abdelmouhib Chamakh", "Aymen Dahman", "Adem Arous", "Ben Hamida", "Chikhaoui", "Moutaz Neffati", "Ben Slimane", "Elias Achouri", "Khalil Ayari", "Firas Chaouat"],
    strength: "Hannibal Mejbri is one of the most exciting young midfielders in Africa.", oneToWatch: "Hannibal Mejbri",
  },
  // GROUP G
  {
    group: "Group G", team: "Belgium", countryCode: "be", fifaRank: 3, coach: "Domenico Tedesco",
    keyPlayers: ["Kevin De Bruyne", "Romelu Lukaku", "Thibaut Courtois", "Lois Openda", "Jeremy Doku", "Leandro Trossard", "Amadou Onana", "Charles De Ketelaere", "Youri Tielemans", "Axel Witsel", "Arthur Theate", "Zeno Debast", "Timothy Castagne", "Thomas Meunier", "Maxim De Cuyper", "Hans Vanaken", "Nicolas Raskin", "Alexis Saelemaekers", "Dodi Lukebakio", "Diego Moreira", "Matias Fernandez-Pardo", "Brandon Mechele", "Koni De Winter", "Senne Lammens", "Mike Penders", "Nathan Ngoy"],
    strength: "Last chance for the Golden Generation. De Bruyne leads, Doku and Openda add pace.", oneToWatch: "Lois Openda",
  },
  {
    group: "Group G", team: "Egypt", countryCode: "eg", fifaRank: 36, coach: "Ihab Galal",
    keyPlayers: ["Mohamed Salah", "Omar Marmoush", "Mostafa Mohamed", "Ibrahim Adel", "Nabil Emad", "Hamdi Fathi", "Emam Ashour", "Hamza Abdel Karim", "Mohamed El Shenawy", "Mohamed Hany", "Yasser Ibrahim", "Rami Rabia", "Karim Hafez", "Ahmed Fattouh", "Tarek Alaa", "Mohamed Alaa", "Mohamed Abdelmonem", "Hossam Abdelmaguid", "Marwan Attia", "Ahmed Sayed", "Mahmoud Hassan", "Mostafa Abdel Raouf", "Mohannad Lasheen", "Haitham Hassan", "Mahmoud Saber", "El Mahdy Soliman"],
    strength: "Salah and Marmoush are two of the best attackers in Europe right now.", oneToWatch: "Mohamed Salah",
  },
  {
    group: "Group G", team: "Iran", countryCode: "ir", fifaRank: 22, coach: "Amir Ghalenoei",
    keyPlayers: ["Mehdi Taremi", "Sardar Azmoun", "Alireza Jahanbakhsh", "Saman Ghoddos", "Saeid Ezatolahi", "Ehsan Hajsafi", "Ramin Rezaeian", "Alireza Beiranvand", "Milad Mohammadi", "Shoja Khalilzadeh", "Rouzbeh Cheshmi", "Mehdi Ghaedi", "Ali Alipour", "Dennis Dargahi", "Amirhossein Hosseinzadeh", "Mehdi Torabi", "Danial Eiri", "Saleh Hardani", "Hossein Kanaani", "Ali Nemati", "Mohammad Ghorbani", "Amir Mohammad Razzaghinia", "Aria Yousefi", "Mohammad Mohebi", "Shahriar Moghanlou", "Payam Niazmand"],
    strength: "Taremi is a world-class striker. Defensively organised and hard to beat.", oneToWatch: "Mehdi Taremi",
  },
  {
    group: "Group G", team: "New Zealand", countryCode: "nz", fifaRank: 90, coach: "Darren Bazeley",
    keyPlayers: ["Chris Wood", "Marko Stamenic", "Joe Bell", "Clayton Lewis", "Liberato Cacace", "Tim Payne", "Michael Boxall", "Max Crocombe", "Alex Paulsen", "Michael Woud", "Tyler Bindon", "Francis de Vries", "Callan Elliot", "Nando Pijnaker", "Tommy Smith", "Finn Surman", "Lachlan Bayliss", "Matt Garbett", "Eli Just", "Callum McCowatt", "Ben Old", "Alex Rufer", "Sarpreet Singh", "Ryan Thomas", "Kosta Barbarouses", "Jesse Randall"],
    strength: "Chris Wood's experience is invaluable. Historic qualification for the All Whites.", oneToWatch: "Chris Wood",
  },
  // GROUP H
  {
    group: "Group H", team: "Spain", countryCode: "es", fifaRank: 8, coach: "Luis de la Fuente",
    keyPlayers: ["Lamine Yamal", "Pedri", "Rodri", "Gavi", "Nico Williams", "Álvaro Morata", "Dani Olmo", "Fabian Ruiz", "Mikel Merino", "Martin Zubimendi", "Marc Cucurella", "Pau Cubarsí", "Aymeric Laporte", "Alejandro Grimaldo", "Pedro Porro", "Unai Simón", "David Raya", "Joan Garcia", "Eric Garcia", "Marcos Llorente", "Alex Baena", "Mikel Oyarzabal", "Ferran Torres", "Yeremy Pino", "Borja Iglesias", "Marc Pubill"],
    strength: "Euro 2024 winners. Lamine Yamal and Nico Williams are the most exciting wing duo in football.", oneToWatch: "Lamine Yamal",
  },
  {
    group: "Group H", team: "Cape Verde", countryCode: "cv", fifaRank: 73, coach: "Pedro Leitão Brito",
    keyPlayers: ["Garry Rodrigues", "Nuno da Costa", "Ryan Mendes", "Jovane Cabral", "Jamiro Monteiro", "Dailon Livramento", "Logan Costa", "Roberto Lopes", "Steven Moreira", "Laros Duarte", "Deroy Duarte", "Kevin Pina", "Telmo Arcanjo", "Willy Semedo", "Yannick Semedo", "Helio Varela", "CJ dos Santos", "Marcio Rosa", "Vozinha", "Sidny Cabral", "Diney Borges", "Wagner Pina", "Kelvin Pires", "Joao Paulo Fernandes", "Ianique Tavares", "Gilson Benchimol"],
    strength: "Surprise package. Garry Rodrigues and Nuno da Costa bring real experience.", oneToWatch: "Garry Rodrigues",
  },
  {
    group: "Group H", team: "Saudi Arabia", countryCode: "sa", fifaRank: 56, coach: "Hervé Renard",
    keyPlayers: ["Salem Al-Dawsari", "Feras Al-Brikan", "Abdullah Al-Hamdan", "Saleh Al-Shehri", "Mohammed Al-Owais", "Saud Abdulhamid", "Nawaf Boushal", "Hassan Tambakti", "Mohammed Kanno", "Nasser Al-Dawsari", "Abdullah Al-Khaibari", "Sultan Mandash", "Ayman Yahya", "Khalid Al-Ghannam", "Musab Al-Juwayr", "Alaa Al-Hejji", "Nawaf Al-Aqidi", "Ahmed Alkaskar", "Moteb Al-Harbi", "Hassan Kadesh", "Ali Majrashi", "Ali Lajami", "Jehad Thakri", "Abdulelah Al-Amri", "Ziyad Al-Johani", "Mohammed Abu Alshamat"],
    strength: "Salem Al-Dawsari is lethal. Scored the winner vs Argentina at WC 2022.", oneToWatch: "Salem Al-Dawsari",
  },
  {
    group: "Group H", team: "Uruguay", countryCode: "uy", fifaRank: 11, coach: "Marcelo Bielsa",
    keyPlayers: ["Federico Valverde", "Darwin Núñez", "Rodrigo Bentancur", "Ronald Araújo", "Manuel Ugarte", "Facundo Pellistri", "Maximiliano Araújo", "Giorgian de Arrascaeta", "Nicolás de la Cruz", "Mathías Olivera", "Sergio Rochet", "Fernando Muslera", "José María Giménez", "Santiago Bueno", "Sebastián Cáceres", "Guillermo Varela", "Agustín Canobbio", "Emiliano Martínez", "Brian Rodríguez", "Rodrigo Zalazar", "Rodrigo Aguirre", "Federico Viñas", "Joaquin Piquerez", "Juan Manuel Sanabria", "Matías Viña", "Santiago Mele"],
    strength: "Valverde and Ugarte dominate midfield. Darwin Núñez provides explosive forward play.", oneToWatch: "Federico Valverde",
  },
  // GROUP I
  {
    group: "Group I", team: "France", countryCode: "fr", fifaRank: 2, coach: "Didier Deschamps",
    keyPlayers: ["Kylian Mbappé", "Marcus Thuram", "Ousmane Dembélé", "Antoine Griezmann", "Aurélien Tchouaméni", "Warren Zaïre-Emery", "Bradley Barcola", "William Saliba", "Mike Maignan", "Jules Koundé", "Ibrahima Konaté", "Dayot Upamecano", "Lucas Hernandez", "Théo Hernandez", "Malo Gusto", "Adrien Rabiot", "N'Golo Kanté", "Manu Koné", "Rayan Cherki", "Desire Doué", "Michael Olise", "Maghnes Akliouche", "Jean-Philippe Mateta", "Robin Risser", "Brice Samba", "Maxence Lacroix"],
    strength: "Mbappé is the best player in the world. France have incredible depth in every position.", oneToWatch: "Kylian Mbappé",
  },
  {
    group: "Group I", team: "Senegal", countryCode: "sn", fifaRank: 20, coach: "Aliou Cissé",
    keyPlayers: ["Sadio Mané", "Nicolas Jackson", "Ismaïla Sarr", "Pape Matar Sarr", "Lamine Camara", "Idrissa Gana Gueye", "Kalidou Koulibaly", "Édouard Mendy", "Iliman Ndiaye", "Habib Diarra", "Krepin Diatta", "El Hadji Malick Diouf", "Pape Gueye", "Ismail Jakobs", "Moussa Niakhaté", "Antoine Mendy", "Mamadou Sarr", "Abdoulaye Seck", "Pathe Ciss", "Assane Diao", "Bamba Dieng", "Bara Sapoko Ndiaye", "Cherif Ndiaye", "Mory Diaw", "Yehvann Diouf", "Ibrahim Mbaye"],
    strength: "Mané and Jackson up front are fearsome. Pape Matar Sarr is a future superstar.", oneToWatch: "Pape Matar Sarr",
  },
  {
    group: "Group I", team: "Iraq", countryCode: "iq", fifaRank: 63, coach: "Jesús Casas",
    keyPlayers: ["Aymen Hussein", "Zidane Iqbal", "Ali Al-Hamadi", "Aimar Sher", "Ali Jassim", "Ali Yousef", "Mohanad Ali", "Kevin Yakob", "Frans Putros", "Mustafa Saadoon", "Zaid Ismail", "Ahmed Yahya", "Ibrahim Bayesh", "Ahmed Qasim", "Youssef Amyn", "Marko Farji", "Amir Al-Ammari", "Akam Hashem", "Merchas Doski", "Hussein Ali", "Manaf Younis", "Zaid Tahseen", "Rebin Sulaka", "Fahad Talib", "Jalal Hassan", "Ahmed Basil"],
    strength: "First WC since 1986. Zidane Iqbal brings Man United pedigree. Passionate squad.", oneToWatch: "Zidane Iqbal",
  },
  {
    group: "Group I", team: "Norway", countryCode: "no", fifaRank: 28, coach: "Ståle Solbakken",
    keyPlayers: ["Erling Haaland", "Martin Ødegaard", "Alexander Sørloth", "Jørgen Strand Larsen", "Antonio Nusa", "Andreas Schjelderup", "Oscar Bobb", "Sander Berge", "Fredrik Aursnes", "Kristoffer Ajer", "Leo Østerås", "Marcus Holmgren Pedersen", "Julian Ryerson", "David Møller Wolfe", "Thelonious Aasgaard", "Patrick Berg", "Jens Petter Hauge", "Morten Thorsby", "Kristian Thorstvedt", "Fredrik Bjørkan", "Sondre Langås", "Torbjørn Heggem", "Henrik Falchener", "Sander Tangvik", "Egil Selvik", "Ørjan Nyland"],
    strength: "Haaland is the most feared striker in the world. Ødegaard provides the creativity.", oneToWatch: "Erling Haaland",
  },
  // GROUP J
  {
    group: "Group J", team: "Argentina", countryCode: "ar", fifaRank: 1, coach: "Lionel Scaloni",
    keyPlayers: ["Lionel Messi", "Julián Álvarez", "Lautaro Martínez", "Enzo Fernández", "Alexis Mac Allister", "Rodrigo De Paul", "Alejandro Garnacho", "Nicolás González", "Emiliano Martínez", "Cristian Romero", "Lisandro Martínez", "Nicolás Otamendi", "Nahuel Molina", "Nicolás Tagliafico", "Leandro Paredes", "Exequiel Palacios", "Gonzalo Montiel", "Giovani Lo Celso", "Leonardo Balerdi", "Facundo Medina", "Valentin Barco", "Thiago Almada", "Giuliano Simeone", "Nicolás Paz", "José Manuel López", "Gerónimo Rulli"],
    strength: "World Champions. Messi's last WC. Mac Allister, Fernández and De Paul are elite in midfield.", oneToWatch: "Lionel Messi",
  },
  {
    group: "Group J", team: "Algeria", countryCode: "dz", fifaRank: 42, coach: "Vladimir Petkovic",
    keyPlayers: ["Riyad Mahrez", "Amine Gouiri", "Mohamed Amine Amoura", "Houssem Aouar", "Ibrahim Maza", "Fares Chaibi", "Rayan Aït-Nouri", "Ramy Bensebaini", "Aissa Mandi", "Nabil Bentaleb", "Hicham Boudaoui", "Ramiz Zerrouki", "Anis Hadj Moussa", "Fares Ghedjemis", "Nadhir Benbouali", "Adil Boulbina", "Luca Zidane", "Oussama Benbot", "Melvin Mastil", "Rafik Belghali", "Samir Chergui", "Jaouen Hadjam", "Zinedine Belaid", "Yacine Titraoui", "Mohamed Amine Tougaï", "Achraf Abada"],
    strength: "Mahrez and Amoura lead the attack. Aït-Nouri is elite at left back.", oneToWatch: "Riyad Mahrez",
  },
  {
    group: "Group J", team: "Austria", countryCode: "at", fifaRank: 26, coach: "Ralf Rangnick",
    keyPlayers: ["Marcel Sabitzer", "David Alaba", "Konrad Laimer", "Christoph Baumgartner", "Marko Arnautovic", "Michael Gregoritsch", "Sasa Kalajdzic", "Patrick Wimmer", "Xaver Schlager", "Nicolas Seiwald", "Romano Schmid", "Florian Grillitsch", "Carney Chukwuemeka", "Patrick Pentz", "Alexander Schlager", "Florian Wiegele", "David Affengruber", "Kevin Danso", "Marco Friedl", "Philipp Lienhart", "Phillipp Mwene", "Stefan Posch", "Alexander Prass", "Michael Svoboda", "Alessandro Schopf", "Paul Wanner"],
    strength: "Rangnick's intense system. Laimer and Sabitzer are relentless in midfield.", oneToWatch: "Christoph Baumgartner",
  },
  {
    group: "Group J", team: "Jordan", countryCode: "jo", fifaRank: 69, coach: "Hussein Ammouta",
    keyPlayers: ["Mousa Al-Taamari", "Yazan Al-Naimat", "Ali Al-Zawawi", "Odeh Fakhoury", "Ibrahim Sabra", "Ali Azaizeh", "Mohammad Al-Dawoud", "Nizar Al-Rashdan", "Mahmoud Mardahi", "Mohammad Abu Zraiq", "Ali Olwan", "Mohammad Abu Taha", "Ibrahim Sadeh", "Mohannad Abu Taha", "Rajaei Ayed", "Noor Al-Rawabdeh", "Amer Jamous", "Anas Badawi", "Ehsan Haddad", "Saed Al-Rosan", "Salem Obaid", "Mohammad Abu Alnadi", "Hussam Abu Dhahab", "Yazan Al-Arab", "Abdullah Nasib", "Mohammad Abu Hashish"],
    strength: "First ever WC qualification. Al-Taamari is their standout attacking threat.", oneToWatch: "Mousa Al-Taamari",
  },
  // GROUP K
  {
    group: "Group K", team: "Portugal", countryCode: "pt", fifaRank: 6, coach: "Roberto Martínez",
    keyPlayers: ["Cristiano Ronaldo", "Bruno Fernandes", "Bernardo Silva", "Rafael Leão", "João Neves", "Rúben Dias", "Diogo Costa", "Pedro Neto", "Francisco Conceição", "João Félix", "Gonçalo Ramos", "Vitinha", "Rúben Neves", "Matheus Nunes", "Nuno Mendes", "João Cancelo", "Gonçalo Inácio", "Diogo Dalot", "Tomás Araújo", "Nelson Semedo", "Renato Veiga", "Samuel Costa", "Goncalo Guedes", "Francisco Trincão", "José Sá", "Rui Silva"],
    strength: "Ronaldo's last WC. Bruno and Bernardo world class. João Neves is the future of midfield.", oneToWatch: "João Neves",
  },
  {
    group: "Group K", team: "Congo DR", countryCode: "cd", fifaRank: 50, coach: "Sébastien Desabre",
    keyPlayers: ["Yoane Wissa", "Simon Banza", "Cédric Bakambu", "Fiston Mayele", "Aaron Wan-Bissaka", "Chancel Mbemba", "Arthur Masuaku", "Axel Tuanzebe", "Gaël Kakuta", "Ngal'ayel Mukau", "Nathanael Mbuku", "Samuel Moutoussamy", "Edo Kayembe", "Charles Pickel", "Noah Sadiki", "Aaron Tshibola", "Gedeon Kalulu", "Steve Kapuadi", "Joris Kayembe", "Brian Cipenga", "Theo Bongonda", "Meshack Elia", "Dylan Batubinsika", "Lionel Mpasi", "Timothy Fayulu", "Matthieu Epolo"],
    strength: "Wissa and Banza are in superb form. Wan-Bissaka brings Premier League quality.", oneToWatch: "Yoane Wissa",
  },
  {
    group: "Group K", team: "Uzbekistan", countryCode: "uz", fifaRank: 68, coach: "Srecko Katanec",
    keyPlayers: ["Eldor Shomurodov", "Abbosbek Fayzullaev", "Jaloliddin Masharipov", "Otabek Shukurov", "Oston Urunov", "Dostonbek Hamdamov", "Azizbek Amonov", "Igor Sergeev", "Akmal Mozgovoy", "Abdukodir Khusanov", "Khojiakbar Alijonov", "Rustamjon Ashurmatov", "Farrukh Sayfiev", "Sherzod Nasrullaev", "Umarbek Eshmuradov", "Avazbek Ulmasaliev", "Jakhongir Urozov", "Bekhruz Karimov", "Abdulla Abdullaev", "Jamshid Iskanderov", "Odiljon Hamrobekov", "Azizbek Ganiev", "Sherzod Esanov", "Botirali Ergashev", "Abduvohid Nematov", "Utkir Yusupov"],
    strength: "Shomurodov is a proven Serie A striker. Fayzullaev adds pace on the wing.", oneToWatch: "Eldor Shomurodov",
  },
  {
    group: "Group K", team: "Colombia", countryCode: "co", fifaRank: 9, coach: "Néstor Lorenzo",
    keyPlayers: ["James Rodríguez", "Luis Díaz", "Jhon Durán", "Richard Ríos", "Jhon Arias", "Juan Cuadrado", "Davinson Sánchez", "Yerry Mina", "Jhon Lucumí", "David Ospina", "Jefferson Lerma", "Jorge Carrascal", "Juan Fernando Quintero", "Gustavo Puerta", "Kevin Castaño", "Juan Camilo Portilla", "Jaminton Campaz", "Deiver Machado", "Santiago Arias", "Johan Mojica", "Willer Ditta", "Daniel Muñoz", "Camilo Vargas", "Álvaro Montero", "Luis Suárez", "Carlos Gómez"],
    strength: "Unbeaten in 28 games. James and Díaz world class. Durán is one of Europe's best strikers.", oneToWatch: "Luis Díaz",
  },
  // GROUP L
  {
    group: "Group L", team: "England", countryCode: "gb-eng", fifaRank: 4, coach: "Thomas Tuchel",
    keyPlayers: ["Jude Bellingham", "Harry Kane", "Bukayo Saka", "Phil Foden", "Declan Rice", "Marcus Rashford", "Cole Palmer", "Ollie Watkins", "Jordan Pickford", "John Stones", "Marc Guehi", "Reece James", "Antonee Robinson", "Kobbie Mainoo", "Morgan Rogers", "Eberechi Eze", "Anthony Gordon", "Noni Madueke", "Ivan Toney", "Dean Henderson", "James Trafford", "Ezri Konsa", "Jarell Quansah", "Dan Burn", "Nico O'Reilly", "Djed Spence"],
    strength: "Bellingham is world class. Kane, Saka, Foden, Palmer — unmatched depth in attack.", oneToWatch: "Jude Bellingham",
  },
  {
    group: "Group L", team: "Croatia", countryCode: "hr", fifaRank: 10, coach: "Zlatko Dalić",
    keyPlayers: ["Luka Modrić", "Mateo Kovačić", "Joško Gvardiol", "Ivan Perišić", "Andrej Kramarić", "Ante Budimir", "Luka Sučić", "Martin Baturina", "Nikola Vlašić", "Mario Pašalić", "Dominik Livaković", "Duje Ćaleta-Car", "Josip Šutalo", "Josip Stanišić", "Marin Pongračić", "Martin Erlić", "Luka Vušković", "Petar Sučić", "Kristijan Jakić", "Nikola Moro", "Toni Fruk", "Marco Pašalić", "Petar Musa", "Igor Matanović", "Dominik Kotarski", "Ivor Pandur"],
    strength: "2018 finalists. Modrić defies age. Gvardiol and Kovačić are elite.", oneToWatch: "Luka Modrić",
  },
  {
    group: "Group L", team: "Ghana", countryCode: "gh", fifaRank: 60, coach: "Otto Addo",
    keyPlayers: ["Mohammed Kudus", "Thomas Partey", "Antoine Semenyo", "Iñaki Williams", "Jordan Ayew", "Ernest Nuamah", "Christopher Bonsu Baah", "Abdul Fatawu Issahaku", "Kamal Deen Sulemana", "Lawrence Ati-Zigi", "Alidu Seidu", "Gideon Mensah", "Abdul Mumin", "Jonas Adjetey", "Marvin Senaya", "Augustine Boakye", "Elisha Owusu", "Kwasi Sibo", "Caleb Yirenkyi", "Prince Kwabena Adu", "Brandon Thomas-Asante", "Jerome Opoku", "Kojo Oppong Preprah", "Baba Abdul Rahman", "Derrick Luckassen", "Benjamin Asare"],
    strength: "Kudus is one of the most exciting attackers in the Premier League. Partey leads midfield.", oneToWatch: "Mohammed Kudus",
  },
  {
    group: "Group L", team: "Panama", countryCode: "pa", fifaRank: 79, coach: "Thomas Christiansen",
    keyPlayers: ["Adalberto Carrasquilla", "Ismael Díaz", "Cecilio Waterman", "José Fajardo", "Alberto Quintero", "Edgardo Farina", "Roderick Miller", "Anibal Godoy", "Amir Murillo", "Fidel Escobar", "Andres Andrade", "Cesar Blackman", "Eric Davis", "Luis Mejía", "Orlando Mosquera", "Cesar Samudio", "Jorge Gutierrez", "Jose Cordoba", "Jiovany Ramos", "Carlos Harvey", "Cristian Martinez", "Jose Luis Rodriguez", "Cesar Yanis", "Yoel Barcenas", "Azarias Londono", "Tomas Rodriguez"],
    strength: "Organised and hard to beat. Carrasquilla leads a talented midfield.", oneToWatch: "Adalberto Carrasquilla",
  },
];

const GROUPS = [...new Set(SQUADS.map((s) => s.group))].sort();

function FlagImage({ countryCode, teamName }: { countryCode: string; teamName: string }) {
  return (
    <Image
      src={`https://flagcdn.com/w80/${countryCode}.png`}
      alt={`${teamName} flag`}
      width={48}
      height={32}
      className="rounded object-cover"
      unoptimized
    />
  );
}

export default function SquadsPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filtered = SQUADS.filter((s) => {
    const matchGroup = selectedGroup === "All" || s.group === selectedGroup;
    const matchSearch =
      search === "" ||
      s.team.toLowerCase().includes(search.toLowerCase()) ||
      s.keyPlayers.some((p) => p.toLowerCase().includes(search.toLowerCase())) ||
      s.coach.toLowerCase().includes(search.toLowerCase()) ||
      s.oneToWatch.toLowerCase().includes(search.toLowerCase());
    return matchGroup && matchSearch;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">🌍 Squad Explorer</h1>
        <p className="text-gray-400 text-sm">
          All 48 teams · Official WC2026 squads · Search any player name
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Teams", value: "48" },
          { label: "Players per Squad", value: "26" },
          { label: "FIFA #1", value: "Argentina" },
          { label: "Hosts", value: "USA · Canada · Mexico" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
            <div className="text-white font-bold text-base">{value}</div>
            <div className="text-gray-500 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search any player, team or coach..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {["All", ...GROUPS].map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGroup(g)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedGroup === g
                ? "bg-green-500 text-white"
                : "bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-green-500"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="text-gray-500 text-xs mb-4">Showing {filtered.length} of {SQUADS.length} teams</p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((squad) => (
            <div key={squad.team} className="bg-gray-900 border border-gray-700 hover:border-green-800 rounded-xl p-5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FlagImage countryCode={squad.countryCode} teamName={squad.team} />
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">{squad.team}</h2>
                    <div className="text-gray-500 text-xs">{squad.group} · Coach: {squad.coach}</div>
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center shrink-0">
                  <div className="text-green-400 font-bold text-sm">#{squad.fifaRank}</div>
                  <div className="text-gray-600 text-xs">FIFA</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Full Squad (26 players)</div>
                <div className="flex flex-wrap gap-1.5">
                  {squad.keyPlayers.map((player) => (
                    <span
                      key={player}
                      className={`text-xs px-2 py-1 rounded-full border ${
                        player === squad.oneToWatch
                          ? "bg-green-950 border-green-700 text-green-400 font-medium"
                          : "bg-gray-800 border-gray-700 text-gray-300"
                      }`}
                    >
                      {player === squad.oneToWatch ? "⭐ " : ""}{player}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-3 leading-relaxed">{squad.strength}</p>

              <div className="bg-green-950 border border-green-800 rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <div>
                  <span className="text-gray-500 text-xs">One to Watch: </span>
                  <span className="text-green-400 text-sm font-semibold">{squad.oneToWatch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-10 text-center">
          <p className="text-gray-500">No results for <span className="text-white">"{search}"</span></p>
          <button
            onClick={() => { setSearch(""); setSelectedGroup("All"); }}
            className="mt-3 text-green-400 text-sm hover:text-green-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
