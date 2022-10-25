
function MyArticle(){
    const displayData = JSON.parse(localStorage.getItem("articleData"));
    console.log(displayData[0].title);
    return(
        <div>
            <h1>{displayData[0].title}</h1>
            <h2>{displayData[0].author}</h2>
            <p>{displayData[0].content}</p>
        </div>
    )
}

export default MyArticle;
