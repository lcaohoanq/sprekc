import React, { useState } from 'react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import { omdbApi } from '../misc/OmdbApi'
import CompleteStep from './CompleteStep'
import FormStep from './FormStep'
import SearchStep from './SearchStep'
import { Navigate } from 'react-router-dom'
import { isAdmin } from '../misc/Helpers'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

function MovieWizard() {

  const [step, setStep] = useState(1)

  // Search Step
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Form Step
  const [imdbId, setImdbId] = useState('')
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [year, setYear] = useState('')
  const [poster, setPoster] = useState('')
  const [imdbIdError, setImdbIdError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [directorError, setDirectorError] = useState(false)
  const [yearError, setYearError] = useState(false)

  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  const handlePreviousStep = () => {
    if (step === 2) {
      setImdbIdError(false)
      setTitleError(false)
      setDirectorError(false)
      setYearError(false)
    }
    setStep(step > 1 ? step - 1 : step)
  }

  const handleNextStep = () => {
    if (step === 2 && !isValidForm()) {
      return
    }
    setStep(step < 3 ? step + 1 : step)
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'searchText') {
      setSearchText(value);
    } else if (id === 'imdbId') {
      setImdbId(value);
    } else if (id === 'title') {
      setTitle(value);
    } else if (id === 'director') {
      setDirector(value);
    } else if (id === 'year') {
      setYear(value);
    } else if (id === 'poster') {
      setPoster(value);
    }
  }

  const handleTableSelection = (movie) => {
    if (movie && selectedMovie && movie.imdbId === selectedMovie.imdbId) {
      setSelectedMovie(null)
      setImdbId('')
      setTitle('')
      setDirector('')
      setYear('')
      setPoster('')
    } else {
      setSelectedMovie(movie)
      setImdbId(movie.imdbId)
      setTitle(movie.title)
      setDirector(movie.director)
      setYear(movie.year)
      setPoster(movie.poster)
    }
  }

  const handleSearchMovies = async () => {
    try {
      setIsLoading(true)
      const response = await omdbApi.getMovies(searchText)
      let moviesArr = []
      const { Error } = response.data
      if (Error) {
        console.log(Error)
      } else {
        const movie = {
          imdbId: response.data.imdbID,
          title: response.data.Title,
          director: response.data.Director,
          year: response.data.Year,
          poster: response.data.Poster
        }
        moviesArr.push(movie)
      }
      setMovies(moviesArr)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateMovie = async () => {
    const movie = { imdbId, title, director, year, poster }
    try {
      await moviesApi.saveMovie(movie, keycloak.token)
      navigate("/home")
    } catch (error) {
      handleLogError(error)
    }
  }

  const isValidForm = () => {
    const imdbIdError = imdbId.trim() === ''
    const titleError = title.trim() === ''
    const directorError = director.trim() === ''
    const yearError = year.trim() === ''

    setImdbIdError(imdbIdError)
    setTitleError(titleError)
    setDirectorError(directorError)
    setYearError(yearError)

    return !(imdbIdError || titleError || directorError || yearError)
  }

  const getContent = () => {
    let stepContent = null
    if (step === 1) {
      stepContent = (
          <SearchStep
              searchText={searchText}
              isLoading={isLoading}
              movies={movies}
              selectedMovie={selectedMovie}
              handleChange={handleChange}
              handleSearchMovies={handleSearchMovies}
              handleTableSelection={handleTableSelection}
          />
      )
    } else if (step === 2) {
      stepContent = (
          <FormStep
              imdbId={imdbId}
              title={title}
              director={director}
              year={year}
              poster={poster}
              imdbIdError={imdbIdError}
              titleError={titleError}
              directorError={directorError}
              yearError={yearError}
              handleChange={handleChange}
          />
      )
    } else if (step === 3) {
      const movie = { imdbId, title, director, year, poster }
      stepContent = (
          <CompleteStep movie={movie} />
      )
    }

    return (
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 lg:w-1/4">
              <div className="stepper bg-white rounded-lg shadow-md p-4">
                <div className={`step ${step === 1 ? 'active' : ''}`}>
                  <span className="icon">&#128269;</span>
                  <div className="content">
                    <h3 className="title">Search</h3>
                    <p className="description">Search movie</p>
                  </div>
                </div>

                <div className={`step ${step === 2 ? 'active' : ''}`}>
                  <span className="icon">&#127909;</span>
                  <div className="content">
                    <h3 className="title">Movie</h3>
                    <p className="description">Movie Form</p>
                  </div>
                </div>

                <div className={`step ${step === 3 ? 'active' : ''}`}>
                  <span className="icon">&#127937;</span>
                  <div className="content">
                    <h3 className="title">Complete</h3>
                    <p className="description">Preview and complete</p>
                  </div>
                </div>
              </div>

              <div className="button-group mt-4">
                <button
                    className="btn btn-secondary w-full py-2"
                    disabled={step === 1}
                    onClick={handlePreviousStep}>Back</button>
                <button
                    className="btn btn-primary w-full py-2 mt-2"
                    disabled={step === 3}
                    onClick={handleNextStep}>Next</button>
              </div>

              {step === 3 && (
                  <>
                    <div className="divider my-4" />
                    <button
                        className="btn btn-blue w-full py-2"
                        onClick={handleCreateMovie}>Create</button>
                  </>
              )}
            </div>

            <div className="w-full md:w-3/4 lg:w-3/4">
              {stepContent}
            </div>
          </div>
        </div>
    )
  }

  return keycloak && keycloak.authenticated && isAdmin(keycloak) ? getContent() : <Navigate to='/' />
}

export default MovieWizard
