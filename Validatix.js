const interToken = Symbol("creation token for TestClass");

class validatix
{
	constructor(myt)
	{
		if (myt !== interToken) {
			throw "Use static create function to create a new instance.";
		}
		this.rules = {
			phoneNumber: function(str) {
				let PHONENUMBER = /^(0|\+98)(9\d{2})(\d{7})$/
				let iranPhoneCode = ["901", "902", "903", "921", "922", "990", "999"];
				for (let i = 0; i < 10; ++i){
					iranPhoneCode.push("91" + i.toString());
					iranPhoneCode.push("93" + i.toString());
				}
				let regTest = PHONENUMBER.test(str);
				let matches = str.match(PHONENUMBER);
				if (typeof(matches) == undefined && matches.length == 0)
					return false;
				return regTest && iranPhoneCode.includes(matches[2]);
			},

			MinLen: function(str, value) {
				return str.length >= value;
			},

			MaxLen: function(str, value) {
				return str.length <= value;
			},

			NationalIdNumber: function(str) {
				if (!/^\d{10}$/.test(str)) {
					return false;
				}

				let check = parseInt(str[9]);
				let sum = 0;
				for (let i = 0; i < 9; ++i) {
					sum += parseInt(str[i]) * (10 - i);
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
	checkRule(data, rule) {
		return this.rules[rule].apply(null, data);
	}
};

module.exports = validatix
