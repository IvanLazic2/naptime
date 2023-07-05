var Action =  {
    Shutdown: 'shutdown',
    Sleep: 'sleep'
}

var Shell;
var ShellApp;
var FSO;
var CurrentDirectory;

window.onload = function() 
{
    Shell = new ActiveXObject("WScript.Shell")
    ShellApp = new ActiveXObject("Shell.Application");
    Service = new ActiveXObject("Schedule.Service");
    Service.Connect();
    FSO = new ActiveXObject("Scripting.FileSystemObject");
    CurrentDirectory = FSO.GetAbsolutePathName(".");

    window.resizeTo(854, 480);

    InitUserSettings();

    ValidateCountdown();
    ValidateTime();
}

function debug(message)
{
    document.getElementById("debugP").innerHTML = message
}

// time in hours
function RunAction(time)
{
    var result;

    switch (UserSettings.Action) {
        case Action.Shutdown:
            result = SetShutdownDelay(time);
            break;
    
        case Action.Sleep:
            result = SetSleepDelay(time);
            break;
    }

    if (result == 0)
        FluxBrightnessMin();
}

function CancelAction()
{
    var result;

    switch(UserSettings.Action)
    {
        case Action.Shutdown:
            result = CancelShutdown();
        break;
        case Action.Sleep:
            result = CancelSleep();
        break;
    }

    if (result == 0)
        FluxBrightnessMax();
}

function SetShutdownDelay(time)
{
    var result = 0;
    var command = "shutdown -s -t " + (time * 3600).toString();
    var exec = Shell.Exec(command);

    while (exec.Status == 0) { }

    if (exec.ExitCode == 1190)
    {
        result = exec.ExitCode;
        debug("Shutwdown already pending")
    }

    return result;
}   

function SetSleepDelay(time)
{
    var exedir = CurrentDirectory.slice(0, -"src/".length);
    ShellApp.ShellExecute('' + exedir + '\\PSTools\\psshutdown.exe', '-d -t ' + (time * 3600).toString(), '', 'runas', 0);
}

function CancelShutdown()
{
    var result = 0
    var command = "shutdown -a"
    var exec = Shell.Exec(command);

    while (exec.Status == 0) { }

    if (exec.ExitCode == 1116)
    {
        result = exec.ExitCode;
        debug("No shutdown pending");
    }

    return result;
}

function CancelSleep()
{
    var exedir = CurrentDirectory.slice(0, -"src/".length);
    ShellApp.ShellExecute('' + exedir + '\\PSTools\\psshutdown.exe', '-a', '', 'runas', 0);

    
}






function SelectTextInput(id)
{   
    var el = document.getElementById(id);

    if (el.value != "")
    {
        el.focus();
        el.select();
    }
        

    /*if (el.value == 0 || el.value == "")
    {
        el.value = "";
    }*/
}


//Rundll32.exe Powrprof.dll,SetSuspendState Sleep
//powercfg -h off
//https://learn.microsoft.com/en-us/sysinternals/downloads/psshutdown
//https://ss64.com/vb/shellexecute.html

