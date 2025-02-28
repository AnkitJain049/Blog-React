import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [author,setAuthor]=useState('Ankit');
    const history=useHistory();

    const handleSubmit= (e) => {
        e.preventDefault();
        const blog={title,body,author};

        fetch('http://localhost:8000/blogs',{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            history.push("/");
            console.log("New Blog Added")

        })
    }

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)}></input>

                <label>Blog Body:</label>
                <textarea required value={body} onChange={(e)=>setBody(e.target.value)}></textarea>

                <label>Blog Author:</label>
                <select value={author} onChange={(e)=>setAuthor(e.target.value)} >
                    <option value="Ankit">Ankit</option>
                    <option value="Mario">Mario</option>
                </select>

                <button>Add blog</button>
                {/* <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p> */}
            </form>
        </div>
     );
}

export default Create;