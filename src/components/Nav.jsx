
const Nav = () =>{
return(
    <div>
    <div className="btn-group dropleft float-right">
      <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        Dropstart
      </button>
      <ul className="dropdown-menu">
      </ul>
    </div>
    <div className="btn-group">
      <div className="btn-group dropstart" role="group">
        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
          <span className="visually-hidden">Toggle Dropstart</span>
        </button>
        <ul className="dropdown-menu">
{/* 
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
*/}
        </ul>
      </div>
      <button type="button" className="btn btn-secondary">Split dropstart</button>
    </div>
 </div>
)
}
export default Nav;
