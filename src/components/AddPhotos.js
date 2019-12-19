import React, {Component} from 'react'
import Swal from '../helpers/Swal'

export default class AddPhotos extends Component {

    constructor(props) {
        super(props)

        this.inputRef = React.createRef()        
        this.selectImage = this.selectImage.bind(this)

        this.state = {
            imagesElement: [],
            photos: []
        }
    }
    
    componentDidMount() {
        if(this.props.edit === true) {
            this.setState({photos: this.props.photos})
            this.renderImage(this.props.photos)
        }
    }

    removeImage = (index) => {          
        Swal.confirm({title: 'Hapus foto?', icon: 'question', confirmText: 'Ya, hapus'}, () => {
            let photos = [...this.state.photos]
        
            photos.splice(index, 1)
            this.setState({photos})        
            this.renderImage(photos)
            this.props.sendToParent(photos) //SEND PHOTOS TO PARENT COMPONENT
        })
    }

    selectImage() {
        this.inputRef.current.click()
    }

    renderImage(photos) {        
        let imagesElement = this.state.imagesElement.slice()
        imagesElement = photos.map((photo, index) => {
            return (
                <div style={{position:'relative'}} key={index}>
                    <img       
                        alt={index}                      
                        width="80px" 
                        height="80px"                              
                        className="mr-2 my-2 rounded-lg" 
                        src={photo.src}></img>
                    <i 
                    onClick={() => this.removeImage(index)}
                    className="material-icons rounded-lg pointer text-white border border-light" 
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        boxShadow: '0px 1px 2px rgba(0,0,0,0.5)'
                    }}>close</i>
                </div>
            )
        })
        this.setState({imagesElement})
    }

    showImage = (ev) => {
        if(!ev.target.value) return false;
        let self = this
        let reader = new FileReader()
        reader.onload = function(e) {
            let photos = self.state.photos.slice()            
            
            photos.push({
                src: e.target.result
            })
            self.setState({photos})
            
            self.renderImage(photos)
            self.props.sendToParent(photos) //SEND PHOTOS TO PARENT COMPONENT
        }
        reader.readAsDataURL(ev.target.files[0])
        ev.target.value = ''
    }

    render() {
        return (
            <div>
                <input type="file" style={{display:'none'}} ref={this.inputRef} onChange={this.showImage} />
                <button onClick={() => this.selectImage()} className="btn btn-outline-primary btn-sm d-flex align-items-center">
                    <i className="material-icons">add_circle_outline</i>
                </button>
                <div className="d-flex align-items-center flex-wrap">                    
                    {this.state.imagesElement}
                </div>
            </div>
        )
    }
}