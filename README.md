# Quick Deep Clone (qdclone)

Quick deep cloning for JavaScript.  

Unsafe for use on cyclical data structures. Does not copy functions as object properties.

## Usage

Pass an object to clone as the first variable.  
Pass true as the second argument to construct prototypes, empty or false to instantiate as plain objects.

*Performance comes at a cost:*
- no cyclic objects
- no protos that require arguments on construction (if `cast` flag is `true`)
- no objects that shadow global proto properties
- no polluted base prototypes

```js
clone(obj, cast = false)
```

## Example

```js
const qdclone = require('quick-deep-clone');

let x = {
	str: 'str',
	num: 10,
	arr: [0, 1, 2]
};

function A() {
	this.str = 'str';
	this.num = 10;
	this.arr = [0, 1, 2];
}

// deep clone a plain object
console.log(qdclone(x));

// deep clone a prototyped object
console.log(qdclone(new A(), true));

// deep clone a prototyped object as a plain object
console.log(qdclone(new A(), false));
```

## Benchmarks

Package | Time (ms)
-|-
deep-clone@3.0.3 | 1361
rfdc@1.1.4 | 1048
qdclone | 441
qdclone (*\*w/casting*) | 525

*\* only `quick-deep-clone` supports casting prototypes*

```js
const { performance } = require('perf_hooks');

const cloners = {
	'deep-clone': require('deep-clone'),
	'rfdc': require('rfdc')(),
	'qdclone': require('quick-deep-clone')
};

const ITERATIONS = 10000;

setImmediate(() => {

	let x = makeX();
	
	console.log('\nRunning...\n')

	runBench('deep-clone', x, ITERATIONS);
	runBench('rfdc', x, ITERATIONS);
	runBench('qdclone', x, ITERATIONS);
	
	console.log('Running with prototype casting (only supported by qdclone)...\n');

	runBench('qdclone', x, ITERATIONS, true);
});

function runBench(type, obj, iterations, ...args) {
	
	let cloned;

	console.log(`Clone via ${type}...`);
	
	let benchStart = performance.now();

	for (let i = 0; i < iterations; ++i) {
		cloned = cloners[type](obj, ...args);
	}

	console.log(`${performance.now() - benchStart} ms\n`);

	return cloned;
}

/* object */

function makeX() {

	let x = {
		str: 'str',
		num: 10,
		arr: [0, 1, 2],
		date: new Date(),
		bool: false,
		sub: {
			str2: 'abcdefghijklmnopqrstuvwxyz',
			num2: 9999999.9999999,
			bool2: true,
			arr2: [-.0000001, true, 'asdf', 100000.00001, [1, 2, 3], 'loooooooooooong']
		}
	};

	let x2 = {
		x: JSON.parse(JSON.stringify(x))
	};

	let x3 = {
		x: JSON.parse(JSON.stringify(x)),
		x2: JSON.parse(JSON.stringify(x2))
	};

	let xs = [];

	for (let i = 0; i < 100; ++i) {
		xs.push(JSON.parse(JSON.stringify(x)));
	}

	return new class X {
		constructor() {
			this.x = x;
			this.x2 = x2;
			this.x3 = x3;
			this.xs = xs;
		}
	}
}
```

## License

MIT