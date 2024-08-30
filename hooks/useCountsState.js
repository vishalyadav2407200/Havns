import {useState} from "react";

const useCountsState=()=>{
    const [Halls, setHalls] = useState({ num: 0 });
    const [Seating, setSeating] = useState({ num: 0 });
    const [Maxcapacity, setMaxcapacity] = useState({ num: 0 });
    const [Lawns, setLawns] = useState({ num: 0 });
    return { Halls, setHalls, Lawns, setLawns, Maxcapacity, setMaxcapacity,Seating, setSeating};
}
export default useCountsState;