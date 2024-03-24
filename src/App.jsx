import { useState } from "react";

import { schedules } from "./assets/schedules";
import { settingIcon } from "./assets/gear-solid";
import { cityIcon } from "./assets/city-solid";
import { houseIcon } from "./assets/house-chimney-solid";

import BusRow from "./BusRow";


// разделить мобильный и пк css

const locationName = {
    city: "city",
    home: "home",
};

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}
function timeUntil(now, until) {
    const [nowHours, nowMinutes] = now;
    const [untilHours, untilMinutes] = until;

    let resultHours = untilHours - nowHours;
    let resultMinutes = untilMinutes - nowMinutes;
    if (resultMinutes < 0) {
        resultHours -= 1;
        resultMinutes += 60;
    }
    if (resultHours < 0 || resultMinutes < 0) {
        return '00:00';
    }

    return `${padTo2Digits(resultHours)}:${padTo2Digits(resultMinutes)}`;
}
function fiterNearestBus(bus, timeNow, locationName) {
    let list = bus.location[locationName];
    let listTime = [];

    for (let i = 0; i < list.length; i++) {
        const result = timeUntil(
            // timeNow,
            [10, 0],
            [list[i].hours, list[i].minutes]
        );

        const hours = padTo2Digits(list[i].hours);
        const minutes = padTo2Digits(list[i].minutes);

        listTime.push({
            timeArrival: `${hours}:${minutes}`,
            timeBeforeArrival: result,
        });
    }
    return listTime;
}

function getListNearestBus(schedules, timeNow, locationName, isAllList) {
    let listBus = [];

    schedules.forEach((bus) => {
        listBus.push({
            name: bus.name,
            listTime: fiterNearestBus(bus, timeNow, locationName),
        });
    });

    // if (isAllList) {
    //     return listBus[0];
    // } else {
    //     return listBus;
    // }
    return listBus;
}

function App() {
    const [time, setTime] = useState(new Date());
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const [activeButton, setActiveButton] = useState(locationName.home);
    const [isAllList, setIsAllList] = useState(false);

    const [listNearestBus, setListNearestBus] = useState(
        getListNearestBus(
            schedules,
            [hours, minutes],
            locationName.home,
            isAllList
        )
    );

    function timeChanged(delta) {
        setTime(new Date());
    }
    setInterval(function timeChecker() {
        var oldTime = timeChecker.oldTime || new Date(),
            newTime = new Date(),
            timeDiff = newTime.getMinutes() - oldTime.getMinutes();
        timeChecker.oldTime = newTime;
        if (Math.abs(timeDiff) === 1) {
            timeChanged(timeDiff);
        }
    }, 1000);

    function changeLocation(location) {
        setListNearestBus(
            getListNearestBus(schedules, [hours, minutes], location, isAllList)
        );
        setActiveButton(location);
    }

    return (
        <>
            <div className="schedules">
                {listNearestBus.map(function (bus, index) {
                    return <BusRow key={`${index}`} bus={bus} />;
                })}
            </div>

            <div className="panel">
                <button className="setting">{settingIcon}</button>
                <button
                    onClick={() => changeLocation(locationName.city)}
                    className={(activeButton == "city") ? "active-button"  : null}
                >
                    {cityIcon}
                </button>
                <button
                    onClick={() => changeLocation(locationName.home)}
                    className={(activeButton == "home") ? "active-button"  : null}
                >
                    {houseIcon}
                </button>
            </div>
        </>
    );
}

export default App;
