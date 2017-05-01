# Telefonbuch mit AngularJS 1.x

## Beschreibung

Ein Telefonbuch mit den Funktionen Neu, Bearbeiten, Löschen und Suchen.

## Aufbau

Die Anwendung besteht im Wesentlichen aus nur vier Dateien, dem eigentlichen HTML Template, einer CSS und zwei Javascript Dateien.

Die Funktionalität der App wurde in eine eigene Datei ausgelagert. Hieraus resultiert ein sehr übersichtliches Template, welches leicht auf andere Bedürfnisse anzupassen ist. Darüber hinaus ist die Lösung leicht um weitere Funktionen zu erweitern.

Dank AngularJS funktioniert die Anwendung allen Geräten und unter allen Betriebssystemen ohne aufwändige Anpassungen.

## Funktion

Der Controller telefonbuchAnzeige in js/TelefonbuchAnzeige.controller.js verwaltet die Telefonbucheinträge.

Gleich zu Anfang wird versucht die Einträge aus dem LocalStorage zu laden und als JSON zu interpretieren.
Geht dieses schief wird ein leerer Datensatz verwendet.

Die Bearbeitung der Einträge geschieht durch Klick auf die jeweiligen Buttons im Kopf der Einträge. Es kann immer nur ein Eintrag zur Zeit bearbeitet oder neu angelegt werden.

Die Suche ist durch einen Filter implementiert, der sowohl Suche nach Vor- und Nachnamen als auch nach Telefonnummern ermöglicht.

