import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Box, Heading, Tag, Container, Text, Button, Stack, UnorderedList, ListItem , Tabs, TabList, TabPanels, Tab, TabPanel  } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'


const EventDetails = () => {
         const details = useLocation();
         const {description, end_time, event_type, id, name, permission,
            private_url, public_url, related_events, speakers, start_time, allEvents, isHacker} = details.state;
         const related_events_info = allEvents.filter(event => {return related_events.includes(event.id)})
         console.log(allEvents)
         console.log(related_events_info)
        
    return (
        <div style={{background: "#E7F6FC", height:'100vh', width:'100vw'}}>
            <br/>
            <Box bg="rgb(29, 76, 130)" margin='0 2%' borderRadius={'md'}>
                <Container padding={'2%'}>
            <Heading fontSize={'45px'} color={'white'}>{name}</Heading>
            <Tag size={'lg'} variant='solid' colorScheme='teal'>
      {event_type.replace('_', ' ').toUpperCase()}
    </Tag>
    <Text color={'white'} fontWeight='600' margin={'5% 0'}>
        {description}
    </Text>
    <Button variant='solid' bg={'#FF0000'} color={'white'} rightIcon={<ExternalLinkIcon />} _hover><a href={public_url}>YouTube</a></Button>
    {isHacker && <Button variant='solid' ml={'20px'} bg={'#0a54cc'} color={'white'} rightIcon={<ExternalLinkIcon />}><a href={private_url}>Hopin</a></Button>}
    </Container>
            </Box>
            <Container>

            <Tabs align="center" margin='40px 0'>
  <TabList>
    <Tab>Event Period</Tab>
    <Tab>Speakers</Tab>
    <Tab>Related Events</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <Box>
                
                <UnorderedList listStyleType='none'>
  <ListItem>{`Starts: ${new Date(start_time * 1000).toUTCString()}`}</ListItem>
  <ListItem>{`Ends: ${new Date(end_time * 1000).toUTCString()}`}</ListItem>
</UnorderedList>

                </Box>
    </TabPanel>
    <TabPanel>
    <Box>
                <UnorderedList listStyleType='none'>
                    {speakers.map(speaker => (
                        <ListItem>{speaker.name}</ListItem>
                    ))}
</UnorderedList></Box>
    </TabPanel>
    <TabPanel>
    <Box>
                <UnorderedList listStyleType='none'>
                {related_events_info.map(event => (
                      <ListItem textDecoration='underline'>
                          <Link
                          to={`/events/${event.id}`}
                          state={{...event, allEvents, isHacker}}
                          >
                              {event.name}
                          </Link>
                          </ListItem>
                  ))}
</UnorderedList></Box>
    </TabPanel>
  </TabPanels>
</Tabs> 
            </Container>


          {/* <p>{description}</p>
          <p>{event_type}</p>
          <p>{isHacker && private_url}</p>
          <div>
              <ul>
                  {related_events_info.map(event => (
                      <li>
                          <Link
                          to={`/events/${event.id}`}
                          state={{...event, allEvents, isHacker}}
                          >
                              Hi
                          </Link>
                      </li>
                  ))}
              </ul>
          </div> */}
        </div>
    )
}

export default EventDetails