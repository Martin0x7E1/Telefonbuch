describe("telefonbuch", function() {
	beforeEach(module("telefonbuch"));
	

	it("creates 2 entries", inject(function($controller) {
		var scope = [];
		var ctrl;
		
	ctrl = $controller("telefonbuchAnzeige", {$scope: scope});
		expect(scope.Kontakte.length).toBe(2);
	}));
})