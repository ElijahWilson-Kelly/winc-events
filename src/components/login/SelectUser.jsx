import { useContext } from "react";
import { Heading, Center, Flex, Stack, Image, Box } from "@chakra-ui/react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { BsPersonCircle } from "react-icons/bs";

export const SelectUser = ({ users, newUser, setNewUser }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  let styles = {};
  if (newUser) {
    styles = {
      transform: "translateX(-1000px)",
      opacity: 0,
    };
  }

  const getNewUserId = () => {
    let id = 1;
    for (const user of users) {
      if (user.id >= id) {
        id = user.id + 1;
      }
    }
    return id;
  };

  return (
    <Center className="change-user-panel" style={styles}>
      <Stack gap={10}>
        <Heading color="white" textAlign="center" fontWeight={200}>
          Select User
        </Heading>
        <Box maxWidth={[300, 800]} position={"relative"}>
          <Flex
            gap={10}
            overflowX={"scroll"}
            p={"50px"}
            style={{
              scrollbarColor: "rebeccapurple green",
              scrollbarWidth: "thin",
            }}
          >
            {users.map((user) => {
              const isCurrentUser = user.id === currentUser?.id;
              return (
                <Flex direction="column" align="center" key={user.id} gap={4}>
                  <Heading size="sml" fontWeight={100}>
                    {user.name}
                  </Heading>
                  <Image
                    className={`select-user-image ${
                      isCurrentUser && "current-user"
                    }`}
                    src={user.image}
                    borderRadius="full"
                    w={"150px"}
                    minW={"150px"}
                    h={"150px"}
                    _hover={{
                      transform: "translateY(-10px)",
                      opacity: "0.4",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setNewUser(user);
                    }}
                  />
                </Flex>
              );
            })}
            <Flex direction="column" align="center" gap={4}>
              <Heading size="sml" fontWeight={100}>
                New User
              </Heading>
              <Center
                borderRadius="full"
                w={"150px"}
                minW={"150px"}
                h={"150px"}
                border="3px solid white"
                _hover={{
                  transform: "translateY(-10px)",
                  opacity: "0.4",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setNewUser({ id: getNewUserId() });
                }}
              >
                <BsPersonCircle fontSize={"8rem"} />
              </Center>
            </Flex>
          </Flex>
        </Box>
      </Stack>
    </Center>
  );
};
