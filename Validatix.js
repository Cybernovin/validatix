class validatix
{
	constructor()
	{
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

	check(data, rule) {
		return this.rules[rule].apply(null, data);
	}
};
module.exports = validatix
