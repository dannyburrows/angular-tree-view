describe('directive: tree-view', function() {
	var compile;
	var scope;
	var treeViewElement;
	var treeRootElement;
	var treeBranchElement;

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
		treeViewElement   = compileTreeViewDirective();
		treeRootElement   = compileTreeRootDirective();
		treeBranchElement = compileTreeBranchDirective();
	}));

	function compileTreeViewDirective() {
		var treeViewElement = angular.element('<tree-view tree-data="treedata"></tree-view>');
		var compiledtreeViewElement = compile(treeViewElement)(scope);
		scope.$digest();

		return compiledtreeViewElement;
	}

	function compileTreeRootDirective() {
		var treeRootElement = angular.element('<tree-root root="treedata"></tree-root>');
		var compiledTreeRootElement = compile(treeRootElement)(scope);
		scope.$digest();

		return compiledTreeRootElement;
	}

	function compileTreeBranchDirective() {
		var treeBranchElement = angular.element('<tree-branch branch="treedata[0]"></tree-branch>');
		var compiledTreeBranchElement = compile(treeBranchElement)(scope);
		scope.$digest();

		return compiledTreeBranchElement;
	}

	it('should replace directive tree-view with structure.', function() {
		var treeRootDirective = treeViewElement.find('tree-root');
		expect(treeRootDirective).toBeDefined();
		var treeBranchDirective = treeViewElement.find('tree-branch');
		expect(treeBranchDirective).toBeDefined();
	});

	it('should ensure root branch is marked as root', function() {
		var scope = treeViewElement.isolateScope();
		expect(scope.treeData[0].root).toBeTrue();
	});

	it('should ensure children are not viewable while root is not expanded', function() {
		var scope = treeViewElement.isolateScope();
		expect(scope.treeData[0].children).toBeArray();
		var viewables = scope.treeData[0].children.map(function(c) { return c.viewable; });
		expect(viewables).not.toHaveTrue();
	});

	it('should ensure that expand all marks all nodes as expanded and viewable', function() {
		var innerScope = treeViewElement.isolateScope();
		innerScope.$digest();
		innerScope.expandAll();

		expect(scope.treedata[0].expanded).toBeTrue();
		expect(scope.treedata[0].viewable).toBeTrue();
	});

	describe('directive: tree-root', function() {
		it('should replace tree-root with structure', function() {
			var treeRootDirective = treeRootElement.find('tree-root');
			expect(treeRootDirective).toBeDefined();
			var treeBranchDirective = treeRootDirective.find('tree-branch');
			expect(treeBranchDirective).toBeDefined();
		});
	});

	describe('directive: tree-branch', function() {
		it('should replace tree-branch with structure', function() {
			var treeBranchDirective = treeBranchElement.find('span');
			expect(treeBranchDirective).toBeDefined();
		});

		it ('should make children viewable when parent is expanded', function() {
			var innerScope = treeBranchElement.isolateScope();
			innerScope.$digest();
			innerScope.toggle(innerScope.branch);

			expect(innerScope.branch.expanded).toBeTrue();
			var viewables = innerScope.branch.children.map(function(c){ return c.viewable; });
			expect(viewables).not.toHaveFalse();
		});
	});
});