import { useLocation } from 'react-router';

function Login() {
  const location = useLocation();
  const response = location.state?.response;

  return (
    <>
      <div>Hello People</div>
      <div>{JSON.stringify(response)}</div>
    </>
  );
}

export { Login };
