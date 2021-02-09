import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormTextInput from '../shared/forms/FormTextInput';
import FormDatePicker from '../shared/forms/FormDatePicker';
import FormErrorMessage from '../shared/forms/FormErrorMessage';
import FormLabel from '../shared/forms/FormLabel';
import FormFieldset from '../shared/forms/FormFieldset';
import BaseButton from '../shared/buttons/BaseButton';
import FormActions from '../shared/forms/FormActions';
import CheckIcon from '../icons/CheckIcon';
import Axios from 'axios';
import {
  DATE_FORMAT,
  DATE_REGEX,
  TIME_FORMAT,
  TIME_REGEX,
} from '../../helpers/calendar';
import FormTimePicker from '../shared/forms/FormTimePicker';
import ReminderColorPicker from './ReminderColorPicker';
import { ALL_COLORS } from '../../helpers/colors';
import { ReminderPropType } from '../shared/prop-types/reminder';
import ReminderForecastContainer from './forecast/ReminderForecastContainer';

const ReminderSchema = Yup.object().shape({
  description: Yup.string()
    .max(30, 'No more than 30 character, please.')
    .required('Please describe your reminder (max. 30 characters).'),
  color: Yup.string()
    .oneOf(ALL_COLORS, 'Color is invalid.')
    .required('Please inform a color.'),
  date: Yup.string()
    .matches(DATE_REGEX, `Date must be valid (${DATE_FORMAT}).`)
    .required('Please inform the day you want to get reminded.'),
  time: Yup.string()
    .matches(TIME_REGEX, `Time must be valid (${TIME_FORMAT}).`)
    .required('Please inform the time of the day you want to get reminded.'),
});

var essai = 0;

class ReminderForm extends Component {

  static propTypes = {
    reminder: ReminderPropType.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  /* state = {
     userCoMail: JSON.parse(localStorage.getItem('userCo')).Email
 }*/



  getInitialValues = () => {
    const { description, color, date, time, city, idUtilisateur } = this.props.reminder;

    return {
      description,
      color,
      date,
      time,
      city: city,
      idUtilisateur,
    };
  };


  handleSubmit = (values) => {



    let userCo = JSON.parse(localStorage.getItem('userCo'))
    console.log("status", userCo.id)

    var idUser = userCo.id


    if (essai == 0) {

       

        Axios.post('http://localhost:3000/getalerts',{"idUser":idUser} ).then((result) => {
          
        console.log("iduser1", idUser)

        console.log(result.data);
        

        result.data.forEach(element => {

          const data = {
            description: element.Message,
            color: "indigo-600",
            city: element.City,
            date: element.Date.split("T")[0],
            time: (element.Date.split("T", 5)[1]).split(":00.000Z")[0],
          }

          this.props.onSubmit(data);

          essai = 1;


        });


      });
    }


    const dataalerte = {

      id: this.props.reminder.id,
      description: values.description,
      color: values.color,
      city: values.city,
      date: values.date,
      time: values.time,
      idUtilisateur: idUser,

    }

    console.log(dataalerte)

    this.props.onSubmit(dataalerte);



    Axios.post('http://localhost:3000/insertalert/', dataalerte).then(
      res => {
        console.log(res)
      }

    )
  };


  render() {

    return (
      <Formik
        initialValues={this.getInitialValues()}
        validationSchema={ReminderSchema}
        onSubmit={this.handleSubmit}

      >
        <Form className="w-full flex flex-col gap-3" >
          <FormFieldset>
            <FormLabel htmlFor="description">
              What do you want to remember?
            </FormLabel>
            <div className="flex flex-row flex-wrap gap-2">
              <Field
                id="description"
                name="description"
                component={FormTextInput}
                placeholder="e.g.: Buy milk"
                className="flex-grow"
              /*onChange={this.handleChange} 
              value={this.state.description}*/

              />
              <Field
                id="color"
                name="color"
                as={ReminderColorPicker}
                className="flex-shrink"
              /*onChange={this.handleChange}
              value={this.state.color}*/

              />
            </div>
            <ErrorMessage component={FormErrorMessage} name="description" />
            <ErrorMessage component={FormErrorMessage} name="color" />
          </FormFieldset>

          <FormFieldset>
            <FormLabel htmlFor="date">When?</FormLabel>

            <div className="flex flex-row flex-wrap gap-2">
              <Field
                id="date"
                name="date"
                component={FormDatePicker}
                className="flex-grow"
              /*onChange={this.handleChange} 
              value={this.state.date}*/
              />
              <Field
                id="time"
                name="time"
                component={FormTimePicker}
                className="w-full sm:w-44"
              /*onChange={this.handleChange} 
              value={this.state.time}*/

              />
            </div>
            <ErrorMessage component={FormErrorMessage} name="date" />
            <ErrorMessage component={FormErrorMessage} name="time" />
          </FormFieldset>

          <FormFieldset>
            <FormLabel htmlFor="city">Where?</FormLabel>

            <Field
              id="city"
              name="city"
              component={FormTextInput}
              placeholder="e.g.: New York City"
            /*onChange={this.handleChange} 
            value={this.state.city}*/

            />
            <ErrorMessage component={FormErrorMessage} name="city" />
          </FormFieldset>

          <ReminderForecastContainer names={{ city: 'city', date: 'date' }} />

          <FormActions>
            <BaseButton
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-500 text-white"
            >
              <CheckIcon svgClassName="w-6 h-6" />
              Confirm
            </BaseButton>
          </FormActions>
        </Form>
      </Formik>
    );
  }
}

export default ReminderForm;
