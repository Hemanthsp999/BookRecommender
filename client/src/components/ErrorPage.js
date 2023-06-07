const ErrorPage = () => {
  return(
  <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Oops!</h1>
          <p>Something went wrong{Error.message}</p>
        </div>
      </div>
  </div>
  );
}

export default ErrorPage;
