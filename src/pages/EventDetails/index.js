import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Box, Heading, Tag, Container, Text, Button, UnorderedList, ListItem, Tabs, TabList, TabPanels, Tab, TabPanel, Center } from '@chakra-ui/react'
import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons'

import styles from "./index.module.css";

const EventDetails = () => {
    const details = useLocation();
    const { description, end_time, event_type, name,
        private_url, public_url, related_events, speakers, start_time, allEvents, loggedIn } = details.state;
    const related_events_info = allEvents.filter(event => { return related_events.includes(event.id) }) // list of related event objects

    return (
        <div className={styles.containerStyle}>
            <Link to={'/events'}
                state={{ allEvents, loggedIn }}>
                <Button borderRadius='md' margin='1% 2%' bg='none'
                    borderWidth='1px' borderColor={'rgb(29, 76, 130)'} leftIcon={<ArrowBackIcon />}>
                    All Events
                </Button>
            </Link>
            <Center bg="rgb(29, 76, 130)" margin='0 2%' borderRadius={'md'}>
                <Container padding={'2%'}>
                    <Heading fontSize={'45px'} color={'white'}>{name}</Heading>
                    <Tag size={'lg'} variant='solid' colorScheme='teal'>
                        {event_type.replace('_', ' ').toUpperCase()}
                    </Tag>
                    <Text color={'white'} fontWeight='600' margin={'5% 0'}>
                        {description}
                    </Text>
                    <Button variant='solid' bg={'#FF0000'} color={'white'} rightIcon={<ExternalLinkIcon />} _hover><a target='_blank' href={public_url}>YouTube</a></Button>
                    {loggedIn && <Button variant='solid' ml={'20px'} bg={'#0a54cc'} color={'white'} rightIcon={<ExternalLinkIcon />}><a target='_blank' href={private_url}>Hopin</a></Button>}
                </Container>
            </Center>
            <Container>

                <Tabs align="center" margin='40px 0' padding='5%' borderRadius={'md'}>
                    <TabList>
                        <Tab>Event Period</Tab>
                        <Tab>Speakers</Tab>
                        <Tab>Related Events</Tab>
                    </TabList>

                    <TabPanels mt='20px'>
                        <TabPanel>
                            <Box>

                                <UnorderedList listStyleType='none' spacing='10px'>
                                    <ListItem>{`Starts :   ${new Date(start_time).toUTCString()}`}</ListItem>
                                    <ListItem>{`Ends :   ${new Date(end_time).toUTCString()}`}</ListItem>
                                </UnorderedList>

                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box>
                                <UnorderedList listStyleType='none' spacing='10px'>
                                    {speakers.map(speaker => (
                                        <ListItem>{speaker.name}</ListItem>
                                    ))}
                                </UnorderedList></Box>
                        </TabPanel>
                        <TabPanel>
                            <Box>
                                <UnorderedList listStyleType='none' spacing='10px'>
                                    {related_events_info.map(event => (
                                        <ListItem _hover={{ textDecoration: 'underline' }}>
                                            <Link
                                                to={`/events/${event.id}`}
                                                state={{ ...event, allEvents, loggedIn }}
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
        </div>
    )
}

export default EventDetails;