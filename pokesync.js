import { Sync } from './Sync.js';

//SYNC ARRAYS
var sync = {one: new Sync("Pikachu", "Lotad"), two: undefined, three: undefined, four: undefined, five: undefined, six: undefined};

//POKEMON RESOURCE LIST
const pokemonData = [
    { name: "UNDEFINED", number: "000" },
    { name: "Bulbasaur", number: "001" },
    { name: "Ivysaur", number: "002" },
    { name: "Venusaur", number: "003" },
    { name: "Charmander", number: "004" },
    { name: "Charmeleon", number: "005" },
    { name: "Charizard", number: "006" },
    { name: "Squirtle", number: "007" },
    { name: "Wartortle", number: "008" },
    { name: "Blastoise", number: "009" },
    { name: "Caterpie", number: "010" },
    { name: "Metapod", number: "011" },
    { name: "Butterfree", number: "012" },
    { name: "Weedle", number: "013" },
    { name: "Kakuna", number: "014" },
    { name: "Beedrill", number: "015" },
    { name: "Pidgey", number: "016" },
    { name: "Pidgeotto", number: "017" },
    { name: "Pidgeot", number: "018" },
    { name: "Rattata", number: "019" },
    { name: "Raticate", number: "020 " },
    { name: "Spearow", number: "021" },
    { name: "Fearow", number: "022" },
    { name: "Ekans", number: "023" },
    { name: "Arbok", number: "024" },
    { name: "Pikachu", number: "025" },
    { name: "Raichu", number: "026" },
    { name: "Sandshrew", number: "027" },
    { name: "Sandslash", number: "028" },
    { name: "Nidoran♀", number: "029" },
    { name: "Nidorina", number: "030" },
    { name: "Nidoqueen", number: "031" },
    { name: "Nidoran♂", number: "032" },
    { name: "Nidorino", number: "033" },
    { name: "Nidoking", number: "034" },
    { name: "Clefairy", number: "035" },
    { name: "Clefable", number: "036" },
    { name: "Vulpix", number: "037" },
    { name: "Ninetales", number: "038" },
    { name: "Jigglypuff", number: "039" },
    { name: "Wigglytuff", number: "040" },
    { name: "Zubat", number: "041" },
    { name: "Golbat", number: "042" },
    { name: "Oddish", number: "043" },
    { name: "Gloom", number: "044" },
    { name: "Vileplume", number: "045" },
    { name: "Paras", number: "046" },
    { name: "Parasect", number: "047" },
    { name: "Venonat", number: "048" },
    { name: "Venomoth", number: "049" },
    { name: "Diglett", number: "050" },
    { name: "Dugtrio", number: "051" },
    { name: "Meowth", number: "052" },
    { name: "Persian", number: "053" },
    { name: "Psyduck", number: "054" },
    { name: "Golduck", number: "055" },
    { name: "Mankey", number: "056" },
    { name: "Primeape", number: "057" },
    { name: "Growlithe", number: "058" },
    { name: "Arcanine", number: "059" },
    { name: "Poliwag", number: "060" },
    { name: "Poliwhirl", number: "061" },
    { name: "Poliwrath", number: "062" },
    { name: "Abra", number: "063" },
    { name: "Kadabra", number: "064" },
    { name: "Alakazam", number: "065" },
    { name: "Machop", number: "066" },
    { name: "Machoke", number: "067" },
    { name: "Machamp", number: "068" },
    { name: "Bellsprout", number: "069" },
    { name: "Weepinbell", number: "070" },
    { name: "Victreebel", number: "071" },
    { name: "Tentacool", number: "072" },
    { name: "Tentacruel", number: "073" },
    { name: "Geodude", number: "074" },
    { name: "Graveler", number: "075" },
    { name: "Golem", number: "076" },
    { name: "Ponyta", number: "077" },
    { name: "Rapidash", number: "078" },
    { name: "Slowpoke", number: "079" },
    { name: "Slowbro", number: "080" },
    { name: "Magnemite", number: "081" },
    { name: "Magneton", number: "082" },
    { name: "Farfetch'd", number: "083" },
    { name: "Doduo", number: "084" },
    { name: "Dodrio", number: "085" },
    { name: "Seel", number: "086" },
    { name: "Dewgong", number: "087" },
    { name: "Grimer", number: "088" },
    { name: "Muk", number: "089" },
    { name: "Shellder", number: "090" },
    { name: "Cloyster", number: "091" },
    { name: "Gastly", number: "092" },
    { name: "Haunter", number: "093" },
    { name: "Gengar", number: "094" },
    { name: "Onix", number: "095" },
    { name: "Drowzee", number: "096" },
    { name: "Hypno", number: "097" },
    { name: "Krabby", number: "098" },
    { name: "Kingler", number: "099" },
    { name: "Voltorb", number: "100" },
    { name: "Electrode", number: "101" },
    { name: "Exeggcute", number: "102" },
    { name: "Exeggutor", number: "103" },
    { name: "Cubone", number: "104" },
    { name: "Marowak", number: "105" },
    { name: "Hitmonlee", number: "106" },
    { name: "Hitmonchan", number: "107" },
    { name: "Lickitung", number: "108" },
    { name: "Koffing", number: "109" },
    { name: "Weezing", number: "110" },
    { name: "Rhyhorn", number: "111" },
    { name: "Rhydon", number: "112" },
    { name: "Chansey", number: "113" },
    { name: "Tangela", number: "114" },
    { name: "Kangaskhan", number: "115" },
    { name: "Horsea", number: "116" },
    { name: "Seadra", number: "117" },
    { name: "Goldeen", number: "118" },
    { name: "Seaking", number: "119" },
    { name: "Staryu", number: "120" },
    { name: "Starmie", number: "121" },
    { name: "Mr. Mime", number: "122" },
    { name: "Scyther", number: "123" },
    { name: "Jynx", number: "124" },
    { name: "Electabuzz", number: "125" },
    { name: "Magmar", number: "126" },
    { name: "Pinsir", number: "127" },
    { name: "Tauros", number: "128" },
    { name: "Magikarp", number: "129" },
    { name: "Gyarados", number: "130" },
    { name: "Lapras", number: "131" },
    { name: "Ditto", number: "132" },
    { name: "Eevee", number: "133" },
    { name: "Vaporeon", number: "134" },
    { name: "Jolteon", number: "135" },
    { name: "Flareon", number: "136" },
    { name: "Porygon", number: "137" },
    { name: "Omanyte", number: "138" },
    { name: "Omastar", number: "139" },
    { name: "Kabuto", number: "140" },
    { name: "Kabutops", number: "141" },
    { name: "Aerodactyl", number: "142" },
    { name: "Snorlax", number: "143" },
    { name: "Articuno", number: "144" },
    { name: "Zapdos", number: "145" },
    { name: "Moltres", number: "146" },
    { name: "Dratini", number: "147" },
    { name: "Dragonair", number: "148" },
    { name: "Dragonite", number: "149" },
    { name: "Mewtwo", number: "150" },
    { name: "Mew", number: "151" },
    { name: "Chikorita", number: "152" },
    { name: "Bayleef", number: "153" },
    { name: "Meganium", number: "154" },
    { name: "Cyndaquil", number: "155" },
    { name: "Quilava", number: "156" },
    { name: "Typhlosion", number: "157" },
    { name: "Totodile", number: "158" },
    { name: "Croconaw", number: "159" },
    { name: "Feraligatr", number: "160" },
    { name: "Sentret", number: "161" },
    { name: "Furret", number: "162" },
    { name: "Hoothoot", number: "163" },
    { name: "Noctowl", number: "164" },
    { name: "Ledyba", number: "165" },
    { name: "Ledian", number: "166" },
    { name: "Spinarak", number: "167" },
    { name: "Ariados", number: "168" },
    { name: "Crobat", number: "169" },
    { name: "Chinchou", number: "170" },
    { name: "Lanturn", number: "171" },
    { name: "Pichu", number: "172" },
    { name: "Cleffa", number: "173" },
    { name: "Igglybuff", number: "174" },
    { name: "Togepi", number: "175" },
    { name: "Togetic", number: "176" },
    { name: "Natu", number: "177" },
    { name: "Xatu", number: "178" },
    { name: "Mareep", number: "179" },
    { name: "Flaaffy", number: "180" },
    { name: "Ampharos", number: "181" },
    { name: "Bellossom", number: "182" },
    { name: "Marill", number: "183" },
    { name: "Azumarill", number: "184" },
    { name: "Sudowoodo", number: "185" },
    { name: "Politoed", number: "186" },
    { name: "Hoppip", number: "187" },
    { name: "Skiploom", number: "188" },
    { name: "Jumpluff", number: "189" },
    { name: "Aipom", number: "190" },
    { name: "Sunkern", number: "191" },
    { name: "Sunflora", number: "192" },
    { name: "Yanma", number: "193" },
    { name: "Wooper", number: "194" },
    { name: "Quagsire", number: "195" },
    { name: "Espeon", number: "196" },
    { name: "Umbreon", number: "197" },
    { name: "Murkrow", number: "198" },
    { name: "Slowking", number: "199" },
    { name: "Misdreavus", number: "200" },
    { name: "Unown", number: "201" },
    { name: "Wobbuffet", number: "202" },
    { name: "Girafarig", number: "203" },
    { name: "Pineco", number: "204" },
    { name: "Forretress", number: "205" },
    { name: "Dunsparce", number: "206" },
    { name: "Gligar", number: "207" },
    { name: "Steelix", number: "208 " },
    { name: "Snubbull", number: "209" },
    { name: "Granbull", number: "210" },
    { name: "Qwilfish", number: "211" },
    { name: "Scizor", number: "212" },
    { name: "Shuckle", number: "213" },
    { name: "Heracross", number: "214" },
    { name: "Sneasel", number: "215" },
    { name: "Teddiursa", number: "216" },
    { name: "Ursaring", number: "217" },
    { name: "Slugma", number: "218" },
    { name: "Magcargo", number: "219" },
    { name: "Swinub", number: "220" },
    { name: "Piloswine", number: "221" },
    { name: "Corsola", number: "222" },
    { name: "Remoraid", number: "223" },
    { name: "Octillery", number: "224" },
    { name: "Delibird", number: "225" },
    { name: "Mantine", number: "226" },
    { name: "Skarmory", number: "227" },
    { name: "Houndour", number: "228" },
    { name: "Houndoom", number: "229" },
    { name: "Kingdra", number: "230" },
    { name: "Phanpy", number: "231" },
    { name: "Donphan", number: "232" },
    { name: "Porygon2", number: "233" },
    { name: "Stantler", number: "234" },
    { name: "Smeargle", number: "235" },
    { name: "Tyrogue", number: "236" },
    { name: "Hitmontop", number: "237" },
    { name: "Smoochum", number: "238" },
    { name: "Elekid", number: "239" },
    { name: "Magby", number: "240" },
    { name: "Miltank", number: "241" },
    { name: "Blissey", number: "242" },
    { name: "Raikou", number: "243" },
    { name: "Entei", number: "244" },
    { name: "Suicune", number: "245" },
    { name: "Larvitar", number: "246" },
    { name: "Pupitar", number: "247" },
    { name: "Tyranitar", number: "248" },
    { name: "Lugia", number: "249" },
    { name: "Ho-Oh", number: "250" },
    { name: "Celebi", number: "251" },
    { name: "Treecko", number: "252" },
    { name: "Grovyle", number: "253" },
    { name: "Sceptile", number: "254" },
    { name: "Torchic", number: "255" },
    { name: "Combusken", number: "256" },
    { name: "Blaziken", number: "257" },
    { name: "Mudkip", number: "258" },
    { name: "Marshtomp", number: "259" },
    { name: "Swampert", number: "260" },
    { name: "Poochyena", number: "261" },
    { name: "Mightyena", number: "262" },
    { name: "Zigzagoon", number: "263" },
    { name: "Linoone", number: "264" },
    { name: "Wurmple", number: "265" },
    { name: "Silcoon", number: "266" },
    { name: "Beautifly", number: "267" },
    { name: "Cascoon", number: "268" },
    { name: "Dustox", number: "269" },
    { name: "Lotad", number: "270" },
    { name: "Lombre", number: "271" },
    { name: "Ludicolo", number: "272" },
    { name: "Seedot", number: "273" },
    { name: "Nuzleaf", number: "274" },
    { name: "Shiftry", number: "275" },
    { name: "Taillow", number: "276" },
    { name: "Swellow", number: "277" },
    { name: "Wingull", number: "278" },
    { name: "Pelipper", number: "279" },
    { name: "Ralts", number: "280" },
    { name: "Kirlia", number: "281" },
    { name: "Gardevoir", number: "282" },
    { name: "Surskit", number: "283" },
    { name: "Masquerain", number: "284" },
    { name: "Shroomish", number: "285" },
    { name: "Breloom", number: "286" },
    { name: "Slakoth", number: "287" },
    { name: "Vigoroth", number: "288" },
    { name: "Slaking", number: "289" },
    { name: "Nincada", number: "290" },
    { name: "Ninjask", number: "291" },
    { name: "Shedinja", number: "292" },
    { name: "Whismur", number: "293" },
    { name: "Loudred", number: "294" },
    { name: "Exploud", number: "295" },
    { name: "Makuhita", number: "296" },
    { name: "Hariyama", number: "297" },
    { name: "Azurill", number: "298" },
    { name: "Nosepass", number: "299" },
    { name: "Skitty", number: "300" },
    { name: "Delcatty", number: "301" },
    { name: "Sableye", number: "302" },
    { name: "Mawile", number: "303" },
    { name: "Aron", number: "304" },
    { name: "Lairon", number: "305" },
    { name: "Aggron", number: "306" },
    { name: "Meditite", number: "307" },
    { name: "Medicham", number: "308" },
    { name: "Electrike", number: "309" },
    { name: "Manectric", number: "310" },
    { name: "Plusle", number: "311" },
    { name: "Minun", number: "312" },
    { name: "Volbeat", number: "313" },
    { name: "Illumise", number: "314" },
    { name: "Roselia", number: "315" },
    { name: "Gulpin", number: "316" },
    { name: "Swalot", number: "317" },
    { name: "Carvanha", number: "318" },
    { name: "Sharpedo", number: "319" },
    { name: "Wailmer", number: "320" },
    { name: "Wailord", number: "321" },
    { name: "Numel", number: "322" },
    { name: "Camerupt", number: "323" },
    { name: "Torkoal", number: "324" },
    { name: "Spoink", number: "325" },
    { name: "Grumpig", number: "326" },
    { name: "Spinda", number: "327" },
    { name: "Trapinch", number: "328" },
    { name: "Vibrava", number: "329" },
    { name: "Flygon", number: "330" },
    { name: "Cacnea", number: "331" },
    { name: "Cacturne", number: "332" },
    { name: "Swablu", number: "333" },
    { name: "Altaria", number: "334" },
    { name: "Zangoose", number: "335" },
    { name: "Seviper", number: "336" },
    { name: "Lunatone", number: "337" },
    { name: "Solrock", number: "338" },
    { name: "Barboach", number: "339" },
    { name: "Whiscash", number: "340" },
    { name: "Corphish", number: "341" },
    { name: "Crawdaunt", number: "342" },
    { name: "Baltoy", number: "343" },
    { name: "Claydol", number: "344" },
    { name: "Lileep", number: "345" },
    { name: "Cradily", number: "346" },
    { name: "Anorith", number: "347" },
    { name: "Armaldo", number: "348" },
    { name: "Feebas", number: "349" },
    { name: "Milotic", number: "350" },
    { name: "Castform", number: "351" },
    { name: "Kecleon", number: "352" },
    { name: "Shuppet", number: "353" },
    { name: "Banette", number: "354" },
    { name: "Duskull", number: "355" },
    { name: "Dusclops", number: "356" },
    { name: "Tropius", number: "357" },
    { name: "Chimecho", number: "358" },
    { name: "Absol", number: "359" },
    { name: "Wynaut", number: "360" },
    { name: "Snorunt", number: "361" },
    { name: "Glalie", number: "362" },
    { name: "Spheal", number: "363" },
    { name: "Sealeo", number: "364" },
    { name: "Walrein", number: "365" },
    { name: "Clamperl", number: "366" },
    { name: "Huntail", number: "367" },
    { name: "Gorebyss", number: "368" },
    { name: "Relicanth", number: "369" },
    { name: "Luvdisc", number: "370" },
    { name: "Bagon", number: "371" },
    { name: "Shelgon", number: "372" },
    { name: "Salamence", number: "373" },
    { name: "Beldum", number: "374" },
    { name: "Metang", number: "375" },
    { name: "Metagross", number: "376" },
    { name: "Regirock", number: "377" },
    { name: "Regice", number: "378" },
    { name: "Registeel", number: "379" },
    { name: "Latias", number: "380" },
    { name: "Latios", number: "381" },
    { name: "Kyogre", number: "382" },
    { name: "Groudon", number: "383" },
    { name: "Rayquaza", number: "384" },
    { name: "Jirachi", number: "385" },
    { name: "Deoxys", number: "386" },
    { name: "Turtwig", number: "387" },
    { name: "Grotle", number: "388" },
    { name: "Torterra", number: "389" },
    { name: "Chimchar", number: "390" },
    { name: "Monferno", number: "391" },
    { name: "Infernape", number: "392" },
    { name: "Piplup", number: "393" },
    { name: "Prinplup", number: "394" },
    { name: "Empoleon", number: "395" },
    { name: "Starly", number: "396" },
    { name: "Staravia", number: "397" },
    { name: "Staraptor", number: "398" },
    { name: "Bidoof", number: "399" },
    { name: "Bibarel", number: "400" },
    { name: "Kricketot", number: "401" },
    { name: "Kricketune", number: "402" },
    { name: "Shinx", number: "403" },
    { name: "Luxio", number: "404" },
    { name: "Luxray", number: "405" },
    { name: "Budew", number: "406" },
    { name: "Roserade", number: "407" },
    { name: "Cranidos", number: "408" },
    { name: "Rampardos", number: "409" },
    { name: "Shieldon", number: "410" },
    { name: "Bastiodon", number: "411" },
    { name: "Burmy", number: "412" },
    { name: "Wormadam", number: "413" },
    { name: "Mothim", number: "414" },
    { name: "Combee", number: "415 " },
    { name: "Vespiquen", number: "416" },
    { name: "Pachirisu", number: "417" },
    { name: "Buizel", number: "418" },
    { name: "Floatzel", number: "419" },
    { name: "Cherubi", number: "420" },
    { name: "Cherrim", number: "421" },
    { name: "Shellos", number: "422" },
    { name: "Gastrodon", number: "423" },
    { name: "Ambipom", number: "424 " },
    { name: "Drifloon", number: "425" },
    { name: "Drifblim", number: "426" },
    { name: "Buneary", number: "427" },
    { name: "Lopunny", number: "428" },
    { name: "Mismagius", number: "429" },
    { name: "Honchkrow", number: "430" },
    { name: "Glameow", number: "431" },
    { name: "Purugly", number: "432" },
    { name: "Chingling", number: "433" },
    { name: "Stunky", number: "434" },
    { name: "Skuntank", number: "435" },
    { name: "Bronzor", number: "436" },
    { name: "Bronzong", number: "437" },
    { name: "Bonsly", number: "438" },
    { name: "Mime Jr.", number: "439" },
    { name: "Happiny", number: "440" },
    { name: "Chatot", number: "441" },
    { name: "Spiritomb", number: "442" },
    { name: "Gible", number: "443" },
    { name: "Gabite", number: "444" },
    { name: "Garchomp", number: "445" },
    { name: "Munchlax", number: "446" },
    { name: "Riolu", number: "447" },
    { name: "Lucario", number: "448" },
    { name: "Hippopotas", number: "449" },
    { name: "Hippowdon", number: "450 " },
    { name: "Skorupi", number: "451" },
    { name: "Drapion", number: "452" },
    { name: "Croagunk", number: "453" },
    { name: "Toxicroak", number: "454" },
    { name: "Carnivine", number: "455" },
    { name: "Finneon", number: "456" },
    { name: "Lumineon", number: "457" },
    { name: "Mantyke", number: "458" },
    { name: "Snover", number: "459" },
    { name: "Abomasnow", number: "460" },
    { name: "Weavile", number: "461" },
    { name: "Magnezone", number: "462" },
    { name: "Lickilicky", number: "463" },
    { name: "Rhyperior", number: "464" },
    { name: "Tangrowth", number: "465" },
    { name: "Electivire", number: "466" },
    { name: "Magmortar", number: "467" },
    { name: "Togekiss", number: "468" },
    { name: "Yanmega", number: "469" },
    { name: "Leafeon", number: "470" },
    { name: "Glaceon", number: "471" },
    { name: "Gliscor", number: "472" },
    { name: "Mamoswine", number: "473" },
    { name: "Porygon-Z", number: "474" },
    { name: "Gallade", number: "475" },
    { name: "Probopass", number: "476" },
    { name: "Dusknoir", number: "477" },
    { name: "Froslass", number: "478" },
    { name: "Rotom", number: "479" },
    { name: "Uxie", number: "480" },
    { name: "Mesprit", number: "481" },
    { name: "Azelf", number: "482" },
    { name: "Dialga", number: "483" },
    { name: "Palkia", number: "484" },
    { name: "Heatran", number: "485" },
    { name: "Regigigas", number: "486" },
    { name: "Giratina", number: "487" },
    { name: "Cresselia", number: "488" },
    { name: "Phione", number: "489" },
    { name: "Manaphy", number: "490" },
    { name: "Darkrai", number: "491" },
    { name: "Shaymin", number: "492" },
    { name: "Arceus", number: "493" },
    { name: "Victini", number: "494" },
    { name: "Snivy", number: "495" },
    { name: "Servine", number: "496" },
    { name: "Serperior", number: "497" },
    { name: "Tepig", number: "498" },
    { name: "Pignite", number: "499" },
    { name: "Emboar", number: "500" },
    { name: "Oshawott", number: "501" },
    { name: "Dewott", number: "502" },
    { name: "Samurott", number: "503" },
    { name: "Patrat", number: "504" },
    { name: "Watchog", number: "505" },
    { name: "Lillipup", number: "506" },
    { name: "Herdier", number: "507" },
    { name: "Stoutland", number: "508" },
    { name: "Purrloin", number: "509" },
    { name: "Liepard", number: "510" },
    { name: "Pansage", number: "511" },
    { name: "Simisage", number: "512" },
    { name: "Pansear", number: "513" },
    { name: "Simisear", number: "514" },
    { name: "Panpour", number: "515" },
    { name: "Simipour", number: "516" },
    { name: "Munna", number: "517" },
    { name: "Musharna", number: "518" },
    { name: "Pidove", number: "519" },
    { name: "Tranquill", number: "520" },
    { name: "Unfezant", number: "521" },
    { name: "Blitzle", number: "522" },
    { name: "Zebstrika", number: "523" },
    { name: "Roggenrola", number: "524" },
    { name: "Boldore", number: "525" },
    { name: "Gigalith", number: "526" },
    { name: "Woobat", number: "527" },
    { name: "Swoobat", number: "528" },
    { name: "Drilbur", number: "529" },
    { name: "Excadrill", number: "530" },
    { name: "Audino", number: "531" },
    { name: "Timburr", number: "532" },
    { name: "Gurdurr", number: "533" },
    { name: "Conkeldurr", number: "534" },
    { name: "Tympole", number: "535" },
    { name: "Palpitoad", number: "536" },
    { name: "Seismitoad", number: "537" },
    { name: "Throh", number: "538" },
    { name: "Sawk", number: "539" },
    { name: "Sewaddle", number: "540" },
    { name: "Swadloon", number: "541" },
    { name: "Leavanny", number: "542" },
    { name: "Venipede", number: "543" },
    { name: "Whirlipede", number: "544" },
    { name: "Scolipede", number: "545" },
    { name: "Cottonee", number: "546" },
    { name: "Whimsicott", number: "547" },
    { name: "Petilil", number: "548" },
    { name: "Lilligant", number: "549" },
    { name: "Basculin", number: "550" },
    { name: "Sandile", number: "551" },
    { name: "Krokorok", number: "552" },
    { name: "Krookodile", number: "553" },
    { name: "Darumaka", number: "554" },
    { name: "Darmanitan", number: "555" },
    { name: "Maractus", number: "556" },
    { name: "Dwebble", number: "557" },
    { name: "Crustle", number: "558" },
    { name: "Scraggy", number: "559" },
    { name: "Scrafty", number: "560" },
    { name: "Sigilyph", number: "561" },
    { name: "Yamask", number: "562" },
    { name: "Cofagrigus", number: "563" },
    { name: "Tirtouga", number: "564" },
    { name: "Carracosta", number: "565" },
    { name: "Archen", number: "566" },
    { name: "Archeops", number: "567" },
    { name: "Trubbish", number: "568" },
    { name: "Garbodor", number: "569" },
    { name: "Zorua", number: "570" },
    { name: "Zoroark", number: "571" },
    { name: "Minccino", number: "572" },
    { name: "Cinccino", number: "573" },
    { name: "Gothita", number: "574" },
    { name: "Gothorita", number: "575" },
    { name: "Gothitelle", number: "576" },
    { name: "Solosis", number: "577" },
    { name: "Duosion", number: "578" },
    { name: "Reuniclus", number: "579" },
    { name: "Ducklett", number: "580" },
    { name: "Swanna", number: "581" },
    { name: "Vanillite", number: "582" },
    { name: "Vanillish", number: "583" },
    { name: "Vanilluxe", number: "584" },
    { name: "Deerling", number: "585" },
    { name: "Sawsbuck", number: "586" },
    { name: "Emolga", number: "587" },
    { name: "Karrablast", number: "588" },
    { name: "Escavalier", number: "589" },
    { name: "Foongus", number: "590" },
    { name: "Amoonguss", number: "591" },
    { name: "Frillish", number: "592" },
    { name: "Jellicent", number: "593" },
    { name: "Alomomola", number: "594" },
    { name: "Joltik", number: "595" },
    { name: "Galvantula", number: "596" },
    { name: "Ferroseed", number: "597" },
    { name: "Ferrothorn", number: "598" },
    { name: "Klink", number: "599" },
    { name: "Klang", number: "600" },
    { name: "Klinklang", number: "601" },
    { name: "Tynamo", number: "602" },
    { name: "Eelektrik", number: "603" },
    { name: "Eelektross", number: "604" },
    { name: "Elgyem", number: "605" },
    { name: "Beheeyem", number: "606" },
    { name: "Litwick", number: "607" },
    { name: "Lampent", number: "608" },
    { name: "Chandelure", number: "609" },
    { name: "Axew", number: "610" },
    { name: "Fraxure", number: "611" },
    { name: "Haxorus", number: "612" },
    { name: "Cubchoo", number: "613" },
    { name: "Beartic", number: "614" },
    { name: "Cryogonal", number: "615" },
    { name: "Shelmet", number: "616" },
    { name: "Accelgor", number: "617" },
    { name: "Stunfisk", number: "618" },
    { name: "Mienfoo", number: "619" },
    { name: "Mienshao", number: "620" },
    { name: "Druddigon", number: "621" },
    { name: "Golett", number: "622" },
    { name: "Golurk", number: "623" },
    { name: "Pawniard", number: "624" },
    { name: "Bisharp", number: "625" },
    { name: "Bouffalant", number: "626" },
    { name: "Rufflet", number: "627" },
    { name: "Braviary", number: "628" },
    { name: "Vullaby", number: "629" },
    { name: "Mandibuzz", number: "630" },
    { name: "Heatmor", number: "631" },
    { name: "Durant", number: "632" },
    { name: "Deino", number: "633" },
    { name: "Zweilous", number: "634" },
    { name: "Hydreigon", number: "635" },
    { name: "Larvesta", number: "636" },
    { name: "Volcarona", number: "637" },
    { name: "Cobalion", number: "638" },
    { name: "Terrakion", number: "639" },
    { name: "Virizion", number: "640" },
    { name: "Tornadus", number: "641" },
    { name: "Thundurus", number: "642" },
    { name: "Reshiram", number: "643" },
    { name: "Zekrom", number: "644" },
    { name: "Landorus", number: "645" },
    { name: "Kyurem", number: "646" },
    { name: "Keldeo", number: "647" },
    { name: "Meloetta", number: "648" },
    { name: "Genesect", number: "649" },
];

