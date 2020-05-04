// Core
import React, { Component } from 'react';
// import { useParams } from 'react-router-dom';

class EditMovie extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    // let { id } = useParams();
    // console.log(id);

    return (
      <div>
        <h3>Edit Movie component - {this.props.match.params.id}</h3>

        <form>

          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="inputEmail3" placeholder="Email" />
            </div>
          </div>

          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Synopsis</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="inputEmail3" placeholder="Email" />
            </div>
          </div>

          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Poster</label>
            <div class="col-sm-10">
              <img src="/poster.jpg" className="img-fluid w-25 rounded" />
              <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0" />
            </div>
          </div>

          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Genre(s)</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="inputEmail3" placeholder="Email" />
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-primary">Add Movie</button>
            </div>
          </div>

        </form>

      </div>
    )
  }
}

export default EditMovie

