/* global google */

import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useNavigate, useLocation } from 'react-router-dom';

const center = { lat: 40.478821, lng: -88.992706 };

export default function Shippackagemaps() {
  console.log('maps ayaaaaaa');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [showDelayedText, setShowDelayedText] = useState(false);
  const [midpointMarker, setMidpointMarker] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { values } = location.state || {};
  const { sender_adr } = location.state || {};
  const { receiver_adr } = location.state || {};
  const { sender_adr1 } = location.state || {};
  const { receiver_adr1 } = location.state || {};
  console.log('values aya as a parameter', values);
  console.log("values are ", sender_adr);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRouteFrom(sender_adr, receiver_adr) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   console.log("dddddddddddddddddddddd")
    //   return;
    // }
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    console.log("cccccccccccccccccccccccccccccccccccccccc")
    const results = await directionsService.route({
      origin: sender_adr || originRef.current.value,
      destination: receiver_adr || destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log("results" , results)

    const route = results.routes[0].legs[0];
    const midpoint = {
      lat: (route.start_location.lat() + route.end_location.lat()) / 2,
      lng: (route.start_location.lng() + route.end_location.lng()) / 2,
    };
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setShowDelayedText(true);
    setMidpointMarker(midpoint);
    // values.sender_adr = sender_adr //|| originRef.current.value;
    // values.receiver_adr = receiver_adr //|| destiantionRef.current.value;
    // values.driver_id = 'NA';
    // values.order_status = 'NA';
    // setTimeout(() => {
    //   navigate('/recommend_service', { state: { values } });
    // }, 10000);
  }

  async function calculateRouteFor(sender_adr, receiver_adr) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   console.log("dddddddddddddddddddddd")
    //   return;
    // }
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    console.log("cccccccccccccccccccccccccccccccccccccccc")
    const results = await directionsService.route({
      origin: sender_adr || originRef.current.value,
      destination: receiver_adr || destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log("results" , results)

    const route = results.routes[0].legs[0];
    // const midpoint = {
    //   lat: (route.start_location.lat() + route.end_location.lat()) / 2,
    //   lng: (route.start_location.lng() + route.end_location.lng()) / 2,
    // };
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setShowDelayedText(true);
    // setMidpointMarker(midpoint);
    // values.sender_adr = sender_adr //|| originRef.current.value;
    // values.receiver_adr = receiver_adr //|| destiantionRef.current.value;
    // values.driver_id = 'NA';
    // values.order_status = 'NA';
    // setTimeout(() => {
    //   navigate('/recommend_service', { state: { values } });
    // }, 10000);
  }

  const onLoad = (Autocomplete) => {
    if (sender_adr && receiver_adr) {
      calculateRouteFrom(sender_adr, receiver_adr)
    } else if (sender_adr1 && receiver_adr1) {
      calculateRouteFor(sender_adr1, receiver_adr1)
    }
  };

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const route = results.routes[0].legs[0];
    const midpoint = {
      lat: (route.start_location.lat() + route.end_location.lat()) / 2,
      lng: (route.start_location.lng() + route.end_location.lng()) / 2,
    };
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setShowDelayedText(true);
    setMidpointMarker(midpoint);
    values.sender_adr = originRef.current.value;
    values.receiver_adr = destiantionRef.current.value;
    values.driver_id = 'NA';
    values.order_status = 'NA';
    setTimeout(() => {
      navigate('/recommend_service', { state: { values } });
    }, 10000);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
    setMidpointMarker(null); // Clear the midpoint marker when clearing the route
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {midpointMarker && <Marker position={midpointMarker} label='' />}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box p={4} borderRadius='lg' m={4} bgColor='white' shadow='base' minW='container.md' zIndex='1'>
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete onLoad={onLoad}>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete onLoad={onLoad}>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button
              colorScheme='blue'
              style={{ color: '#2e186a' }}
              type='submit'
              onClick={calculateRoute}
            >
              Confirm
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}
