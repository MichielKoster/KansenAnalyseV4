import { useState, useCallback, useMemo, useEffect } from "react";

// ── Data ────────────────────────────────────────────────────────────────────
const RAW_GEMEENTEN = [{"gemeente":"Amsterdam","provincie":"Noord-Holland","inwoners":921000,"themas":["wonen","woningbouw","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","participatie","diversiteit","veiligheid","ondermijning","digitalisering","organisatieontwikkeling","HRM","financiën"],"lat":52.374,"lng":4.89},{"gemeente":"Alkmaar","provincie":"Noord-Holland","inwoners":109000,"themas":["woningbouw","binnenstad","duurzaamheid","energietransitie","sociaal domein","jeugdzorg","wmo","veiligheid","bereikbaarheid","organisatie","financiën","regionale samenwerking"],"lat":52.632,"lng":4.748},{"gemeente":"Den Helder","provincie":"Noord-Holland","inwoners":55000,"themas":["havengerelateerd","marine","woningbouw","sociaal domein","armoede","jeugdzorg","participatie","veiligheid","regionale samenwerking","HRM","krimp","arbeidsmarkt"],"lat":52.955,"lng":4.762},{"gemeente":"Haarlem","provincie":"Noord-Holland","inwoners":163000,"themas":["woningbouw","duurzaamheid","klimaatadaptatie","sociaal domein","wmo","jeugdzorg","cultuur","bereikbaarheid","organisatieontwikkeling","financiën","participatie"],"lat":52.381,"lng":4.636},{"gemeente":"Haarlemmermeer","provincie":"Noord-Holland","inwoners":163000,"themas":["woningbouw","bereikbaarheid","Schiphol","duurzaamheid","sociaal domein","jeugdzorg","wmo","veiligheid","organisatie","financiën"],"lat":52.306,"lng":4.69},{"gemeente":"Hoorn","provincie":"Noord-Holland","inwoners":73000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","armoede","schuldhulpverlening","veiligheid","binnenstad","organisatie"],"lat":52.641,"lng":5.06},{"gemeente":"Zaanstad","provincie":"Noord-Holland","inwoners":160000,"themas":["woningbouw","duurzaamheid","industrie","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":52.456,"lng":4.82},{"gemeente":"Purmerend","provincie":"Noord-Holland","inwoners":83000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","bereikbaarheid","organisatie","financiën"],"lat":52.503,"lng":4.96},{"gemeente":"Velsen","provincie":"Noord-Holland","inwoners":70000,"themas":["haven","woningbouw","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","veiligheid","organisatie"],"lat":52.456,"lng":4.656},{"gemeente":"Heerhugowaard","provincie":"Noord-Holland","inwoners":58000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","regionale samenwerking","organisatie"],"lat":52.664,"lng":4.839},{"gemeente":"Dijk en Waard","provincie":"Noord-Holland","inwoners":86000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","HRM"],"lat":52.686,"lng":4.82},{"gemeente":"Hollands Kroon","provincie":"Noord-Holland","inwoners":49000,"themas":["landbouw","woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie","regionale samenwerking"],"lat":52.816,"lng":4.902},{"gemeente":"Medemblik","provincie":"Noord-Holland","inwoners":45000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.769,"lng":5.103},{"gemeente":"Schagen","provincie":"Noord-Holland","inwoners":47000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","toerisme","organisatie"],"lat":52.789,"lng":4.799},{"gemeente":"Heemskerk","provincie":"Noord-Holland","inwoners":39000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","veiligheid","organisatie"],"lat":52.507,"lng":4.68},{"gemeente":"Beverwijk","provincie":"Noord-Holland","inwoners":42000,"themas":["woningbouw","haven","duurzaamheid","sociaal domein","jeugdzorg","participatie","armoede","veiligheid"],"lat":52.487,"lng":4.656},{"gemeente":"Enkhuizen","provincie":"Noord-Holland","inwoners":18000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking","organisatie"],"lat":52.703,"lng":5.295},{"gemeente":"Edam-Volendam","provincie":"Noord-Holland","inwoners":37000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.515,"lng":5.048},{"gemeente":"Amstelveen","provincie":"Noord-Holland","inwoners":93000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","diversiteit","organisatie","financiën"],"lat":52.298,"lng":4.862},{"gemeente":"Aalsmeer","provincie":"Noord-Holland","inwoners":32000,"themas":["woningbouw","bloementeelt","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.262,"lng":4.762},{"gemeente":"Uithoorn","provincie":"Noord-Holland","inwoners":30000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.236,"lng":4.831},{"gemeente":"Langedijk","provincie":"Noord-Holland","inwoners":28000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking","organisatie"],"lat":52.682,"lng":4.8},{"gemeente":"Bergen NH","provincie":"Noord-Holland","inwoners":32000,"themas":["woningbouw","toerisme","natuur","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.668,"lng":4.7},{"gemeente":"Castricum","provincie":"Noord-Holland","inwoners":37000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.544,"lng":4.66},{"gemeente":"Heiloo","provincie":"Noord-Holland","inwoners":24000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.603,"lng":4.7},{"gemeente":"Koggenland","provincie":"Noord-Holland","inwoners":24000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.683,"lng":4.979},{"gemeente":"Stede Broec","provincie":"Noord-Holland","inwoners":22000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking","organisatie"],"lat":52.718,"lng":5.221},{"gemeente":"Drechterland","provincie":"Noord-Holland","inwoners":20000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking"],"lat":52.672,"lng":5.167},{"gemeente":"Texel","provincie":"Noord-Holland","inwoners":13000,"themas":["toerisme","woningbouw","duurzaamheid","starters","sociaal domein","jeugdzorg","eiland"],"lat":53.054,"lng":4.8},{"gemeente":"Opmeer","provincie":"Noord-Holland","inwoners":11000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.711,"lng":4.955},{"gemeente":"Gooise Meren","provincie":"Noord-Holland","inwoners":58000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie","financiën"],"lat":52.282,"lng":5.067},{"gemeente":"Blaricum","provincie":"Noord-Holland","inwoners":11000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.27,"lng":5.237},{"gemeente":"Huizen","provincie":"Noord-Holland","inwoners":42000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.296,"lng":5.238},{"gemeente":"Hilversum","provincie":"Noord-Holland","inwoners":91000,"themas":["woningbouw","mediastad","duurzaamheid","sociaal domein","jeugdzorg","wmo","veiligheid","participatie","organisatie"],"lat":52.223,"lng":5.18},{"gemeente":"Laren","provincie":"Noord-Holland","inwoners":11000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.256,"lng":5.234},{"gemeente":"Diemen","provincie":"Noord-Holland","inwoners":29000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","diversiteit","organisatie"],"lat":52.34,"lng":4.959},{"gemeente":"Waterland","provincie":"Noord-Holland","inwoners":17000,"themas":["woningbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.44,"lng":4.996},{"gemeente":"Wormerland","provincie":"Noord-Holland","inwoners":16000,"themas":["woningbouw","duurzaamheid","industrie","sociaal domein","jeugdzorg","organisatie"],"lat":52.499,"lng":4.859},{"gemeente":"Oostzaan","provincie":"Noord-Holland","inwoners":10000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking"],"lat":52.435,"lng":4.876},{"gemeente":"Landsmeer","provincie":"Noord-Holland","inwoners":12000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.43,"lng":4.921},{"gemeente":"Uitgeest","provincie":"Noord-Holland","inwoners":14000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.534,"lng":4.718},{"gemeente":"Heemstede","provincie":"Noord-Holland","inwoners":27000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.354,"lng":4.614},{"gemeente":"Bloemendaal","provincie":"Noord-Holland","inwoners":23000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":52.404,"lng":4.623},{"gemeente":"Zandvoort","provincie":"Noord-Holland","inwoners":17000,"themas":["toerisme","woningbouw","starters","duurzaamheid","sociaal domein","organisatie"],"lat":52.375,"lng":4.533},{"gemeente":"Ouder-Amstel","provincie":"Noord-Holland","inwoners":14000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.301,"lng":4.924},{"gemeente":"Rotterdam","provincie":"Zuid-Holland","inwoners":655000,"themas":["woningbouw","haven","duurzaamheid","klimaatadaptatie","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","ondermijning","HRM","organisatie"],"lat":51.922,"lng":4.48},{"gemeente":"Den Haag","provincie":"Zuid-Holland","inwoners":548000,"themas":["woningbouw","internationaal","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","veiligheid","ondermijning","diversiteit","HRM","financiën"],"lat":52.07,"lng":4.3},{"gemeente":"Leiden","provincie":"Zuid-Holland","inwoners":125000,"themas":["woningbouw","kennisstad","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","bereikbaarheid","organisatie"],"lat":52.16,"lng":4.497},{"gemeente":"Dordrecht","provincie":"Zuid-Holland","inwoners":119000,"themas":["woningbouw","haven","duurzaamheid","klimaatadaptatie","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.814,"lng":4.669},{"gemeente":"Zoetermeer","provincie":"Zuid-Holland","inwoners":124000,"themas":["woningbouw","bereikbaarheid","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.057,"lng":4.494},{"gemeente":"Delft","provincie":"Zuid-Holland","inwoners":103000,"themas":["woningbouw","kennisstad","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.011,"lng":4.357},{"gemeente":"Westland","provincie":"Zuid-Holland","inwoners":112000,"themas":["glastuinbouw","woningbouw","duurzaamheid","energietransitie","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.009,"lng":4.2},{"gemeente":"Alphen aan den Rijn","provincie":"Zuid-Holland","inwoners":109000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","bereikbaarheid","organisatie"],"lat":52.128,"lng":4.659},{"gemeente":"Gorinchem","provincie":"Zuid-Holland","inwoners":36000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.834,"lng":4.975},{"gemeente":"Gouda","provincie":"Zuid-Holland","inwoners":73000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.017,"lng":4.708},{"gemeente":"Schiedam","provincie":"Zuid-Holland","inwoners":79000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM"],"lat":51.921,"lng":4.395},{"gemeente":"Vlaardingen","provincie":"Zuid-Holland","inwoners":74000,"themas":["woningbouw","haven","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid"],"lat":51.912,"lng":4.344},{"gemeente":"Spijkenisse","provincie":"Zuid-Holland","inwoners":74000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid"],"lat":51.842,"lng":4.327},{"gemeente":"Nissewaard","provincie":"Zuid-Holland","inwoners":86000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.862,"lng":4.3},{"gemeente":"Brielle","provincie":"Zuid-Holland","inwoners":17000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.902,"lng":4.16},{"gemeente":"Voorne aan Zee","provincie":"Zuid-Holland","inwoners":65000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","HRM"],"lat":51.87,"lng":4.15},{"gemeente":"Hoeksche Waard","provincie":"Zuid-Holland","inwoners":88000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.753,"lng":4.501},{"gemeente":"Goeree-Overflakkee","provincie":"Zuid-Holland","inwoners":51000,"themas":["woningbouw","duurzaamheid","energie","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":51.747,"lng":4.097},{"gemeente":"Súdwest-Fryslân","provincie":"Friesland","inwoners":90000,"themas":["woningbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","participatie","toerisme","krimp","organisatie"],"lat":52.94,"lng":5.651},{"gemeente":"Leidschendam-Voorburg","provincie":"Zuid-Holland","inwoners":77000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.086,"lng":4.387},{"gemeente":"Rijswijk","provincie":"Zuid-Holland","inwoners":52000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.04,"lng":4.323},{"gemeente":"Wassenaar","provincie":"Zuid-Holland","inwoners":27000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":52.143,"lng":4.403},{"gemeente":"Pijnacker-Nootdorp","provincie":"Zuid-Holland","inwoners":56000,"themas":["woningbouw","glastuinbouw","duurzaamheid","sociaal domein","jeugdzorg","bereikbaarheid","organisatie"],"lat":52.02,"lng":4.427},{"gemeente":"Lansingerland","provincie":"Zuid-Holland","inwoners":62000,"themas":["woningbouw","glastuinbouw","duurzaamheid","sociaal domein","jeugdzorg","bereikbaarheid","organisatie"],"lat":52.0,"lng":4.567},{"gemeente":"Zuidplas","provincie":"Zuid-Holland","inwoners":45000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.996,"lng":4.613},{"gemeente":"Waddinxveen","provincie":"Zuid-Holland","inwoners":31000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.039,"lng":4.64},{"gemeente":"Bodegraven-Reeuwijk","provincie":"Zuid-Holland","inwoners":35000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.082,"lng":4.74},{"gemeente":"Krimpenerwaard","provincie":"Zuid-Holland","inwoners":56000,"themas":["woningbouw","veenweide","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.96,"lng":4.748},{"gemeente":"Capelle aan den IJssel","provincie":"Zuid-Holland","inwoners":66000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid"],"lat":51.935,"lng":4.573},{"gemeente":"Krimpen aan den IJssel","provincie":"Zuid-Holland","inwoners":29000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.918,"lng":4.594},{"gemeente":"Barendrecht","provincie":"Zuid-Holland","inwoners":48000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":51.856,"lng":4.535},{"gemeente":"Hendrik-Ido-Ambacht","provincie":"Zuid-Holland","inwoners":32000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.849,"lng":4.62},{"gemeente":"Papendrecht","provincie":"Zuid-Holland","inwoners":32000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.833,"lng":4.698},{"gemeente":"Hardinxveld-Giessendam","provincie":"Zuid-Holland","inwoners":18000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.822,"lng":4.845},{"gemeente":"Sliedrecht","provincie":"Zuid-Holland","inwoners":25000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.837,"lng":4.772},{"gemeente":"Alblasserdam","provincie":"Zuid-Holland","inwoners":20000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.869,"lng":4.66},{"gemeente":"Ridderkerk","provincie":"Zuid-Holland","inwoners":46000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.872,"lng":4.597},{"gemeente":"Albrandswaard","provincie":"Zuid-Holland","inwoners":26000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.875,"lng":4.443},{"gemeente":"Maassluis","provincie":"Zuid-Holland","inwoners":33000,"themas":["woningbouw","haven","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","veiligheid"],"lat":51.921,"lng":4.251},{"gemeente":"Midden-Delfland","provincie":"Zuid-Holland","inwoners":20000,"themas":["woningbouw","natuur","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.972,"lng":4.273},{"gemeente":"Westvoorne","provincie":"Zuid-Holland","inwoners":14000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg"],"lat":51.897,"lng":4.07},{"gemeente":"Hillegom","provincie":"Zuid-Holland","inwoners":22000,"themas":["woningbouw","bloementeelt","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.291,"lng":4.58},{"gemeente":"Lisse","provincie":"Zuid-Holland","inwoners":23000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.255,"lng":4.556},{"gemeente":"Teylingen","provincie":"Zuid-Holland","inwoners":38000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.228,"lng":4.522},{"gemeente":"Katwijk","provincie":"Zuid-Holland","inwoners":66000,"themas":["woningbouw","kust","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.2,"lng":4.406},{"gemeente":"Utrecht","provincie":"Utrecht","inwoners":368000,"themas":["woningbouw","kennisstad","mobiliteit","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","inburgering","participatie","organisatieontwikkeling","financiën"],"lat":52.09,"lng":5.121},{"gemeente":"Amersfoort","provincie":"Utrecht","inwoners":159000,"themas":["woningbouw","duurzaamheid","mobiliteit","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.156,"lng":5.388},{"gemeente":"Veenendaal","provincie":"Utrecht","inwoners":66000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.027,"lng":5.559},{"gemeente":"Nieuwegein","provincie":"Utrecht","inwoners":63000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.036,"lng":5.086},{"gemeente":"IJsselstein","provincie":"Utrecht","inwoners":34000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.018,"lng":5.046},{"gemeente":"Zeist","provincie":"Utrecht","inwoners":63000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.088,"lng":5.234},{"gemeente":"Houten","provincie":"Utrecht","inwoners":49000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.028,"lng":5.172},{"gemeente":"Soest","provincie":"Utrecht","inwoners":45000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.176,"lng":5.289},{"gemeente":"De Bilt","provincie":"Utrecht","inwoners":43000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.108,"lng":5.183},{"gemeente":"Woerden","provincie":"Utrecht","inwoners":52000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.088,"lng":4.887},{"gemeente":"Stichtse Vecht","provincie":"Utrecht","inwoners":64000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.206,"lng":4.986},{"gemeente":"Lopik","provincie":"Utrecht","inwoners":14000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.983,"lng":4.942},{"gemeente":"Oudewater","provincie":"Utrecht","inwoners":10000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.024,"lng":4.875},{"gemeente":"Montfoort","provincie":"Utrecht","inwoners":13000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.047,"lng":4.945},{"gemeente":"Bunnik","provincie":"Utrecht","inwoners":15000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.068,"lng":5.199},{"gemeente":"De Ronde Venen","provincie":"Utrecht","inwoners":44000,"themas":["woningbouw","veenweide","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.196,"lng":4.855},{"gemeente":"Vijfheerenlanden","provincie":"Utrecht","inwoners":57000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","HRM"],"lat":51.952,"lng":5.026},{"gemeente":"Wijk bij Duurstede","provincie":"Utrecht","inwoners":24000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.978,"lng":5.339},{"gemeente":"Utrechtse Heuvelrug","provincie":"Utrecht","inwoners":49000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.021,"lng":5.361},{"gemeente":"Rhenen","provincie":"Utrecht","inwoners":20000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":51.961,"lng":5.571},{"gemeente":"Eemnes","provincie":"Utrecht","inwoners":10000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":52.261,"lng":5.264},{"gemeente":"Baarn","provincie":"Utrecht","inwoners":25000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.208,"lng":5.287},{"gemeente":"Bunschoten","provincie":"Utrecht","inwoners":22000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.251,"lng":5.374},{"gemeente":"Eindhoven","provincie":"Noord-Brabant","inwoners":235000,"themas":["technologie","woningbouw","duurzaamheid","innovatie","sociaal domein","jeugdzorg","wmo","participatie","bereikbaarheid","organisatieontwikkeling","HRM"],"lat":51.441,"lng":5.478},{"gemeente":"Tilburg","provincie":"Noord-Brabant","inwoners":224000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":51.561,"lng":5.083},{"gemeente":"Breda","provincie":"Noord-Brabant","inwoners":184000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","bereikbaarheid","organisatie","HRM"],"lat":51.59,"lng":4.776},{"gemeente":"'s-Hertogenbosch","provincie":"Noord-Brabant","inwoners":155000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie","financiën"],"lat":51.688,"lng":5.304},{"gemeente":"Helmond","provincie":"Noord-Brabant","inwoners":93000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.481,"lng":5.658},{"gemeente":"Oss","provincie":"Noord-Brabant","inwoners":94000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.768,"lng":5.519},{"gemeente":"Bergen op Zoom","provincie":"Noord-Brabant","inwoners":68000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.496,"lng":4.286},{"gemeente":"Roosendaal","provincie":"Noord-Brabant","inwoners":77000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.531,"lng":4.463},{"gemeente":"Waalwijk","provincie":"Noord-Brabant","inwoners":47000,"themas":["woningbouw","logistiek","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.698,"lng":5.068},{"gemeente":"Meierijstad","provincie":"Noord-Brabant","inwoners":81000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","HRM","participatie"],"lat":51.622,"lng":5.456},{"gemeente":"Bernheze","provincie":"Noord-Brabant","inwoners":32000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.682,"lng":5.547},{"gemeente":"Veghel","provincie":"Noord-Brabant","inwoners":37000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.618,"lng":5.562},{"gemeente":"Boxtel","provincie":"Noord-Brabant","inwoners":31000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.599,"lng":5.331},{"gemeente":"Sint-Michielsgestel","provincie":"Noord-Brabant","inwoners":29000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.638,"lng":5.36},{"gemeente":"Vught","provincie":"Noord-Brabant","inwoners":27000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":51.653,"lng":5.294},{"gemeente":"Haaren","provincie":"Noord-Brabant","inwoners":14000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.582,"lng":5.243},{"gemeente":"Oisterwijk","provincie":"Noord-Brabant","inwoners":26000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.581,"lng":5.201},{"gemeente":"Hilvarenbeek","provincie":"Noord-Brabant","inwoners":15000,"themas":["woningbouw","natuur","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.484,"lng":5.14},{"gemeente":"Dongen","provincie":"Noord-Brabant","inwoners":26000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.627,"lng":4.939},{"gemeente":"Goirle","provincie":"Noord-Brabant","inwoners":24000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.524,"lng":5.066},{"gemeente":"Etten-Leur","provincie":"Noord-Brabant","inwoners":44000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.566,"lng":4.64},{"gemeente":"Halderberge","provincie":"Noord-Brabant","inwoners":30000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.543,"lng":4.529},{"gemeente":"Zundert","provincie":"Noord-Brabant","inwoners":22000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.466,"lng":4.655},{"gemeente":"Rucphen","provincie":"Noord-Brabant","inwoners":23000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.527,"lng":4.559},{"gemeente":"Moerdijk","provincie":"Noord-Brabant","inwoners":37000,"themas":["haven","industrie","woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.697,"lng":4.614},{"gemeente":"Drimmelen","provincie":"Noord-Brabant","inwoners":27000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.707,"lng":4.819},{"gemeente":"Geertruidenberg","provincie":"Noord-Brabant","inwoners":21000,"themas":["woningbouw","energietransitie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.703,"lng":4.858},{"gemeente":"Oosterhout","provincie":"Noord-Brabant","inwoners":55000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.64,"lng":4.857},{"gemeente":"Gilze en Rijen","provincie":"Noord-Brabant","inwoners":27000,"themas":["woningbouw","defensie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.548,"lng":4.927},{"gemeente":"Baarle-Nassau","provincie":"Noord-Brabant","inwoners":7000,"themas":["woningbouw","grensgebied","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.444,"lng":4.932},{"gemeente":"Alphen-Chaam","provincie":"Noord-Brabant","inwoners":10000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.489,"lng":4.934},{"gemeente":"Son en Breugel","provincie":"Noord-Brabant","inwoners":17000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie"],"lat":51.515,"lng":5.499},{"gemeente":"Nuenen","provincie":"Noord-Brabant","inwoners":23000,"themas":["woningbouw","industrie","duurzaamheid","erfgoed","sociaal domein","jeugdzorg","organisatie"],"lat":51.472,"lng":5.547},{"gemeente":"Geldrop-Mierlo","provincie":"Noord-Brabant","inwoners":39000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.422,"lng":5.561},{"gemeente":"Heeze-Leende","provincie":"Noord-Brabant","inwoners":15000,"themas":["woningbouw","natuur","duurzaamheid","landbouw","sociaal domein","jeugdzorg"],"lat":51.384,"lng":5.58},{"gemeente":"Cranendonck","provincie":"Noord-Brabant","inwoners":20000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.327,"lng":5.604},{"gemeente":"Bladel","provincie":"Noord-Brabant","inwoners":20000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.372,"lng":5.225},{"gemeente":"Eersel","provincie":"Noord-Brabant","inwoners":19000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.362,"lng":5.314},{"gemeente":"Bergeijk","provincie":"Noord-Brabant","inwoners":18000,"themas":["woningbouw","duurzaamheid","natuur","landbouw","sociaal domein","jeugdzorg"],"lat":51.319,"lng":5.357},{"gemeente":"Veldhoven","provincie":"Noord-Brabant","inwoners":45000,"themas":["woningbouw","industrie","ASML","duurzaamheid","sociaal domein","jeugdzorg","wmo","HRM","organisatie"],"lat":51.419,"lng":5.404},{"gemeente":"Deurne","provincie":"Noord-Brabant","inwoners":32000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.458,"lng":5.779},{"gemeente":"Asten","provincie":"Noord-Brabant","inwoners":17000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.401,"lng":5.751},{"gemeente":"Someren","provincie":"Noord-Brabant","inwoners":19000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.389,"lng":5.71},{"gemeente":"Laarbeek","provincie":"Noord-Brabant","inwoners":22000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.509,"lng":5.697},{"gemeente":"Gemert-Bakel","provincie":"Noord-Brabant","inwoners":31000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.561,"lng":5.692},{"gemeente":"Boekel","provincie":"Noord-Brabant","inwoners":10000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg"],"lat":51.611,"lng":5.68},{"gemeente":"Landerd","provincie":"Noord-Brabant","inwoners":15000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.704,"lng":5.66},{"gemeente":"Maashorst","provincie":"Noord-Brabant","inwoners":46000,"themas":["woningbouw","fusie","duurzaamheid","organisatieontwikkeling","sociaal domein","jeugdzorg","HRM"],"lat":51.69,"lng":5.63},{"gemeente":"Horst aan de Maas","provincie":"Noord-Brabant","inwoners":42000,"themas":["woningbouw","glastuinbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.451,"lng":6.065},{"gemeente":"Peel en Maas","provincie":"Limburg","inwoners":44000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.363,"lng":6.02},{"gemeente":"Venray","provincie":"Limburg","inwoners":44000,"themas":["woningbouw","defensie","duurzaamheid","sociaal domein","jeugdzorg","zorg","participatie","organisatie"],"lat":51.536,"lng":5.974},{"gemeente":"Gennep","provincie":"Limburg","inwoners":17000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","grensgebied","organisatie"],"lat":51.698,"lng":5.972},{"gemeente":"Bergen L","provincie":"Limburg","inwoners":14000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg"],"lat":51.601,"lng":5.97},{"gemeente":"Mook en Middelaar","provincie":"Limburg","inwoners":8000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.748,"lng":5.877},{"gemeente":"Nijmegen","provincie":"Gelderland","inwoners":178000,"themas":["woningbouw","kennisstad","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie","HRM"],"lat":51.843,"lng":5.853},{"gemeente":"Arnhem","provincie":"Gelderland","inwoners":163000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie","HRM"],"lat":51.985,"lng":5.899},{"gemeente":"Apeldoorn","provincie":"Gelderland","inwoners":164000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.217,"lng":5.966},{"gemeente":"Ede","provincie":"Gelderland","inwoners":118000,"themas":["woningbouw","voedsel","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.047,"lng":5.664},{"gemeente":"Doetinchem","provincie":"Gelderland","inwoners":57000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.963,"lng":6.299},{"gemeente":"Zutphen","provincie":"Gelderland","inwoners":47000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.148,"lng":6.196},{"gemeente":"Harderwijk","provincie":"Gelderland","inwoners":48000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.348,"lng":5.624},{"gemeente":"Wageningen","provincie":"Gelderland","inwoners":40000,"themas":["kennisstad","woningbouw","duurzaamheid","voedsel","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.97,"lng":5.665},{"gemeente":"Zevenaar","provincie":"Gelderland","inwoners":44000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.92,"lng":6.074},{"gemeente":"Aalten","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.924,"lng":6.582},{"gemeente":"Winterswijk","provincie":"Gelderland","inwoners":29000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":51.972,"lng":6.719},{"gemeente":"Oost Gelre","provincie":"Gelderland","inwoners":30000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.946,"lng":6.52},{"gemeente":"Berkelland","provincie":"Gelderland","inwoners":44000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":52.097,"lng":6.508},{"gemeente":"Bronckhorst","provincie":"Gelderland","inwoners":37000,"themas":["woningbouw","duurzaamheid","landbouw","natuur","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.027,"lng":6.231},{"gemeente":"Montferland","provincie":"Gelderland","inwoners":36000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.899,"lng":6.159},{"gemeente":"Old IJsselstreek","provincie":"Gelderland","inwoners":39000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.875,"lng":6.43},{"gemeente":"Lochem","provincie":"Gelderland","inwoners":34000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.159,"lng":6.413},{"gemeente":"Brummen","provincie":"Gelderland","inwoners":21000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.091,"lng":6.159},{"gemeente":"Voorst","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","natuur","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":52.2,"lng":6.11},{"gemeente":"Heerde","provincie":"Gelderland","inwoners":18000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":52.391,"lng":5.922},{"gemeente":"Epe","provincie":"Gelderland","inwoners":33000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.351,"lng":5.984},{"gemeente":"Elburg","provincie":"Gelderland","inwoners":23000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.451,"lng":5.836},{"gemeente":"Nunspeet","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.386,"lng":5.79},{"gemeente":"Putten","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.268,"lng":5.597},{"gemeente":"Ermelo","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","natuur","zorg","sociaal domein","jeugdzorg","organisatie"],"lat":52.304,"lng":5.621},{"gemeente":"Barneveld","provincie":"Gelderland","inwoners":58000,"themas":["woningbouw","agrifood","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.139,"lng":5.586},{"gemeente":"Scherpenzeel","provincie":"Gelderland","inwoners":10000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.09,"lng":5.49},{"gemeente":"Renkum","provincie":"Gelderland","inwoners":31000,"themas":["woningbouw","duurzaamheid","erfgoed","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.961,"lng":5.736},{"gemeente":"Rheden","provincie":"Gelderland","inwoners":43000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.017,"lng":6.029},{"gemeente":"Rozendaal","provincie":"Gelderland","inwoners":1800,"themas":["woningbouw","natuur","duurzaamheid","sociaal domein"],"lat":52.001,"lng":5.993},{"gemeente":"Overbetuwe","provincie":"Gelderland","inwoners":47000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.891,"lng":5.791},{"gemeente":"Lingewaard","provincie":"Gelderland","inwoners":46000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.877,"lng":5.962},{"gemeente":"West Betuwe","provincie":"Gelderland","inwoners":53000,"themas":["woningbouw","fruitteelt","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.869,"lng":5.139},{"gemeente":"Neder-Betuwe","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.872,"lng":5.462},{"gemeente":"Buren","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","fruitteelt","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.897,"lng":5.349},{"gemeente":"Maasdriel","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.779,"lng":5.16},{"gemeente":"Zaltbommel","provincie":"Gelderland","inwoners":28000,"themas":["woningbouw","duurzaamheid","logistiek","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.822,"lng":5.244},{"gemeente":"Tiel","provincie":"Gelderland","inwoners":42000,"themas":["woningbouw","duurzaamheid","fruitteelt","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.886,"lng":5.431},{"gemeente":"Culemborg","provincie":"Gelderland","inwoners":28000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.946,"lng":5.229},{"gemeente":"Geldermalsen","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.878,"lng":5.286},{"gemeente":"Enschede","provincie":"Overijssel","inwoners":159000,"themas":["woningbouw","kennisstad","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":52.221,"lng":6.896},{"gemeente":"Zwolle","provincie":"Overijssel","inwoners":129000,"themas":["woningbouw","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","bereikbaarheid","organisatie"],"lat":52.517,"lng":6.083},{"gemeente":"Deventer","provincie":"Overijssel","inwoners":100000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.255,"lng":6.16},{"gemeente":"Hengelo","provincie":"Overijssel","inwoners":80000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","HRM","organisatie"],"lat":52.266,"lng":6.793},{"gemeente":"Almelo","provincie":"Overijssel","inwoners":72000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.355,"lng":6.665},{"gemeente":"Oldenzaal","provincie":"Overijssel","inwoners":31000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.312,"lng":6.93},{"gemeente":"Haaksbergen","provincie":"Overijssel","inwoners":24000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","grensgebied","organisatie"],"lat":52.154,"lng":6.742},{"gemeente":"Borne","provincie":"Overijssel","inwoners":23000,"themas":["woningbouw","duurzaamheid","industrie","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.298,"lng":6.754},{"gemeente":"Losser","provincie":"Overijssel","inwoners":22000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":52.261,"lng":7.004},{"gemeente":"Dinkelland","provincie":"Overijssel","inwoners":26000,"themas":["woningbouw","landbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.376,"lng":6.991},{"gemeente":"Tubbergen","provincie":"Overijssel","inwoners":21000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.407,"lng":6.778},{"gemeente":"Hellendoorn","provincie":"Overijssel","inwoners":36000,"themas":["woningbouw","duurzaamheid","industrie","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.393,"lng":6.452},{"gemeente":"Rijssen-Holten","provincie":"Overijssel","inwoners":38000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.296,"lng":6.519},{"gemeente":"Wierden","provincie":"Overijssel","inwoners":23000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.358,"lng":6.595},{"gemeente":"Twenterand","provincie":"Overijssel","inwoners":33000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.46,"lng":6.548},{"gemeente":"Oldambt","provincie":"Groningen","inwoners":38000,"themas":["woningbouw","duurzaamheid","krimp","sociaal domein","armoede","jeugdzorg","participatie","organisatie"],"lat":53.179,"lng":7.052},{"gemeente":"Kampen","provincie":"Overijssel","inwoners":53000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.555,"lng":5.913},{"gemeente":"Zwartewaterland","provincie":"Overijssel","inwoners":22000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.638,"lng":6.069},{"gemeente":"Staphorst","provincie":"Overijssel","inwoners":17000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.636,"lng":6.209},{"gemeente":"Steenwijkerland","provincie":"Overijssel","inwoners":44000,"themas":["woningbouw","toerisme","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.786,"lng":6.117},{"gemeente":"Meppel","provincie":"Drenthe","inwoners":33000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.696,"lng":6.194},{"gemeente":"Westerveld","provincie":"Drenthe","inwoners":19000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.829,"lng":6.311},{"gemeente":"Hardenberg","provincie":"Overijssel","inwoners":60000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.578,"lng":6.617},{"gemeente":"Ommen","provincie":"Overijssel","inwoners":18000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.518,"lng":6.421},{"gemeente":"Dalfsen","provincie":"Overijssel","inwoners":28000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.507,"lng":6.26},{"gemeente":"Raalte","provincie":"Overijssel","inwoners":37000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.388,"lng":6.278},{"gemeente":"Olst-Wijhe","provincie":"Overijssel","inwoners":18000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":52.338,"lng":6.114},{"gemeente":"Hof van Twente","provincie":"Overijssel","inwoners":35000,"themas":["woningbouw","industrie","natuur","duurzaamheid","sociaal domein","jeugdzorg","participatie","toerisme","organisatie"],"lat":52.222,"lng":6.616},{"gemeente":"Groningen","provincie":"Groningen","inwoners":234000,"themas":["woningbouw","kennisstad","aardbevingen","duurzaamheid","energie","sociaal domein","jeugdzorg","wmo","participatie","krimp","organisatie"],"lat":53.219,"lng":6.567},{"gemeente":"Emmen","provincie":"Drenthe","inwoners":108000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","krimp","veiligheid","organisatie"],"lat":52.787,"lng":6.899},{"gemeente":"Assen","provincie":"Drenthe","inwoners":68000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie","HRM"],"lat":52.993,"lng":6.562},{"gemeente":"Hoogeveen","provincie":"Drenthe","inwoners":55000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":52.729,"lng":6.479},{"gemeente":"Midden-Groningen","provincie":"Groningen","inwoners":61000,"themas":["woningbouw","aardbevingen","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","krimp","organisatie"],"lat":53.112,"lng":6.797},{"gemeente":"Westerkwartier","provincie":"Groningen","inwoners":64000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","krimp","participatie","organisatie"],"lat":53.165,"lng":6.34},{"gemeente":"Het Hogeland","provincie":"Groningen","inwoners":49000,"themas":["woningbouw","aardbevingen","duurzaamheid","landbouw","energie","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":53.379,"lng":6.568},{"gemeente":"Eemsdelta","provincie":"Groningen","inwoners":46000,"themas":["woningbouw","aardbevingen","haven","duurzaamheid","waterstof","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":53.343,"lng":6.906},{"gemeente":"Veendam","provincie":"Groningen","inwoners":28000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","krimp","organisatie"],"lat":53.107,"lng":6.876},{"gemeente":"Pekela","provincie":"Groningen","inwoners":12000,"themas":["woningbouw","krimp","duurzaamheid","sociaal domein","jeugdzorg","armoede","organisatie"],"lat":53.097,"lng":6.993},{"gemeente":"Stadskanaal","provincie":"Groningen","inwoners":32000,"themas":["woningbouw","krimp","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","organisatie"],"lat":52.987,"lng":7.0},{"gemeente":"Borger-Odoorn","provincie":"Drenthe","inwoners":25000,"themas":["woningbouw","landbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":52.912,"lng":6.793},{"gemeente":"Coevorden","provincie":"Drenthe","inwoners":36000,"themas":["woningbouw","grensgebied","logistiek","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.661,"lng":6.747},{"gemeente":"De Wolden","provincie":"Drenthe","inwoners":24000,"themas":["woningbouw","landbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.673,"lng":6.367},{"gemeente":"Tynaarlo","provincie":"Drenthe","inwoners":34000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":53.066,"lng":6.629},{"gemeente":"Noordenveld","provincie":"Drenthe","inwoners":31000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":53.117,"lng":6.449},{"gemeente":"Aa en Hunze","provincie":"Drenthe","inwoners":25000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":53.003,"lng":6.741},{"gemeente":"Leeuwarden","provincie":"Friesland","inwoners":125000,"themas":["woningbouw","cultuur","duurzaamheid","Fries","sociaal domein","jeugdzorg","wmo","participatie","krimp","veiligheid","organisatie"],"lat":53.201,"lng":5.799},{"gemeente":"Smallingerland","provincie":"Friesland","inwoners":56000,"themas":["woningbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","wmo","participatie","krimp","organisatie"],"lat":53.113,"lng":6.114},{"gemeente":"Heerenveen","provincie":"Friesland","inwoners":50000,"themas":["woningbouw","sport","duurzaamheid","Fries","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.961,"lng":5.923},{"gemeente":"Weststellingwerf","provincie":"Friesland","inwoners":26000,"themas":["woningbouw","natuur","duurzaamheid","krimp","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.877,"lng":6.003},{"gemeente":"Opsterland","provincie":"Friesland","inwoners":30000,"themas":["woningbouw","natuur","duurzaamheid","krimp","sociaal domein","jeugdzorg","organisatie"],"lat":53.034,"lng":6.052},{"gemeente":"Ooststellingwerf","provincie":"Friesland","inwoners":26000,"themas":["woningbouw","natuur","duurzaamheid","krimp","sociaal domein","jeugdzorg","organisatie"],"lat":52.987,"lng":6.257},{"gemeente":"De Fryske Marren","provincie":"Friesland","inwoners":51000,"themas":["woningbouw","toerisme","natuur","duurzaamheid","Fries","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":52.837,"lng":5.752},{"gemeente":"Noardeast-Fryslân","provincie":"Friesland","inwoners":45000,"themas":["woningbouw","krimp","duurzaamheid","landbouw","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.332,"lng":5.972},{"gemeente":"Dantumadiel","provincie":"Friesland","inwoners":19000,"themas":["woningbouw","krimp","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.307,"lng":5.979},{"gemeente":"Tytsjerksteradiel","provincie":"Friesland","inwoners":32000,"themas":["woningbouw","duurzaamheid","natuur","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.212,"lng":5.99},{"gemeente":"Achtkarspelen","provincie":"Friesland","inwoners":28000,"themas":["woningbouw","krimp","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.213,"lng":6.104},{"gemeente":"Harlingen","provincie":"Friesland","inwoners":16000,"themas":["haven","woningbouw","krimp","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":53.174,"lng":5.42},{"gemeente":"Waadhoeke","provincie":"Friesland","inwoners":46000,"themas":["woningbouw","landbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.181,"lng":5.621},{"gemeente":"Franekeradeel","provincie":"Friesland","inwoners":20000,"themas":["woningbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.187,"lng":5.543},{"gemeente":"Maastricht","provincie":"Limburg","inwoners":121000,"themas":["woningbouw","kennisstad","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","toerisme","organisatie"],"lat":50.851,"lng":5.69},{"gemeente":"Heerlen","provincie":"Limburg","inwoners":88000,"themas":["woningbouw","duurzaamheid","krimp","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":50.89,"lng":5.979},{"gemeente":"Sittard-Geleen","provincie":"Limburg","inwoners":93000,"themas":["woningbouw","chemie","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","armoede","participatie","krimp","veiligheid","organisatie"],"lat":51.0,"lng":5.871},{"gemeente":"Venlo","provincie":"Limburg","inwoners":101000,"themas":["woningbouw","logistiek","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.37,"lng":6.172},{"gemeente":"Roermond","provincie":"Limburg","inwoners":58000,"themas":["woningbouw","duurzaamheid","grensgebied","outlet","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.193,"lng":5.993},{"gemeente":"Weert","provincie":"Limburg","inwoners":50000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.254,"lng":5.712},{"gemeente":"Kerkrade","provincie":"Limburg","inwoners":45000,"themas":["woningbouw","duurzaamheid","krimp","grensgebied","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":50.87,"lng":6.067},{"gemeente":"Brunssum","provincie":"Limburg","inwoners":28000,"themas":["woningbouw","duurzaamheid","krimp","defensie","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":50.948,"lng":5.985},{"gemeente":"Landgraaf","provincie":"Limburg","inwoners":37000,"themas":["woningbouw","duurzaamheid","krimp","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":50.905,"lng":6.025},{"gemeente":"Beekdaelen","provincie":"Limburg","inwoners":36000,"themas":["woningbouw","fusie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie","HRM"],"lat":50.918,"lng":5.927},{"gemeente":"Voerendaal","provincie":"Limburg","inwoners":12000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":50.878,"lng":5.935},{"gemeente":"Nuth","provincie":"Limburg","inwoners":15000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":50.912,"lng":5.888},{"gemeente":"Stein","provincie":"Limburg","inwoners":25000,"themas":["woningbouw","duurzaamheid","krimp","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":50.966,"lng":5.763},{"gemeente":"Maasgouw","provincie":"Limburg","inwoners":24000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.17,"lng":5.882},{"gemeente":"Roerdalen","provincie":"Limburg","inwoners":21000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.138,"lng":6.055},{"gemeente":"Leudal","provincie":"Limburg","inwoners":36000,"themas":["woningbouw","duurzaamheid","natuur","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.289,"lng":5.89},{"gemeente":"Nederhussum","provincie":"Limburg","inwoners":8000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":51.25,"lng":5.85},{"gemeente":"Beesel","provincie":"Limburg","inwoners":13000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","organisatie"],"lat":51.267,"lng":6.043},{"gemeente":"Gulpen-Wittem","provincie":"Limburg","inwoners":14000,"themas":["woningbouw","toerisme","natuur","duurzaamheid","grensgebied","sociaal domein","jeugdzorg"],"lat":50.812,"lng":5.893},{"gemeente":"Eijsden-Margraten","provincie":"Limburg","inwoners":25000,"themas":["woningbouw","grensgebied","toerisme","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":50.779,"lng":5.729},{"gemeente":"Meerssen","provincie":"Limburg","inwoners":19000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","organisatie"],"lat":50.877,"lng":5.754},{"gemeente":"Simpelveld","provincie":"Limburg","inwoners":11000,"themas":["woningbouw","krimp","duurzaamheid","grensgebied","sociaal domein","jeugdzorg"],"lat":50.836,"lng":5.982},{"gemeente":"Vaals","provincie":"Limburg","inwoners":10000,"themas":["toerisme","grensgebied","woningbouw","duurzaamheid","sociaal domein","jeugdzorg"],"lat":50.771,"lng":6.02},{"gemeente":"Valkenburg aan de Geul","provincie":"Limburg","inwoners":17000,"themas":["toerisme","woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":50.864,"lng":5.831},{"gemeente":"Middelburg","provincie":"Zeeland","inwoners":48000,"themas":["woningbouw","toerisme","duurzaamheid","delta","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.499,"lng":3.614},{"gemeente":"Goes","provincie":"Zeeland","inwoners":38000,"themas":["woningbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.506,"lng":3.889},{"gemeente":"Terneuzen","provincie":"Zeeland","inwoners":55000,"themas":["haven","industrie","woningbouw","duurzaamheid","grensgebied","waterstof","sociaal domein","jeugdzorg","wmo","participatie","krimp","organisatie"],"lat":51.336,"lng":3.831},{"gemeente":"Vlissingen","provincie":"Zeeland","inwoners":44000,"themas":["haven","woningbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.455,"lng":3.572},{"gemeente":"Hulst","provincie":"Zeeland","inwoners":27000,"themas":["woningbouw","grensgebied","duurzaamheid","natuur","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":51.279,"lng":4.044},{"gemeente":"Sluis","provincie":"Zeeland","inwoners":23000,"themas":["toerisme","woningbouw","grensgebied","duurzaamheid","krimp","sociaal domein","jeugdzorg","organisatie"],"lat":51.307,"lng":3.388},{"gemeente":"Noord-Beveland","provincie":"Zeeland","inwoners":7000,"themas":["toerisme","duurzaamheid","delta","natuur","sociaal domein","woningbouw"],"lat":51.581,"lng":3.765},{"gemeente":"Schouwen-Duiveland","provincie":"Zeeland","inwoners":34000,"themas":["toerisme","woningbouw","duurzaamheid","delta","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":51.663,"lng":3.883},{"gemeente":"Tholen","provincie":"Zeeland","inwoners":26000,"themas":["woningbouw","landbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","organisatie"],"lat":51.53,"lng":4.214},{"gemeente":"Kapelle","provincie":"Zeeland","inwoners":13000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.491,"lng":3.957},{"gemeente":"Reimerswaal","provincie":"Zeeland","inwoners":22000,"themas":["woningbouw","landbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","organisatie"],"lat":51.436,"lng":4.012},{"gemeente":"Borsele","provincie":"Zeeland","inwoners":23000,"themas":["energie","kernenergie","woningbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","organisatie"],"lat":51.437,"lng":3.748},{"gemeente":"Veere","provincie":"Zeeland","inwoners":22000,"themas":["toerisme","duurzaamheid","delta","natuur","woningbouw","sociaal domein","jeugdzorg"],"lat":51.554,"lng":3.667},{"gemeente":"Almere","provincie":"Flevoland","inwoners":216000,"themas":["woningbouw","groeistad","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","diversiteit","HRM","organisatie"],"lat":52.374,"lng":5.219},{"gemeente":"Lelystad","provincie":"Flevoland","inwoners":78000,"themas":["woningbouw","luchthaven","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":52.518,"lng":5.472},{"gemeente":"Dronten","provincie":"Flevoland","inwoners":42000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.522,"lng":5.716},{"gemeente":"Noordoostpolder","provincie":"Flevoland","inwoners":47000,"themas":["woningbouw","landbouw","duurzaamheid","energie","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.734,"lng":5.754},{"gemeente":"Urk","provincie":"Flevoland","inwoners":21000,"themas":["woningbouw","visserij","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.663,"lng":5.602},{"gemeente":"Zeewolde","provincie":"Flevoland","inwoners":23000,"themas":["woningbouw","natuur","duurzaamheid","datacenter","energie","sociaal domein","jeugdzorg","organisatie"],"lat":52.327,"lng":5.543},{"gemeente":"Waalre","provincie":"Noord-Brabant","inwoners":17000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.389,"lng":5.464},{"gemeente":"Best","provincie":"Noord-Brabant","inwoners":30000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.511,"lng":5.397},{"gemeente":"Oirschot","provincie":"Noord-Brabant","inwoners":18000,"themas":["woningbouw","landbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.504,"lng":5.3},{"gemeente":"Druten","provincie":"Gelderland","inwoners":18000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.879,"lng":5.604},{"gemeente":"Duiven","provincie":"Gelderland","inwoners":26000,"themas":["woningbouw","duurzaamheid","logistiek","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.946,"lng":6.025},{"gemeente":"Westervoort","provincie":"Gelderland","inwoners":15000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.96,"lng":5.973},{"gemeente":"Lingewaal","provincie":"Gelderland","inwoners":12000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.852,"lng":5.072},{"gemeente":"Doesburg","provincie":"Gelderland","inwoners":11000,"themas":["woningbouw","duurzaamheid","erfgoed","sociaal domein","jeugdzorg","organisatie"],"lat":52.015,"lng":6.138},{"gemeente":"Heumen","provincie":"Gelderland","inwoners":16000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":51.795,"lng":5.836},{"gemeente":"Wijchen","provincie":"Gelderland","inwoners":42000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.806,"lng":5.726},{"gemeente":"Beuningen","provincie":"Gelderland","inwoners":26000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.862,"lng":5.764},{"gemeente":"Groesbeek","provincie":"Gelderland","inwoners":19000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.777,"lng":5.944},{"gemeente":"Millingen aan de Rijn","provincie":"Gelderland","inwoners":6000,"themas":["woningbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg"],"lat":51.864,"lng":6.045},{"gemeente":"Ubbergen","provincie":"Gelderland","inwoners":10000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.837,"lng":5.937}];

const PROV_KLEUREN = {
  "Noord-Holland":"#1565C0","Zuid-Holland":"#2E7D32","Utrecht":"#6A1B9A",
  "Noord-Brabant":"#E65100","Gelderland":"#00695C","Overijssel":"#4527A0",
  "Groningen":"#AD1457","Drenthe":"#558B2F","Friesland":"#0277BD",
  "Limburg":"#6D4C41","Zeeland":"#00838F","Flevoland":"#F57F17"
};

const CTMH_PROFIELEN = [
  { id:"sociaal", label:"Sociaal Domein", kleur:"#2D6A9F", icon:"👥",
    keywords:["jeugd","jeugdzorg","wmo","zorg","participatie","armoede","schulden",
      "bijstand","re-integratie","inclusie","welzijn","mantelzorg","daklozen",
      "beschermd wonen","inburgering","statushouders","schuldhulpverlening",
      "vroeg signalering","preventie","vrijwilligers","sociaal domein","sociaal"],
    rollen:["Manager Sociaal Domein","Beleidsadviseur Jeugd","Projectleider WMO",
      "Kwartiermaker Inclusie","Adviseur Participatiewet","Manager Werk & Inkomen"]
  },
  { id:"ruimtelijk", label:"Ruimtelijk Domein", kleur:"#1A7A4A", icon:"🏗️",
    keywords:["wonen","woningbouw","omgevingswet","bestemmingsplan","bouwen","vergunning",
      "duurzaamheid","klimaat","energietransitie","nieuwbouw","omgevingsvisie",
      "bereikbaarheid","mobiliteit","infrastructuur","stikstof","natuur","groen",
      "milieu","water","openbare ruimte","biodiversiteit","aardgasvrij","klimaatadaptatie",
      "wateroverlast","energie","landbouw","glastuinbouw","aardbevingen"],
    rollen:["Omgevingsjurist","Projectleider Woningbouw","Adviseur Duurzaamheid",
      "Manager Ruimtelijk Domein","Programmamanager Energietransitie","Beleidsadviseur Klimaat"]
  },
  { id:"bestuur", label:"Bestuurszaken", kleur:"#7B3FA0", icon:"🏛️",
    keywords:["bestuur","gemeentesecretaris","griffie","rekenkamer","raad","college",
      "organisatieontwikkeling","transformatie","samenwerking","regionale samenwerking",
      "fusie","bestuurssecretaris","bestuursadviseur","communicatie","burgerparticipatie",
      "dienstverlening","digitalisering","integriteit","juridisch","bezwaar","organisatie"],
    rollen:["Gemeentesecretaris a.i.","Bestuurssecretaris","Organisatieadviseur",
      "Programmasecretaris","Griffier a.i.","Adviseur Bestuurlijke Samenwerking"]
  },
  { id:"hrm", label:"HRM & Organisatie", kleur:"#C0622F", icon:"🧑‍💼",
    keywords:["personeel","hrm","hr","arbeidsmarkt","werving","selectie","opleiding",
      "ontwikkeling","diversiteit","verzuim","formatie","capaciteit","instroom",
      "arbeidsvoorwaarden","cao","cultuurverandering","leiderschap","talentontwikkeling",
      "vakmanschap","HRM"],
    rollen:["HR-Adviseur","P&O Adviseur","Manager HRM","Adviseur Arbeidsmarkt",
      "Programmamanager Organisatieontwikkeling","Recruiter Publiek Domein"]
  },
  { id:"financien", label:"Financien & Control", kleur:"#B5860D", icon:"💰",
    keywords:["financiën","begroting","bezuiniging","financieel","controller","accountant",
      "audit","rechtmatigheid","subsidie","grondexploitatie","treasury",
      "financieel beleid","meerjarenbegroting","ombuigingen","taakstelling","grondbeleid"],
    rollen:["Controller","Financieel Adviseur","Hoofd Financiën","Concerncontroller",
      "Programmamanager Financiën","Adviseur Grondbeleid"]
  },
  { id:"veiligheid", label:"Veiligheid & Handhaving", kleur:"#8B1A1A", icon:"🛡️",
    keywords:["veiligheid","handhaving","boa","politie","brandweer","crisisbeheersing",
      "ondermijning","radicalisering","openbare orde","evenementen","toezicht",
      "integraal veiligheidsbeleid","buurtpreventie","drugsoverlast"],
    rollen:["Adviseur OOV","Programmamanager Veiligheid","Coördinator Handhaving",
      "Beleidsadviseur Veiligheid"]
  }
];

// ── CTMH Mensen / Adviseurs ──────────────────────────────────────────────────
const CTMH_MENSEN = [
  {
    id: "wim",
    naam: "Wim van Twuijver",
    rol: "Directeur & Gemeentesecretaris a.i.",
    initialen: "WvT",
    kleur: "#2D6A9F",
    avatar: "🏛️",
    expertise: ["bestuur","gemeentesecretaris","gemeentedirecteur","organisatieontwikkeling",
      "regionale samenwerking","fusie","HRM","financiën","bestuurszaken"],
    profielen: ["bestuur","hrm","financien"],
    bio: "Directeur CTMH. Voormalig gemeentesecretaris/algemeen directeur bij o.a. Hollands Kroon en Drechterland. Ruime ervaring in complexe bestuurlijke opgaven, gemeentelijke samenwerking en organisatieontwikkeling.",
    regio: "Noord-Holland",
    beschikbaar: true
  },
  {
    id: "jeroen",
    naam: "Jeroen van Duijnhoven",
    rol: "Senior HR-adviseur & Organisatieadviseur",
    initialen: "JvD",
    kleur: "#C0622F",
    avatar: "🧑‍💼",
    expertise: ["hrm","hr","organisatieontwikkeling","verandermanagement","personeel",
      "formatie","cultuurverandering","arbeidsmarkt","werving","strategische advisering"],
    profielen: ["hrm","bestuur"],
    bio: "Geschoold bedrijfskundige met zeer ruime ervaring in strategische HR-advisering, organisatieanalyse en implementatie van verandertrajecten bij (gemeentelijke) overheidsorganisaties. Opdrachtgevers typeren hem als evenwichtig en resultaatgericht.",
    regio: "Noord-Holland / Landelijk",
    beschikbaar: true
  },
  {
    id: "anne",
    naam: "Anne Makenbach",
    rol: "Organisatieadviseur & Bestuurssecretaris",
    initialen: "AM",
    kleur: "#7B3FA0",
    avatar: "🏛️",
    expertise: ["organisatieontwikkeling","bestuur","bestuurssecretaris","procesbegeleiding",
      "organisatieadvies","regisseur","projectleider","secretaris directie","samenwerking"],
    profielen: ["bestuur","hrm"],
    bio: "Jarenlange ervaring in adviseren en ondersteunen van organisaties bij organisatieontwikkeling. Zorgt voor rust en overzicht, uitstekend klankbord, kei in omdenken en dwarsdenken. Inzetbaar als regisseur/adviseur, projectleider of directiesecretaris.",
    regio: "Landelijk",
    beschikbaar: true
  },
  {
    id: "daan",
    naam: "Daan van Gulik",
    rol: "Adviseur & Projectleider Ruimtelijk / Bestuur",
    initialen: "DvG",
    kleur: "#1A7A4A",
    avatar: "🏗️",
    expertise: ["duurzaamheid","participatie","omgevingsbeleid","ruimtelijk domein",
      "bestuurlijk adviseur","projectleider","landelijk gebied","klimaat","natuur",
      "Programma Landelijk Gebied","bestuurlijke dossiers","sociologie"],
    profielen: ["ruimtelijk","bestuur","sociaal"],
    bio: "Academische professional die goed beweegt in complexe omgevingen en gevoelige bestuurlijke dossiers. Specialisme in duurzaamheidsvraagstukken, participatie en Programma Landelijk Gebied. Als socioloog analytisch sterk, bestuurlijk sensitief.",
    regio: "Landelijk / Friesland",
    beschikbaar: true
  },
  {
    id: "femke",
    naam: "Femke",
    rol: "Interimmanager / Adviseur Publiek Domein",
    initialen: "F",
    kleur: "#8B1A1A",
    avatar: "🔗",
    expertise: ["interimmanagement","gemeenschappelijke regelingen","waterschappen",
      "bestuurlijk","ambtelijk","organisatie","verandering","verbinding","onderzoek",
      "advies","procesmanagement"],
    profielen: ["bestuur","sociaal","hrm"],
    bio: "Jaren werkzaam binnen het publieke domein. Ervaren in adviseren bij gemeenten, gemeenschappelijke regelingen en waterschappen. Verbinder en bruggenbouwer, resultaatgericht met frisse open blik. Inzetbaar als interimmanager, projectleider of onderzoeker.",
    regio: "Noord-Brabant / Landelijk",
    beschikbaar: true
  },
  {
    id: "marleen",
    naam: "Marleen Specht-Althuizen",
    rol: "Programmamanager / Projectleider Ruimtelijk Domein",
    initialen: "MS",
    kleur: "#1A7A4A",
    avatar: "🏗️",
    expertise: ["ruimtelijk domein","programmamanager","projectleider","woningbouw",
      "omgevingsbeleid","gebiedsontwikkeling","ruimtelijke ordening","infrastructuur",
      "duurzaamheid","energietransitie","leiderschap","strategisch inzicht"],
    profielen: ["ruimtelijk"],
    bio: "Bewezen staat van dienst als programmamanager en projectleider in het ruimtelijk domein. Combineert strategisch inzicht met hands-on mentaliteit. Inspireert teams en realiseert doelen in complexe ruimtelijke projecten.",
    regio: "Landelijk",
    beschikbaar: true
  },
  {
    id: "iman",
    naam: "Iman Biesheuvel",
    rol: "Projectleider Economie & Gebiedsontwikkeling",
    initialen: "IB",
    kleur: "#B5860D",
    avatar: "💰",
    expertise: ["economie","gebiedsontwikkeling","bedrijventerreinen","binnenstedelijk",
      "projectleider","financieel","grondbeleid","ruimtelijk domein","stedelijke economie"],
    profielen: ["ruimtelijk","financien"],
    bio: "Projectleider economie bij o.a. Gemeente Amsterdam Stadsdeel West. Specialisme in vitaliteit van bedrijventerreinen, tegengaan economische monocultuur en binnenstedelijke gebiedsontwikkeling.",
    regio: "Noord-Holland / Randstad",
    beschikbaar: false
  },
  {
    id: "anton",
    naam: "Anton",
    rol: "Adviseur / Casemanager Sociaal Domein",
    initialen: "A",
    kleur: "#2D6A9F",
    avatar: "👥",
    expertise: ["sociaal domein","casemanager","adviseur","samenwerking","jeugdzorg",
      "wmo","participatie","sociale vraagstukken","verbinding","resultaatgericht"],
    profielen: ["sociaal"],
    bio: "Combineert vakkennis met sterke focus op samenwerking. Daadkrachtige professional die denkt in mogelijkheden en zich richt op gezamenlijk succes. Inzetbaar als casemanager of adviseur in het sociaal domein.",
    regio: "Landelijk",
    beschikbaar: true
  },
  {
    id: "noa",
    naam: "Noa Huibers",
    rol: "Junior Adviseur Sociaal Domein",
    initialen: "NH",
    kleur: "#2D6A9F",
    avatar: "👥",
    expertise: ["sociaal domein","beleid","participatie","jeugd","welzijn",
      "sociale vraagstukken","onderzoek","advies","publieke sector"],
    profielen: ["sociaal"],
    bio: "Recent afgestudeerde professional klaar om universitaire kennis in te zetten binnen het sociaal domein bij publieke organisaties. Frisse blik met stevige wetenschappelijke basis.",
    regio: "Landelijk",
    beschikbaar: true
  },
  {
    id: "suzanne",
    naam: "Suzanne Barnhoorn-Bakker",
    rol: "Adviseur Bestuur & Organisatie",
    initialen: "SB",
    kleur: "#7B3FA0",
    avatar: "🏛️",
    expertise: ["bestuur","bestuurssecretaris","organisatie","advies","kwaliteit",
      "ondersteuning","ontwikkeling","interim","bestuurlijk"],
    profielen: ["bestuur","hrm"],
    bio: "Adviseur bestuur en organisatie met ervaring in bestuurlijke ondersteuning en organisatieontwikkeling. Helpt opdrachtgevers graag verder met praktisch en kwaliteitsgericht advies.",
    regio: "Landelijk",
    beschikbaar: true
  },
  {
    id: "esmee",
    naam: "Esmee",
    rol: "Juridisch Adviseur",
    initialen: "E",
    kleur: "#8B1A1A",
    avatar: "⚖️",
    expertise: ["juridisch","rechten","handhaving","bezwaar","juridische advisering",
      "maatschappelijke vraagstukken","veiligheid","omgevingsrecht","bestuur"],
    profielen: ["veiligheid","bestuur"],
    bio: "Gedreven professional met stevige juridische basis (HBO Rechten). Scherp analytisch inzicht gecombineerd met sterk verantwoordelijkheidsgevoel. Verbindt juridische en maatschappelijke vraagstukken op natuurlijke wijze.",
    regio: "Landelijk",
    beschikbaar: true
  }
];

// ── Match persoon aan gemeente ────────────────────────────────────────────────
function berekenPersoonMatch(persoon, gemeenteAnalyses) {
  let totaalScore = 0;
  let maxScore = 0;
  const matchendeDomeinen = [];
  for (const profId of persoon.profielen) {
    const analyse = gemeenteAnalyses.find(a => a.id === profId);
    if (analyse) {
      totaalScore += analyse.pct;
      maxScore += 96;
      if (analyse.pct >= 25) matchendeDomeinen.push({ label: analyse.label, pct: analyse.pct, kleur: analyse.kleur, icon: analyse.icon });
    }
  }
  const pct = maxScore > 0 ? Math.min(Math.round((totaalScore / maxScore) * 100), 96) : 0;
  return { pct, matchendeDomeinen };
}

// ── Match berekening ─────────────────────────────────────────────────────────
function berekenMatch(g) {
  return CTMH_PROFIELEN.map(profiel => {
    let hits = 0;
    const gevonden = [];
    for (const kw of profiel.keywords) {
      if (g.themas.some(t => t.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(t.toLowerCase()))) {
        hits++;
        gevonden.push(kw);
      }
    }
    const pct = Math.min(Math.round((hits / profiel.keywords.length) * 100 * 2.5), 96);
    return { ...profiel, pct, gevondenKeywords: gevonden };
  }).sort((a, b) => b.pct - a.pct);
}

// ── Kaart: lat/lng naar SVG x/y ─────────────────────────────────────────────
// NL bounding box: lat 50.75-53.55, lng 3.35-7.23
const MAP_W = 500, MAP_H = 580;
function latLngToXY(lat, lng) {
  const minLat = 50.72, maxLat = 53.60;
  const minLng = 3.30, maxLng = 7.30;
  const x = ((lng - minLng) / (maxLng - minLng)) * MAP_W;
  const y = MAP_H - ((lat - minLat) / (maxLat - minLat)) * MAP_H;
  return [Math.round(x), Math.round(y)];
}

// ── AI helpers ───────────────────────────────────────────────────────────────
async function aiCall(prompt) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000,
      messages: [{ role: "user", content: prompt }] })
  });
  const data = await resp.json();
  return data.content ? data.content.map(b => b.text || "").join("") : "Niet beschikbaar.";
}

