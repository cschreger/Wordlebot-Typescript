'use client';

interface KeyProps {
    value: string;
    status: string;
    onTileClick: (letter: string) => void;
}


export default function Key({value, status, onTileClick}: KeyProps) {
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
                `${status == "guessed" ? "bg-green-700" : status === "wrongPos" ? "bg-yellow-400" : "bg-gray-300"} 
                w-16 h-16 text-center text-4xl my-2 font-bold mx-2`}
            onClick={(e) => handleClick(e)}
            // onKeyDown={(e) => handleKeydown(e)}
        >{value}</div>
    )
};