//PLAYER NAMES
var namePlayerA;
var namePlayerB;

//POPUP BOOLEANS
var isSettingsOpen = false;
var isResetOpen = false;

var spriteIDPlayerA = 0;
var spriteIDPlayerB = 0;

//SEARCH FOR NUMBER IN RESOURCE LIST
function searchPokeNO(pokemon) {
    
    for (let i = 0; i < pokemonData.length; i++) {
        
        if (pokemonData[i].name === pokemon) {

            if (pokemonData[i].number === "000") {
                console.log("empty slot");
            } else {
            console.log("found number " + pokemonData[i].number + " for " + pokemon);
            return pokemonData[i].number;
            }
        }
    } 
}

//RENDER BOTH SYNCS
function renderSync() {
    
    var ulA = document.getElementById('sync-list-A');
    var ulB = document.getElementById('sync-list-B');
    
    for (const key in sync) {
        if (sync.hasOwnProperty(key)) {

            var pokemon = sync[key];
            if (pokemon !== undefined) {
                var slotA = pokemon.getA();
                var slotB = pokemon.getB();
            } else {
                var slotA = "UNDEFINED";
                var slotB = "UNDEFINED";
            }

            //DIV FOR LIST ITEM A
            var liDivA = document.createElement('div');    
            liDivA.className = 'list-item-container';

            //DIV FOR LIST ITEM B
            var liDivB = document.createElement('div');
            liDivB.className = 'list-item-container';

            //LIST ITEMS A & B
            var liA = document.createElement('li');
            var liB = document.createElement('li');

            //IMAGE ELEMENTS A & B
            var imgA = document.createElement('img');
            var imgB = document.createElement('img');

            //WRAPPER ELEMENTS A & B (FOR IMAGE AND TEXT)
            var wrapperA = document.createElement('div');
            var wrapperB = document.createElement('div');

            wrapperA.className = 'content-wrapper';
            wrapperA.id = 'wrapper';

            wrapperB.className = 'content-wrapper';
            wrapperB.id = 'wrapper';

            //SEARCH FOR POKEMON NUMBER A & B
            let pokeNOa = searchPokeNO(slotA);
            let pokeNOb = searchPokeNO(slotB);

            console.log("PokeNO (A): " + pokeNOa);
            console.log("PokeNO (B): " + pokeNOb);

            //CONSTRUCT SPRITE URL
            imgA.src = 'https://projectpokemon.org/images/sprites-models/bw-animated/' + pokeNOa + '.gif';
            imgB.src = 'https://projectpokemon.org/images/sprites-models/bw-animated/' + pokeNOb + '.gif';
                
            
            if (sync[key] !== undefined) {

                //TEXT NODES FOR LIST ITEMS^
                var labelA = document.createElement("p");
                labelA.textContent = sync[key].getA();
                labelA.className = 'sync-label';
                wrapperA.appendChild(labelA);
                wrapperA.appendChild(imgA);
                liA.appendChild(wrapperA);

                var labelB = document.createElement("p");
                labelB.textContent = sync[key].getB();
                labelB.className = 'sync-label';
                wrapperB.appendChild(labelB);
                wrapperB.appendChild(imgB);
                liB.appendChild(wrapperB);
            
            //BLANK CARD IF UNSET
            } else {

                liDivA.className = 'empty-container';
                liDivB.className = 'empty-container';
            }

            imgA.className = "sprite";
            imgB.className = "sprite";

            ulA.appendChild(liDivA);
            
            liDivB.appendChild(wrapperB);
            ulB.appendChild(liDivB);
            ulB.appendChild(liB);

        }
    }
}





            

