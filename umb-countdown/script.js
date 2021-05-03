const DEBUG = false;
if (DEBUG) {
  var delayed = new Date();
  delayed.setSeconds(delayed.getSeconds() + 5);
}

function getDaysRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(t / 1000);
  var minutes = Math.floor(t / (1000 * 60));
  var hours = Math.floor(t / (1000 * 60 * 60));
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
function getTimeSince(starttime) {
  var t = Date.parse(new Date()) - Date.parse(starttime);
  var seconds = Math.floor(t / 1000);
  var minutes = Math.floor(t / (1000 * 60));
  var hours = Math.floor(t / (1000 * 60 * 60));
  var days = Math.floor(t / (1000 * 60 * 60 * 24));

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
function humaniseSince(days, hours, minutes, seconds) {
  var text = days.toString();
  text = text.concat(" days, ");
  text = text.concat(hours.toString());
  text = text.concat(" hours, ");
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
  totalSeconds = Math.floor(diff / 1000);
  var progressDiff = Date.parse(new Date()) - Date.parse(starttime);
  var progressSeconds = Math.floor(progressDiff / 1000);
  decimal = progressSeconds / totalSeconds;
  percentage = decimal * 100;
  return percentage;
}

var x = setInterval(function () {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var today = new Date();

  var startDate = "March 11 2020 13:26";
  var endDate = "September 7 2021 08:00";
  if (DEBUG) {
    var endDate = delayed.toString();
  }

  // var startTime = new Date(startDate);
  var endTime = new Date(endDate);

  var timeGone = getTimeSince(startDate);
  var daysLeft = getDaysRemaining(endDate);
  var sinceText = humaniseSince(
    timeGone["days"],
    timeGone["hours"],
    timeGone["minutes"],
    timeGone["seconds"]
  );
  var untilText = humaniseSince(
    daysLeft["days"],
    daysLeft["hours"],
    daysLeft["minutes"],
    daysLeft["seconds"]
  );
  var percentComplete = getPercentage(startDate, endDate);
  percentComplete = Math.round(percentComplete * 100000) / 100000;
  if ($(window).width() < 960) {
    percentComplete = Math.round(percentComplete * 1000) / 1000;
  }
  document.getElementById("progress-bar").style.width =
    percentComplete.toString() + "%";
  var countdown = document.getElementById("countdown");
  countdown.innerHTML =
    "<p>" +
    sinceText +
    " passed since " +
    startDate.toString() +
    "<p> " +
    untilText +
    " remaining until " +
    endDate.toString() +
    "</p>";
  var percentage = document.getElementById("percent");
  percent.innerHTML = percentComplete.toString() + "% complete";

  if (today >= endTime) {
    var end = Date.now() + 15 * 1000;

    var colors = ["#005081", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    var count = 200;
    var defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
    clearInterval(x);
  }
}, 1000);
