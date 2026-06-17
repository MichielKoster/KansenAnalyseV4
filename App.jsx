import { useState, useCallback, useMemo, useEffect } from "react";

const RAW_GEMEENTEN = [{"gemeente":"Amsterdam","provincie":"Noord-Holland","inwoners":921000,"themas":["wonen","woningbouw","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","participatie","diversiteit","veiligheid","ondermijning","digitalisering","organisatieontwikkeling","HRM","financiën"],"lat":52.374,"lng":4.89,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Alkmaar","provincie":"Noord-Holland","inwoners":109000,"themas":["woningbouw","binnenstad","duurzaamheid","energietransitie","sociaal domein","jeugdzorg","wmo","veiligheid","bereikbaarheid","organisatie","financiën","regionale samenwerking"],"lat":52.632,"lng":4.748,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Den Helder","provincie":"Noord-Holland","inwoners":55000,"themas":["havengerelateerd","marine","woningbouw","sociaal domein","armoede","jeugdzorg","participatie","veiligheid","regionale samenwerking","HRM","krimp","arbeidsmarkt"],"lat":52.955,"lng":4.762,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Haarlem","provincie":"Noord-Holland","inwoners":163000,"themas":["woningbouw","duurzaamheid","klimaatadaptatie","sociaal domein","wmo","jeugdzorg","cultuur","bereikbaarheid","organisatieontwikkeling","financiën","participatie"],"lat":52.381,"lng":4.636,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Haarlemmermeer","provincie":"Noord-Holland","inwoners":163000,"themas":["woningbouw","bereikbaarheid","Schiphol","duurzaamheid","sociaal domein","jeugdzorg","wmo","veiligheid","organisatie","financiën"],"lat":52.306,"lng":4.69,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Hoorn","provincie":"Noord-Holland","inwoners":73000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","armoede","schuldhulpverlening","veiligheid","binnenstad","organisatie"],"lat":52.641,"lng":5.06,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Zaanstad","provincie":"Noord-Holland","inwoners":160000,"themas":["woningbouw","duurzaamheid","industrie","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":52.456,"lng":4.82,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Purmerend","provincie":"Noord-Holland","inwoners":83000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","bereikbaarheid","organisatie","financiën"],"lat":52.503,"lng":4.96,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Velsen","provincie":"Noord-Holland","inwoners":70000,"themas":["haven","woningbouw","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","veiligheid","organisatie"],"lat":52.456,"lng":4.656,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Heerhugowaard","provincie":"Noord-Holland","inwoners":58000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","regionale samenwerking","organisatie"],"lat":52.664,"lng":4.839,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Dijk en Waard","provincie":"Noord-Holland","inwoners":86000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","HRM"],"lat":52.686,"lng":4.82,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Hollands Kroon","provincie":"Noord-Holland","inwoners":49000,"themas":["landbouw","woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie","regionale samenwerking"],"lat":52.816,"lng":4.902,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Medemblik","provincie":"Noord-Holland","inwoners":45000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.769,"lng":5.103,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Schagen","provincie":"Noord-Holland","inwoners":47000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","toerisme","organisatie"],"lat":52.789,"lng":4.799,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Heemskerk","provincie":"Noord-Holland","inwoners":39000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","veiligheid","organisatie"],"lat":52.507,"lng":4.68,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Beverwijk","provincie":"Noord-Holland","inwoners":42000,"themas":["woningbouw","haven","duurzaamheid","sociaal domein","jeugdzorg","participatie","armoede","veiligheid"],"lat":52.487,"lng":4.656,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Enkhuizen","provincie":"Noord-Holland","inwoners":18000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking","organisatie"],"lat":52.703,"lng":5.295,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Edam-Volendam","provincie":"Noord-Holland","inwoners":37000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.515,"lng":5.048,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Amstelveen","provincie":"Noord-Holland","inwoners":93000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","diversiteit","organisatie","financiën"],"lat":52.298,"lng":4.862,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Aalsmeer","provincie":"Noord-Holland","inwoners":32000,"themas":["woningbouw","bloementeelt","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.262,"lng":4.762,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Uithoorn","provincie":"Noord-Holland","inwoners":30000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.236,"lng":4.831,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Langedijk","provincie":"Noord-Holland","inwoners":28000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking","organisatie"],"lat":52.682,"lng":4.8,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Bergen NH","provincie":"Noord-Holland","inwoners":32000,"themas":["woningbouw","toerisme","natuur","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.668,"lng":4.7,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Castricum","provincie":"Noord-Holland","inwoners":37000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.544,"lng":4.66,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Heiloo","provincie":"Noord-Holland","inwoners":24000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.603,"lng":4.7,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Koggenland","provincie":"Noord-Holland","inwoners":24000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.683,"lng":4.979,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Stede Broec","provincie":"Noord-Holland","inwoners":22000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking","organisatie"],"lat":52.718,"lng":5.221,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Drechterland","provincie":"Noord-Holland","inwoners":20000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking"],"lat":52.672,"lng":5.167,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Texel","provincie":"Noord-Holland","inwoners":13000,"themas":["toerisme","woningbouw","duurzaamheid","starters","sociaal domein","jeugdzorg","eiland"],"lat":53.054,"lng":4.8,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Opmeer","provincie":"Noord-Holland","inwoners":11000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.711,"lng":4.955,"arbeidsmarktregio":"Noord-Holland Noord"},{"gemeente":"Gooise Meren","provincie":"Noord-Holland","inwoners":58000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie","financiën"],"lat":52.282,"lng":5.067,"arbeidsmarktregio":"Gooi en Vechtstreek"},{"gemeente":"Blaricum","provincie":"Noord-Holland","inwoners":11000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.27,"lng":5.237,"arbeidsmarktregio":"Gooi en Vechtstreek"},{"gemeente":"Huizen","provincie":"Noord-Holland","inwoners":42000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.296,"lng":5.238,"arbeidsmarktregio":"Gooi en Vechtstreek"},{"gemeente":"Hilversum","provincie":"Noord-Holland","inwoners":91000,"themas":["woningbouw","mediastad","duurzaamheid","sociaal domein","jeugdzorg","wmo","veiligheid","participatie","organisatie"],"lat":52.223,"lng":5.18,"arbeidsmarktregio":"Gooi en Vechtstreek"},{"gemeente":"Laren","provincie":"Noord-Holland","inwoners":11000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.256,"lng":5.234,"arbeidsmarktregio":"Gooi en Vechtstreek"},{"gemeente":"Diemen","provincie":"Noord-Holland","inwoners":29000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","diversiteit","organisatie"],"lat":52.34,"lng":4.959,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Waterland","provincie":"Noord-Holland","inwoners":17000,"themas":["woningbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.44,"lng":4.996,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Wormerland","provincie":"Noord-Holland","inwoners":16000,"themas":["woningbouw","duurzaamheid","industrie","sociaal domein","jeugdzorg","organisatie"],"lat":52.499,"lng":4.859,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Oostzaan","provincie":"Noord-Holland","inwoners":10000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","regionale samenwerking"],"lat":52.435,"lng":4.876,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Landsmeer","provincie":"Noord-Holland","inwoners":12000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.43,"lng":4.921,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Uitgeest","provincie":"Noord-Holland","inwoners":14000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.534,"lng":4.718,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Heemstede","provincie":"Noord-Holland","inwoners":27000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.354,"lng":4.614,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Bloemendaal","provincie":"Noord-Holland","inwoners":23000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":52.404,"lng":4.623,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Zandvoort","provincie":"Noord-Holland","inwoners":17000,"themas":["toerisme","woningbouw","starters","duurzaamheid","sociaal domein","organisatie"],"lat":52.375,"lng":4.533,"arbeidsmarktregio":"Zuid-Kennemerland/IJmond"},{"gemeente":"Ouder-Amstel","provincie":"Noord-Holland","inwoners":14000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.301,"lng":4.924,"arbeidsmarktregio":"Amsterdam"},{"gemeente":"Rotterdam","provincie":"Zuid-Holland","inwoners":655000,"themas":["woningbouw","haven","duurzaamheid","klimaatadaptatie","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","ondermijning","HRM","organisatie"],"lat":51.922,"lng":4.48,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Den Haag","provincie":"Zuid-Holland","inwoners":548000,"themas":["woningbouw","internationaal","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","veiligheid","ondermijning","diversiteit","HRM","financiën"],"lat":52.07,"lng":4.3,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Leiden","provincie":"Zuid-Holland","inwoners":125000,"themas":["woningbouw","kennisstad","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","bereikbaarheid","organisatie"],"lat":52.16,"lng":4.497,"arbeidsmarktregio":"Holland Rijnland"},{"gemeente":"Dordrecht","provincie":"Zuid-Holland","inwoners":119000,"themas":["woningbouw","haven","duurzaamheid","klimaatadaptatie","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.814,"lng":4.669,"arbeidsmarktregio":"Drechtsteden"},{"gemeente":"Zoetermeer","provincie":"Zuid-Holland","inwoners":124000,"themas":["woningbouw","bereikbaarheid","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.057,"lng":4.494,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Delft","provincie":"Zuid-Holland","inwoners":103000,"themas":["woningbouw","kennisstad","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.011,"lng":4.357,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Westland","provincie":"Zuid-Holland","inwoners":112000,"themas":["glastuinbouw","woningbouw","duurzaamheid","energietransitie","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.009,"lng":4.2,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Alphen aan den Rijn","provincie":"Zuid-Holland","inwoners":109000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","bereikbaarheid","organisatie"],"lat":52.128,"lng":4.659,"arbeidsmarktregio":"Holland Rijnland"},{"gemeente":"Gorinchem","provincie":"Zuid-Holland","inwoners":36000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.834,"lng":4.975,"arbeidsmarktregio":"Drechtsteden"},{"gemeente":"Gouda","provincie":"Zuid-Holland","inwoners":73000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.017,"lng":4.708,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Schiedam","provincie":"Zuid-Holland","inwoners":79000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM"],"lat":51.921,"lng":4.395,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Vlaardingen","provincie":"Zuid-Holland","inwoners":74000,"themas":["woningbouw","haven","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid"],"lat":51.912,"lng":4.344,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Spijkenisse","provincie":"Zuid-Holland","inwoners":74000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid"],"lat":51.842,"lng":4.327,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Nissewaard","provincie":"Zuid-Holland","inwoners":86000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.862,"lng":4.3,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Brielle","provincie":"Zuid-Holland","inwoners":17000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.902,"lng":4.16,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Voorne aan Zee","provincie":"Zuid-Holland","inwoners":65000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","HRM"],"lat":51.87,"lng":4.15,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Hoeksche Waard","provincie":"Zuid-Holland","inwoners":88000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.753,"lng":4.501,"arbeidsmarktregio":"Drechtsteden"},{"gemeente":"Goeree-Overflakkee","provincie":"Zuid-Holland","inwoners":51000,"themas":["woningbouw","duurzaamheid","energie","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":51.747,"lng":4.097,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Súdwest-Fryslân","provincie":"Friesland","inwoners":90000,"themas":["woningbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","participatie","toerisme","krimp","organisatie"],"lat":52.94,"lng":5.651,"arbeidsmarktregio":"Friesland"},{"gemeente":"Leidschendam-Voorburg","provincie":"Zuid-Holland","inwoners":77000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.086,"lng":4.387,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Rijswijk","provincie":"Zuid-Holland","inwoners":52000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.04,"lng":4.323,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Wassenaar","provincie":"Zuid-Holland","inwoners":27000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":52.143,"lng":4.403,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Pijnacker-Nootdorp","provincie":"Zuid-Holland","inwoners":56000,"themas":["woningbouw","glastuinbouw","duurzaamheid","sociaal domein","jeugdzorg","bereikbaarheid","organisatie"],"lat":52.02,"lng":4.427,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Lansingerland","provincie":"Zuid-Holland","inwoners":62000,"themas":["woningbouw","glastuinbouw","duurzaamheid","sociaal domein","jeugdzorg","bereikbaarheid","organisatie"],"lat":52.0,"lng":4.567,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Zuidplas","provincie":"Zuid-Holland","inwoners":45000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.996,"lng":4.613,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Waddinxveen","provincie":"Zuid-Holland","inwoners":31000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.039,"lng":4.64,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Bodegraven-Reeuwijk","provincie":"Zuid-Holland","inwoners":35000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.082,"lng":4.74,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Krimpenerwaard","provincie":"Zuid-Holland","inwoners":56000,"themas":["woningbouw","veenweide","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.96,"lng":4.748,"arbeidsmarktregio":"Zuid-Holland"},{"gemeente":"Capelle aan den IJssel","provincie":"Zuid-Holland","inwoners":66000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid"],"lat":51.935,"lng":4.573,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Krimpen aan den IJssel","provincie":"Zuid-Holland","inwoners":29000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.918,"lng":4.594,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Barendrecht","provincie":"Zuid-Holland","inwoners":48000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":51.856,"lng":4.535,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Hendrik-Ido-Ambacht","provincie":"Zuid-Holland","inwoners":32000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.849,"lng":4.62,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Papendrecht","provincie":"Zuid-Holland","inwoners":32000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.833,"lng":4.698,"arbeidsmarktregio":"Drechtsteden"},{"gemeente":"Hardinxveld-Giessendam","provincie":"Zuid-Holland","inwoners":18000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.822,"lng":4.845,"arbeidsmarktregio":"Drechtsteden"},{"gemeente":"Sliedrecht","provincie":"Zuid-Holland","inwoners":25000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.837,"lng":4.772,"arbeidsmarktregio":"Drechtsteden"},{"gemeente":"Alblasserdam","provincie":"Zuid-Holland","inwoners":20000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.869,"lng":4.66,"arbeidsmarktregio":"Drechtsteden"},{"gemeente":"Ridderkerk","provincie":"Zuid-Holland","inwoners":46000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.872,"lng":4.597,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Albrandswaard","provincie":"Zuid-Holland","inwoners":26000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.875,"lng":4.443,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Maassluis","provincie":"Zuid-Holland","inwoners":33000,"themas":["woningbouw","haven","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","veiligheid"],"lat":51.921,"lng":4.251,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Midden-Delfland","provincie":"Zuid-Holland","inwoners":20000,"themas":["woningbouw","natuur","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.972,"lng":4.273,"arbeidsmarktregio":"Haaglanden"},{"gemeente":"Westvoorne","provincie":"Zuid-Holland","inwoners":14000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg"],"lat":51.897,"lng":4.07,"arbeidsmarktregio":"Rijnmond"},{"gemeente":"Hillegom","provincie":"Zuid-Holland","inwoners":22000,"themas":["woningbouw","bloementeelt","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.291,"lng":4.58,"arbeidsmarktregio":"Holland Rijnland"},{"gemeente":"Lisse","provincie":"Zuid-Holland","inwoners":23000,"themas":["woningbouw","toerisme","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.255,"lng":4.556,"arbeidsmarktregio":"Holland Rijnland"},{"gemeente":"Teylingen","provincie":"Zuid-Holland","inwoners":38000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.228,"lng":4.522,"arbeidsmarktregio":"Holland Rijnland"},{"gemeente":"Katwijk","provincie":"Zuid-Holland","inwoners":66000,"themas":["woningbouw","kust","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.2,"lng":4.406,"arbeidsmarktregio":"Holland Rijnland"},{"gemeente":"Utrecht","provincie":"Utrecht","inwoners":368000,"themas":["woningbouw","kennisstad","mobiliteit","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","inburgering","participatie","organisatieontwikkeling","financiën"],"lat":52.09,"lng":5.121,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Amersfoort","provincie":"Utrecht","inwoners":159000,"themas":["woningbouw","duurzaamheid","mobiliteit","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.156,"lng":5.388,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Veenendaal","provincie":"Utrecht","inwoners":66000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.027,"lng":5.559,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Nieuwegein","provincie":"Utrecht","inwoners":63000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.036,"lng":5.086,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"IJsselstein","provincie":"Utrecht","inwoners":34000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.018,"lng":5.046,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Zeist","provincie":"Utrecht","inwoners":63000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.088,"lng":5.234,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Houten","provincie":"Utrecht","inwoners":49000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.028,"lng":5.172,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Soest","provincie":"Utrecht","inwoners":45000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.176,"lng":5.289,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"De Bilt","provincie":"Utrecht","inwoners":43000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.108,"lng":5.183,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Woerden","provincie":"Utrecht","inwoners":52000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.088,"lng":4.887,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Stichtse Vecht","provincie":"Utrecht","inwoners":64000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.206,"lng":4.986,"arbeidsmarktregio":"Gooi en Vechtstreek"},{"gemeente":"Lopik","provincie":"Utrecht","inwoners":14000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.983,"lng":4.942,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Oudewater","provincie":"Utrecht","inwoners":10000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.024,"lng":4.875,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Montfoort","provincie":"Utrecht","inwoners":13000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.047,"lng":4.945,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Bunnik","provincie":"Utrecht","inwoners":15000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.068,"lng":5.199,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"De Ronde Venen","provincie":"Utrecht","inwoners":44000,"themas":["woningbouw","veenweide","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.196,"lng":4.855,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Vijfheerenlanden","provincie":"Utrecht","inwoners":57000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","HRM"],"lat":51.952,"lng":5.026,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Wijk bij Duurstede","provincie":"Utrecht","inwoners":24000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.978,"lng":5.339,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Utrechtse Heuvelrug","provincie":"Utrecht","inwoners":49000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.021,"lng":5.361,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Rhenen","provincie":"Utrecht","inwoners":20000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":51.961,"lng":5.571,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Eemnes","provincie":"Utrecht","inwoners":10000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":52.261,"lng":5.264,"arbeidsmarktregio":"Gooi en Vechtstreek"},{"gemeente":"Baarn","provincie":"Utrecht","inwoners":25000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":52.208,"lng":5.287,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Bunschoten","provincie":"Utrecht","inwoners":22000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.251,"lng":5.374,"arbeidsmarktregio":"Midden-Utrecht"},{"gemeente":"Eindhoven","provincie":"Noord-Brabant","inwoners":235000,"themas":["technologie","woningbouw","duurzaamheid","innovatie","sociaal domein","jeugdzorg","wmo","participatie","bereikbaarheid","organisatieontwikkeling","HRM"],"lat":51.441,"lng":5.478,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Tilburg","provincie":"Noord-Brabant","inwoners":224000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":51.561,"lng":5.083,"arbeidsmarktregio":"Midden-Brabant"},{"gemeente":"Breda","provincie":"Noord-Brabant","inwoners":184000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","bereikbaarheid","organisatie","HRM"],"lat":51.59,"lng":4.776,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"'s-Hertogenbosch","provincie":"Noord-Brabant","inwoners":155000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie","financiën"],"lat":51.688,"lng":5.304,"arbeidsmarktregio":"Noordoost-Brabant"},{"gemeente":"Helmond","provincie":"Noord-Brabant","inwoners":93000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.481,"lng":5.658,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Oss","provincie":"Noord-Brabant","inwoners":94000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.768,"lng":5.519,"arbeidsmarktregio":"Noordoost-Brabant"},{"gemeente":"Bergen op Zoom","provincie":"Noord-Brabant","inwoners":68000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.496,"lng":4.286,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Roosendaal","provincie":"Noord-Brabant","inwoners":77000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.531,"lng":4.463,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Waalwijk","provincie":"Noord-Brabant","inwoners":47000,"themas":["woningbouw","logistiek","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.698,"lng":5.068,"arbeidsmarktregio":"Midden-Brabant"},{"gemeente":"Meierijstad","provincie":"Noord-Brabant","inwoners":81000,"themas":["woningbouw","fusie","organisatieontwikkeling","duurzaamheid","sociaal domein","jeugdzorg","HRM","participatie"],"lat":51.622,"lng":5.456,"arbeidsmarktregio":"Noordoost-Brabant"},{"gemeente":"Bernheze","provincie":"Noord-Brabant","inwoners":32000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.682,"lng":5.547,"arbeidsmarktregio":"Noordoost-Brabant"},{"gemeente":"Veghel","provincie":"Noord-Brabant","inwoners":37000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.618,"lng":5.562,"arbeidsmarktregio":"Noord-Brabant"},{"gemeente":"Boxtel","provincie":"Noord-Brabant","inwoners":31000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.599,"lng":5.331,"arbeidsmarktregio":"Noord-Brabant"},{"gemeente":"Sint-Michielsgestel","provincie":"Noord-Brabant","inwoners":29000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.638,"lng":5.36,"arbeidsmarktregio":"Noord-Brabant"},{"gemeente":"Vught","provincie":"Noord-Brabant","inwoners":27000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","organisatie"],"lat":51.653,"lng":5.294,"arbeidsmarktregio":"Noord-Brabant"},{"gemeente":"Haaren","provincie":"Noord-Brabant","inwoners":14000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.582,"lng":5.243,"arbeidsmarktregio":"Midden-Brabant"},{"gemeente":"Oisterwijk","provincie":"Noord-Brabant","inwoners":26000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.581,"lng":5.201,"arbeidsmarktregio":"Midden-Brabant"},{"gemeente":"Hilvarenbeek","provincie":"Noord-Brabant","inwoners":15000,"themas":["woningbouw","natuur","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.484,"lng":5.14,"arbeidsmarktregio":"Midden-Brabant"},{"gemeente":"Dongen","provincie":"Noord-Brabant","inwoners":26000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.627,"lng":4.939,"arbeidsmarktregio":"Midden-Brabant"},{"gemeente":"Goirle","provincie":"Noord-Brabant","inwoners":24000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.524,"lng":5.066,"arbeidsmarktregio":"Midden-Brabant"},{"gemeente":"Etten-Leur","provincie":"Noord-Brabant","inwoners":44000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.566,"lng":4.64,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Halderberge","provincie":"Noord-Brabant","inwoners":30000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.543,"lng":4.529,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Zundert","provincie":"Noord-Brabant","inwoners":22000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.466,"lng":4.655,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Rucphen","provincie":"Noord-Brabant","inwoners":23000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.527,"lng":4.559,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Moerdijk","provincie":"Noord-Brabant","inwoners":37000,"themas":["haven","industrie","woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.697,"lng":4.614,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Drimmelen","provincie":"Noord-Brabant","inwoners":27000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.707,"lng":4.819,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Geertruidenberg","provincie":"Noord-Brabant","inwoners":21000,"themas":["woningbouw","energietransitie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.703,"lng":4.858,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Oosterhout","provincie":"Noord-Brabant","inwoners":55000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.64,"lng":4.857,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Gilze en Rijen","provincie":"Noord-Brabant","inwoners":27000,"themas":["woningbouw","defensie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.548,"lng":4.927,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Baarle-Nassau","provincie":"Noord-Brabant","inwoners":7000,"themas":["woningbouw","grensgebied","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.444,"lng":4.932,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Alphen-Chaam","provincie":"Noord-Brabant","inwoners":10000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.489,"lng":4.934,"arbeidsmarktregio":"West-Brabant"},{"gemeente":"Son en Breugel","provincie":"Noord-Brabant","inwoners":17000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie"],"lat":51.515,"lng":5.499,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Nuenen","provincie":"Noord-Brabant","inwoners":23000,"themas":["woningbouw","industrie","duurzaamheid","erfgoed","sociaal domein","jeugdzorg","organisatie"],"lat":51.472,"lng":5.547,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Geldrop-Mierlo","provincie":"Noord-Brabant","inwoners":39000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.422,"lng":5.561,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Heeze-Leende","provincie":"Noord-Brabant","inwoners":15000,"themas":["woningbouw","natuur","duurzaamheid","landbouw","sociaal domein","jeugdzorg"],"lat":51.384,"lng":5.58,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Cranendonck","provincie":"Noord-Brabant","inwoners":20000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.327,"lng":5.604,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Bladel","provincie":"Noord-Brabant","inwoners":20000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.372,"lng":5.225,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Eersel","provincie":"Noord-Brabant","inwoners":19000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.362,"lng":5.314,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Bergeijk","provincie":"Noord-Brabant","inwoners":18000,"themas":["woningbouw","duurzaamheid","natuur","landbouw","sociaal domein","jeugdzorg"],"lat":51.319,"lng":5.357,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Veldhoven","provincie":"Noord-Brabant","inwoners":45000,"themas":["woningbouw","industrie","ASML","duurzaamheid","sociaal domein","jeugdzorg","wmo","HRM","organisatie"],"lat":51.419,"lng":5.404,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Deurne","provincie":"Noord-Brabant","inwoners":32000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.458,"lng":5.779,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Asten","provincie":"Noord-Brabant","inwoners":17000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.401,"lng":5.751,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Someren","provincie":"Noord-Brabant","inwoners":19000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.389,"lng":5.71,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Laarbeek","provincie":"Noord-Brabant","inwoners":22000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.509,"lng":5.697,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Gemert-Bakel","provincie":"Noord-Brabant","inwoners":31000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.561,"lng":5.692,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Boekel","provincie":"Noord-Brabant","inwoners":10000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg"],"lat":51.611,"lng":5.68,"arbeidsmarktregio":"Noordoost-Brabant"},{"gemeente":"Landerd","provincie":"Noord-Brabant","inwoners":15000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.704,"lng":5.66,"arbeidsmarktregio":"Noord-Brabant"},{"gemeente":"Maashorst","provincie":"Noord-Brabant","inwoners":46000,"themas":["woningbouw","fusie","duurzaamheid","organisatieontwikkeling","sociaal domein","jeugdzorg","HRM"],"lat":51.69,"lng":5.63,"arbeidsmarktregio":"Noordoost-Brabant"},{"gemeente":"Horst aan de Maas","provincie":"Noord-Brabant","inwoners":42000,"themas":["woningbouw","glastuinbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.451,"lng":6.065,"arbeidsmarktregio":"Noord-Brabant"},{"gemeente":"Peel en Maas","provincie":"Limburg","inwoners":44000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.363,"lng":6.02,"arbeidsmarktregio":"Limburg"},{"gemeente":"Venray","provincie":"Limburg","inwoners":44000,"themas":["woningbouw","defensie","duurzaamheid","sociaal domein","jeugdzorg","zorg","participatie","organisatie"],"lat":51.536,"lng":5.974,"arbeidsmarktregio":"Limburg"},{"gemeente":"Gennep","provincie":"Limburg","inwoners":17000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","grensgebied","organisatie"],"lat":51.698,"lng":5.972,"arbeidsmarktregio":"Limburg"},{"gemeente":"Bergen L","provincie":"Limburg","inwoners":14000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg"],"lat":51.601,"lng":5.97,"arbeidsmarktregio":"Limburg"},{"gemeente":"Mook en Middelaar","provincie":"Limburg","inwoners":8000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.748,"lng":5.877,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Nijmegen","provincie":"Gelderland","inwoners":178000,"themas":["woningbouw","kennisstad","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie","HRM"],"lat":51.843,"lng":5.853,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Arnhem","provincie":"Gelderland","inwoners":163000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie","HRM"],"lat":51.985,"lng":5.899,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Apeldoorn","provincie":"Gelderland","inwoners":164000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.217,"lng":5.966,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Ede","provincie":"Gelderland","inwoners":118000,"themas":["woningbouw","voedsel","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":52.047,"lng":5.664,"arbeidsmarktregio":"Foodvalley"},{"gemeente":"Doetinchem","provincie":"Gelderland","inwoners":57000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.963,"lng":6.299,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Zutphen","provincie":"Gelderland","inwoners":47000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.148,"lng":6.196,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Harderwijk","provincie":"Gelderland","inwoners":48000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.348,"lng":5.624,"arbeidsmarktregio":"Noord-Veluwe"},{"gemeente":"Wageningen","provincie":"Gelderland","inwoners":40000,"themas":["kennisstad","woningbouw","duurzaamheid","voedsel","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.97,"lng":5.665,"arbeidsmarktregio":"Foodvalley"},{"gemeente":"Zevenaar","provincie":"Gelderland","inwoners":44000,"themas":["woningbouw","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.92,"lng":6.074,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Aalten","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.924,"lng":6.582,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Winterswijk","provincie":"Gelderland","inwoners":29000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":51.972,"lng":6.719,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Oost Gelre","provincie":"Gelderland","inwoners":30000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.946,"lng":6.52,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Berkelland","provincie":"Gelderland","inwoners":44000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":52.097,"lng":6.508,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Bronckhorst","provincie":"Gelderland","inwoners":37000,"themas":["woningbouw","duurzaamheid","landbouw","natuur","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.027,"lng":6.231,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Montferland","provincie":"Gelderland","inwoners":36000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.899,"lng":6.159,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Old IJsselstreek","provincie":"Gelderland","inwoners":39000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.875,"lng":6.43,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Lochem","provincie":"Gelderland","inwoners":34000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.159,"lng":6.413,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Brummen","provincie":"Gelderland","inwoners":21000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.091,"lng":6.159,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Voorst","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","natuur","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":52.2,"lng":6.11,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Heerde","provincie":"Gelderland","inwoners":18000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":52.391,"lng":5.922,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Epe","provincie":"Gelderland","inwoners":33000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.351,"lng":5.984,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Elburg","provincie":"Gelderland","inwoners":23000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.451,"lng":5.836,"arbeidsmarktregio":"Noord-Veluwe"},{"gemeente":"Nunspeet","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.386,"lng":5.79,"arbeidsmarktregio":"Noord-Veluwe"},{"gemeente":"Putten","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.268,"lng":5.597,"arbeidsmarktregio":"Noord-Veluwe"},{"gemeente":"Ermelo","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","natuur","zorg","sociaal domein","jeugdzorg","organisatie"],"lat":52.304,"lng":5.621,"arbeidsmarktregio":"Noord-Veluwe"},{"gemeente":"Barneveld","provincie":"Gelderland","inwoners":58000,"themas":["woningbouw","agrifood","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.139,"lng":5.586,"arbeidsmarktregio":"Foodvalley"},{"gemeente":"Scherpenzeel","provincie":"Gelderland","inwoners":10000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.09,"lng":5.49,"arbeidsmarktregio":"Foodvalley"},{"gemeente":"Renkum","provincie":"Gelderland","inwoners":31000,"themas":["woningbouw","duurzaamheid","erfgoed","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.961,"lng":5.736,"arbeidsmarktregio":"Foodvalley"},{"gemeente":"Rheden","provincie":"Gelderland","inwoners":43000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.017,"lng":6.029,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Rozendaal","provincie":"Gelderland","inwoners":1800,"themas":["woningbouw","natuur","duurzaamheid","sociaal domein"],"lat":52.001,"lng":5.993,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Overbetuwe","provincie":"Gelderland","inwoners":47000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.891,"lng":5.791,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Lingewaard","provincie":"Gelderland","inwoners":46000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.877,"lng":5.962,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"West Betuwe","provincie":"Gelderland","inwoners":53000,"themas":["woningbouw","fruitteelt","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.869,"lng":5.139,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Neder-Betuwe","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.872,"lng":5.462,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Buren","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","fruitteelt","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.897,"lng":5.349,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Maasdriel","provincie":"Gelderland","inwoners":24000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.779,"lng":5.16,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Zaltbommel","provincie":"Gelderland","inwoners":28000,"themas":["woningbouw","duurzaamheid","logistiek","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.822,"lng":5.244,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Tiel","provincie":"Gelderland","inwoners":42000,"themas":["woningbouw","duurzaamheid","fruitteelt","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.886,"lng":5.431,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Culemborg","provincie":"Gelderland","inwoners":28000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.946,"lng":5.229,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Geldermalsen","provincie":"Gelderland","inwoners":27000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.878,"lng":5.286,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Enschede","provincie":"Overijssel","inwoners":159000,"themas":["woningbouw","kennisstad","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":52.221,"lng":6.896,"arbeidsmarktregio":"Twente"},{"gemeente":"Zwolle","provincie":"Overijssel","inwoners":129000,"themas":["woningbouw","duurzaamheid","klimaat","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","bereikbaarheid","organisatie"],"lat":52.517,"lng":6.083,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Deventer","provincie":"Overijssel","inwoners":100000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.255,"lng":6.16,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Hengelo","provincie":"Overijssel","inwoners":80000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","HRM","organisatie"],"lat":52.266,"lng":6.793,"arbeidsmarktregio":"Twente"},{"gemeente":"Almelo","provincie":"Overijssel","inwoners":72000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":52.355,"lng":6.665,"arbeidsmarktregio":"Twente"},{"gemeente":"Oldenzaal","provincie":"Overijssel","inwoners":31000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.312,"lng":6.93,"arbeidsmarktregio":"Twente"},{"gemeente":"Haaksbergen","provincie":"Overijssel","inwoners":24000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","grensgebied","organisatie"],"lat":52.154,"lng":6.742,"arbeidsmarktregio":"Twente"},{"gemeente":"Borne","provincie":"Overijssel","inwoners":23000,"themas":["woningbouw","duurzaamheid","industrie","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.298,"lng":6.754,"arbeidsmarktregio":"Twente"},{"gemeente":"Losser","provincie":"Overijssel","inwoners":22000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","krimp","organisatie"],"lat":52.261,"lng":7.004,"arbeidsmarktregio":"Twente"},{"gemeente":"Dinkelland","provincie":"Overijssel","inwoners":26000,"themas":["woningbouw","landbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.376,"lng":6.991,"arbeidsmarktregio":"Twente"},{"gemeente":"Tubbergen","provincie":"Overijssel","inwoners":21000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","toerisme","organisatie"],"lat":52.407,"lng":6.778,"arbeidsmarktregio":"Twente"},{"gemeente":"Hellendoorn","provincie":"Overijssel","inwoners":36000,"themas":["woningbouw","duurzaamheid","industrie","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.393,"lng":6.452,"arbeidsmarktregio":"Twente"},{"gemeente":"Rijssen-Holten","provincie":"Overijssel","inwoners":38000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.296,"lng":6.519,"arbeidsmarktregio":"Twente"},{"gemeente":"Wierden","provincie":"Overijssel","inwoners":23000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.358,"lng":6.595,"arbeidsmarktregio":"Twente"},{"gemeente":"Twenterand","provincie":"Overijssel","inwoners":33000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.46,"lng":6.548,"arbeidsmarktregio":"Twente"},{"gemeente":"Oldambt","provincie":"Groningen","inwoners":38000,"themas":["woningbouw","duurzaamheid","krimp","sociaal domein","armoede","jeugdzorg","participatie","organisatie"],"lat":53.179,"lng":7.052,"arbeidsmarktregio":"Groningen"},{"gemeente":"Kampen","provincie":"Overijssel","inwoners":53000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.555,"lng":5.913,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Zwartewaterland","provincie":"Overijssel","inwoners":22000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.638,"lng":6.069,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Staphorst","provincie":"Overijssel","inwoners":17000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.636,"lng":6.209,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Steenwijkerland","provincie":"Overijssel","inwoners":44000,"themas":["woningbouw","toerisme","duurzaamheid","natuur","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.786,"lng":6.117,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Meppel","provincie":"Drenthe","inwoners":33000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.696,"lng":6.194,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Westerveld","provincie":"Drenthe","inwoners":19000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.829,"lng":6.311,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Hardenberg","provincie":"Overijssel","inwoners":60000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.578,"lng":6.617,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Ommen","provincie":"Overijssel","inwoners":18000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":52.518,"lng":6.421,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Dalfsen","provincie":"Overijssel","inwoners":28000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.507,"lng":6.26,"arbeidsmarktregio":"Zwolle"},{"gemeente":"Raalte","provincie":"Overijssel","inwoners":37000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.388,"lng":6.278,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Olst-Wijhe","provincie":"Overijssel","inwoners":18000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":52.338,"lng":6.114,"arbeidsmarktregio":"Stedendriehoek"},{"gemeente":"Hof van Twente","provincie":"Overijssel","inwoners":35000,"themas":["woningbouw","industrie","natuur","duurzaamheid","sociaal domein","jeugdzorg","participatie","toerisme","organisatie"],"lat":52.222,"lng":6.616,"arbeidsmarktregio":"Twente"},{"gemeente":"Groningen","provincie":"Groningen","inwoners":234000,"themas":["woningbouw","kennisstad","aardbevingen","duurzaamheid","energie","sociaal domein","jeugdzorg","wmo","participatie","krimp","organisatie"],"lat":53.219,"lng":6.567,"arbeidsmarktregio":"Groningen"},{"gemeente":"Emmen","provincie":"Drenthe","inwoners":108000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","krimp","veiligheid","organisatie"],"lat":52.787,"lng":6.899,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Assen","provincie":"Drenthe","inwoners":68000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie","HRM"],"lat":52.993,"lng":6.562,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Hoogeveen","provincie":"Drenthe","inwoners":55000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":52.729,"lng":6.479,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Midden-Groningen","provincie":"Groningen","inwoners":61000,"themas":["woningbouw","aardbevingen","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","krimp","organisatie"],"lat":53.112,"lng":6.797,"arbeidsmarktregio":"Groningen"},{"gemeente":"Westerkwartier","provincie":"Groningen","inwoners":64000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","krimp","participatie","organisatie"],"lat":53.165,"lng":6.34,"arbeidsmarktregio":"Groningen"},{"gemeente":"Het Hogeland","provincie":"Groningen","inwoners":49000,"themas":["woningbouw","aardbevingen","duurzaamheid","landbouw","energie","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":53.379,"lng":6.568,"arbeidsmarktregio":"Groningen"},{"gemeente":"Eemsdelta","provincie":"Groningen","inwoners":46000,"themas":["woningbouw","aardbevingen","haven","duurzaamheid","waterstof","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":53.343,"lng":6.906,"arbeidsmarktregio":"Groningen"},{"gemeente":"Veendam","provincie":"Groningen","inwoners":28000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","krimp","organisatie"],"lat":53.107,"lng":6.876,"arbeidsmarktregio":"Groningen"},{"gemeente":"Pekela","provincie":"Groningen","inwoners":12000,"themas":["woningbouw","krimp","duurzaamheid","sociaal domein","jeugdzorg","armoede","organisatie"],"lat":53.097,"lng":6.993,"arbeidsmarktregio":"Groningen"},{"gemeente":"Stadskanaal","provincie":"Groningen","inwoners":32000,"themas":["woningbouw","krimp","duurzaamheid","sociaal domein","jeugdzorg","armoede","participatie","organisatie"],"lat":52.987,"lng":7.0,"arbeidsmarktregio":"Groningen"},{"gemeente":"Borger-Odoorn","provincie":"Drenthe","inwoners":25000,"themas":["woningbouw","landbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":52.912,"lng":6.793,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Coevorden","provincie":"Drenthe","inwoners":36000,"themas":["woningbouw","grensgebied","logistiek","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.661,"lng":6.747,"arbeidsmarktregio":"Drenthe"},{"gemeente":"De Wolden","provincie":"Drenthe","inwoners":24000,"themas":["woningbouw","landbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":52.673,"lng":6.367,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Tynaarlo","provincie":"Drenthe","inwoners":34000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":53.066,"lng":6.629,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Noordenveld","provincie":"Drenthe","inwoners":31000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":53.117,"lng":6.449,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Aa en Hunze","provincie":"Drenthe","inwoners":25000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":53.003,"lng":6.741,"arbeidsmarktregio":"Drenthe"},{"gemeente":"Leeuwarden","provincie":"Friesland","inwoners":125000,"themas":["woningbouw","cultuur","duurzaamheid","Fries","sociaal domein","jeugdzorg","wmo","participatie","krimp","veiligheid","organisatie"],"lat":53.201,"lng":5.799,"arbeidsmarktregio":"Friesland"},{"gemeente":"Smallingerland","provincie":"Friesland","inwoners":56000,"themas":["woningbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","wmo","participatie","krimp","organisatie"],"lat":53.113,"lng":6.114,"arbeidsmarktregio":"Friesland"},{"gemeente":"Heerenveen","provincie":"Friesland","inwoners":50000,"themas":["woningbouw","sport","duurzaamheid","Fries","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":52.961,"lng":5.923,"arbeidsmarktregio":"Friesland"},{"gemeente":"Weststellingwerf","provincie":"Friesland","inwoners":26000,"themas":["woningbouw","natuur","duurzaamheid","krimp","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.877,"lng":6.003,"arbeidsmarktregio":"Friesland"},{"gemeente":"Opsterland","provincie":"Friesland","inwoners":30000,"themas":["woningbouw","natuur","duurzaamheid","krimp","sociaal domein","jeugdzorg","organisatie"],"lat":53.034,"lng":6.052,"arbeidsmarktregio":"Friesland"},{"gemeente":"Ooststellingwerf","provincie":"Friesland","inwoners":26000,"themas":["woningbouw","natuur","duurzaamheid","krimp","sociaal domein","jeugdzorg","organisatie"],"lat":52.987,"lng":6.257,"arbeidsmarktregio":"Friesland"},{"gemeente":"De Fryske Marren","provincie":"Friesland","inwoners":51000,"themas":["woningbouw","toerisme","natuur","duurzaamheid","Fries","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":52.837,"lng":5.752,"arbeidsmarktregio":"Friesland"},{"gemeente":"Noardeast-Fryslân","provincie":"Friesland","inwoners":45000,"themas":["woningbouw","krimp","duurzaamheid","landbouw","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.332,"lng":5.972,"arbeidsmarktregio":"Friesland"},{"gemeente":"Dantumadiel","provincie":"Friesland","inwoners":19000,"themas":["woningbouw","krimp","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.307,"lng":5.979,"arbeidsmarktregio":"Friesland"},{"gemeente":"Tytsjerksteradiel","provincie":"Friesland","inwoners":32000,"themas":["woningbouw","duurzaamheid","natuur","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.212,"lng":5.99,"arbeidsmarktregio":"Friesland"},{"gemeente":"Achtkarspelen","provincie":"Friesland","inwoners":28000,"themas":["woningbouw","krimp","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.213,"lng":6.104,"arbeidsmarktregio":"Friesland"},{"gemeente":"Harlingen","provincie":"Friesland","inwoners":16000,"themas":["haven","woningbouw","krimp","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":53.174,"lng":5.42,"arbeidsmarktregio":"Friesland"},{"gemeente":"Waadhoeke","provincie":"Friesland","inwoners":46000,"themas":["woningbouw","landbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.181,"lng":5.621,"arbeidsmarktregio":"Friesland"},{"gemeente":"Franekeradeel","provincie":"Friesland","inwoners":20000,"themas":["woningbouw","duurzaamheid","Fries","sociaal domein","jeugdzorg","organisatie"],"lat":53.187,"lng":5.543,"arbeidsmarktregio":"Friesland"},{"gemeente":"Maastricht","provincie":"Limburg","inwoners":121000,"themas":["woningbouw","kennisstad","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","toerisme","organisatie"],"lat":50.851,"lng":5.69,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Heerlen","provincie":"Limburg","inwoners":88000,"themas":["woningbouw","duurzaamheid","krimp","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","HRM","organisatie"],"lat":50.89,"lng":5.979,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Sittard-Geleen","provincie":"Limburg","inwoners":93000,"themas":["woningbouw","chemie","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","armoede","participatie","krimp","veiligheid","organisatie"],"lat":51.0,"lng":5.871,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Venlo","provincie":"Limburg","inwoners":101000,"themas":["woningbouw","logistiek","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.37,"lng":6.172,"arbeidsmarktregio":"Noord-Limburg"},{"gemeente":"Roermond","provincie":"Limburg","inwoners":58000,"themas":["woningbouw","duurzaamheid","grensgebied","outlet","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.193,"lng":5.993,"arbeidsmarktregio":"Midden-Limburg"},{"gemeente":"Weert","provincie":"Limburg","inwoners":50000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.254,"lng":5.712,"arbeidsmarktregio":"Midden-Limburg"},{"gemeente":"Kerkrade","provincie":"Limburg","inwoners":45000,"themas":["woningbouw","duurzaamheid","krimp","grensgebied","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":50.87,"lng":6.067,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Brunssum","provincie":"Limburg","inwoners":28000,"themas":["woningbouw","duurzaamheid","krimp","defensie","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":50.948,"lng":5.985,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Landgraaf","provincie":"Limburg","inwoners":37000,"themas":["woningbouw","duurzaamheid","krimp","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":50.905,"lng":6.025,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Beekdaelen","provincie":"Limburg","inwoners":36000,"themas":["woningbouw","fusie","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","organisatie","HRM"],"lat":50.918,"lng":5.927,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Voerendaal","provincie":"Limburg","inwoners":12000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":50.878,"lng":5.935,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Nuth","provincie":"Limburg","inwoners":15000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":50.912,"lng":5.888,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Stein","provincie":"Limburg","inwoners":25000,"themas":["woningbouw","duurzaamheid","krimp","grensgebied","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":50.966,"lng":5.763,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Maasgouw","provincie":"Limburg","inwoners":24000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.17,"lng":5.882,"arbeidsmarktregio":"Midden-Limburg"},{"gemeente":"Roerdalen","provincie":"Limburg","inwoners":21000,"themas":["woningbouw","duurzaamheid","natuur","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.138,"lng":6.055,"arbeidsmarktregio":"Midden-Limburg"},{"gemeente":"Leudal","provincie":"Limburg","inwoners":36000,"themas":["woningbouw","duurzaamheid","natuur","landbouw","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.289,"lng":5.89,"arbeidsmarktregio":"Midden-Limburg"},{"gemeente":"Nederhussum","provincie":"Limburg","inwoners":8000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":51.25,"lng":5.85,"arbeidsmarktregio":"Limburg"},{"gemeente":"Beesel","provincie":"Limburg","inwoners":13000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","organisatie"],"lat":51.267,"lng":6.043,"arbeidsmarktregio":"Midden-Limburg"},{"gemeente":"Gulpen-Wittem","provincie":"Limburg","inwoners":14000,"themas":["woningbouw","toerisme","natuur","duurzaamheid","grensgebied","sociaal domein","jeugdzorg"],"lat":50.812,"lng":5.893,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Eijsden-Margraten","provincie":"Limburg","inwoners":25000,"themas":["woningbouw","grensgebied","toerisme","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":50.779,"lng":5.729,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Meerssen","provincie":"Limburg","inwoners":19000,"themas":["woningbouw","duurzaamheid","grensgebied","sociaal domein","jeugdzorg","organisatie"],"lat":50.877,"lng":5.754,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Simpelveld","provincie":"Limburg","inwoners":11000,"themas":["woningbouw","krimp","duurzaamheid","grensgebied","sociaal domein","jeugdzorg"],"lat":50.836,"lng":5.982,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Vaals","provincie":"Limburg","inwoners":10000,"themas":["toerisme","grensgebied","woningbouw","duurzaamheid","sociaal domein","jeugdzorg"],"lat":50.771,"lng":6.02,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Valkenburg aan de Geul","provincie":"Limburg","inwoners":17000,"themas":["toerisme","woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg"],"lat":50.864,"lng":5.831,"arbeidsmarktregio":"Zuid-Limburg"},{"gemeente":"Middelburg","provincie":"Zeeland","inwoners":48000,"themas":["woningbouw","toerisme","duurzaamheid","delta","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.499,"lng":3.614,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Goes","provincie":"Zeeland","inwoners":38000,"themas":["woningbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","wmo","participatie","organisatie"],"lat":51.506,"lng":3.889,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Terneuzen","provincie":"Zeeland","inwoners":55000,"themas":["haven","industrie","woningbouw","duurzaamheid","grensgebied","waterstof","sociaal domein","jeugdzorg","wmo","participatie","krimp","organisatie"],"lat":51.336,"lng":3.831,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Vlissingen","provincie":"Zeeland","inwoners":44000,"themas":["haven","woningbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","wmo","armoede","participatie","veiligheid","organisatie"],"lat":51.455,"lng":3.572,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Hulst","provincie":"Zeeland","inwoners":27000,"themas":["woningbouw","grensgebied","duurzaamheid","natuur","sociaal domein","jeugdzorg","krimp","organisatie"],"lat":51.279,"lng":4.044,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Sluis","provincie":"Zeeland","inwoners":23000,"themas":["toerisme","woningbouw","grensgebied","duurzaamheid","krimp","sociaal domein","jeugdzorg","organisatie"],"lat":51.307,"lng":3.388,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Noord-Beveland","provincie":"Zeeland","inwoners":7000,"themas":["toerisme","duurzaamheid","delta","natuur","sociaal domein","woningbouw"],"lat":51.581,"lng":3.765,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Schouwen-Duiveland","provincie":"Zeeland","inwoners":34000,"themas":["toerisme","woningbouw","duurzaamheid","delta","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":51.663,"lng":3.883,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Tholen","provincie":"Zeeland","inwoners":26000,"themas":["woningbouw","landbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","organisatie"],"lat":51.53,"lng":4.214,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Kapelle","provincie":"Zeeland","inwoners":13000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.491,"lng":3.957,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Reimerswaal","provincie":"Zeeland","inwoners":22000,"themas":["woningbouw","landbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","organisatie"],"lat":51.436,"lng":4.012,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Borsele","provincie":"Zeeland","inwoners":23000,"themas":["energie","kernenergie","woningbouw","duurzaamheid","delta","sociaal domein","jeugdzorg","organisatie"],"lat":51.437,"lng":3.748,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Veere","provincie":"Zeeland","inwoners":22000,"themas":["toerisme","duurzaamheid","delta","natuur","woningbouw","sociaal domein","jeugdzorg"],"lat":51.554,"lng":3.667,"arbeidsmarktregio":"Zeeland"},{"gemeente":"Almere","provincie":"Flevoland","inwoners":216000,"themas":["woningbouw","groeistad","duurzaamheid","bereikbaarheid","sociaal domein","jeugdzorg","wmo","participatie","diversiteit","HRM","organisatie"],"lat":52.374,"lng":5.219,"arbeidsmarktregio":"Flevoland"},{"gemeente":"Lelystad","provincie":"Flevoland","inwoners":78000,"themas":["woningbouw","luchthaven","duurzaamheid","sociaal domein","jeugdzorg","wmo","armoede","participatie","organisatie"],"lat":52.518,"lng":5.472,"arbeidsmarktregio":"Flevoland"},{"gemeente":"Dronten","provincie":"Flevoland","inwoners":42000,"themas":["woningbouw","landbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.522,"lng":5.716,"arbeidsmarktregio":"Flevoland"},{"gemeente":"Noordoostpolder","provincie":"Flevoland","inwoners":47000,"themas":["woningbouw","landbouw","duurzaamheid","energie","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.734,"lng":5.754,"arbeidsmarktregio":"Flevoland"},{"gemeente":"Urk","provincie":"Flevoland","inwoners":21000,"themas":["woningbouw","visserij","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":52.663,"lng":5.602,"arbeidsmarktregio":"Flevoland"},{"gemeente":"Zeewolde","provincie":"Flevoland","inwoners":23000,"themas":["woningbouw","natuur","duurzaamheid","datacenter","energie","sociaal domein","jeugdzorg","organisatie"],"lat":52.327,"lng":5.543,"arbeidsmarktregio":"Flevoland"},{"gemeente":"Waalre","provincie":"Noord-Brabant","inwoners":17000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.389,"lng":5.464,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Best","provincie":"Noord-Brabant","inwoners":30000,"themas":["woningbouw","industrie","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.511,"lng":5.397,"arbeidsmarktregio":"Zuidoost-Brabant"},{"gemeente":"Oirschot","provincie":"Noord-Brabant","inwoners":18000,"themas":["woningbouw","landbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg","organisatie"],"lat":51.504,"lng":5.3,"arbeidsmarktregio":"Noord-Brabant"},{"gemeente":"Druten","provincie":"Gelderland","inwoners":18000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.879,"lng":5.604,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Duiven","provincie":"Gelderland","inwoners":26000,"themas":["woningbouw","duurzaamheid","logistiek","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.946,"lng":6.025,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Westervoort","provincie":"Gelderland","inwoners":15000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","veiligheid","organisatie"],"lat":51.96,"lng":5.973,"arbeidsmarktregio":"Midden-Gelderland"},{"gemeente":"Lingewaal","provincie":"Gelderland","inwoners":12000,"themas":["woningbouw","duurzaamheid","landbouw","sociaal domein","jeugdzorg","organisatie"],"lat":51.852,"lng":5.072,"arbeidsmarktregio":"Gelderland"},{"gemeente":"Doesburg","provincie":"Gelderland","inwoners":11000,"themas":["woningbouw","duurzaamheid","erfgoed","sociaal domein","jeugdzorg","organisatie"],"lat":52.015,"lng":6.138,"arbeidsmarktregio":"Achterhoek"},{"gemeente":"Heumen","provincie":"Gelderland","inwoners":16000,"themas":["woningbouw","duurzaamheid","natuur","sociaal domein","jeugdzorg","organisatie"],"lat":51.795,"lng":5.836,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Wijchen","provincie":"Gelderland","inwoners":42000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","wmo","participatie","veiligheid","organisatie"],"lat":51.806,"lng":5.726,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Beuningen","provincie":"Gelderland","inwoners":26000,"themas":["woningbouw","duurzaamheid","sociaal domein","jeugdzorg","participatie","organisatie"],"lat":51.862,"lng":5.764,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Groesbeek","provincie":"Gelderland","inwoners":19000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg","organisatie"],"lat":51.777,"lng":5.944,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Millingen aan de Rijn","provincie":"Gelderland","inwoners":6000,"themas":["woningbouw","natuur","duurzaamheid","sociaal domein","jeugdzorg"],"lat":51.864,"lng":6.045,"arbeidsmarktregio":"Rijk van Nijmegen"},{"gemeente":"Ubbergen","provincie":"Gelderland","inwoners":10000,"themas":["woningbouw","natuur","duurzaamheid","toerisme","sociaal domein","jeugdzorg"],"lat":51.837,"lng":5.937,"arbeidsmarktregio":"Rijk van Nijmegen"}];

// ── Constanten ───────────────────────────────────────────────────────────────
const PROV_KLEUREN = {
  "Noord-Holland":"#1565C0","Zuid-Holland":"#2E7D32","Utrecht":"#6A1B9A",
  "Noord-Brabant":"#E65100","Gelderland":"#00695C","Overijssel":"#4527A0",
  "Groningen":"#AD1457","Drenthe":"#558B2F","Friesland":"#0277BD",
  "Limburg":"#6D4C41","Zeeland":"#00838F","Flevoland":"#F57F17"
};

const ARBEIDSMARKT_KLEUREN = {
  "Amsterdam":"#1565C0","Rijnmond":"#2E7D32","Haaglanden":"#6A1B9A",
  "Midden-Utrecht":"#E65100","Twente":"#4527A0","Zwolle":"#AD1457",
  "Groningen":"#558B2F","Noord-Holland Noord":"#0277BD","Friesland":"#6D4C41",
  "Drenthe":"#00838F","Zuidoost-Brabant":"#F57F17","West-Brabant":"#C62828",
  "Midden-Brabant":"#4A148C","Noordoost-Brabant":"#1B5E20",
  "Zuid-Limburg":"#BF360C","Midden-Gelderland":"#006064",
  "Stedendriehoek":"#4527A0","Achterhoek":"#827717","Foodvalley":"#1A237E",
  "Zeeland":"#004D40","Flevoland":"#F57F17","Drechtsteden":"#880E4F",
  "Holland Rijnland":"#01579B","Gooi en Vechtstreek":"#33691E",
  "Zuid-Kennemerland/IJmond":"#4E342E","Rijk van Nijmegen":"#37474F",
  "Noord-Veluwe":"#558B2F","Friesland":"#0277BD","Midden-Limburg":"#E65100",
  "Noord-Limburg":"#6D4C41"
};

const BEGROTINGS_MOMENTEN = [
  { maand:1, naam:"Januari", fase:"Kadernota voorbereiding", kans:"Hoog", icon:"🟡",
    beschrijving:"Gemeenten starten voorbereiding kadernota. Goed moment voor eerste contact.",
    actie:"Bel contacten bij gemeenten met hoge matchscore. Vraag naar planning nieuwe programmas." },
  { maand:3, naam:"Maart", fase:"Coalitieakkoord uitvoering Q1", kans:"Hoog", icon:"🟠",
    beschrijving:"Q1: coalitieakkoord wordt vertaald naar programmaplannen en organisatie-inrichting.",
    actie:"Actiefste wervingsperiode. Gemeenten zoeken interimmers voor nieuwe programmas." },
  { maand:5, naam:"Mei/Juni", fase:"Kadernota gepubliceerd", kans:"Zeer hoog", icon:"🔴",
    beschrijving:"Publicatie kadernota. Budgetten vastgesteld. Directe koppeling aan vacatures.",
    actie:"Monitor officielebekendmakingen.nl op kadernota's. Piekmoment voor opdrachten." },
  { maand:7, naam:"Juli/Augustus", fase:"Begrotingsvoorbereiding", kans:"Gemiddeld", icon:"🟡",
    beschrijving:"Ambtelijke voorbereiding programmabegroting. Capaciteitsknelpunten worden zichtbaar.",
    actie:"Proactieve benadering: bied oplossingen voor capaciteitstekorten aan." },
  { maand:9, naam:"September", fase:"Programmabegroting gepubliceerd", kans:"Zeer hoog", icon:"🔴",
    beschrijving:"Begroting aangeboden aan raad. Budgetten definitief. Vacatures volgen direct.",
    actie:"Analyseer gepubliceerde begrotingen. Koppel budgetten aan CTMH-profielen." },
  { maand:11, naam:"November", fase:"Begrotingsvaststelling raad", kans:"Hoog", icon:"🟠",
    beschrijving:"Raad stelt begroting vast. Opdrachten voor volgend jaar worden concreet.",
    actie:"Zorg dat CTMH top-of-mind is. Follow-up op eerdere gesprekken." },
];

const CTMH_PROFIELEN = [
  { id:"sociaal", label:"Sociaal Domein", kleur:"#7a98ad", icon:"👥",
    keywords:["jeugd","jeugdzorg","wmo","zorg","participatie","armoede","schulden",
      "bijstand","re-integratie","inclusie","welzijn","mantelzorg","daklozen",
      "beschermd wonen","inburgering","statushouders","schuldhulpverlening",
      "vroeg signalering","preventie","vrijwilligers","sociaal domein","sociaal"],
    rollen:["Manager Sociaal Domein","Beleidsadviseur Jeugd","Projectleider WMO",
      "Kwartiermaker Inclusie","Adviseur Participatiewet","Manager Werk & Inkomen"]
  },
  { id:"ruimtelijk", label:"Ruimtelijk Domein", kleur:"#8c6848", icon:"🏗️",
    keywords:["wonen","woningbouw","omgevingswet","bestemmingsplan","bouwen","vergunning",
      "duurzaamheid","klimaat","energietransitie","nieuwbouw","omgevingsvisie",
      "bereikbaarheid","mobiliteit","infrastructuur","stikstof","natuur","groen",
      "milieu","water","openbare ruimte","aardgasvrij","klimaatadaptatie",
      "wateroverlast","energie","landbouw","glastuinbouw","aardbevingen"],
    rollen:["Omgevingsjurist","Projectleider Woningbouw","Adviseur Duurzaamheid",
      "Manager Ruimtelijk Domein","Programmamanager Energietransitie","Beleidsadviseur Klimaat"]
  },
  { id:"bestuur", label:"Bestuurszaken", kleur:"#68749c", icon:"🏛️",
    keywords:["bestuur","gemeentesecretaris","griffie","rekenkamer","raad","college",
      "organisatieontwikkeling","transformatie","samenwerking","regionale samenwerking",
      "fusie","bestuurssecretaris","bestuursadviseur","communicatie","burgerparticipatie",
      "dienstverlening","digitalisering","integriteit","juridisch","bezwaar","organisatie"],
    rollen:["Gemeentesecretaris a.i.","Bestuurssecretaris","Organisatieadviseur",
      "Programmasecretaris","Griffier a.i.","Adviseur Bestuurlijke Samenwerking"]
  },
  { id:"hrm", label:"HRM & Organisatie", kleur:"#eb7e13", icon:"🧑‍💼",
    keywords:["personeel","hrm","hr","arbeidsmarkt","werving","selectie","opleiding",
      "ontwikkeling","diversiteit","verzuim","formatie","capaciteit","instroom",
      "arbeidsvoorwaarden","cao","cultuurverandering","leiderschap","talentontwikkeling",
      "vakmanschap","HRM"],
    rollen:["HR-Adviseur","P&O Adviseur","Manager HRM","Adviseur Arbeidsmarkt",
      "Programmamanager Organisatieontwikkeling","Recruiter Publiek Domein"]
  },
  { id:"financien", label:"Financien & Control", kleur:"#8c6848", icon:"💰",
    keywords:["financiën","begroting","bezuiniging","financieel","controller","accountant",
      "audit","rechtmatigheid","subsidie","grondexploitatie","treasury",
      "financieel beleid","meerjarenbegroting","ombuigingen","taakstelling","grondbeleid"],
    rollen:["Controller","Financieel Adviseur","Hoofd Financiën","Concerncontroller",
      "Programmamanager Financiën","Adviseur Grondbeleid"]
  },
  { id:"veiligheid", label:"Veiligheid & Handhaving", kleur:"#68749c", icon:"🛡️",
    keywords:["veiligheid","handhaving","boa","politie","brandweer","crisisbeheersing",
      "ondermijning","radicalisering","openbare orde","evenementen","toezicht",
      "integraal veiligheidsbeleid","buurtpreventie","drugsoverlast"],
    rollen:["Adviseur OOV","Programmamanager Veiligheid","Coördinator Handhaving",
      "Beleidsadviseur Veiligheid"]
  }
];

const CTMH_MENSEN = [
  { id:"wim", naam:"Wim van Twuijver", rol:"Directeur & Gemeentesecretaris a.i.",
    initialen:"WvT", kleur:"#eb7e13", avatar:"🏛️",
    expertise:["bestuur","gemeentesecretaris","organisatieontwikkeling","fusie","hrm","financiën"],
    profielen:["bestuur","hrm","financien"],
    bio:"Directeur CTMH. Voormalig gemeentesecretaris bij Hollands Kroon, Drechterland, Stede Broec en Enkhuizen (SED).",
    regio:"Noord-Holland", beschikbaar:true },
  { id:"jeroen", naam:"Jeroen van Duijnhoven", rol:"Senior HR-adviseur & Organisatieadviseur",
    initialen:"JvD", kleur:"#8c6848", avatar:"🧑‍💼",
    expertise:["hrm","organisatieontwikkeling","verandermanagement","cultuurverandering","werving"],
    profielen:["hrm","bestuur"],
    bio:"Bedrijfskundige met ruime ervaring in strategische HR-advisering en verandertrajecten bij gemeenten.",
    regio:"Noord-Holland / Landelijk", beschikbaar:true },
  { id:"anne", naam:"Wim van Twuijver", rol:"Organisatieadviseur & Bestuurssecretaris",
    initialen:"AM", kleur:"#68749c", avatar:"🏛️",
    expertise:["organisatieontwikkeling","bestuur","bestuurssecretaris","procesbegeleiding","projectleider"],
    profielen:["bestuur","hrm"],
    bio:"Jarenlange ervaring in adviseren bij organisatieontwikkeling. Inzetbaar als regisseur, projectleider of directiesecretaris.",
    regio:"Landelijk", beschikbaar:true },
  { id:"daan", naam:"Daan van Gulik", rol:"Adviseur & Projectleider Ruimtelijk / Bestuur",
    initialen:"DvG", kleur:"#7a98ad", avatar:"🏗️",
    expertise:["duurzaamheid","participatie","omgevingsbeleid","ruimtelijk domein","klimaat","natuur","Programma Landelijk Gebied"],
    profielen:["ruimtelijk","bestuur","sociaal"],
    bio:"Analytisch sterk, bestuurlijk sensitief. Specialisme in duurzaamheid, participatie en Programma Landelijk Gebied.",
    regio:"Landelijk / Friesland", beschikbaar:true },
  { id:"femke", naam:"Femke Sleegers", rol:"Interimmanager / Adviseur Publiek Domein",
    initialen:"FS", kleur:"#eb7e13", avatar:"🔗",
    expertise:["interimmanagement","gemeenschappelijke regelingen","waterschappen","verbinding","procesmanagement"],
    profielen:["bestuur","sociaal","hrm"],
    bio:"Interimmanager-adviseur met brede ervaring bij gemeenten, gemeenschappelijke regelingen en waterschappen. Actief in Brabant.",
    regio:"Noord-Brabant / Landelijk", beschikbaar:true },
  { id:"frank", naam:"Frank", rol:"Projectleider & Adviseur",
    initialen:"F", kleur:"#8c6848", avatar:"📋",
    expertise:["projectleider","adviseur","innovatie","verbinder","beleid","complexe omgeving"],
    profielen:["bestuur","ruimtelijk"],
    bio:"Projectleider en adviseur op diverse beleidsterreinen. Schakelt in complexe omgevingen, verbinder met charme.",
    regio:"Landelijk", beschikbaar:true },
  { id:"marleen", naam:"Marleen Specht-Althuizen", rol:"Programmamanager Ruimtelijk Domein",
    initialen:"MS", kleur:"#7a98ad", avatar:"🏗️",
    expertise:["ruimtelijk domein","programmamanager","woningbouw","gebiedsontwikkeling","energietransitie"],
    profielen:["ruimtelijk"],
    bio:"Bewezen programmamanager en projectleider in het ruimtelijk domein. Strategisch inzicht met hands-on mentaliteit.",
    regio:"Landelijk", beschikbaar:true },
  { id:"iman", naam:"Iman Biesheuvel", rol:"Projectleider Economie & Gebiedsontwikkeling",
    initialen:"IB", kleur:"#8c6848", avatar:"💰",
    expertise:["economie","gebiedsontwikkeling","bedrijventerreinen","grondbeleid","stedelijke economie"],
    profielen:["ruimtelijk","financien"],
    bio:"Projectleider economie bij o.a. Amsterdam Stadsdeel West. Specialisme in bedrijventerreinen en gebiedsontwikkeling.",
    regio:"Randstad", beschikbaar:false },
  { id:"anton", naam:"Anton", rol:"Adviseur / Casemanager Sociaal Domein",
    initialen:"A", kleur:"#68749c", avatar:"👥",
    expertise:["sociaal domein","casemanager","jeugdzorg","wmo","participatie","sociale vraagstukken"],
    profielen:["sociaal"],
    bio:"Daadkrachtige professional in het sociaal domein. Combineert vakkennis met sterke focus op samenwerking.",
    regio:"Landelijk", beschikbaar:true },
  { id:"noa", naam:"Noa Huibers", rol:"Junior Adviseur Sociaal Domein",
    initialen:"NH", kleur:"#eb7e13", avatar:"👥",
    expertise:["sociaal domein","beleid","participatie","jeugd","welzijn","onderzoek"],
    profielen:["sociaal"],
    bio:"Afgestudeerde professional klaar voor het sociaal domein bij publieke organisaties. Frisse blik, stevige basis.",
    regio:"Landelijk", beschikbaar:true },
  { id:"suzanne", naam:"Suzanne Barnhoorn-Bakker", rol:"Adviseur Bestuur & Organisatie",
    initialen:"SB", kleur:"#7a98ad", avatar:"🏛️",
    expertise:["bestuur","bestuurssecretaris","organisatie","advies","ondersteuning","interim"],
    profielen:["bestuur","hrm"],
    bio:"Adviseur bestuur en organisatie met ervaring in bestuurlijke ondersteuning en organisatieontwikkeling.",
    regio:"Landelijk", beschikbaar:true },
  { id:"esmee", naam:"Esmee", rol:"Juridisch Adviseur",
    initialen:"E", kleur:"#68749c", avatar:"⚖️",
    expertise:["juridisch","handhaving","bezwaar","omgevingsrecht","veiligheid","bestuur"],
    profielen:["veiligheid","bestuur"],
    bio:"Scherp analytisch inzicht, sterk verantwoordelijkheidsgevoel. Verbindt juridische en maatschappelijke vraagstukken.",
    regio:"Landelijk", beschikbaar:true },
  { id:"hans", naam:"Hans Luiten", rol:"Docent & Adviseur Bestuurskunde",
    initialen:"HL", kleur:"#8c6848", avatar:"🎓",
    expertise:["bestuurskunde","beleid","wethouder","stadsdeelvoorzitter","politiek","masterclass"],
    profielen:["bestuur"],
    bio:"Docent beleids- en bestuurskunde met praktijkervaring als wethouder en stadsdeelvoorzitter. Geeft masterclass bij CTMH.",
    regio:"Landelijk", beschikbaar:true },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function berekenMatch(g) {
  return CTMH_PROFIELEN.map(profiel => {
    let hits = 0; const gevonden = [];
    for (const kw of profiel.keywords) {
      if (g.themas.some(t => t.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(t.toLowerCase()))) {
        hits++; gevonden.push(kw);
      }
    }
    const pct = Math.min(Math.round((hits / profiel.keywords.length) * 100 * 2.5), 96);
    return { ...profiel, pct, gevondenKeywords: gevonden };
  }).sort((a,b) => b.pct - a.pct);
}

function berekenPersoonMatch(persoon, analyses) {
  let totaal = 0, max = 0; const domeinen = [];
  for (const pid of persoon.profielen) {
    const a = analyses.find(x => x.id === pid);
    if (a) { totaal += a.pct; max += 96;
      if (a.pct >= 25) domeinen.push({ label:a.label, pct:a.pct, kleur:a.kleur, icon:a.icon }); }
  }
  return { pct: max > 0 ? Math.min(Math.round((totaal/max)*100), 96) : 0, domeinen };
}

function getPdfUrls(gemeente) {
  const enc = encodeURIComponent;
  const clean = gemeente.toLowerCase().replace(/[^a-z0-9]/g,"");
  return [
    { label:"Zoek coalitieakkoord PDF", icon:"📄",
      url:"https://www.google.com/search?q=coalitieakkoord+2026+" + enc(gemeente) + "+filetype:pdf" },
    { label:"Officiële Bekendmakingen", icon:"📰",
      url:"https://www.officielebekendmakingen.nl/zoeken/?zoekvraag=" + enc(gemeente) + "&type=Gemeenteblad" },
    { label:"Programmabegroting 2026", icon:"💰",
      url:"https://www.google.com/search?q=programmabegroting+2026+" + enc(gemeente) + "+pdf" },
    { label:"Gemeentewebsite", icon:"🌐",
      url:"https://www." + clean + ".nl" },
  ];
}

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
}

function getHuidigeFase() {
  const m = new Date().getMonth() + 1;
  return BEGROTINGS_MOMENTEN.reduce((best,f) =>
    Math.abs(f.maand-m) < Math.abs(best.maand-m) ? f : best);
}

async function loadStorage(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; }
  catch { return null; }
}
async function saveStorage(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ── Kaart coordinaten ─────────────────────────────────────────────────────────
const MAP_W = 520, MAP_H = 620;
function latLngToXY(lat, lng) {
  const minLat=50.72, maxLat=53.60, minLng=3.30, maxLng=7.30;
  const x = ((lng-minLng)/(maxLng-minLng)) * MAP_W;
  const y = MAP_H - ((lat-minLat)/(maxLat-minLat)) * MAP_H;
  return [Math.round(x), Math.round(y)];
}

// ── AI calls ──────────────────────────────────────────────────────────────────
async function aiCall(prompt) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000,
      messages:[{role:"user",content:prompt}] })
  });
  const data = await resp.json();
  return data.content ? data.content.map(b=>b.text||"").join("") : "Niet beschikbaar.";
}

async function fetchAIAnalyse(g, profielLabel) {
  return aiCall("Je bent expert in gemeentelijk beleid. Analyseer de coalitieakkoord-themas van gemeente " +
    g.gemeente + " (" + g.provincie + ", arbeidsmarktregio " + (g.arbeidsmarktregio||g.provincie) + ", " +
    Math.round(g.inwoners/1000) + "k inwoners) op kansen voor CTMH interimbureau.\n\n" +
    "Themas coalitieakkoord: " + g.themas.join(", ") + "\n\n" +
    "Geef analyse (max 120 woorden):\n1. Top 2-3 kansen voor CTMH in " + profielLabel +
    "\n2. Timing (wanneer in raadsperiode)\n3. Wervingsprofiel\n\nNederlands, bondig.");
}

async function fetchWeekUpdate(gemeenteData) {
  const fase = getHuidigeFase();
  const top10 = gemeenteData.sort((a,b)=>b.analyses[0].pct-a.analyses[0].pct).slice(0,10)
    .map(g=>g.gemeente+" ("+g.provincie+", "+g.analyses[0].pct+"% "+g.analyses[0].label+")").join("\n");
  return aiCall("Je bent strategisch adviseur voor CTMH interimbureau.\n\n" +
    "Huidige begrotingsfase: " + fase.fase + " - " + fase.kans + " kans op opdrachten.\n" +
    "Actie deze periode: " + fase.actie + "\n\n" +
    "Top 10 gemeenten qua kansen:\n" + top10 + "\n\n" +
    "Geef wekelijkse update (max 180 woorden):\n" +
    "1. 3 concrete kansen deze week\n2. 1 urgente gemeente\n3. Trend in akkoorden\n4. Actie voor CTMH\n\n" +
    "Specifiek, actieontwerpend, emoji, Nederlands.");
}

async function fetchStrategie(filter, gemeenteData) {
  const lijst = filter ? gemeenteData.filter(g=>g[filter.type]===filter.waarde) : gemeenteData;
  const sample = lijst.slice(0,15).map(g=>g.gemeente+": "+g.themas.slice(0,5).join(", ")).join("\n");
  return aiCall("Strategisch adviseur CTMH.\n\nCoalitieakkoorden 2026-2030" +
    (filter?" in "+filter.waarde:"") + ":\n" + sample + "\n\n" +
    "Wervingsadvies (max 200 woorden):\n1. 3 kansrijkste regio's\n" +
    "2. 5 meest gevraagde profielen\n3. Top 3 themas\n4. Concrete aanbeveling\n\nNederlands, bullets.");
}

// ── UI Components ─────────────────────────────────────────────────────────────
function MatchBar({pct, kleur}) {
  return (
    <div style={{background:"#f0ebe0",borderRadius:4,height:7,overflow:"hidden",flex:1}}>
      <div style={{width:pct+"%",height:"100%",
        background:"linear-gradient(90deg,"+kleur+","+kleur+"cc)",
        borderRadius:4,transition:"width 0.6s ease"}} />
    </div>
  );
}

function Badge({label, kleur}) {
  return (
    <span style={{background:kleur+"18",color:kleur,border:"1px solid "+kleur+"40",
      borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>
      {label}
    </span>
  );
}

function ProvBadge({provincie}) {
  const k = PROV_KLEUREN[provincie]||"#666";
  return <span style={{background:k+"18",color:k,border:"1px solid "+k+"40",
    borderRadius:5,padding:"1px 7px",fontSize:10,fontWeight:700}}>{provincie}</span>;
}

function RegBadge({regio}) {
  const k = ARBEIDSMARKT_KLEUREN[regio]||"#666";
  return <span style={{background:k+"18",color:k,border:"1px solid "+k+"40",
    borderRadius:5,padding:"1px 7px",fontSize:10,fontWeight:600}}>
    📍 {regio}
  </span>;
}

// ── NL Kaart ──────────────────────────────────────────────────────────────────
function NLKaart({gemeenteData, geselecteerd, onSelect, profielFilter, persoonFilter, zoek, provFilter, regioFilter}) {
  const [tooltip, setTooltip] = useState(null);
  const [hoveredRegio, setHoveredRegio] = useState(null);

  const punten = useMemo(() => {
    return gemeenteData
      .filter(g => g.lat && g.lng)
      .filter(g => !zoek || g.gemeente.toLowerCase().includes(zoek.toLowerCase()))
      .filter(g => !provFilter || g.provincie === provFilter)
      .filter(g => !regioFilter || g.arbeidsmarktregio === regioFilter)
      .map(g => {
        const [x,y] = latLngToXY(g.lat, g.lng);
        let pct, kleur;
        if (persoonFilter) {
          const pm = berekenPersoonMatch(persoonFilter, g.analyses);
          pct = pm.pct; kleur = persoonFilter.kleur;
        } else if (profielFilter) {
          pct = g.analyses.find(a=>a.id===profielFilter)?.pct||0;
          kleur = CTMH_PROFIELEN.find(p=>p.id===profielFilter)?.kleur||g.analyses[0].kleur;
        } else {
          pct = g.analyses[0].pct; kleur = g.analyses[0].kleur;
        }
        return {...g, x, y, pct, kleur, isSelected: geselecteerd?.gemeente===g.gemeente};
      });
  }, [gemeenteData, geselecteerd, profielFilter, persoonFilter, zoek, provFilter, regioFilter]);

  function getR(inwoners) {
    if (inwoners>400000) return 9;
    if (inwoners>150000) return 7;
    if (inwoners>60000) return 5.5;
    if (inwoners>20000) return 4;
    return 3;
  }
  function getOp(pct) { return pct>=60?1:pct>=40?0.85:pct>=20?0.65:0.35; }

  return (
    <div style={{background:"#ffffff",borderRadius:12,overflow:"hidden",
      border:"1px solid #e8d8c0",boxShadow:"0 2px 8px #00000010"}}>
      <div style={{padding:"10px 14px",borderBottom:"1px solid #e8d8c0",
        display:"flex",justifyContent:"space-between",alignItems:"center",
        background:"linear-gradient(90deg,#fff8f0,#ffffff)"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#1a1208"}}>
          {persoonFilter
            ? persoonFilter.avatar+" "+persoonFilter.naam+" — "+punten.length+" matches"
            : "Kaart Nederland — "+punten.length+" gemeenten"}
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {[{l:"Hoog 60%+",k:"#eb7e13"},{l:"Gemiddeld",k:"#8c6848"},{l:"Laag",k:"#c8baa8"}].map(l=>(
            <div key={l.l} style={{display:"flex",alignItems:"center",gap:3}}>
              <div style={{width:9,height:9,borderRadius:"50%",background:l.k}} />
              <span style={{fontSize:9,color:"#8a7860"}}>{l.l}</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox={"0 0 "+MAP_W+" "+MAP_H} style={{width:"100%",display:"block"}}>
        {/* Achtergrond NL */}
        <rect width={MAP_W} height={MAP_H} fill="#eef5fb" />

        {/* Provincie-achtige achtergrond vlakken (vereenvoudigd) */}
        <rect x="0" y="0" width="120" height={MAP_H} fill="#dceef8" opacity="0.5" />
        <rect x="0" y="0" width={MAP_W} height="55" fill="#dceef8" opacity="0.4" />
        <rect x="380" y="0" width="140" height={MAP_H} fill="#dceef8" opacity="0.3" />

        {/* NL kustlijn als vereenvoudigd pad */}
        <path d={"M 55,55 L 130,30 L 200,20 L 280,25 L 340,15 L 400,30 L 440,60 " +
          "L 460,120 L 450,180 L 470,220 L 455,280 L 430,320 L 420,370 " +
          "L 400,420 L 360,480 L 310,530 L 260,570 L 200,580 L 140,560 " +
          "L 80,520 L 50,460 L 40,380 L 30,300 L 20,200 L 40,120 Z"}
          fill="#f0f8f0" stroke="#c8dcc8" strokeWidth="1.5" opacity="0.6" />

        {/* Waddeneilanden */}
        <ellipse cx="130" cy="42" rx="18" ry="6" fill="#f0f8f0" stroke="#c8dcc8" strokeWidth="1" opacity="0.7" />
        <ellipse cx="185" cy="32" rx="15" ry="5" fill="#f0f8f0" stroke="#c8dcc8" strokeWidth="1" opacity="0.7" />
        <ellipse cx="230" cy="28" rx="12" ry="5" fill="#f0f8f0" stroke="#c8dcc8" strokeWidth="1" opacity="0.7" />
        <ellipse cx="290" cy="22" rx="10" ry="4" fill="#f0f8f0" stroke="#c8dcc8" strokeWidth="1" opacity="0.7" />

        {/* Rivieren */}
        <path d="M 60,370 Q 150,360 220,340 Q 290,320 370,330" fill="none" stroke="#b8d4e8" strokeWidth="2" opacity="0.6" />
        <path d="M 80,400 Q 160,390 250,370 Q 320,355 400,365" fill="none" stroke="#b8d4e8" strokeWidth="1.5" opacity="0.5" />
        <path d="M 180,290 Q 240,285 300,295 Q 360,305 420,300" fill="none" stroke="#b8d4e8" strokeWidth="1.5" opacity="0.5" />

        {/* Provincie labels */}
        {[
          {naam:"NH", x:100, y:130},{naam:"ZH", x:130, y:340},{naam:"UT", x:225, y:290},
          {naam:"GLD", x:320, y:280},{naam:"OV", x:360, y:175},{naam:"DR", x:360, y:100},
          {naam:"GR", x:400, y:60},{naam:"FR", x:210, y:85},{naam:"NB", x:220, y:460},
          {naam:"LB", x:350, y:500},{naam:"ZL", x:100, y:490},{naam:"FL", x:280, y:200},
        ].map(p=>(
          <text key={p.naam} x={p.x} y={p.y} fontSize="9" fill="#b8a898"
            textAnchor="middle" style={{pointerEvents:"none",fontWeight:600}}>{p.naam}</text>
        ))}

        {/* Grid */}
        {[51,52,53].map(lat => {
          const [,y] = latLngToXY(lat,5);
          return <line key={lat} x1="0" y1={y} x2={MAP_W} y2={y}
            stroke="#d8c8b0" strokeWidth="0.4" strokeDasharray="3,8" opacity="0.5" />;
        })}

        {/* Gemeente punten - niet geselecteerd */}
        {punten.filter(p=>!p.isSelected).map(p=>(
          <g key={p.gemeente}>
            <circle cx={p.x} cy={p.y} r={getR(p.inwoners)+4} fill="transparent"
              style={{cursor:"pointer"}}
              onMouseEnter={e=>setTooltip({g:p,mx:e.clientX,my:e.clientY})}
              onMouseLeave={()=>setTooltip(null)}
              onClick={()=>onSelect(p)} />
            <circle cx={p.x} cy={p.y} r={getR(p.inwoners)}
              fill={p.kleur} opacity={getOp(p.pct)}
              stroke="white" strokeWidth="0.8"
              style={{cursor:"pointer",pointerEvents:"none"}} />
          </g>
        ))}

        {/* Geselecteerd punt - pulseren */}
        {punten.filter(p=>p.isSelected).map(p=>(
          <g key={p.gemeente+"_s"}>
            <circle cx={p.x} cy={p.y} r={getR(p.inwoners)+8}
              fill={p.kleur} opacity="0.15">
              <animate attributeName="r" values={getR(p.inwoners)+4+";"+(getR(p.inwoners)+12)+";"+getR(p.inwoners)+4}
                dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={p.x} cy={p.y} r={getR(p.inwoners)+3}
              fill="none" stroke="#eb7e13" strokeWidth="2" />
            <circle cx={p.x} cy={p.y} r={getR(p.inwoners)}
              fill={p.kleur} stroke="white" strokeWidth="1.5" />
            <text x={p.x} y={p.y-getR(p.inwoners)-5} fontSize="9" fill="#1a1208"
              textAnchor="middle" fontWeight="700" style={{pointerEvents:"none"}}>
              {p.gemeente}
            </text>
          </g>
        ))}

        {/* Stadslabels grote steden altijd zichtbaar */}
        {punten.filter(p=>p.inwoners>200000&&!p.isSelected).map(p=>(
          <text key={p.gemeente+"_l"} x={p.x+getR(p.inwoners)+3} y={p.y+4}
            fontSize="8" fill="#5a4228" fontWeight="600" style={{pointerEvents:"none"}}>
            {p.gemeente}
          </text>
        ))}

        {/* Kompas */}
        <g transform={"translate("+(MAP_W-30)+",30)"}>
          <circle cx="0" cy="0" r="14" fill="white" stroke="#e8d8c0" strokeWidth="1" />
          <text x="0" y="5" fontSize="11" fill="#eb7e13" textAnchor="middle" fontWeight="800">N</text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div style={{position:"fixed",left:tooltip.mx+14,top:tooltip.my-10,
          background:"#ffffff",border:"1px solid "+tooltip.g.kleur,
          borderRadius:10,padding:"10px 14px",pointerEvents:"none",
          zIndex:9999,minWidth:200,boxShadow:"0 4px 20px #00000025",
          borderTop:"3px solid "+tooltip.g.kleur}}>
          <div style={{fontWeight:700,color:"#1a1208",fontSize:13,marginBottom:4}}>
            {tooltip.g.gemeente}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <ProvBadge provincie={tooltip.g.provincie} />
            {tooltip.g.arbeidsmarktregio && tooltip.g.arbeidsmarktregio !== tooltip.g.provincie && (
              <RegBadge regio={tooltip.g.arbeidsmarktregio} />
            )}
          </div>
          <div style={{marginTop:6,fontSize:11,color:tooltip.g.kleur,fontWeight:700}}>
            {tooltip.g.analyses[0].icon} {tooltip.g.analyses[0].label}: {tooltip.g.pct}%
          </div>
          {tooltip.g.inwoners>0 && (
            <div style={{fontSize:10,color:"#8a7860",marginTop:2}}>
              {Math.round(tooltip.g.inwoners/1000)}k inwoners
            </div>
          )}
          <div style={{marginTop:5,fontSize:9,color:"#b8a898"}}>Klik voor volledige analyse</div>
        </div>
      )}
    </div>
  );
}

// ── Hoofd App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [geselecteerd, setGeselecteerd] = useState(null);
  const [profielFilter, setProfielFilter] = useState(null);
  const [persoonFilter, setPersoonFilter] = useState(null);
  const [provFilter, setProvFilter] = useState("");
  const [regioFilter, setRegioFilter] = useState("");
  const [clusterModus, setClusterModus] = useState("provincie");
  const [zoek, setZoek] = useState("");
  const [tab, setTab] = useState("kaart");
  const [aiTekst, setAiTekst] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [strategie, setStrategie] = useState("");
  const [stratLoading, setStratLoading] = useState(false);
  const [weekUpdate, setWeekUpdate] = useState("");
  const [weekLoading, setWeekLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [nieuweSignalen, setNieuweSignalen] = useState([]);
  const [alertsActief, setAlertsActief] = useState([]);
  const [eigenModus, setEigenModus] = useState(false);
  const [eigenNaam, setEigenNaam] = useState("");
  const [eigenProv, setEigenProv] = useState("");
  const [eigenTekst, setEigenTekst] = useState("");

  const provincies = useMemo(()=>[...new Set(RAW_GEMEENTEN.map(g=>g.provincie))].sort(),[]);
  const arbeidsmarktRegios = useMemo(()=>[...new Set(RAW_GEMEENTEN.map(g=>g.arbeidsmarktregio||g.provincie))].sort(),[]);

  const gemeenteData = useMemo(()=>RAW_GEMEENTEN.map(g=>({...g,analyses:berekenMatch(g)})),[]);

  const gefilterd = useMemo(()=>{
    const activeProfIds = persoonFilter ? persoonFilter.profielen
      : profielFilter ? [profielFilter] : null;
    return gemeenteData.filter(g=>{
      if (zoek&&!g.gemeente.toLowerCase().includes(zoek.toLowerCase())&&
          !g.provincie.toLowerCase().includes(zoek.toLowerCase())) return false;
      if (provFilter&&g.provincie!==provFilter) return false;
      if (regioFilter&&(g.arbeidsmarktregio||g.provincie)!==regioFilter) return false;
      if (activeProfIds) {
        if (!activeProfIds.some(pid=>{const p=g.analyses.find(a=>a.id===pid);return p&&p.pct>=15;})) return false;
      }
      return true;
    }).sort((a,b)=>{
      if (persoonFilter) return berekenPersoonMatch(persoonFilter,b.analyses).pct-berekenPersoonMatch(persoonFilter,a.analyses).pct;
      if (profielFilter) return (b.analyses.find(x=>x.id===profielFilter)?.pct||0)-(a.analyses.find(x=>x.id===profielFilter)?.pct||0);
      return b.analyses[0].pct-a.analyses[0].pct;
    });
  },[gemeenteData,zoek,provFilter,regioFilter,profielFilter,persoonFilter]);

  const provCount = useMemo(()=>{const c={};RAW_GEMEENTEN.forEach(g=>{c[g.provincie]=(c[g.provincie]||0)+1;});return c;},[]);
  const regioCount = useMemo(()=>{const c={};RAW_GEMEENTEN.forEach(g=>{const r=g.arbeidsmarktregio||g.provincie;c[r]=(c[r]||0)+1;});return c;},[]);

  // Wekelijkse refresh
  useEffect(()=>{
    async function checkRefresh() {
      const stored = await loadStorage("ctmh_week_v2");
      const cw = getWeekNumber()+"-"+new Date().getFullYear();
      if (stored&&stored.week===cw) {
        setWeekUpdate(stored.tekst); setLastRefresh(stored.ts); setNieuweSignalen(stored.sig||[]);
      } else {
        setWeekLoading(true);
        try {
          const tekst = await fetchWeekUpdate(gemeenteData);
          const sig = gemeenteData.sort((a,b)=>b.analyses[0].pct-a.analyses[0].pct).slice(0,5)
            .map(g=>({gemeente:g.gemeente,pct:g.analyses[0].pct,label:g.analyses[0].label,kleur:g.analyses[0].kleur,provincie:g.provincie}));
          const ts = new Date().toISOString();
          setWeekUpdate(tekst); setLastRefresh(ts); setNieuweSignalen(sig);
          await saveStorage("ctmh_week_v2",{week:cw,tekst,sig,ts});
        } catch { setWeekUpdate("Update tijdelijk niet beschikbaar."); }
        setWeekLoading(false);
      }
    }
    checkRefresh();
  },[gemeenteData]);

  // Begrotingsalerts
  useEffect(()=>{
    async function loadAlerts() {
      const stored = await loadStorage("ctmh_alerts") || [];
      setAlertsActief(stored);
    }
    loadAlerts();
  },[]);

  const voegAlertToe = async (gemeente) => {
    const nieuw = [...alertsActief.filter(a=>a!==gemeente), gemeente].slice(-10);
    setAlertsActief(nieuw);
    await saveStorage("ctmh_alerts", nieuw);
  };

  const verwijderAlert = async (gemeente) => {
    const nieuw = alertsActief.filter(a=>a!==gemeente);
    setAlertsActief(nieuw);
    await saveStorage("ctmh_alerts", nieuw);
  };

  const selecteer = useCallback(async (g)=>{
    setGeselecteerd(g); setAiTekst(""); setTab("kaart");
    const top = g.analyses?g.analyses[0]:berekenMatch(g)[0];
    setAiLoading(true);
    try { setAiTekst(await fetchAIAnalyse(g, top.label)); }
    catch { setAiTekst("AI-analyse tijdelijk niet beschikbaar."); }
    setAiLoading(false);
  },[]);

  const forceRefresh = async ()=>{
    setWeekLoading(true); setWeekUpdate("");
    try {
      const tekst = await fetchWeekUpdate(gemeenteData);
      const sig = gemeenteData.sort((a,b)=>b.analyses[0].pct-a.analyses[0].pct).slice(0,5)
        .map(g=>({gemeente:g.gemeente,pct:g.analyses[0].pct,label:g.analyses[0].label,kleur:g.analyses[0].kleur,provincie:g.provincie}));
      const ts = new Date().toISOString();
      const cw = getWeekNumber()+"-"+new Date().getFullYear();
      setWeekUpdate(tekst); setLastRefresh(ts); setNieuweSignalen(sig);
      await saveStorage("ctmh_week_v2",{week:cw,tekst,sig,ts});
    } catch { setWeekUpdate("Niet beschikbaar."); }
    setWeekLoading(false);
  };

  const analyseEigen = async ()=>{
    if (!eigenNaam&&!eigenTekst) return;
    const kws = ["woningbouw","duurzaamheid","jeugdzorg","wmo","armoede","participatie",
      "veiligheid","hrm","financiën","organisatie","klimaat","energietransitie","sociaal domein","fusie"];
    const gevonden = kws.filter(kw=>eigenTekst.toLowerCase().includes(kw));
    const g = {gemeente:eigenNaam||"Eigen gemeente",provincie:eigenProv||"Onbekend",
      inwoners:0,themas:gevonden.length>0?gevonden:["organisatie","sociaal domein"],
      lat:null,lng:null,arbeidsmarktregio:eigenProv||"Onbekend"};
    g.analyses = berekenMatch(g);
    await selecteer(g);
  };

  const selAnalyses = geselecteerd?(geselecteerd.analyses||berekenMatch(geselecteerd)):[];
  const huidigeFase = getHuidigeFase();

  // Stijlen
  const C = {
    orange:"#eb7e13", brown:"#8c6848", blue:"#7a98ad", bluegrey:"#68749c",
    bg:"#f7f3ef", white:"#ffffff", border:"#e8d8c0",
    text:"#1a1208", textSoft:"#5a4a34", textMuted:"#8a7860"
  };

  function card(extra) { return {background:C.white,border:"1px solid "+C.border,
    borderRadius:12,padding:"14px 18px",boxShadow:"0 1px 4px #00000008",...extra}; }

  function tabStyle(a) { return {background:a?C.orange:C.white,
    border:"1px solid "+(a?C.orange:C.border),borderRadius:7,padding:"6px 12px",
    color:a?"#ffffff":C.textMuted,fontSize:12,fontWeight:600,cursor:"pointer"}; }

  const TABS=[{id:"kaart",l:"🗺️ Kaart"},{id:"analyse",l:"📊 Analyse"},
    {id:"mensen",l:"👤 Mensen"},{id:"matrix",l:"⊞ Matrix"},
    {id:"cyclus",l:"📅 Cyclus"},{id:"strategie",l:"🤖 Strategie"},{id:"tips",l:"💡 Tips"}];

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,
      fontFamily:"Inter,system-ui,sans-serif",display:"flex",flexDirection:"column"}}>

      {/* Header */}
      <div style={{background:C.white,borderBottom:"2px solid "+C.orange,
        padding:"12px 20px",display:"flex",alignItems:"center",gap:12,
        boxShadow:"0 2px 8px #eb7e1318"}}>
        <div style={{background:"linear-gradient(135deg,#eb7e13,#8c6848)",
          borderRadius:10,width:38,height:38,display:"flex",
          alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🔍</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:800,letterSpacing:"-0.3px"}}>
            <span style={{color:C.orange}}>CTMH</span>
            <span style={{color:C.text}}> Kansen Analyse</span>
          </div>
          <div style={{fontSize:10,color:C.textMuted}}>
            Coalitieakkoorden 2026-2030 · {RAW_GEMEENTEN.length} gemeenten · {arbeidsmarktRegios.length} regio's
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{background:huidigeFase.kans==="Zeer hoog"?"#fff0e8":huidigeFase.kans==="Hoog"?"#fff8f0":"#f5f5f5",
            border:"1px solid "+(huidigeFase.kans==="Zeer hoog"?C.orange:C.border),
            borderRadius:8,padding:"5px 10px",textAlign:"center"}}>
            <div style={{fontSize:9,color:C.textMuted}}>Begrotingsfase</div>
            <div style={{fontSize:11,fontWeight:700,color:huidigeFase.kans==="Zeer hoog"?C.orange:C.brown}}>
              {huidigeFase.icon} {huidigeFase.kans}
            </div>
          </div>
          <div style={{background:"#f5f0e8",border:"1px solid "+C.border,
            borderRadius:8,padding:"5px 10px",textAlign:"center"}}>
            <div style={{fontSize:9,color:C.textMuted}}>Week</div>
            <div style={{fontSize:16,fontWeight:800,color:C.orange}}>{getWeekNumber()}</div>
          </div>
          <button onClick={forceRefresh}
            style={{background:C.orange,border:"none",borderRadius:8,
              padding:"5px 10px",color:"#fff",fontSize:10,cursor:"pointer",fontWeight:700}}>
            {weekLoading?"...":"↻"}
          </button>
        </div>
      </div>

      {/* Week banner */}
      {(weekUpdate||weekLoading) && (
        <div style={{background:"#fff8f0",borderBottom:"1px solid #f0d0a0",
          padding:"8px 20px",display:"flex",alignItems:"flex-start",gap:10}}>
          <span style={{fontSize:16,flexShrink:0}}>📡</span>
          <div style={{flex:1}}>
            <div style={{fontSize:10,fontWeight:700,color:C.orange,marginBottom:2}}>
              WEKELIJKSE UPDATE — Week {getWeekNumber()}/2026
              {lastRefresh&&<span style={{color:C.textMuted,fontWeight:400,marginLeft:6}}>
                · {new Date(lastRefresh).toLocaleDateString("nl-NL")}
              </span>}
            </div>
            {weekLoading
              ? <div style={{fontSize:11,color:C.textMuted}}>Update wordt gegenereerd...</div>
              : <div style={{fontSize:11,color:C.textSoft,lineHeight:1.5,
                  whiteSpace:"pre-wrap",maxHeight:60,overflow:"hidden"}}>
                  {weekUpdate.slice(0,350)}{weekUpdate.length>350?"...":""}
                </div>
            }
          </div>
          {nieuweSignalen.length>0 && (
            <div style={{display:"flex",gap:4,flexShrink:0}}>
              {nieuweSignalen.slice(0,3).map(s=>(
                <div key={s.gemeente}
                  onClick={()=>{const g=gemeenteData.find(x=>x.gemeente===s.gemeente);if(g)selecteer(g);}}
                  style={{background:s.kleur+"15",border:"1px solid "+s.kleur+"40",
                    borderRadius:6,padding:"3px 8px",cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.text}}>{s.gemeente}</div>
                  <div style={{fontSize:11,fontWeight:800,color:s.kleur}}>{s.pct}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{display:"flex",flex:1,overflow:"hidden",minHeight:0}}>
        {/* Linkerpaneel */}
        <div style={{width:285,flexShrink:0,background:C.white,
          borderRight:"1px solid "+C.border,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"10px 10px 8px",borderBottom:"1px solid "+C.border,
            display:"flex",flexDirection:"column",gap:6}}>
            <input value={zoek} onChange={e=>setZoek(e.target.value)}
              placeholder="🔎 Zoek gemeente..."
              style={{width:"100%",background:"#faf7f3",border:"1px solid "+C.border,
                borderRadius:8,padding:"7px 10px",color:C.text,fontSize:12,
                outline:"none",boxSizing:"border-box"}} />

            {/* Cluster toggle */}
            <div style={{display:"flex",gap:4}}>
              <button onClick={()=>{setClusterModus("provincie");setRegioFilter("");}}
                style={{flex:1,background:clusterModus==="provincie"?C.orange+"18":C.bg,
                  border:"1px solid "+(clusterModus==="provincie"?C.orange:C.border),
                  borderRadius:6,padding:"5px",color:clusterModus==="provincie"?C.orange:C.textMuted,
                  fontSize:10,cursor:"pointer",fontWeight:600}}>
                Provincie
              </button>
              <button onClick={()=>{setClusterModus("regio");setProvFilter("");}}
                style={{flex:1,background:clusterModus==="regio"?C.orange+"18":C.bg,
                  border:"1px solid "+(clusterModus==="regio"?C.orange:C.border),
                  borderRadius:6,padding:"5px",color:clusterModus==="regio"?C.orange:C.textMuted,
                  fontSize:10,cursor:"pointer",fontWeight:600}}>
                Arbeidsmarktregio
              </button>
            </div>

            {clusterModus==="provincie"
              ? <select value={provFilter} onChange={e=>{setProvFilter(e.target.value);setStrategie("");}}
                  style={{width:"100%",background:"#faf7f3",border:"1px solid "+C.border,
                    borderRadius:8,padding:"6px 10px",color:C.text,fontSize:12,outline:"none",cursor:"pointer"}}>
                  <option value="">Alle provincies ({RAW_GEMEENTEN.length})</option>
                  {provincies.map(p=><option key={p} value={p}>{p} ({provCount[p]||0})</option>)}
                </select>
              : <select value={regioFilter} onChange={e=>{setRegioFilter(e.target.value);setStrategie("");}}
                  style={{width:"100%",background:"#faf7f3",border:"1px solid "+C.border,
                    borderRadius:8,padding:"6px 10px",color:C.text,fontSize:12,outline:"none",cursor:"pointer"}}>
                  <option value="">Alle arbeidsmarktregio's ({arbeidsmarktRegios.length})</option>
                  {arbeidsmarktRegios.map(r=><option key={r} value={r}>{r} ({regioCount[r]||0})</option>)}
                </select>
            }

            {/* Profiel filters */}
            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
              <button onClick={()=>{setProfielFilter(null);setPersoonFilter(null);}}
                style={{background:(!profielFilter&&!persoonFilter)?C.orange+"18":C.bg,
                  border:"1px solid "+((!profielFilter&&!persoonFilter)?C.orange:C.border),
                  borderRadius:20,padding:"2px 8px",
                  color:(!profielFilter&&!persoonFilter)?C.orange:C.textMuted,
                  fontSize:10,cursor:"pointer"}}>Alles</button>
              {CTMH_PROFIELEN.map(p=>(
                <button key={p.id}
                  onClick={()=>{setProfielFilter(p.id===profielFilter?null:p.id);setPersoonFilter(null);}}
                  style={{background:(!persoonFilter&&profielFilter===p.id)?p.kleur+"22":C.bg,
                    border:"1px solid "+((!persoonFilter&&profielFilter===p.id)?p.kleur:C.border),
                    borderRadius:20,padding:"2px 7px",
                    color:(!persoonFilter&&profielFilter===p.id)?p.kleur:C.textMuted,
                    fontSize:10,cursor:"pointer"}}>
                  {p.icon}
                </button>
              ))}
            </div>

            {/* Persoon filter */}
            <div style={{borderTop:"1px solid "+C.border,paddingTop:6}}>
              <div style={{fontSize:9,fontWeight:700,color:C.textMuted,letterSpacing:1,
                marginBottom:5,textTransform:"uppercase"}}>👤 Filter op adviseur</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {CTMH_MENSEN.map(m=>(
                  <button key={m.id}
                    onClick={()=>{setPersoonFilter(persoonFilter?.id===m.id?null:m);setProfielFilter(null);}}
                    title={m.naam+" — "+m.rol}
                    style={{background:persoonFilter?.id===m.id?m.kleur+"25":C.bg,
                      border:"1px solid "+(persoonFilter?.id===m.id?m.kleur:C.border),
                      borderRadius:20,padding:"2px 7px",
                      color:persoonFilter?.id===m.id?m.kleur:C.textMuted,
                      fontSize:10,cursor:"pointer",fontWeight:persoonFilter?.id===m.id?700:400}}>
                    {m.avatar} {m.initialen}
                  </button>
                ))}
              </div>
              {persoonFilter && (
                <div style={{marginTop:5,background:persoonFilter.kleur+"10",
                  border:"1px solid "+persoonFilter.kleur+"30",
                  borderRadius:7,padding:"5px 8px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:persoonFilter.kleur}}>
                    {persoonFilter.naam}
                  </div>
                  <div style={{fontSize:9,color:C.textMuted}}>
                    {persoonFilter.profielen.map(pid=>{
                      const p=CTMH_PROFIELEN.find(x=>x.id===pid);
                      return p?p.icon+" "+p.label.split(" ")[0]:"";
                    }).join(" · ")}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{padding:"4px 10px",fontSize:10,color:C.textMuted,
            borderBottom:"1px solid #f0e8d8"}}>
            {gefilterd.length}/{RAW_GEMEENTEN.length} gemeenten
            {alertsActief.length>0&&(
              <span style={{marginLeft:8,color:C.orange,fontWeight:700}}>
                🔔 {alertsActief.length} alerts
              </span>
            )}
          </div>

          <div style={{flex:1,overflowY:"auto",padding:"6px 7px",
            display:"flex",flexDirection:"column",gap:3}}>
            {gefilterd.map(g=>{
              const persMatch = persoonFilter?berekenPersoonMatch(persoonFilter,g.analyses):null;
              const displayPct = persMatch?persMatch.pct
                :profielFilter?(g.analyses.find(a=>a.id===profielFilter)?.pct||0)
                :g.analyses[0].pct;
              const displayKleur = persMatch?persoonFilter.kleur
                :profielFilter?(CTMH_PROFIELEN.find(p=>p.id===profielFilter)?.kleur||g.analyses[0].kleur)
                :g.analyses[0].kleur;
              const isSelected = geselecteerd?.gemeente===g.gemeente;
              const hasAlert = alertsActief.includes(g.gemeente);
              return (
                <div key={g.gemeente} onClick={()=>selecteer(g)}
                  style={{background:isSelected?"#fff5e8":"#fafaf8",
                    border:"1px solid "+(isSelected?C.orange:C.border),
                    borderRadius:7,padding:"7px 10px",cursor:"pointer",
                    boxShadow:isSelected?"0 0 0 1px "+C.orange+"30":"none"}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:4}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,color:C.text,fontSize:12,
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                        {hasAlert&&<span style={{color:C.orange,marginRight:3}}>🔔</span>}
                        {g.gemeente}
                      </div>
                      <div style={{marginTop:2,display:"flex",gap:3,flexWrap:"wrap"}}>
                        <ProvBadge provincie={g.provincie} />
                      </div>
                    </div>
                    <div style={{background:displayKleur+"18",color:displayKleur,
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

          {/* Eigen invoer */}
          <div style={{borderTop:"1px solid "+C.border,padding:"8px 9px"}}>
            <button onClick={()=>setEigenModus(!eigenModus)}
              style={{width:"100%",background:"transparent",
                border:"1px solid "+C.border,borderRadius:7,
                padding:"6px",color:C.textMuted,fontSize:11,cursor:"pointer"}}>
              {eigenModus?"▲":"▼"} Eigen akkoord invoeren
            </button>
            {eigenModus&&(
              <div style={{marginTop:7,display:"flex",flexDirection:"column",gap:5}}>
                <input value={eigenNaam} onChange={e=>setEigenNaam(e.target.value)}
                  placeholder="Gemeente naam"
                  style={{background:"#faf7f3",border:"1px solid "+C.border,
                    borderRadius:6,padding:"6px 9px",color:C.text,fontSize:11,outline:"none"}} />
                <select value={eigenProv} onChange={e=>setEigenProv(e.target.value)}
                  style={{background:"#faf7f3",border:"1px solid "+C.border,
                    borderRadius:6,padding:"5px 8px",color:C.text,fontSize:11,outline:"none"}}>
                  <option value="">Selecteer provincie</option>
                  {provincies.map(p=><option key={p} value={p}>{p}</option>)}
                </select>
                <textarea value={eigenTekst} onChange={e=>setEigenTekst(e.target.value)}
                  placeholder="Plak coalitieakkoordtekst..." rows={3}
                  style={{background:"#faf7f3",border:"1px solid "+C.border,
                    borderRadius:6,padding:"6px 9px",color:C.text,
                    fontSize:11,outline:"none",resize:"vertical"}} />
                <button onClick={analyseEigen}
                  style={{background:"linear-gradient(135deg,"+C.orange+","+C.brown+")",
                    border:"none",borderRadius:6,padding:"7px",
                    color:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>
                  🔍 Analyseer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rechterpaneel */}
        <div style={{flex:1,overflow:"auto",padding:14,background:C.bg}}>
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
            {TABS.map(t=>(
              <button key={t.id}
                onClick={()=>{
                  setTab(t.id);
                  if(t.id==="strategie"&&!strategie&&!stratLoading) {
                    setStratLoading(true);
                    const f = regioFilter?{type:"arbeidsmarktregio",waarde:regioFilter}
                      :provFilter?{type:"provincie",waarde:provFilter}:null;
                    fetchStrategie(f,gefilterd).then(r=>{setStrategie(r);setStratLoading(false);})
                      .catch(()=>setStratLoading(false));
                  }
                }}
                style={tabStyle(tab===t.id)}>{t.l}</button>
            ))}
          </div>

          {/* ── KAART ── */}
          {tab==="kaart"&&(
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <NLKaart gemeenteData={gefilterd} geselecteerd={geselecteerd}
                onSelect={selecteer} profielFilter={profielFilter}
                persoonFilter={persoonFilter} zoek={zoek}
                provFilter={provFilter} regioFilter={regioFilter} />

              {geselecteerd&&(
                <div style={card()}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>
                        {geselecteerd.gemeente}
                        <button onClick={()=>alertsActief.includes(geselecteerd.gemeente)
                            ?verwijderAlert(geselecteerd.gemeente):voegAlertToe(geselecteerd.gemeente)}
                          title="Begrotingsalert instellen"
                          style={{marginLeft:8,background:"transparent",border:"none",
                            cursor:"pointer",fontSize:14}}>
                          {alertsActief.includes(geselecteerd.gemeente)?"🔔":"🔕"}
                        </button>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <ProvBadge provincie={geselecteerd.provincie} />
                        {geselecteerd.arbeidsmarktregio&&geselecteerd.arbeidsmarktregio!==geselecteerd.provincie&&(
                          <RegBadge regio={geselecteerd.arbeidsmarktregio} />
                        )}
                        {geselecteerd.inwoners>0&&(
                          <span style={{fontSize:11,color:C.textMuted}}>
                            {Math.round(geselecteerd.inwoners/1000)}k inw.
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{background:"#fff8f0",border:"1px solid "+C.orange+"40",
                      borderRadius:8,padding:"8px 14px",textAlign:"center",flexShrink:0}}>
                      <div style={{fontSize:22,fontWeight:800,color:C.orange}}>
                        {selAnalyses[0]?.pct}%
                      </div>
                      <div style={{fontSize:9,color:C.textMuted}}>top match</div>
                    </div>
                  </div>

                  {/* Match bars */}
                  <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:10}}>
                    {selAnalyses.slice(0,3).map(p=>(
                      <div key={p.id} style={{display:"flex",alignItems:"center",gap:7}}>
                        <span style={{fontSize:14}}>{p.icon}</span>
                        <span style={{fontSize:11,color:C.text,width:140,flexShrink:0}}>{p.label}</span>
                        <MatchBar pct={p.pct} kleur={p.kleur} />
                        <span style={{fontSize:12,fontWeight:700,color:p.kleur,width:32,textAlign:"right"}}>
                          {p.pct}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* PDF & Links */}
                  <div style={{borderTop:"1px solid "+C.border,paddingTop:8,marginBottom:8}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.textMuted,
                      marginBottom:5,textTransform:"uppercase",letterSpacing:0.5}}>
                      Documenten & Links
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {getPdfUrls(geselecteerd.gemeente).map(l=>(
                        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                          style={{display:"flex",alignItems:"center",gap:4,
                            background:l.icon==="📄"?C.orange:"#ffffff",
                            border:"1px solid "+(l.icon==="📄"?C.orange:C.border),
                            borderRadius:6,padding:"5px 10px",
                            color:l.icon==="📄"?"#ffffff":C.textSoft,
                            fontSize:10,fontWeight:600,cursor:"pointer",textDecoration:"none"}}>
                          {l.icon} {l.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* AI analyse */}
                  <div style={{borderTop:"1px solid "+C.border,paddingTop:8}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.text,marginBottom:5}}>
                      🤖 AI Kansen Analyse
                    </div>
                    {aiLoading
                      ? <div style={{color:C.textMuted,fontSize:11}}>Analyseren...</div>
                      : aiTekst
                        ? <div style={{fontSize:11,color:C.textSoft,lineHeight:1.7,whiteSpace:"pre-wrap"}}>
                            {aiTekst}
                          </div>
                        : null
                    }
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ANALYSE ── */}
          {tab==="analyse"&&(
            !geselecteerd
              ? <div style={{...card(),textAlign:"center",padding:36}}>
                  <div style={{fontSize:32,marginBottom:8}}>🏛️</div>
                  <div style={{fontSize:13,color:C.textMuted,fontWeight:600}}>
                    Selecteer een gemeente op de kaart of uit de lijst
                  </div>
                </div>
              : <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div style={card()}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:19,fontWeight:800,color:C.text,marginBottom:4}}>
                          {geselecteerd.gemeente}
                        </div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                          <ProvBadge provincie={geselecteerd.provincie} />
                          {geselecteerd.arbeidsmarktregio&&geselecteerd.arbeidsmarktregio!==geselecteerd.provincie&&(
                            <RegBadge regio={geselecteerd.arbeidsmarktregio} />
                          )}
                        </div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                          {geselecteerd.themas.slice(0,8).map(t=>(
                            <span key={t} style={{background:"#f5ede0",color:C.textSoft,
                              borderRadius:4,padding:"2px 6px",fontSize:10}}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{background:"#fff8f0",border:"1px solid "+C.orange+"30",
                        borderRadius:9,padding:"9px 14px",textAlign:"center",flexShrink:0}}>
                        <div style={{fontSize:24,fontWeight:800,color:C.orange}}>{selAnalyses[0]?.pct}%</div>
                        <div style={{fontSize:9,color:C.textMuted}}>Top match</div>
                      </div>
                    </div>
                  </div>

                  <div style={card()}>
                    <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:12}}>
                      📊 Match per expertisegebied
                    </div>
                    {selAnalyses.map(p=>(
                      <div key={p.id} style={{marginBottom:9}}>
                        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                          <span style={{fontSize:14}}>{p.icon}</span>
                          <span style={{fontSize:11,color:C.text,fontWeight:600,width:155,flexShrink:0}}>{p.label}</span>
                          <MatchBar pct={p.pct} kleur={p.kleur} />
                          <span style={{fontSize:12,fontWeight:800,color:p.kleur,width:34,textAlign:"right"}}>{p.pct}%</span>
                        </div>
                        {p.gevondenKeywords?.length>0&&(
                          <div style={{paddingLeft:25,display:"flex",flexWrap:"wrap",gap:3}}>
                            {p.gevondenKeywords.slice(0,5).map(kw=>(
                              <span key={kw} style={{fontSize:9,background:p.kleur+"12",
                                color:p.kleur,borderRadius:4,padding:"1px 5px",border:"1px solid "+p.kleur+"25"}}>{kw}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={card()}>
                    <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:8}}>📄 Documenten</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {getPdfUrls(geselecteerd.gemeente).map(l=>(
                        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                          style={{display:"flex",alignItems:"center",gap:4,
                            background:l.icon==="📄"?C.orange:"#ffffff",
                            border:"1px solid "+(l.icon==="📄"?C.orange:C.border),
                            borderRadius:6,padding:"6px 12px",
                            color:l.icon==="📄"?"#fff":C.textSoft,
                            fontSize:11,fontWeight:600,textDecoration:"none"}}>
                          {l.icon} {l.label}
                        </a>
                      ))}
                    </div>
                    <div style={{marginTop:8,display:"flex",alignItems:"center",gap:6}}>
                      <button onClick={()=>alertsActief.includes(geselecteerd.gemeente)
                          ?verwijderAlert(geselecteerd.gemeente):voegAlertToe(geselecteerd.gemeente)}
                        style={{background:alertsActief.includes(geselecteerd.gemeente)?C.orange:"#ffffff",
                          border:"1px solid "+(alertsActief.includes(geselecteerd.gemeente)?C.orange:C.border),
                          borderRadius:6,padding:"6px 12px",
                          color:alertsActief.includes(geselecteerd.gemeente)?"#fff":C.textMuted,
                          fontSize:11,fontWeight:600,cursor:"pointer"}}>
                        {alertsActief.includes(geselecteerd.gemeente)
                          ?"🔔 Alert actief — klik om te verwijderen"
                          :"🔕 Alert instellen voor begrotingspublicaties"}
                      </button>
                    </div>
                  </div>

                  <div style={card()}>
                    <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:8}}>
                      🤖 AI Kansen Analyse — {geselecteerd.gemeente}
                    </div>
                    {aiLoading
                      ? <div style={{color:C.textMuted,fontSize:12}}>Analyseren...</div>
                      : aiTekst
                        ? <div style={{fontSize:12,color:C.textSoft,lineHeight:1.75,whiteSpace:"pre-wrap"}}>{aiTekst}</div>
                        : <div style={{color:C.textMuted,fontSize:12}}>Klik op een gemeente voor analyse.</div>
                    }
                  </div>
                </div>
          )}

          {/* ── MENSEN ── */}
          {tab==="mensen"&&(
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{fontSize:11,color:C.textMuted}}>
                Selecteer een adviseur om te zien welke gemeenten het beste bij zijn of haar profiel passen.
                Profielen worden geactualiseerd zodra ctmh.nl beschikbaar is.
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:10}}>
                {CTMH_MENSEN.map(m=>{
                  const isActief=persoonFilter?.id===m.id;
                  const topMatches=gefilterd
                    .map(g=>({...g,pm:berekenPersoonMatch(m,g.analyses)}))
                    .sort((a,b)=>b.pm.pct-a.pm.pct).slice(0,3);
                  return (
                    <div key={m.id}
                      onClick={()=>{setPersoonFilter(isActief?null:m);setProfielFilter(null);}}
                      style={{background:isActief?m.kleur+"12":C.white,
                        border:"1px solid "+(isActief?m.kleur:C.border),
                        borderRadius:12,padding:"12px 14px",cursor:"pointer",
                        boxShadow:isActief?"0 0 0 2px "+m.kleur+"30":"0 1px 4px #00000008"}}>
                      <div style={{display:"flex",gap:9,marginBottom:8}}>
                        <div style={{width:38,height:38,borderRadius:9,flexShrink:0,
                          background:m.kleur+"18",border:"1px solid "+m.kleur+"30",
                          display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
                          {m.avatar}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:700,color:C.text,fontSize:12}}>
                            {m.naam}
                            {!m.beschikbaar&&<span style={{marginLeft:5,fontSize:9,color:C.textMuted,
                              background:"#f0e8e0",borderRadius:4,padding:"1px 4px"}}>Op opdracht</span>}
                          </div>
                          <div style={{fontSize:10,color:m.kleur,fontWeight:600,marginTop:1}}>{m.rol}</div>
                          <div style={{fontSize:9,color:C.textMuted}}>📍 {m.regio}</div>
                        </div>
                      </div>
                      <div style={{fontSize:10,color:C.textSoft,lineHeight:1.5,marginBottom:8}}>{m.bio}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:8}}>
                        {m.profielen.map(pid=>{
                          const p=CTMH_PROFIELEN.find(x=>x.id===pid);
                          return p?<span key={pid} style={{background:p.kleur+"15",color:p.kleur,
                            border:"1px solid "+p.kleur+"30",borderRadius:20,
                            padding:"1px 7px",fontSize:9,fontWeight:600}}>
                            {p.icon} {p.label}
                          </span>:null;
                        })}
                      </div>
                      {topMatches.length>0&&(
                        <div style={{borderTop:"1px solid "+C.border,paddingTop:6}}>
                          <div style={{fontSize:9,color:C.textMuted,fontWeight:700,
                            letterSpacing:0.8,textTransform:"uppercase",marginBottom:4}}>
                            Top kansen
                          </div>
                          {topMatches.map(g=>(
                            <div key={g.gemeente}
                              onClick={e=>{e.stopPropagation();selecteer(g);setTab("kaart");}}
                              style={{display:"flex",alignItems:"center",gap:6,
                                padding:"3px 7px",borderRadius:5,background:"#faf7f3",
                                marginBottom:2,cursor:"pointer"}}>
                              <span style={{fontSize:11,color:C.text,fontWeight:600,flex:1}}>{g.gemeente}</span>
                              <ProvBadge provincie={g.provincie} />
                              <span style={{fontSize:11,fontWeight:800,color:m.kleur}}>{g.pm.pct}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── MATRIX ── */}
          {tab==="matrix"&&(
            <div style={card()}>
              <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>
                Kansen Matrix — {gefilterd.length} gemeenten
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid "+C.border}}>
                      <th style={{textAlign:"left",color:C.textMuted,padding:"6px 10px",fontWeight:600}}>Gemeente</th>
                      <th style={{textAlign:"left",color:C.textMuted,padding:"6px 6px",fontWeight:400,fontSize:10}}>Regio</th>
                      {CTMH_PROFIELEN.map(p=>(
                        <th key={p.id} title={p.label}
                          style={{color:p.kleur,padding:"6px 5px",fontSize:14}}>{p.icon}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gefilterd.slice(0,200).map(g=>(
                      <tr key={g.gemeente}
                        onClick={()=>{selecteer(g);setTab("kaart");}}
                        style={{borderBottom:"1px solid #f0e8d8",cursor:"pointer"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="#fff8f0"}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
                        <td style={{padding:"5px 10px",color:C.text,fontWeight:600,fontSize:11}}>
                          {alertsActief.includes(g.gemeente)&&<span style={{marginRight:3}}>🔔</span>}
                          {g.gemeente}
                        </td>
                        <td style={{padding:"5px 6px"}}>
                          <span style={{fontSize:9,color:C.textMuted}}>
                            {(g.arbeidsmarktregio||g.provincie).split(" ")[0]}
                          </span>
                        </td>
                        {CTMH_PROFIELEN.map(p=>{
                          const m=g.analyses.find(a=>a.id===p.id);
                          const pct=m?m.pct:0;
                          return (
                            <td key={p.id} style={{padding:"5px 4px",textAlign:"center"}}>
                              <div style={{
                                background:pct>=60?p.kleur:pct>=35?p.kleur+"66":pct>=15?p.kleur+"28":"#f0e8d8",
                                borderRadius:4,padding:"2px 4px",fontSize:10,fontWeight:700,
                                color:pct>=35?"#fff":pct>=15?p.kleur:"#c0b0a0",
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
                  <div style={{textAlign:"center",color:C.textMuted,fontSize:10,marginTop:8}}>
                    Top 200 van {gefilterd.length} — gebruik filters
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── BEGROTINGSCYCLUS ── */}
          {tab==="cyclus"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={card()}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:4}}>
                  📅 Gemeentelijke Begrotingscyclus — Kansen voor CTMH
                </div>
                <div style={{fontSize:11,color:C.textMuted,marginBottom:14}}>
                  Koppel kansen aan het juiste moment in de begrotingscyclus.
                  Gemeenten volgen een vast ritme — zo weet CTMH wanneer te handelen.
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {BEGROTINGS_MOMENTEN.map(f=>{
                    const isHuidig = f.maand === huidigeFase.maand;
                    return (
                      <div key={f.maand}
                        style={{background:isHuidig?"#fff8f0":"#faf7f3",
                          border:"1px solid "+(isHuidig?C.orange:C.border),
                          borderLeft:"3px solid "+(isHuidig?C.orange:f.kans==="Zeer hoog"?C.brown:"#d8c8b0"),
                          borderRadius:8,padding:"10px 14px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                          <span style={{fontSize:16}}>{f.icon}</span>
                          <span style={{fontSize:12,fontWeight:700,color:C.text}}>{f.naam}</span>
                          <span style={{fontSize:11,color:C.textMuted}}>— {f.fase}</span>
                          <span style={{marginLeft:"auto",background:
                            f.kans==="Zeer hoog"?C.orange+"18":f.kans==="Hoog"?C.brown+"18":"#f0e8d8",
                            color:f.kans==="Zeer hoog"?C.orange:f.kans==="Hoog"?C.brown:C.textMuted,
                            border:"1px solid "+(f.kans==="Zeer hoog"?C.orange:f.kans==="Hoog"?C.brown:C.border),
                            borderRadius:20,padding:"1px 8px",fontSize:10,fontWeight:700}}>
                            {f.kans}
                          </span>
                          {isHuidig&&<span style={{background:C.orange,color:"#fff",
                            borderRadius:20,padding:"1px 7px",fontSize:9,fontWeight:700}}>NU</span>}
                        </div>
                        <div style={{fontSize:11,color:C.textSoft,marginBottom:4}}>{f.beschrijving}</div>
                        <div style={{fontSize:10,color:C.orange,fontWeight:600}}>
                          ➜ {f.actie}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Alerts overzicht */}
              <div style={card()}>
                <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:8}}>
                  🔔 Actieve Begrotingsalerts ({alertsActief.length})
                </div>
                {alertsActief.length===0
                  ? <div style={{fontSize:11,color:C.textMuted}}>
                      Nog geen alerts ingesteld. Selecteer een gemeente en klik op 🔕 om alerts in te stellen.
                    </div>
                  : <div style={{display:"flex",flexDirection:"column",gap:5}}>
                      {alertsActief.map(naam=>{
                        const g = gemeenteData.find(x=>x.gemeente===naam);
                        return g?(
                          <div key={naam} style={{display:"flex",alignItems:"center",
                            gap:8,padding:"6px 10px",background:"#fff8f0",
                            border:"1px solid "+C.orange+"30",borderRadius:7}}>
                            <span style={{fontSize:14}}>🔔</span>
                            <span style={{fontSize:12,color:C.text,fontWeight:600,flex:1}}>{naam}</span>
                            <ProvBadge provincie={g.provincie} />
                            <div style={{display:"flex",gap:4}}>
                              <a href={getPdfUrls(naam)[2].url} target="_blank" rel="noopener noreferrer"
                                style={{fontSize:10,color:C.orange,textDecoration:"none",fontWeight:600}}>
                                💰 Begroting
                              </a>
                              <a href={getPdfUrls(naam)[1].url} target="_blank" rel="noopener noreferrer"
                                style={{fontSize:10,color:C.brown,textDecoration:"none",fontWeight:600}}>
                                📰 Bekendmakingen
                              </a>
                            </div>
                            <button onClick={()=>verwijderAlert(naam)}
                              style={{background:"transparent",border:"none",
                                color:C.textMuted,cursor:"pointer",fontSize:14}}>✕</button>
                          </div>
                        ):null;
                      })}
                      <div style={{marginTop:4,fontSize:10,color:C.textMuted}}>
                        Klik op de links om publicaties te controleren op officielebekendmakingen.nl
                      </div>
                    </div>
                }
              </div>
            </div>
          )}

          {/* ── STRATEGIE ── */}
          {tab==="strategie"&&(
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {weekUpdate&&!weekLoading&&(
                <div style={{...card(),borderTop:"2px solid "+C.orange}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.orange,marginBottom:6}}>
                    📡 Wekelijkse Update — Week {getWeekNumber()}
                  </div>
                  <div style={{fontSize:11,color:C.textSoft,lineHeight:1.7,whiteSpace:"pre-wrap"}}>
                    {weekUpdate}
                  </div>
                </div>
              )}
              <div style={card()}>
                <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:8}}>
                  🤖 AI Wervingsstrategie{regioFilter?" — "+regioFilter:provFilter?" — "+provFilter:""}
                </div>
                {stratLoading
                  ? <div style={{color:C.textMuted,fontSize:12}}>Analyseren...</div>
                  : strategie
                    ? <div style={{fontSize:12,color:C.textSoft,lineHeight:1.75,whiteSpace:"pre-wrap"}}>
                        {strategie}
                      </div>
                    : <button onClick={()=>{
                          setStratLoading(true);
                          const f=regioFilter?{type:"arbeidsmarktregio",waarde:regioFilter}
                            :provFilter?{type:"provincie",waarde:provFilter}:null;
                          fetchStrategie(f,gefilterd).then(r=>{setStrategie(r);setStratLoading(false);})
                            .catch(()=>setStratLoading(false));
                        }}
                        style={{background:"linear-gradient(135deg,"+C.orange+","+C.brown+")",
                          border:"none",borderRadius:8,padding:"10px 20px",
                          color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                        Genereer Wervingsstrategie{regioFilter?" voor "+regioFilter:provFilter?" voor "+provFilter:""}
                      </button>
                }
              </div>
              <div style={card()}>
                <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:12}}>
                  🏆 Top 5 kansen per expertisegebied
                </div>
                {CTMH_PROFIELEN.map(profiel=>{
                  const top5=gefilterd.map(g=>({...g,pct:g.analyses.find(a=>a.id===profiel.id)?.pct||0}))
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
                            style={{background:profiel.kleur+"10",border:"1px solid "+profiel.kleur+"25",
                              borderRadius:6,padding:"4px 8px",cursor:"pointer"}}>
                            <div style={{fontSize:11,color:C.text,fontWeight:600}}>{g.gemeente}</div>
                            <div style={{display:"flex",justifyContent:"space-between",gap:4}}>
                              <span style={{fontSize:9,color:C.textMuted}}>
                                {(g.arbeidsmarktregio||g.provincie).split(" ")[0]}
                              </span>
                              <span style={{fontSize:11,color:profiel.kleur,fontWeight:800}}>{g.pct}%</span>
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

          {/* ── TIPS ── */}
          {tab==="tips"&&(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[
                {nr:"01",kleur:C.orange,icon:"📥",titel:"Laad actuele akkoorden via PDF-URL",
                  tekst:"Haal gepubliceerde coalitieakkoorden automatisch op via PDF-links van gemeentewebsites. Gebruik de zoekknop per gemeente om de PDF direct te vinden op Google. De beste akkoorden staan op gemeente.nl/coalitieakkoord-2026.pdf."},
                {nr:"02",kleur:C.brown,icon:"📅",titel:"Gebruik de begrotingscyclus als timing",
                  tekst:"September (begroting) en mei/juni (kadernota) zijn de piekperiodes. Zet alerts in de Cyclus-tab op gemeenten met hoge matchscore. Zo ben je tijdig in gesprek voordat vacatures verschijnen."},
                {nr:"03",kleur:C.bluegrey,icon:"🗺️",titel:"Cluster op arbeidsmarktregio",
                  tekst:"Filter op arbeidsmarktregio om gemeenten te groeperen die in dezelfde arbeidsmarkt opereren. Zo kun je een recruiter efficient inzetten voor meerdere gemeenten in dezelfde regio."},
                {nr:"04",kleur:C.blue,icon:"📊",titel:"Koppel aan vacaturedata",
                  tekst:"Als een gemeente een hoge matchscore heeft EN actief vacatures plaatst op Werken voor Nederland of LinkedIn, is de kans bewezen. Combineer de kansen analyse met een wekelijkse vacaturescan."},
                {nr:"05",kleur:C.orange,icon:"🔢",titel:"Verfijn keyword-weging",
                  tekst:"Niet elk keyword is even sterk. 'Jeugdzorg' plus 'budgetverhoging' is krachtiger dan alleen 'jeugdzorg'. Voeg bedragen en aantallen toe als signalen: een akkoord met 500 woningen is concreter dan 'woningbouw'."},
                {nr:"06",kleur:C.brown,icon:"🔄",titel:"Monitor officielebekendmakingen.nl",
                  tekst:"Coalitieakkoorden worden bijgesteld via raadsbesluiten. Stel wekelijkse zoekopdrachten in op officielebekendmakingen.nl voor gemeenten met hoge matchscore. Zo vangt CTMH veranderingen vroeg op."},
                {nr:"07",kleur:C.bluegrey,icon:"🧠",titel:"Voeg politieke kleur toe",
                  tekst:"GroenLinks/PvdA-coalities leggen andere accenten dan VVD/CDA. Voeg coalitiepartijen toe als variabele om de kansen beter te calibreren op werkelijke beleidsuitvoering en timing."},
                {nr:"08",kleur:C.blue,icon:"🤝",titel:"Persoonlijk contact als hefboom",
                  tekst:"De Mensen-tab toont per adviseur de top kansen. Gebruik dit om adviseurs proactief in gesprek te brengen met hun meest kansrijke gemeenten — specifiek en tijdig, niet generiek."},
              ].map(tip=>(
                <div key={tip.nr} style={{background:C.white,borderRadius:10,
                  padding:"12px 16px",boxShadow:"0 1px 4px #00000008",
                  borderTop:"1px solid "+tip.kleur+"25",borderRight:"1px solid "+tip.kleur+"25",
                  borderBottom:"1px solid "+tip.kleur+"25",borderLeft:"3px solid "+tip.kleur}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                    <span style={{fontSize:16}}>{tip.icon}</span>
                    <span style={{fontSize:9,fontWeight:800,color:tip.kleur,letterSpacing:2}}>TIP {tip.nr}</span>
                    <span style={{fontSize:12,fontWeight:700,color:C.text}}>{tip.titel}</span>
                  </div>
                  <div style={{fontSize:11,color:C.textSoft,lineHeight:1.65,paddingLeft:25}}>
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
