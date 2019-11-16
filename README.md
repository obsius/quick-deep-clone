# Quick Deep Clone (qdclone)

Quick deep cloning for JavaScript.  

Unsafe for use on cyclical data structures. Does not copy functions as object properties.  

Pass true as a second argument to construct prototypes, false to instantiate as plain objects.

## Usage

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

## License

MIT