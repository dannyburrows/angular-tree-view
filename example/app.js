(function() {
	'use strict';

	angular
	.module('myapp', ['monsciergetreeview'])
	.controller('treecontroller', treecontroller);

	function treecontroller() {
		var vm = this;
		vm.selected = null;
		vm.search = "";
		vm.treedata = [{
			id: 1,
			parent_id: null,
			label: 'Animal',
			children: [
				{
					id: 2,
					parent_id: 1,
					label: 'Reptile',
					children: [
						{
							id: 3,
							parent_id: 2,
							label: 'Snake',
							children: [
							]
						},
						{
							id: 5,
							parent_id: 2,
							label: 'Bird',
							children: [
								{
									id: 7,
									parent_id: 5,
									label: 'Canary',
									children: []
								}
							]
						},
						{
							id: 6,
							parent_id: 2,
							label: 'Lizard',
							children: [
							]
						},
					]
				},
				{
					id: 8,
					parent_id: 1,
					label: 'Mammal',
					children: [
						{
							id: 9,
							parent_id: 8,
							label: 'Equine',
							children: [
								{
									id: 10,
									parent_id: 9,
									label: 'Zebra',
									children: []
								}
							] 
						}
					]
				}
			]
		}]
	}
})();