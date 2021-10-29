var audioContext = null;
var oscillatorNode = null;
var stopTime = 0;
var handle = null;
var delayOn429 = true;
var waitInterval = 10000;
var requestsInterval = 3000;
var cities =
    [
        54, // Brasília
        55, // Rio de Janeiro
        56, // São Paulo
        57, // Recife
        128, // Porto Alegre
    ];
var casv =
    [
        58, // CASV Brasília
        59, // CASV Rio de Janeiro
        60, // CASV São Paulo
        63, // CASV Recife
        62, // CASV Porto Alegre
    ];

// !!!!FILL your account number
var accountNumber = 00000000; // get the account number from your logged in your: (e.g. https://ais.usvisa-info.com/pt-br/niv/schedule/{accountNumber})
// !!!!FILL expected months, using same format
var expectedMonths = ["2021-11", "2021-12", "2022-01", "2022-02", "2022-03"];
// !!!!FILL expected city, using the numbers above
var expectedCity = 56; // automagically CASV 60
var expectedOrg = null; // You don't need to fill, but maybe is useful when not working with CASVs.

function beep(frequency, durationSec, ramp = false) {
    if (oscillatorNode == null) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        stopTime = audioContext.currentTime;

        oscillatorNode = audioContext.createOscillator();
        oscillatorNode.type = "sine";
        oscillatorNode.connect(audioContext.destination);
        if (ramp) {
            oscillatorNode.frequency.setValueAtTime(frequency, stopTime);
        }
        oscillatorNode.start();
        oscillatorNode.onended = function () {
            oscillatorNode = null;
            audioContext = null;
        }
    }

    if (ramp) {
        oscillatorNode.frequency.linearRampToValueAtTime(frequency, stopTime); // value in hertz
    } else {
        oscillatorNode.frequency.setValueAtTime(frequency, stopTime);  // value in hertz
    }

    stopTime += durationSec;
    oscillatorNode.stop(stopTime);
}

function getDate() {
    return '[' + new Date().toLocaleTimeString("pt-BR", { timeStyle: "medium" }).substring(0, 8) + ']';
}

function logText(text) {
    console.log(getDate() + ' ' + text);
}

function stop() {
    clearInterval(handle);
}

function checkSchedule() {
    expectedOrg = expectedOrg ?? casv[cities.indexOf(expectedCity)];
    let fetchUrl = `https://ais.usvisa-info.com/pt-br/niv/schedule/${accountNumber}/appointment/days/${expectedOrg}.json?&consulate_id=${expectedCity}&consulate_date=&consulate_time=&appointments[expedite]=false`;
    fetch(fetchUrl)
        .then(response => {
            logText('received http: ' + response.status);
            if (response.status == 429) {
                if (delayOn429) {
                    logText('clearing current interval');
                    clearInterval(handle);
                    logText('waiting ' + waitInterval + ' ms');
                    handle = setTimeout(() => {
                        logText('setting up again');
                        handle = setInterval(checkSchedule, requestsInterval);
                    }, waitInterval);
                }
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                logText('fetched, elements: ' + data.length);
                if (data.length != 0) {
                    data.forEach(elem => {
                        logText('date: ' + elem.date);
                        if (expectedMonths.indexOf(elem.date.substring(0, 7)) != -1) {
                            beep(1000, 0.2);
                            logText(JSON.stringify(elem.date));
                        }
                    });
                }
            }
        });
}

handle = setInterval(checkSchedule, requestsInterval);

// to stop script, just call the "stop()" function
