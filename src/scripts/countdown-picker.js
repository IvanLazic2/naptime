function SetCountdown()
{
    var hours = UserSettings.CountdownHours;
    var minutes = UserSettings.CountdownMinutes;

    if (!isNaN(+hours) && !isNaN(+minutes))
    {
        var time = +hours + (+minutes / 60);

        if (time > 0)
        {
            RunAction(time);
        }
    }
    else
    {
        showNaNMsgBox();
    }
}

function ValidateCountdownHours()
{
    let hoursEl = document.getElementById("countdownInputHours");

    if (isNaN(hoursEl.value))
        hoursEl.value = "0";

    if (hoursEl.value < 0)
        hoursEl.value = "0";

    if (hoursEl.value == "")
        hoursEl.value = "0"

}

function ValidateCountdownMinutes()
{
    let minutesEl = document.getElementById("countdownInputMinutes");

    if (isNaN(minutesEl.value))
        minutesEl.value = "00";

    if (minutesEl.value > 59)
        minutesEl.value = "59";

    if (minutesEl.value < 9)
        minutesEl.value = String(minutesEl.value).padStart(2, "0");
}

function ValidateCountdown()
{
    ValidateCountdownHours();
    ValidateCountdownMinutes();
}

