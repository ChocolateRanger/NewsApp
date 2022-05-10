import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    pageSize: 6,
    category:"General"
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
    
  }

  

  constructor() {
    super();
    console.log("This is a constructor from News.js")
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults: 0
    }
  }

  async updatePage(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cda03860184d4e7989712e1e28ba1d8c&page=${this.state.page}pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      loading: false
     })

  }

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cda03860184d4e7989712e1e28ba1d8c&&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      loading: false
     })
  }


  fetchMoreData=async ()=>{
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cda03860184d4e7989712e1e28ba1d8c&page=${this.state.page}pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      loading: false
     })
  }


  // handlePrevClick = async () => {
  //   console.log("Previous")

  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cda03860184d4e7989712e1e28ba1d8c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parseddata = await data.json();
  //   this.setState({
  //     articles: parseddata.articles,
  //     loading: false,
  //     page: this.state.page - 1,
  //     totalResults: parseddata.totalResults
  //   })
  // }


  // handleNextClick = async () => {
  //   console.log("Next")
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cda03860184d4e7989712e1e28ba1d8c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parseddata = await data.json();
  //   console.log(parseddata);
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parseddata.articles,
  //     loading: false
  //   })
  // }




  render() {


    return (


      <div >
        <div className='container text-center'>
          <h1> Today's Top Headlines</h1>
        </div>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
        {this.setState.loading && <Spinner/>}
        <div className='row mx-2'>
          {this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url} >
              <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} newsURL={element.url} />
            </div>
          })}
        </div>
      </InfiniteScroll>
                 
          {/* <div className='d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr;Previous</button>
            <button type="button" onClick={this.handleNextClick} className="btn btn-dark">Next&rarr;</button>
          </div> */}
      </div>
    );
  }
}
