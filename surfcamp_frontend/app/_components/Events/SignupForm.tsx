"use client"
import TextInput from "@/app/_components/TextInput";
import {useState} from "react";
import axios from "axios";
import {allDataFilledIn} from "@/utils/validation.utils";
import {generateSignupPayload} from "@/utils/strapi.utils";

const SignupForm = ({headline, infoText, buttonLabel, pricing, eventId = null}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = generateSignupPayload(formData,eventId);

        if (allDataFilledIn(formData)){
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/participants`, payload);
                setShowConfirmation(true);
            } catch (e) {
                setErrorMessage(e.response?.data?.error?.message || "Something went wrong");
            }
        } else {
            setErrorMessage("Please fill out all fields");
        }
    }

  return <section className="signup-form">
      <div className="signup-form__info">
        <h3 className="signup-form__headline">{headline}</h3>
        {infoText}
      </div>
      {showConfirmation ? <div className={"signup-form__form"}>
          <h4>Thank you for signing up. We will get in touch soon!</h4>
      </div> : <form action="" className="sigup-form__form" onSubmit={onSubmit}>
          <div className="signup-form__name-container">
              <TextInput inputName={"firstName"} value={formData.firstName} onChange={onChange} label={"First Name"}/>
              <TextInput inputName={"lastName"} value={formData.lastName} onChange={onChange} label={"Last Name"}/>
          </div>
          <TextInput inputName={"email"} value={formData.email} onChange={onChange} label={"Email"}/>
          <TextInput inputName={"phoneNumber"} value={formData.phoneNumber} onChange={onChange} label={"Phone Number"}/>
          {errorMessage && (
              <p className={"copy signup-form__error"}>
                  {errorMessage}
              </p>
          )}
          <button className="btn btn--medium btn--turquoise helper"
                  type={"submit"}>{buttonLabel || "Stay in touch!"}</button>
          {pricing && (
              <div className={"signup-form__pricing"}>
                  <h3>Pricing</h3>
                  <p className={"copy"}>
                      Single room: <span className="bold">{pricing.singlePrice}€ per person</span>
                  </p>
                  <p className="copy">Shared room:
                      <span className="bold">{pricing.sharedPrice}€ per person
                      </span>
                  </p>
              </div>
          )}
      </form>}
  </section>
}

export default SignupForm;