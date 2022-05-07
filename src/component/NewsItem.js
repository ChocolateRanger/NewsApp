import React, { Component } from 'react'

export class NewsItem extends Component {



  render() {

    let { title, description, imageURL, newsURL } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "auto" }}>
          <img src={!imageURL?"https://yoga.ayush.gov.in/public/assets/front/news-events/default-img.jpg":imageURL} className="card-img-top" alt="icon" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div className='text-center'>
            <a href={newsURL} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default NewsItem