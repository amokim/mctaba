import { useState } from 'react';
import { hasPoster } from '../utils/omdb.js';

function Poster({ src, title, className = '' }) {
    const [failed, setFailed] = useState(false);

    if (!hasPoster(src) || failed) {
        return (
            <div
                className={`flex aspect-[2/3] w-full items-center justify-center bg-gray-200 p-4 text-center text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400 ${className}`}
            >
                No Poster Available
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={`${title} poster`}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`aspect-[2/3] w-full object-cover ${className}`}
        />
    );
}

export default Poster;