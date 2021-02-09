import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import { MDBNotification,MDBNavLink } from "mdbreact";

const userData=JSON.parse(localStorage.getItem('userCo'))
// const user= localStorage.getItem('userCo').Prenom
// console.log(JSON.parse(userData))
const ListGroupPage = () => {
return (
<MDBContainer>
{/* <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="See? Just like this."
          text="just now"
          className="stylish-color-dark"
          titleClassName="elegant-color-dark white-text"
        />
        <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
          className="stylish-color-dark"
          titleClassName="elegant-color-dark white-text"
        /> */}
        <MDBNavLink to='/' >
        <MDBNotification
          show
          fade
          className="stylish-color-dark"
          iconClassName="text-primary"
          title="Bootstrap"
          message={userData.Prenom}
          text="just now"
        />
        </MDBNavLink>

        <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
        />
              <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
        />
              <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
        />
              <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
        />
              <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
        />
              <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
        />
              <MDBNotification
          show
          fade
          iconClassName="text-primary"
          title="Bootstrap"
          message="Heads up, toasts will stack automatically"
          text="2 seconds ago"
        />
</MDBContainer>
);
};

export default ListGroupPage;

// import React, { Component } from "react";
// import { MDBNotification, MDBContainer } from "mdbreact";

// class Notification extends Component {
//   render() {
//     return (
//       <MDBContainer
//         style={{
//           width: "auto",
//           position: "fixed",
//           top: "10px",
//           right: "10px",
//           zIndex: 9999
//         }}
//       >
//         <MDBNotification
//           show
//           fade
//           iconClassName="text-primary"
//           title="Bootstrap"
//           message="See? Just like this."
//           text="just now"
//         />
//         <MDBNotification
//           show
//           fade
//           iconClassName="text-primary"
//           title="Bootstrap"
//           message="Heads up, toasts will stack automatically"
//           text="2 seconds ago"
//         />
//       </MDBContainer>
//     );
//   }
// }

// export default Notification;