async function fetchAIAnalyse(g, profielLabel) {
  return aiCall(
    "Je bent een expert in gemeentelijk beleid. Analyseer de coalitieakkoord-themas van gemeente " +
    g.gemeente + " (" + g.provincie + ", " + Math.round(g.inwoners/1000) + "k inwoners) op kansen voor CTMH, " +
    "een interim- en adviesbureau gespecialiseerd in " + profielLabel + " bij gemeenten.\n\n" +
    "Themas: " + g.themas.join(", ") + "\n\n" +
    "Geef een analyse (max 130 woorden) met:\n" +
    "1. Top 2-3 concrete kansen voor CTMH in " + profielLabel + "\n" +
    "2. Aanbevolen timing (wanneer in de raadsperiode)\n" +
    "3. Wervingsadvies: welk profiel zoeken\n\n" +
    "Antwoord in het Nederlands, bondig en praktisch."
  );
}

async function fetchNieuweKansen(gemeenteData) {
  const topGemeenten = gemeenteData
    .sort((a,b) => b.analyses[0].pct - a.analyses[0].pct)
    .slice(0, 10)
    .map(g => g.gemeente + " (" + g.provincie + ", " + g.analyses[0].pct + "% match op " + g.analyses[0].label + ")")
    .join("\n");
  return aiCall(
    "Je bent strategisch adviseur voor CTMH, een interim- en adviesbureau voor gemeenten.\n\n" +
    "Het is week " + getWeekNumber() + " van 2026. Dit zijn de top gemeenten op basis van kansen in coalitieakkoorden 2026-2030:\n" +
    topGemeenten + "\n\n" +
    "Geef een wekelijkse kansen-update (max 200 woorden) met:\n" +
    "1. 3 concrete nieuwe kansen die CTMH deze week moet oppakken\n" +
    "2. 1 gemeente die urgent aandacht verdient (waarom?)\n" +
    "3. Trend die je ziet in de akkoorden\n" +
    "4. Concrete actie voor CTMH deze week\n\n" +
    "Maak het specifiek, actieontwerpend en praktisch. Gebruik emoji. Schrijf in het Nederlands."
  );
}

