import ReactDOM from 'react-dom'
import MainContent from './element'
import Nav from './nav'
import Add from './add'
import './style.css'

function renderDOM(content, id) {
    ReactDOM.render(content, document.getElementById(id))
}

renderDOM(<Nav />, "nav")
renderDOM(<MainContent />, "root")
renderDOM(<Add />, "add")