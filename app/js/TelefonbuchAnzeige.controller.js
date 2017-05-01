angular.
	module("telefonbuch").
	controller("telefonbuchAnzeige", ['$scope', function ($scope) {
			var Self = $scope;

			// Die folgenden Zeilen beinhalten alle Variablen die den Zustand des Telefonbuchs ausmachen.
			Self.Filter = {
				Enabled: false,
				Text: ""
			};
			Self.Entries = [];	// Entries hält die permanent gespeicherten Daten.
			Self.EditedEntry = {};
			Self.ConfirmDelete = false;
			Self.EditedIndex = -1;
			Self.NewEntry = false;
			
			
			// Im folgenden geschieht die Initialisierung.
			// In diesem Fall handelt es sich nur um das Laden der Daten aus dem LocalStorage, falls möglich.
			// Ansonsten geschieht nichts, da in Self.Entries schon ein leeres Array besteht.
			var StorageText = localStorage.getItem("Telefonbuch"); 
			if (StorageText) {
				Self.Entries = JSON.parse(StorageText);
			}

			
			Self.InitStoreFill = function (){
// Diese Funktion wird zu Testzwecken aufgerufen.
// Es werden Beispieleinträge generiert.
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
			Self.InitStoreEmpty = function (){
// Diese Funktion wird zu Testzwecken aufgerufen.
// Es werden alle Einträge gelöscht.
				Self.Entries = [];
				Self.SaveLocalStorage();
				Self.EditedEntry = {};
				Self.ConfirmDelete = false;
				Self.EditedIndex = -1;
				Self.NewEntry = false;
			};
			Self.SaveLocalStorage = function (todos) {
// Die Funktion SaveLocalStorage wird verwendet um die Daten nach jedem Bearbeiten zu speichern.
				var StorageText = angular.toJson(Self.Entries);
				localStorage.setItem("Telefonbuch", StorageText);
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
// Diese Funktion wird bei einem Klick auf den Kopf eines Eintrages aufgerufen.
// Wird bereits ein Eintrag bearbeitet oder angelegt geschieht nichts.
// Ansonsten wird die Bearbeitenmaske für den jeweiligen Eintrag geöffnet.
				if (!Self.NewEntry && Self.EditedIndex == -1 && Index >= 0 && Index < Self.Entries.length) {
					Self.CopyEntry(Self.EditedEntry, Self.Entries[Index]);
					Self.EditedIndex = Index;
					Self.NewEntry = false;
					Self.ConfirmDelete = false;
				}
			};
			Self.CancelEdit = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen und wird auf Abbrechen gedrückt, so wird die Maske geschlossen. 
// Ansonsten kann diese Funktion gar nicht aufgerufen werden, daher passiert dann nichts.
				if (Self.EditedIndex != -1) {
					Self.EditedIndex = -1;
				}
			};
			Self.SaveEdit = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen werden die Änderungen gespeichert und die Maske geschlossen.
// Ansonsten kann diese Funktion gar nicht aufgerufen werden, daher passiert dann nichts.
				if (Self.EditedIndex != -1) {
					Self.CopyEntry(Self.Entries[Self.EditedIndex], Self.EditedEntry);
					Self.SaveLocalStorage();
					Self.EditedIndex = -1;
				}
			};
			Self.DeleteEntry1 = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen werden und wird auf den Button Löschen gedrückt,
// so wird eine Bestätigung des Löschens gefordert.
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
// StartNewEntry wird in einem Button verwendet um die Bearbeitenmaske für einen neuen Eintrag zu öffnen.
// Dieses geschieht aber nur, falls nicht schon ein Eintrag bearbeitet wird.
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
// Ist die Bearbeitenmaske für einen neuen Eintrag offen und wird der Button Anlegen gedrückt, wird der neue Eintrag angelegt.
				if (Self.NewEntry) {
					Self.NewEntry = false;
					Self.Entries.push({});
					Self.CopyEntry(Self.Entries[Self.Entries.length-1], Self.EditedEntry);
					Self.Entries[Self.Entries.length-1].Index = Self.Entries.length-1;
					Self.SaveLocalStorage();
				}
			};
			Self.CancelNewEntry = function () {
// Ist die Bearbeitenmaske für einen Eintrag offen und wird Abbrechen gedrückt, wird diese geschlossen.
				if (Self.NewEntry) {
					Self.NewEntry = false;
				}
			};
			
			
// Ist die Suchfunktion geschlossen und wird auf den Button Suchen gedrückt, wird die Suchmaske geöffnet.
			Self.StartFilter = function() {
				Self.Filter = {
					Enabled: true,
					Text: ""
				};
			}
// Ist die Suchfunktion geschlossen und wird auf den Button Suche löschen und schließen gedrückt, wird die Suchmaske gelöscht und geschlossen.
			Self.CloseFilter = function() {
				Self.Filter = {
					Enabled: false,
					Text: ""
				};
			}
		}
	]);