async function fetchStrategieAnalyse(provFilter, gemeenteData) {
  const lijst = provFilter ? gemeenteData.filter(g => g.provincie === provFilter) : gemeenteData;
  const sample = lijst.slice(0,15).map(g => g.gemeente + ": " + g.themas.slice(0,5).join(", ")).join("\n");
  const scope = provFilter ? "in " + provFilter : "in heel Nederland";
  return aiCall(
    "Je bent strategisch adviseur voor CTMH, een interim- en adviesbureau voor gemeenten " +
    "(expertise: HRM, Sociaal Domein, Ruimtelijk Domein, Bestuurszaken, Financien, Veiligheid).\n\n" +
    "Op basis van coalitieakkoorden 2026-2030 " + scope + ":\n" + sample + "\n\n" +
    "Geef een strategisch wervingsadvies (max 220 woorden):\n" +
    "1. Welke 3 regio's zijn meest kansrijk voor CTMH?\n" +
    "2. Welke 5 functieprofielen zijn de komende jaren meest gevraagd?\n" +
    "3. Top 3 dominante thema's in de akkoorden\n" +
    "4. Concrete aanbeveling voor CTMH's wervingsstrategie\n\n" +
    "Antwoord bondig in het Nederlands met bullet points."
  );
}

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
}

