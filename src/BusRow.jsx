import SchedulesRow from "./TimeRow";

export default function BusRow({ bus }) {

    return (
        <div className="route">
            <div className="title">{bus.name}</div>
            <div className="schedules-list">
                {bus.listTime.map(function (element, index) {
                    return <SchedulesRow key={`${index}`} element={element} />;
                })}
            </div>
        </div>
    );
}
