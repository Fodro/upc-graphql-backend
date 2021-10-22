module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'nestjs'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:nestjs/recommended',
	],
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	rules: {
		//prettier
		'prettier/prettier': 0, // disable that monster

		//style
		'array-bracket-spacing': [2, 'never'],
		'arrow-parens': [2, 'always'],
		'brace-style': [2, 'stroustrup'],
		'comma-dangle': [2, 'always-multiline'],
		'comma-spacing': [2, { before: false, after: true }],
		curly: [2, 'multi-or-nest'],
		'eol-last': [2, 'always'],
		indent: [
			2,
			'tab',
			{
				SwitchCase: 1,
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
			},
		],
		'key-spacing': [2, { beforeColon: false, afterColon: true }],
		'linebreak-style': [2, 'unix'],
		'max-len': [2, { code: 130, ignoreComments: true }],
		'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
		'no-multi-spaces': 2,
		'no-multiple-empty-lines': [2, { max: 1 }],
		'object-curly-spacing': [2, 'always'],
		quotes: [2, 'single'],
		semi: [2, 'always'],
		'semi-spacing': [2, { before: false, after: true }],
		'semi-style': [2, 'last'],
		'space-in-parens': [2, 'never'],
		'padded-blocks': [2, 'never'],

		//semantics
		'handle-callback-err': 0,
		'no-console': 1,
		radix: [2, 'as-needed'],

		//typescript
		'no-empty-function': 0,
		'@typescript-eslint/no-empty-function': 1,
		'no-unused-vars': 0,
		'@typescript-eslint/no-unused-vars': 1,

		'@typescript-eslint/triple-slash-reference': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'import/first': 0,
	},
};