//REFRESH BOTH SYNCS
function refreshSync() {
    console.log("REFRESHING...");
    var ulA = document.getElementById('syncListA');
    var ulB = document.getElementById('syncListB');
    ulA.innerHTML = '';
    ulB.innerHTML = '';
    renderSync();
    
}



//RENDER HEADING A (PLAYER A)
function renderHeadingA() {

    //SPRITE
    const playerSpriteA = document.getElementById('player-sprite-A');
    if (spriteIDPlayerA === 0) {
        playerSpriteA.src = 'https://www.pokewiki.de/images/4/4d/Overworldsprite_Warren_SW.png';
        playerSpriteA.style.height = '45px';
        playerSpriteA.style.imageRendering = 'crisp-edges';
    } else {
        playerSpriteA.src = 'https://www.pokewiki.de/images/1/16/Overworldsprite_Lotta_SW.png';
        playerSpriteA.style.height = '47px';
        playerSpriteA.style.imageRendering = 'crisp-edges';
    }

    //HEADING
    const headingA = document.getElementById('hA');

    if (namePlayerA === undefined) {
        namePlayerA = "Player A";
    }

    headingA.innerHTML = namePlayerA;
}

//MALE-FEMALE SWITCH PLAYER A
document.getElementById('player-sprite-A').addEventListener('click', function() {
    console.log("Player A sprite was clicked...");
    if (spriteIDPlayerA === 0) {
        spriteIDPlayerA = 1;
    } else {
        spriteIDPlayerA = 0;
    }
    renderHeadingA();
    console.log("Rendered heading A");
});

