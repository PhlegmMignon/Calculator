# Calculator

Test cases: 
    Working:
        2 + 3 = = 3 + 1

        Does spamming 0's show in front?
        3 + 000.78 =

        Does trailing 0's show after decimal?
        3 + .0007 =

        
        .7 = .8 =

        9 / 4 /

        61/23

    Not working :


In case toFixed doesn't work for setting char limits: 
    if (operator != '÷') {
        n1len = n1.toString();
        n2len = n2.toString();
        
        if (n1len.length > n2len.length) {
            let maxlen = n1len.length;
        }
        else {
            let maxlen = n2len.length;
        }
    }
    else {
        let maxlen = 14;
    }
        
    answer = answer.toString();
    answer = answer.slice(0, maxlen);
    console.log(answer);