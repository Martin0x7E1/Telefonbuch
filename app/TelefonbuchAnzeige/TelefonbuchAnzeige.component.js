angular.
	module("telefonbuchAnzeige").
	component("telefonbuchAnzeige", {
		templateUrl: "TelefonbuchAnzeige/TelefonbuchAnzeige.template.html",
		controller: function TelefonbuchAnzeigeKonstr() {
			var Self = this;

			// zu Testzwecken werden Einträge generiert.
			this.InitStoreFill = function (){
				var Vornamen = ["Anja", "Bernhard", "Max", "Mara", "Thorsten", "Sabine"];
				var Nachnamen = ["Schmidt", "Müller", "Mayer", "Leineweber"];
				Self.Kontakte = Array(Vornamen.length * Nachnamen.length);
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
				Self.SaveLocalStorage();
				Self.EditedEntry = {};
				Self.ConfirmDelete = false;
				Self.EditedIndex = -1;
				Self.NewEntry = false;
			};
			// zu Testzwecken werden Einträge generiert.
			this.InitStoreEmpty = function (){
				Self.Kontakte = [];
				Self.SaveLocalStorage();
				Self.EditedEntry = {};
				Self.ConfirmDelete = false;
				Self.EditedIndex = -1;
				Self.NewEntry = false;
			};

			
			this.Kontakte = [];	// Kontakte hält die permanent gespeicherten Daten.
			this.EditedEntry = {};
			this.ConfirmDelete = false;
			this.EditedIndex = -1;
			this.NewEntry = false;

// Es wird versucht die Einträge aus dem LocalStorage zu laden.
			this.StorageText = localStorage.getItem("Telefonbuch");
			if (this.StorageText) {
				Self.Kontakte = JSON.parse(this.StorageText);
			}

// Die Funktion SaveLocalStorage wird verwendet um die Daten nach jedem Bearbeiten zu speichern.
			this.SaveLocalStorage = function (todos) {
//				Self.StorageText = JSON.stringify(Self.Kontakte);
				Self.StorageText = angular.toJson(Self.Kontakte);
				localStorage.setItem("Telefonbuch", Self.StorageText);
			};
// Die Funktion CopyEntry kopiert die Werte eines Eintrags.
			this.CopyEntry = function(Target, Source) {
				Target.Vorname = Source.Vorname;
				Target.Nachname = Source.Nachname;
				Target.Email = Source.Email;
				Target.Addresse = Source.Addresse;
				Target.Tel1 = Source.Tel1;
				Target.Tel2 = Source.Tel2;
			}
// StartEdit wird in Buttons verwendet um Einträge zu bearbeiten.			
			this.StartEdit = function (Index) {
// Wird durch Buttons aufgerufen um die Bearbeitung eines Eintrags zu starten.
// Wird bereits ein Eintrag bearbeitet oder angelegt geschieht nichts.
				if (!Self.NewEntry && Self.EditedIndex == -1 && Index >= 0 && Index < Self.Kontakte.length) {
					Self.CopyEntry(Self.EditedEntry, Self.Kontakte[Index]);
					Self.EditedIndex = Index;
					Self.NewEntry = false;
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
// StartNewEntry wird in Button verwendet um die Bearbeitenmaske für einen neuen Eintrag zu öffnen.
			this.StartNewEntry = function () {
				if (!Self.NewEntry && Self.EditedIndex == -1) {
					Self.EditedEntry.Vorname = "";
					Self.EditedEntry.Nachname = "";
					Self.EditedEntry.Email = "";
					Self.EditedEntry.Addresse = "";
					Self.EditedEntry.Tel1 = "";
					Self.EditedEntry.Tel2 = "";
					Self.NewEntry = true;
					Self.EditedIndex = -1;
				}
			};
			this.SaveNewEntry = function () {
// Ist die Bearbeitenmaske für einen neuen Eintrag offen wird ein neuer Eintrag erstellt und es wird gespeichert. Ansonsten passiert nichts.
				if (Self.NewEntry) {
					Self.NewEntry = false;
					Self.Kontakte.push({});
					Self.CopyEntry(Self.Kontakte[Self.Kontakte.length-1], Self.EditedEntry);
					Self.Kontakte[Self.Kontakte.length-1].Index = Self.Kontakte.length-1;
					Self.SaveLocalStorage();
				}
			};
			this.CancelNewEntry = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen wird diese geschlossen. Ansonsten passiert nichts.
				if (Self.NewEntry) {
					Self.NewEntry = false;
				}
			};
		}
	});