//RENDER HEADING B (PLAYER B)
function renderHeadingB() {
    const playerSpriteB = document.getElementById('player-sprite-B');
    if (spriteIDPlayerB === 0) {
        //MALE PLAYER SPRITE
        playerSpriteB.src = 'https://www.pokewiki.de/images/4/4d/Overworldsprite_Warren_SW.png';
        playerSpriteB.style.height = '45px';
        playerSpriteB.style.imageRendering = 'crisp-edges';
    } else {
        //FEMALE PLAYER SPRITE
        playerSpriteB.src = 'https://www.pokewiki.de/images/1/16/Overworldsprite_Lotta_SW.png';
        playerSpriteB.style.height = '50px';
        playerSpriteB.style.imageRendering = 'crisp-edges';
    }
    const headingB = document.getElementById('hB');

    //NAME PLAYER B IF NO NAME IS SET
    if (namePlayerB === undefined) {
        namePlayerB = "Player B";
    //NAME TAKEN FROM VARIABLE IF SET
    }
    headingB.innerHTML = namePlayerB;
}

//MALE-FEMALE SWITCH PLAYER B
document.getElementById('player-sprite-B').addEventListener('click', function() {
    console.log("Player B sprite was clicked...");
    if (spriteIDPlayerB === 0) {
        spriteIDPlayerB = 1;
    } else {
        spriteIDPlayerB = 0;
    }
    renderHeadingB();
    console.log("Rendered heading B");
});

