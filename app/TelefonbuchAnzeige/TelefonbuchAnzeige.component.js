angular.
	module("telefonbuchAnzeige").
	component("telefonbuchAnzeige", {
		templateUrl: "TelefonbuchAnzeige/TelefonbuchAnzeige.template.html",
		controller: function TelefonbuchAnzeigeKonstr() {
			var Self = this;

			
			this.Kontakte = [];	// Kontakte hält die permanent gespeicherten Daten.
			this.EditedEntry = {};
			this.ConfirmDelete = false;
			this.EditedIndex = -1;

			// Es wird versucht die Einträge aus dem LocalStorage zu laden.
			var stored = localStorage.getItem("Telefonbuch");
			if (stored) {
				Self.Kontakte = JSON.parse(stored);
			}

			this.SaveLocalStorage = function (todos) {
// Die Funktion SaveLocalStorage wird verwendet um die Daten nach jedem Bearbeiten zu speichern.
				localStorage.setItem("Telefonbuch", JSON.stringify(Self.Kontakte));
			};
			this.CopyEntry = function(Target, Source) {
// Da es sich nur um wenige Felder handelt, mache ich das hier per Hand.
				Target.Vorname = Source.Vorname;
				Target.Nachname = Source.Nachname;
				Target.Email = Source.Email;
				Target.Addresse = Source.Addresse;
				Target.Tel1 = Source.Tel1;
				Target.Tel2 = Source.Tel2;
			}
			this.StartEdit = function (Index) {
// Wird durch Buttons aufgerufen um die Bearbeitung eines Eintrags zu starten.
// Ist bereits ein Eintrag in der Bearbeitung, geschieht nichts.
				if (Self.EditedIndex == -1 && Index >= 0 && Index < Self.Kontakte.length) {
					Self.CopyEntry(Self.EditedEntry, Self.Kontakte[Index]);
					Self.EditedIndex = Index;
					Self.ConfirmDelete = false;
				}
			};
			this.CancelEdit = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen wird diese geschlossen. Ansonsten passiert nichts.
				if (Self.EditedIndex != -1) {
					Self.EditedIndex = -1;
				}
			};
			this.SaveEdit = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen werden die Änderungen übernommen und es wird gespeichert. Ansonsten passiert nichts.
				if (Self.EditedIndex != -1) {
					Self.CopyEntry(Self.Kontakte[Self.EditedIndex], Self.EditedEntry);
					Self.SaveLocalStorage();
					Self.EditedIndex = -1;
				}
			};
			this.DeleteEntry1 = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen wird nach Bestätigung gefragt.
				if (Self.EditedIndex != -1) {
					Self.ConfirmDelete = true;
				}
			};
			this.DeleteEntry2 = function (DoDelete) {
// Ist die Bearbeitenmaske für einen Eintrag offen und wird der Button zur Bestätigung gedrückt, wird der bearbeitete Eintrag 
// gelöscht und die Daten werden gespeichert.
				if (DoDelete && Self.EditedIndex != -1) {
					// Es muss sichergestellt werden, dass die Indizierung weiterhin korrekt ist.
					// Da AngularJS die Sortierung übernimmt, genügt es den zu löschenden Eintrag
					// durch den letzten Eintrag zu ersetzen, nur dessen Index zu aktualisieren
					// und das Array Kontakte um eins zu verkürzen.
					if (Self.EditedIndex < Self.Kontakte.length - 1) {
						Self.Kontakte[Self.EditedIndex] = Self.Kontakte[Self.Kontakte.length - 1];
						Self.Kontakte[Self.EditedIndex].Index = Self.EditedIndex;
					}
					Self.Kontakte.splice(Self.Kontakte.length - 1);
					Self.EditedIndex = -1;
					Self.SaveLocalStorage();
				}
				Self.ConfirmDelete = false;
			};



			// zu Testzwecken werden Einträge generiert.
			if (this.Kontakte.length == 0) {
				var Vornamen = ["Anja", "Bernhard", "Max", "Mara", "Thorsten", "Sabine"];
				var Nachnamen = ["Schmidt", "Müller", "Mayer", "Leineweber"];
				this.Kontakte = Array(Vornamen.length * Nachnamen.length);
				for (i = 0; i < Vornamen.length; i++) {
					for (j = 0; j < Nachnamen.length; j++) {
						var zahl = 37*(7**3+i)*(9**1+j);
						var t = zahl % 65536;
						var f = (3*zahl) % 65536;
						var index = i*Nachnamen.length + j;
						this.Kontakte[index] = {
							Index: index,
							Vorname: Vornamen[i],
							Nachname: Nachnamen[j],
							Email: Vornamen[i] + "." + Nachnamen[j] + "@example.com",
							Tel1: "0551 / " + t,
							Tel2: "0176 / " + f,
							Addresse: "Musterstraße 10"
						};
					}
				}
				this.SaveLocalStorage();
			}

			}
	});



