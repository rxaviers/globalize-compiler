var escodegen = require( "escodegen" );
var esprima = require( "esprima" );

var Syntax = esprima.Syntax;

module.exports = {
	test: function( node ) {
		return node.type === Syntax.CallExpression &&
			node.callee.type === Syntax.MemberExpression &&
			node.callee.object.type === Syntax.Identifier &&
			node.callee.object.name === "Globalize" &&
			node.callee.property.type === Syntax.Identifier && (
				node.callee.property.name === "currencyFormatter" ||
				node.callee.property.name === "dateFormatter" ||
				node.callee.property.name === "dateParser" ||
				node.callee.property.name === "numberFormatter" ||
				node.callee.property.name === "numberParser" ||
				node.callee.property.name === "relativeTimeFormatter" ||
				node.callee.property.name === "pluralGenerator"
			);
	},

	getFormatterOrParser: function( node ) {
		return "Globalize." + node.callee.property.name + "(" +
			node.arguments.map(function( argument ) {
				return escodegen.generate( argument );
			}).join( ", " ) +
			")";
	}
};