import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import './MovieCard.css';
import { useHistory } from 'react-router-dom'; 



function MovieCard({ movie, borderColor = '#009688' }) {

    const [stars, setStars] = useState(1);
    const [poster, setPoster] = useState('default.jpg');
    const [color, setColor] = useState();
    const history = useHistory();

    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const images = importAll(require.context('../posters', false, /\.(png|jpe?g|svg)$/));

    function showBorder() {
        setColor(borderColor)
    }

    function hideBorder() {
        setColor('#f5f5f5')
    }

    const goToMovie = (id) => {
        history.push(`/movies/${id}`);
    }


    return (
        <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder} onClick={() => goToMovie(movie.id)}>
            <div className="card horizontal" style={{ borderColor: color }}>
                <div className="card-image">
                    <img src={images[movie.picture].default} width='20' alt={movie.name} />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <div className="container">
                            <div className="row center-align">
                                <StarRatings
                                    rating={movie.stars}
                                    starRatedColor="#009688"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension='20px'
                                    starSpacing='1px'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;