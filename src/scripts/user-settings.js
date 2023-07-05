var UserSettings = {}

var userSettingsFile = "userSettings.json";

function InitUserSettings()
{
    var file;

    if (FSO.FileExists("../" + userSettingsFile))
    {
        file = FSO.OpenTextFile("../" + userSettingsFile);
        fileContent = file.ReadAll();
        file.Close();
        UserSettings = JSON.parse(fileContent);
    }
    else
    {
        file = FSO.CreateTextFile("../" + userSettingsFile);
        
        UserSettings = { Action: Action.Shutdown, AdjustBrightness: true, CountdownHours: 0, CountdownMinutes: 0, TimeHours: 0, TimeMinutes: 0, Days: [] }

        file.WriteLine(JSON.stringify(UserSettings));
        file.Close();
    }

    SetSettings();
}

function SetSettings()
{
    if (UserSettings.Action == Action.Shutdown)
        document.getElementById("radioShutdown").checked = true;
    else if (UserSettings.Action == Action.Sleep)
        document.getElementById("radioSleep").checked = true;

    document.getElementById("checkboxBrightness").checked = UserSettings.AdjustBrightness;

    document.getElementById("countdownInputHours").value = UserSettings.CountdownHours;
    document.getElementById("countdownInputMinutes").value = UserSettings.CountdownMinutes;

    document.getElementById("timeInputHours").value = UserSettings.TimeHours;
    document.getElementById("timeInputMinutes").value = UserSettings.TimeMinutes;

    for (let i = 0; i < UserSettings.Days.length; i++)
    {
        document.getElementById(UserSettings.Days[i]).checked = true;
        document.getElementById(UserSettings.Days[i]).classList.add("checked");
    }
}

/*function GetSettings()
{
    if (document.getElementById("radio_shutdown").checked)
        UserSettings.Action = Action.Shutdown
    else if (document.getElementById("radio_sleep").checked)
        UserSettings.Action = Action.Sleep

    UserSettings.AdjustBrightness = document.getElementById("checkbox_brightness").checked

    UserSettings.CountdownHours = parseInt(document.getElementById("countdownInputHours").value);
    UserSettings.CountdownMinutes = parseInt(document.getElementById("countdownInputMinutes").value);

    UserSettings.TimeHours = parseInt(document.getElementById("timeInputHours").value);
    UserSettings.TimeMinutes = parseInt(document.getElementById("timeInputMinutes").value);

}*/

function WriteSettings()
{
    //GetSettings();

    var file = FSO.CreateTextFile("../" + userSettingsFile, true);
    file.WriteLine(JSON.stringify(UserSettings));
    file.Close();
}







// ACTION
function WriteActionShutdown()
{
    UserSettings.Action = Action.Shutdown;
    WriteSettings();
}

function WriteActionSleep()
{
    UserSettings.Action = Action.Sleep;
    WriteSettings();
}

// BRIGHTNESS
function WriteBrightness()
{
    UserSettings.AdjustBrightness = document.getElementById("checkboxBrightness").checked;
    WriteSettings();
}

// COUNTDOWN
function WriteCountdownHours()
{
    ValidateCountdownHours();
    UserSettings.CountdownHours = parseInt(document.getElementById("countdownInputHours").value);
    WriteSettings();
}

function WriteCountdownMinutes()
{
    ValidateCountdownMinutes();
    UserSettings.CountdownMinutes = parseInt(document.getElementById("countdownInputMinutes").value);
    WriteSettings();
}

// TIME
function WriteTimeHours()
{
    ValidateTimeHours();
    UserSettings.TimeHours = parseInt(document.getElementById("timeInputHours").value);
    WriteSettings();
}

function WriteTimeMinutes()
{
    ValidateTimeMinutes();
    UserSettings.TimeMinutes = parseInt(document.getElementById("timeInputMinutes").value);
    WriteSettings();
}