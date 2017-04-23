describe("telefonbuchAnzeige", function() {
	beforeEach(module("telefonbuchAnzeige"));
	
	it("creates 24 entries", inject(function($componentController) {
		var ctrl = $componentController("telefonbuchAnzeige");
		expect(ctrl.Kontakte.length).toBe(24);
	}));
})
