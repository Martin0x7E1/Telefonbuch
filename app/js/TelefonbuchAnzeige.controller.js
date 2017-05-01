angular.
	module("telefonbuch").
	controller("telefonbuchAnzeige", ['$scope', function ($scope) {
			var Self = $scope;
			
// zu Testzwecken werden Einträge generiert.
			Self.InitStoreFill = function (){
				var Vornamen = ["Anja", "Bernhard", "Max", "Mara", "Thorsten", "Sabine"];
				var Nachnamen = ["Schmidt", "Müller", "Mayer", "Leineweber"];
				Self.Entries = Array(Vornamen.length * Nachnamen.length);
				for (i = 0; i < Vornamen.length; i++) {
					for (j = 0; j < Nachnamen.length; j++) {
						var zahl = 37*(7**3+i)*(9**1+j);
						var t = zahl % 65536;
						var f = (3*zahl) % 65536;
						var index = i*Nachnamen.length + j;
						Self.Entries[index] = {
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
// zu Testzwecken werden alle Einträge gelöscht.
			Self.InitStoreEmpty = function (){
				Self.Entries = [];
				Self.SaveLocalStorage();
				Self.EditedEntry = {};
				Self.ConfirmDelete = false;
				Self.EditedIndex = -1;
				Self.NewEntry = false;
			};

			Self.Filter = {
				Enabled: false,
				Text: ""
			};
			Self.Entries = [];	// Entries hält die permanent gespeicherten Daten.
			Self.EditedEntry = {};
			Self.ConfirmDelete = false;
			Self.EditedIndex = -1;
			Self.NewEntry = false;

// Es wird versucht die Einträge aus dem LocalStorage zu laden.
			Self.StorageText = localStorage.getItem("Telefonbuch");
			if (Self.StorageText) {
				Self.Entries = JSON.parse(Self.StorageText);
			}

			Self.SaveLocalStorage = function (todos) {
// Die Funktion SaveLocalStorage wird verwendet um die Daten nach jedem Bearbeiten zu speichern.
//				Self.StorageText = JSON.stringify(Self.Entries);
				Self.StorageText = angular.toJson(Self.Entries);
				localStorage.setItem("Telefonbuch", Self.StorageText);
			};

			Self.CopyEntry = function(Target, Source) {
// Die Funktion CopyEntry kopiert die Werte eines Eintrags.
				Target.Vorname = Source.Vorname;
				Target.Nachname = Source.Nachname;
				Target.Email = Source.Email;
				Target.Addresse = Source.Addresse;
				Target.Tel1 = Source.Tel1;
				Target.Tel2 = Source.Tel2;
			}
			Self.StartEdit = function (Index) {
// Wird durch Buttons aufgerufen um die Bearbeitung eines Eintrags zu starten.
// Wird bereits ein Eintrag bearbeitet oder angelegt geschieht nichts.
				if (!Self.NewEntry && Self.EditedIndex == -1 && Index >= 0 && Index < Self.Entries.length) {
					Self.CopyEntry(Self.EditedEntry, Self.Entries[Index]);
					Self.EditedIndex = Index;
					Self.NewEntry = false;
					Self.ConfirmDelete = false;
				}
			};
			Self.CancelEdit = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen wird diese geschlossen. Ansonsten passiert nichts.
				if (Self.EditedIndex != -1) {
					Self.EditedIndex = -1;
				}
			};
			Self.SaveEdit = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen werden die Änderungen übernommen und es wird gespeichert. Ansonsten passiert nichts.
				if (Self.EditedIndex != -1) {
					Self.CopyEntry(Self.Entries[Self.EditedIndex], Self.EditedEntry);
					Self.SaveLocalStorage();
					Self.EditedIndex = -1;
				}
			};
			Self.DeleteEntry1 = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen wird nach Bestätigung gefragt.
				if (Self.EditedIndex != -1) {
					Self.ConfirmDelete = true;
				}
			};
			Self.DeleteEntry2 = function (DoDelete) {
// Ist die Bearbeitenmaske für einen Eintrag offen und wird der Button zur Bestätigung gedrückt, wird der bearbeitete Eintrag 
// gelöscht und die Daten werden gespeichert.
				if (DoDelete && Self.EditedIndex != -1) {
					// Es muss sichergestellt werden, dass die Indizierung weiterhin korrekt ist.
					// Da AngularJS die Sortierung übernimmt, genügt es den zu löschenden Eintrag
					// durch den letzten Eintrag zu ersetzen, nur dessen Index zu aktualisieren
					// und das Array Entries um eins zu verkürzen.
					if (Self.EditedIndex < Self.Entries.length - 1) {
						Self.Entries[Self.EditedIndex] = Self.Entries[Self.Entries.length - 1];
						Self.Entries[Self.EditedIndex].Index = Self.EditedIndex;
					}
					Self.Entries.splice(Self.Entries.length - 1);
					Self.EditedIndex = -1;
					Self.SaveLocalStorage();
				}
				Self.ConfirmDelete = false;
			};
			Self.StartNewEntry = function () {
// StartNewEntry wird in Button verwendet um die Bearbeitenmaske für einen neuen Eintrag zu öffnen.
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
			Self.SaveNewEntry = function () {
// Ist die Bearbeitenmaske für einen neuen Eintrag offen wird ein neuer Eintrag erstellt und es wird gespeichert. Ansonsten passiert nichts.
				if (Self.NewEntry) {
					Self.NewEntry = false;
					Self.Entries.push({});
					Self.CopyEntry(Self.Entries[Self.Entries.length-1], Self.EditedEntry);
					Self.Entries[Self.Entries.length-1].Index = Self.Entries.length-1;
					Self.SaveLocalStorage();
				}
			};
			Self.CancelNewEntry = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen wird diese geschlossen. Ansonsten passiert nichts.
				if (Self.NewEntry) {
					Self.NewEntry = false;
				}
			};
			Self.StartFilter = function() {
				Self.Filter = {
					Enabled: true,
					Text: ""
				};
			}
			Self.CloseFilter = function() {
				Self.Filter = {
					Enabled: false,
					Text: ""
				};
			}
		}
	]);



