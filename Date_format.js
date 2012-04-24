/**
 * Date.format() - Easily format a date/time like it is possible with the PHP date() function.
 *
 * @author  Geoffray Warnants, http://geoffray.be
 * @see     http://php.net/manual/en/function.date.php
 * @version 0.1.20120216
 *
 * Copyright © 2012 Geoffray Warnants
 * MIT Licensed
 */
Date.prototype.format = function(str){
    var _format=function(mask){
        switch (mask) {

            // Day
            case "d":
                return (d.getDate()<10) ? "0"+d.getDate() : d.getDate();
            case "D":
                return d.toDateString().split(" ")[0];
            case "j":
                return d.getDate();
            case "l":
                return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()];
            case "N":
                return ((tmp=d.getDay()) == 0) ? 7 : tmp;
            case "S":
                tmp=["st","nd","rd"];
                return (typeof(tmp[d.getDate()-1])!=="undefined") ? tmp[d.getDate()-1] : "th";
            case "w":
                return d.getDay();
            case "z":
                for (var i=0,tmp=d.getDate()-1; i<d.getMonth(); i++) {
                    tmp += (new Date(d.getFullYear(), i+1, 0)).getDate();
                }
                return tmp;

            // Week
            case "W":
                return ((tmp=Math.ceil(_format("z")/7))<10) ? "0"+tmp : tmp;

            // Month
            case "F":
                return ["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()];
            case "m":
                return (d.getMonth()<9)?"0"+(1+d.getMonth()):1+d.getMonth();
            case "M":
                return d.toDateString().split(" ")[1];
            case "n":
                return 1+d.getMonth();
            case "t":
                return (new Date(d.getFullYear(), 1+d.getMonth(), 0)).getDate();

            // Year
            case "L":
                return ((d.getYear()%4 && !d.getYear()%100) || d.getYear()%400)?1:0;
            case "o":   // @todo
                break;
            case "Y":
                return d.getFullYear();
            case "y":
                return ((tmp=d.getFullYear()%100)<10) ? "0"+tmp : tmp;

            // Time
            case "a":
                return _format("A").toLowerCase();
            case "A":
                return (d.getHours() < 12) ? "AM" : "PM";
            case "B":
                return Math.floor((d.getHours()*3600+d.getMinutes()*60+d.getSeconds())/86.4);
            case "g":
                return ((tmp=d.getHours()%12) != 0) ? tmp : 12;
            case "G":
                return d.getHours();
            case "h":
                return ((tmp = _format("g")) != 0) ? ((tmp<10)?"0"+tmp:tmp) : 12;
            case "H":
                return (d.getHours()<10)?"0"+d.getHours():d.getHours();
            case "i":
                return (d.getMinutes()<10)?"0"+d.getMinutes():d.getMinutes();
            case "s":
                return (d.getSeconds()<10)?"0"+d.getSeconds():d.getSeconds();
            case "u":
                return d.getMilliseconds()*1000;

            // Timezone
            case "O":
                var o=d.getTimezoneOffset();
                var tmp1=Math.floor(Math.abs(o)/60);
                var tmp2=Math.abs(o)%60;
                return ((o<0)?"+":"-")
                    +((tmp1<10)?"0"+tmp1:tmp1)
                    +((tmp2<10)?"0"+tmp2:tmp2);
            case "P":
                tmp = _format("O");
                return tmp.substr(0,3)+":"+tmp.substr(3,2);
            case "e":
            case "I":
            case "T":
                // @todo
                break;
            case "Z":
                return -60*d.getTimezoneOffset();

            // Date et Heure complète
            case "c":
                return d.toISOString();
            case "U":
                return Math.round(d.getTime()/1000);
        }
        return mask;
    }
    var d=this, tmp;

     // Run the RegExp and replace matches
    return str.replace(/\\?[dDmjwYHisFlSLMntyAaGghucUNzWoBeIOPTZ]/g, function(match,contents,offset,s){
        return (match.length==1) ? _format(match) : match;
    });
}