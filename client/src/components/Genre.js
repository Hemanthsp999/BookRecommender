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
      <table className="table table-stirped table-hoover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Types</th>
            <th> Available Books</th>
            <th> Ratings </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><Link to={"/action"}>Action</Link></td>
            <td>under progress</td>
            <td>null</td>
          </tr>
          <tr>
            <td>2</td>
            <td><Link to={"/comedy"}>Comedy</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>3</td>
            <td><Link to={"/fiction"}>Fiction</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>4</td>
            <td><Link to={"/narative"}>Narative</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>5</td>
            <td><Link to={"/thriller"}>Thriller</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>6</td>
            <td><Link to={"/crimeFiction"}>Crime Fiction</Link></td>
            <td>under progress</td>
            <td> null </td>
          </tr>
          <tr>
            <td>7</td>
            <td><Link to={"/fairyTale"}>Fairy Tale</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
          <tr>
            <td>8</td>
            <td><Link to={"/novel"}>Novel</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
          <tr>
            <td>9</td>
            <td><Link to={"/autoBiography"}>Auto Biography</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
          <tr>
            <td>10</td>
            <td><Link to={"/suspense"}>Suspense</Link></td>
            <td>Under progress</td>
            <td>null </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Genre;
