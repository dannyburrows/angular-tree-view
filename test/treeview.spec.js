describe('directive: tree-view', function() {
	var compile;
	var scope;
	var element;

	beforeEach(module('monsciergetreeview'));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		compile = _$compile_;
		scope = _$rootScope_.$new();
		scope.treedata = [
			{"id": 29,
			"parent_id": 13,
			"label": "IHG",
			"children": [
			{
				"id": 1577,
				"parent_id": 29,
				"label": "Crowne Plaza",
				"children": [
				{
					"id": 3803,
					"parent_id": 1577,
					"label": "Crowne Plaza Milan",
					"children": []
				}
				]
			}
			]}];
		element = compileDirective();
	}));

	function compileDirective() {
		var element = angular.element('<tree-view tree-data="treedata"></tree-view>');
		var compiledElement = compile(element)(scope);
		scope.$digest();

		return compiledElement;
	}

	it('Replaces directive element with structure.', function() {
		var treeRootDirective = element.find('tree-root');
		expect(treeRootDirective).toBeDefined();
		var treeBranchDirective = element.find('tree-branch');
		expect(treeBranchDirective).toBeDefined();
	});

	it('Ensures root branch is marked as root', function() {
		var scope = element.isolateScope();
		expect(scope.treeData[0].root).toBe(true);
	});

	it('Ensures child are not viewable while root is not exapnded', function() {
		var scope = element.isolateScope();
		expect(scope.treeData[0].children).toBeArray();
	});
});