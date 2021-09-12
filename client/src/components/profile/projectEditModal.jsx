import {
    Button,
    FormControl,
    FormLabel,
    Icon,
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
  import { FaRegEdit } from "react-icons/fa";
  import { useHistory } from "react-router-dom";
  import { AuthContext } from "../../contexts/authContext";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  
  const ProjectEditModal = (project) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { unauthorizedHandler } = useContext(AuthContext);
    const [editedProject, setEditedProject] = useState({
      projectname: project.projectname,
      start_date: new Date(project.start_date),
      end_date: project.end_date
        ? new Date(project.end_date)
        : null,
      description: project.description,
      link: project.link,
    });
    const [requestState, setRequestState] = useState("none");
    const [deleteRequestState, setDeleteRequestState] = useState("none");
    const toast = useToast();
    const history = useHistory();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setRequestState("loading");
  
      axios
        .patch("/api/project/" + project.id, editedProject)
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
  
    const deleteItem = () => {
      setDeleteRequestState("loading");
      window.confirm("Are you sure?")
        ? axios
            .delete("/api/project/" + project.id)
            .then((res) => {
              setDeleteRequestState("success");
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
              setDeleteRequestState("error");
            })
        : setDeleteRequestState("none");
    };
  
    return (
      <>
        <Icon
          ml={2}
          onClick={onOpen}
          cursor="pointer"
          fontSize="xl"
          color="green.800"
          opacity="0.6"
          transition="ease 0.3s"
          _hover={{ opacity: 1 }}
          as={FaRegEdit}
        />
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Project</ModalHeader>
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
                    minDate={editedProject.start_date}
                    placeholderText="Not finished Yet!"
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
                <Button colorScheme="red" mr={3} onClick={deleteItem}>
                  {deleteRequestState === "loading" && <Spinner mr={1} />}Delete
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
  
  export default ProjectEditModal;
  