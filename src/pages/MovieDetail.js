import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/loader';
import StarRatings from 'react-star-ratings';



function PokemonsDetail({ match }) {

    const [movie, setMovie] = useState(null);
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [showYearInput, setShowYearInput] = useState(false);
    const [showDirectorInput, setShowDirectorInput] = useState(false);
    const [poster, setPoster] = useState('../posters/default.jpg');
    const [name, setName] = useState();
    const [year, setYear] = useState();
    const [director, setDirector] = useState();


    function toggleInput(input) {
        switch (input) {
            case 'title':
                setShowTitleInput(true)
                setShowYearInput(false)
                setShowDirectorInput(false)
                break;
            case 'year':
                setShowYearInput(true)
                setShowTitleInput(false)
                setShowDirectorInput(false)
                break;
            case 'director':
                setShowDirectorInput(true)
                setShowYearInput(false)
                setShowTitleInput(false)
                break;
            default:
                setShowTitleInput(false)
                setShowYearInput(false)
                setShowDirectorInput(false)
                break;
        }
    }


    useEffect(() => {
        fetch(`http://localhost:3001/movies/${match.params.id}`)
            .then(response => response.json())
            .then(movie => {
                if (movie.id) {
                    setMovie(movie)
                    setName(movie.name)
                    setYear(movie.year)
                    setDirector(movie.director)
                    const lib = require(`../posters/${movie.picture}`)
                    setPoster(lib['default'])
                    setRating(movie.stars)
                }
            })

        // version sans API 
        // MOVIES.forEach(movie => {
        //     if (match.params.id === movie.id.toString()) {
        //         setMovie(movie)
        //         const lib = require(`../posters/${movie.picture}`)
        //         setPoster(lib['default'])
        //     }
    }, [match.params.id])


    const [rating, setRating] = useState();


    function changeData(e, input, newRating) {
        

        switch (input) {
            case 'title':
                const newName = e.target.value
                setName(newName)
                movie.name = newName
                break;
            case 'year':
                const newYear = e.target.value
                setYear(newYear)
                movie.year = newYear
                break;
            case 'director':
                const newDirector = e.target.value
                setDirector(newDirector)
                movie.director = newDirector
                break;
            case 'rating':
                movie.stars = newRating
                break;
            default:
                break;
        }

        fetch(`http://localhost:3001/movies/${match.params.id}`, {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    function changeRating(newRating) {
        setRating(newRating)
        changeData(null, 'rating', newRating)
    }

    return (
        <div>
            {movie ? [
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <div className="card hoverable">
                            <div className="card-image">
                                <img src={poster} alt={movie.name} style={{ width: '250px', margin: '0 auto' }} />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <table className="bordered striped">
                                        <tbody>
                                            <tr>
                                                <td>Title</td>
                                                <td>
                                                    {showTitleInput ?
                                                        <input id="name" type="text" name="name" onBlur={toggleInput} onChange={e => changeData(e, 'title')} value={name}></input>
                                                        :
                                                        <strong onClick={() => toggleInput('title')}>{movie.name}</strong>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Year</td>
                                                <td>
                                                    {showYearInput ?
                                                        <input id="year" type="number" name="year" onBlur={toggleInput} onChange={e => changeData(e, 'year')} value={year}></input>
                                                        :
                                                        <strong onClick={() => toggleInput('year')}>{movie.year}</strong>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Director</td>
                                                <td>
                                                    {showDirectorInput ?
                                                        <input id="director" type="text" name="director" onBlur={toggleInput} onChange={e => changeData(e, 'director')} value={director}></input>
                                                        :
                                                        <strong onClick={() => toggleInput('director')}>{movie.director}</strong>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Rating</td>
                                                <td><StarRatings
                                                    rating={rating}
                                                    starRatedColor="#009688"
                                                    starHoverColor="orange"
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension='30px'
                                                    starSpacing='3px'
                                                    changeRating={changeRating}
                                                /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-action">
                                    <Link to="/">❮ Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ] : (
                <h4 className="center"><Loader /></h4>
            )}
        </div>
    );
}

export default PokemonsDetail;