'use strict';

class OutBuffer {
	constructor (size) {
		this.idx = 0;
		this.arrayBuffer = new ArrayBuffer(size);
		this.buffer = new Uint8Array(this.arrayBuffer, 0, size);
	}

	send (ws) {
		var b = new Uint8Array(this.arrayBuffer, 0, this.idx);
		ws.send(b);
		CommOut.bufferPool.recycle(this);
	}

	packInt8 (val) {
		this.buffer[this.idx] = val & 255;
		this.idx++;
	}

	packInt16 (val) {
		this.buffer[this.idx] = val & 255;
		this.buffer[this.idx + 1] = (val >> 8) & 255;
		this.idx += 2;
	}

	packInt24 (val) {
		this.buffer[this.idx] = val & 255;
		this.buffer[this.idx + 1] = (val >> 8) & 255;
		this.buffer[this.idx + 2] = (val >> 16) & 255;
		this.idx += 3;
	}

	packInt32 (val) {
		this.buffer[this.idx] = val & 255;
		this.buffer[this.idx + 1] = (val >> 8) & 255;
		this.buffer[this.idx + 2] = (val >> 16) & 255;
		this.buffer[this.idx + 3] = (val >> 24) & 255;
		this.idx += 4;
	}

	packRadU (val) {
		this.packInt24(val * 2097152);
	}

	packRad (val) {
		this.packInt16((val + Math.PI) * 8192);
	}

	packFloat (val) {
		this.packInt16(val * 256);
	}

	packDouble (val) {
		this.packInt32(val * 1048576);
	}

	packString (str) {
		if (typeof str !== 'string') str = ''
		this.packInt8(str.length);
		for(var i = 0; i < str.length; i++) {
			this.packInt16(str.charCodeAt(i));
		}
	}

	packLongString (str) {
		if (typeof str !== 'string') str = ''
		this.packInt16(str.length);
		for(var i = 0; i < str.length; i++) {
			this.packInt16(str.charCodeAt(i));
		}
	}
}

class CommOut {
	static buffer = null;
	static bufferPool = new Pool(() => { return new OutBuffer(16384); }, 2);

	static getBuffer () {
		var b = this.bufferPool.retrieve();
		b.idx = 0;
		return b;
	}
}

class CommIn {
	static buffer;
	static idx;

	static init (buf) {
		this.buffer = new Uint8Array(buf);
		this.idx = 0;
	}

	static isMoreDataAvailable () {
		return Math.max(0, this.buffer.length - this.idx);
	}

	static peekInt8U () {
		return this.buffer[this.idx];
	}

	static unPackInt8U () {
		var i = this.idx;
		this.idx++;
		return this.buffer[i];
	}

	static unPackInt8 () {
		var v = this.unPackInt8U();
		return (v + 128) % 256 - 128;
	}

	static unPackInt16U () {
		var i = this.idx;
		this.idx += 2;
		return this.buffer[i] + (this.buffer[i + 1] * 256);
	}

	static unPackInt24U () {
		var i = this.idx;
		this.idx += 3;
		return this.buffer[i] +
			(this.buffer[i + 1] * 256) +
			(this.buffer[i + 2] * 65536);
	}

	static unPackInt32U () {
		var i = this.idx;
		this.idx += 4;
		return this.buffer[i] +
			(this.buffer[i + 1] * 256) +
			(this.buffer[i + 2] * 65536) +
			(this.buffer[i + 3] * 16777216);
	}

	static unPackInt16 () {
		var v = this.unPackInt16U();
		return (v + 32768) % 65536 - 32768;
	}

	static unPackInt32 () {
		var v = this.unPackInt32U();
		return (v + 2147483648) % 4294967296 - 2147483648;
	}

	// Unsigned radians (0 to 6.2831)
	static unPackRadU () {
		return this.unPackInt24U() / 2097152;
	}

	// Signed radians (-3.1416 to 3.1416)
	static unPackRad () {
		var v = this.unPackInt16U() / 8192;
		return v - Math.PI;
	}

	// Float value packing (-327.68 to 327.67)
	static unPackFloat () {
		return this.unPackInt16() / 256;
	}

	static unPackDouble () {
		return this.unPackInt32() / 1048576;
	}

	static unPackString (maxLen) {
		maxLen = maxLen || 255;
		var len = Math.min(this.unPackInt8U(), maxLen);
		return this.unPackStringHelper(len);
	}

	static unPackLongString (maxLen) {
		maxLen = maxLen || 16383;
		var len = Math.min(this.unPackInt16U(), maxLen);
		return this.unPackStringHelper(len);
	}

	static unPackStringHelper (len) {
		let remainder = this.isMoreDataAvailable();
		if (remainder < len) return 0;

		var str = new String();

		for(var i = 0; i < len; i++) {
			var c = this.unPackInt16U();
			if (c > 0) str += String.fromCodePoint(c);
		}

		return str;
	}
}