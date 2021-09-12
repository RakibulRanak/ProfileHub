import { Box, Flex, Heading, Text,Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ProjectEditModal from "./projectEditModal";

const ProjectEntry = ({ project }) => {
  const edit = useLocation().pathname.startsWith("/profile");

  return (
    <Box m={3}>
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Heading size="md"> <Link href = {`${project.link}`} isExternal>
          {project.projectname}</Link> {edit && <ProjectEditModal {...project} />}
        </Heading>
      </Flex>

      {project.start_date && (
        <>
          <Text display="inline">•</Text>
          <Text fontSize="sm" display="inline" ml={2}>
            {new Date(project.start_date).getFullYear()} -{" "}
            {project.end_date
              ? new Date(project.end_date).getFullYear()
              : "Present"}
          </Text>
        </>
      )}
      {project.description && (
        <Text borderLeft="2px solid #aaa" px={2} py={1} my={1} color="gray.600">
          {project.description}
        </Text>
      )}
    </Box>
  );
};

export default ProjectEntry;
