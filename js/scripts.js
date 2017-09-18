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
    outputPercentNumber(persentAllSumProgr,persentAllSumAllDay,persentAllSumOutputProgr)
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

    var dateObjLeader = getDateInput('.date-leader');
    var dateObjProgr = getDateInput('.date-progr');

    var dayInput = $('.day').val();
});

function getDateInput(_class) {

    var date = $(_class).val();
    var parts = date.split('.');
    var tmpDateInput = new Date(parts[2], parts[1]-1, parts[0]);
    return tmpDateInput;
}