function renderHeadings () {
    renderHeadingA();
    renderHeadingB();
}

//DEBUG FUNCTION
function debugPlease() {
    debugIndex++;
    debug = pokemonData[debugIndex].name;
    sync['oneA'] = debug;
    console.log("Index: " + debugIndex);
    console.log("Pokemon: " + debug);
    console.log("Currently displaying: " + pokemonData[debugIndex].name);
    refreshSync();
}

//RESET SYNCLIST POPUP
function resetSyncList() {
    
    console.log("Resetting syncList...");

    const resetScreen = document.createElement('div');
    resetScreen.className = 'resetScreen';

    const resetWrapper = document.createElement('div');
    resetWrapper.className = 'resetWrapper';

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'buttonWrapper';

    resetWrapper.innerHTML = `
    <h1> Reset SyncList? </h1>
    `

    buttonWrapper.innerHTML = `
    <button id="confirmReset"> Yes </button>
    <button id="cancelReset"> No </button>
    `
    resetWrapper.appendChild(buttonWrapper);
    resetScreen.appendChild(resetWrapper);
    document.body.appendChild(resetScreen);

    document.getElementById('confirmReset').addEventListener('click', function() {
        
        console.log("Resetting SyncList...");
        
        sync = {
            one: undefined,
            two: undefined,
            three: undefined,
            four: undefined,
            five: undefined,
            six: undefined
        };
        refreshSync();
        resetScreen.style.display = 'none';
    });

    document.getElementById('cancelReset').addEventListener('click', function() {
        resetScreen.style.display = 'none';
    });
}

