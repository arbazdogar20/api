import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
import axios from 'axios';

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTaget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
    };
    try {
      const res = await axios.post(
        'http://localhost:3001/user/register',
        payload
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    handleSubmit();
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="email"
            placeholder="Enter Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <span>Already Account</span>
      <br />
      <Button>Login</Button>
    </>
  );
}

export default App;
