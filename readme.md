# Telefonbuch mit AngularJS 1.x

## Beschreibung

Ein Telefonbuch mit den Funktionen Neu, Bearbeiten, L�schen und Suchen.

## Aufbau

Die Anwendung besteht im Wesentlichen aus nur vier Dateien, dem eigentlichen HTML Template, einer CSS und zwei Javascript Dateien.

Die Funktionalit�t der App wurde in eine eigene Datei ausgelagert. Hieraus resultiert ein sehr �bersichtliches Template, welches leicht auf andere Bed�rfnisse anzupassen ist. Dar�ber hinaus ist die L�sung leicht um weitere Funktionen zu erweitern.

Dank AngularJS funktioniert die Anwendung allen Ger�ten und unter allen Betriebssystemen ohne aufw�ndige Anpassungen.

## Funktion

Der Controller telefonbuchAnzeige in js/TelefonbuchAnzeige.controller.js verwaltet die Telefonbucheintr�ge.

Gleich zu Anfang wird versucht die Eintr�ge aus dem LocalStorage zu laden und als JSON zu interpretieren.
Geht dieses schief wird ein leerer Datensatz verwendet.

Die Bearbeitung der Eintr�ge geschieht durch Klick auf die jeweiligen Buttons im Kopf der Eintr�ge. Es kann immer nur ein Eintrag zur Zeit bearbeitet oder neu angelegt werden.

Die Suche ist durch einen Filter implementiert, der sowohl Suche nach Vor- und Nachnamen als auch nach Telefonnummern erm�glicht.

