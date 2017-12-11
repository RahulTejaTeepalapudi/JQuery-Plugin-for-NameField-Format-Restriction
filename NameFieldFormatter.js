//============================//
// Author : Rahul Teja T      //
// Created Date : 04/12/2017  //              
//============================//

//<<=============================================Member Name Format Validation================================>>//

//Summary: This Plugin is a Name Field Format Restrictor. For Restricting Certain Special Characters, Numbers in any Input Field.
//This Used in..AddMember, Edit Member, Add Form Prefill on Search etc..
(function ($) {
    $.fn.ValidateName = function (options) {
        var $this = $(this); //The Name Field To which Format Restriction to be Applied
        var val = $this.val();
        //Saving the Default Options In to Settings.
        var settings = $.extend({
            // These are the default Settings.
            allow: "-,.",
            types: ["SpecialCharacters,Numerics,AlphaNumerics"],
            replace: true
        }, options);

        // Helper Methods to hanlde Certain Needs.
        var Helpers = function () { };
        Helpers.prototype.CheckIfExistsAndReturnNumbers = function (val) {
            var exp = /\d+/g;
            var m; var toReturn = "";
            while ((m = exp.exec(val)) != null) {
                toReturn = toReturn.concat(m[0]);
            }
            return toReturn;
        }
        Helpers.prototype.CheckIfExistsAndReturnCharacters = function (val) {
            var exp = /\d+/g;
            var m; var numstring = "";
            while ((m = exp.exec(val)) != null) {
                numstring = numstring.concat(m[0]);
            }
            if (numstring) {
                return val.split(numstring).join("");
            } else {
                return null;
            }
        }

        //To Reset the Entered Value which is to be Restricted.
        var ResetValueWithRegexReplace = function ($Input, val, regexType) {
            switch (regexType) {
                case "SpecialCharacters":
                    //$Input.val(val.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
                    $Input.val(val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
                    break;
                case "Numerics":
                    $Input.val(val.replace(/^\d+$/, ''));
                    break;
                case "AlphaNumerics":
                    $Input.val(val.replace(/\d+/g, ''));
                    break;
                default:
                    break;
            }
        }
        // Regex Checkers Object which holds All the Regex Check Functions in its Prototype.
        var RegexChecker = {
            SpecialCharactersRegexCheck : function (val) {
                //var hasSpecialChars =          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
                //var hasSpecialChars = new RegExp(/[`~!@#$%^&*()_|+\=?;:'",<>\{\}\[\]\\\/]/gi).test(val); // Removed hyphen(-) & dot(.) from Regex. Because, '-'&'.' is allowed.
                var hasSpecialChars = new RegExp(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi).test(val); // Included hyphen(-) & dot(.) from Regex. Because, '-'&'.' is Not allowed.
                if (hasSpecialChars) {
                    return true;
                } else {
                    return false;
                }
            },
            NumericsRegexCheck : function (val) {
                var hasNumerics = new RegExp(/^\d+$/).test(val);
                if (hasNumerics) {
                    return true;
                } else {
                    return false;
                }
            },
            AlphaNumericRegexCheck : function (val) {
                //var hasAlphaNumerics = new RegExp(/^([0-9]|[a-z])+([0-9a-z]+)$/i).test(val);
                var hasAlphaNumerics = new RegExp(/^[a-z0-9\s]+$/i).test(val); //AlphaNumerics Regular Expression which considers spaces.
                if (hasAlphaNumerics) {
                    return true;
                } else {
                    return false;
                }
            }
        };
        
        if (val) {
            if (RegexChecker.SpecialCharactersRegexCheck(val)) {
                //If the Entered Input Value is a Special Characters String
                ResetValueWithRegexReplace($this, val, "SpecialCharacters");
                //If the Remained Value is only Number String (without any characters)
                if ($this.val()) {
                    val = $this.val().trim();
                    if (RegexChecker.NumericsRegexCheck(val)) {
                        //If the Remained Value is only Number(without any characters)
                        ResetValueWithRegexReplace($this, val, "Numerics");
                    }
                    else if (RegexChecker.AlphaNumericRegexCheck(val)) {
                        //Remained Value will a AlphaNumeric String
                        ResetValueWithRegexReplace($this, val, "AlphaNumerics");
                    }
                }
            }
            else if (RegexChecker.AlphaNumericRegexCheck(val)) {
                //If the Entered Input Value is a AlphaNumeric String
                ResetValueWithRegexReplace($this, val, "AlphaNumerics");
            }
            else if (RegexChecker.NumericsRegexCheck(val)) {
                //If the Entered Input Value is only Number String (without any characters)
                ResetValueWithRegexReplace($this, val, "Numerics");
            }
        }
    };
}(jQuery));
//<<=============================================Member Name Format Validation================================>>//