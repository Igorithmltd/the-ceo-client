import React, { useState } from 'react';

const DownloadImageTrabed = (props) => {
    const {src,className,alt} = props;
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const [datestamp, setDatestamp] = useState("");

    const handleImageError = (event) => {
        console.log("errorLoadingImage");
        setDatestamp(new Date());
        setError(true);
        console.log(event);
    };
    const handleImageLoad = () => {
        setError(false);
        setLoading(false);
    };

    return (
        <div className=''>
            {error ? (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    id={datestamp}
                />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    id={datestamp}
                />
            )}
        </div>
    );
};
export default DownloadImageTrabed;