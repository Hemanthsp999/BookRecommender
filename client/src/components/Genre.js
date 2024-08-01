import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Genre = () => {
  const [item, setItem] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOption = {
      method: "GET",
      headers: headers,
    };
    fetch("http://localhost:8080/genres", requestOption)
      .then((response) => response.json())
      .then(function (data) {
        setItem(data);
      })
      .catch((e) => console.log(e));

    let dat = [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 2,
        name: "Comedy",
      },
    ];
    setItem(dat);
  }, []);

  return (
    <div>
      <h3 className="text-center">Genre</h3>
      <table className="table table-stirped table-hoover" >
        <thead >
          <tr>
            <th>No.</th>
            <th>Types</th>
            <th> Available Books</th>
            <th> Ratings </th>
          </tr>
        </thead>
        <tbody >
          <tr >
            <td>1</td>
            <td><Link to={"/action"} style={{textDecoration: "none"}}>Action</Link></td>
            <td>under progress</td>
            <td>null</td>
          </tr>
          <tr>
            <td>2</td>
            <td><Link to={"/comedy"} style={{textDecoration: "none"}}>Comedy</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>3</td>
            <td><Link to={"/fiction"} style={{textDecoration: "none"}}>Fiction</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>4</td>
            <td><Link to={"/narative"} style={{textDecoration: "none"}}>Narative</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>5</td>
            <td><Link to={"/thriller"} style={{textDecoration: "none"}}>Thriller</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>6</td>
            <td><Link to={"/crimeFiction"} style={{textDecoration: "none"}}>Crime Fiction</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>7</td>
            <td><Link to={"/fairyTale"} style={{textDecoration: "none"}}>Fairy Tale</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
          <tr>
            <td>8</td>
            <td><Link to={"/novel"} style={{textDecoration: "none"}}>Novel</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
          <tr>
            <td>9</td>
            <td><Link to={"/autoBiography"} style={{textDecoration: "none"}}>Auto Biography</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
          <tr>
            <td>10</td>
            <td><Link to={"/suspense"} style={{textDecoration: "none"}}>Suspense</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Genre;
