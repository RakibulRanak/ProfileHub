import { Box, Heading, Icon } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";
import ProjectEntry from "./projectEntry";

const Project = ({ project }) => {
  return (
    <Box w="100%" bg="white" borderRadius="md" boxShadow="xl" p={3} mb={4}>
      <Heading size="md" color="teal.800">
        <Icon as={FaBook} mr={2} />
        Project
      </Heading>

      {project.map((edu) => (
        <ProjectEntry key={edu.id} project={edu} />
      ))}
    </Box>
  );
};

export default Project;
