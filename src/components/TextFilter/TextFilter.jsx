function TextFilter({ title = 'Hello' }) {
    return (
      <div>
        <h1>{title}</h1>
        <input type="text" data-testid="txtInp" />
        <span data-testid="txtSpn"></span>
      </div>
    )
  }
  
  export default TextFilter