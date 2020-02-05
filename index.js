module.exports = clone;

/**
 * Deep clone an object. Pass true as a second argument to construct prototypes, false to instantiate as plain objects.
 * Unsafe for use on cyclical data structures. Does not copy functions as object properties.
 * 
 * @param { Object } obj - an object to clone
 * @param { boolean } [ cast = false ] - true to cast objects as prototypes
 * @param { boolean } [ suppress = false ] - true to supress prototype.clone() on first recursive call
 */
function clone(obj, cast, suppress) {

	// falsey primitive, null, or undefined
	if (!obj) {
		return obj;
	}

	// object
	if (typeof obj == 'object') {

		// array
		if (Array.isArray(obj)) {

			let retObj = new Array(obj.length);

			for (let i = 0; i < obj.length; ++i) {
				retObj[i] = clone(obj[i], cast);
			}

			return retObj;

		// object
		} else {

			// date, regex, typed array / array buffer
			if (obj instanceof Date || obj instanceof RegExp || obj instanceof ArrayBuffer) {
				return new obj.constructor(obj);

			// prototyped or plain object
			} else {

				// use clone function if available
				if (cast && !suppress && typeof obj.clone == 'function') {
					return obj.clone();

				// create clone from prototype or plain object
				} else {

					let retObj = (cast && obj.constructor && obj.constructor.prototype != Object.prototype) ? new obj.constructor() : {};

					for (let key in obj) {

						// ignore functions: too much fuss with scope
						if (typeof obj[key] != 'function') {
							retObj[key] = clone(obj[key], cast);
						}
					}
				}

				return retObj;
			}
		}
	}

	// primitive or a function
	return obj;
}