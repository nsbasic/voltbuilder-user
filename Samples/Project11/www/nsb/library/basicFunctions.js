//Copyright (c) 2020 NSB Corporation. All rights reserved.
//BASIC Helper functions

var NSB = NSB || {}; // setup the NSB namespace, if needed

//vbScript GetRef function: GetRef(sub name)
function GetRef(str) {
    if (typeof (str) === 'string') {
        return window[str];
    } else {
        return str;
    }
}

//vbScript mid syntax: mid(string1, start[,end])
// string1: string to cust from; start: start of cut; end: end of cut (if no end, then to end of string1)
function Mid(strMid, intBeg, intEnd) {
    //setup variables in case there is no intEnd (optional value in vbScript)
    if (strMid === null || strMid === '' || intBeg < 0) {
        return '';
    }
    intBeg -= 1; //reset vbScript 1 base
    if (intEnd === null || intEnd === '') {
        return strMid.substr(intBeg);
    } else {
        return strMid.substr(intBeg, intEnd);
    }
}
var MidB = Mid;

//Splice function: Splice(array, index, howmany [,item])
function Splice(arr, i, c, el) {
    if (el === undefined)
        return arr.splice(i, c);
    else
        return arr.splice(i, c, el);
}

//indexOf function: indexOf(var,item[,fromIndex])
function IndexOf(a, el, fromIndex) {
    return a.indexOf(el, fromIndex);
}

//Push function: Push(array,item)
function Push(arr, el) {
    return arr.push(el);
}

//Push function: Push(array,item)
function ForEach(obj, func) {
    obj.forEach(func);
}

//Format("The month is {0}", "January")
function Format() {
    var shift = [].shift;
    var str = shift.apply(arguments);
    return str.format.apply(str, arguments);
}

//vbScript Right function: Right(str,len)
function Right(str, n) {
    var s = str + '';
    var iLen = s.length;
    if (n <= 0) {
        return "";
    } else if (n >= iLen) {
        return s;
    } else {
        return s.substr(iLen - n, n);
    }
}
var RightB = Right;

//vbScript Left function: Left(str,len)
function Left(str, n) {
    var s = str + '';
    var iLen = s.length;
    if (n <= 0) {
        return "";
    } else if (n >= iLen) {
        return str;
    } else {
        return s.substr(0, n);
    }
}
var LeftB = Left;

//vbScript RTrim function: RTrim(str)
function RTrim(str) {
    var whitespace = " \t\n\r";
    var s = str;
    if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {
        var i = s.length - 1; // Get length of string
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {
            i--;
        }
        s = s.substring(0, i + 1);
    }
    return s;
}

//vbScript LTrim function: LTrim(str)
function LTrim(str) {
    var whitespace = " \t\n\r";
    var s = str;
    if (whitespace.indexOf(s.charAt(0)) != -1) {
        var j = 0,
            i = s.length;
        while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
            j++;
        }
        s = s.substring(j, i);
    }
    return s;
}

//vbScript Trim
function Trim(str) {
    return LTrim(RTrim(str));
}

//vbScript Sgn
function Sgn(val) {
    /*  >0 - Sgn returns 1
        =0 - Sgn returns 0
        <0 - Sgn returns -1
    */
    if (typeof (val) === 'string') {
        val = parseFloat(val);
    }
    if (val === 0) {
        return 0;
    }
    if (val < 0) {
        return -1;
    }
    return 1;
}

//vbScript Len function: Len(str)
function Len(str) {
    if (typeof (str) === 'object') {
        return str.length;
    }
    str = str + '';
    return str.length;
}

