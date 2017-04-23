angular.
	module("telefonbuchAnzeige").
	component("telefonbuchAnzeige", {
		templateUrl: "TelefonbuchAnzeige/TelefonbuchAnzeige.template.html",
		controller: function TelefonbuchAnzeigeKonstr() {
		
			Vornamen = ["Anja", "Bernhard", "Max", "Mara", "Thorsten", "Sabine"];
			Nachnamen = ["Schmidt", "Müller", "Mayer", "Leineweber"];
			this.Kontakte = Array(Vornamen.length * Nachnamen.length);
			for (i = 0; i < Vornamen.length; i++) {
				for (j = 0; j < Nachnamen.length; j++) {
					var zahl = 37*(7**3+i)*(9**1+j);
					var t = zahl % 65536;
					var f = (3*zahl) % 65536;
					this.Kontakte[i*Nachnamen.length + j] = {
						Name: Vornamen[i] + " " + Nachnamen[j], 
						Email: Vornamen[i] + "." + Nachnamen[j] + "@example.com",
						Tel1: "0551 / " + t,
						Tel2: "0176 / " + f,
						Addresse: "Musterstraße 10"
					};
				}
			}
		}
	});



