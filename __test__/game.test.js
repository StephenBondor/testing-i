const enhance = require('../game');

describe('enhance library', () => {
	//initial values
	const item = {
		type: 'weapon',
		name: '[+8] Shield',
		durability: 90,
		enhancement: 8
	};

	//success tests
	describe('success() method', () => {
		const expected = {
			type: 'weapon',
			name: '[+9] Lambda Shield',
			durability: 90,
			enhancement: 9
		};

		// act - execute SUT (System Under Test)
		const actual = enhance.success(item);

		// assert
		expect(actual).toEqual(expected);
		expect(actual.enhancement).toBe(9);
		expect(actual.durrability).toBe(90);
		expect(actual.name).toBe('[+9] Lambda Shield');

		//The maximun enhancement possible is PEN.
		const item5 = {
			type: 'weapon',
			name: '[+20] Shield',
			durability: 90,
			enhancement: 20
		};

		const expected5 = {
			type: 'weapon',
			name: '[+20] Lambda Shield',
			durability: 90,
			enhancement: 20
		};

		// act - execute SUT (System Under Test)
		const actual5 = enhance.success(item5);

		// assert
		expect(actual5).toEqual(expected5);
		expect(actual5.enhancement).toBe(expected5.enhancement);
		expect(actual5.durability).toBe(expected5.durrability);
		expect(actual5.name).toBe(expected5.name);
	});

	//fail tests
	describe('fail() method', () => {
		//test for "The durability of the item is decreased by 5 if the item's enhancement is between 0 and 14."
		const expected = {
			type: 'weapon',
			name: '[+9] Lambda Shield',
			durability: 85,
			enhancement: 9
		};

		// act - execute SUT (System Under Test)
		const actual = enhance.fail(item);

		// assert
		expect(actual).toEqual(expected);
		expect(actual.enhancement).toBe(9);
		expect(actual.durability).toBe(85);
		expect(actual.name).toBe('[+9] Lambda Shield');

		//TEST FOR The durability of the item is decreased by 10 if the item's enhancement is greater than 14.
		const item2 = {
			type: 'weapon',
			name: '[+15] Lambda Shield',
			durability: 90,
			enhancement: 15
		};
		const expected2 = {
			type: 'weapon',
			name: '[+15] Lambda Shield',
			durability: 80,
			enhancement: 15
		};

		// act - execute SUT (System Under Test)
		const actual2 = enhance.fail(item2);

		// assert
		expect(actual2).toEqual(expected2);
		expect(actual2.enhancement).toBe(15);
		expect(actual2.durability).toBe(80);
		expect(actual2.name).toBe('[+9] Lambda Shield');

		//If the item's enhancement level is greater than 16 (DUO, TRI, TET), the enhancement level decreases by 1 (a DUO item would go back to PRI on failure).
		const item3 = {
			type: 'weapon',
			name: '[+17] Lambda Shield',
			durability: 90,
			enhancement: 17
		};
		const expected3 = {
			type: 'weapon',
			name: '[+16] Lambda Shield',
			durability: 80,
			enhancement: 16
		};

		// act - execute SUT (System Under Test)
		const actual3 = enhance.fail(item3);

		// assert
		expect(actual3).toEqual(expected3);
		expect(actual3.enhancement).toBe(expected3.enhancement);
		expect(actual3.durability).toBe(expected3.durrability);
		expect(actual3.name).toBe(expected3.name);

		//If the item's enhancement is 14 or lower, the item cannot be enhanced if the durability is below 25.
		const item4 = {
			type: 'weapon',
			name: '[+14] Lambda Shield',
			durability: 24,
			enhancement: 14
		};
		const expected4 = {
			type: 'weapon',
			name: '[+9] Lambda Shield',
			durability: 85,
			enhancement: 9
		};

		// act - execute SUT (System Under Test)
		const actual4 = enhance.fail(item4);

		// assert
		expect(actual4).toEqual(expected4);
		expect(actual4.enhancement).toBe(expected4.enhancement);
		expect(actual4.durability).toBe(expected4.durrability);
		expect(actual4.name).toBe(expected4.name);
	});

	//repair tests
	describe('repair() method', () => {
		//
	});
});