//vbScript Replace function: Replace(string,find,replacewith[,start[,count[,compare]]])
function Replace(str, fnd, rpl, st, cnt, cmp) {
	var regex;
    if (st === null || st === "" || st < 0) {
        st = 1;
    }
    st -= 1;
    if (cnt === null || cnt === "" || cnt < 0) {
        cnt = 0;
    }
    if (st >= 0) {
        str = str.substr(st, str.length);
    }
    fnd = fnd.replace(/([\$\^\[\(\)\|\*\+\?\.\\])/g, '\\$1');
    var opt = '';
    cmp = cmp + "";
    if (cmp === '1') {
        opt = 'i';
    }
    if (cnt > 0) {
        regex = new RegExp(fnd, opt);
        for (var i = 0; i < cnt; i++) {
            str = str.replace(regex, rpl);
        }
    } else {
        opt += 'g';
        regex = new RegExp(fnd, opt);
        str = str.replace(regex, rpl);
    }
    return str;
}

//vbScript StrReverse function: StrReverse(str)
function StrReverse(s) {
    var sArray = s.split("");
    var rArray = sArray.reverse();
    return rArray.join("");
}

//vbScript Year function: Year(date)
function Year(dt) {
    if (IsNull(dt)) {
        return null;
    }
    var regex = new RegExp('-', 'g');
    try {
        dt = dt.replace(regex, '/'); //try/catch skips full date text of javascript
    } catch (e) {}
    var dat = new Date(dt);
    return dat.getFullYear();
}

function Sort(arrayToSort, sortType, sortFunc) {
    //arguments: array to sort, sort type (a=ascending, d=descending), sort function (for custom functions--parameter for sort function is arrayToSort)
    //syntax:   sort(arrayToSort)               <-- sortType defaulted to ascending
    //          sort(arrayToSort,'')            <-- sortType defaulted to ascending
    //          sort(arrayToSort,'d')           <-- descending sort
    //          sort(arrayToSort,'a')           <-- ascending sort
    //          sort(arrayToSort,'d',sortFunc)  <-- function sortFunc called with argument arrayToSort; function will return sorted array; sortType ignored
    //          sort(arrayToSort,sortFunc)      <-- function sortFunc called with argument arrayToSort; function will return sorted array
    if (!sortType || sortType === null || typeof (sortType) === 'undefined') {
        sortType = '';
    }
    if (!sortFunc || sortFunc === null || typeof (sortFunc) === 'undefined' || typeof (sortFunc) !== 'function') {
        sortFunc = '';
    }
    if (typeof (sortType) === 'function' && sortFunc === '') {
        sortFunc = sortType;
        sortType = 'a';
    } else {
        if (sortType !== 'd') {
            sortType = 'a';
        }
    }
    this._sortType = sortType;
    var arr = arrayToSort.slice();
    var ret = [];
    if (sortFunc === '' || typeof (sortFunc) !== 'function') {
        arr.sort();
        arr.sort(_sort1);
        ret = arr.slice();
    } else {
        //ret = sortFunc(arr).slice();
        ret = arr.sort(sortFunc);
    }
    return ret;

    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _sort1(a, b) { var x,y;
        if (_isNumber(a) && _isNumber(b)) {
            if (this._sortType === 'd') {
                y = a * 1;
                x = b * 1;
            } else {
                x = a * 1;
                y = b * 1;
            }
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        } else if (_isNumber(a) && !_isNumber(b)) {
            x = a * 1;
            y = b;
            return (this._sortType === 'd' ? 1 : -1);
        } else if (!_isNumber(a) && _isNumber(b)) {
            x = a;
            y = b * 1;
            return (this._sortType === 'd' ? -1 : 1);
        } else {
            if (this._sortType === 'd') {
                y = a.toLowerCase();
                x = b.toLowerCase();
            } else {
                x = a.toLowerCase();
                y = b.toLowerCase();
            }
            return ((x > y) ? 1 : (x === y ? 0 : -1));
        }
    }
}

//vbScript IsNumeric function: IsNumeric(var)
function IsNumeric(sText) {
    return !isNaN(sText);
}

//vbScript CByte/CLng/CInt function: CByte(n)
function CByte(n) {
    var i = n * 1;
    i = Math.round(i);
    //odd numbers round up if .5, even numbers don't
    if (i % 2 !== 0) {
        var j = Math.abs(n - i);
        if (j == 0.5) {
            i -= 1;
        }
    }
    return i;
}
var CInt = CByte;
var CLng = CByte;

//vbScript Round
function Round(n, d) {
    if (!d || d === null || d === "") {
        d = 0;
    }
    d = Math.floor(d);
    d = d < 1 ? 0 : d;
    d = Math.pow(10, d);
    var result = Math.round(n * d) / d;
    return result;
}

//vbScript CCur function: CCur(n) round to 4 decimal places
function CCur(num) {
    var dec = 4;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

//vbScript CSng function: CSng(n) round to 7 decimal places
function CSng(num) {
    var dec = 7;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

//vbScript imp functionality
function impFunc(a, b) {
    var val1 = a ? 1 : 0;
    var val2 = b ? 1 : 0;
    if (val1 == 1 && val2 == 1) return true;
    if (val1 == 1 && val2 === 0) return false;
    if (val1 === 0 && val2 == 1) return true;
    if (val1 === 0 && val2 === 0) return true;
    if (a === null && val2 == 1) return true;
    return null;
}

//vbScript exp functionality
function eqvFunc(a, b) {
    if (a === true && b === true || a === false && b === false) {
        return true;
    } else {
        return false;
    }
}

//convertDate helper function
function convertDate(dt, convertMonth) {
    if (typeof (dt) === 'object') {
        return dt;
    }
    if (dt === null || dt === '') {
        return null;
    }
    //new Date format
    dt = dt.toString();
    if (dt.match(/\s*\w{3}\s+\w{3}\s+\d{2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+\w{3}[\+\-]\d{4}/)) {
        if (convertMonth != 1) {
            return dt.replace(/\s*\w{3}\s+(\w{3})\s+(\d{2})\s+(\d{4})\s+(\d{2}:\d{2}:\d{2}).*/, '$1 $2, $3 $4');
        } else {
            dt = dt.replace(/\s*\w{3}\s+(\w{3})\s+(\d{2})\s+(\d{4})\s+(\d{2}:\d{2}:\d{2}).*/, '$2 $1 $3 $4');
        }
    }

    if (dt.match(/\s*(\d{1,2})(\s+|\s*\-\s*)([a-z]{3})(\s+|\s*\-\s*)(\d{2})($|\s+)/i)) {
        dt = dt.replace(/\s*(\d{1,2})(\s+|\s*\-\s*)([a-z]{3})(\s+|\s*\-\s*)(\d{2})($|\s+)/i, '$1 $3 20$5$6');
    }
    if (dt.match(/\s*\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/)) {
        dt = dt.replace(/\s*(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/, '$2-$3-$1');
    }
    if (!dt.match(/\s*\d{1,2}(\s+|\s*\-\s*)[a-z]{3}(\s+|\s*\-\s*)(\d{2}|\d{4})\s*/i)) {
        if (!dt.match(/\s*[a-z]+\s+\d{1,2},?\s+(\d{2}|\d{4})\s*/i)) {
            dt = dt.replace(/\-/g, '/').replace(/\;/g, '/').replace(/\s+/g, '/').replace(/\./g, '/').replace(/,/g, '/').replace(/\/+/g, '/');
            if (!dt.match(/\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})/)) {
                //check if time only
                if (dt.match(/^\s*\d{1,2}:\d{1,2}:\d{1,2}/)) { //match time only
                    var __dt__today = new Date();
                    var __m = (__dt__today.getMonth() + 1);
                    var __mon = (__m < 10) ? '0' + __m : __m;
                    var __d = __dt__today.getDate();
                    var __day = (__d < 10) ? '0' + __d : __d;
                    var s__dt__today = __mon + '/' + __day + '/' + __dt__today.getFullYear();
                    dt = s__dt__today + '  ' + dt; //add today's date to time entry
                } else {
                    return null;
                }
            }
        }
    }
    if (convertMonth == 1) {
        var smon = [$.i18n('Jan'), $.i18n('Feb'), $.i18n('Mar'), $.i18n('Apr'), $.i18n('May'), $.i18n('Jun'), $.i18n('Jul'), $.i18n('Aug'), $.i18n('Sep'), $.i18n('Oct'), $.i18n('Nov'), $.i18n('Dec')];
        var dmon = dt.replace(/(\w+)(\s+)(\w+)(\s+)(\w+)(\s+)(\S+)/, '$3');
        var nmon = 0;
        for (var i = 0; i < smon.length; i++) {
            if (dmon == smon[i]) {
                nmon = i + 1;
                break;
            }
        }
        dt = nmon + dt.replace(/(\w+)(\s+)(\w+)(\s+)(\w+)(\s+)(\S+)/, '/$1/$5 $7');
    } else {
        var sdt = dt;
        dt = dt.replace(/(\d+)(\s+|\/)([a-zA-Z]{3,})(\s+|\/)(\d+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|)([apAP][mM])/, '$1 $3 $5 $7:$9:$11 $13');
        if (sdt == dt) {
            dt = dt.replace(/(\d+)(\s+|\/)([a-zA-Z]{3,})(\s+|\/)(\d+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|)([apAP][mM])/, '$1 $3 $5 $7:$9 $11');
        }
        if (sdt == dt) {
            dt = dt.replace(/(\d+)(\s+|\/)([a-zA-Z]{3,})(\s+|\/)(\d+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|\:)(\w+)/, '$1 $3 $5 $7:$9:$11');
        }
        if (sdt == dt) {
            dt = dt.replace(/(\d+)(\s+|\/)([a-zA-Z]{3,})(\s+|\/)(\d+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)/, '$1 $3 $5 $7:$9');
        }
        if (sdt == dt) {
            dt = dt.replace(/(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|)([apAP][mM])/, '$1/$3/$5 $7:$9:$11 $13');
        }
        if (sdt == dt) {
            dt = dt.replace(/(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|)([apAP][mM])/, '$1/$3/$5 $7:$9 $11');
        }
        if (sdt == dt) {
            dt = dt.replace(/(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)(\s+|\/|\:)(\w+)/, '$1/$3/$5 $7:$9:$11');
        }
        if (sdt == dt) {
            dt = dt.replace(/(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/)(\w+)(\s+|\/|\:)(\w+)/, '$1/$3/$5 $7:$9');
        }
    }
    return dt;
}

//vbScript IsDate function: IsDate(date string)
function IsDate(dt) {
    if (typeof (dt) !== 'object' && IsNumeric(dt)) {
        return false;
    }
    var cdt = convertDate(dt, 0);
    if (IsNull(cdt) || isNaN(Year(cdt))) {
        return false;
    }
    return !isNaN(new Date(cdt));
}

//vbScript CDate
function CDate(dt) {
    if (typeof (dt) === 'undefined') {
        return 'undefined';
    }
    if (IsDate(dt)) {
        if (VarType(dt.toString(), 1) === 'date') {
            return FormatDateTime(dt, 2); //date
        }
        if (dt.toString().indexOf(':') > -1) {
            return FormatDateTime(dt, 3); //time
        } else {
            return FormatDateTime(dt, 2); //date
        }
    } else {
        return null;
    }
}

function CvDate(dt) {
    if (IsDate(dt)) {
        return new Date(convertDate(dt, 0));
    } else {
        return null;
    }
}

//vbScript DateAdd function: DateAdd(interval,number,date)
function DateAdd(dint, numval, thedate) {
	var omon, dat;
    if (!CvDate(thedate)) {
        return null;
    }
    if (isNaN(numval)) {
        return null;
    }

    numval = new Number(numval);
    var dt = CvDate(thedate);

    switch (dint.toLowerCase()) {
    case "yyyy":
        {
            dt.setFullYear(dt.getFullYear() + numval);
            break;
        }
    case "q":
        {
            omon = dt.getMonth();
            dt.setMonth(dt.getMonth() + (numval * 3));
            //fix problem with end of month date not correct for new month
            var nmon = dt.getMonth();
            var rmon = omon + (numval * 3) < 0 ? 12 + (omon + (numval * 3)) : omon + (numval * 3);
            if (rmon != nmon) {
                dat = dt.getDate();
                dt.setDate(dt.getDate() - dat);
            }
            break;
        }
    case "m":
        {
            omon = dt.getMonth();
            dt.setMonth(dt.getMonth() + numval);
            //fix problem with end of month date not correct for new month
            //          nmon=dt.getMonth();
            //          rmon=omon+numval<0?12+(omon+numval):omon+numval;
            //          if (rmon != nmon) {
            //              dat=dt.getDate();
            //              dt.setDate(dt.getDate() - dat);
            //          }
            break;
        }
    case "y":
    case "d":
    case "w":
        {
            dt.setDate(dt.getDate() + numval);
            break;
        }
    case "ww":
        {
            dt.setDate(dt.getDate() + (numval * 7));
            break;
        }
    case "h":
        {
            dt.setHours(dt.getHours() + numval);
            break;
        }
    case "n":
        {
            dt.setMinutes(dt.getMinutes() + numval);
            break;
        }
    case "s":
        {
            dt.setSeconds(dt.getSeconds() + numval);
            break;
        }
    case "ms":
        {
            dt.setMilliseconds(dt.getMilliseconds() + numval);
            break;
        }
    default:
        {
            return null;
        }
    }
    var fdt = FormatDateTime(dt, 2) + " " + FormatDateTime(dt, 3);
    return fdt;
}

//vbScript DatePart function: DatePart(interval,date[,firstdayofweek[,firstweekofyear]])
function DatePart(dint, thedate, fdow) {
    var d;
    //if(fdow==null) fdow=1;
    d = CvDate(thedate);
    if (!d) {
        if (_chkTime(thedate) !== '') {
            return null;
        }
        d = CvDate('1/1/2013 ' + thedate);
        if (!d) {
            return null;
        }
    }
    var dtPart = d;
    var leapYearAdj = 0;
    if (_testLeapYear(dtPart.getFullYear())) {
        //test if leap year and past 2/28
        if (dtPart.getMonth() > 1 || (dtPart.getMonth() == 1 && dtPart.getDate() > 28)) {
            leapYearAdj = 1;
        } //adjust for leap year
    }

    if (!dint || dint === null) return null;
    switch (dint.toLowerCase()) {
    case "yyyy":
        return dtPart.getFullYear();
    case "q":
        return Math.floor(dtPart.getMonth() / 3) + 1;
    case "m":
        return dtPart.getMonth() + 1;
    case "y":
        return DateDiff("y", "1/1/" + dtPart.getFullYear(), dtPart) + 1 + leapYearAdj; // day of year
    case "d":
        return dtPart.getDate();
    case "w":
        return Weekday((dtPart.getMonth() + 1) + '/' + (dtPart.getDate()) + '/' + dtPart.getFullYear(), fdow); // weekday
    case "ww": //week of year
        var dt1 = new Date('1/1/' + dtPart.getFullYear());
        var nDays = (Math.floor((dtPart - dt1) / 86400000) + (dt1.getDay() + 1));
        var nWeek = Math.ceil((nDays) / 7);
        return nWeek;
    case "h":
        return dtPart.getHours();
    case "n":
        return dtPart.getMinutes();
    case "s":
        return dtPart.getSeconds();
    case "ms":
        return dtPart.getMilliseconds(); // <-- JS extension, NOT in vbScript
    default:
        return null;
    }
}

function _testLeapYear(yr) {
    //test if leap year
    if ((parseInt(yr) % 4) === 0) {
        if (parseInt(yr) % 100 === 0) {
            if (parseInt(yr) % 400 !== 0) {
                return false;
            }
            if (parseInt(yr) % 400 === 0) {
                return true;
            }
        }
        if (parseInt(yr) % 100 !== 0) {
            return true;
        }
    }
    if ((parseInt(yr) % 4) !== 0) {
        return false;
    }
}

// adjusts weekday for week starting on fdow
function Weekday(wd, fdow) {
    var vbSunday = 1;
    fdow = (isNaN(fdow) || fdow === 0) ? vbSunday : Math.floor(fdow); // set default & cast
    if (!IsObject(wd)) {
        wd = new Date(wd.replace(/-/g, '/')); //javascript Date object does not work with yyyy-mm-dd format
    }
    var iDay = wd.getDay() + 1;
    return ((iDay - fdow + 7) % 7) + 1;
}

//vbScript DateDiff function: DateDiff(interval,date1,date2[,firstdayofweek[,firstweekofyear]])
function DateDiff(dint, thedate1, thedate2, fdow) {
    var vbUseSystemDayOfWeek = 0;
    var vbSunday = 1;
    var vbMonday = 2;
    var vbTuesday = 3;
    var vbWednesday = 4;
    var vbThursday = 5;
    var vbFriday = 6;
    var vbSaturday = 7;
    var nCalWeeks;
    if (!CvDate(thedate1)) {
        return null;
    }
    if (!CvDate(thedate2)) {
        return null;
    }
    fdow = (isNaN(fdow) || fdow === 0) ? vbSunday : Math.floor(fdow); // set default & cast

    var dt1 = CvDate(thedate1);
    var dt2 = CvDate(thedate2);

    // correct DST-affected intervals ("d" & bigger)
    //if("h,n,s,ms".indexOf(dint.toLowerCase())==-1){
    //if(thedate1.toString().indexOf(":") ==-1){ dt1.setUTCHours(0,0,0,0) };    // no time, assume 12am
    //if(thedate2.toString().indexOf(":") ==-1){ dt2.setUTCHours(0,0,0,0) };    // no time, assume 12am
    //}

    // get ms between UTC dates and make into "difference" date
    var iDiffMS = dt2.valueOf() - dt1.valueOf();
    var dtDiff = new Date(iDiffMS);

    // calc various diffs
    var nYears = dt2.getYear() - dt1.getYear();
    var nMonths = dt2.getMonth() - dt1.getMonth() + (nYears !== 0 ? nYears * 12 : 0);
    var nQuarters = Math.floor(nMonths / 3); //<<-- different than vbScript, which watches rollover not completion

    var nMilliseconds = iDiffMS;
    var nSeconds = Math.floor(iDiffMS / 1000);
    var nMinutes = Math.floor(nSeconds / 60);
    var nHours = Math.floor(nMinutes / 60);
    var nDays = Math.floor(nHours / 24);
    var nWeeks = Math.floor(nDays / 7);

    if (dint.toLowerCase() === 'ww') {
        // set dates to 1st & last FirstDayOfWeek
        var offset = DatePart("w", dt1, fdow) - 1;
        if (offset) {
            dt1.setDate(dt1.getDate() + 7 - offset);
        }
        offset = DatePart("w", dt2, fdow) - 1;
        if (offset) {
            dt2.setDate(dt2.getDate() - offset);
        }
        // recurse to "w" with adjusted dates
        var nCalWeeks1 = DateDiff("w", dt1, dt2) + 1;
        var nCalWeeks2 = (nDays / 7 == Math.floor(nDays / 7)) ? nWeeks : nWeeks + 1;
        nCalWeeks = Round(nDays / 7);
        //document.write("<br>days: "+nCalWeeks1+', '+nCalWeeks2+', ' + nDays / 7 + ', '+iDiffMS/(1000*60*60*24*7)+', '+nWeeks+'<br>');
    }

    // return difference
    switch (dint.toLowerCase()) {
    case "yyyy":
        return nYears;
    case "q":
        return nQuarters;
    case "m":
        return nMonths;
    case "y": // day of year
    case "d":
        return nDays;
    case "w":
        return nWeeks;
    case "ww":
        return nCalWeeks; // week of year
    case "h":
        return nHours;
    case "n":
        return nMinutes;
    case "s":
        return nSeconds;
    case "ms":
        return nMilliseconds; // not in vbScript
    default:
        return null;
    }
}

//vbScript Minute
function Minute(tm) {
    return DatePart("n", tm);
}

//vbScript Second
function Second(tm) {
    return DatePart("s", tm);
}

//vbScript CStr function: Cstr(value)
function CStr(val) {
    if (typeof (val) === 'undefined') {
        return 'undefined';
    }
    if (typeof (val) === 'null') {
        return 'null';
    }
    if (IsNumeric(val)) {
        return val.toString();
    }
    if (val === true) {
        return 'True';
    } else if (val === false) {
        return 'False';
    }
    return val.toString();
}

//vbScript FormatDateTime function: FormatDateTime(date,format)
// thanks to Rob Eberhardt of Slingshot Solutions for free use of partial versions of the vbScript native Date functions
// many of these Date functions have been modified from the original author's design
function FormatDateTime(thedate, df) {
    var vbGeneralDate = 0;
    var vbLongDate = 1;
    var vbShortDate = 2;
    var vbLongTime = 3;
    var vbShortTime = 4;
    var vbYYYYMMDD = 5;
    var vbDDdotMMdotYY = 6;
    var vbDDdotMMdotYYYY = 7;
    var vbYYslashMMslashDD = 8;
    var vbDDslashMMslashYY = 9;
    var vbYYYYhyphenMMhyphenDD = 10;
    var datstr = thedate.toString();
    if (datstr.toUpperCase().substring(0, 3) === "NOW") {
        thedate = new Date();
    }
    if (!CvDate(thedate)) {
        if (_chkTime(thedate) !== '') {
            return null;
        }
        thedate = '1/1/2013 ' + thedate;
        if (!CvDate(thedate)) {
            return null;
        }
    }
    var dt = CvDate(thedate);
    //add custom date formats
    if (!df || df === null || df === 'undefined') {
        //skip custom date formats
    } else {
        var newdf = df.toString().replace(/\s*/g, '').toUpperCase();
        if (newdf === "DD.MM.YY") {
            return _Format(thedate, 'DD.MM.YY');
        }
        if (newdf === "DD.MM.YYYY") {
            return _Format(thedate, 'DD.MM.YYYY');
        }
        if (newdf === "DD/MM/YY") {
            return _Format(thedate, 'DD/MM/YY');
        }
        if (newdf === "DD/MM/YYYY") {
            return _Format(thedate, 'DD/MM/YYYY');
        }
        if (newdf === "DD-MM-YY") {
            return _Format(thedate, 'DD-MM-YY');
        }
        if (newdf === "DD-MM-YYYY") {
            return _Format(thedate, 'DD-MM-YYYY');
        }
        if (newdf === "DDMMYY") {
            return _Format(thedate, 'DDMMYY');
        }
        if (newdf === "DDMMYYYY") {
            return _Format(thedate, 'DDMMYYYY');
        }

        if (newdf === "YY.MM.DD") {
            return _Format(thedate, 'YY.MM.DD');
        }
        if (newdf === "YYYY.MM.DD") {
            return _Format(thedate, 'YYYY.MM.DD');
        }
        if (newdf === "YY/MM/DD") {
            return _Format(thedate, 'YY/MM/DD');
        }
        if (newdf === "YYYY/MM/DD") {
            return _Format(thedate, 'YYYY/MM/DD');
        }
        if (newdf === "YY-MM-DD") {
            return _Format(thedate, 'YY-MM-DD');
        }
        if (newdf === "YYYY-MM-DD") {
            return _Format(thedate, 'YYYY-MM-DD');
        }
        if (newdf === "YYMMDD") {
            return _Format(thedate, 'YYMMDD');
        }
        if (newdf === "YYYYMMDD") {
            return _Format(thedate, 'YYYYMMDD');
        }

        if (newdf === "MM.DD.YY") {
            return _Format(thedate, 'MM.DD.YY');
        }
        if (newdf === "MM.DD.YYYY") {
            return _Format(thedate, 'MM.DD.YYYY');
        }
        if (newdf === "MM/DD/YY") {
            return _Format(thedate, 'MM/DD/YY');
        }
        if (newdf === "MM/DD/YYYY") {
            return _Format(thedate, 'MM/DD/YYYY');
        }
        if (newdf === "MM-DD-YY") {
            return _Format(thedate, 'MM-DD-YY');
        }
        if (newdf === "MM-DD-YYYY") {
            return _Format(thedate, 'MM-DD-YYYY');
        }
        if (newdf === "MMDDYY") {
            return _Format(thedate, 'MMDDYY');
        }
        if (newdf === "MMDDYYYY") {
            return _Format(thedate, 'MMDDYYYY');
        }
    }

    if (isNaN(df)) {
        df = vbGeneralDate;
    }

    switch (Math.floor(df)) {
    case vbGeneralDate:
        return DateAdd("s", 0, dt); //0
    case vbLongDate:
        return _Format(thedate, 'DDDD, MMMM D, YYYY'); //1
    case vbShortDate:
        return _Format(thedate, 'M/DD/YYYY'); //2
    case vbLongTime:
        return _Format(thedate, 't t t t t'); //3
    case vbShortTime:
        return _Format(thedate, 'HH:MM'); //4
    case vbYYYYMMDD:
        return _Format(thedate, 'YYYYMMDD'); //5
    case vbDDdotMMdotYY:
        return _Format(thedate, 'DD.MM.YY'); //6
    case vbDDdotMMdotYYYY:
        return _Format(thedate, 'DD.MM.YYYY'); //7
    case vbYYslashMMslashDD:
        return _Format(thedate, 'YY/MM/DD'); //8
    case vbDDslashMMslashYY:
        return _Format(thedate, 'DD/MM/YY'); //9
    case vbYYYYhyphenMMhyphenDD:
        return _Format(thedate, 'YYYY-MM-DD'); //10
    default:
        return null;
    }
}

function _Format(thedate, dfmt, fdow, fdoy) {
    var pmtest = 0;
    thedate = thedate.toString();
    if (thedate.match(/\d{1,2}\s*:\s*\d{2}/)) {
        if (thedate.match(/^\s*\d{1,2}\s*:\s*\d{2}/)) {
            thedate = '1/1/2001 ' + thedate;
        }
        if (thedate.match(/\d{1,2}\s*pm/i)) {
            pmtest = 1;
        }
    }
    if (!CvDate(thedate)) {
        if (_chkTime(thedate) !== '') {
            return null;
        }
        thedate = '1/1/2013 ' + thedate;
        if (!CvDate(thedate)) {
            return null;
        }
    }
    if (!dfmt || dfmt === '') {
        return thedate.toString();
    }

    var dt = CvDate(thedate);
    // Zero-padding formatter
    this._NSB_pad = function (p_str) {
        if (p_str.toString().length == 1) {
            p_str = '0' + p_str;
        }
        return p_str;
    };

    var ampm = dt.getHours() >= 12 ? 'PM' : 'AM';
    var hr = dt.getHours();
    if (pmtest == 1 && hr < 12) {
        hr += 12;
    }
    if (hr === 0) {
        hr = 12;
    }
    if (hr > 12) {
        hr -= 12;
    }
    if (hr < 10) {
        hr = '0' + Math.floor(hr).toString();
    }
    var strShortTime = hr + ':' + this._NSB_pad(dt.getMinutes()) + ':' + this._NSB_pad(dt.getSeconds()) + ' ' + ampm;
    var strShortDate = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + (new _jsString(dt.getFullYear()) + '').substring(2, 4);
    var strLongDate = MonthName(dt.getMonth() + 1) + ' ' + dt.getDate() + ', ' + dt.getFullYear();

    var retVal = dfmt;

    // switch tokens whose alpha replacements could be accidentally captured
    retVal = retVal.replace(new RegExp('C', 'gi'), 'CCCC');
    retVal = retVal.replace(new RegExp('mmmm', 'gi'), 'XXXX');
    retVal = retVal.replace(new RegExp('mmm', 'gi'), 'XXX');
    retVal = retVal.replace(new RegExp('dddddd', 'gi'), 'AAAAAA');
    retVal = retVal.replace(new RegExp('ddddd', 'gi'), 'AAAAA');
    retVal = retVal.replace(new RegExp('dddd', 'gi'), 'AAAA');
    retVal = retVal.replace(new RegExp('ddd', 'gi'), 'AAA');
    retVal = retVal.replace(new RegExp('timezone', 'gi'), 'ZZZZ');
    retVal = retVal.replace(new RegExp('time24', 'gi'), 'TTTT');
    retVal = retVal.replace(new RegExp('time', 'gi'), 'TTT');
    // now do simple token replacements
    retVal = retVal.replace(new RegExp('am/pm', 'g'), dt.getHours() >= 12 ? 'pm' : 'am');
    retVal = retVal.replace(new RegExp('AM/PM', 'g'), dt.getHours() >= 12 ? 'PM' : 'AM');
    retVal = retVal.replace(new RegExp('a/p', 'g'), dt.getHours() >= 12 ? 'p' : 'a');
    retVal = retVal.replace(new RegExp('A/P', 'g'), dt.getHours() >= 12 ? 'P' : 'A');
    retVal = retVal.replace(new RegExp('AMPM', 'g'), dt.getHours() >= 12 ? 'pm' : 'am');
    retVal = retVal.replace(new RegExp('yyyy', 'gi'), dt.getFullYear());
    retVal = retVal.replace(new RegExp('yy', 'gi'), (new _jsString(dt.getFullYear()) + '').substring(2, 4));
    retVal = retVal.replace(new RegExp('y', 'gi'), DatePart("y", dt));
    retVal = retVal.replace(new RegExp('q', 'gi'), DatePart("q", dt));
    retVal = retVal.replace(new RegExp('hh:mm', 'gi'), 'hh:' + this._NSB_pad(dt.getMinutes()));

    retVal = retVal.replace(new RegExp('mm', 'gi'), this._NSB_pad(dt.getMonth() + 1));
    retVal = retVal.replace(new RegExp('(a|p)m', 'g'), '$1x');
    retVal = retVal.replace(new RegExp('(A|P)M', 'g'), '$1X');
    retVal = retVal.replace(new RegExp('m', 'gi'), (dt.getMonth() + 1));
    retVal = retVal.replace(new RegExp('(a|p)x', 'g'), '$1m');
    retVal = retVal.replace(new RegExp('(A|P)X', 'g'), '$1M');

    retVal = retVal.replace(new RegExp('dd', 'gi'), this._NSB_pad(dt.getDate()));
    retVal = retVal.replace(new RegExp('d', 'gi'), dt.getDate());
    retVal = retVal.replace(new RegExp('hh', 'gi'), this._NSB_pad(dt.getHours()));
    retVal = retVal.replace(new RegExp('h', 'gi'), dt.getHours());
    retVal = retVal.replace(new RegExp('nn', 'gi'), this._NSB_pad(dt.getMinutes()));
    retVal = retVal.replace(new RegExp('n', 'gi'), dt.getMinutes());
    retVal = retVal.replace(new RegExp('ss', 'gi'), this._NSB_pad(dt.getSeconds()));
    retVal = retVal.replace(new RegExp('s', 'gi'), dt.getSeconds());
    retVal = retVal.replace(new RegExp('t t t t t', 'gi'), strShortTime);
    // (always proceed largest same-lettered token to smallest)
    // now finish the previously set-aside tokens
    retVal = retVal.replace(new RegExp('XXXX', 'gi'), MonthName(dt.getMonth() + 1, false)); //
    retVal = retVal.replace(new RegExp('XXX', 'gi'), MonthName(dt.getMonth() + 1, true)); //
    retVal = retVal.replace(new RegExp('AAAAAA', 'gi'), strLongDate);
    retVal = retVal.replace(new RegExp('AAAAA', 'gi'), strShortDate);
    retVal = retVal.replace(new RegExp('AAAA', 'gi'), WeekdayName(dt.getDay() + 1, false, fdow)); //
    retVal = retVal.replace(new RegExp('AAA', 'gi'), WeekdayName(dt.getDay() + 1, true, fdow)); //
    retVal = retVal.replace(new RegExp('TTTT', 'gi'), dt.getHours() + ':' + this._NSB_pad(dt.getMinutes()));
    retVal = retVal.replace(new RegExp('TTT', 'gi'), hr + ':' + this._NSB_pad(dt.getMinutes()) + ' ' + ampm);
    retVal = retVal.replace(new RegExp('CCCC', 'gi'), strShortDate + ' ' + strShortTime);

    // finally timezone
    var tz = dt.getTimezoneOffset();
    var timezone = (tz < 0) ? ('GMT-' + tz / 60) : (tz === 0) ? ('GMT') : ('GMT+' + tz / 60);
    retVal = retVal.replace(new RegExp('ZZZZ', 'gi'), timezone);

    return retVal;
}

function _chkTime(fld) {
    var re, regs;
    var err = "";
    // regular expression to match required time format
    re = /^\s*(\d{1,2})[:\s](\d{2})([:\s]\d{2})?\s*([aApP][mM])?\s*$/;
    if (fld !== null && fld !== '') {
        if (regs == fld.match(re)) {
            if (regs[4]) {
                // 12-hour time format with am/pm
                if (regs[1] < 1 || regs[1] > 12) {
                    err = "Invalid value for hours: " + regs[1];
                }
            } else {
                // 24-hour time format
                if (regs[1] > 23) {
                    err = "Invalid value for hours: " + regs[1];
                }
            }
            if (!err && regs[2] > 59) {
                err = "Invalid value for minutes: " + regs[2];
            }
        } else {
            err = "Invalid time format: " + fld;
        }
    } else {
        if (fld === null) {
            err = "Invalid time format: " + fld;
        }
    }
    return err;
}

function Month(sdt) {
    if (IsDate(sdt)) {
        if (!IsObject(sdt)) {
            sdt = CvDate(sdt);
        }
        return sdt.getMonth() + 1;
    } else {
        return null;
    }
}

function MonthName(themonth, dabbr) {
    var MonthNames = [null, $.i18n('January'), $.i18n('February'), $.i18n('March'), $.i18n('April'), $.i18n('May'), $.i18n('June'), $.i18n('July'), $.i18n('August'), $.i18n('September'), $.i18n('October'), $.i18n('November'), $.i18n('December')];
    if (isNaN(themonth)) { // v0.94- compat: extract real param from passed date
        if (!CvDate(themonth)) {
            return null;
        }
        //      themonth = DatePart("m", Date.CvDate(themonth));
        themonth = DatePart("m", CvDate(themonth));
    }

    var retVal = MonthNames[themonth];
    if (dabbr === true) {
        retVal = retVal.substring(0, 3);
    } // abbr to 3 chars
    return retVal;
}

function WeekdayName(theweekday, dabbr, fdow) {
    var WeekdayNames = [null, $.i18n('Sunday'), $.i18n('Monday'), $.i18n('Tuesday'), $.i18n('Wednesday'), $.i18n('Thursday'), $.i18n('Friday'), $.i18n('Saturday')];
    var vbUseSystemDayOfWeek = 0;
    var vbSunday = 1;
    var vbMonday = 2;
    var vbTuesday = 3;
    var vbWednesday = 4;
    var vbThursday = 5;
    var vbFriday = 6;
    var vbSaturday = 7;
    if (isNaN(theweekday)) { // v0.94- compat: extract real param from passed date
        if (!CvDate(theweekday)) {
            return null;
        }
        //      theweekday = DatePart("w", Date.CvDate(theweekday));
        theweekday = DatePart("w", CvDate(theweekday));
    }
    fdow = (isNaN(fdow) || fdow === 0) ? vbSunday : Math.floor(fdow); // set default & cast

    var nWeekdayNameIdx = ((fdow - 1 + Math.floor(theweekday) - 1 + 7) % 7) + 1; // compensate nWeekdayNameIdx for fdow
    var retVal = WeekdayNames[nWeekdayNameIdx];
    if (dabbr === true) {
        retVal = retVal.substring(0, 3);
    } // abbr to 3 chars
    return retVal;
}

//vbScript Day function: Day(date)
function Day(thedate) {
    if (IsDate(thedate)) {
        if (!IsObject(thedate)) {
            thedate = CvDate(thedate);
        }
        return thedate.getDate();
    } else {
        return null;
    }
}

//vbScript DateSerial(year, month, day)
function DateSerial(yy, mm, dd) {
    return FormatDateTime(CvDate(mm + '/' + dd + '/' + yy), 2);
}

//vbScript DateValue(dateString)
function DateValue(dateString) {
    return FormatDateTime(CvDate(dateString), 2);
}

//vbScript IsEmpty
function IsEmpty(theValue) {
    return (!theValue || (typeof (theValue) === "object" && $.isEmptyObject(theValue)) || ($.isArray(theValue) && !theValue.length));
}

//vbScript IsArray
function IsArray(obj) {
    return $.isArray(obj);
}

//vbScript IsNull
function IsNull(obj) {
    return obj == null;
}

//vbScript IsObject
function IsObject(obj) {
    return obj.constructor == Object;
    //return typeOf(obj) === "Object";
}

//vbScript Chr()
function Chr(nmbr) {
    //  return String.fromCharCode(nmbr);
    return _jsString.fromCharCode(nmbr);
}

//vbScript ASC()
function Asc(str) {
    return str.charCodeAt(0);
}

//vbScript Join function: Join(s,c)
function Join(str, chr) {
    if (chr === "") {
        chr = "";
    } else {
        if (!chr || chr === null) {
            chr = " ";
        }
    }
    return str.join(chr);
}

//vbScript Filter function : Filter(srchStr, fndStr, incl, filter)
function Filter(srchStr, fndStr, incl, fil_ter) {
    var origSrchStr = srchStr;
    if (!fndStr || fndStr === null) {
        fndStr = "";
    }
    if (!fil_ter || fil_ter === null) {
        fil_ter = 0;
    }
    if (incl === false) {} else {
        if (!incl || incl === null) {
            incl = true;
        }
    }
    fil_ter = (fil_ter == 1) ? 1 : 0; //0=binary compare, 1=text compare
    incl = (incl === false) ? false : true; //true=include, false=exclude
    if (typeof (srchStr) !== 'object') {
        return '';
    }
    if (fil_ter == 1) {
        fndStr = fndStr.toLowerCase();
    }
    var na = [];
    var j = 0,
        ss;
    for (var i = 0; i < srchStr.length; i++) {
        if (fil_ter == 1) {
            ss = srchStr[i].toLowerCase();
        } else {
            ss = srchStr[i];
        }
        var sso = origSrchStr[i];
        if (incl === true && ss.indexOf(fndStr) > -1) {
            na[j] = sso;
            j++;
        } else {
            if (incl === false && ss.indexOf(fndStr) == -1) {
                na[j] = sso;
                j++;
            }
        }
    }
    return na;
}

//vbScript InStrRev function : InStrRev(string1,string2[,start[,compare]])
function InStrRev(srchStr, fndStr, start, cmp) {
    if (!fndStr || fndStr === null) {
        fndStr = "";
    }
    if (!cmp) {
        cmp = 0;
    }
    srchStr.toString();
    if (cmp == 1) {
        srchStr = srchStr.toLowerCase();
        fndStr = fndStr.toLowerCase();
    }
    if (!start || !IsNumeric(start)) {
        start = -1;
    }
    if (start > -1) {
        srchStr = srchStr.substr(0, start);
    }
    var loc;
    if (fndStr === "") {
        loc = srchStr.length;
    } else {
        loc = srchStr.lastIndexOf(fndStr) + 1;
    }
    return loc;
}

//vbScript InStr function : InStr([start,]string1,string2[,compare])
function InStr(start, srchStr, fndStr, cmp) {
	var osrchStr;
    if (!fndStr || fndStr === null || fndStr === "") {
        fndStr += "";
        if (fndStr.length === 0) {
            if (!start || start === null || !IsNumeric(start) || start === '' || start < 1) {
                start = 1;
            }
            start = Math.floor(start);
            if (!srchStr || srchStr === null) {
                srchStr = '';
            }
            if (start > srchStr.toString().length) {
                return 0;
            }
            return start;
        }
        cmp = 0;
        fndStr = srchStr;
        srchStr = start;
        start = 1;
    }
    if (!IsNumeric(Math.floor(start))) {
        cmp = fndStr;
        fndStr = srchStr;
        srchStr = start;
        start = 1;
    }
    if (!start || start === null || !IsNumeric(start) || start === '' || start < 1) {
        start = 1;
    }
    if (!srchStr || srchStr === null) {
        srchStr = '';
    }
    if (!fndStr || fndStr === null) {
        fndStr = '';
    }
    start = Math.floor(start);

    if (srchStr === "") {
        return 0;
    }
    osrchStr = srchStr.toString();
    if (start > osrchStr.length) {
        return 0;
    }
    if (fndStr === "") {
        return start;
    }

    srchStr = osrchStr;
    fndStr = fndStr.toString();
    if (start > 1) {
        srchStr = srchStr.substr(start - 1);
    }
    cmp = cmp + "";
    var loc = 0;
    if (cmp === '1') { //insensitive
        osrchStr = srchStr.toLowerCase();
        var ofndStr = fndStr.toLowerCase();
        if (osrchStr.indexOf(ofndStr) == -1) {
            return 0;
        }
        loc = osrchStr.indexOf(ofndStr) + 1 + (start - 1);
    } else {
        if (srchStr.indexOf(fndStr) == -1) {
            return 0;
        }
        loc = srchStr.indexOf(fndStr) + 1 + (start - 1);
    }
    return loc;
}

//vbScript Space function: Space(n)
function Space(c) {
    return (new Array(c + 1)).join(' ');
}

//vbScript String function: String(n,c)
//javascript String object has name changed to _jsString to allow for vbScript STRING function
function _vbsString(n, c) {
    if (!n || n === null) {
        return '';
    } else {
        if (!c || c === null) {
            return (n.toString());
        } else {
            c = c.toString().substr(0, 1);
            return (new Array(n + 1)).join(c);
        }
    }
}

//vbScript StrCmp function: StrComp(string1,string2[,compare])
function StrComp(str1, str2, compare, typ) {
    typ = (typ == 1) ? 1 : 0; //0=binary compare, 1=text compare
    if (typ === 0) {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
    }
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}

//vbScript Split function: Split(expression[,delimiter[,count[,compare]]])
function Split(str, del, cnt, cmp) {
    if (!del || del === null || del === "") {
        del = " ";
    }
    if (del !== "") {
        return str.split(del);
    }
}

//vbScript Hex function: Hex(n)
function Hex(n) {
    n = Math.round(n);
    if (n < 0) {
        n = 0xFFFFFFFF + n + 1;
    }
    return n.toString(16).toUpperCase();
}

//vbScript Oct function: Oct(n)
function Oct(n) {
    n = Math.round(n);
    if (n < 0) {
        n = 65535 + n + 1; // 0o177777 + n + 1
    }
    return n.toString(8);
}

//vbScript LBound function: LBound(arrayname[,dimension])
//dimension Optional. Which dimension's lower bound to return. 1 = first dimension, 2 = second dimension, and so on. Default is 1
function LBound(arr, dm) {
    return 0;
}

//vbScript UBound function: UBound(arrayname[,dimension])
//dimension Optional. Which dimension's upper bound to return. 1 = first dimension, 2 = second dimension, and so on. Default is 1
//JavaScript will increase the size of the multidim arrays if more array values are added regardless of how array was created
function UBound(arr, dm) {
    if (!dm || dm === null || dm < 1) dm = 1;
    dm--;
    var rv = null;
    if (dm === 0) {
        try {
            arr[0] == null;
            rv = Object.keys(arr).length - 1;
        } catch (e) {}
    } else {
        try {
            arr[dm] == null;
            rv = arr[dm - 1].length;
        } catch (e) {}
    }
    return rv;
}

//dm: array dimensions: create array (d1,d2,d3,d4)
//handle any number of dimensions and indexes
//Thomas Gruber
function createMultiDimArray(dm, b, c, d) {
    var arr = null;
    if (!dm || dm === null) {
        dm = "";
    }
    dm += '';
    if (!b || b === null) {
        b = "";
    }
    b += '';
    if (!c || c === null) {
        c = "";
    }
    c += '';
    if (!d || d === null) {
        d = "";
    }
    d += '';
    if (b !== "") dm += "," + b;
    if (c !== "") dm += "," + c;
    if (d !== "") dm += "," + d;

    var dms = dm.replace(/\s/g, '').replace(/,,/g, ',').replace(/,+$/, ''); 
    dms = dms.split(","); //no whitespace, no double comma's, no ending comma
    var dmsctr = (dms === "" ? 0 : dms.length) - 1;
    if (dmsctr < 0) {
        //single dimension array without parameters
        arr = []; //array[]
        return arr;
    }
    var currdim = 0;
    arr = _NSBsubCreateArray(arr, dmsctr, dms, currdim);
    return arr;
}

//Thomas Gruber
function _NSBsubCreateArray(arr, dmsctr, dms, currdim) {
    var ub = null;
    ub = dms[currdim] * 1 + 1;
    arr = new Array(ub);
    if (currdim < dmsctr) {
        for (var i = 0; i < ub; i++) {
            currdim = currdim + 1;
            arr[i] = _NSBsubCreateArray(arr, dmsctr, dms, currdim);
            currdim = currdim - 1;
        }
    }
    return arr;
}

//vbScript Time()
function Time() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var ap = "AM";
    if (hour > 11) {
        ap = "PM";
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour === 0) {
        hour = 12;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    var timeString = hour + ':' + minute + ':' + second + " " + ap;
    return timeString;
}

//vbScript Hour()
function Hour(tm) {
    return DatePart("h", tm);
}

//vbScript ERASE
function _erase(varr) {
    //clears up to 8 dimensioned arrays
    //would be helpful to have array dimensions as inputs  "arr(3,2)"
    //since javascript doesn't support multi-dimensional arrays so
    //you can't get the size of the array
    var arylist = varr.split(','); //allow multiple arrays
    var maxArySize = 0;
    var zz, aa, bb, cc, dd, ee, ff, gg, hh, ii, jj, val;
    for (zz = 0; zz < arylist.length; ++zz) {
        var ary = window[arylist[zz]];
        if (ary.length > maxArySize) {
            maxArySize = ary.length;
        }
        if (Object.prototype.toString.call(ary) === '[object Array]') {
            for (aa = 0; aa < maxArySize; ++aa) {
                try {
                    if (ary[aa] && !(ary[0] instanceof Array)) {
                        val = ary[aa];
                        if (val === null || isNaN(val) || val === '') {
                            ary[aa] = '';
                        } else {
                            ary[aa] = 0;
                        }
                    }
                    for (bb = 0; bb < maxArySize; ++bb) {
                        try {
                            if (ary[aa][bb] && !(ary[0][0] instanceof Array)) {
                                val = ary[aa][bb];
                                if (val === null || isNaN(val) || val === '') {
                                    ary[aa][bb] = '';
                                } else {
                                    ary[aa][bb] = 0;
                                }
                            }
                            for (cc = 0; cc < maxArySize; ++cc) {
                                try {
                                    if (ary[aa][bb][cc] && !(ary[0][0][0] instanceof Array)) {
                                        val = ary[aa][bb][cc];
                                        if (val === null || isNaN(val) || val === '') {
                                            ary[aa][bb][cc] = '';
                                        } else {
                                            ary[aa][bb][cc] = 0;
                                        }
                                    }
                                    for (dd = 0; dd < maxArySize; ++dd) {
                                        try {
                                            if (ary[aa][bb][cc][dd] && !(ary[0][0][0][0] instanceof Array)) {
                                                val = ary[aa][bb][cc][dd];
                                                if (val === null || isNaN(val) || val === '') {
                                                    ary[aa][bb][cc][dd] = '';
                                                } else {
                                                    ary[aa][bb][cc][dd] = 0;
                                                }
                                            }
                                            for (ee = 0; ee < maxArySize; ++ee) {
                                                try {
                                                    if (ary[aa][bb][cc][dd][ee] && !(ary[0][0][0][0][0] instanceof Array)) {
                                                        val = ary[aa][bb][cc][dd][ee];
                                                        if (val === null || isNaN(val) || val === '') {
                                                            ary[aa][bb][cc][dd][ee] = '';
                                                        } else {
                                                            ary[aa][bb][cc][dd][ee] = 0;
                                                        }
                                                    }
                                                    for (ff = 0; ff < maxArySize; ++ff) {
                                                        try {
                                                            if (ary[aa][bb][cc][dd][ee][ff] && !(ary[0][0][0][0][0][0] instanceof Array)) {
                                                                val = ary[aa][bb][cc][dd][ee][ff];
                                                                if (val === null || isNaN(val) || val === '') {
                                                                    ary[aa][bb][cc][dd][ee][ff] = '';
                                                                } else {
                                                                    ary[aa][bb][cc][dd][ee][ff] = 0;
                                                                }
                                                            }
                                                            for (gg = 0; gg < maxArySize; ++gg) {
                                                                try {
                                                                    if (ary[aa][bb][cc][dd][ee][ff][gg] && !(ary[0][0][0][0][0][0][0] instanceof Array)) {
                                                                        val = ary[aa][bb][cc][dd][ee][ff][gg];
                                                                        if (val === null || isNaN(val) || val === '') {
                                                                            ary[aa][bb][cc][dd][ee][ff][gg] = '';
                                                                        } else {
                                                                            ary[aa][bb][cc][dd][ee][ff][gg] = 0;
                                                                        }
                                                                    }
                                                                    for (hh = 0; hh < maxArySize; ++hh) {
                                                                        try {
                                                                            if (ary[aa][bb][cc][dd][ee][ff][gg][hh] && !(ary[0][0][0][0][0][0][0][0] instanceof Array)) {
                                                                                val = ary[aa][bb][cc][dd][ee][ff][gg][hh];
                                                                                if (val === null || isNaN(val) || val === '') {
                                                                                    ary[aa][bb][cc][dd][ee][ff][gg][hh] = '';
                                                                                } else {
                                                                                    ary[aa][bb][cc][dd][ee][ff][gg][hh] = 0;
                                                                                }
                                                                            }
                                                                            for (ii = 0; ii < maxArySize; ++ii) {
                                                                                try {
                                                                                    if (ary[aa][bb][cc][dd][ee][ff][gg][hh][ii] && !(ary[0][0][0][0][0][0][0][0][0] instanceof Array)) {
                                                                                        val = ary[aa][bb][cc][dd][ee][ff][gg][hh][ii];
                                                                                        if (val === null || isNaN(val) || val === '') {
                                                                                            ary[aa][bb][cc][dd][ee][ff][gg][hh][ii] = '';
                                                                                        } else {
                                                                                            ary[aa][bb][cc][dd][ee][ff][gg][hh][ii] = 0;
                                                                                        }
                                                                                    }
                                                                                    for (jj = 0; jj < maxArySize; ++jj) {
                                                                                        try {
                                                                                            if (ary[aa][bb][cc][dd][ee][ff][gg][hh][ii] && !(ary[0][0][0][0][0][0][0][0][0][0] instanceof Array)) {
                                                                                                val = ary[aa][bb][cc][dd][ee][ff][gg][hh][ii][jj];
                                                                                                if (val === null || isNaN(val) || val === '') {
                                                                                                    ary[aa][bb][cc][dd][ee][ff][gg][hh][ii][jj] = '';
                                                                                                } else {
                                                                                                    ary[aa][bb][cc][dd][ee][ff][gg][hh][ii][jj] = 0;
                                                                                                }
                                                                                            }
                                                                                        } catch (e) {} //jj
                                                                                    }
                                                                                } catch (e) {} //ii
                                                                            }
                                                                        } catch (e) {} //hh
                                                                    }
                                                                } catch (e) {} //gg
                                                            }
                                                        } catch (e) {} //ff
                                                    }
                                                } catch (e) {} //ee
                                            }
                                        } catch (e) {} //dd
                                    }
                                } catch (e) {} //cc
                            }
                        } catch (e) {} //bb
                    }
                } catch (e) {} //aa
            }
        }
    }
    return '';
}

//vbScript VarType
function VarType(arg, txt) {
    /*
    vbEmpty 0   Uninitialized (default)
    vbNull  1   No valid data
    vbInteger   2   Integer
    vbLong  3   Long integer
    vbSingle    4   Single-precision floating-point
    vbDouble    5   Double-precision floating-point
    vbCurrency  6   Currency
    vbDate  7   Date
    vbString    8   String
    vbObject    9   Object
    vbError 10  Error
    vbBoolean   11  Boolean
    vbVariant   12  Variant (only with arrays of Variants)
    vbDataObject    13  Data-access object
    vbByte  17  Byte
    vbArray 8192    Array
    */
    if (!txt || txt === null) {
        txt = 0;
    } // vartype() vs. typename(); txt==0 if vartype
    var res = -1;
    if (!arg && arg != null && arg !== 0 && arg !== false) {
        res = 0;
        if (txt == 1 && isNaN(parseInt(arg))) {
            return arg;
        } //typename - returns NaN
        if (txt == 1) {
            return 'empty';
        } //typename
    } else if (arg == null) {
        res = 1;
        if (txt == 1) {
            return 'null';
        } //typename
    } else {
        var type = '';
        var typ = typeof arg;
        arg = arg.toString();
        if (type === '' && (arg == 1 || arg === 0)) {
            type = 'integer';
        }
        if (type === '' && (arg === true || arg === false || arg === 'true' || arg === 'false')) {
            type = 'boolean';
            res = 11;
        }
        if (type === '' && arg.match(/\s*\d{1,2}(\/|-)\d{1,2}(\/|-)\d{2,4}/) && arg !== "NaN") {
            type = 'date';
        }
        if (type === '' && arg.match(/\s*\w{3}\s+\w{3}\s+\d{2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+\w{3}[\+\-]\d{4}/) && arg !== "NaN") {
            type = 'date';
        }
        if (type === '' && arg.match(/\s*(\d{1,2})(\s+|\s*\-\s*)([a-z]{3})(\s+|\s*\-\s*)(\d{2})($|\s+)/) && arg !== "NaN") {
            type = 'date';
        }
        if (type === '' && arg.match(/\s*\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/) && arg !== "NaN") {
            type = 'date';
        }
        if (type === '' && arg.match(/\s*\d{1,2}(\s+|\s*\-\s*)[a-z]{3}(\s+|\s*\-\s*)(\d{2}|\d{4})\s*/) && arg !== "NaN") {
            type = 'date';
        }
        if (type === '' && arg.match(/\s*[a-z]+\s+\d{1,2},?\s+(\d{2}|\d{4})\s*/) && arg !== "NaN") {
            type = 'date';
        }
        if (type === '' && arg.match(/\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})/) && arg !== "NaN") {
            type = 'date';
        }
        if (type === '' && arg[1] && typ === 'object') {
            type = 'array';
        }
        if (type === '' && arg.match(/[a-zA-z][\s\!\@\#\$\%\^\&\*\(\)\-\_\+\+\{\[\}\]\:\;\"\'\<\>\,\.\?\/]*\d/)) {
            type = 'string';
        }
        if (type === '' && arg.match(/\d[\s\!\@\#\$\%\^\&\*\(\)\-\_\+\+\{\[\}\]\:\;\"\'\<\>\,\.\?\/]*[a-zA-z]/)) {
            type = 'string';
        }
        if (type === '' && arg.match(/\s*\$\d+,*\d*\.*\d*/)) {
            type = 'currency';
        }
        if (type === '' && arg.match(/\d\.\d/)) {
            type = 'double';
        }
        if (type === '' && arg.match(/\d/)) {
            type = 'integer';
        }
        if (type === '') {
            type = typeof arg;
        }

        if (txt == 1) { //typename()
            if (res === 0 || res == 1) {
                type = 'null';
            }
            if (type === 'array') {
                type = 'object';
            }
            return type;
        }

        switch (type) {
        case 'date':
            res = 7;
            break;
        case 'integer':
            res = 2;
            break;
        case 'double':
            res = 5;
            break;
        case 'currency':
            res = 6;
            break;
        case 'string':
            res = 8;
            break;
        case 'object':
            res = 9;
            break;
        case 'boolean':
            res = 11;
            break;
        case 'array':
            res = 8192;
            break;
        default:
            res = type;
            break;
        }
    }
    return res;
}

//vbScript typeName
function TypeName(ele) {
    return VarType(ele, 1);
}

function FormatNumber(num, decimalNum, bolLeadingZero, bolParens, bolCommas) {
    if (isNaN(Math.floor(num))) {
        return "NaN";
    }

    var tmpNum = num;
    var iSign = num < 0 ? -1 : 1; // Get sign of number
    if (!decimalNum || decimalNum === null || decimalNum < 0) {
        decimalNum = 0;
    }
    if (!bolLeadingZero && bolLeadingZero !== false || bolLeadingZero === null) {
        bolLeadingZero = true;
    }
    if (!bolParens && bolParens !== false || bolParens === null) {
        bolParens = false;
    }
    if (!bolCommas && bolCommas !== false || bolCommas === null) {
        bolCommas = true;
    }

    tmpNum = Math.round(Math.abs(tmpNum * Math.pow(10, decimalNum))) / Math.pow(10, decimalNum) * iSign;

    // Create a string object to do our formatting on
    var tmpNumStr = new _jsString(tmpNum);

    // See if we need to strip out the leading zero or not.
    if (!bolLeadingZero && num < 1 && num > -1 && num !== 0) {
        if (num > 0) {
            tmpNumStr = tmpNumStr.substring(1, tmpNumStr.length);
        } else {
            tmpNumStr = "-" + tmpNumStr.substring(2, tmpNumStr.length);
        }
    }

    // See if we need to put in the commas
    var iStart;
    if (bolCommas && (num >= 1000 || num <= -1000)) {
        iStart = tmpNumStr.indexOf(".");
        if (iStart < 0) {
            iStart = tmpNumStr.length;
        }

        iStart -= 3;
        while (iStart >= 1) {
            if (tmpNumStr.substring(0, iStart).match(/\d+/)) {
                tmpNumStr = tmpNumStr.substring(0, iStart) + "," + tmpNumStr.substring(iStart, tmpNumStr.length);
            }
            iStart -= 3;
        }
    }

    // add additional zeroes after decimal point
    iStart = tmpNumStr.indexOf(".");
    var decStr, intStr, totLen;
    if (iStart > -1) {
        decStr = tmpNumStr.substr(iStart + 1, tmpNumStr.length);
        intStr = tmpNumStr.substr(0, iStart);
    } else {
        decStr = "";
        intStr = tmpNumStr;
        iStart = tmpNumStr.length;
    }
    if (decStr.length < decimalNum) {
        totLen = (decimalNum - decStr.length);
        for (var di = 0; di < totLen; di++) {
            decStr = decStr.toString() + '0'.toString();
        }
        intStr = tmpNumStr.substr(0, iStart);
        tmpNumStr = intStr + '.' + decStr;
    }

    // See if we need to use parenthesis
    if (bolParens && num < 0) {
        tmpNumStr = "(" + tmpNumStr.substring(1, tmpNumStr.length) + ")";
    }

    return tmpNumStr;
}

function FormatPercent(num, decimalNum, bolLeadingZero, bolParens, bolCommas) {
    var tmpNumStr = new _jsString(FormatNumber(num * 100, decimalNum, bolLeadingZero, false, bolCommas));

    // See if we need to use parenthesis
    if (bolParens && num < 0) {
        tmpNumStr = "(" + tmpNumStr.substring(1, tmpNumStr.length) + "%)";
    } else {
        tmpNumStr += '%';
    }
    return tmpNumStr;
}

function FormatCurrency(num, decimalNum, bolLeadingZero, bolParens, bolCommas) {
    decimalNum = decimalNum < 0 ? 2 : decimalNum;
    var tmpStr = new _jsString(FormatNumber(num, decimalNum, bolLeadingZero, bolParens, bolCommas));

    if (tmpStr.indexOf("(") != -1 || tmpStr.indexOf("-") != -1) {
        // We know we have a negative number, so place '$' inside of '(' / after '-'
        if (tmpStr.charAt(0) === "(")
            tmpStr = "($" + tmpStr.substring(1, tmpStr.length);
        else if (tmpStr.charAt(0) === "-")
            tmpStr = "-$" + tmpStr.substring(1, tmpStr.length);

        return tmpStr;
    } else
        return "$" + tmpStr; // Return formatted string!
}

//vbScript TimeValue
function TimeValue(tm) {
    return FormatDateTime(tm, 3);
}

//vbScript TimeSerial
function TimeSerial(hh, mm, ss) {
    if (!ss || ss === null || ss === "") {
        ss = '00';
    }
    if (!mm || mm === null || mm === "") {
        mm = '00';
    }
    var ssval = parseInt(ss.toString());
    var mmval = parseInt(mm.toString());
    var hhval = parseInt(hh.toString());
    if (ssval > 59) {
        ssval = ssval - 60;
        mmval++;
    }
    if (mmval > 59) {
        mmval = mmval - 60;
        hhval++;
    }
    if (hhval > 23) {
        hhval = hhval - 24;
    }
    hh = hhval.toString();
    if (hh.length == 1) {
        hh = '0' + hh;
    }
    mm = mmval.toString();
    if (mm.length == 1) {
        mm = '0' + mm;
    }
    ss = ssval.toString();
    if (ss.length == 1) {
        ss = '0' + ss;
    }
    return TimeValue(hh + ':' + mm + ':' + ss);
}

//vbScript Rnd (sort of)
function Rnd() {
    return Math.random() % 1;
}

//vbScript Sleep n
function _pause(millis) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    }
    while (curDate - date < millis);
}

//vbscript sysinfo()
function SysInfo(arg) {
    switch (arg) {
    case 0:
        return screen.width;
    case 1:
        return screen.height;
    case 2:
        {
            if (SysInfo(4) === false) return window.innerWidth;
            if (Math.abs(window.orientation == 90)) {
                return Math.max(screen.width, screen.height);
            } else {
                return Math.min(screen.width, screen.height);
            }
            break;
        }
    case 3:
        {
            if (SysInfo(4) === false) return window.innerHeight;
            if (Math.abs(window.orientation == 90)) {
                return Math.min(screen.width, screen.height);
            } else {
                return Math.max(screen.width, screen.height);
            }
            break;
        }
    case 4:
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    case 5:
        return window.devicePixelRatio;
    case 10:
        return new Date().getTime();
    case 108:
        return screen.availWidth;
    case 109:
        return screen.availHeight;
    case 188:
        return screen.width;
    case 190:
        return screen.height;
    default:
        return 0;
    }
}

function RGB(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

//vbScript "\" operator: integer division
function intDiv(v1, v2) {
    if (!v1) {
        v1 = 0;
    }
    if (!v2) {
        v2 = 0;
    }
    if (v1 === null || v2 === null) {
        return null;
    }
    if (v1 === 0 || v2 === 0) {
        return 0;
    }
    return (v1 % v2);
}

function UCase(arg) {
    if (!arg || arg === null || typeof (arg) === 'undefined') {
        return arg;
    }
    return arg.toUpperCase();
}

function LCase(arg) {
    if (!arg || arg === null || typeof (arg) === 'undefined') {
        return arg;
    }
    return arg.toLowerCase();
}

//vbScript doevents simulation
function DoEvents() {
    setTimeout("doevents()", 100);
}

function _navGetLocaleFunc() {
    var lang = '';
    if (navigator) {
        if (navigator.language) {
            lang = navigator.language;
        } else if (navigator.browserLanguage) {
            lang = navigator.browserLanguage;
        } else if (navigator.systemLanguage) {
            lang = navigator.systemLanguage;
        } else if (navigator.userLanguage) {
            lang = navigator.userLanguage;
        }
    }
    return lang;
}

function Log10(x) {
    return Math.log(x) / Math.log(10);
}

function _jsCint(n) {
    //simulate vbScript CINT()
    var i = Math.floor(n);
    var d = n * 1 - i - 0.5; //get fractional part
    if (d === 0) { //d=.5
        if (i % 2 === 0) { //even leave as is otherwise inc
            n = i;
        } else {
            n = i * 1 + 1;
        } // end of if d%2
    } else if (d > 0) { //greater than .5
        n = i * 1 + 1;
    } else { //less than .5
        n = i;
    }
    return n * 1;
}

// vbScript Fix
function jsFix(n) {
    //simulate vbScript FIX()
    var i = Math.floor(n);
    if (i < 0) {
        i++;
    }
    return i * 1;
}

// vbScript Cos, Sin, Tan are done inline by Translator