//POKEMON OPTIONS
function pkmnOptions(e) {
    console.log(e.target);
    if (e.target.className === 'sprite') {
        console.log("Sprite was clicked...");
        console.log(e.target.parentElement.parentElement.firstChild.innerHTML);
    } else {
        console.log("Sprite was not clicked...");
    }
}




//SETTINGS


function popUpSettings() {

    console.log("popUpSettings was triggered...");

    document.getElementById('settings-window').style.display = 'block';

}



const settingsCloseButton = document.getElementById("settings-close-button");

settingsCloseButton.addEventListener('click', function() {
    console.log("Closing settings...");
    const settingsScreen = document.getElementById('settings-window');
    settingsScreen.style.display = 'none';
});

document.getElementById("settings-form").addEventListener('submit', function(event) {
    event.preventDefault();

    namePlayerA = document.getElementById('player-name-A').value;
    namePlayerB = document.getElementById('player-name-B').value;

    if(namePlayerA.trim() === '') {
        namePlayerA = "PlayerA";
    }
    if(namePlayerB.trim() === '') {
        namePlayerB = "PlayerB";
    }


    document.getElementById("hA").textContent = namePlayerA;
    document.getElementById("hB").textContent = namePlayerB;
});

document.getElementById("settings-form").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("settings-window").style.display = "none";
    }
});



