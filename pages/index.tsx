import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import { NotionRenderer } from 'react-notion-x'
import BlogLayout from '../components/blog/BlogLayout'
import {  NotionPageHeader } from '../components/blog/Header'
import HomePage from '../components/blog/Homepage'
import Page404 from '../components/fallback/Page404'
import PageHead from '../components/seo/PageHead'
import { getRecordDataForPage, queryDatabase } from '../src/api/query-database'
import { BlogPages, parseProperties } from '../src/utils/parse-properties'

const Home = ({
  recordMap,
  blogData,
}: {
  recordMap: ExtendedRecordMap
  blogData: BlogPages[]
}) => {
  if (recordMap === null) {
    return <Page404 />
  }

  return (
    <div>
      {/* <PageHead blogData={blogData} recordMap={recordMap} />
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        showTableOfContents={true}
        disableHeader={true}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
        
      /> */}
      <Box w="100%" h="100vh" bg="#040F03">
        <HomePage blogData={blogData} />
      </Box>
    </div>
  );
}



export default Home

export async function getServerSideProps() {
  const database = await queryDatabase()
  const blogData = parseProperties(database!)

  const recordMap = await getRecordDataForPage(
    process.env.NOTION_ROOT_PAGE_ID
      ? process.env.NOTION_ROOT_PAGE_ID
      : '9f83939fc49b41378b18f6a63338a136',
  )

  return {
    props: {
      blogData,
      recordMap: recordMap ? recordMap : null,
    },
  }
}
