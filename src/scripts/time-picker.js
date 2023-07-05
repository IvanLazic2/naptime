//https://stackoverflow.com/questions/31549393/vbscript-for-creating-a-scheduled-task
//https://learn.microsoft.com/hr-hr/windows/win32/taskschd/time-trigger-example--scripting-?redirectedfrom=MSDN
//https://learn.microsoft.com/en-us/windows/win32/taskschd/trigger?source=recommendations

const DaysOfWeek = {
    "Sunday": 1,
    "Monday": 2,
    "Tuesday": 4,
    "Wednesday": 8,
    "Thursday": 16,
    "Friday": 32,
    "Saturday": 64,
};

function getDaysOfWeekBitmask(daysOfWeek) 
{
    let bitmask = 0;
    for (let i = 0; i < daysOfWeek.length; i++) 
        bitmask |= daysOfWeek[i];
    return bitmask;
}

function SetTime()
{
    let hours = UserSettings.TimeHours;
    let minutes = UserSettings.TimeMinutes;

    let inputDate = new Date();
    inputDate.setHours(hours + 1, minutes, 0, 0);

    formattedStart = inputDate.toISOString().slice(0, 19);

    CreateTask(formattedStart);
}

function CancelTime() 
{
    DeleteTask();
}


function CreateTask(start)
{
    var rootFolder = Service.GetFolder("\\");
    var taskDefinition = Service.NewTask(0);
    var settings = taskDefinition.Settings;
    settings.Enabled = true;
    settings.Hidden = false;
    settings.RunOnlyIfIdle = false;
    settings.StopIfGoingOnBatteries = false;
    settings.DisallowStartIfOnBatteries = false;
    settings.AllowHardTerminate = true;
    settings.StartWhenAvailable = true;
    settings.RunOnlyIfNetworkAvailable = false;
    settings.IdleSettings.StopOnIdleEnd = false;
    settings.IdleSettings.RestartOnIdle = false;
    settings.AllowDemandStart = true;
    settings.UseUnifiedSchedulingEngine = true;
    settings.MultipleInstances = 0;
    settings.Priority = 7;
    var principal = taskDefinition.Principal;
    principal.RunLevel = 1;

    var trigger = taskDefinition.Triggers.Create(3); // 3 -> WeeklyTrigger, 2 -> DailyTrigger...
    trigger.Id = "Trigger1";
    trigger.StartBoundary = start;
    
    //debug(getDaysOfWeekBitmask([DaysOfWeek["Monday"], DaysOfWeek["Saturday"]]))
    
    let dayNumbers = []
    for (let i = 0; i < UserSettings.Days.length; i++)
    {
        dayNumbers.push(DaysOfWeek[UserSettings.Days[i]]);
    }

    trigger.DaysOfWeek = getDaysOfWeekBitmask(dayNumbers);
    //trigger.WeeksInterval = 1;
    trigger.Enabled = true;

    
    
    var action = taskDefinition.Actions.Create(0);

    if (UserSettings.Action == Action.Shutdown)
    {
        action.Path = "C:\\Windows\\System32\\shutdown.exe";
        action.Arguments = "/s /t 1";

        
    }
        
    else if (UserSettings.Action == Action.Sleep)
    {
        var exedir = CurrentDirectory.slice(0, -"src/".length);
        action.Path = '' + exedir + '\\PSTools\\psshutdown.exe';
        action.Arguments = '-d -t ' + (1).toString()
        //ShellApp.ShellExecute('' + exedir + '\\PSTools\\psshutdown.exe', '-d -t ' + (time * 3600).toString(), '', 'runas', 0);
    }

    try
    {
        if (rootFolder.GetTask("Naptime Task"))
        {
            debug("Task already exists")
        }
    }
    catch (e) 
    {
        var registeredTask = rootFolder.RegisterTaskDefinition("Naptime Task", taskDefinition, 6, null, null, 3);
    }
}

function DeleteTask()
{
    var rootFolder = Service.GetFolder("\\");

    try
    {
        var task = rootFolder.GetTask("Naptime Task");
        if (task) 
        {
            rootFolder.DeleteTask(task.Name, 0);
        }
    }
    catch (e)
    {
        debug("Task does not exist");
    }
    
}

function ValidateTimeHours()
{
    let hoursEl = document.getElementById("timeInputHours");

    if (isNaN(hoursEl.value))
        hoursEl.value = "00"

    if (hoursEl.value < 0)
        hoursEl.value = "00";

    if (hoursEl.value > 23)
        hoursEl.value = "23";

    if (hoursEl.value < 9)
    hoursEl.value = String(hoursEl.value).padStart(2, "0");
}

function ValidateTimeMinutes()
{
    let minutesEl = document.getElementById("timeInputMinutes");

    if (isNaN(minutesEl.value))
        minutesEl.value = "00"

    if (minutesEl.value > 59)
        minutesEl.value = "59";

    if (minutesEl.value < 9)
        minutesEl.value = String(minutesEl.value).padStart(2, "0");
}


function ValidateTime()
{
    ValidateTimeHours();
    ValidateTimeMinutes();
}



function CheckDay(id)
{
    el = document.getElementById(id);
    el.checked ^= 1;

    if (el.checked)
    {
        el.classList.add("checked");
        UserSettings.Days.push(id);
    }
    else
    {
        el.classList.remove("checked");
        UserSettings.Days.removeByValue(id);
    }
        
}