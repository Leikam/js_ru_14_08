import {createSelector} from 'reselect'

export const articlesSelector = state => state.articles
export const filtersSelector = state => state.filters
export const idSelector = (state, props) => props.id
export const commentsSelector = state => state.comments

export const filtratedArticlesSelector = createSelector(articlesSelector, filtersSelector, (articles, filters) => {
    console.log('---', 'recomputing filtrated articles')
    const {selected, dateRange: {from, to}} = filters

    /*
        в articles приходит результат из articlesSelector:
        выборка articles из store (полученная в свою очередь
        редюсером articles/articles.js) и лежат в замыкании
    */

    /*
        в selected приходит результат из filtersSelector,
        по тому же принципу, что и articles выше (reducer -> store),
        эта выборка articles из store и лежит здесь в замыкании
    */
    return articles.filter(article => {
        /* работаем с итератором по статьям, где по очереди передаются
        элементы массива articles */

        /* превращаем дату в из UTC формата в милисекунды от 01/01/1970 00:00
        * (для сравнения аналогично методу new Date(article.date), но скорее всего
        * будет работать быстрее, т.к. метод статичный и не создается объекта Date (возможно)
        * */
        const published = Date.parse(article.date)

        /*
        * 1 часть условия
        * !selected.length – если не выбрана ни 1 статья в селекте то
        * отдаем true (показываем все), или если что-то выбрано, то
        * проверяем selected.includes(article.id) - входит ли ID текущей
        * итерируемой статьи в массивы выбранных (selected)
        *
        * если первая часть так или иначе тру, то переходим ко второй
        *
        * 2 часть условия
        * !from - выбрана любая дата "ОТ даты", если не выбрана то отдаем
        * true (подходит статья с любой датой)
        * ИЛИ
        * !to - аналогичная проверка на "ДО даты", если не выбрана - результат true,
        * то не игнорируем прошлую проверку ОТ, отдаем все статьи, иначе говоря
        * принимаем только range, нельзя показать всес статьи только ОТ какого-то числа.
        * (в жизни, наверное, неудобно)
        * ИЛИ
        * если все прошлые провалились, тоесть у нас есть и ОТ и ДО даты, то проверяем
        * дату публикации: published > from && published < to на то, что она попадает в
        * диапазон выбранных дат
        * */


        /* Далее эта выбора используется в методе mapStateToProps компонента, фильтруя вывод */
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const createCommentSelector = () => createSelector(commentsSelector, idSelector, (comments, id) => {
    return comments[id]
})