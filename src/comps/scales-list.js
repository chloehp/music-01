import './cob.scss';

export default function ScalesList(props) { 
    const scales = [
        //0: MAJOR PENT
        ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        //0: MAJOR PENT
        ["C", "D", "E", "A"],
    ]

    function limitToScale(scale = 0) {
        const allKeys = [...document.querySelectorAll(".w-key"), ...document.querySelectorAll(".b-key")];
        //console.log(allKeys);
        const akLen = allKeys.length;
        for (let i = 0; i < akLen; i++) {
            const note = allKeys[i].id.slice(3, -1);
            if (scales[scale].includes(note)) {allKeys[i].classList.remove("width-0")}
            else {allKeys[i].classList.add("width-0")}
        }

    }

    return (      
        <div className='fill' onClick={() => limitToScale(0)}>
        </div>
    );
}