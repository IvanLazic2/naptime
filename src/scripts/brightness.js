function FluxBrightnessMax()
{
    if (document.getElementById("checkboxBrightness").checked)
    {
        for (var i = 0; i < 18; i = i + 1)
        {
            Shell.SendKeys("%{PGUP}");
        }
    }
}   

function FluxBrightnessMin()
{
    if (document.getElementById("checkboxBrightness").checked)
    {
        for (var i = 0; i < 18; i = i + 1)
        {
            Shell.SendKeys("%{PGDN}");
        }
    }
}