var app = angular.module("telefonbuch", []);

app.controller("telefonbuchAnzeige", function ($scope) {
	$scope.Kontakte = [ {
		Name: "Max Mustermann", 
		Email: "max@example.com",
		Tel1: "0551 / 1234567",
		Tel2: "0176 / 7654321",
		Addresse: "Musterstraße 10"
		}, {
		Name: "Mara Mustermann", 
		Email: "mara@example.com",
		Tel1: "0551 / 1234568",
		Tel2: "0176 / 7654322",
		Addresse: "Musterstraße 10"
		}];
});

