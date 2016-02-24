import React, { Component, PropTypes } from 'react'
import Page from '../../layouts/Page'
import _ from 'lodash'
import PostItem from './PostItem'
import { Link } from 'react-router'
import styles from './HomePage.scss'

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired
  };

  get collection () {
    let value = this.context.collection
    value = value.filter((t) => t.layout === 'Post')
    value = _.uniqBy(value, '__url')
    value = _.orderBy(value, ['date'], ['desc'])
    // Exclude draft in production build
    if (process.env.NODE_ENV === 'production') {
      value = value.filter((t) => t.draft === undefined)
    }

    return value
      .slice(0, 10)
      .map(PostItem)
  }

  render () {
    const {
      collection
    } = this.context

    return (
      <Page
        head={{
          title: 'Trang chủ'
        }}
        __url='/'
        className='col-sm-12 col-md-10'
      >
        <p className={styles.latestPosts}>Bài viết mới nhất</p>
        {
          Boolean(!collection || !collection.length) &&
            <p>No entry</p>
        }
        {
          Boolean(collection && collection.length) &&
            <div className='container'>
              <div className='row'>
                {this.collection}
              </div>
            </div>
        }
        <Link
          className={styles.all}
          to='/archive'
        >
          Bài viết cũ hơn
        </Link>
      </Page>
    )
  }
}