import { Container, Button, Modal, Form, Card, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState<{
    id: string;
    text: string;
  }[]>([])
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const onAddTodo = () => setShowAddTodoForm(true);
  const onSubmit = (text: string) => {
    setTodos([
      ...todos,
      {
        id: Math.random().toString(),
        text,
      }
    ])
  }
  const onDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  return (
    <>
      <Container
        className='mt-5 flex-column d-flex align-items-center'
      >
        <Col
          xs={8}
        >
          {
            todos.map(({ id, text }, index, arr) => (
              <Card 
                key={id}
                className={
                  index === arr.length - 1 ? '' : 'mb-3'
                }
              >
                <Card.Body
                  className='d-flex justify-content-between align-items-center'
                >
                  <div
                    className='border border-dark rounded p-2'
                  >
                    {text}
                  </div>
                  <Button
                    variant='danger'
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))
          }
          <Button
            onClick={onAddTodo}
            className="mt-3"
          >
            Add Todo
          </Button>
          <AddTodoForm
            show={showAddTodoForm}
            handleClose={() => setShowAddTodoForm(false)}
            onSubmit={onSubmit}
          />
        </Col>
      </Container>
    </>
  )
}

function AddTodoForm({
  show,
  handleClose,
  onSubmit
}: {
  show: boolean;
  handleClose: () => void;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState('');
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        Add new todo
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(text)
            setText('')
            handleClose()
          }
          }
        >
          <Form.Group
            controlId='todoText'
          >
            <Form.Label>
              Content
            </Form.Label>
            <Form.Control
              as='textarea'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Button
            type='submit'
            className='mt-3'
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default App
