var expect = require("chai").expect;
var validatix = (require("../Validatix.js")).create()

describe("Rules", function(){
	describe("Check PhoneNumber rule", function() {
		it("Check valid numbers", function() {
			let ValidNums = [["+989036776234"], ["+989334732392"], ["09214962753"], ["+989183191419"], ["09128821940"]];
			for (let number of ValidNums) {
				expect(validatix.checkRule(number, "phoneNumber")).to.be.true;
			}
		});
		it("Check invalid numbers", function() {
			let InvalidNums = [["9036776234"], ["9245412132"], ["12"], ["0903"], ["0903432234545"], ["09094732392"]];
			for (let number of InvalidNums) {
				expect(validatix.checkRule(number, "phoneNumber")).to.be.false;
			}
		});
	});
	describe("Check MinLen rule", function() {
		it("Check valid cases", function() {
			let validCase = [["123456", 0],["vjwfoingnj", 5],["", 0],["1", 1]];
			for (let Case of validCase) {
				expect(validatix.checkRule(Case, "MinLen")).to.be.true;
			}
		});
		it("Check invalid cases", function() {
			let invalidCase = [["12356", 10],["vjwfoing", 9],["1234", 22],["1", 2]];
			for (let Case of invalidCase) {
				expect(validatix.checkRule(Case, "MinLen")).to.be.false;
			}
		});
	});

	describe("Check Max rule", function() {
		it("Check valid cases", function() {
			let validCase = [["12356", 10],["vjwfoing", 9],["1234", 22],["1", 2]];
			for (let Case of validCase) {
				expect(validatix.checkRule(Case, "MaxLen")).to.be.true;
			}
		});
		it("Check invalid cases", function() {
			let invalidCase = [["123456", 0],["vjwfoingnj", 5],["1", 0]];
			for (let Case of invalidCase) {
				expect(validatix.checkRule(Case, "MaxLen")).to.be.false;
			}
		});
	});
})
