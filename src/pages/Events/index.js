import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Box, Text, Button, Input, Badge, Tag, Menu, MenuButton, MenuList, MenuItem, Center } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import styles from "./index.module.css";


const Events = () => {
    const credentials = useLocation();
    const { email, password, loggedIn } = credentials.state; // fetch state elements
    const [allEvents, SetAllEvents] = useState([]); // constant list of all events, used for filtering
    const [eventList, SetEventList] = useState([]); // list of all events being rendered, alters during filtering
    const [isFiltered, SetIsFiltered] = useState(false); // helper state variable for filtering
    const [currentType, SetCurrentType] = useState(""); // helper state variable for filtering


    // set the list of events depending if the user is a hacker or guest
    const PublicList = (arr) => {
        if (email === "challenge@testmail.com" && password === "12345" && loggedIn) {
            SetEventList(arr);
            SetAllEvents(arr);
        } else {
            SetEventList(arr.filter((event) => event.permission === "public"));
            SetAllEvents(arr.filter((event) => event.permission === "public"));
        }
    }

    useEffect(() => {
        const url = `https://api.hackthenorth.com/v3/events`;
        const fetchEvents = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                PublicList(json.sort(function (a, b) { return a.start_time - b.start_time }))
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchEvents();
    }, []);

    // Helper function for search. Alters events list dynamically with search
    const updateList = (e) => {
        const updated = allEvents.filter((event) => { return (event.name.toLowerCase().includes(e.toLowerCase()) &&
                                                              event.event_type === currentType)})
        SetEventList(updated)
    }


    // filters events list based on event type
    const filterEvents = (type) => {
        if (!isFiltered) {
            SetEventList(eventList.filter((event) => event.event_type === type))
            SetCurrentType(type);
            SetIsFiltered(true)
        } else {
            if (type === currentType) {
                SetEventList(allEvents)
                SetCurrentType("");
                SetIsFiltered(false)
            } else {
                SetEventList(allEvents.filter(((event) => event.event_type === type)))
                SetCurrentType(type);
                SetIsFiltered(true);
            }
        }
    }


    return (
        <div className={styles.mainStyle}>
            <div className={styles.containerStyle}>
                <Center w='100%'>
                    <Link
                        to={"/"}
                    >
                        <Button size='md' variant='outline' mt={'10px'} borderRadius='md'
                            borderWidth='2px' borderColor={'rgb(29, 76, 130)'}>
                            {loggedIn ? "Sign out" : "Sign in"}
                        </Button>
                    </Link>
                </Center>

                <Input placeholder='Search' size='lg' w="70%" margin="5% 0 1% 10%" borderRadius="md"
                    borderWidth="1px"
                    border="solid"
                    borderColor={"#a3adc9"}
                    background={"rgb(252, 250, 243)"}
                    onChange={(e) => updateList(e.target.value)}
                />
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size='lg' variant='outline' margin={'0 0 0 25px'} borderRadius='md'
                        borderWidth='2px' borderColor={'rgb(29, 76, 130)'}>
                        Filter
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => SetEventList(allEvents)}>All events</MenuItem>
                        <MenuItem onClick={() => filterEvents("tech_talk")}>Tech Talk</MenuItem>
                        <MenuItem onClick={() => filterEvents("workshop")}>Workshop</MenuItem>
                        <MenuItem onClick={() => filterEvents("activity")}>Activity</MenuItem>
                    </MenuList>
                </Menu>

                {eventList?.map((event) => (
                    <Link
                        key={event?.id}
                        to={`/events/${event?.id}`}
                        state={{ ...event, allEvents, loggedIn }}
                    >
                        <Box style={{ margin: "2% auto" }}
                            bg="rgb(29, 76, 130)"
                            w="80%"
                            p={6}
                            color="black"
                            borderRadius="11px"
                            borderWidth="2px"
                            border="solid"
                            borderColor={"rgb(252, 250, 243)"}>
                                
                            <Text display='inline-block' fontSize='lg' color={"white"}>{event?.name}</Text>
                            <Badge size={'sm'} key={'1'} marginLeft={'5px'} color={'rgb(29, 76, 130)'} borderRadius={'md'} fontSize="10px" variant='solid' backgroundColor={'rgb(250, 227, 19)'}>{event?.event_type.toUpperCase()}</Badge>
                            <Badge size={'sm'} key={'2'} marginLeft={'5px'} borderRadius={'md'} variant='solid' backgroundColor={'#4abd9a'}>
                                {new Date(event?.start_time).toUTCString()}
                            </Badge>
                        </Box>
                    </Link>
                )
                )}
            </div>
        </div>
    )
}

export default Events;