import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "./../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title").min(5),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number in Stock")
      .min(0)
      .max(24),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily Renatal Rate")
      .min(0)
      .max(10),
  };

  async populateGenres() {
    const genres = await getGenres();
    this.setState({ genres });
 
  }

  async populateMovie() {
     const movieId = this.props.match.params.id;
     if (movieId === "new") return;

     try {
       const  movie = await getMovie(movieId);
       this.setState({ data: this.mapToViewModel(movie) });
     } catch(err){
       if (err && err.status === 404) {
         toast.error(err.responseText);
        this.props.history.replace("/not-found");
       }
     }
  }

  componentDidMount() {
    this.populateGenres();

    this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
    } catch (err) {
      if (err && err.status === 400) {
        toast('Login to edit a movie')
      }
    }
    
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
