import { Icon } from "@chakra-ui/icons";
import { Box, Center, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import {
  FaFacebookSquare,
  FaYoutubeSquare,
  FaGithubSquare,
} from "react-icons/fa";

const Footer = (props) => {
  return (
    <Box w="100%" bg="gray.800" color="gray.50">
      <Center>
        <Flex
          maxW={800}
          direction={["column", "column", "row"]}
          textAlign={["center", "center", "left"]}
          mt={4}
        >
          <Box p={3} m={2}>
            <Text fontSize="lg">ProfileHub</Text>
            <Text fontSize="sm">
              A simple webtech project
            </Text>
          </Box>
          <Spacer />
          <Box p={3} m={2} minW={200}>
            <Text fontSize="md">All rights reserved : <br></br>@RakibulRanak</Text>
            
          </Box>
          <HStack fontSize="2xl">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/ranak127/"
              >
                <Icon
                  as={FaFacebookSquare}
                  transition="ease 0.3s"
                  color="blue.500"
                  _hover={{ color: "blue.700" }}
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/channel/UCSKiSL-pCCqzIaaUECusI9g"
              >
                <Icon
                  as={FaYoutubeSquare}
                  transition="ease 0.3s"
                  color="red.500"
                  _hover={{ color: "red.700" }}
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/RakibulRanak"
              >
                <Icon
                  as={FaGithubSquare}
                  transition="ease 0.3s"
                  color="white"
                  _hover={{ color: "gray.400" }}
                />
              </a>
            </HStack>
        </Flex>
      </Center>

      <br />
      <hr style={{ backgroundColor: "white", margin: "0px 50px 20px 50px" }} />
      <Center px={2} pb={4}>
        <Text fontSize="sm" opacity="50%">
          This project is under construction
        </Text>
      </Center>
    </Box>
  );
};

export default Footer;
