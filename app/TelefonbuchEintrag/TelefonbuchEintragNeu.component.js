angular.
	module("telefonbuchEintrag").
	component("telefonbuchEintragNeu", {
		templateUrl: "TelefonbuchEintrag/telefonbuchEintragNeu.template.html",
		bindings: {
			onSave: '&',
			onCancel: '&',
			newEntry: '='
			}
	});




	