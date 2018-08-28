var expect = require("chai").expect;
var validatix = new (require("../Validatix.js"))()

describe("Rules", function(){
	describe("Check PhoneNumber rule", function() {
		it("Check valid numbers", function() {
			let ValidNums = [["+989036776234"], ["+989334732392"], ["09214962753"], ["+989183191419"], ["09128821940"]];
			for (let number of ValidNums) {
				expect(validatix.check(number, "phoneNumber")).to.be.true;
			}
		});
		it("Check invalid numbers", function() {
			let InvalidNums = [["9036776234"], ["9245412132"], ["12"], ["0903"], ["0903432234545"], ["09094732392"]];
			for (let number of InvalidNums) {
				expect(validatix.check(number, "phoneNumber")).to.be.false;
			}
		});
	});
	});
	it("Check Min rule");
	it("Check Max rule");
})
