import {
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { BlogPages } from "../src/utils/parse-properties";
import SideBar from "./Sidebar";
function Layout({
  children,
  blogData,
}: {
  children: React.ReactNode;
  blogData: BlogPages[];
}) {
  const bgColor = useColorModeValue("#D0D1D2", "#D0D1D2");
  const textColor = useColorModeValue("#FBFBFA", "#D0D1D2");
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <link href="xyz.com"></link>
      </Head>
      <Box position={"relative"} bg={bgColor} color={textColor}>
        <Flex flexDirection={{ base: "column", md: "row", lg: "row" }}>
          <Box
            fontFamily={"Nunito Sans"}
            position={"relative"}
            top={0}
            left={0}
            zIndex={1}
          >
            <SideBar blogData={blogData} />
          </Box>

          <Box h="100vh" overflowY="scroll" flex="1">
            {children}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Layout;
