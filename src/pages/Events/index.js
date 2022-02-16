import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Box, Text, Button, Input, Tag, Menu, MenuButton, MenuList, MenuItem, Center  } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'





const Events = () => {
    const credentials = useLocation();
    const {email, password, loggedIn} = credentials.state;
    console.log(email,password, loggedIn)
    //const fetched = useRef();
    const [allEvents, SetAllEvents] = useState([]);
    const [eventList, SetEventList] = useState([]);
    const [isHacker, SetIsHacker] = useState(loggedIn);
    const [isFiltered, SetIsFiltered] = useState(false);
    const [currentType, SetCurrentType] = useState("");
   

    console.log(eventList)

    const PublicList = (arr) => {
        if (email === "challenge@testmail.com" && password === "12345" && isHacker) {
            SetEventList(arr);
            SetAllEvents(arr);
        } else {
            SetEventList(arr.filter((event) => event.permission === "public"));
            SetAllEvents(arr.filter((event) => event.permission === "public"));
            SetIsHacker(false);
        }
    }

    useEffect(() => {
        const url = `https://api.hackthenorth.com/v3/events`;
        const fetchEvents = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json)
            PublicList(json.sort(function(a,b) {return a.start_time - b.start_time}))
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchEvents();
      }, []);

      const updateList = (e) => {
          const updated = allEvents.filter((event) => {return event.name.toLowerCase().includes(e.toLowerCase())})
          console.log(updated)
          SetEventList(updated)
      }

    //   const hidePrivate = () => {
    //       SetEventList(eventList.filter((event) => event.permission === "public"))
    //       SetIsHacker(false)
    //   }


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
          <div style={{background: "#E7F6FC", paddingBottom: "30px"}}>
              <Center w='100%'>
                 {/* {!loggedIn || !isHacker ? <Link
                            to={"/"}
                        >
                            <Button size='md' variant='outline' mt={'10px'} borderRadius='md'
    borderWidth='2px' borderColor={'rgb(29, 76, 130)'}>
    Sign in
  </Button>
                        </Link> : 
                        <Button onClick={() => hidePrivate()} vsize='md' variant='outline' mt={'10px'} borderRadius='md'
                        borderWidth='2px' borderColor={'rgb(29, 76, 130)'}>
                        Sign out
                      </Button>} */}
                      <Link
                      to={"/"}
                      >
                        <Button size='md' variant='outline' mt={'10px'} borderRadius='md'
    borderWidth='2px' borderColor={'rgb(29, 76, 130)'}>
    {isHacker ? "Sign out" : "Sign in"}
  </Button>  
                      </Link>
                      </Center>
              
              <Input placeholder='Search' size='lg' w="70%" margin="5% 0 1% 10%" borderRadius="md"
                  borderWidth="1px"
                  border= "solid"
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
    <MenuItem onClick={() => filterEvents("tech_talk")}>Tech Talk</MenuItem>
    <MenuItem onClick={() => filterEvents("workshop")}>Workshop</MenuItem>
    <MenuItem onClick={() => filterEvents("activity")}>Activity</MenuItem>
    <MenuItem onClick={() => SetEventList(allEvents)}>All events</MenuItem>
  </MenuList>
</Menu>
              
              {eventList?.map((event) => (
                  <Link
                  key={event?.id}
                  to={`/events/${event?.id}`}
                  state={{...event, allEvents, isHacker}}
                  >
                  <Box style={{ margin: "2% auto" }}
                  bg="rgb(29, 76, 130)"
                  w="80%"
                  p={6}
                  color="black"
                  borderRadius="11px"
                  borderWidth="2px"
                  border= "solid"
                  borderColor={"rgb(252, 250, 243)"}>
                <Text style={{display: "inline-block"}} fontSize='lg' color={"white"}>{event?.name}</Text>
            <Tag size={'sm'} key={'1'} marginLeft={'5px'} color={'rgb(29, 76, 130)'} fontSize="10px" variant='solid' backgroundColor={'rgb(250, 227, 19)'}>{event?.event_type.toUpperCase()}</Tag>
            <Tag size={'sm'} key={'2'} marginLeft={'5px'} variant='solid' backgroundColor={'#4abd9a'}>
      {new Date(event?.start_time * 1000).toUTCString()}
    </Tag>

                  
                  </Box>
                  </Link>
              )
              )}
          </div>
      )
}

export default Events;