import { useState } from 'react';
import s from '../Searchbar/Searchbar.module.css';

export function Searchbar ({onSubmit}) {
     const [value, setValue] = useState("");  
    const inputHandler = (e) => {
      setValue(e.target.value);
    };
    const submitHandler = (e) => {
      e.preventDefault();
      if (value.trim() === "") {
        alert("Write something")
        return
      };
        onSubmit(value);        
      setValue("");
    };
     return (
      <header className={s.searchbar}>
        <form className={s.form}>
          <button type="submit" className={s.button} onClick={submitHandler}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
                    type="text"
                    value={value}
                    onChange={inputHandler}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
};