const interToken = Symbol("creation token for TestClass");

class validatix
{
	constructor(myt)
	{
		if (myt !== interToken) {
			throw "Use static create function to create a new instance.";
		}

		this.lastValidate = {
			createBag: function(messages, errors, isOk) {
				this.messages = messages;
				this.errors = errors;
				this.isOk = isOk;
				return this;

				for (const error in errors) {
					if (errors.hasOwnProperty(error)) {
						this.errored.push(error);
					}
				}
			},
			purgeBag: function(){this.createBag({},{},{})}
		};

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
			},

			required: function(data) {
				data.minValue = 1;
				return this.MinLen(data);
			}
		};
	}

	static Captalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static create(){
		let instanc = new validatix(interToken);
		for (let i in instanc.rules) {
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
			let isElementRequired = false;
			let Elementmessages = {};
			let elementErrors = {};
			let isElementOk = true;
			element.ruleMessages.forEach(ruleMessage => {
				if (ruleMessage.rule === "required") {
					isElementRequired = true;
				}

				if (this.checkRule(element.data, ruleMessage.rule)) {
					Elementmessages[ruleMessage.rule.name] = "OK";
				}
				else {
					isElementOk = false;
					elementErrors[ruleMessage.rule.name] = ruleMessage.message;
					Elementmessages[ruleMessage.rule.name] = ruleMessage.message;
				}
			});
			if (!isElementOk)
				errored.push(element.data.name);
			if (isElementRequired && !isElementOk)
				isOk = false;
			Elementmessages.isOk = isElementOk;
			errors[element.data.name] = elementErrors;
			messages[element.data.name] = Elementmessages;
		});
		this.lastValidate.createBag(messages, errors, isOk);
		return this.lastValidate;
	}

	checkRule(data, rule) {
		let newData = Object.assign({}, data)
		for (const i in rule) {
			if (rule.hasOwnProperty(i) && i !== "name") {
				newData[i] = rule[i];
			}
		}
		return this.rules[rule.name](newData);
	}
};

module.exports = validatix
