import React, { Component } from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import styles from './BookList.module.css';


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
        return <span className={styles.star}> {fullStars} {emptyStars}</span> ;
        }
        return (
            <>
                <div className={styles.container}>
                    
                    <form action="">
                        
                        <input className={styles.inpt} type="text" placeholder='Autor' onChange={this.handleChangeAutor} value={this.state.autor}/><br/>
                        <input className={styles.inpt} type="text" placeholder='Książka' onChange={this.handleChangeBook} value={this.state.book}/><br/>
                        <p className={styles.pRaiting}>Raiting</p>
                        <select className={styles.select} name="raiting" id="select" onChange={this.handleChangeRaiting} value={this.state.raiting}>
                            {Array.from({length:6}, (v,i)=>i).map((el,i)=>{
                                return <option value={el} key={i}>{el}</option>
                            })}
                        </select><br/>
                        <input className={styles.btn} type="submit" value='Dodaj' onClick={this.handleClick}/>
                    </form>
                </div>
                <div className={styles.list}>
                    {this.state.books.length?<h3 className={styles.header}>Lista ulubionych książek</h3>: null} 
                    <ul>
                        {this.state.books.map((el,i)=><li className={styles.listItem} key={i}>{i+1}. {el.book}, {el.autor} {calculateStars(el.raiting)}  <span className={styles.close}> <i  className="fa fa-window-close" aria-hidden={true} onClick={e=>this.handleRemoveClick(el)}></i></span> </li>)}
                    </ul>
            </div>
        </>
        )
    }
}
export default BookList;