// ── Storage helpers ──────────────────────────────────────────────────────────
async function loadStorage(key) {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}
async function saveStorage(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ── UI Components ────────────────────────────────────────────────────────────
function MatchBar({ pct, kleur }) {
  return (
    <div style={{ background:"#1a2332", borderRadius:4, height:7, overflow:"hidden", flex:1 }}>
      <div style={{ width:pct+"%", height:"100%",
        background:"linear-gradient(90deg,"+kleur+","+kleur+"bb)",
        borderRadius:4, transition:"width 0.6s ease" }} />
    </div>
  );
}

function Badge({ label, kleur }) {
  return (
    <span style={{ background:kleur+"20", color:kleur, border:"1px solid "+kleur+"44",
      borderRadius:20, padding:"2px 9px", fontSize:11, fontWeight:600, whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

function ProvBadge({ provincie }) {
  const kleur = PROV_KLEUREN[provincie] || "#445566";
  return (
    <span style={{ background:kleur+"22", color:kleur, border:"1px solid "+kleur+"44",
      borderRadius:5, padding:"1px 7px", fontSize:10, fontWeight:700 }}>
      {provincie}
    </span>
  );
}

// ── NL Kaart SVG ─────────────────────────────────────────────────────────────
function NLKaart({ gemeenteData, geselecteerd, onSelect, profielFilter, persoonFilter, zoek, provFilter }) {
  const [tooltip, setTooltip] = useState(null);

  const punten = useMemo(() => {
    return gemeenteData
      .filter(g => g.lat && g.lng)
      .filter(g => !zoek || g.gemeente.toLowerCase().includes(zoek.toLowerCase()))
      .filter(g => !provFilter || g.provincie === provFilter)
      .map(g => {
        const [x, y] = latLngToXY(g.lat, g.lng);
        let pct, kleur;
        if (persoonFilter) {
          const pm = berekenPersoonMatch(persoonFilter, g.analyses);
          pct = pm.pct;
          kleur = persoonFilter.kleur;
        } else if (profielFilter) {
          pct = g.analyses.find(a => a.id === profielFilter)?.pct || 0;
          kleur = CTMH_PROFIELEN.find(p => p.id === profielFilter)?.kleur || g.analyses[0].kleur;
        } else {
          pct = g.analyses[0].pct;
          kleur = g.analyses[0].kleur;
        }
        const isSelected = geselecteerd?.gemeente === g.gemeente;
        return { ...g, x, y, pct, kleur, isSelected };
      });
  }, [gemeenteData, geselecteerd, profielFilter, persoonFilter, zoek, provFilter]);

  const legendItems = [
    { label:"80%+", min:80, kleur:"#e8edf5" },
    { label:"60-79%", min:60, kleur:"#94b8d4" },
    { label:"40-59%", min:40, kleur:"#4a7a9b" },
    { label:"20-39%", min:20, kleur:"#2d5a72" },
    { label:"<20%", min:0, kleur:"#1e3347" },
  ];

  function getOpacity(pct) {
    if (pct >= 80) return 1;
    if (pct >= 60) return 0.85;
    if (pct >= 40) return 0.7;
    if (pct >= 20) return 0.5;
    return 0.3;
  }
  function getRadius(inwoners) {
    if (inwoners > 400000) return 9;
    if (inwoners > 150000) return 7;
    if (inwoners > 60000) return 5.5;
    if (inwoners > 20000) return 4;
    return 3;
  }

  return (
    <div style={{ position:"relative", width:"100%", background:"#0a1520",
      borderRadius:12, overflow:"hidden", border:"1px solid #1e2f47" }}>
      <div style={{ padding:"12px 16px", borderBottom:"1px solid #1e2f47",
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#e8edf5" }}>
          {persoonFilter
            ? persoonFilter.avatar + " " + persoonFilter.naam + " — " + punten.length + " matches"
            : "Kaart — " + punten.length + " gemeenten"
          }
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {legendItems.map(l => (
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:3 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:l.kleur, opacity:0.85 }} />
              <span style={{ fontSize:9, color:"#6b7fa3" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox={"0 0 " + MAP_W + " " + MAP_H}
        style={{ width:"100%", display:"block", cursor:"crosshair" }}>
        <rect width={MAP_W} height={MAP_H} fill="#0a1520" />

        {/* Water */}
        <rect x="0" y="0" width="110" height={MAP_H} fill="#0d1f30" opacity="0.4" />
        <rect x="0" y="0" width={MAP_W} height="60" fill="#0d1f30" opacity="0.3" />

        {/* Grid lijnen */}
        {[51,52,53].map(lat => {
          const [,y] = latLngToXY(lat, 5);
          return <line key={lat} x1="0" y1={y} x2={MAP_W} y2={y}
            stroke="#1e2f47" strokeWidth="0.5" strokeDasharray="4,6" />;
        })}
        {[4,5,6,7].map(lng => {
          const [x] = latLngToXY(52, lng);
          return <line key={lng} x1={x} y1="0" x2={x} y2={MAP_H}
            stroke="#1e2f47" strokeWidth="0.5" strokeDasharray="4,6" />;
        })}

        {/* Niet-geselecteerde punten */}
        {punten.filter(p => !p.isSelected).map(p => (
          <g key={p.gemeente}>
            <circle cx={p.x} cy={p.y}
              r={getRadius(p.inwoners) + 3}
              fill="transparent"
              style={{ cursor:"pointer" }}
              onMouseEnter={e => setTooltip({ g:p, mx:e.clientX, my:e.clientY })}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => onSelect(p)} />
            <circle cx={p.x} cy={p.y}
              r={getRadius(p.inwoners)}
              fill={p.kleur}
              opacity={getOpacity(p.pct)}
              stroke={p.kleur}
              strokeWidth="0.5"
              style={{ cursor:"pointer", pointerEvents:"none" }} />
          </g>
        ))}

        {/* Geselecteerd punt */}
        {punten.filter(p => p.isSelected).map(p => (
          <g key={p.gemeente+"_sel"}>
            <circle cx={p.x} cy={p.y} r={getRadius(p.inwoners)+6}
              fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4">
              <animate attributeName="r" from={getRadius(p.inwoners)+3}
                to={getRadius(p.inwoners)+10} dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={p.x} cy={p.y} r={getRadius(p.inwoners)+2}
              fill="none" stroke="#ffffff" strokeWidth="2" />
            <circle cx={p.x} cy={p.y} r={getRadius(p.inwoners)}
              fill={p.kleur} stroke="white" strokeWidth="1.5" />
          </g>
        ))}

        {/* Labels grote steden */}
        {punten.filter(p => p.inwoners > 120000).map(p => (
          <text key={p.gemeente+"_lbl"} x={p.x+getRadius(p.inwoners)+4} y={p.y+4}
            fontSize="9" fill="#8fb3a8" style={{ pointerEvents:"none" }}>
            {p.gemeente}
          </text>
        ))}

        {/* Kompas */}
        <text x={MAP_W-20} y={25} fontSize="12" fill="#4a6080" textAnchor="middle">N</text>
        <line x1={MAP_W-20} y1={30} x2={MAP_W-20} y2={45} stroke="#4a6080" strokeWidth="1" />
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div style={{ position:"fixed", left:tooltip.mx+12, top:tooltip.my-10,
          background:"#1a2d45", border:"1px solid "+tooltip.g.kleur,
          borderRadius:8, padding:"8px 12px", pointerEvents:"none",
          zIndex:9999, minWidth:180, boxShadow:"0 4px 20px #00000066" }}>
          <div style={{ fontWeight:700, color:"#e8edf5", fontSize:13, marginBottom:3 }}>
            {tooltip.g.gemeente}
          </div>
          <ProvBadge provincie={tooltip.g.provincie} />
          <div style={{ marginTop:6, display:"flex", flexDirection:"column", gap:2 }}>
            <div style={{ fontSize:11, color:tooltip.g.kleur, fontWeight:700 }}>
              {tooltip.g.analyses[0].icon} {tooltip.g.analyses[0].label}: {tooltip.g.pct}%
            </div>
            {tooltip.g.inwoners > 0 && (
              <div style={{ fontSize:10, color:"#6b7fa3" }}>
                {Math.round(tooltip.g.inwoners/1000)}k inwoners
              </div>
            )}
          </div>
          <div style={{ marginTop:6, fontSize:10, color:"#4a6080" }}>
            Klik voor analyse
          </div>
        </div>
      )}
    </div>
  );
}

// ── Hoofd App ────────────────────────────────────────────────────────────────
export default function App() {
  const [geselecteerd, setGeselecteerd] = useState(null);
  const [profielFilter, setProfielFilter] = useState(null);
  const [provFilter, setProvFilter] = useState("");
  const [zoek, setZoek] = useState("");
  const [tab, setTab] = useState("kaart");
  const [aiTekst, setAiTekst] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [strategie, setStrategie] = useState("");
  const [stratLoading, setStratLoading] = useState(false);
  const [weekUpdate, setWeekUpdate] = useState("");
  const [weekLoading, setWeekLoading] = useState(false);
  const [persoonFilter, setPersoonFilter] = useState(null);
  const [persoonTab, setPersoonTab] = useState(false);
  const [eigenModus, setEigenModus] = useState(false);
  const [eigenNaam, setEigenNaam] = useState("");
  const [eigenProv, setEigenProv] = useState("");
  const [eigenTekst, setEigenTekst] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [nieuweSignalen, setNieuweSignalen] = useState([]);

  const provincies = useMemo(() => [...new Set(RAW_GEMEENTEN.map(g => g.provincie))].sort(), []);

  const gemeenteData = useMemo(() =>
    RAW_GEMEENTEN.map(g => ({ ...g, analyses: berekenMatch(g) })), []);

  const gefilterd = useMemo(() => {
    const activeProfIds = persoonFilter
      ? persoonFilter.profielen
      : profielFilter ? [profielFilter] : null;

    return gemeenteData.filter(g => {
      if (zoek && !g.gemeente.toLowerCase().includes(zoek.toLowerCase()) &&
          !g.provincie.toLowerCase().includes(zoek.toLowerCase())) return false;
      if (provFilter && g.provincie !== provFilter) return false;
      if (activeProfIds) {
        const hasMatch = activeProfIds.some(pid => {
          const p = g.analyses.find(a => a.id === pid);
          return p && p.pct >= 15;
        });
        if (!hasMatch) return false;
      }
      return true;
    }).sort((a,b) => {
      if (persoonFilter) {
        const pa = berekenPersoonMatch(persoonFilter, a.analyses).pct;
        const pb = berekenPersoonMatch(persoonFilter, b.analyses).pct;
        return pb - pa;
      }
      if (profielFilter) {
        const pa = a.analyses.find(x => x.id === profielFilter)?.pct || 0;
        const pb = b.analyses.find(x => x.id === profielFilter)?.pct || 0;
        return pb - pa;
      }
      return b.analyses[0].pct - a.analyses[0].pct;
    });
  }, [gemeenteData, zoek, provFilter, profielFilter, persoonFilter]);

  // ── Wekelijkse refresh via storage ────────────────────────────────────────
  useEffect(() => {
    async function checkRefresh() {
      const stored = await loadStorage("ctmh_week_update");
      const currentWeek = getWeekNumber() + "-" + new Date().getFullYear();

      if (stored && stored.week === currentWeek) {
        setWeekUpdate(stored.tekst);
        setLastRefresh(stored.timestamp);
        setNieuweSignalen(stored.signalen || []);
      } else {
        // Nieuwe week: genereer update
        setWeekLoading(true);
        try {
          const tekst = await fetchNieuweKansen(gemeenteData);
          const signalen = gemeenteData
            .sort((a,b) => b.analyses[0].pct - a.analyses[0].pct)
            .slice(0,5)
            .map(g => ({ gemeente:g.gemeente, pct:g.analyses[0].pct,
              label:g.analyses[0].label, kleur:g.analyses[0].kleur, provincie:g.provincie }));
          const now = new Date().toISOString();
          setWeekUpdate(tekst);
          setLastRefresh(now);
          setNieuweSignalen(signalen);
          await saveStorage("ctmh_week_update", { week:currentWeek, tekst, signalen, timestamp:now });
        } catch(e) {
          setWeekUpdate("Wekelijkse update tijdelijk niet beschikbaar.");
        }
        setWeekLoading(false);
      }
    }
    checkRefresh();
  }, [gemeenteData]);

  const selecteer = useCallback(async (g) => {
    setGeselecteerd(g);
    setAiTekst("");
    if (tab === "kaart") setTab("kaart");
    const top = g.analyses ? g.analyses[0] : berekenMatch(g)[0];
    setAiLoading(true);
    try { setAiTekst(await fetchAIAnalyse(g, top.label)); }
    catch { setAiTekst("AI-analyse tijdelijk niet beschikbaar."); }
    setAiLoading(false);
  }, [tab]);

  const laadStrategie = async () => {
    setStratLoading(true);
    setStrategie("");
    try { setStrategie(await fetchStrategieAnalyse(provFilter, gefilterd)); }
    catch { setStrategie("Strategie niet beschikbaar."); }
    setStratLoading(false);
  };

  const forceRefresh = async () => {
    setWeekLoading(true);
    setWeekUpdate("");
    try {
      const tekst = await fetchNieuweKansen(gemeenteData);
      const signalen = gemeenteData.sort((a,b) => b.analyses[0].pct - a.analyses[0].pct)
        .slice(0,5).map(g => ({ gemeente:g.gemeente, pct:g.analyses[0].pct,
          label:g.analyses[0].label, kleur:g.analyses[0].kleur, provincie:g.provincie }));
      const now = new Date().toISOString();
      const currentWeek = getWeekNumber() + "-" + new Date().getFullYear();
      setWeekUpdate(tekst);
      setLastRefresh(now);
      setNieuweSignalen(signalen);
      await saveStorage("ctmh_week_update", { week:currentWeek, tekst, signalen, timestamp:now });
    } catch { setWeekUpdate("Niet beschikbaar."); }
    setWeekLoading(false);
  };

  const analyseEigen = async () => {
    if (!eigenNaam && !eigenTekst) return;
    const keywords = ["woningbouw","duurzaamheid","jeugdzorg","wmo","armoede","participatie",
      "veiligheid","hrm","financiën","organisatie","klimaat","energietransitie",
      "sociaal domein","bereikbaarheid","regionale samenwerking","fusie"];
    const gevonden = keywords.filter(kw => eigenTekst.toLowerCase().includes(kw));
    const eigenG = {
      gemeente: eigenNaam || "Eigen gemeente",
      provincie: eigenProv || "Onbekend",
      inwoners: 0,
      themas: gevonden.length > 0 ? gevonden : ["organisatie","sociaal domein"],
      lat: null, lng: null
    };
    eigenG.analyses = berekenMatch(eigenG);
    await selecteer(eigenG);
  };

  const selAnalyses = geselecteerd ? (geselecteerd.analyses || berekenMatch(geselecteerd)) : [];
  const provCount = useMemo(() => {
    const c = {};
    RAW_GEMEENTEN.forEach(g => { c[g.provincie] = (c[g.provincie]||0)+1; });
    return c;
  }, []);

  const ST = {
    page: { minHeight:"100vh", background:"#0b1120", color:"#c8d6ea",
      fontFamily:"Inter,system-ui,sans-serif", display:"flex", flexDirection:"column" },
    hdr: { background:"linear-gradient(135deg,#0d1929,#0f2040)",
      borderBottom:"1px solid #1e2f47", padding:"12px 20px",
      display:"flex", alignItems:"center", gap:12 },
    left: { width:278, flexShrink:0, background:"#0e1926",
      borderRight:"1px solid #1e2f47", display:"flex",
      flexDirection:"column", overflow:"hidden" },
    right: { flex:1, overflow:"auto", padding:16 },
    inp: { width:"100%", background:"#141e2c", border:"1px solid #1e2f47",
      borderRadius:8, padding:"7px 10px", color:"#c8d6ea", fontSize:12,
      outline:"none", boxSizing:"border-box" },
    sel: { width:"100%", background:"#141e2c", border:"1px solid #1e2f47",
      borderRadius:8, padding:"6px 10px", color:"#c8d6ea",
      fontSize:12, outline:"none", cursor:"pointer" },
    card: { background:"#0e1926", border:"1px solid #1e2f47", borderRadius:12, padding:"14px 18px" },
    tab: (a) => ({ background:a?"#1e2f47":"transparent",
      border:"1px solid "+(a?"#2D6A9F":"#1e2f47"), borderRadius:7,
      padding:"6px 12px", color:a?"#e8edf5":"#6b7fa3",
      fontSize:12, fontWeight:600, cursor:"pointer" }),
  };

  const TABS = [
    {id:"kaart",label:"🗺️ Kaart"},
    {id:"analyse",label:"📊 Analyse"},
    {id:"mensen",label:"👤 Mensen"},
    {id:"matrix",label:"⊞ Matrix"},
    {id:"strategie",label:"🤖 Strategie"},
    {id:"tips",label:"💡 Tips"},
  ];

  return (
    <div style={ST.page}>
      {/* Header */}
      <div style={ST.hdr}>
        <div style={{ background:"linear-gradient(135deg,#2D6A9F,#1A7A4A)",
          borderRadius:9, width:36, height:36, display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🔍</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:800,color:"#e8edf5",letterSpacing:"-0.3px"}}>
            CTMH Kansen Analyse
          </div>
          <div style={{fontSize:10,color:"#4a6080"}}>
            Coalitieakkoorden 2026-2030 · {RAW_GEMEENTEN.length} gemeenten · Nederland
          </div>
        </div>

        {/* Week indicator */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{background:"#1e2f47",borderRadius:8,padding:"5px 10px",textAlign:"center"}}>
            <div style={{fontSize:10,color:"#4a6080"}}>Week</div>
            <div style={{fontSize:16,fontWeight:800,color:"#2D6A9F"}}>{getWeekNumber()}</div>
          </div>
          <button onClick={forceRefresh}
            style={{background:"#1e2f47",border:"1px solid #2D6A9F",borderRadius:8,
              padding:"5px 10px",color:"#2D6A9F",fontSize:10,cursor:"pointer",fontWeight:700}}>
            {weekLoading ? "..." : "↻ Refresh"}
          </button>
        </div>
      </div>

      {/* Week update banner */}
      {(weekUpdate || weekLoading) && (
        <div style={{background:"linear-gradient(90deg,#0d1929,#102040)",
          borderBottom:"1px solid #1e3a5f",padding:"10px 20px",
          display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{fontSize:20,flexShrink:0}}>📡</div>
          <div style={{flex:1}}>
            <div style={{fontSize:11,fontWeight:700,color:"#2D6A9F",marginBottom:3}}>
              WEKELIJKSE KANSEN UPDATE — Week {getWeekNumber()}/2026
              {lastRefresh && (
                <span style={{color:"#4a6080",fontWeight:400,marginLeft:8}}>
                  · {new Date(lastRefresh).toLocaleDateString("nl-NL")}
                </span>
              )}
            </div>
            {weekLoading ? (
              <div style={{color:"#4a6080",fontSize:12}}>Update wordt gegenereerd...</div>
            ) : (
              <div style={{fontSize:12,color:"#8fb3a8",lineHeight:1.6,
                whiteSpace:"pre-wrap",maxHeight:80,overflow:"hidden"}}>
                {weekUpdate.slice(0,400)}{weekUpdate.length>400?"...":""}
              </div>
            )}
          </div>
          {nieuweSignalen.length>0 && (
            <div style={{display:"flex",gap:5,flexShrink:0}}>
              {nieuweSignalen.slice(0,3).map(s=>(
                <div key={s.gemeente}
                  onClick={()=>{const g=gemeenteData.find(x=>x.gemeente===s.gemeente);if(g)selecteer(g);}}
                  style={{background:s.kleur+"22",border:"1px solid "+s.kleur+"44",
                    borderRadius:6,padding:"4px 8px",cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#e8edf5"}}>{s.gemeente}</div>
                  <div style={{fontSize:11,fontWeight:800,color:s.kleur}}>{s.pct}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{display:"flex",flex:1,overflow:"hidden",minHeight:0}}>
        {/* Linkerpaneel */}
        <div style={ST.left}>
          <div style={{padding:"10px 10px 8px",borderBottom:"1px solid #1e2f47",
            display:"flex",flexDirection:"column",gap:6}}>
            <input value={zoek} onChange={e=>setZoek(e.target.value)}
              placeholder="🔎 Zoek gemeente..."
              style={ST.inp} />
            <select value={provFilter}
              onChange={e=>{setProvFilter(e.target.value);setStrategie("");}}
              style={ST.sel}>
              <option value="">Alle provincies ({RAW_GEMEENTEN.length})</option>
              {provincies.map(p=>(
                <option key={p} value={p}>{p} ({provCount[p]||0})</option>
              ))}
            </select>
            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
              <button onClick={()=>{setProfielFilter(null);setPersoonFilter(null);}}
                style={{background:(!profielFilter&&!persoonFilter)?"#2D6A9F22":"#141e2c",
                  border:"1px solid "+((!profielFilter&&!persoonFilter)?"#2D6A9F":"#1e2f47"),
                  borderRadius:20,padding:"2px 8px",color:(!profielFilter&&!persoonFilter)?"#2D6A9F":"#6b7fa3",
                  fontSize:10,cursor:"pointer"}}>Alles</button>
              {CTMH_PROFIELEN.map(p=>(
                <button key={p.id} onClick={()=>{setProfielFilter(p.id===profielFilter?null:p.id);setPersoonFilter(null);}}
                  style={{background:(!persoonFilter&&profielFilter===p.id)?p.kleur+"22":"#141e2c",
                    border:"1px solid "+((!persoonFilter&&profielFilter===p.id)?p.kleur:"#1e2f47"),
                    borderRadius:20,padding:"2px 7px",
                    color:(!persoonFilter&&profielFilter===p.id)?p.kleur:"#6b7fa3",
                    fontSize:10,cursor:"pointer"}}>
                  {p.icon}
                </button>
              ))}
            </div>

            {/* Persoon filter */}
            <div style={{borderTop:"1px solid #1e2f47",paddingTop:7}}>
              <div style={{fontSize:9,fontWeight:700,color:"#4a6080",letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>
                👤 Filter op CTMH-adviseur
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {CTMH_MENSEN.map(m=>(
                  <button key={m.id}
                    onClick={()=>{
                      setPersoonFilter(persoonFilter?.id===m.id?null:m);
                      setProfielFilter(null);
                      if(persoonFilter?.id!==m.id) setPersoonTab(true);
                    }}
                    title={m.naam + " — " + m.rol}
                    style={{
                      background:persoonFilter?.id===m.id?m.kleur+"33":"#141e2c",
                      border:"1px solid "+(persoonFilter?.id===m.id?m.kleur:"#1e2f47"),
                      borderRadius:20,padding:"3px 8px",
                      color:persoonFilter?.id===m.id?m.kleur:"#6b7fa3",
                      fontSize:10,cursor:"pointer",fontWeight:persoonFilter?.id===m.id?700:400,
                      display:"flex",alignItems:"center",gap:4
                    }}>
                    <span style={{fontSize:12}}>{m.avatar}</span>
                    <span>{m.initialen}</span>
                    {!m.beschikbaar && <span style={{color:"#4a6080",fontSize:9}}>·</span>}
                  </button>
                ))}
              </div>
              {persoonFilter && (
                <div style={{marginTop:6,background:persoonFilter.kleur+"11",
                  border:"1px solid "+persoonFilter.kleur+"33",
                  borderRadius:7,padding:"6px 9px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:persoonFilter.kleur}}>
                    {persoonFilter.avatar} {persoonFilter.naam}
                  </div>
                  <div style={{fontSize:10,color:"#6b7fa3",marginTop:1}}>{persoonFilter.rol}</div>
                  <div style={{fontSize:9,color:"#4a6080",marginTop:3}}>
                    {persoonFilter.profielen.map(pid=>{
                      const prof=CTMH_PROFIELEN.find(p=>p.id===pid);
                      return prof?prof.icon+" "+prof.label.split(" ")[0]:"";
                    }).join(" · ")}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{padding:"4px 10px",fontSize:10,color:"#4a6080",
            borderBottom:"1px solid #0d1420"}}>
            {gefilterd.length}/{RAW_GEMEENTEN.length} gemeenten
          </div>

          <div style={{flex:1,overflowY:"auto",padding:"6px 7px",
            display:"flex",flexDirection:"column",gap:3}}>
            {gefilterd.map(g => {
              const persMatch = persoonFilter ? berekenPersoonMatch(persoonFilter, g.analyses) : null;
              const displayPct = persMatch
                ? persMatch.pct
                : profielFilter
                  ? (g.analyses.find(a=>a.id===profielFilter)?.pct||0)
                  : g.analyses[0].pct;
              const displayKleur = persMatch
                ? persoonFilter.kleur
                : profielFilter
                  ? (CTMH_PROFIELEN.find(p=>p.id===profielFilter)?.kleur||g.analyses[0].kleur)
                  : g.analyses[0].kleur;
              const isSelected = geselecteerd?.gemeente===g.gemeente;
              return (
                <div key={g.gemeente} onClick={()=>selecteer(g)}
                  style={{background:isSelected?"#1a2d45":"#131e2e",
                    border:"1px solid "+(isSelected?displayKleur:"#182030"),
                    borderRadius:7,padding:"7px 10px",cursor:"pointer"}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:4}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,color:"#e8edf5",fontSize:12,
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                        {g.gemeente}
                      </div>
                      <div style={{marginTop:2}}>
                        <ProvBadge provincie={g.provincie} />
                      </div>
                    </div>
                    <div style={{background:displayKleur+"22",color:displayKleur,
                      borderRadius:5,padding:"1px 6px",fontSize:11,fontWeight:800,
                      flexShrink:0,marginLeft:5}}>
                      {displayPct}%
                    </div>
                  </div>
                  <MatchBar pct={displayPct} kleur={displayKleur} />
                </div>
              );
            })}
          </div>

          <div style={{borderTop:"1px solid #1e2f47",padding:"8px 9px"}}>
            <button onClick={()=>setEigenModus(!eigenModus)}
              style={{width:"100%",background:"transparent",
                border:"1px solid #1e2f47",borderRadius:7,
                padding:"6px",color:"#6b7fa3",fontSize:11,cursor:"pointer"}}>
              {eigenModus?"▲":"▼"} Eigen akkoord
            </button>
            {eigenModus && (
              <div style={{marginTop:7,display:"flex",flexDirection:"column",gap:5}}>
                <input value={eigenNaam} onChange={e=>setEigenNaam(e.target.value)}
                  placeholder="Gemeente naam" style={ST.inp} />
                <select value={eigenProv} onChange={e=>setEigenProv(e.target.value)}
                  style={ST.sel}>
                  <option value="">Selecteer provincie</option>
                  {provincies.map(p=><option key={p} value={p}>{p}</option>)}
                </select>
                <textarea value={eigenTekst} onChange={e=>setEigenTekst(e.target.value)}
                  placeholder="Plak coalitieakkoordtekst..." rows={3}
                  style={{background:"#141e2c",border:"1px solid #1e2f47",
                    borderRadius:6,padding:"6px 9px",color:"#c8d6ea",
                    fontSize:11,outline:"none",resize:"vertical"}} />
                <button onClick={analyseEigen}
                  style={{background:"linear-gradient(135deg,#1A7A4A,#2D6A9F)",
                    border:"none",borderRadius:6,padding:"7px",
                    color:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>
                  🔍 Analyseer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rechterpaneel */}
        <div style={ST.right}>
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
            {TABS.map(t=>(
              <button key={t.id}
                onClick={()=>{
                  setTab(t.id);
                  if(t.id==="strategie"&&!strategie&&!stratLoading) laadStrategie();
                }}
                style={ST.tab(tab===t.id)}>{t.label}</button>
            ))}
          </div>

          {/* ─ KAART TAB ─ */}
          {tab==="kaart" && (
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <NLKaart
                gemeenteData={gefilterd}
                geselecteerd={geselecteerd}
                onSelect={selecteer}
                profielFilter={profielFilter}
                persoonFilter={persoonFilter}
                zoek={zoek}
                provFilter={provFilter}
              />

              {geselecteerd && (
                <div style={ST.card}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <div style={{fontSize:17,fontWeight:800,color:"#e8edf5"}}>
                        {geselecteerd.gemeente}
                      </div>
                      <div style={{marginTop:4,display:"flex",alignItems:"center",gap:8}}>
                        <ProvBadge provincie={geselecteerd.provincie} />
                        {geselecteerd.inwoners>0 && (
                          <span style={{fontSize:11,color:"#6b7fa3"}}>
                            {Math.round(geselecteerd.inwoners/1000)}k inw.
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{background:"#141e2c",border:"1px solid #1e2f47",
                      borderRadius:8,padding:"8px 14px",textAlign:"center"}}>
                      <div style={{fontSize:22,fontWeight:800,color:"#e8edf5"}}>
                        {selAnalyses[0]?.pct}%
                      </div>
                      <div style={{fontSize:9,color:"#4a6080"}}>top match</div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
                    {selAnalyses.slice(0,3).map(p=>(
                      <div key={p.id} style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:14}}>{p.icon}</span>
                        <span style={{fontSize:11,color:"#c8d6ea",width:145,flexShrink:0}}>{p.label}</span>
                        <MatchBar pct={p.pct} kleur={p.kleur} />
                        <span style={{fontSize:12,fontWeight:700,color:p.kleur,width:32,textAlign:"right"}}>
                          {p.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{borderTop:"1px solid #1e2f47",paddingTop:10}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#e8edf5",marginBottom:6}}>
                      🤖 AI Kansen Analyse
                    </div>
                    {aiLoading ? (
                      <div style={{color:"#4a6080",fontSize:12}}>Analyseren...</div>
                    ) : aiTekst ? (
                      <div style={{fontSize:12,color:"#a8bdd4",lineHeight:1.7,whiteSpace:"pre-wrap"}}>
                        {aiTekst}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─ ANALYSE TAB ─ */}
          {tab==="analyse" && (
            !geselecteerd ? (
              <div style={{...ST.card,textAlign:"center",padding:36}}>
                <div style={{fontSize:32,marginBottom:8}}>🏛️</div>
                <div style={{fontSize:13,color:"#4a6080",fontWeight:600}}>
                  Selecteer een gemeente uit de kaart of lijst
                </div>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={ST.card}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"flex-start",gap:10}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:19,fontWeight:800,color:"#e8edf5",marginBottom:4}}>
                        Gemeente {geselecteerd.gemeente}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                        <ProvBadge provincie={geselecteerd.provincie} />
                        {geselecteerd.inwoners>0&&(
                          <span style={{fontSize:11,color:"#6b7fa3"}}>
                            {Math.round(geselecteerd.inwoners/1000)}k inwoners
                          </span>
                        )}
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                        {geselecteerd.themas.slice(0,8).map(t=>(
                          <span key={t} style={{background:"#1e2f47",color:"#8fb3a8",
                            borderRadius:4,padding:"2px 6px",fontSize:10}}>{t}</span>
                        ))}
                        {geselecteerd.themas.length>8&&(
                          <span style={{color:"#4a6080",fontSize:10}}>
                            +{geselecteerd.themas.length-8}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{background:"#141e2c",border:"1px solid #1e2f47",
                      borderRadius:9,padding:"9px 14px",textAlign:"center",flexShrink:0}}>
                      <div style={{fontSize:24,fontWeight:800,color:"#e8edf5"}}>
                        {selAnalyses[0]?.pct}%
                      </div>
                      <div style={{fontSize:9,color:"#4a6080"}}>Top match</div>
                    </div>
                  </div>
                </div>

                <div style={ST.card}>
                  <div style={{fontSize:12,fontWeight:700,color:"#e8edf5",marginBottom:12}}>
                    📊 Match per expertisegebied
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:9}}>
                    {selAnalyses.map(p=>(
                      <div key={p.id}>
                        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                          <span style={{fontSize:14}}>{p.icon}</span>
                          <span style={{fontSize:11,color:"#c8d6ea",fontWeight:600,
                            width:155,flexShrink:0}}>{p.label}</span>
                          <MatchBar pct={p.pct} kleur={p.kleur} />
                          <span style={{fontSize:12,fontWeight:800,color:p.kleur,
                            width:34,textAlign:"right"}}>{p.pct}%</span>
                        </div>
                        {p.gevondenKeywords&&p.gevondenKeywords.length>0&&(
                          <div style={{paddingLeft:25,display:"flex",flexWrap:"wrap",gap:3}}>
                            {p.gevondenKeywords.slice(0,5).map(kw=>(
                              <span key={kw} style={{fontSize:9,background:p.kleur+"15",
                                color:p.kleur+"cc",borderRadius:4,padding:"1px 5px",
                                border:"1px solid "+p.kleur+"25"}}>{kw}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={ST.card}>
                  <div style={{fontSize:12,fontWeight:700,color:"#e8edf5",marginBottom:10}}>
                    🎯 Aanbevolen profielen
                  </div>
                  {selAnalyses.slice(0,3).map(p=>(
                    <div key={p.id} style={{background:p.kleur+"11",
                      border:"1px solid "+p.kleur+"33",borderRadius:8,
                      padding:"9px 12px",marginBottom:7}}>
                      <div style={{fontSize:11,fontWeight:700,color:p.kleur,marginBottom:5}}>
                        {p.icon} {p.label} - {p.pct}%
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                        {p.rollen.map(r=><Badge key={r} label={r} kleur={p.kleur} />)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={ST.card}>
                  <div style={{fontSize:12,fontWeight:700,color:"#e8edf5",marginBottom:8}}>
                    🤖 AI Kansen Analyse - {geselecteerd.gemeente}
                  </div>
                  {aiLoading ? (
                    <div style={{color:"#4a6080",fontSize:12}}>Analyseren...</div>
                  ) : aiTekst ? (
                    <div style={{fontSize:12,color:"#a8bdd4",lineHeight:1.75,whiteSpace:"pre-wrap"}}>
                      {aiTekst}
                    </div>
                  ) : (
                    <div style={{color:"#4a6080",fontSize:12}}>
                      Klik op een gemeente om de analyse te starten.
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* ─ MENSEN TAB ─ */}
          {tab==="mensen" && (
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{fontSize:12,color:"#4a6080",marginBottom:2}}>
                Selecteer een adviseur om te zien welke gemeenten het beste bij zijn of haar profiel passen.
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
                {CTMH_MENSEN.map(m => {
                  const isActief = persoonFilter?.id===m.id;
                  const topMatches = gefilterd
                    .map(g=>({...g, persMatch: berekenPersoonMatch(m, g.analyses)}))
                    .sort((a,b)=>b.persMatch.pct-a.persMatch.pct)
                    .slice(0,3);
                  return (
                    <div key={m.id}
                      onClick={()=>{
                        setPersoonFilter(isActief?null:m);
                        setProfielFilter(null);
                      }}
                      style={{
                        background:isActief?m.kleur+"18":"#0e1926",
                        border:"1px solid "+(isActief?m.kleur:"#1e2f47"),
                        borderRadius:12,padding:"14px 16px",cursor:"pointer",
                        boxShadow:isActief?"0 0 0 1px "+m.kleur+"44":"none"
                      }}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
                        <div style={{
                          width:40,height:40,borderRadius:10,flexShrink:0,
                          background:m.kleur+"22",border:"1px solid "+m.kleur+"44",
                          display:"flex",alignItems:"center",justifyContent:"center",fontSize:20
                        }}>{m.avatar}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:700,color:"#e8edf5",fontSize:13}}>
                            {m.naam}
                            {!m.beschikbaar && (
                              <span style={{marginLeft:6,fontSize:9,color:"#4a6080",
                                background:"#1e2f47",borderRadius:4,padding:"1px 5px"}}>
                                Op opdracht
                              </span>
                            )}
                          </div>
                          <div style={{fontSize:10,color:m.kleur,marginTop:2,fontWeight:600}}>
                            {m.rol}
                          </div>
                          <div style={{fontSize:9,color:"#4a6080",marginTop:2}}>
                            📍 {m.regio}
                          </div>
                        </div>
                      </div>
                      <div style={{fontSize:11,color:"#8fb3a8",lineHeight:1.55,marginBottom:10}}>
                        {m.bio}
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:10}}>
                        {m.profielen.map(pid=>{
                          const prof=CTMH_PROFIELEN.find(p=>p.id===pid);
                          return prof?(
                            <span key={pid} style={{background:prof.kleur+"20",color:prof.kleur,
                              border:"1px solid "+prof.kleur+"44",borderRadius:20,
                              padding:"2px 8px",fontSize:10,fontWeight:600}}>
                              {prof.icon} {prof.label}
                            </span>
                          ):null;
                        })}
                      </div>
                      {topMatches.length>0 && (
                        <div style={{borderTop:"1px solid #1e2f47",paddingTop:8}}>
                          <div style={{fontSize:9,color:"#4a6080",fontWeight:700,
                            letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>
                            Top kansen nu
                          </div>
                          <div style={{display:"flex",flexDirection:"column",gap:4}}>
                            {topMatches.map(g=>(
                              <div key={g.gemeente}
                                onClick={e=>{e.stopPropagation();selecteer(g);setTab("analyse");}}
                                style={{display:"flex",alignItems:"center",gap:7,
                                  padding:"4px 8px",borderRadius:6,background:"#141e2c",
                                  cursor:"pointer"}}>
                                <span style={{fontSize:11,color:"#c8d6ea",fontWeight:600,flex:1}}>
                                  {g.gemeente}
                                </span>
                                <span style={{fontSize:9,color:"#6b7fa3"}}>{g.provincie.split("-")[0]}</span>
                                <span style={{fontSize:12,fontWeight:800,color:m.kleur,
                                  minWidth:32,textAlign:"right"}}>
                                  {g.persMatch.pct}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {isActief && (
                        <div style={{marginTop:8,textAlign:"center",
                          fontSize:10,color:m.kleur,fontWeight:700}}>
                          ✓ Actief gefilterd — bekijk kaart of matrix voor volledig overzicht
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─ MATRIX TAB ─ */}
          {tab==="matrix" && (
            <div style={ST.card}>
              <div style={{fontSize:12,fontWeight:700,color:"#e8edf5",marginBottom:4}}>
                Kansen Matrix - {gefilterd.length} gemeenten
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid #1e2f47"}}>
                      <th style={{textAlign:"left",color:"#6b7fa3",padding:"6px 10px",fontWeight:600}}>Gemeente</th>
                      <th style={{textAlign:"left",color:"#6b7fa3",padding:"6px 8px",fontWeight:400,fontSize:10}}>Provincie</th>
                      {CTMH_PROFIELEN.map(p=>(
                        <th key={p.id} title={p.label}
                          style={{color:p.kleur,padding:"6px 5px",fontSize:14}}>{p.icon}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gefilterd.slice(0,200).map(g=>(
                      <tr key={g.gemeente}
                        onClick={()=>{selecteer(g);setTab("analyse");}}
                        style={{borderBottom:"1px solid #0d1420",cursor:"pointer"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="#151e2d"}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
                        <td style={{padding:"5px 10px",color:"#c8d6ea",fontWeight:600,fontSize:11}}>
                          {g.gemeente}
                        </td>
                        <td style={{padding:"5px 7px"}}>
                          <ProvBadge provincie={g.provincie} />
                        </td>
                        {CTMH_PROFIELEN.map(p=>{
                          const m = g.analyses.find(a=>a.id===p.id);
                          const pct = m?m.pct:0;
                          return (
                            <td key={p.id} style={{padding:"5px 4px",textAlign:"center"}}>
                              <div style={{
                                background:pct>=60?p.kleur:pct>=35?p.kleur+"77":pct>=15?p.kleur+"33":"#1e2f47",
                                borderRadius:4,padding:"2px 4px",fontSize:10,fontWeight:700,
                                color:pct>=35?"#fff":pct>=15?p.kleur:"#2e4060",
                                minWidth:26,display:"inline-block",textAlign:"center"
                              }}>{pct}%</div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {gefilterd.length>200&&(
                  <div style={{textAlign:"center",color:"#4a6080",fontSize:10,marginTop:8}}>
                    Top 200 van {gefilterd.length}. Gebruik filters.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─ STRATEGIE TAB ─ */}
          {tab==="strategie" && (
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {weekUpdate && !weekLoading && (
                <div style={{...ST.card,borderColor:"#1e3a5f"}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#2D6A9F",marginBottom:8}}>
                    📡 Wekelijkse Kansen Update - Week {getWeekNumber()}
                  </div>
                  <div style={{fontSize:12,color:"#a8bdd4",lineHeight:1.7,whiteSpace:"pre-wrap"}}>
                    {weekUpdate}
                  </div>
                </div>
              )}
              <div style={ST.card}>
                <div style={{fontSize:12,fontWeight:700,color:"#e8edf5",marginBottom:8}}>
                  🤖 AI Strategisch Wervingsadvies{provFilter?" - "+provFilter:""}
                </div>
                {stratLoading?(
                  <div style={{color:"#4a6080",fontSize:12}}>Analyseren...</div>
                ):strategie?(
                  <div style={{fontSize:12,color:"#a8bdd4",lineHeight:1.75,whiteSpace:"pre-wrap"}}>
                    {strategie}
                  </div>
                ):(
                  <button onClick={laadStrategie}
                    style={{background:"linear-gradient(135deg,#2D6A9F,#1A7A4A)",
                      border:"none",borderRadius:7,padding:"10px 20px",
                      color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    Genereer Wervingsstrategie{provFilter?" voor "+provFilter:""}
                  </button>
                )}
              </div>
              <div style={ST.card}>
                <div style={{fontSize:12,fontWeight:700,color:"#e8edf5",marginBottom:12}}>
                  🏆 Top 5 kansen per expertise
                </div>
                {CTMH_PROFIELEN.map(profiel=>{
                  const top5 = gefilterd
                    .map(g=>({...g,pct:g.analyses.find(a=>a.id===profiel.id)?.pct||0}))
                    .sort((a,b)=>b.pct-a.pct).slice(0,5);
                  return (
                    <div key={profiel.id} style={{marginBottom:12}}>
                      <div style={{fontSize:11,fontWeight:700,color:profiel.kleur,marginBottom:5}}>
                        {profiel.icon} {profiel.label}
                      </div>
                      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                        {top5.map(g=>(
                          <div key={g.gemeente}
                            onClick={()=>{selecteer(g);setTab("kaart");}}
                            style={{background:profiel.kleur+"15",
                              border:"1px solid "+profiel.kleur+"33",
                              borderRadius:6,padding:"4px 8px",cursor:"pointer"}}>
                            <div style={{fontSize:11,color:"#c8d6ea",fontWeight:600}}>
                              {g.gemeente}
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",
                              alignItems:"center",gap:6}}>
                              <ProvBadge provincie={g.provincie} />
                              <span style={{fontSize:11,color:profiel.kleur,fontWeight:800}}>
                                {g.pct}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─ TIPS TAB ─ */}
          {tab==="tips" && (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[
                {nr:"01",kleur:"#2D6A9F",icon:"📥",titel:"Laad actuele akkoorden via PDF-URL",
                  tekst:"Haal gepubliceerde coalitieakkoorden automatisch op via PDF-links van gemeentewebsites (gemeente.nl/coalitieakkoord.pdf). Gebruik een PDF-parser om de volledige tekst te extraheren en analyseer daarna met AI. Zo werk je altijd met de meest recente versie in plaats van gesimuleerde themateksten."},
                {nr:"02",kleur:"#1A7A4A",icon:"🔢",titel:"Verfijn keyword-weging met domeinkennis",
                  tekst:"Niet elk keyword is even relevant. Introduceer gewogen scores: hoog (3 punten), gemiddeld (2), laag (1). Combineer met co-occurrentie: 'jeugdzorg' plus 'budget verhogen' is een sterkere kans dan alleen 'jeugdzorg'. Dit verhoogt de precisie van je matchpercentage aanzienlijk."},
                {nr:"03",kleur:"#7B3FA0",icon:"📅",titel:"Koppel aan de gemeentelijke begrotingscyclus",
                  tekst:"Q3 na formatie is het piekmoment voor instroom van interim professionals. Begroting verschijnt in september, programmaplannen Q1. Stel automatische alerts in op publicatie van begrotingsdocumenten per gemeente."},
                {nr:"04",kleur:"#C0622F",icon:"📊",titel:"Integreer vacaturedata als validatie",
                  tekst:"Koppel de analyse aan actuele vacatures op Werken voor Nederland, Gemeentebanen.nl of LinkedIn. Als een gemeente een akkoord heeft op 'woningbouw' en vacatures plaatst voor projectleiders, dan is de kans bewezen. Dit verhoogt de betrouwbaarheid van de matchscore."},
                {nr:"05",kleur:"#B5860D",icon:"🗺️",titel:"Voeg arbeidsmarktregio's toe als clustering",
                  tekst:"Groepeer gemeenten op de 35 arbeidsmarktregio's van Nederland. Als meerdere gemeenten in regio Amsterdam-Amstelland hoge scores hebben, positioneer een recruiter in die regio. Maakt de wervingsstrategie uitvoerbaar en kostenefficient."},
                {nr:"06",kleur:"#8B1A1A",icon:"🧠",titel:"Gebruik NLP voor bedragen en aantallen",
                  tekst:"Gebruik een NLP-model om specifieke bedragen en aantallen te extraheren ('2,5 mln voor woningbouw', '500 sociale huurwoningen'). Hoe concreter het akkoord, hoe groter de kans op uitvoering. Concreetheid is een hogere prioriteitsscore waard."},
                {nr:"07",kleur:"#2D6A9F",icon:"🔄",titel:"Monitor tussentijdse bijstellingen",
                  tekst:"Coalitieakkoorden worden bijgesteld via raadsbesluiten en perspectiefnota's. Stel automatische scans in van officielebekendmakingen.nl op trefwoorden uit je matrix. Zo vangt CTMH veranderingen op voordat ze leiden tot een vacature."},
                {nr:"08",kleur:"#1A7A4A",icon:"🤝",titel:"Voeg politieke kleur toe als variabele",
                  tekst:"Een coalitie met GroenLinks/PvdA legt andere accenten dan VVD/CDA. Voeg coalitiepartijen toe als variabele en kalibreer keyword-gewichten op partijprogramma's. Dit geeft een betere voorspelling van beleidsuitvoering en timing."},
              ].map(tip=>(
                <div key={tip.nr} style={{background:"#0e1926",borderRadius:10,
                  padding:"13px 16px",
                  borderTop:"1px solid "+tip.kleur+"33",borderRight:"1px solid "+tip.kleur+"33",
                  borderBottom:"1px solid "+tip.kleur+"33",borderLeft:"3px solid "+tip.kleur}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                    <span style={{fontSize:16}}>{tip.icon}</span>
                    <span style={{fontSize:9,fontWeight:800,color:tip.kleur,letterSpacing:2}}>
                      TIP {tip.nr}
                    </span>
                    <span style={{fontSize:12,fontWeight:700,color:"#e8edf5"}}>{tip.titel}</span>
                  </div>
                  <div style={{fontSize:11,color:"#8fb3a8",lineHeight:1.65,paddingLeft:25}}>
                    {tip.tekst}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
