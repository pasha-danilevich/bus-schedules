
function convertTimeToNumber(timeStr) {
    var timeArray = timeStr.split(':');
    var hours = parseInt(timeArray[0]);
    var minutes = parseInt(timeArray[1]);
    var totalMinutes = hours * 60 + minutes;
    return totalMinutes;
}

export default function SchedulesRow({ element }) {

    function toggleClassName(time){
        time = convertTimeToNumber(time)
        if (time == 0){
            return 'gone'
        }
        if (time <= 30){
            return 'green'
        }
        if (time > 30 && time <= 70){
            return 'warning'
        }
        if (time > 70 ){
            return 'danger'
        }
    }
    function isGone(time){
        if (time == '00:00'){
            return 'time gone'
        }
        return 'time'
    }

    return (
        <div className="row">
            <div className={isGone(element.timeBeforeArrival)}>
            <div>{element.timeArrival}</div> <span className={toggleClassName(element.timeBeforeArrival)}>{element.timeBeforeArrival}</span>
            </div>
        </div>
    );
}
