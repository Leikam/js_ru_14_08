import React, {Component} from 'react'
import Article from './Article'
import accordion from '../decorators/accordion'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {filtratedArticlesSelector} from '../selectors'

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        //from accordion decorator
        openItemId: PropTypes.string,
        toggleOpenItem: PropTypes.func.isRequired
    }

    render() {
        console.log('---', 'rendering article list')
        const {openItemId, toggleOpenItem, articles} = this.props
        const articleElements = articles.map(article => {
            let {id} = article;
            return <li key={id}>
                <Article
                    article={article}
                    isOpen={id === openItemId || id === articles[0].id}
                    toggleOpen={toggleOpenItem(id)}
                />
            </li>
        });

        return (
            <ul>
                {articleElements}
            </ul>
        )
    }
}

export default connect(state => {
    console.log('---', 'connect')
    return {
        articles: filtratedArticlesSelector(state)
    }
})(accordion(ArticleList))