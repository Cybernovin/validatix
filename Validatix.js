const interToken = Symbol("creation token for TestClass");

class validatix
{
	constructor(myt)
	{
		if (myt !== interToken) {
			throw "Use static create function to create a new instance.";
		}
		this.rules = {
			phoneNumber: function(data) {
				let PHONENUMBER = /^(0|\+98)(9\d{2})(\d{7})$/
				let iranPhoneCode = ["901", "902", "903", "921", "922", "990", "999"];
				for (let i = 0; i < 10; ++i){
					iranPhoneCode.push("91" + i.toString());
					iranPhoneCode.push("93" + i.toString());
				}
				let regTest = PHONENUMBER.test(data.str);
				let matches = data.str.match(PHONENUMBER);
				if (typeof(matches) == undefined && matches.length == 0)
					return false;
				return regTest && iranPhoneCode.includes(matches[2]);
			},

			MinLen: function(data) {
				return data.str.length >= data.minValue;
			},

			MaxLen: function(data) {
				return data.str.length <= data.maxValue;
			},

			NationalIdNumber: function(data) {
				if (!/^\d{10}$/.test(data.str)) {
					return false;
				}

				let check = parseInt(data.str[9]);
				let sum = 0;
				for (let i = 0; i < 9; ++i) {
					sum += parseInt(data.str[i]) * (10 - i);
				}
				sum = sum % 11;

				return (sum < 2 && check === sum) || (sum >= 2 && sum + check === 11);
			}
		};
	}

	static Captalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static create(){
		let instanc = new validatix(interToken);
		for (let i in instanc.rules) {
			console.log("check" + validatix.Captalize(i));
			instanc["check" + validatix.Captalize(i)] = function(data) {
				return instanc.checkRule(data, i);
			}
		}
		return instanc;
	}
	checkManyRules(dataRuleMessages) {
		var messages = {};
		var errors = {};
		var errored = [];
		let isOk = true;

		dataRuleMessages.forEach(element => {
			let Elementmessages = {};
			let elementErrors = {};
			let isElementOk = true;
			element.ruleMessages.forEach(ruleMessage => {
				if (this.checkRule(data, ruleMessage.rule)) {
					Elementmessages[ruleMessage.rule] = "OK";
				}
				else {
					isElementOk = false;
					elementErrors[ruleMessage.rule] = ruleMessage.message;
					Elementmessages[ruleMessage.rule] = ruleMessage.message;
				}
			});
			if (!isElementOk)
				errored.push(data.name);
			Elementmessages.isOk = isElementOk;
			isOk |= isElementOk;
			errors[data.name] = elementErrors;
			messages[data.name] = Elementmessages;
		});
		var result = {};
		result.messages = messages;
		result.errors = elementErrors
		result.isOk = isOk;
		return result;
	}

	checkRule(data, rule) {
		return this.rules[rule.name](data);
	}
};

module.exports = validatix
