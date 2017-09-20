$('.ball-btn').click(function () {

    var coef = $('.ball-coef');

    var xjProj = $('.ball-proj-xj');
    var xjAnalog = $('.ball-anal-xj');

    var answersProj = $('.ball-proj-answer');
    var answerAnalog = $('.ball-anal-answer');

    for(var i = 0; i < xjProj.length; i++ ){
        answersProj[i].innerHTML = (parseFloat(coef[i].textContent) * parseFloat(xjProj[i].value)).toFixed(2);
        answerAnalog[i].innerHTML = (parseFloat(coef[i].textContent) * parseFloat(xjAnalog[i].value)).toFixed(2);
    }
    var sumAnalog = sumProjAnalog(answerAnalog);
    var sumProj = sumProjAnalog(answersProj);

    $('.ball-proj-sum').text(sumProj);

    $('.ball-analog-sum').text(sumAnalog);

    var coefTechDiv= $('.coef-tech');
    var coefTechVal = coefTech(sumProj, sumAnalog);
    coefTechDiv.append("<p>Отношение двух найденных индексов называют коэффициентом технического уровня (КТУ) Аk первого программного продукта по отношению ко второму:</p>");
    coefTechDiv.append("A = " + coefTechVal);

    if(coefTechVal > 1)
        coefTechDiv.append("<p>Так как КТУ больше 1, то разработка проекта с технической точки зрения оправдана.</p>");
    else
        coefTechDiv.append("<p>Так как КТУ меньше 1, то разработка проекта с технической точки зрения неоправдана.</p>");
});

function sumProjAnalog(_array) {
    var sum = 0;

    for(var i = 0; i< _array.length; i++){
        sum+=parseFloat(_array[i].textContent);
    }

    return sum.toFixed(2);
}

function coefTech(sum1, sum2) {

    return (sum1/sum2).toFixed(2);
}

$('.intensity-btn').click(function () {
    var phaseN = ['.phase1','.phase2','.phase3','.phase4'];

    for(var i = 0; i < phaseN.length; i++){
        proseccIntensity(phaseN[i]);
    }

    var persentAllSumProgr = $('.intensity-allsum-progrday').val();
    var persentAllSumLeader = $('.intensity-allsum-leaderday').val();
    var persentAllSumAllDay = $('.intensity-allsum-allday').val();

    var persentAllSumOutputLeader = $('.intensity-percent-allsumleader');
    var persentAllSumOutputProgr = $('.intensity-allsumprogr-percent');

    outputPercentNumber(persentAllSumLeader,persentAllSumAllDay,persentAllSumOutputLeader);
    outputPercentNumber(persentAllSumProgr,persentAllSumAllDay,persentAllSumOutputProgr);
    addDayCalendar();
    addWorkDayPay()

    addTimeMachine();
});

function proseccIntensity(_class) {

    var allDay = $(_class +' .intensity-allday');
    var leaderDay = $(_class + ' .intensity-leaderday');
    var progrDay = $(_class + ' .intensity-progrday');

    var persentLeader = $(_class + ' .intensity-percent-leader');
    var persentProgr = $(_class + ' .intensity-progr-percent');

    var persentSumProgr = $(_class + ' .intensity-sumprogr-percent');
    var persentSumLeader = $(_class + ' .intensity-percent-sumleader');



    var sumAllDayField = $(_class + ' .intensity-sum-allday');

    outputPercent(leaderDay, allDay, persentLeader);
    outputPercent(progrDay, allDay, persentProgr);

    var sumAllDay = phaseSum(allDay);
    var sumLeaderDay = phaseSum(leaderDay);
    var sumProgrDay = phaseSum(progrDay);

    sumAllDayField.val(sumAllDay);

    $(_class + ' .intensity-sum-leaderday').val(sumLeaderDay);
    $(_class + ' .intensity-sum-progrday').val(sumProgrDay);
    phaseSumAll(sumAllDay, '.intensity-allsum-allday');
    phaseSumAll(sumLeaderDay, '.intensity-allsum-leaderday');
    phaseSumAll(sumProgrDay, '.intensity-allsum-progrday');
    outputPercentNumber(sumLeaderDay, sumAllDay, persentSumLeader);
    outputPercentNumber(sumProgrDay, sumAllDay, persentSumProgr);



}
function addDayCalendar(){

  var dayLeaderPlan = $('.intensity-leaderday');
  var dayLeaderCalendar =  $('.day-leader');

  var dayProgrPlan = $('.intensity-progrday');
  var dayProgrCalendar = $('.day-progr');

  for(var i = 0; i < dayLeaderCalendar.length; i++){
    dayLeaderCalendar[i].value = dayLeaderPlan[i].value;
    dayProgrCalendar[i].value = dayProgrPlan[i].value;
  }

}

