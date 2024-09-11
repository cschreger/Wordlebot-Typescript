'use client';

interface KeyProps {
    value: string;
    status: string;
    type: string
    onTileClick: (letter: string) => void;
}


export default function Key({value, status, type, onTileClick}: KeyProps) {
    const handleClick = (e: any) => {
        const value = e.target.innerHTML;
        onTileClick(value)
    }

    // const handleKeydown = (e: KeyboardEvent) => {
    //     console.log(e.target.value);
    // }
    
    return (
        <div
            className={
                `${status == "guessed" ? "bg-green-600" : status === "wrongPos" ? "bg-yellow-400" : status === "not_present" && type == "keyboard" ? "bg-gray-700": "bg-gray-300"} 
                w-12 h-12 text-center text-4xl my-2 font-bold mx-2 text-gray-800 rounded-sm ${type == 'keyboard' ? "text-3xl leading-10 min-w-10" : ""}`}
            onClick={(e) => handleClick(e)}
            // onKeyDown={(e) => handleKeydown(e)}
        >{value}</div>
    )
};