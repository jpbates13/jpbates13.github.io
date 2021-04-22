function getDaysRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor(t/1000);
    var minutes = Math.floor(t/(1000*60))
    var hours = Math.floor(t/(1000*60*60))
    var days = Math.floor( t/(1000*60*60*24) );
    hours = hours - (days*24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    return {
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getTimeSince(starttime){
    var t = Date.parse(new Date()) - Date.parse(starttime);
    var seconds = Math.floor(t/1000);
    var minutes = Math.floor(t/(1000*60))
    var hours = Math.floor(t/(1000*60*60))
    var days = Math.floor( t/(1000*60*60*24) );

    hours = hours - (days*24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    return {
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function humaniseSince(days, hours, minutes, seconds) {
    var text = days.toString(); 
    text = text.concat(" days, ");
    text = text.concat(hours.toString());
    text = text.concat( " hours, "); 
    text = text.concat(minutes.toString());
    text = text.concat(" minutes, ");
    text = text.concat(seconds.toString());
    text = text.concat(" seconds");
    return text;
  }
  function getPercentage(starttime, endtime) {
    startDate = Date.parse(starttime);
    endDate = Date.parse(endtime);
    diff = endDate - startDate;
    totalSeconds = Math.floor( diff/(1000) );
    var progressDiff = Date.parse(new Date()) - Date.parse(starttime);
    var progressSeconds = Math.floor( progressDiff/(1000) );
    decimal = progressSeconds/totalSeconds;
    percentage = decimal * 100;
    return percentage
  }
var x = setInterval(function() {
  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

  var today = new Date();

  var startDate = 'March 11 2020 13:26';
  var endDate = 'September 7 2021 08:00';

  var startTime = new Date(startDate);
  var endTime = new Date(endDate);
  
  
  var timeGone = getTimeSince(startDate);
  var daysLeft = getDaysRemaining(endDate);
  var sinceText =  humaniseSince(timeGone['days'], timeGone['hours'], timeGone['minutes'], timeGone['seconds']);
  var untilText = humaniseSince(daysLeft['days'], daysLeft['hours'], daysLeft['minutes'], daysLeft['seconds'] );
  var percentComplete = getPercentage(startDate, endDate);
  if($(window).width() < 960) {
  	percentComplete = Math.round(percentComplete * 1000) / 1000;
  }
  document.getElementById('progress-bar').style.width = percentComplete.toString() + '%';
  var countdown = document.getElementById('countdown');
  	countdown.innerHTML = '<p>' + sinceText + ' passed since ' + startDate.toString() + '<p> ' + 
  	untilText + ' remaining until ' + endDate.toString() + '</p>';
  var percentage = document.getElementById('percent');
  	percent.innerHTML = percentComplete.toString() + '% complete' ;
}, 1000);