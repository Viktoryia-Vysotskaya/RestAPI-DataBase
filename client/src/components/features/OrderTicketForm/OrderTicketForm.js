import { Button, Form, FormGroup, Label, Input, Row, Col, Alert, Progress } from 'reactstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSeatRequest, getRequests } from '../../../redux/seatsRedux';
import SeatChooser from './../SeatChooser/SeatChooser';
import './OrderTicketForm.scss';

const OrderTicketForm = () => {

  const dispatch = useDispatch();
  const requests = useSelector(getRequests);
  const [order, setOrder] = useState({
    client: '',
    email: '',
    day: 1,
    seat: ''
  });

  const [isError, setIsError] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const updateSeat = (e, seatId) => {
    e.preventDefault();
    setOrder({ ...order, seat: seatId });
  }

  const updateTextField = ({ target }) => {
    const { value, name } = target;
    setOrder({ ...order, [name]: value });
  }

  const updateNumberField = ({ target }) => {
    const { value, name } = target;
    setOrder({ ...order, [name]: parseInt(value) });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if (order.client && order.email && order.day && order.seat) {
      dispatch(addSeatRequest(order));
      setOrder({
        client: '',
        email: '',
        day: 1,
        seat: '',
      });
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  const updateCheckbox = () => {
    setIsAgreed(prevIsAgreed => !prevIsAgreed);
  };

  return (
    <Form className="order-ticket-form" onSubmit={submitForm}>
      <Row>
        <Col xs="12" md="6">
          {(isError) && <Alert color="warning">There are some errors in you form. <br />Have you fill all the fields? <br />Maybe you forgot to choose your seat?</Alert>}
          {(requests['ADD_SEAT'] && requests['ADD_SEAT'].error && !isError) && <Alert color="danger">{requests['ADD_SEAT'].error}</Alert>}
          {(requests['ADD_SEAT'] && requests['ADD_SEAT'].success && !isError) && <Alert color="success">You've booked your ticket! <br />Check you email in order to make a payment.</Alert>}
          {(requests['ADD_SEAT'] && requests['ADD_SEAT'].pending) && <Progress animated className="mb-5" color="primary" value={75} />}
          <FormGroup>
            <Label for="clientEmail">Name</Label>
            <Input type="text" value={order.client} name="client" onChange={updateTextField} id="clientName" placeholder="John Doe" />
          </FormGroup>
          <FormGroup>
            <Label for="clientEmail">Email</Label>
            <Input type="email" value={order.email} name="email" onChange={updateTextField} id="clientEmail" placeholder="johndoe@example.com" autoComplete="email" />
          </FormGroup>
          <FormGroup>
            <Label for="daySelect">Select which day of festivals are you interested in:</Label>
            <Input type="select" value={order.day} name="day" onChange={updateNumberField} id="daySelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
            <small id="dayHelp" className="form-text text-muted">Every day of the festival uses individual ticket. You can book only one ticket at the time.</small>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input id="agreementCheckbox" name="agreementCheckbox" required type="checkbox" checked={isAgreed} onChange={updateCheckbox} />
              I agree with <a href="/terms-and-conditions">Terms and conditions</a> and <a href="/privacy-policy">Privacy Policy</a>.
            </Label>
          </FormGroup>
          <Button color="primary" className="mt-3">Submit</Button>
        </Col>
        <Col xs="12" md="6">
          <SeatChooser
            chosenDay={order.day}
            chosenSeat={order.seat}
            updateSeat={updateSeat} />
        </Col>
      </Row>
    </Form>
  )
}

export default OrderTicketForm;