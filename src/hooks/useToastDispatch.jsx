import { useToast } from "@chakra-ui/react";

export const useToastDispatch = () => {
  const toast = useToast();

  const sharedProperties = {
    duration: 4000,
    isClosable: true,
  };

  const dispatch = (action) => {
    switch (action.type) {
      case "event_edited":
        toast({
          title: "Event edited",
          description: `The event ${action.payload} has been edited!`,
          status: "success",
          ...sharedProperties,
        });
        break;
      case "event_created":
        toast({
          title: "Event edited",
          description: `The event ${action.payload} has been created!`,
          status: "success",
          ...sharedProperties,
        });
        break;
      case "event_deleted":
        toast({
          title: "Event deleted",
          description: `The event ${action.payload} has been deleted!`,
          status: "success",
          ...sharedProperties,
        });
        break;
    }
  };

  return dispatch;
};
