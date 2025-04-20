import {http, HttpResponse} from "msw";

const movies = [
    {
        "imdbId": "tt0059742",
        "title": "The Sound of Music",
        "director": "Robert Wise",
        "year": "1965",
        "poster": "https://m.media-amazon.com/images/M/MV5BYWJhYmU4MjQtZDJhYi00ZGVjLTlkNTEtNzkzNGVjOWQ3MjcwXkEyXkFqcGc@._V1_SX300.jpg",
        "comments": [
            {
                "username": "admin",
                "avatar": "admin",
                "text": "good job",
                "timestamp": "2025-04-19T03:32:16.802078Z"
            }
        ]
    },
    {
        "imdbId": "tt0076759",
        "title": "Star Wars: Episode IV - A New Hope",
        "director": "George Lucas",
        "year": "1977",
        "poster": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_SX300.jpg",
        "comments": []
    },
    {
        "imdbId": "tt0106062",
        "title": "Matrix",
        "director": "N/A",
        "year": "1993",
        "poster": "https://m.media-amazon.com/images/M/MV5BM2JiZjU1NmQtNjg1Ni00NjA3LTk2MjMtNjYxMTgxODY0NjRhXkEyXkFqcGc@._V1_SX300.jpg",
        "comments": []
    },
    {
        "imdbId": "tt0120804",
        "title": "Resident Evil",
        "director": "Paul W.S. Anderson",
        "year": "2002",
        "poster": "https://m.media-amazon.com/images/M/MV5BN2Y2MTljNjMtMDRlNi00ZWNhLThmMWItYTlmZjYyZDk4NzYxXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg",
        "comments": [
            {
                "username": "user",
                "avatar": "user1351",
                "text": "good",
                "timestamp": "2025-04-18T10:33:01.490182Z"
            },
            {
                "username": "hoangdz1604@gmail.com",
                "avatar": "hoangdz1604@gmail.com8811",
                "text": "hay do",
                "timestamp": "2025-04-18T10:55:04.910295Z"
            },
            {
                "username": "user",
                "avatar": "user1351",
                "text": "good job",
                "timestamp": "2025-04-18T14:36:19.214600Z"
            }
        ]
    },
    {
        "imdbId": "tt0478970",
        "title": "Ant-Man",
        "director": "Peyton Reed",
        "year": "2015",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_SX300.jpg",
        "comments": []
    },
    {
        "imdbId": "tt0954542",
        "title": "Lauf um Dein Leben - Vom Junkie zum Ironman",
        "director": "Adnan Köse",
        "year": "2008",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzA3YjNjZDAtYWU2MC00YmIyLTkzMjEtOGE5YmIyZmYxODIzXkEyXkFqcGc@._V1_SX300.jpg",
        "comments": []
    },
    {
        "imdbId": "tt12278914",
        "title": "Trex",
        "director": "N/A",
        "year": "2019–",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTU2NjUyY2ItN2QzZi00YmFkLWFlMzUtZGEyMzk2M2E3ZTY2XkEyXkFqcGdeQXVyNDQxODUxMTg@._V1_SX300.jpg",
        "comments": []
    },
    {
        "imdbId": "tt1361319",
        "title": "Ish ty, maslenitsa!",
        "director": "Robert Sahakyants",
        "year": "1985",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjRkNTJjMWItYTQ4OS00NDIwLWI4NGYtMzcyYjJjOTQxOGM1XkEyXkFqcGc@._V1_SX300.jpg",
        "comments": []
    },
    {
        "imdbId": "tt1646208",
        "title": "HipHop Express",
        "director": "Adnan Köse",
        "year": "2010",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTM5OTE3NDQxN15BMl5BanBnXkFtZTgwOTAxNjAzMTE@._V1_SX300.jpg",
        "comments": []
    },
    {
        "imdbId": "tt5753856",
        "title": "Dark",
        "director": "N/A",
        "year": "2017–2020",
        "poster": "https://m.media-amazon.com/images/M/MV5BOWJjMGViY2UtNTAzNS00ZGFjLWFkNTMtMDBiMDMyZTM1NTY3XkEyXkFqcGc@._V1_SX300.jpg",
        "comments": []
    }
]

export const handleGetMovies = () => {
    return http.get("/api/movies", () => {
        return HttpResponse.json(movies)
    })
}
