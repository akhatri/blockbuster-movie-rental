// Core
import React, { Component } from 'react';

// Services
import axios from 'axios';

class AddMovie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      synopsis: '',
      poster: 'https://via.placeholder.com/200/',
      genres: [],
    }

    // Event binding
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.submitMovie = this.submitMovie.bind(this);

   
  }

  // Click events
  //-------------

  handleImageUpload(e) {

    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.setState({
        poster: reader.result
      })
    }

    reader.onerror = ()=> {
      console.log(reader.error);
    };

  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    })

    if (name === 'genres') {

      // convert to array
      let genres = value.split(',');

      this.setState({
        [name]: genres
      })  
    }


  }

  async submitMovie(e) {
    e.preventDefault();

    const movie = {
      title: this.state.title,
      synopsis: this.state.synopsis,
      poster: this.state.poster,
      genres: this.state.genres
    }

    try {

      let response = await axios.post('http://localhost:5000/movies/add', movie)
      console.log(response);      

    } catch (err) {

      console.log(err)

    }

    window.location.href = '/';

  }  


  render() {
    return (
      <div>
        <h2 className="display-4 mb-5">Add to Movie Catalogue</h2>
        <form onSubmit={this.submitMovie}>

          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="title" placeholder="Enter a title" value={this.state.title}  onChange={this.handleInputChange} required />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="synopsis" className="col-sm-2 col-form-label">Synopsis</label>
            <div className="col-sm-10">
              <textarea className="form-control" name="synopsis" placeholder="Enter a description" value={this.state.synopsis} onChange={this.handleInputChange} required></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="poster" className="col-sm-2 col-form-label">Poster</label>
            <div className="col-sm-10">
              <img src={this.state.poster} alt="Movie poster" className="img-fluid w-25 rounded" />
              <span className="mx-4 text-muted">Please ensure file size is less than 300KB</span>
              <input id="upload" type="file" className="form-control border-0 px-0" onChange={this.handleImageUpload} required/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="genres" className="col-sm-2 col-form-label">Genre(s)</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="genres" placeholder="Genre(s)" value={this.state.genres} onChange={this.handleInputChange} required/>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-lg btn-primary">Add Movie</button>
            </div>
          </div>

        </form>

      </div>
    )
  }
}

export default AddMovie