function addWorkDayPay() {
    var leaderWorkHourIntensity =  $('.intensity-allsum-leaderday').val();
    var progrWorkHourIntensity = $('.intensity-allsum-progrday').val();

    $('.workday-leader').html(leaderWorkHourIntensity);
    $('.workday-progr').html(progrWorkHourIntensity);
}

function outputPercent(nameDay, allDay, nameOutput) {
        for (var i = 0; i < allDay.length; i++) {
            nameOutput[i].innerHTML = ((parseInt(nameDay[i].value) / parseInt(allDay[i].value)) * 100).toFixed(2);
        }
}
function outputPercentNumber(nameDay, allDay, nameOutput) {
    nameOutput.text((nameDay / (allDay) * 100).toFixed(2));
}

function phaseSum(nameDay) {
    var sum = 0;
    for( var i = 0; i < nameDay.length; i++){
        sum+=parseInt(nameDay[i].value);
    }

    return sum;
}

function phaseSumAll(nameDay, className) {
    var allDayInput = $(className);
    var sumAllDay = parseInt(allDayInput.val());
    sumAllDay+=nameDay;
    allDayInput.val(sumAllDay);
}

$('.calendar-btn').click(function () {
    var dateLeaderStartArr = $('.date-leader');
    var dateProgrStartArr = $('.date-progr');

    var dateLeaderObj = 0;
    var dateProgrObj = 0;

    var dayLeaderArr = $('.day-leader');
    var dayProgrArr = $('.day-progr');

    var lastDayLeaderArr = $('.lastday-leader');
    var lastDayProgrArr = $('.lastday-progr');

    var tmpL = true;
    var tmpP = true;

    var tmpDate = 0;
    for( var i = 0; i < dayLeaderArr.length; i++ ){
        tmpL = true;
        tmpP = true;

        if(parseInt(dayLeaderArr[i].value) < 1){
            lastDayLeaderArr[i].value = '-';
            dateLeaderStartArr[i].value = '-';
            tmpL = false;
        }else {
            dateLeaderObj = getDateInput(dateLeaderStartArr[i]);
            dateLeaderObj.setDate(dateLeaderObj.getDate() + parseInt(dayLeaderArr[i].value - 1));
            lastDayLeaderArr[i].value = formatDate(dateLeaderObj, true);
        }

        if(parseInt(dayProgrArr[i].value) < 1) {
            lastDayProgrArr[i].value = '-';
            dateProgrStartArr[i].value = '-';
            tmpP = false;
        }else{
            dateProgrObj = getDateInput(dateProgrStartArr[i]);
            dateProgrObj.setDate(dateProgrObj.getDate() + parseInt(dayProgrArr[i].value - 1));
            lastDayProgrArr[i].value = formatDate(dateProgrObj, true);
        }

        if((!tmpL) && (tmpP)){
            dateProgrObj = getDateInput(lastDayProgrArr[i]);
            tmpDate = formatDate(dateProgrObj, false);
            dateLeaderStartArr[i+1].value = tmpDate;
            dateProgrStartArr[i+1].value = tmpDate;
        }
        if((!tmpP) && (tmpL)){
            dateLeaderObj = getDateInput(lastDayLeaderArr[i]);
            tmpDate = formatDate(dateLeaderObj, false);
            dateProgrStartArr[i+1].value = tmpDate;
            dateLeaderStartArr[i+1].value = tmpDate;
        }

        if((getDateInput(lastDayProgrArr[i]) > getDateInput(lastDayLeaderArr[i])) && (tmpL) && (tmpP)){
            dateProgrObj = getDateInput(lastDayProgrArr[i]);
            tmpDate = formatDate(dateProgrObj, false);
            dateLeaderStartArr[i+1].value = tmpDate;
            dateProgrStartArr[i+1].value = tmpDate;
        }else if(tmpP && tmpL){
            dateLeaderObj = getDateInput(lastDayLeaderArr[i]);
            tmpDate = formatDate(dateLeaderObj, false);
            dateLeaderStartArr[i+1].value = tmpDate;
            dateProgrStartArr[i+1].value = tmpDate;
        }
    }
});

function getDateInput(_class) {

    var date = _class.value;
    var parts = date.split('.');
    console.log(parts);
    return new Date(parts[2], parts[1], parts[0]);
}

function formatDate(date, last) {

    var yy = date.getFullYear();


    var mm = date.getMonth();
    if(mm < 10) mm = '0' + mm;
    if(last) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
    }
    else{
        date.setDate(date.getDate() + 1);
        dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
    }
    return dd + '.' + mm + '.' + yy;
}

$('.call-btn').click(function () {
    var okladLeader = $('.oklad-leader').val();
    var okladProgr = $('.oklad-progr').val();

    var workdayLeader = $('.workday-leader').html();
    var workdayProgr = $('.workday-progr').html();

    var allSumLeader = avgOzp('.avgpay-leader', okladLeader, workdayLeader, '.paysum-leader');
    var allSumProgr = avgOzp('.avgpay-progr', okladProgr, workdayProgr, '.paysum-progr');


    $('.payall-sum').text(sumAB(allSumLeader,allSumProgr));

    pasteInto('.payall-sum','.z-basepay',1);
    pasteInto('.z-basepay','.z-additpay',0.4);

    pasteInto('.payall-sum', '.z-naklad', 0.6);

    pasteInto('.payall-sum','.z-soc', 0.4);
    
    sumSoc();
});

