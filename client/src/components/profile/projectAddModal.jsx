import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useContext, useState } from "react";
  import { useHistory } from "react-router-dom";
  import { AuthContext } from "../../contexts/authContext";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { AddIcon } from "@chakra-ui/icons";
  
  const ProjectAddModal = (project) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { unauthorizedHandler } = useContext(AuthContext);
    const [editedProject, setEditedProject] = useState({
      projectname: "",
      start_date: new Date(),
      end_date: null,
      description: "",
      link: "",
    });
    const [requestState, setRequestState] = useState("none");
    const toast = useToast();
    const history = useHistory();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setRequestState("loading");
  
      axios
        .post("/api/project/", editedProject)
        .then((res) => {
          setRequestState("success");
          onClose();
          history.go(0);
        })
        .catch((err) => {
          unauthorizedHandler(err);
          onClose();
          toast({
            title: "Something Went Wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setRequestState("error");
        });
    };
  
    return (
      <>
        <Button mx={1} onClick={onOpen} size="sm" colorScheme="green">
          <AddIcon mr={1} /> Project
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Project</ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <FormControl mb={2} id="projectname">
                  <FormLabel>Project Name</FormLabel>
                  <Input
                    type="text"
                    value={editedProject.projectname}
                    onChange={(e) =>
                      setEditedProject({
                        ...editedProject,
                        projectname: e.target.value,
                      })
                    }
                  />
                </FormControl>
  
               
  
                <FormControl mb={2} id="link">
                  <FormLabel>Link</FormLabel>
                  <Input
                    type="text"
                    value={editedProject.link}
                    onChange={(e) =>
                      setEditedProject({
                        ...editedProject,
                        link: e.target.value,
                      })
                    }
                  />
                </FormControl>
  
                <FormControl mb={2} id="description">
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    value={editedProject.description}
                    onChange={(e) =>
                      setEditedProject({
                        ...editedProject,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
  
                <FormControl mb={2} id="start_date">
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    as={DatePicker}
                    selected={editedProject.start_date}
                    onChange={(date) =>
                      setEditedProject({
                        ...editedProject,
                        start_date: date,
                      })
                    }
                  />
                </FormControl>
  
                <FormControl mb={2} id="end_date">
                  <FormLabel>End Date</FormLabel>
                  <Input
                    as={DatePicker}
                    selected={editedProject.end_date}
                    isClearable
                    minDate={editedProject.end_date}
                    placeholderText="Not finished Yet"
                    onChange={(date) =>
                      setEditedProject({
                        ...editedProject,
                        end_date: date,
                      })
                    }
                  />
                </FormControl>
              </ModalBody>
  
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" colorScheme="green" bg="green.500">
                  {requestState === "loading" && <Spinner mr={1} />}Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ProjectAddModal;
  