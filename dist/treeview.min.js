(function() {
  'use strict';

  treeBranch.$inject = ["$compile"];
  angular.module('monsciergeTreeView', []);

  angular
  .module('monsciergeTreeView')
  .directive('treeView', treeView)
  .directive('treeRoot', treeRoot)
  .directive('treeBranch', treeBranch);

  function treeView() {
    return {
      restrict: 'E',
      template: '<tree-root root="treeData"></tree-root>',
      scope: {
        treeData: '=',
        selected: '@'
      },
      link: function(scope, attrs) {
        scope.selected = -1;

        processData();
        scope.$on('branch_selected', branchSelected);
        
        /**
         * Iterates data structure at first level, assigning proper values to intiate the tree structure
         * @return {n/a}
         */
        function processData() {
          if (scope.treeData && angular.isArray(scope.treeData)) {
            scope.treeData.forEach(function(td) {
              td.root = true;
              td.expanded = false;
            });
          }
        }

        /**
         * Marks a branch as selected and emits a broadcast to tell the directive to update
         * @param  {$emit event}
         * @param  {branch object}
         * @return {n/a}
         */
        function branchSelected(event, branch) {
          scope.selected = branch;
          scope.$broadcast('branch_selected_highlight', {id: branch});
        }
      }
    };
  }

  function treeRoot() {
    return {
      restrict: 'E',
      template: '<div class="tree-view"><tree-branch ng-repeat="branch in root" branch="branch"></tree-branch></div>',
      replace: 'true',
      scope: {
        root: '='
      }
    };
  }

  function treeBranch($compile) {
    return {
      restrict: 'E',
      template: '<div style="cursor: pointer" ng-click="toggle(branch);$event.stopPropagation()" ng-show="branch.viewable || branch.root"><div ng-class="{\'tree-view-selected\': branch.selected}"><span ng-class="{\'glyphicon glyphicon-plus\': !branch.expanded && (branch.children && branch.children.length > 0), \'glyphicon glyphicon-minus\': branch.expanded && (branch.children != null && branch.children.length > 0), \'glyphicon glyphicon-file\': (branch.children == null || branch.children.length == 0)}"></span> {{branch.label}}</div></div>',
      replace: true,
      scope: {
        branch: '='
      },
      link: function(scope, element, attrs) {
        scope.toggle = toggle;
        scope.last_selected = -1;

        buildBranchesModels(scope.branch);
        buildNodes();

        scope.$on('branch_selected_highlight', highlightBranch);

        /**
         * Builds the child branches for the current branch
         * @return {n/a}
         */
        function buildNodes() {
          if (angular.isArray(scope.branch.children)) {
            element.append('<tree-root root="branch.children"></tree-view>');
            $compile(element.contents())(scope);
          }
        }

        /**
         * Selects specific branch for highlighting in the template
         * @param  {angular event} $broadcast event
         * @param  {object} contains branch id that was just selected
         * @return {n/a}
         */
         function highlightBranch(event, branch) {
          scope.branch.selected = (branch.id == scope.last_selected);
        }
        
        /**
         * Iterates the branch to build the expected model for the UI
         * @param  {branch object} Branch serving as the root
         * @return {n/a}
         */
         function buildBranchesModels(branch) {
          if (branch) {
            branch.viewable = false;
            if (branch.children && angular.isArray(branch.children)) {
              branch.expanded = false;
              branch.children.forEach(function(b) {
                buildBranchesModels(b);
              });
            }
          }
        }
        
        /**
         * Toggles the display of the branch
         * @param  {branch object}
         * @return {n/a}
         */
         function toggle(branch) {
          scope.last_selected = branch.id;
          scope.$emit('branch_selected', branch.id);
          if (branch.expanded !== null) {
            branch.expanded = !branch.expanded;
            branch.children.forEach(function(c) {
              c.viewable = branch.expanded;
              if (!c.viewable) {
                hideChildren(c, false);
                c.expanded = false;
              }
            });
          }
        }
        
        /**
         * Recursively iterates children objects to toggle whether they should be displayed
         * @param  {branch object}
         * @param  {boolean}
         * @return {boolean}
         */
         function hideChildren(branch, show) {
          if (!branch.children || !angular.isArray(branch.children) || branch.children.length <= 0) {
            return false;
          }
          return branch.children.forEach(function(c) {
            c.expanded = show;
            c.viewable = show;
            return hideChildren(c, show);
          });
        }
      }
    };
  }
})();