function avgOzp(_classAvg, money, workDay, _classAllSum) {
    var avg = (parseFloat(money)/21).toFixed(2);
    var allsum = (avg * parseFloat(workDay).toFixed(2));

    $(_classAvg).text(avg);
    $(_classAllSum).text(allsum);

    return allsum;
}

function sumAB(a, b) {
    return (a+b).toFixed(2);
}


function addInput(intoTable, beforeField){

	var row = $(intoTable).clone();
	row.attr('class','');

    $(beforeField).before(row);

}

$('.addInput').click(function () {
    
    addInput('.matherial tr.matherial-copy','.matherial-last');
});

$('.matherial-btn').click(function () {
    var matherialAmount = $('.matherial-amount');
    var matherialPrice = $('.matherial-price');
    var matherialSum = $('.matherial-sum');
    for(var i = 0; i < matherialAmount.length; i++){
        matherialSum[i].innerHTML = (parseFloat(matherialAmount[i].value) * parseFloat(matherialPrice[i].value)).toFixed(2);

    }
    console.log(matherialSum);
    var allSum = sumArray(matherialSum);

    $('.matherial-allsum').html(allSum);

    pasteInto('.matherial-allsum', '.z-matherialsum',1);
})
function sumArray(_arr){
    var sum = 0;
    for( var i = 0; i < _arr.length; i++){
        sum+=(parseFloat(_arr[i].textContent));
    }
    return sum;
}

function pasteInto(_classOut, _classInto,n) {
    var out = parseFloat($(_classOut).text())*n;
    var into = $(_classInto).text(out);
}

function addTimeMachine() {
    var timeWork = parseFloat($('.intensity-allsum-progrday').val());
    var sum = timeWork * 4 * 10;

    $(".z-timeprogr").text(sum);
}

function sumSoc() {
    var basePay = $('.z-basepay').html();
    var additPay = $('.z-additpay').html();

    var sum = ((parseFloat(basePay) + parseFloat(additPay)) * 0.302).toFixed(2);
    alert(sum);

    $('.z-soc').html(sum);
}

$('.z-btn').click(function(){
    var basePay = parseFloat($('.z-basepay').html());
    var additPay = parseFloat($('.z-additpay').html());
    var timeProgr = parseFloat($('.z-timeprogr').html());
    var soc = parseFloat($('.z-soc').html());
    var naklad = parseFloat($('.z-naklad').html());

    var sum = (basePay + additPay + timeProgr + soc  + naklad).toFixed(2);
    $('.z-allsum').html(sum);
});

$('.addInputSpends').click(function () {
    addInput('.spends .spends-copy', '.spends-last');
});

$('.spends-btn').click(function () {
   var K0 = k0();
    $('.spends-allsum').text(K0);
});

function k0() {
    var K0 = 0;

    var cost = $('.spends-cost');
    var allCost = sumArrayInput(cost);

    var Qi = cost.length;
    var Y = koefY();

    K0 = (allCost * Qi * Y).toFixed(2);

    return K0;
}

function koefY() {

    var effective = $('.spends-effective');
    var frequency = $('.spends-frequency');
    var frequencySum = sumArrayInput(frequency);

    var y = 0;

    var t = hardWorkT();
    var f = sumArrayInput(effective);

    y = t/(f*frequencySum);

    return y.toFixed(2);

}

function hardWorkT() {
    var hardwork = $('.spends-hardwork');
    var frequency = $('.spends-frequency');
    var n = 2;
    var t = 0;
    var sum = 0;
    for( var i = 0; i < hardwork.length; i++ ){
        t = parseFloat(hardwork[i].value) * parseFloat(frequency[i].value);
        sum+=t;

    }
    return sum.toFixed(2);
}

function sumArrayInput(_array) {
    var sum = 0;
    for(var i = 0; i<_array.length; i++){
        sum+=parseFloat(_array[i].value);
    }

    return sum.toFixed(2);
}

function kP() {
    var basePay = parseFloat($('.z-basepay').text());
    var mathCost = parseFloat($('.z-matherialsum').text());
    var timeCost = parseFloat($('.z-timeprogr').text());
    var kpSum = 0;
    kpSum = ((1 + 0.4) * (1 + 0.302) + 0.6) * (basePay + mathCost + timeCost);

    return kpSum;
}

$('.cap-btn').click(function () {
    var k0P = kP();
    var k0Sum = k0();

    var sum = k0P + k0Sum;

    sum = sum.toFixed(2);

    $('.capSum').append(sum);
});

