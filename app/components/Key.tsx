'use client';

interface KeyProps {
    value: string;
    status: string;
}


export default function Key({value, status}: KeyProps) {
    return (
        <div
            className={`${status == "guessed" ? "bg-green-700" : status === "wrongPos" ? "bg-yellow-400" : "bg-gray-300"} w-16 h-16 text-center text-4xl my-2 font-bold mx-2`}
        >{value}</div>
    )
};