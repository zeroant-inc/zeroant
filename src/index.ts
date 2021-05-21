export const snakeCaseToCamelCase = (userInput = ""): string => {
	if (userInput === undefined || userInput === null) return "";
	return userInput
		.toLowerCase()
		.split("_")
		.reduce((a = "", b, i) => (i == 0 ? a + b : a + b.substr(0, 1).toUpperCase() + b.substr(1)));
};

export const camelCaseToSnakeCase = (userInput: string): string => {
	return userInput.replace(/([A-Z])/g, "_$1").toLowerCase();
};
export const makeRangeIterator = (
	start = 0,
	end = Infinity,
	step = 1,
): {
	next: () => { value: number; done: boolean };
} => {
	let nextIndex = start;
	let iterationCount = 0;

	const rangeIterator = {
		next: function () {
			let result;
			if (nextIndex < end) {
				result = { value: nextIndex, index: iterationCount, done: false };
				nextIndex += step;
				iterationCount++;
				return result;
			}
			return { value: nextIndex, index: iterationCount, done: true };
		},
	};
	return rangeIterator;
};

export class OIWriteStream<T = string | Buffer | number, R = any> {
	protected _on: { write: (chunk?: T) => OIWriteStream<T, R>; end: (chunk?: T) => OIWriteStream<T, R>; processor: (chunk?: R) => any } = {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		write: (chunk?: T): OIWriteStream<T, R> => {
			console.log(chunk);
			return this;
		},
		end: (chunk?: T): OIWriteStream<T, R> => {
			console.log(chunk);
			return this;
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		processor: (chunk?: R): any => {
			return chunk;
		},
	};
	write(chunk?: T): void {
		this._on.write(chunk);
	}
	end(chunk?: T): void {
		this._on.end(chunk);
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	processor(data: R) {
		return this._on.processor(data);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	on(event: "data" | "end" | "processor", cl: (chunk?: T | R) => void | any): void {
		if (event === "data") {
			this._on.write = cl;
		}
		if (event === "end") {
			this._on.end = cl;
		}
		if (event === "processor") {
			this._on.processor = cl;
		}
	}
}
