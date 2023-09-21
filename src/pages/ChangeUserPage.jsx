import PropTypes from "prop-types";
import { useState } from "react";

import { Center, Box } from "@chakra-ui/react";

import { SelectUser } from "../components/login/SelectUser";
import { NewUserDetails } from "../components/login/NewUserDetails";
import { Passcode } from "../components/login/Passcode";
import { useNavigate, useOutletContext } from "react-router-dom";

export const ChangeUserPage = () => {
  const [newUser, setNewUser] = useState(null);
  const navigate = useNavigate();
  const {
    data: { users },
  } = useOutletContext();

  const returnToHomePage = () => {
    navigate("/");
  };

  return (
    <Center
      bg={"#170826F5"}
      position="absolute"
      top={0}
      bottom={0}
      w={"100vw"}
      h={"100vh"}
    >
      <Center display="flex" justifyContent="center" alignItems="center">
        <Center color="white" overflow={"hidden"}>
          <Box display="grid" w={"800px"} h={"400px"}>
            <SelectUser
              users={users}
              newUser={newUser}
              setNewUser={setNewUser}
            />
            <NewUserDetails newUser={newUser} setNewUser={setNewUser} />
            <Passcode newUser={newUser} returnToHomePage={returnToHomePage} />
          </Box>
        </Center>
      </Center>
    </Center>
  );
};

// ChangeUserPage.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   allUsers: PropTypes.arrayOf(
//     PropTypes.exact({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//     })
//   ),
//   currentUser: PropTypes.exact({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     image: PropTypes.string,
//   }),
//   setCurrentUser: PropTypes.func.isRequired,
// };
