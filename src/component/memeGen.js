import { render } from '@testing-library/react'
import React , {Component} from 'react'

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = { 
            topText: '',
            bottomText: '',
            displayImg: 'http://i.imgflip.com/1bij.jpg',
            randomImg: []
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                const {memes} = data.data
                this.setState({
                    randomImg: memes
                })
            })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        // random number to random [i].url
        const randNum = Math.floor(Math.random() * this.state.randomImg.length)
        const randImg = this.state.randomImg[randNum].url
        this.setState({
            displayImg: randImg
        })
    }

    render() {
        return(
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input
                        type='text' 
                        placeholder='Top Text'
                        name='topText'
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />

                    <input
                        type='text' 
                        placeholder='Bottom Text'
                        name='bottomText'
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div class='meme'>
                    <img src={this.state.displayImg} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
    
        )
    }
}

export default MemeGenerator

// fetch https://api.imgflip.com/get_memes
// http://i.imgflip.com/1bij.jpg
// form className='meme-form'
// <h2 className='top' // bottom