var Action =  {
    Shutdown: 'shutdown',
    Sleep: 'sleep'
}

var Shell;
var ShellApp;
var FSO;
var CurrentDirectory;

var LastAction;

window.onload = function() 
{
    Shell = new ActiveXObject("WScript.Shell")
    ShellApp = new ActiveXObject("Shell.Application");
    FSO = new ActiveXObject("Scripting.FileSystemObject");
    CurrentDirectory = FSO.GetAbsolutePathName(".");

    LastAction = Action.Shutdown;
    
    window.resizeTo(854, 480);

    document.getElementById("hoursInput").value = 0;
    document.getElementById("minutesInput").value = 0;
}

function SetCustomTime()
{
    var hours = document.getElementById("hoursInput").value;
    var minutes = document.getElementById("minutesInput").value;

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

// time in hours
function RunAction(time)
{
    FluxBrightnessMin();

    radioShutdownChecked = document.querySelector('input[id="radio_shutdown"]:checked');
    radioSleepChecked = document.querySelector('input[id="radio_sleep"]:checked');

    if (radioShutdownChecked)
    {
        SetShutdownDelay(time);
        LastAction = Action.Shutdown;
    }
    else if (radioSleepChecked)
    {
        SetSleepDelay(time);
        LastAction = Action.Sleep;
    }
}

function SetShutdownDelay(time)
{
    Shell.Exec("shutdown -s -t " + (time * 3600).toString());
}   

function SetSleepDelay(time)
{
    var exedir = CurrentDirectory.slice(0, -"src/".length);
    ShellApp.ShellExecute('' + exedir + '\\PSTools\\psshutdown.exe', '-d -t ' + (time * 3600).toString(), '', 'runas', 0);
}

function FluxBrightnessMax()
{
    if (document.getElementById("checkbox_brightness").checked)
    {
        for (var i = 0; i < 18; i = i + 1)
        {
            Shell.SendKeys("%{PGUP}");
        }
    }
}   

function FluxBrightnessMin()
{
    if (document.getElementById("checkbox_brightness").checked)
    {
        for (var i = 0; i < 18; i = i + 1)
        {
            Shell.SendKeys("%{PGDN}");
        }
    }
}

function CancelAction()
{
    FluxBrightnessMax();

    switch(LastAction)
    {
        case Action.Shutdown:
            CancelShutdown();
        break;
        case Action.Sleep:
            CancelSleep();
        break;
    }
}

function CancelShutdown()
{
    Shell.Exec("shutdown -a");
}

function CancelSleep()
{
    var exedir = CurrentDirectory.slice(0, -"src/".length);
    ShellApp.ShellExecute('' + exedir + '\\PSTools\\psshutdown.exe', '-a', '', 'runas', 0);
}


//Rundll32.exe Powrprof.dll,SetSuspendState Sleep
//powercfg -h off
//https://learn.microsoft.com/en-us/sysinternals/downloads/psshutdown
//https://ss64.com/vb/shellexecute.html





function clearTextInput(id)
{   
    var el = document.getElementById(id);

    if (el.value == 0 || el.value == "")
    {
        el.value = "";
    }
}