//ADD SYNC

function addSync(pkmnA, pkmnB) {

    let pokemonA = searchPokeNO(pkmnA);
    let pokemonB = searchPokeNO(pkmnB);

    if (sync.oneA === "UNDEFINED") {
        sync.oneA = pkmnA;
        sync.oneB = pkmnB;
    } else if (sync.twoA === "UNDEFINED") {
        sync.twoA = pkmnA;
        sync.twoB = pkmnB;
    } else if (sync.threeA === "UNDEFINED") {
        sync.threeA = pkmnA;
        sync.threeB = pkmnB;
    } else if (sync.fourA === "UNDEFINED") {
        sync.fourA = pkmnA;
        sync.fourB = pkmnB;
    } else if (sync.fiveA === "UNDEFINED") {
        sync.fiveA = pkmnA;
        sync.fiveB = pkmnB;
    } else if (sync.sixA === "UNDEFINED") {
        sync.sixA = pkmnA;
        sync.sixB = pkmnB;
    } else {
        console.log("SyncList is full...");
        box.push({ pkmnA, pkmnB });
    }
}



renderHeadings();
renderSync();

document.getElementById('settingsButton').addEventListener('click', popUpSettings);
document.getElementById('resetButton').addEventListener('click', resetSyncList);

document.getElementById('wrapper').addEventListener('click', pkmnOptions);
