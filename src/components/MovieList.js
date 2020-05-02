// Core
import React, { Component } from 'react';

class MovieList extends Component {
  render() {
    return (
      <div>
        <h2 className="display-4 mb-5">Movie Catalogue</h2>
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col mb-4">
            <div class="card h-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <img src="./poster.jpg" class="img-fluid rounded" alt="Image poster" />
                  </div>
                  <div className="col-8">
                    <h5 class="card-title">Lion King</h5>
                    <p class="card-text">After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.</p>
                    <div className="mb-2">
                      <span class="badge badge-primary mr-2">Adventure</span>
                      <span class="badge badge-secondary">Animation</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-warning mr-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </div>
          <div class="col mb-4">
            <div class="card h-100">
              <div className="row">
                <div className="col-4">
                  <img src="./poster.jpg" class="card-img-top" alt="Image poster" />
                </div>
                <div className="col-8">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col mb-4">
            <div class="card h-100">
              <div className="row">
                <div className="col-4">
                  <img src="./poster.jpg" class="card-img-top" alt="Image poster" />
                </div>
                <div className="col-8">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieList

