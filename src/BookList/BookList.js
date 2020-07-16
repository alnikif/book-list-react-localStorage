import React, { Component } from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import styles from './BookList.module.css';

//<i className="fa fa-star" aria-hidden={true}></i> black
//<i className="fa fa-star-half" aria-hidden={true}></i> 50%
//<i className="fa fa-star-o" aria-hidden={true}></i> white




class BookList extends Component {
    constructor(props){
        super(props);
        this.state={
            book:'',
            autor:'',
            books:JSON.parse(localStorage.getItem('books')) || [],
            raiting:''
        }
    }
    handleChangeBook=e=>{
        this.setState({
            book:e.target.value
        })
    }
    handleChangeAutor=e=>{
        this.setState({
            autor:e.target.value
        })
    }
    handleClick=e=>{
        e.preventDefault();

        this.state.books.push({autor:this.state.autor, book:this.state.book, raiting:this.state.raiting})
        localStorage.setItem('books', JSON.stringify(this.state.books) )
        console.log(this.state.books)
        this.setState({
            autor:'',
            book:''
           
        })
        console.log(this.state.starsClass)

        
    }
    handleChangeRaiting=e=>{

        // let isValid=e.target.value<6 && e.target.value>=0;
        // let validNumber=isValid ? e.target.value : 0;
         this.setState({
            raiting:e.target.value
        })
    }
    handleRemoveClick=el=>{
        const arrayBooks=this.state.books
        const item= arrayBooks.indexOf(el)
        if(item>-1){
           arrayBooks.splice(item,1)
           this.setState({
               books:arrayBooks

           })
           localStorage.setItem('books', JSON.stringify(arrayBooks))
           if(!arrayBooks.length) localStorage.removeItem('books')
       }
    }
    render() {
       const calculateStars=raiting=>{
            const fullStars= Array.from({length:raiting}, (v,i)=>i).map((el,i)=>{
                return <i className="fa fa-star" key={i} aria-hidden={true}></i>
            })
            console.log(fullStars)
            const emptyStars = Array.from({length: 5 - raiting}, (v, i)=>i).map((el, i)=>{
                return <i className="fa fa-star-o" key={i} aria-hidden={true}></i>
            })
        return <span> {fullStars} {emptyStars}</span> ;
        }
        return (
            <div className='container'>
                
                 <form action="">
                     
                    <input className={styles.inpt} type="text" placeholder='Autor' onChange={this.handleChangeAutor} value={this.state.autor}/><br/>
                    <input className='inpt' type="text" placeholder='Książka' onChange={this.handleChangeBook} value={this.state.book}/><br/>
                    <select name="raiting" id="select" onChange={this.handleChangeRaiting} value={this.state.raiting}>
                        {Array.from({length:6}, (v,i)=>i).map((el,i)=>{
                            return <option value={el} key={i}>{el}</option>
                        })}
                    </select>
                    {/* <input className='inptRaiting' placeholder='raiting' type="number" max={5} onChange={this.handleChangeRaiting} value={this.state.raiting}/><br/> */}
                    <input className='btn' type="submit" value='Dodaj' onClick={this.handleClick}/>
                </form>
                <div className='list'>
                    {this.state.books.length?<h3 className={styles.header}>Lista ulubionych książek</h3>: null} 
                    <ul>
                        {this.state.books.map((el,i)=><li className={styles.listItem} key={i}> book {el.book}, autor {el.autor} raiting {calculateStars(el.raiting)}   <i className={styles.star} className="fa fa-window-close" aria-hidden={true} onClick={e=>this.handleRemoveClick(el)}></i> </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
export default BookList;