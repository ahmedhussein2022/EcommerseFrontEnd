import { AbstractControl } from "@angular/forms";

export function compair(control:AbstractControl)
{
    const strattime:Date=control.get("startTime")?.value;
    const endtime:Date=control.get("endTime")?.value;
    console.log(strattime);
    console.log(endtime);
    
    if (strattime && endtime)
    {
        const isRangeValid=(endtime.getTime()-strattime.getTime()>0);
        return isRangeValid ? null:{dateRange:true};
    }
    
        return null;
    
}