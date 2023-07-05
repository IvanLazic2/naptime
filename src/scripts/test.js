var service = new ActiveXObject("Schedule.Service");
service.Connect();

var rootFolder = service.GetFolder("\\");
var taskDefinition = service.NewTask(0);
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

var trigger = taskDefinition.Triggers.Create(1);
trigger.Id = "Trigger1";
trigger.StartBoundary = "2023-03-21T00:00:00";
trigger.Enabled = true;
trigger.EndBoundary = "2023-03-21T23:59:59";
trigger.DaysOfWeek = 62;
trigger.WeeksInterval = 1;
trigger.ExecutionTimeLimit = "PT5M";
trigger.RandomDelay = "PT5M";
trigger.Repetition.Interval = "PT1H";
trigger.Repetition.Duration = "PT2H";
trigger.Repetition.StopAtDurationEnd = true;

var action = taskDefinition.Actions.Create(0);
action.Path = "C:\\Windows\\System32\\shutdown.exe";
action.Arguments = "/s /t 0";

var registeredTask = rootFolder.RegisterTaskDefinition("Shutdown Task", taskDefinition, 6, null, null, 3);




const DaysOfWeek = {
    Sunday: 1,
    Monday: 2,
    Tuesday: 4,
    Wednesday: 8,
    Thursday: 16,
    Friday: 32,
    Saturday: 64
};

function getDaysOfWeekBitmask(daysOfWeek) {
    let bitmask = 0;
    for (let i = 0; i < daysOfWeek.length; i++) {
        bitmask |= DaysOfWeek[daysOfWeek[i]];
    }
    return bitmask;
}



var service = new ActiveXObject("Schedule.Service");
service.Connect();

var folder = service.GetFolder("\\");
var task = folder.GetTask("TaskName");
folder.DeleteTask(task.Name, 0);




function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  const date = new Date();
  console.log(formatDate(date));