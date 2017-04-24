angular.
	module("telefonbuchEintrag").
	component("telefonbuchEintragEdit", {
		templateUrl: "TelefonbuchEintrag/telefonbuchEintragEdit.template.html",
		bindings: {
			onSave: '&',
			onCancel: '&',
			onDelete1: '&',
			onDeleteYes: '&',
			onDeleteNo: '&',
			confirmDelete: '=',
			dummy: '='
			}
	});




	