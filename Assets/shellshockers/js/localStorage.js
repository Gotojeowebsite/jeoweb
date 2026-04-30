
function getStoredNumber (name, def) {
	var num = localStore.getItem(name);
	if (!num) {
		return def;
	}
	return Number(num);
}

function getStoredBool (name, def) {
	var str = localStore.getItem(name);
	if (!str) {
		return def;
	}
	return str == 'true' ? true : false;
}

function getStoredString (name, def) {
	var str = localStore.getItem(name);
	if (!str) {
		return def;
	}
	return str;
}

function getStoredObject (name, def) {
	var str = localStore.getItem(name);
	if (!str) {
		return def;
	}
	return JSON.parse(str);
}

function getSetIncrementStoredNum(name, set) {
	const val = localStore.getItem(name);
	if (val) {
		localStore.setItem(name, Number(val) + set);
	} else {
		localStore.setItem(name, set);
	}
	return Number(localStore.getItem(name));
}
