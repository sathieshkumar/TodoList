module.exports = {
	"env": {
			"es6": true,
			"node": true,
			"mocha": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
			"ecmaVersion": 2018,
			"sourceType": "module"
	},
	"rules": {
			"linebreak-style": [
					"error",
					"unix"
			],
			"quotes": [
					"error",
					"single"
			],
			"semi": [
					"error",
					"always"
			],
			'no-extra-semi': 2,
			curly: [2, "multi-line"],
			'camelcase': 1,
	}
};